#!/usr/bin/env python3
"""Build Norwich tenure-track ECE CV and cover letter; leave referee contacts private."""
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
VARIANT="faculty_norwich_university_ece_assistant_professor_f00092"
PREFIX="WRaza_NU_ECEF00092"

def load(path,name):
    spec=importlib.util.spec_from_file_location(name,str(path))
    module=importlib.util.module_from_spec(spec)
    sys.modules[name]=module
    spec.loader.exec_module(module)
    return module

def main():
    READY.mkdir(exist_ok=True)
    tex=HERE/f"Waseem_Raza_{VARIANT.upper()}.tex"
    args=[sys.executable,str(RESUME/"build.py"),"--variant",VARIANT]
    if not tex.is_file():
        args.append("--refresh-tex")
    subprocess.run(args,check=True)
    cv=HERE/f"Waseem_Raza_{VARIANT.upper()}.pdf"
    n=len(PdfReader(str(cv)).pages)
    if not 3<=n<=4:
        raise RuntimeError(f"Unexpected CV pages: {n}")
    shutil.copy2(cv,READY/f"{PREFIX}_CV.pdf")
    word=load(RESUME/"build_application_documents.py","norwich_docx")
    word.build_application(HERE,HERE/"application-documents.json")
    pdf=load(HERE.parent/"ece-shared-2027/build_packages.py","norwich_pdf")
    target=READY/f"{PREFIX}_Cover_Letter.pdf"
    pdf.render_md(HERE/"Cover_Letter.md",target,"CL")
    if len(PdfReader(str(target)).pages)!=1:
        raise RuntimeError("Cover letter must fit one page")
    shutil.copy2(HERE/f"{PREFIX}_Cover_Letter.docx",READY/f"{PREFIX}_Cover_Letter.docx")
    print(f"Norwich package: CV {n} pages, one-page cover letter. Reference template remains outside submission-ready.")
if __name__=="__main__":
    main()
