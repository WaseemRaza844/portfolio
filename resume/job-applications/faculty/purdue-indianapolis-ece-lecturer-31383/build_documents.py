#!/usr/bin/env python3
"""Build Purdue Indianapolis lecturer application from repository's existing LaTeX and document templates."""
from __future__ import annotations
import importlib.util
import shutil
import subprocess
import sys
from pathlib import Path
from pypdf import PdfReader

HERE=Path(__file__).resolve().parent
RESUME=HERE.parents[2]
READY=HERE/"submission-ready"
VARIANT="faculty_purdue_indianapolis_ece_lecturer_31383"
PREFIX="WRaza_PURDUE_ECE31383"

def load(path,name):
    spec=importlib.util.spec_from_file_location(name,str(path))
    mod=importlib.util.module_from_spec(spec)
    sys.modules[name]=mod
    spec.loader.exec_module(mod)
    return mod

def main():
    READY.mkdir(parents=True,exist_ok=True)
    tex=HERE/f"Waseem_Raza_{VARIANT.upper()}.tex"
    args=[sys.executable,str(RESUME/"build.py"),"--variant",VARIANT]
    if not tex.is_file():
        args.append("--refresh-tex")
        print("First build: generating Purdue Indianapolis LaTeX source from the existing CV profile.", flush=True)
    subprocess.run(args,check=True)
    src=HERE/f"Waseem_Raza_{VARIANT.upper()}.pdf"
    if not src.exists():
        raise FileNotFoundError(f"Expected CV not found: {src}")
    cv=READY/f"{PREFIX}_CV.pdf"
    shutil.copy2(src,cv)
    cv_pages=len(PdfReader(str(cv)).pages)
    if not 3<=cv_pages<=5:
        raise RuntimeError(f"Unexpected CV length: {cv_pages} pages")
    word_builder=load(RESUME/"build_application_documents.py","purdue_docx")
    created=word_builder.build_application(HERE,HERE/"application-documents.json")
    if len(created)!=2:
        raise RuntimeError("Expected cover letter and teaching statement Word files")
    pdf_builder=load(HERE.parent/"ece-shared-2027"/"build_packages.py","purdue_pdf")
    spec=[
      ("Cover_Letter.md","Cover_Letter","CL"),
      ("Teaching_Statement.md","Teaching_Statement","Teaching")
    ]
    for source,suffix,kind in spec:
        docx=HERE/f"{PREFIX}_{suffix}.docx"
        shutil.copy2(docx,READY/docx.name)
        pdf=READY/f"{PREFIX}_{suffix}.pdf"
        pdf_builder.render_md(HERE/source,pdf,kind)
        n=len(PdfReader(str(pdf)).pages)
        if kind=="CL" and n!=1:
            raise RuntimeError(f"Cover letter must fit ONE page; found {n}. Edit source and rebuild.")
        if kind=="Teaching" and not 1<=n<=3:
            raise RuntimeError(f"Teaching statement expected 1-3 pages, found {n}")
    print(f"Purdue Indianapolis application: CV {cv_pages} pages; cover 1 page; teaching statement ready.")
    print(f"Open: {READY}")

if __name__=="__main__":
    main()
