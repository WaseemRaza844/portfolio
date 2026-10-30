#!/usr/bin/env python3
"""Build industry job-specific resumes directly inside their application folders."""

import argparse
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from pypdf import PdfReader

HERE = Path(__file__).resolve().parent
TAILORED = HERE / "job-applications" / "industry"


def read_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def discover_jobs():
    jobs = {}
    if not TAILORED.exists():
        return jobs
    for folder in sorted(p for p in TAILORED.iterdir() if p.is_dir()):
        meta_path = folder / "metadata.json"
        tex_files = sorted(folder.glob("*.tex"))
        if not meta_path.exists() or len(tex_files) != 1:
            continue
        jobs[folder.name] = {
            "folder": folder,
            "metadata": read_json(meta_path),
            "tex": tex_files[0],
        }
    return jobs


def compile_job(job_key, job):
    if shutil.which("pdflatex") is None:
        raise ValueError("pdflatex was not found. Install MiKTeX or TeX Live before building tailored resumes.")

    folder = job["folder"]
    tex_path = job["tex"]
    metadata = job["metadata"]
    pdf_name = f"{tex_path.stem}.pdf"

    # Keep LaTeX intermediates out of the application folder. Only the final PDF
    # and concise validation report are published beside the editable source.
    with tempfile.TemporaryDirectory(prefix=f"resume-{job_key}-") as temp:
        output = Path(temp)
        command = [
            "pdflatex",
            "-no-shell-escape",
            "-interaction=nonstopmode",
            "-halt-on-error",
            f"-output-directory={output}",
            tex_path.name,
        ]

        for _ in range(2):
            process = subprocess.run(
                command,
                cwd=folder,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
                timeout=120,
            )
            if process.returncode:
                log_path = output / f"{tex_path.stem}.log"
                log = log_path.read_text(encoding="utf-8", errors="replace") if log_path.exists() else process.stdout
                raise ValueError(f"LaTeX failed for {job_key}; temporary log {log_path}\n{log[-5000:]}")

        built_pdf = output / pdf_name
        if not built_pdf.exists():
            raise ValueError(f"Expected PDF was not generated: {built_pdf}")

        reader = PdfReader(built_pdf)
        texts = [page.extract_text() or "" for page in reader.pages]
        expected_pages = int(metadata.get("expectedPages", 3))
        if len(reader.pages) != expected_pages:
            raise ValueError(
                f"{pdf_name} is {len(reader.pages)} pages; expected exactly {expected_pages}. "
                "Adjust content instead of accepting a sparse or overflowing application resume."
            )

        page_chars = [len(re.sub(r"\s+", " ", text).strip()) for text in texts]
        if any(value < 600 for value in page_chars):
            raise ValueError(f"{pdf_name} contains a sparse or unreadable page.")

        # Character count alone can miss visually sparse pages. Track the lowest
        # text baseline on each page and enforce the per-application threshold.
        page_lowest_text_y = []
        for page in reader.pages:
            y_values = []

            def visitor_text(text, cm, tm, font_dict, font_size):
                if text and text.strip():
                    try:
                        y_values.append(float(tm[5]))
                    except (TypeError, ValueError, IndexError):
                        pass

            page.extract_text(visitor_text=visitor_text)
            page_lowest_text_y.append(min(y_values) if y_values else float(page.mediabox.height))

        max_bottom_whitespace_inches = float(metadata.get("maxBottomWhitespaceInches", 0))
        if max_bottom_whitespace_inches:
            max_bottom_whitespace_points = max_bottom_whitespace_inches * 72.0
            visually_sparse = [
                (index + 1, round(value, 1))
                for index, value in enumerate(page_lowest_text_y)
                if value > max_bottom_whitespace_points
            ]
            if visually_sparse:
                details = ", ".join(
                    f"page {page}: lowest text baseline {value} pt"
                    for page, value in visually_sparse
                )
                raise ValueError(
                    f"{pdf_name} leaves excessive bottom whitespace; target is at most "
                    f"{max_bottom_whitespace_inches:.2f} in ({details})."
                )

        min_page_chars = int(metadata.get("minPageTextChars", 0))
        if min_page_chars:
            sparse_pages = [(index + 1, value) for index, value in enumerate(page_chars) if value < min_page_chars]
            if sparse_pages:
                details = ", ".join(f"page {page}: {value}" for page, value in sparse_pages)
                raise ValueError(
                    f"{pdf_name} does not meet the tailored page-density target of "
                    f"{min_page_chars} extracted text characters ({details})."
                )

        joined = "\n".join(texts)
        if "Waseem Raza" not in joined:
            raise ValueError(f"Name missing from extracted text in {pdf_name}.")
        if "\ufffd" in joined or "\u25a0" in joined:
            raise ValueError(f"Unexpected missing-glyph character in {pdf_name}.")

        pdf_path = folder / pdf_name
        shutil.copy2(built_pdf, pdf_path)

    result = {
        "job": job_key,
        "file": pdf_name,
        "pages": len(reader.pages),
        "pageTextChars": page_chars,
        "pageLowestTextY": [round(value, 1) for value in page_lowest_text_y],
        "target": {
            "company": metadata.get("company"),
            "role": metadata.get("role"),
            "jobId": metadata.get("jobId"),
        },
    }
    (folder / "build-report.json").write_text(json.dumps(result, indent=2), encoding="utf-8")
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    group = parser.add_mutually_exclusive_group()
    group.add_argument("--job", help="Application folder name under resume/job-applications/industry/.")
    group.add_argument("--all", action="store_true", help="Build every configured industry application resume.")
    args = parser.parse_args()

    jobs = discover_jobs()
    if not jobs:
        print("No industry job applications configured.")
        return

    keys = list(jobs) if args.all else [args.job] if args.job else list(jobs)
    unknown = [key for key in keys if key not in jobs]
    if unknown:
        raise ValueError("Unknown job application: " + ", ".join(unknown))

    for key in keys:
        result = compile_job(key, jobs[key])
        print(
            f'{result["file"]}: {result["pages"]} pages | text chars/page: '
            + ", ".join(str(value) for value in result["pageTextChars"])
            + " | lowest text y/page: "
            + ", ".join(str(value) for value in result["pageLowestTextY"])
        )


if __name__ == "__main__":
    try:
        main()
    except (ValueError, subprocess.TimeoutExpired) as exc:
        print("Tailored build failed: " + str(exc), file=sys.stderr)
        sys.exit(1)
