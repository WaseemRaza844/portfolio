#!/usr/bin/env python3
"""Build Stevens ECE adjunct RQ29408 documents without changing shared ECE CV.

Public outputs: identical shared ECE CV, cover letter, inclusive teaching philosophy,
and optional research statement (PDF/DOCX). Referees' personal contact details
are provided privately, never committed to a public repository.
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
PREFIX = "WRaza_STEVENS_RQ29408"


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
            "Missing shared ECE CV: python resume/build.py --variant faculty_ece_ai_wireless"
        )
    READY.mkdir(exist_ok=True)

    cv = READY / (PREFIX + "_CV.pdf")
    copyfile(SHARED_CV, cv)
    assert hashlib.sha256(cv.read_bytes()).digest()==hashlib.sha256(SHARED_CV.read_bytes()).digest()
    assert len(PdfReader(str(cv)).pages)==4, "Expected four-page shared ECE CV"

    word_builder = module_from_file(RESUME / "build_application_documents.py", "stevens_docx_builder")
    created = word_builder.build_application(HERE, HERE / "application-documents.json")
    if len(created) != 3:
        raise RuntimeError("Expected cover, teaching philosophy and optional research statement")

    pdf_builder = module_from_file(
        HERE.parent / "ece-shared-2027/build_packages.py", "stevens_pdf_builder"
    )
    docs=[
        ("Cover_Letter.md","Cover_Letter","CL",1,1,("RQ29408","EE 583","4G Network Fundamentals","6G")),
        ("Teaching_Philosophy.md","Teaching_Philosophy","Teaching",2,3,("EE 583","inclusive","graduate","6G")),
        ("Research_Statement_OPTIONAL.md","Research_Statement_OPTIONAL","Research",1,2,("wireless","reliability","6G")),
    ]
    for name,stem,kind,min_pages,max_pages,tokens in docs:
        word=HERE / (PREFIX + "_" + stem + ".docx")
        if not word.is_file():
            raise FileNotFoundError(str(word))
        copyfile(word, READY / word.name)
        pdf=READY / (PREFIX + "_" + stem + ".pdf")
        pdf_builder.render_md(HERE / name, pdf, kind)
        pages=PdfReader(str(pdf)).pages
        if not min_pages<=len(pages)<=max_pages:
            raise RuntimeError(f"{pdf.name} has {len(pages)} pages; expected {min_pages}-{max_pages}")
        txt=" ".join(x.extract_text() or "" for x in pages)
        for token in tokens:
            if token.casefold() not in txt.casefold():
                raise RuntimeError(f"{pdf.name}: missing expected content '{token}'")
        print(f"{pdf.name}: {len(pages)} page(s); {len(txt)} text characters")

    assert len(list(READY.glob("*.pdf")))==4, "Expected CV and 3 narrative PDFs"
    print("Stevens RQ29408: shared ECE CV reused byte-for-byte.")
    print("Submit reference contacts privately. This package targets wireless, signals and communication systems.")
    print("Application not submitted.")


if __name__ == "__main__":
    main()
