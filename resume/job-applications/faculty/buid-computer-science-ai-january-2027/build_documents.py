#!/usr/bin/env python3
"""Generate BUiD AI faculty application PDFs and package Word copies.

Canonical text is in adjacent Markdown files.
Editable Word files are created by resume/build_application_documents.py.
No private referee emails, immigration documents or transcripts are packaged.
"""
from __future__ import annotations

from html import escape
from pathlib import Path
from shutil import copyfile
import re

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether
from pypdf import PdfReader

HERE = Path(__file__).resolve().parent
READY = HERE / "submission-ready"
PREFIX = "WRaza_BUID_AI27"

DOCUMENTS = [
    ("Academic_CV_AI.md", "CV", "Academic curriculum vitae", 3, 7),
    ("Cover_Letter.md", "Cover_Letter", "Cover letter", 1, 2),
    ("Teaching_Statement.md", "Teaching_Statement", "Teaching statement", 1, 4),
    ("Research_Statement.md", "Research_Statement", "Research statement", 1, 4),
]


def inline_md(value: str) -> str:
    value = escape(value.strip())
    value = re.sub(r"\\*\\*(.+?)\\*\\*", r"<b>\\1</b>", value)
    value = re.sub(r"(?<!\\*)\\*([^*]+)\\*(?!\\*)", r"<i>\\1</i>", value)
    return value


def render(source: Path, target: Path, kind: str):
    is_cv = kind == "CV"
    is_letter = kind == "Cover_Letter"
    navy = colors.HexColor("#20334a")
    muted = colors.HexColor("#596779")
    body = ParagraphStyle(
        "Body", fontName="Helvetica", fontSize=8.7 if is_cv else (9.5 if is_letter else 9.65),
        leading=11.2 if is_cv else (12.6 if is_letter else 13.0),
        spaceAfter=5.4 if is_cv else (7 if is_letter else 8),
        textColor=navy, allowWidows=0, allowOrphans=0,
    )
    title = ParagraphStyle(
        "Title", parent=body, fontName="Helvetica-Bold", fontSize=14.1,
        leading=17.1, spaceAfter=9, textColor=colors.HexColor("#163f65"), keepWithNext=True,
    )
    heading = ParagraphStyle(
        "Heading", parent=body, fontName="Helvetica-Bold",
        fontSize=10.25 if is_cv else 11.2, leading=12.6 if is_cv else 14,
        spaceBefore=8.5 if is_cv else 12, spaceAfter=4.4,
        keepWithNext=True, textColor=colors.HexColor("#164975"),
    )
    bullet = ParagraphStyle(
        "Bullet", parent=body, leftIndent=11, firstLineIndent=-8,
        spaceAfter=3.7 if is_cv else 5,
    )
    note = ParagraphStyle(
        "Note", parent=body, fontSize=8.3, leading=10.1,
        spaceAfter=5, textColor=muted,
    )

    story = []
    for part in re.split(r"\\n\\s*\\n", source.read_text(encoding="utf-8").strip()):
        lines = [x.rstrip() for x in part.strip().splitlines() if x.strip()]
        if not lines:
            continue
        first = lines[0].strip()
        if first.startswith("# "):
            story.append(Paragraph(inline_md(first[2:]), title))
        elif first.startswith("## "):
            story.append(Paragraph(inline_md(first[3:]), heading))
        elif all(x.strip().startswith("- ") for x in lines):
            for row in lines:
                story.append(Paragraph("&#8226; " + inline_md(row.strip()[2:]), bullet))
        elif first.startswith("> "):
            for row in lines:
                story.append(Paragraph(inline_md(row.strip().removeprefix("> ")), note))
        else:
            story.append(Paragraph("<br/>".join(inline_md(row) for row in lines), body))

    def footer(canvas, doc):
        canvas.saveState()
        w, _ = A4
        canvas.setStrokeColor(colors.HexColor("#c9d6e0"))
        canvas.line(1.7*cm, 1.35*cm, w-1.7*cm, 1.35*cm)
        canvas.setFont("Helvetica", 7.7)
        canvas.setFillColor(muted)
        canvas.drawString(1.72*cm, 1.0*cm, "Waseem Raza, PhD  |  BUiD Computer Science – Artificial Intelligence")
        canvas.drawRightString(w-1.72*cm, 1.0*cm, str(doc.page))
        canvas.restoreState()

    pdf = SimpleDocTemplate(
        str(target), pagesize=A4,
        leftMargin=1.8*cm, rightMargin=1.8*cm,
        topMargin=1.75*cm, bottomMargin=1.8*cm,
        title=source.stem.replace("_", " "),
        author="Waseem Raza, PhD",
    )
    pdf.build(story, onFirstPage=footer, onLaterPages=footer)
    return len(PdfReader(str(target)).pages)


def main():
    READY.mkdir(exist_ok=True)
    for source_name, part, label, min_pages, max_pages in DOCUMENTS:
        src = HERE / source_name
        if not src.is_file():
            raise FileNotFoundError("Missing canonical source: " + str(src))
        stem = PREFIX + "_" + part
        pdf = READY / (stem + ".pdf")
        pages = render(src, pdf, part)
        if not min_pages <= pages <= max_pages:
            raise RuntimeError(f"{label} has {pages} pages; expected {min_pages}-{max_pages}")
        word = HERE / (stem + ".docx")
        if not word.is_file():
            raise FileNotFoundError("First run python resume/build_application_documents.py: " + str(word))
        copyfile(word, READY / word.name)
        extracted = "\\n".join(page.extract_text() or "" for page in PdfReader(str(pdf)).pages)
        if len(extracted) < 400:
            raise RuntimeError("PDF text unexpectedly empty: " + str(pdf))
        if part == "CV":
            for phrase in ("Student supervision", "Research funding", "Computer Programming", "Computer Communications"):
                if phrase.casefold() not in extracted.casefold():
                    raise RuntimeError("CV missing required posting evidence: " + phrase)
        print(f"{label}: {pages} page(s) | PDF + editable Word | {pdf.name}")

    print("Only these four public application documents are in", READY)
    print("Academic referee contact details remain private.")
    print("Review the CV's funding and supervision record before applying.")


if __name__ == "__main__":
    main()
