#!/usr/bin/env python3
"""Generate resume PDFs from the existing portfolio JS plus resume-only settings.

Uses the reference-style LaTeX template by default; ReportLab is optional.
Run: resume/.venv/bin/python resume/build.py --all
"""
from __future__ import annotations

import argparse
import html
import json
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import urljoin, urlparse

import reportlab
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4, letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import (
    HRFlowable, KeepTogether, PageBreak, Paragraph, SimpleDocTemplate, Spacer,
)
from pypdf import PdfReader

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
OUTPUT = HERE / 'output'
COLLECTIONS = ('experience', 'projects', 'certifications', 'publications')


def clean(value):
    """Normalize punctuation without interpreting source text as PDF markup."""
    text = str(value or '')
    for before, after in {'\u2011': '-', '\u2013': '-', '\u2014': '-',
                          '\u2018': "'", '\u2019': "'", '\u201c': '"',
                          '\u201d': '"', '\u00a0': ' '}.items():
        text = text.replace(before, after)
    return text


def esc(value):
    return html.escape(clean(value), quote=True)


def web_url(value):
    value = str(value or '').strip()
    parsed = urlparse(value)
    return value if parsed.scheme in ('https', 'http') and parsed.netloc else ''


def anchor(label, url):
    url = web_url(url)
    return '<a href="' + esc(url) + '">' + esc(label) + '</a>' if url else esc(label)


def date_label(value):
    text = clean(value).strip()
    if not text or re.search(r'update|to be|to confirm|on credential', text, re.I):
        return ''
    if text.lower() in ('completed', 'in progress', 'earlier', 'not started'):
        return ''
    return text


def read_json(path):
    return json.loads(path.read_text(encoding='utf-8'))


def read_source(snapshot=None):
    if snapshot:
        return read_json(snapshot)
    try:
        process = subprocess.run(['node', str(HERE / 'export-source.cjs')],
                                 capture_output=True, text=True, timeout=20, check=True)
    except FileNotFoundError:
        raise ValueError('Node.js is required. Use Codespaces or install Node.js.')
    except subprocess.CalledProcessError as exc:
        raise ValueError('Portfolio data could not be loaded:\n' + exc.stderr.strip())
    return json.loads(process.stdout)


def merge_source(source, config):
    identity = dict(source['identity'])
    identity.update(config.get('identity', {}))
    data = {'identity': identity}
    names = {'experience': 'Experience', 'projects': 'Projects',
             'certifications': 'Certifications', 'publications': 'Publications'}
    singular = {'experience': 'experience', 'projects': 'project',
                'certifications': 'certification', 'publications': 'publication'}
    for name in COLLECTIONS:
        original = source['identity']['experience'] if name == 'experience' else source[name]
        overrides = config.get(singular[name] + 'Overrides', {})
        rows = []
        for row in original:
            result = {**row, **overrides.get(row['id'], {})}
            # A source-hidden record stays hidden even if accidentally overridden.
            if row.get('published') is False:
                result['published'] = False
            rows.append(result)
        rows.extend(config.get('additional' + names[name], []))
        ids = [row['id'] for row in rows]
        if len(ids) != len(set(ids)):
            raise ValueError('Duplicate IDs in ' + name)
        unknown = set(overrides) - set(ids)
        if unknown:
            raise ValueError('Unknown override IDs in ' + name + ': ' + ', '.join(unknown))
        data[name] = rows
    return data


def eligible(row):
    return row.get('published') is not False and row.get('resumePublished') is not False


def select(rows, ids):
    if ids == 'all':
        return [row for row in rows if eligible(row)]
    if not isinstance(ids, list):
        raise ValueError('Selection must be an array of IDs or "all".')
    lookup = {row['id']: row for row in rows}
    missing = set(ids) - set(lookup)
    if missing:
        raise ValueError('Unknown selected IDs: ' + ', '.join(sorted(missing)))
    if len(ids) != len(set(ids)):
        raise ValueError('Duplicate selected IDs: ' + ', '.join(ids))
    return [lookup[key] for key in ids if eligible(lookup[key])]


def progress(row):
    reported = row.get('reportedProgress')
    if reported:
        done, total = reported['completed'], reported['total']
        if not isinstance(done, int) or not isinstance(total, int) or not 0 <= done <= total:
            raise ValueError('Invalid progress for ' + row['id'])
        return f'{done}/{total} courses'
    # Do not infer totals from possibly incomplete course arrays.
    return ''


def certificate_links(row, identity):
    links = []
    credential = row.get('certificateUrl', '')
    if web_url(credential):
        links.append(('Certificate', credential))
    elif credential and web_url(identity.get('portfolioUrl')):
        relative = credential.removeprefix('./')
        local = (ROOT / 'dist' / relative).resolve()
        if local.is_relative_to((ROOT / 'dist').resolve()) and local.is_file():
            links.append(('Certificate', urljoin(identity['portfolioUrl'].rstrip('/') + '/', relative)))
    coursera = row.get('links', {}).get('coursera')
    if web_url(coursera) and coursera != credential:
        is_award = any(part in coursera for part in ('/verify/', '/accomplishments/'))
        links.append(('Credential' if is_award else 'Program', coursera))
    return links


def audit(data):
    notes = []
    identity = data['identity']
    if not identity.get('email'):
        notes.append('No email supplied. Add identity.email in resume/content.json before sending applications.')
    if not identity.get('portfolioUrl'):
        notes.append('No portfolioUrl supplied. Local certificate PDFs are not linked until a public base URL is set.')
    notes.append('Source states PhD 2026 and combines AT&T Labs / Futurewei internships into one 2022-2024 record; retained without inferring exact dates.')
    for name in COLLECTIONS:
        for row in data[name]:
            if not eligible(row):
                notes.append(f'Hidden from every PDF: {name}/{row["id"]}.')
    for row in data['certifications']:
        if not eligible(row):
            continue
        if row.get('id') == 'genai-fundamentals' and len(row.get('courses', [])) == 3:
            notes.append('GenAI Fundamentals: source description says five courses but stores three. Resume omits an inferred course ratio; confirm curriculum separately.')
        if not date_label(row.get('completionDate')):
            notes.append(f'No confirmed date printed for certification {row["id"]}.')
        if row.get('id') == 'ibm-rag-agentic-ai':
            notes.append('IBM RAG: honored reported 8/8 awarded curriculum rather than ten entries in the expanded catalog.')
    if any(not row.get('url') for row in data['publications']):
        notes.append('Some publication entries lack authors, DOI, or full venue details. Printed supplied title/venue/year only; no bibliographic details invented.')
    return notes


def register_fonts():
    folder = Path(reportlab.__file__).parent / 'fonts'
    for name, filename in [('Resume', 'Vera.ttf'), ('Resume-Bold', 'VeraBd.ttf'),
                           ('Resume-Italic', 'VeraIt.ttf'), ('Resume-BoldItalic', 'VeraBI.ttf')]:
        pdfmetrics.registerFont(TTFont(name, str(folder / filename)))
    pdfmetrics.registerFontFamily('Resume', normal='Resume', bold='Resume-Bold',
                                  italic='Resume-Italic', boldItalic='Resume-BoldItalic')


class ResumeCanvas(canvas.Canvas):
    def __init__(self, *args, owner='', variant='', margin=46.8, **kwargs):
        super().__init__(*args, **kwargs)
        self.saved_pages = []
        self.owner, self.variant, self.margin = owner, variant, margin

    def showPage(self):
        self.saved_pages.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        total = len(self.saved_pages)
        for state in self.saved_pages:
            self.__dict__.update(state)
            self.saveState()
            w, h = self._pagesize
            self.setStrokeColor(colors.HexColor('#D9E1E7'))
            self.line(self.margin, 36, w - self.margin, 36)
            self.setFont('Resume', 8)
            self.setFillColor(colors.HexColor('#607080'))
            self.drawString(self.margin, 23, clean(self.owner) + ' | ' + clean(self.variant))
            self.drawRightString(w - self.margin, 23, f'{self._pageNumber} / {total}')
            if self._pageNumber > 1:
                self.setFont('Resume-Bold', 9)
                self.drawString(self.margin, h - 30, clean(self.owner))
            self.restoreState()
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)


def build_pdf(key, variant, data, settings, output):
    accent = colors.HexColor(settings.get('accent', '#235B82'))
    size, leading = float(settings.get('fontSize', 10.3)), float(settings.get('leading', 14))
    base = dict(fontName='Resume', fontSize=size, leading=leading,
                textColor=colors.HexColor('#243442'), alignment=TA_LEFT,
                splitLongWords=True, spaceAfter=3)
    styles = {
        'body': ParagraphStyle('body', **base),
        'small': ParagraphStyle('small', **{**base, 'fontSize': 9, 'leading': 11.5, 'textColor': colors.HexColor('#556775')}),
        'entry': ParagraphStyle('entry', **{**base, 'fontName': 'Resume-Bold', 'spaceAfter': 3, 'keepWithNext': True}),
        'section': ParagraphStyle('section', fontName='Resume-Bold', fontSize=10, leading=14,
                                  textColor=accent, spaceBefore=9, spaceAfter=6, keepWithNext=True),
        'name': ParagraphStyle('name', fontName='Resume-Bold', fontSize=27, leading=32,
                               textColor=colors.HexColor('#142D43'), spaceAfter=4),
        'headline': ParagraphStyle('headline', fontName='Resume', fontSize=12.2, leading=17,
                                   textColor=accent, spaceAfter=9),
        'bullet': ParagraphStyle('bullet', **{**base, 'leftIndent': 10, 'firstLineIndent': -8, 'spaceAfter': 3})
    }
    def p(text, kind='body'):
        return Paragraph(text, styles[kind])
    identity = data['identity']
    selected = {name: select(data[name], variant[name[:-1] + 'Ids' if name.endswith('s') else name + 'Ids'])
                for name in COLLECTIONS}
    # publication -> publicationIds, certification -> certificationIds, project -> projectIds.
    selected['publications'].sort(key=lambda row: str(row.get('year', '')), reverse=True)
    selected['certifications'].sort(key=lambda row: 0 if row.get('status') == 'Completed' else 1) if variant.get('sortCertificationsByStatus') else None

    def title(label):
        return [p(esc(label.upper()), 'section')]

    def overview():
        return [p(esc(variant['summary']))]

    def skills():
        return title('Technical focus') + [p('<b>' + esc(label) + ':</b> ' + esc(value))
                                          for label, value in variant['skills'].items()]

    def experience():
        result = title('Experience')
        for row in selected['experience']:
            bullets = row.get('bulletsByVariant', {}).get(key) or row.get('bullets')
            if not bullets:
                text = row.get(variant.get('experienceText', key)) or row.get('generic') or row.get('faculty') or row.get('summary', '')
                bullets = [text] if text else []
            block = [p(esc(row['role']), 'entry'),
                     p(esc(row['organization']) + (' | ' + esc(date_label(row.get('period'))) if date_label(row.get('period')) else ''), 'small')]
            block.extend(p('- ' + esc(bullet), 'bullet') for bullet in bullets)
            block.append(Spacer(1, 4))
            result.append(KeepTogether(block))
        return result

    def education():
        result = title('Education')
        for row in identity['education']:
            result.append(KeepTogether([
                p('<b>' + esc(row['degree']) + '</b>'),
                p(esc(row['school']) + ' | ' + esc(row['period']), 'small')]))
        return result

    def projects():
        result = title('Selected projects' if key != 'generic' else 'Projects')
        for row in selected['projects']:
            url = web_url(row.get('url') or row.get('links', {}).get('github'))
            block = [p(anchor(row['title'], url), 'entry'),
                     p(esc(row.get('category', 'Project')) + ' | ' + esc(row.get('date', '')), 'small'),
                     p(esc(row['summary']))]
            if row.get('skills'):
                block.append(p('<b>Tools & methods:</b> ' + esc(', '.join(row['skills'])), 'small'))
            block.append(Spacer(1, 4))
            result.append(KeepTogether(block))
        return result

    def certifications():
        result = title('Certifications & continuing education')
        for row in selected['certifications']:
            status = row.get('status', 'Status not supplied')
            count = progress(row)
            date = date_label(row.get('completionDate'))
            label = status + (' | ' + count if count else '') + (' | ' + date if date else '')
            if row['id'] == 'ibm-rag-agentic-ai' and count == '8/8 courses':
                label += ' | Original eight-course credential'
            block = [p(esc(row['title']), 'entry'),
                     p(esc(row['issuer']) + ' | ' + esc(label), 'small')]
            links = certificate_links(row, identity)
            if links:
                block.append(p(' | '.join(anchor(label, url) for label, url in links), 'small'))
            if variant.get('includeCourseDetails'):
                for course in row.get('courses', []):
                    course_status = course.get('status') or ('Completed' if str(course.get('completionDate', '')).startswith('Completed') else 'Status not supplied')
                    block.append(p('- ' + anchor(course['title'], course.get('courseraUrl')) + ' | ' + esc(course_status), 'small'))
            block.append(Spacer(1, 5))
            result.append(KeepTogether(block))
        return result

    def publications():
        result = title('Selected publications' if key != 'generic' else 'Publications')
        for row in selected['publications']:
            block = [p(anchor(row['title'], row.get('url')), 'entry'),
                     p(esc(row.get('venue', '')) + ' | ' + esc(row.get('year', '')), 'small')]
            if key == 'generic':
                block.append(p(esc(row.get('summary', ''))))
            block.append(Spacer(1, 5))
            result.append(KeepTogether(block))
        return result

    functions = {'summary': overview, 'skills': skills, 'experience': experience,
                 'education': education, 'projects': projects,
                 'certifications': certifications, 'publications': publications}
    story = [p(esc(identity['name']), 'name'), p(esc(variant['headline']), 'headline')]
    contacts = [esc(identity.get('location', ''))]
    if identity.get('email'):
        contacts.append('<a href="mailto:' + esc(identity['email']) + '">' + esc(identity['email']) + '</a>')
    if identity.get('phone'):
        contacts.append(esc(identity['phone']))
    story.append(p(' | '.join(filter(None, contacts)), 'small'))
    social = [(label, identity.get('links', {}).get(name))
              for label, name in [('LinkedIn', 'linkedin'), ('GitHub', 'github'), ('Google Scholar', 'scholar')]]
    if identity.get('portfolioUrl'):
        social.insert(0, ('Portfolio', identity['portfolioUrl']))
    story.append(p(' | '.join(anchor(label, url) for label, url in social if web_url(url)), 'small'))
    story.extend([Spacer(1, 5), HRFlowable(width='100%', thickness=1.3, color=accent), Spacer(1, 10)])
    pages = variant['pages']
    for index, sections in enumerate(pages):
        if index:
            story.append(PageBreak())
        for section in sections:
            if section not in functions:
                raise ValueError('Unknown section: ' + section)
            if section in selected and not selected[section]:
                continue
            story.extend(functions[section]())
    output.mkdir(parents=True, exist_ok=True)
    pdf_path = output / f'Waseem_Raza_{key.upper()}.pdf'
    margin = float(settings.get('marginInches', .65)) * 72
    paper = {'LETTER': letter, 'A4': A4}[settings.get('paper', 'LETTER').upper()]
    doc = SimpleDocTemplate(str(pdf_path), pagesize=paper,
                            leftMargin=margin, rightMargin=margin, topMargin=46,
                            bottomMargin=48, title=identity['name'] + ' - ' + variant['label'],
                            author=identity['name'])
    doc.build(story, canvasmaker=lambda *args, **kwargs: ResumeCanvas(
        *args, owner=identity['shortName'], variant=variant['label'], margin=margin, **kwargs))
    reader = PdfReader(pdf_path)
    texts = [page.extract_text() or '' for page in reader.pages]
    if any(len(text.strip()) < 60 for text in texts):
        raise ValueError('Blank or unreadable page in ' + str(pdf_path))
    joined = '\n'.join(texts)
    if identity['shortName'] not in joined:
        raise ValueError('Name missing from extracted text in ' + str(pdf_path))
    if '\ufffd' in joined or '\u25a0' in joined:
        raise ValueError('Unexpected missing-glyph character in ' + str(pdf_path))
    (output / f'{key}.txt').write_text(joined, encoding='utf-8')
    result = {'file': pdf_path.name, 'pages': len(reader.pages),
              'maxPages': variant.get('maxPages', len(pages)),
              'selectedIds': {name: [row['id'] for row in rows] for name, rows in selected.items()}}
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--all', action='store_true', help='Build all configured variants.')
    parser.add_argument('--variant', help='Variant ID; default genai.')
    parser.add_argument('--list', action='store_true', help='List available variants.')
    parser.add_argument('--output', type=Path, default=OUTPUT)
    parser.add_argument('--source-json', type=Path, help='Optional portfolio export; avoids Node.js.')
    parser.add_argument('--allow-overflow', action='store_true', help='Permit PDFs exceeding maxPages.')
    args = parser.parse_args()
    variants = read_json(HERE / 'variants.json')
    if args.list:
        for key, variant in variants.items():
            print(key + ': ' + variant['label'])
        return
    if args.all and args.variant:
        parser.error('Choose --all or --variant, not both.')
    keys = list(variants) if args.all else [args.variant or 'genai']
    if any(key not in variants for key in keys):
        parser.error('Unknown variant; use --list.')
    config = read_json(HERE / 'content.json')
    data = merge_source(read_source(args.source_json), config)
    notes = audit(data)
    settings = config.get('settings', {})
    renderer = settings.get('renderer', 'latex')
    if renderer == 'latex':
        from latex_renderer import build_pdf as render
    elif renderer == 'reportlab':
        register_fonts()
        render = build_pdf
    else:
        raise ValueError('renderer must be latex or reportlab')
    results = [render(key, variants[key], data, settings, args.output) for key in keys]
    report = {'variants': results, 'reviewNotes': notes}
    (args.output / 'build-report.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
    for result in results:
        print(f'{result["file"]}: {result["pages"]} pages')
    print('Review notes: ' + str(args.output / 'build-report.json'))
    for result in results:
        if result['pages'] > result['maxPages'] and not args.allow_overflow:
            raise ValueError(f'{result["file"]} exceeds its {result["maxPages"]}-page budget. '
                             'Shorten selections or adjust explicit page breaks in variants.json. '
                             'PDF retained for inspection; no text was discarded.')


if __name__ == '__main__':
    try:
        main()
    except (ValueError, KeyError, subprocess.TimeoutExpired) as exc:
        print('Build failed: ' + str(exc), file=sys.stderr)
        sys.exit(1)
