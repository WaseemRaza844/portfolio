#!/usr/bin/env python3
"""Copy generated Susquehanna documents to stable, descriptive upload filenames.

The references with emails are private and must not be copied into this repo.
"""
from pathlib import Path
from shutil import copyfile
from pypdf import PdfReader

HERE=Path(__file__).resolve().parent
DEST=HERE/"submission-ready"
PREFIX="WRaza_FAC_SUSQUEHANNA_CS_2027"
COPY={
    "Waseem_Raza_FACULTY_SUSQUEHANNA_CS_ASSISTANT_PROFESSOR_2027.pdf":f"{PREFIX}_CV.pdf",
    f"{PREFIX}_Cover_Letter.pdf":f"{PREFIX}_Cover_Letter.pdf",
    f"{PREFIX}_Teaching_Philosophy.pdf":f"{PREFIX}_Teaching_Philosophy.pdf",
    f"{PREFIX}_Research_Plan.pdf":f"{PREFIX}_Research_Plan.pdf",
    f"{PREFIX}_Cover_Letter.docx":f"{PREFIX}_Cover_Letter.docx",
    f"{PREFIX}_Teaching_Philosophy.docx":f"{PREFIX}_Teaching_Philosophy.docx",
    f"{PREFIX}_Research_Plan.docx":f"{PREFIX}_Research_Plan.docx",
}

def main():
    DEST.mkdir(exist_ok=True)
    for source,name in COPY.items():
        src=HERE/source
        if not src.is_file():
            raise FileNotFoundError(f"Build source first: {src}")
        target=DEST/name
        if src.resolve()!=target.resolve():
            copyfile(src,target)
        if target.suffix.lower()==".pdf":
            n=len(PdfReader(str(target)).pages)
            if n<1: raise RuntimeError("Empty PDF: "+str(target))
        print(target.relative_to(HERE))
    print("Private reference-contact list must be added separately, NOT committed.")

if __name__=="__main__":
    main()
