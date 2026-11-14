#!/usr/bin/env python3
"""Build Seton Hall Data Science tenure-track application using existing repository templates."""
from __future__ import annotations

import importlib.util
import shutil
import subprocess
import sys
from pathlib import Path

from docx import Document
from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer

HERE = Path(__file__).resolve().parent
RESUME = HERE.parents[2]
READY = HERE / "submission-ready"
VARIANT = "faculty_seton_hall_data_science_assistant_professor_497507"
PREFIX = "WRaza_SHU_DS497507"

def load(path, name):
    spec = importlib.util.spec_from_file_location(name, str(path))
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module

def make_unsigned_waiver(output):
    style = ParagraphStyle(
        "WaiverBody", fontName="Helvetica", fontSize=10.5, leading=16,
        spaceAfter=14, textColor=colors.HexColor("#203047"),
    )
    heading = ParagraphStyle(
        "WaiverHeading", parent=style, fontName="Helvetica-Bold",
        fontSize=15, leading=19, spaceAfter=20,
    )
    blocks = [
        Paragraph("Statement Regarding Access to Reference Letters", heading),
        Paragraph("<b>Applicant:</b> Waseem Raza, PhD", style),
        Paragraph("<b>Position:</b> Assistant Professor in Data Science", style),
        Paragraph("<b>Institution:</b> Seton Hall University | <b>Job Number:</b> 497507", style),
        Spacer(1, 12),
        Paragraph(
            "I voluntarily waive my right to inspect or review confidential letters of reference "
            "submitted in support of my application for the above faculty position, to the extent "
            "permitted by applicable law and institutional policy.", style
        ),
        Paragraph(
            "I understand that this waiver concerns my access to the confidential reference "
            "letters and does not replace any required consent or authorization requested "
            "in the university application system.", style
        ),
        Spacer(1, 28),
        Paragraph("<b>Applicant signature:</b> ____________________________________", style),
        Paragraph("<b>Date:</b> ____________________________________", style),
        Spacer(1, 10),
        Paragraph("<i>Unsigned draft. Review and sign only if you choose to make this waiver.</i>", style),
    ]
    doc = SimpleDocTemplate(
        str(output), pagesize=letter, leftMargin=.84*inch,
        rightMargin=.84*inch, topMargin=.8*inch, bottomMargin=.8*inch,
        title="Seton Hall Reference Letter Waiver - Unsigned", author="Waseem Raza",
    )
    doc.build(blocks)
    if len(PdfReader(str(output)).pages) != 1:
        raise RuntimeError("Reference waiver must fit one page")

def main():
    READY.mkdir(exist_ok=True)
    tex = HERE / f"Waseem_Raza_{VARIANT.upper()}.tex"
    args = [sys.executable, str(RESUME / "build.py"), "--variant", VARIANT]
    if not tex.is_file():
        args.append("--refresh-tex")
        print("First build: generating Seton Hall CV LaTeX source.", flush=True)
    subprocess.run(args, check=True)
    cv_src = HERE / f"Waseem_Raza_{VARIANT.upper()}.pdf"
    if not cv_src.exists():
        raise FileNotFoundError(f"Faculty CV not generated: {cv_src}")
    cv_pages = len(PdfReader(str(cv_src)).pages)
    if not 4 <= cv_pages <= 5:
        raise RuntimeError(f"Expected four or five CV pages, found {cv_pages}")
    shutil.copy2(cv_src, READY / f"{PREFIX}_CV.pdf")

    word = load(RESUME / "build_application_documents.py", "shu_docx")
    created = word.build_application(HERE, HERE / "application-documents.json")
    if len(created) != 5:
        raise RuntimeError("Expected five editable supporting documents")

    pdf_renderer = load(HERE.parent / "ece-shared-2027" / "build_packages.py", "shu_pdf")
    doc_specs = [
        ("Cover_Letter", "CL", 1, 2),
        ("Teaching_Statement", "Teaching", 1, 3),
        ("Research_Statement", "Research", 1, 3),
        ("Diversity_Statement", "Teaching", 1, 3),
    ]
    for suffix, kind, min_pages, max_pages in doc_specs:
        src = HERE / (suffix + ".md")
        target = READY / f"{PREFIX}_{suffix}.pdf"
        pdf_renderer.render_md(src, target, kind)
        count = len(PdfReader(str(target)).pages)
        if not min_pages <= count <= max_pages:
            raise RuntimeError(f"{suffix} has {count} pages; expected {min_pages} to {max_pages}")
        docx = HERE / f"{PREFIX}_{suffix}.docx"
        if not docx.is_file():
            raise FileNotFoundError(docx)
        shutil.copy2(docx, READY / docx.name)

    waiver_docx = HERE / f"{PREFIX}_Reference_Waiver_UNSIGNED.docx"
    if not waiver_docx.is_file():
        raise FileNotFoundError(waiver_docx)
    shutil.copy2(waiver_docx, READY / waiver_docx.name)
    waiver_pdf = READY / f"{PREFIX}_Reference_Waiver_UNSIGNED.pdf"
    make_unsigned_waiver(waiver_pdf)
    if "Unsigned" not in " ".join(p.text for p in Document(waiver_docx).paragraphs):
        raise RuntimeError("Unsigned disclaimer missing from editable waiver")
    print(f"Seton Hall package ready: CV {cv_pages} pages; four statements/letter and unsigned waiver.")

if __name__ == "__main__":
    main()
