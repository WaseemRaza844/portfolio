#!/usr/bin/env python3
"""Package BNSF Data Scientist resume + optional cover letter using existing repo tools."""
from __future__ import annotations
import importlib.util
import shutil
import subprocess
import sys
from pathlib import Path
from pypdf import PdfReader

HERE = Path(__file__).resolve().parent
RESUME = HERE.parents[2]
READY = HERE / "submission-ready"
PREFIX = "WRaza_BNSF_DS95561"
CV_NAME = "Waseem_Raza_BNSF_DATA_SCIENTIST_I_II_95561.pdf"

def import_builder(path: Path, name: str):
    spec = importlib.util.spec_from_file_location(name, str(path))
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module

def main():
    READY.mkdir(exist_ok=True)
    # Reuses the standalone industry LaTeX compiler and per-page density validation.
    subprocess.run(
        [sys.executable, str(RESUME / "build_tailored.py"), "--job", "bnsf-data-scientist-i-ii-95561"],
        check=True,
    )
    source_cv = HERE / CV_NAME
    if len(PdfReader(str(source_cv)).pages) != 3:
        raise RuntimeError("BNSF industry resume must have three pages")
    shutil.copy2(source_cv, READY / f"{PREFIX}_Resume.pdf")

    word_builder = import_builder(RESUME / "build_application_documents.py", "bnsf_word_builder")
    created = word_builder.build_application(HERE, HERE / "application-documents.json")
    if len(created) != 1:
        raise RuntimeError("Expected one cover-letter Word document")
    shutil.copy2(created[0], READY / f"{PREFIX}_Cover_Letter.docx")

    pdf_builder = import_builder(
        RESUME / "job-applications/faculty/ece-shared-2027/build_packages.py", "bnsf_pdf_builder"
    )
    cover_pdf = READY / f"{PREFIX}_Cover_Letter.pdf"
    pdf_builder.render_md(HERE / "Cover_Letter.md", cover_pdf, "CL")
    if len(PdfReader(str(cover_pdf)).pages) != 1:
        raise RuntimeError("BNSF cover letter must be exactly one page")

    for name in (f"{PREFIX}_Resume.pdf",f"{PREFIX}_Cover_Letter.pdf",f"{PREFIX}_Cover_Letter.docx"):
        output = READY / name
        if not output.is_file() or output.stat().st_size < 10000:
            raise RuntimeError(f"Output missing or unexpectedly small: {name}")
        print(f"READY: {output.relative_to(RESUME.parent)} ({output.stat().st_size} bytes)")

if __name__ == "__main__":
    main()
