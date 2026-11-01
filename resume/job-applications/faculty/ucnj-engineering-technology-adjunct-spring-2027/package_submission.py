#!/usr/bin/env python3
"""Copy public generated UCNJ documents to concise submission names. Never package transcripts."""
from pathlib import Path
from shutil import copyfile
from pypdf import PdfReader

HERE=Path(__file__).resolve().parent
DEST=HERE/"submission-ready"
SOURCES={
  "Waseem_Raza_FACULTY_UCNJ_ENGINEERING_TECHNOLOGY_ADJUNCT_SPRING_2027.pdf":"WRaza_ADJ_UCNJ_ENGTECH_SPR27_CV.pdf",
  "WRaza_ADJ_UCNJ_ENGTECH_SPR27_Cover_Letter_DAY.pdf":"WRaza_ADJ_UCNJ_ENGTECH_SPR27_Cover_Letter_DAY.pdf",
  "WRaza_ADJ_UCNJ_ENGTECH_SPR27_Cover_Letter_EVENING.pdf":"WRaza_ADJ_UCNJ_ENGTECH_SPR27_Cover_Letter_EVENING.pdf",
  "WRaza_ADJ_UCNJ_ENGTECH_SPR27_Cover_Letter_DAY.docx":"WRaza_ADJ_UCNJ_ENGTECH_SPR27_Cover_Letter_DAY.docx",
  "WRaza_ADJ_UCNJ_ENGTECH_SPR27_Cover_Letter_EVENING.docx":"WRaza_ADJ_UCNJ_ENGTECH_SPR27_Cover_Letter_EVENING.docx",
}
def main():
    DEST.mkdir(exist_ok=True)
    for src,dest in SOURCES.items():
        source=HERE/src
        if not source.is_file():raise FileNotFoundError(source)
        output=DEST/dest
        copyfile(source,output)
        if dest.endswith(".pdf"):
            pages=len(PdfReader(str(output)).pages)
            if pages==0 or (dest.endswith("_Cover_Letter_DAY.pdf") or dest.endswith("_Cover_Letter_EVENING.pdf")) and pages!=1:
                raise RuntimeError(f"Unexpected page count for {dest}: {pages}")
        print(output.relative_to(HERE))
    print("Add your unofficial academic transcripts privately in the hiring portal; do not commit them here.")
if __name__=="__main__":main()
