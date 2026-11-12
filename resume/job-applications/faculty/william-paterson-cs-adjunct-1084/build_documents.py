#!/usr/bin/env python3
"""Build William Paterson faculty CV and letter using the existing repository templates."""
from __future__ import annotations
import importlib.util
import subprocess
import sys
from pathlib import Path
from pypdf import PdfReader

HERE = Path(__file__).resolve().parent
RESUME = HERE.parents[2]
READY = HERE / "submission-ready"
VARIANT = "faculty_william_paterson_cs_adjunct_1084"
PREFIX = "WRaza_WPU_CS_ADJ1084"

def load(path, name):
    spec = importlib.util.spec_from_file_location(name, str(path))
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module

def main():
    READY.mkdir(exist_ok=True)
    subprocess.run([sys.executable, str(RESUME / "build.py"), "--variant", VARIANT], check=True)
    cv = HERE / f"Waseem_Raza_{VARIANT.upper()}.pdf"
    if not cv.is_file():
        raise FileNotFoundError(f"Expected tailored CV: {cv}")
    from shutil import copyfile
    cv_output = READY / f"{PREFIX}_CV.pdf"
    copyfile(cv, cv_output)
    word_builder = load(RESUME / "build_application_documents.py", "wpu_word_builder")
    files = word_builder.build_application(HERE, HERE / "application-documents.json")
    if len(files) != 1:
        raise RuntimeError("Expected one editable Word cover letter")
    copyfile(files[0], READY / f"{PREFIX}_Cover_Letter.docx")
    pdf_builder = load(HERE.parent / "ece-shared-2027/build_packages.py", "wpu_pdf_builder")
    letter_pdf = READY / f"{PREFIX}_Cover_Letter.pdf"
    pdf_builder.render_md(HERE / "Cover_Letter.md", letter_pdf, "CL")
    pages = PdfReader(str(letter_pdf)).pages
    if len(pages) != 1:
        raise RuntimeError(f"Cover letter must fit one page; found {len(pages)}")
    extracted = pages[0].extract_text() or ""
    for phrase in ("Computer and Information Technology", "Fundamentals of Computer Networking", "Discrete Structures", "AT&T"):
        if phrase not in extracted:
            raise RuntimeError(f"Missing expected cover-letter detail: {phrase}")
    print("Ready for review:")
    for p in sorted(READY.iterdir()):
        print(" ", p.relative_to(RESUME.parent))

if __name__ == "__main__":
    main()
