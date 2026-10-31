#!/usr/bin/env python3
"""Generate submission-style Rutgers ECE Lecturer supporting PDFs.

The references PDF is intentionally stamped INCOMPLETE until the applicant
inserts their privately confirmed third reference and all preferred contacts.
"""
from __future__ import annotations

import re
from html import escape
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether
from pypdf import PdfReader

HERE = Path(__file__).resolve().parent
DOCUMENTS = [
    ("01_Rutgers_Teaching_Philosophy.md", "Waseem_Raza_RUTGERS_Teaching_Philosophy.pdf", 3),
    ("02_Rutgers_List_of_Courses_Taught.md", "Waseem_Raza_RUTGERS_Courses_Taught.pdf", 2),
    ("03_Rutgers_Professional_References.md", "Waseem_Raza_RUTGERS_References_INCOMPLETE.pdf", 2),
    ("04_Rutgers_Optional_Cover_Letter.md", "Waseem_Raza_RUTGERS_Optional_Cover_Letter.pdf", 2),
]

def fonts():
    roots = [Path("/usr/share/fonts/truetype/liberation"),
             Path("/usr/share/fonts/truetype/liberation2"),
             Path("C:/Windows/Fonts")]
    candidates = [
        ("LiberationSerif-Regular.ttf", "LiberationSerif-Bold.ttf"),
        ("DejaVuSerif.ttf", "DejaVuSerif-Bold.ttf"),
    ]
    for root in roots:
        for a, b in candidates:
            if (root/a).is_file() and (root/b).is_file():
                pdfmetrics.registerFont(TTFont("FacultySerif", str(root/a)))
                pdfmetrics.registerFont(TTFont("FacultyBold", str(root/b)))
                return "FacultySerif", "FacultyBold"
    return "Times-Roman", "Times-Bold"

def markup(src: str) -> str:
    s = escape(src.strip())
    s = re.sub(r"\*\*(.*?)\*\*", r"<b>\1</b>", s)
    s = re.sub(r"\*(.*?)\*", r"<i>\1</i>", s)
    s = s.replace("  \n", "<br/>")
    return s

def section_styles(regular, bold):
    ink = colors.HexColor("#1a293b")
    blue = colors.HexColor("#174c71")
    return {
        "title": ParagraphStyle("Title",fontName=bold,fontSize=16,leading=19,spaceAfter=12,textColor=blue),
        "section": ParagraphStyle("Section",fontName=bold,fontSize=11.2,leading=13.5,spaceBefore=13,spaceAfter=7,keepWithNext=True,textColor=blue),
        "body": ParagraphStyle("Body",fontName=regular,fontSize=10.05,leading=14.1,spaceAfter=9.5,textColor=ink,alignment=TA_LEFT),
        "note": ParagraphStyle("Note",fontName=regular,fontSize=8.8,leading=12.3,spaceAfter=10,textColor=colors.HexColor("#536477")),
        "list": ParagraphStyle("List",fontName=regular,fontSize=9.8,leading=13.5,spaceAfter=6,leftIndent=14,firstLineIndent=-10,textColor=ink),
    }

def render_doc(source: Path, dest: Path, max_pages: int):
    regular,bold=fonts()
    styles=section_styles(regular,bold)
    text=source.read_text(encoding="utf-8")
    is_reference="References" in source.name
    flow=[]
    for block in re.split(r"\n\s*\n",text.strip()):
        raw=block.strip()
        if not raw:
            continue
        if raw.startswith("# "):
            flow.append(Paragraph(markup(raw[2:]),styles["title"]))
        elif raw.startswith("## "):
            flow.append(Paragraph(markup(raw[3:]),styles["section"]))
        elif raw.startswith("> "):
            flow.append(Paragraph(markup(raw[2:]),styles["note"]))
        elif re.fullmatch(r"(?:- .*(?:\n|$))+",raw):
            for line in raw.splitlines():
                flow.append(Paragraph("&#8226; " + markup(line[2:]),styles["list"]))
        else:
            paragraphs = raw.splitlines()
            flow.append(Paragraph("<br/>".join(markup(p) for p in paragraphs),styles["body"]))
    if is_reference:
        flow.insert(0,Paragraph("<font color='#aa3333'><b>DRAFT - CONFIRM THE REPLACEMENT THIRD REFEREE AND ALL CONTACT EMAILS BEFORE UPLOADING</b></font>",styles["note"]))

    def foot(canvas,document):
        canvas.saveState()
        w,h=letter
        canvas.setStrokeColor(colors.HexColor("#b6c8d7"))
        canvas.line(.73*inch,.44*inch,w-.73*inch,.44*inch)
        canvas.setFont(regular,8)
        canvas.setFillColor(colors.HexColor("#627384"))
        canvas.drawString(.75*inch,.30*inch,"Waseem Raza, PhD | Rutgers ECE Lecturer Application")
        canvas.drawRightString(w-.75*inch,.30*inch,f"Page {document.page}")
        canvas.restoreState()

    doc=SimpleDocTemplate(str(dest),pagesize=letter,leftMargin=.77*inch,rightMargin=.77*inch,
                          topMargin=.7*inch,bottomMargin=.63*inch,
                          title=source.stem.replace("_"," "),author="Waseem Raza, PhD",
                          pageCompression=1)
    doc.build(flow,onFirstPage=foot,onLaterPages=foot)
    count=len(PdfReader(str(dest)).pages)
    if not (1<=count<=max_pages):
        raise RuntimeError(f"{dest.name}: {count} pages outside expected 1-{max_pages}")
    print(f"Built {dest.name} ({count} page(s), {dest.stat().st_size} bytes)")
    return dest

def main():
    for src,output,max_pages in DOCUMENTS:
        render_doc(HERE/src,HERE/output,max_pages)

if __name__=="__main__":
    main()
