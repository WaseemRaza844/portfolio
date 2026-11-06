#!/usr/bin/env python3
"""Generate Caldwell CS adjunct cover PDF/DOCX and copy unchanged shared CS CV.

Run from repository root:
  python resume/job-applications/faculty/caldwell-computer-science-adjunct-2428/build_documents.py

This package intentionally excludes academic transcripts and private referee details.
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
CS_CV = RESUME / "resume-profiles/faculty/Waseem_Raza_FACULTY_CS_AI_ML.pdf"
READY = HERE / "submission-ready"
PREFIX = "WRaza_CALDWELL_CS_ADJ2428"


def import_module(path: Path, name: str):
    spec = importlib.util.spec_from_file_location(name, str(path))
    if spec is None or spec.loader is None:
        raise RuntimeError("Could not import repository document builder: " + str(path))
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


def main():
    if not CS_CV.is_file():
        raise FileNotFoundError("Build shared CS CV first: " + str(CS_CV))
    READY.mkdir(exist_ok=True)

    source_hash = hashlib.sha256(CS_CV.read_bytes()).hexdigest()
    cv = READY / (PREFIX + "_CV.pdf")
    copyfile(CS_CV, cv)
    assert hashlib.sha256(cv.read_bytes()).hexdigest() == source_hash, "Shared CS CV changed"
    cv_pages = len(PdfReader(str(cv)).pages)
    if not 4 <= cv_pages <= 5:
        raise RuntimeError(f"Shared CS CV has unexpected page count: {cv_pages}")

    faculty_builder = import_module(RESUME / "build_application_documents.py", "caldwell_word_builder")
    word_files = faculty_builder.build_application(HERE, HERE / "application-documents.json")
    if len(word_files) != 1:
        raise RuntimeError("Caldwell requires exactly one generated public Word letter")
    word = READY / (PREFIX + "_Cover_Letter.docx")
    copyfile(word_files[0], word)

    pdf = READY / (PREFIX + "_Cover_Letter.pdf")
    renderer = import_module(HERE.parent / "ece-shared-2027/build_packages.py", "caldwell_pdf_builder")
    renderer.render_md(HERE / "Cover_Letter.md", pdf, "CL")
    pages = PdfReader(str(pdf)).pages
    if len(pages) != 1:
        raise RuntimeError(f"Caldwell cover letter should be one page, got {len(pages)}")
    text = pages[0].extract_text() or ""
    for phrase in ["CS 195", "CS 340", "CS 420", "CS 320", "5:00 p.m.", "Computer Programming"]:
        if phrase not in text:
            raise RuntimeError(f"Missing required detail in Caldwell cover letter: {phrase}")

    print(f"Caldwell CS adjunct: original shared CV {cv_pages} pages; cover letter 1 page")
    for file in [cv, pdf, word]:
        print(f"  {file.relative_to(RESUME.parent)} ({file.stat().st_size} bytes)")
    print("Unofficial transcripts and reference contact details must be uploaded privately.")


if __name__ == "__main__":
    main()
