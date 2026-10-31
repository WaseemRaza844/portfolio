#!/usr/bin/env python3
"""Produce consistently named Rutgers application files without changing legacy build inputs.

The private reference-contact document is intentionally NOT copied from GitHub:
its final PDF must be generated from the applicant's privately held list.
"""
from pathlib import Path
from shutil import copyfile
from pypdf import PdfReader

BASE = Path(__file__).resolve().parent
DEST = BASE / "submission-ready"
PREFIX = "WRaza_FAC_RUTGERS_ECE_LECT_2026"

COPY_MAP = {
    "Waseem_Raza_FACULTY_RUTGERS_ECE_LECTURER_2026.pdf": f"{PREFIX}.pdf",
    "Waseem_Raza_RUTGERS_Teaching_Philosophy.pdf": f"{PREFIX}_Teaching_Philosophy.pdf",
    "Waseem_Raza_RUTGERS_Courses_Taught.pdf": f"{PREFIX}_Courses_Taught.pdf",
    "Waseem_Raza_RUTGERS_Optional_Cover_Letter.pdf": f"{PREFIX}_Cover_Letter.pdf",
    "01_Rutgers_Teaching_Philosophy.docx": f"{PREFIX}_Teaching_Philosophy.docx",
    "02_Rutgers_List_of_Courses_Taught.docx": f"{PREFIX}_Courses_Taught.docx",
    "04_Rutgers_Optional_Cover_Letter.docx": f"{PREFIX}_Cover_Letter.docx",
}

def main():
    DEST.mkdir(exist_ok=True)
    for original, new_name in COPY_MAP.items():
        src = BASE / original
        if not src.is_file():
            raise FileNotFoundError(f"Build {original} before packaging")
        out = DEST / new_name
        copyfile(src, out)
        if out.suffix.lower() == ".pdf":
            pages = len(PdfReader(str(out)).pages)
            if pages < 1 or (new_name.endswith("_Cover_Letter.pdf") and pages != 1):
                raise RuntimeError(f"Unexpected page count: {new_name} ({pages})")
        print(f"{out.relative_to(BASE)} ({out.stat().st_size:,} bytes)")
    print("Public submission package generated; add the completed private references PDF separately.")

if __name__ == "__main__":
    main()
