#!/usr/bin/env python3
"""Render UCNJ Engineering Technology adjunct cover letters from Markdown originals."""
from __future__ import annotations
from html import escape
from pathlib import Path
import re
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader

HERE=Path(__file__).resolve().parent
PDFS=[
 ("01_UCNJ_Cover_Letter_DAY.md","WRaza_ADJ_UCNJ_ENGTECH_SPR27_Cover_Letter_DAY.pdf"),
 ("02_UCNJ_Cover_Letter_EVENING.md","WRaza_ADJ_UCNJ_ENGTECH_SPR27_Cover_Letter_EVENING.pdf"),
]
def fonts():
    for folder in [Path("/usr/share/fonts/truetype/liberation"),Path("/usr/share/fonts/truetype/liberation2")]:
        a,b=folder/"LiberationSerif-Regular.ttf",folder/"LiberationSerif-Bold.ttf"
        if a.is_file() and b.is_file():
            pdfmetrics.registerFont(TTFont("AdjunctSerif",str(a)))
            pdfmetrics.registerFont(TTFont("AdjunctBold",str(b)))
            return "AdjunctSerif","AdjunctBold"
    return "Times-Roman","Times-Bold"
def fmt(text):
    out=escape(text.strip())
    return re.sub(r"\*\*(.*?)\*\*",r"<b>\1</b>",out)

def build(source,output):
    regular,bold=fonts()
    ink=colors.HexColor("#243247")
    blue=colors.HexColor("#12456b")
    body=ParagraphStyle("Body",fontName=regular,fontSize=9.45,leading=11.45,spaceAfter=5.8,textColor=ink)
    header=ParagraphStyle("Title",parent=body,fontName=bold,fontSize=13.5,leading=16.0,spaceAfter=7,textColor=blue)
    note=ParagraphStyle("Contact",parent=body,fontSize=8.8,leading=10,spaceAfter=0,textColor=colors.HexColor("#485d77"))
    pieces=[]
    for segment in re.split(r"\n\s*\n",source.read_text(encoding="utf-8").strip()):
        lines=segment.strip().splitlines()
        if not lines:continue
        if lines[0].startswith("# "):
            pieces.append(Paragraph(fmt(lines[0][2:]),header))
        elif lines[0].startswith("> "):
            pieces.append(Paragraph(fmt(segment.strip()[2:]),note))
        else:
            pieces.append(Paragraph("<br/>".join(fmt(l) for l in lines),body))
    def page_footer(canvas,doc):
        canvas.saveState()
        canvas.setStrokeColor(colors.HexColor("#ced9e3"))
        canvas.line(.75*inch,.47*inch,letter[0]-.75*inch,.47*inch)
        canvas.setFillColor(colors.HexColor("#617187"))
        canvas.setFont(regular,8)
        canvas.drawString(.75*inch,.32*inch,"Waseem Raza, PhD  |  UCNJ Engineering Technology Adjunct  |  Spring 2027")
        canvas.restoreState()
    doc=SimpleDocTemplate(str(output),pagesize=letter,topMargin=.61*inch,bottomMargin=.64*inch,
                          leftMargin=.76*inch,rightMargin=.76*inch,title=source.stem.replace("_"," "),
                          author="Waseem Raza, PhD")
    doc.build(pieces,onFirstPage=page_footer,onLaterPages=page_footer)
    pages=PdfReader(str(output)).pages
    if len(pages)!=1:
        raise RuntimeError(f"{output.name}: expected a one-page letter, found {len(pages)} pages")
    text=pages[0].extract_text() or ""
    for expected in ("Department of Technology","Computer Programming","Communication Systems","Wireless Communication"):
        if expected not in text:raise RuntimeError(f"Missing relevant detail: {expected}")
    print(f"{output.name}: one page, {len(text)} text characters")

def main():
    for filename,pdf in PDFS:build(HERE/filename,HERE/pdf)
if __name__=="__main__":main()
