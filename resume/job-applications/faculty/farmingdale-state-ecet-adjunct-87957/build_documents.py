#!/usr/bin/env python3
"""Render and package the Farmingdale adjunct application documents.

Prerequisites from portfolio root:
  python resume/build.py --variant faculty_farmingdale_state_ecet_adjunct_87957 --refresh-tex
  python resume/build_application_documents.py
"""
from __future__ import annotations
from pathlib import Path
from shutil import copyfile
from pypdf import PdfReader
import importlib.util

HERE = Path(__file__).resolve().parent
READY = HERE / "submission-ready"
CV_SOURCE = HERE / "Waseem_Raza_FACULTY_FARMINGDALE_STATE_ECET_ADJUNCT_87957.pdf"
SHORT = "WRaza_FAC_FSC_ADJ87957"

def render_letter(source: Path, output: Path) -> None:
    module_path = HERE.parent / "ece-shared-2027" / "build_packages.py"
    spec = importlib.util.spec_from_file_location("fsc_shared_faculty_pdf", module_path)
    if spec is None or spec.loader is None:
        raise RuntimeError("Unable to load existing faculty document renderer")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    mod.render_md(source, output, "CL")

def main() -> None:
    if not CV_SOURCE.exists():
        raise FileNotFoundError(
            "Build the Farmingdale CV variant first: " + str(CV_SOURCE)
        )
    READY.mkdir(exist_ok=True)

    cv = READY / f"{SHORT}_CV.pdf"
    copyfile(CV_SOURCE, cv)
    cv_pages = len(PdfReader(str(cv)).pages)
    if not 2 <= cv_pages <= 4:
        raise RuntimeError(f"Unexpected CV page count: {cv_pages}")

    letter = READY / f"{SHORT}_CL.pdf"
    render_letter(HERE / "Cover_Letter.md", letter)
    letter_pages = len(PdfReader(str(letter)).pages)
    if letter_pages != 1:
        raise RuntimeError(
            f"Cover letter should be one page, found {letter_pages}"
        )

    editable = HERE / f"{SHORT}_CL.docx"
    if not editable.is_file():
        raise FileNotFoundError(
            "Run python resume/build_application_documents.py first: " + str(editable)
        )
    copyfile(editable, READY / editable.name)
    print(f"Submission package: CV {cv_pages} pages; cover letter {letter_pages} page")
    print("Public PDFs and the editable cover letter are in", READY)
    print("No private transcripts, reference emails, or immigration records are packaged")

if __name__ == "__main__":
    main()
