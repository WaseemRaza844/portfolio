#!/usr/bin/env python3
"""Detect severe short-line, hyphenation and page-break regressions in faculty PDFs.

Purposefully targets layout defects; a strict 70%-filled final-line rule would
reject natural, correct paragraphs and is not used.
"""
from __future__ import annotations

import argparse
import re
from pathlib import Path
import fitz

HERE = Path(__file__).resolve().parent


def lines_in(page):
    lines = []
    for block in page.get_text("dict")["blocks"]:
        if block.get("type") != 0:
            continue
        for line in block["lines"]:
            text = "".join(span["text"] for span in line["spans"]).strip()
            if text:
                x0, y0, x1, y1 = line["bbox"]
                lines.append((round(y0, 2), round(x0, 2), x1 - x0, text))
    return sorted(lines, key=lambda v: (v[0], v[1]))


def check_pdf(path):
    document = fitz.open(path)
    errors = []
    warnings = []
    for number, page in enumerate(document, 1):
        lines = lines_in(page)
        margin = 0.06 * page.rect.width
        max_width = page.rect.width - 2 * margin
        leading = [(y, x, width, t) for y, x, width, t in lines if x < margin + 45]
        if leading:
            first = leading[0][3]
            if first.startswith("•"):
                errors.append(f"{path.name} page {number}: starts mid-bullet: {first[:72]}")
        # Track actual bullet paragraphs rather than guessing from indentation.
        # Titles, venues, dates and certificate rows can have the same indent.
        active_bullet = False
        previous = None
        for y, x, width, t in lines:
            if previous:
                prev_y, prev_x, _, prev_t = previous
                contiguous = 0 < y-prev_y < 14.5
                if (prev_t.endswith("-") and re.match(r"^[a-z]", t) and
                        contiguous and x < margin + 40 and prev_x < margin + 40):
                    errors.append(f"{path.name} page {number}: word hyphenated "
                                  f"across lines: {prev_t[-28:]} / {t[:28]}")
                if active_bullet and contiguous and margin + 7 <= x <= margin + 36 and not prev_t.endswith((".", "!", "?")):
                    ratio = width / max_width
                    if ratio < .23 and len(t.split()) <= 4:
                        errors.append(f"{path.name} page {number}: orphaned bullet "
                                      f"({ratio:.0%} line width): {t}")
                    elif ratio < .42 and len(t.split()) <= 6:
                        warnings.append(f"{path.name} page {number}: short bullet end "
                                        f"({ratio:.0%}): {t}")
                else:
                    active_bullet = False
            if t.startswith("•"):
                active_bullet = True
            previous = (y, x, width, t)
    return errors, warnings


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--directory", type=Path, default=HERE/"output"/"faculty")
    args = parser.parse_args()
    files = sorted(args.directory.glob("Waseem_Raza_*.pdf"))
    if len(files) < 3:
        parser.error(f"Expected all three academic PDFs in {args.directory}; got {len(files)}")
    errors, warnings = [], []
    for file in files:
        bad, caution = check_pdf(file)
        errors.extend(bad)
        warnings.extend(caution)
        print(f"Layout reviewed: {file.name}")
    for issue in warnings:
        print("Layout warning:", issue)
    for issue in errors:
        print("Layout ERROR:", issue)
    print(f"Faculty layout audit: {len(errors)} errors; {len(warnings)} warnings")
    if errors:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
