#!/usr/bin/env python3
"""Prepare Villanova 20260097F teaching-faculty application PDFs.

Requires refreshed CV variant and editable Word documents. Does not include private
transcripts, reference emails, or a claim about work authorization.
"""
from __future__ import annotations

import importlib.util
from pathlib import Path
from shutil import copyfile
from pypdf import PdfReader

HERE = Path(__file__).resolve().parent
READY = HERE / "submission-ready"
FINALIST = HERE / "finalist-only"
PREFIX = "WRaza_VIL_ECE_TP27"
CV_SOURCE = HERE / "Waseem_Raza_FACULTY_VILLANOVA_ECE_ASSISTANT_TEACHING_PROFESSOR_SPRING_2027.pdf"


def renderer():
    src = HERE.parent / "ece-shared-2027" / "build_packages.py"
    spec = importlib.util.spec_from_file_location("villanova_faculty_renderer", src)
    if spec is None or spec.loader is None:
        raise RuntimeError("Could not load shared faculty PDF renderer")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def render_one(builder, source: str, stem: str, kind: str, out_dir: Path,
               min_pages: int, max_pages: int):
    pdf = out_dir / (stem + ".pdf")
    builder.render_md(HERE / source, pdf, kind)
    count = len(PdfReader(str(pdf)).pages)
    if not min_pages <= count <= max_pages:
        raise RuntimeError(f"{pdf.name}: {count} pages; expected {min_pages}-{max_pages}")
    docx = HERE / (stem + ".docx")
    if not docx.is_file():
        raise FileNotFoundError("First run resume/build_application_documents.py: " + str(docx))
    copyfile(docx, out_dir / docx.name)
    print(f"{pdf.name}: {count} page(s); editable Word copy available")


def main():
    if not CV_SOURCE.is_file():
        raise FileNotFoundError(
            "Build faculty_villanova_ece_assistant_teaching_professor_spring_2027 first: "
            + str(CV_SOURCE)
        )
    READY.mkdir(exist_ok=True)
    FINALIST.mkdir(exist_ok=True)
    dest = READY / (PREFIX + "_CV.pdf")
    copyfile(CV_SOURCE, dest)
    cv_pages = len(PdfReader(str(dest)).pages)
    if not 3 <= cv_pages <= 4:
        raise RuntimeError(f"Unexpected Villanova CV length: {cv_pages} pages")
    print(f"{dest.name}: {cv_pages} pages")

    builder = renderer()
    render_one(builder, "Cover_Letter.md", PREFIX + "_CL", "CL",
               READY, 1, 2)
    render_one(builder, "Teaching_Philosophy.md", PREFIX + "_Teaching",
               "Teaching", READY, 1, 3)
    render_one(builder, "Mission_Statement_FINALIST_DRAFT.md",
               PREFIX + "_Mission_FINALIST", "Research",
               FINALIST, 1, 3)
    print("Initial-stage submission-ready files: cover letter, CV, teaching philosophy")
    print("Mission statement is a separate finalist-only draft.")
    print("Academic transcripts and 3 private reference contacts are NOT included.")


if __name__ == "__main__":
    main()
