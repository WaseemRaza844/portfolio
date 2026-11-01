#!/usr/bin/env python3
"""Build Scranton's four public application files from the canonical shared ECE CV.

Teaching/research statements: strictly no more than two pages.
Do not include transcripts or private referee contact information here.
"""
from __future__ import annotations
from pathlib import Path
from shutil import copyfile
import hashlib
import importlib.util
from pypdf import PdfReader

HERE=Path(__file__).resolve().parent
SHARED=HERE.parent/"ece-shared-2027"
CV=SHARED/"Waseem_Raza_FACULTY_ECE_SHARED_2027.pdf"
OUT=HERE/"submission-ready"
PREFIX="WRaza_FAC_SCR27"

def load_shared_renderer():
    src=SHARED/"build_packages.py"
    spec=importlib.util.spec_from_file_location("ece_faculty_package_builder",src)
    mod=importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod

def main():
    if not CV.is_file():
        raise FileNotFoundError("First build shared ECE faculty CV with resume/build.py: "+str(CV))
    OUT.mkdir(exist_ok=True)
    dest=OUT/f"{PREFIX}_CV.pdf"
    copyfile(CV,dest)
    if hashlib.sha256(CV.read_bytes()).digest()!=hashlib.sha256(dest.read_bytes()).digest():
        raise RuntimeError("Shared CV was unexpectedly changed in the Scranton copy")
    page_count=len(PdfReader(str(dest)).pages)
    if not 3<=page_count<=6:
        raise RuntimeError("Unexpected shared CV pagination: "+str(page_count))
    print(f"{dest.name}: {page_count} pages, identical to canonical faculty CV")

    builder=load_shared_renderer()
    for part,source,kind in (
        ("CL","Cover_Letter.md","CL"),
        ("Teaching","Teaching_Statement.md","Teaching"),
        ("Research","Research_Statement.md","Research"),
    ):
        pdf=OUT/f"{PREFIX}_{part}.pdf"
        builder.render_md(HERE/source,pdf,kind)
        pages=PdfReader(str(pdf)).pages
        max_pages=2
        if not 1<=len(pages)<=max_pages:
            raise RuntimeError(f"Scranton {part} has {len(pages)} pages; maximum is {max_pages}")
        if part=="CL" and len(pages)>1:
            print("Review cover-letter density: letter exceeds preferred one page")
        src=HERE/f"{PREFIX}_{part}.docx"
        if not src.is_file():
            raise FileNotFoundError("Generate editable Word documents first: "+str(src))
        copyfile(src,OUT/src.name)
        print(f"{part}: {len(pages)} page(s), PDF and Word ready")

    print("Private academic transcripts and three referee emails are intentionally excluded")

if __name__=="__main__":
    main()
