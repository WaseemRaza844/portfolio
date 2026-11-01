#!/usr/bin/env python3
"""Generate four faculty submission packages from one canonical academic CV.

Editable text: application Cover_Letter.md and the shared ECE/CS statements.
Word versions: resume/build_application_documents.py, using the four manifests.
Private references and confidential letters are intentionally never packaged here.
"""
from __future__ import annotations

from html import escape
from pathlib import Path
from shutil import copyfile
import hashlib
import json
import re

from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph, SimpleDocTemplate

HERE=Path(__file__).resolve().parent
FACULTY=HERE.parent
CANONICAL_CV=HERE/"Waseem_Raza_FACULTY_ECE_SHARED_2027.pdf"
APPLICATIONS={
    "penn-state-behrend-ece-teaching-2027":"PSU_ECE_TL27",
    "penn-state-behrend-csse-teaching-2027":"PSU_CS_TL27",
    "penn-state-behrend-ece-assistant-professor-2027":"PSU_ECE_TT27",
    "princeton-ece-assistant-professor-2027":"PRI_ECE_TT27",
}
def fonts():
    roots=[
        Path("/usr/share/fonts/truetype/liberation"),
        Path("/usr/share/fonts/truetype/liberation2"),
        Path("C:/Windows/Fonts")
    ]
    for root in roots:
        a,b=root/"LiberationSerif-Regular.ttf",root/"LiberationSerif-Bold.ttf"
        if a.is_file() and b.is_file():
            pdfmetrics.registerFont(TTFont("FacultyDocBody",str(a)))
            pdfmetrics.registerFont(TTFont("FacultyDocBold",str(b)))
            return "FacultyDocBody","FacultyDocBold"
    return "Times-Roman","Times-Bold"

def formatted(text):
    out=escape(text.strip())
    out=re.sub(r"\*\*(.*?)\*\*",r"<b>\1</b>",out)
    out=re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)",r"<i>\1</i>",out)
    return out

def render_md(source,output,doc_kind):
    normal,bold=fonts()
    ink=colors.HexColor("#18283b")
    blue=colors.HexColor("#173f63")
    is_letter=doc_kind=="CL"
    body=ParagraphStyle(
        "FacultyBody",fontName=normal,fontSize=9.7 if is_letter else 10.0,
        leading=12.7 if is_letter else 13.7,
        spaceAfter=7.5 if is_letter else 9.2,
        textColor=ink,allowWidows=0,allowOrphans=0)
    h1=ParagraphStyle(
        "FacultyTitle",parent=body,fontName=bold,fontSize=14.7,leading=17.5,
        spaceAfter=11,keepWithNext=True,textColor=blue)
    h2=ParagraphStyle(
        "FacultyHeading",parent=body,fontName=bold,fontSize=11.1,leading=13.4,
        spaceBefore=11,spaceAfter=6,keepWithNext=True,textColor=blue)
    note=ParagraphStyle(
        "FacultyNote",parent=body,fontSize=8.6,leading=11,spaceAfter=8,
        textColor=colors.HexColor("#5a6b80"))
    flow=[]
    for paragraph in re.split(r"\n\s*\n",source.read_text(encoding="utf-8").strip()):
        item=paragraph.strip()
        if not item: continue
        if item.startswith("# "):
            flow.append(Paragraph(formatted(item[2:]),h1))
        elif item.startswith("## "):
            flow.append(Paragraph(formatted(item[3:]),h2))
        elif item.startswith("> "):
            flow.append(Paragraph(formatted(item[2:]),note))
        elif all(x.strip().startswith("- ") for x in item.splitlines()):
            for x in item.splitlines():
                flow.append(Paragraph("&#8226; "+formatted(x.strip()[2:]),body))
        else:
            flow.append(Paragraph("<br/>".join(formatted(line) for line in item.splitlines()),body))

    def footer(canvas,doc):
        canvas.saveState()
        w,_=letter
        canvas.setStrokeColor(colors.HexColor("#ced8e3"))
        canvas.line(.75*inch,.48*inch,w-.75*inch,.48*inch)
        canvas.setFont(normal,8.2)
        canvas.setFillColor(colors.HexColor("#5a6b80"))
        canvas.drawString(.77*inch,.31*inch,"Waseem Raza, PhD | Faculty Application | 2027")
        canvas.drawRightString(w-.77*inch,.31*inch,str(doc.page))
        canvas.restoreState()

    doc=SimpleDocTemplate(str(output),pagesize=letter,
                          leftMargin=.76*inch,rightMargin=.76*inch,
                          topMargin=.64*inch,bottomMargin=.70*inch,
                          title=source.stem.replace("_"," "),
                          author="Waseem Raza, PhD")
    doc.build(flow,onFirstPage=footer,onLaterPages=footer)
    pages=PdfReader(str(output)).pages
    text_pages=[(page.extract_text() or "").strip() for page in pages]
    limits={"CL":(1,2),"Teaching":(1,4),"Research":(1,5)}
    lo,hi=limits[doc_kind]
    if not(lo<=len(pages)<=hi):
        raise RuntimeError(f"{output}: unexpected {len(pages)} pages, allowed {lo}-{hi}")
    if any(len(t)<230 for t in text_pages):
        raise RuntimeError(f"{output}: sparse page, lengths={[len(t) for t in text_pages]}")
    print(f"{output.name}: {len(pages)} page(s); text lengths {[len(t) for t in text_pages]}")

def main():
    if not CANONICAL_CV.is_file():
        raise FileNotFoundError(f"Build shared faculty CV first: {CANONICAL_CV}")
    cv_bytes=CANONICAL_CV.read_bytes()
    assert len(PdfReader(str(CANONICAL_CV)).pages)>=3, "Unexpected short shared academic CV"
    cv_digest=hashlib.sha256(cv_bytes).hexdigest()
    for slug,short in APPLICATIONS.items():
        folder=FACULTY/slug
        ready=folder/"submission-ready"
        ready.mkdir(exist_ok=True)
        cv_path=ready/f"WRaza_{short}_CV.pdf"
        cv_path.write_bytes(cv_bytes)
        manifest=json.loads((folder/"application-documents.json").read_text(encoding="utf-8"))
        documents=manifest["documents"]
        if len(documents)!=3:
            raise ValueError(f"{slug}: expected a letter, teaching, and research")
        for i,(kind,spec) in enumerate(zip(("CL","Teaching","Research"),documents)):
            source=(folder/spec["source"]).resolve()
            if not source.is_file():
                raise FileNotFoundError(f"Missing source {source}")
            target=ready/f"WRaza_{short}_{kind}.pdf"
            render_md(source,target,kind)
            word=folder/spec["output"]
            if not word.is_file():
                raise FileNotFoundError(f"Run build_application_documents.py first: {word}")
            copyfile(word,ready/f"WRaza_{short}_{kind}.docx")
        if hashlib.sha256(cv_path.read_bytes()).hexdigest()!=cv_digest:
            raise RuntimeError(f"Common CV unexpectedly changed: {slug}")
        print(f"{slug}: packaged identical shared CV and 3 tailored document PDFs + Word files")

if __name__=="__main__":
    main()
