#!/usr/bin/env python3
"""Render the Princeton Lecturer cover letter Markdown to a submission-ready PDF."""
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
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Spacer

HERE = Path(__file__).resolve().parent
SOURCE = HERE / "01_Princeton_Cover_Letter.md"
OUTPUT = HERE / "Waseem_Raza_PRINCETON_LECTURER_COVER_LETTER.pdf"


def setup_fonts():
    path = Path("/usr/share/fonts/truetype/liberation")
    fonts = {
        "ApplicationSerif": "LiberationSerif-Regular.ttf",
        "ApplicationSerifBold": "LiberationSerif-Bold.ttf",
    }
    if all((path / file).exists() for file in fonts.values()):
        for name, file in fonts.items():
            pdfmetrics.registerFont(TTFont(name, str(path / file)))
        return "ApplicationSerif", "ApplicationSerifBold"
    return "Times-Roman", "Times-Bold"


def main():
    regular, bold = setup_fonts()
    raw = SOURCE.read_text(encoding="utf-8")
    if "\\[" in raw:
        raise ValueError("Unfilled template brackets remain in cover letter")
    paragraphs = [p.strip() for p in re.split(r"\\n\\s*\\n", raw) if p.strip()]
    if not paragraphs or paragraphs[0] != "# Letter of Application":
        raise ValueError("Unrecognized letter source")
    body = paragraphs[1:]
    accent = colors.HexColor("#263B52")
    normal = ParagraphStyle(
        "Body", fontName=regular, fontSize=10.2, leading=12.85,
        spaceAfter=9, alignment=TA_LEFT, textColor=colors.HexColor("#222831"),
    )
    compact = ParagraphStyle(
        "Compact", parent=normal, fontSize=9.8, leading=12.1, spaceAfter=5,
    )
    sub = ParagraphStyle("Subject", parent=normal, fontName=bold, fontSize=9.8, leading=12.2, spaceAfter=13)
    signature = ParagraphStyle("Signature", parent=normal, spaceAfter=1)
    footer = ParagraphStyle("Contact", parent=normal, fontSize=8.9, leading=11, spaceAfter=0, textColor=accent)
    doc = SimpleDocTemplate(
        str(OUTPUT), pagesize=letter,
        topMargin=0.62*inch, bottomMargin=0.52*inch,
        leftMargin=0.78*inch, rightMargin=0.78*inch,
        title="Princeton University ECE Lecturer - Cover Letter",
        author="Waseem Raza, PhD",
    )
    elements = []
    for i, block in enumerate(body):
        clean = escape(block).replace("\\n", "<br/>")
        if i == 0:
            elements.append(Paragraph(clean, compact))
        elif block.startswith("Members of the"):
            elements.append(Paragraph(clean, compact))
            elements.append(Spacer(1, 5))
        elif block.startswith("Re:"):
            elements.append(Paragraph(clean, sub))
        elif block.startswith("Dear "):
            elements.append(Paragraph(clean, compact))
        elif block == "Sincerely,":
            elements.append(Spacer(1, 2))
            elements.append(Paragraph(clean, compact))
        elif block.startswith("Waseem Raza"):
            elements.append(Paragraph(clean, signature))
        elif block.startswith(">"):
            elements.append(Paragraph(escape(block[1:].strip()), footer))
        else:
            elements.append(Paragraph(clean, normal))
    doc.build(elements)
    count = len(PdfReader(OUTPUT).pages)
    if count != 1:
        raise RuntimeError(f"Princeton cover letter must be 1 page; got {count}")
    print(f"Created {OUTPUT.name}: 1 page, {OUTPUT.stat().st_size} bytes")


if __name__ == "__main__":
    main()
