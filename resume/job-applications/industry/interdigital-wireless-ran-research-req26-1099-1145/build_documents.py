#!/usr/bin/env python3
"""Build one shared resume and two separate InterDigital cover letters."""
from pathlib import Path
import importlib.util
import shutil
import subprocess
import sys
from pypdf import PdfReader
from docx import Document

HERE=Path(__file__).resolve().parent
RESUME=HERE.parents[2]
READY=HERE/"submission-ready"
PDF="Waseem_Raza_INTERDIGITAL_WIRELESS_RAN_RESEARCH.pdf"

def load(path,name):
    spec=importlib.util.spec_from_file_location(name,str(path))
    module=importlib.util.module_from_spec(spec)
    sys.modules[name]=module
    spec.loader.exec_module(module)
    return module

def main():
    READY.mkdir(exist_ok=True)
    subprocess.run([sys.executable,str(RESUME/"build_tailored.py"),"--job","interdigital-wireless-ran-research-req26-1099-1145"],check=True)
    shared=READY/"WRaza_IDCC_Wireless_RAN_Research_Resume.pdf"
    shutil.copy2(HERE/PDF,shared)
    pages=PdfReader(str(shared)).pages
    assert len(pages)==3, "Shared resume must have exactly three pages"
    body=" ".join(p.extract_text() or "" for p in pages)
    for term in ("TurboRAN","SyntheticNET","PyTorch","5G Core","NR-NTN","Futurewei","CSI","RAG"):
        assert term.lower() in body.lower(),f"Missing keyword: {term}"
    word=load(RESUME/"build_application_documents.py","idcc_shared_word")
    word.build_application(HERE,HERE/"application-documents.json")
    pdf=load(RESUME/"job-applications/faculty/ece-shared-2027/build_packages.py","idcc_shared_pdf")
    for req in ("1099","1145"):
        stem=f"WRaza_IDCC_REQ26_{req}_Cover_Letter"
        docx=HERE/(stem+".docx")
        assert len(Document(docx).paragraphs)>5
        shutil.copy2(docx,READY/docx.name)
        target=READY/(stem+".pdf")
        pdf.render_md(HERE/f"Cover_Letter_REQ26_{req}.md",target,"CL")
        cover_pages=PdfReader(str(target)).pages
        assert len(cover_pages)==1,f"Cover letter {req} must fit one page"
        assert f"REQ26-{req}" in (cover_pages[0].extract_text() or "")
    print("VALIDATED: one three-page shared resume and two one-page cover letters in PDF and Word.")
if __name__=="__main__":
    main()
