#!/usr/bin/env python3
"""Build Rutgers tenure-track ECE application using existing CV/document renderers."""
from __future__ import annotations
import importlib.util
import shutil
import subprocess
import sys
from pathlib import Path
from pypdf import PdfReader
from docx import Document

HERE=Path(__file__).resolve().parent
RESUME=HERE.parents[2]
READY=HERE/"submission-ready"
VARIANT="faculty_rutgers_ece_assistant_professor_26fa1036"
PREFIX="WRaza_RU_ECE26FA1036"

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
        print("Generating Rutgers ECE tenure-track CV from existing faculty profile.",flush=True)
    subprocess.run(args,check=True)
    src=HERE/f"Waseem_Raza_{VARIANT.upper()}.pdf"
    cv=READY/f"{PREFIX}_CV.pdf"
    shutil.copy2(src,cv)
    cvpages=PdfReader(str(cv)).pages
    if not 3<=len(cvpages)<=4:
        raise RuntimeError(f"Expected 3-4 CV pages, found {len(cvpages)}")
    for i,p in enumerate(cvpages):
        if len((p.extract_text() or "").strip())<500:
            raise RuntimeError(f"Sparse CV page {i+1}")
    word=load(RESUME/"build_application_documents.py","rutgers_tt_word")
    created=word.build_application(HERE,HERE/"application-documents.json")
    if len(created)!=3:
        raise RuntimeError("Expected three editable documents")
    pdf=load(HERE.parent/"ece-shared-2027"/"build_packages.py","rutgers_tt_pdf")
    specs=[("Cover_Letter","CL",1,2),("Research_Statement","Research",1,3),("Teaching_Statement","Teaching",1,3)]
    for suffix,kind,lower,upper in specs:
        source=HERE/f"{suffix}.md"
        target=READY/f"{PREFIX}_{suffix}.pdf"
        pdf.render_md(source,target,kind)
        count=len(PdfReader(str(target)).pages)
        if not lower<=count<=upper:
            raise RuntimeError(f"{suffix}: unexpected {count} pages")
        wordfile=HERE/f"{PREFIX}_{suffix}.docx"
        if not wordfile.is_file() or len(Document(wordfile).paragraphs)<6:
            raise RuntimeError(f"Invalid Word document: {wordfile}")
        shutil.copy2(wordfile,READY/wordfile.name)
    for file in READY.glob(PREFIX+"*"):
        if file.stat().st_size<10000:
            raise RuntimeError(f"Unexpectedly small document: {file}")
    print(f"VALIDATED Rutgers: CV {len(cvpages)} pages, cover/research/teaching PDF and DOCX. References stay private.")
if __name__=="__main__":
    main()
