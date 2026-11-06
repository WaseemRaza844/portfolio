#!/usr/bin/env python3
"""Build Missouri AI / Geospatial Intelligence application using shared CS faculty CV.

Output: unchanged 4-page CS faculty CV; tailored PDF/DOCX cover letter and
research-vision narrative. Private reference contacts are never packaged.
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
PREFIX = "WRaza_MU_AI61589"


def import_module(path: Path, name: str):
    spec = importlib.util.spec_from_file_location(name, str(path))
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Cannot import {path}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


def main():
    if not CS_CV.is_file():
        raise FileNotFoundError(
            f"Missing shared CV {CS_CV}. Run: "
            "python resume/build.py --variant faculty_cs_ai_ml"
        )
    READY.mkdir(exist_ok=True)

    cv = READY / (PREFIX + "_CV.pdf")
    copyfile(CS_CV, cv)
    assert hashlib.sha256(cv.read_bytes()).digest() == hashlib.sha256(CS_CV.read_bytes()).digest()
    cvpages = len(PdfReader(str(cv)).pages)
    assert cvpages == 4, f"Unexpected shared CS CV length: {cvpages}"

    word_builder = import_module(RESUME / "build_application_documents.py", "missouri_docx_builder")
    word_sources = word_builder.build_application(HERE, HERE / "application-documents.json")
    if len(word_sources) != 2:
        raise RuntimeError("Expected two Word sources: cover letter and research vision")

    renderer = import_module(HERE.parent / "ece-shared-2027/build_packages.py", "missouri_pdf_builder")
    documents = [
        ("Cover_Letter.md", "Cover_Letter", "CL", 1, 1,
         ["Job ID 61589", "Center for Geospatial Intelligence", "machine-learning diagnostics"]),
        ("Research_Vision.md", "Research_Vision", "Research", 2, 4,
         ["Theme 1:", "Theme 2:", "Theme 3:", "Research roadmap", "Geospatial"]),
    ]
    for srcname, suffix, kind, lower, upper, tokens in documents:
        stem = PREFIX + "_" + suffix
        docx = HERE / (stem + ".docx")
        if not docx.is_file():
            raise FileNotFoundError("Missing editable document " + str(docx))
        copyfile(docx, READY / docx.name)

        pdf = READY / (stem + ".pdf")
        renderer.render_md(HERE / srcname, pdf, kind)
        pages = PdfReader(str(pdf)).pages
        if not lower <= len(pages) <= upper:
            raise RuntimeError(f"{pdf.name}: {len(pages)} pages, expected {lower}-{upper}")
        txt = " ".join(page.extract_text() or "" for page in pages)
        for token in tokens:
            if token.casefold() not in txt.casefold():
                raise RuntimeError(f"{pdf.name}: expected content missing: {token}")
        print(f"{pdf.name}: {len(pages)} page(s), {len(txt)} characters")

    print("Missouri Job 61589 package: 4-page shared CV and 2 tailored PDFs + DOCX copies")
    print("Private referee contacts not included. Application not submitted.")


if __name__ == "__main__":
    main()
