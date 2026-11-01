#!/usr/bin/env python3
"""Package one shared UCNJ CV and short day/evening cover-letter filenames."""
from pathlib import Path
from shutil import copyfile
from pypdf import PdfReader

HERE=Path(__file__).resolve().parent
DEST=HERE/"submission-ready"
SOURCES={
    "Waseem_Raza_FACULTY_UCNJ_ENGINEERING_TECHNOLOGY_ADJUNCT_SPRING_2027.pdf":
        "WRaza_FAC_UCNJ_ET27_CV.pdf",
    "WRaza_ADJ_UCNJ_ENGTECH_SPR27_Cover_Letter_DAY.pdf":
        "WRaza_FAC_UCNJ_ET27_CL_Day.pdf",
    "WRaza_ADJ_UCNJ_ENGTECH_SPR27_Cover_Letter_EVENING.pdf":
        "WRaza_FAC_UCNJ_ET27_CL_Eve.pdf",
    "WRaza_ADJ_UCNJ_ENGTECH_SPR27_Cover_Letter_DAY.docx":
        "WRaza_FAC_UCNJ_ET27_CL_Day.docx",
    "WRaza_ADJ_UCNJ_ENGTECH_SPR27_Cover_Letter_EVENING.docx":
        "WRaza_FAC_UCNJ_ET27_CL_Eve.docx",
}

def main():
    DEST.mkdir(exist_ok=True)
    # Do not leave confusing legacy long-name copies in the upload directory.
    for old in DEST.glob("WRaza_ADJ_UCNJ_ENGTECH_SPR27_*"):
        if old.is_file():
            old.unlink()
    for original, name in SOURCES.items():
        src=HERE/original
        if not src.is_file():
            raise FileNotFoundError(f"Generate source before packaging: {src}")
        target=DEST/name
        copyfile(src,target)
        if target.suffix==".pdf":
            count=len(PdfReader(str(target)).pages)
            if name.endswith("_CV.pdf") and count!=3:
                raise RuntimeError(f"Expected three CV pages; got {count}")
            if name.endswith(("_CL_Day.pdf","_CL_Eve.pdf")) and count!=1:
                raise RuntimeError(f"Expected a one-page letter; got {count}")
        print(target.relative_to(HERE))
    print("Only one CV for both schedules. Transcripts remain private.")

if __name__=="__main__":
    main()
