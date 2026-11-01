#!/usr/bin/env python3
"""Build public Susquehanna application PDFs from the editable Markdown originals.

The private referee contact sheet is deliberately excluded.
"""
from __future__ import annotations
import re
from html import escape
from pathlib import Path
from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, KeepTogether, Spacer

ROOT = Path(__file__).resolve().parent
FILES = [
    ("01_Susquehanna_Cover_Letter.md", "WRaza_FAC_SUSQUEHANNA_CS_2027_Cover_Letter.pdf", 2),
    ("02_Susquehanna_Teaching_Philosophy.md", "WRaza_FAC_SUSQUEHANNA_CS_2027_Teaching_Philosophy.pdf", 4),
    ("03_Susquehanna_Research_Plan.md", "WRaza_FAC_SUSQUEHANNA_CS_2027_Research_Plan.pdf", 5),
]

def load_fonts():
    roots = [Path("/usr/share/fonts/truetype/liberation"),
             Path("/usr/share/fonts/truetype/liberation2"),
             Path("C:/Windows/Fonts")]
    for root in roots:
        a, b = root/"LiberationSerif-Regular.ttf", root/"LiberationSerif-Bold.ttf"
        if a.is_file() and b.is_file():
            pdfmetrics.registerFont(TTFont("SURegular", str(a)))
            pdfmetrics.registerFont(TTFont("SUBold", str(b)))
            return "SURegular", "SUBold"
    return "Times-Roman", "Times-Bold"

def md_text(text):
    result=escape(text.strip())
    result=re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>",result)
    result=re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)",r"<i>\1</i>",result)
    return result

def build(source, output, limit, regular, bold):
    is_letter="Cover_Letter" in source.name
    ink=colors.HexColor("#17263a")
    navy=colors.HexColor("#124c73")
    body=ParagraphStyle("Body",fontName=regular,fontSize=10.0 if is_letter else 10.1,
                        leading=13.25 if is_letter else 14.15,spaceAfter=8.8 if is_letter else 10.4,
                        textColor=ink,alignment=TA_LEFT,allowWidows=0,allowOrphans=0)
    title=ParagraphStyle("Title",parent=body,fontName=bold,fontSize=15,leading=17,
                         textColor=navy,spaceAfter=12,keepWithNext=True)
    heading=ParagraphStyle("Heading",parent=body,fontName=bold,fontSize=11.15,leading=13,
                           textColor=navy,spaceBefore=12,spaceAfter=6,keepWithNext=True)
    note=ParagraphStyle("Note",parent=body,fontSize=9.0,leading=11.4,spaceAfter=9,
                        textColor=colors.HexColor("#53657b"))
    bullet=ParagraphStyle("Bullet",parent=body,leftIndent=15,firstLineIndent=-10,spaceAfter=6)
    flow=[]
    src=source.read_text(encoding="utf-8")
    for part in re.split(r"\n\s*\n",src.strip()):
        part=part.strip()
        if not part: continue
        if part.startswith("# "):
            flow.append(Paragraph(md_text(part[2:]),title))
        elif part.startswith("## "):
            flow.append(Paragraph(md_text(part[3:]),heading))
        elif part.startswith("> "):
            flow.append(Paragraph(md_text(part[2:]),note))
        elif all(x.strip().startswith("- ") for x in part.splitlines()):
            for line in part.splitlines():
                flow.append(Paragraph("&#8226; "+md_text(line.strip()[2:]),bullet))
        else:
            lines=[md_text(x) for x in part.splitlines()]
            flow.append(Paragraph("<br/>".join(lines),body))
    def footer(canvas,doc):
        canvas.saveState()
        w,h=letter
        canvas.setStrokeColor(colors.HexColor("#c8d6e1"))
        canvas.line(.72*inch,.47*inch,w-.72*inch,.47*inch)
        canvas.setFillColor(colors.HexColor("#607389"))
        canvas.setFont(regular,8.2)
        canvas.drawString(.75*inch,.31*inch,"Waseem Raza, PhD  |  Susquehanna University  |  Computer Science")
        canvas.drawRightString(w-.75*inch,.31*inch,str(doc.page))
        canvas.restoreState()
    doc=SimpleDocTemplate(str(output),pagesize=letter,
         leftMargin=.78*inch,rightMargin=.78*inch,topMargin=.64*inch,bottomMargin=.69*inch,
         title=source.stem.replace("_"," "),author="Waseem Raza, PhD")
    doc.build(flow,onFirstPage=footer,onLaterPages=footer)
    reader=PdfReader(str(output))
    count=len(reader.pages)
    if not (1 <= count <= limit):
        raise RuntimeError(f"{output.name} has {count} pages; expected at most {limit}")
    texts=[page.extract_text() or "" for page in reader.pages]
    if any(len(page.strip()) < (180 if is_letter else 240) for page in texts):
        raise RuntimeError(f"{output.name} has a sparse page ({[len(p.strip()) for p in texts]})")
    print(f"{output.name}: {count} pages; text lengths {[len(p.strip()) for p in texts]}")

def main():
    regular,bold=load_fonts()
    for src,out,maxpages in FILES:
        build(ROOT/src,ROOT/out,maxpages,regular,bold)

if __name__=="__main__":
    main()
