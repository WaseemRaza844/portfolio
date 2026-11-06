#!/usr/bin/env python3
"""Build Kettering Assistant Professor ECE FP00103 application.

Outputs: byte-identical shared ECE CV (4 pages), one-page cover letter,
teaching and research philosophy PDFs, and editable DOCX versions.
The complete referee contact document is private and intentionally excluded.
"""
from __future__ import annotations

import hashlib
import importlib.util
import sys
from pathlib import Path
from shutil import copyfile

from pypdf import PdfReader

HERE = Path(__file__).resolve().parent
RESUME = HERE.parents[2]
SHARED_CV = RESUME / "resume-profiles/faculty/Waseem_Raza_FACULTY_ECE_AI_WIRELESS.pdf"
READY = HERE / "submission-ready"
PREFIX = "WRaza_KETTERING_FP00103"


def module_from_file(path: Path, name: str):
    spec = importlib.util.spec_from_file_location(name, str(path))
    if spec is None or spec.loader is None:
        raise RuntimeError("Unable to import " + str(path))
    m = importlib.util.module_from_spec(spec)
    sys.modules[name] = m
    spec.loader.exec_module(m)
    return m


def main():
    if not SHARED_CV.is_file():
        raise FileNotFoundError(
            "Build the shared ECE CV first: "
            "python resume/build.py --variant faculty_ece_ai_wireless"
        )
    READY.mkdir(exist_ok=True)
    cv = READY / (PREFIX + "_CV.pdf")
    copyfile(SHARED_CV, cv)
    assert hashlib.sha256(cv.read_bytes()).digest() == hashlib.sha256(SHARED_CV.read_bytes()).digest()
    assert len(PdfReader(str(cv)).pages) == 4, "The shared ECE CV must be four pages"

    word_builder = module_from_file(RESUME / "build_application_documents.py", "kettering_docx_builder")
    generated = word_builder.build_application(HERE, HERE / "application-documents.json")
    if len(generated) != 3:
        raise RuntimeError("Expected three editable employer-required documents")

    pdf_builder = module_from_file(
        HERE.parent / "ece-shared-2027/build_packages.py", "kettering_pdf_builder"
    )
    specs = [
        ("Cover_Letter.md", "Cover_Letter", "CL", 1, 1,
         ("Kettering University", "FP00103", "Communication Systems")),
        ("Teaching_Philosophy.md", "Teaching_Philosophy", "Teaching", 2, 4,
         ("Kettering", "cooperative", "EE-430", "assessment")),
        ("Research_Philosophy.md", "Research_Philosophy", "Research", 2, 4,
         ("Direction 1", "Direction 2", "Direction 3", "Year 1")),
    ]
    for source, stem, kind, min_pages, max_pages, required in specs:
        docx = HERE / (PREFIX + "_" + stem + ".docx")
        if not docx.is_file():
            raise FileNotFoundError(str(docx))
        copyfile(docx, READY / docx.name)
        pdf = READY / (PREFIX + "_" + stem + ".pdf")
        pdf_builder.render_md(HERE / source, pdf, kind)
        pages = PdfReader(str(pdf)).pages
        if not min_pages <= len(pages) <= max_pages:
            raise RuntimeError(
                f"{pdf.name}: {len(pages)} page(s); expected {min_pages}-{max_pages}"
            )
        txt = " ".join(p.extract_text() or "" for p in pages)
        for token in required:
            if token.casefold() not in txt.casefold():
                raise RuntimeError(f"Expected content missing from {pdf.name}: {token}")
        print(pdf.name, len(pages), "page(s)", len(txt), "text characters")

    pdfs = list(READY.glob("*.pdf"))
    if len(pdfs) != 4:
        raise RuntimeError(f"Expected four public PDFs, found {len(pdfs)}")
    print("Kettering FP00103: 4-page reusable ECE CV, 3 tailored PDF/DOCX documents.")
    print("Required private reference contact list must be supplied separately.")
    print("Application has not been submitted.")


if __name__ == "__main__":
    main()
