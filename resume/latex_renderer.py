"""Compile the reference-style LaTeX template, retaining editable .tex output."""
import re
import shutil
import subprocess
from pathlib import Path
from pypdf import PdfReader

HERE = Path(__file__).resolve().parent


def tex(value):
    """Repair common mojibake, normalize punctuation, and escape text for LaTeX."""
    value = str(value or '')
    for _ in range(2):
        if not any(marker in value for marker in ('â', 'Â', 'Ã')):
            break
        try:
            repaired = value.encode('cp1252').decode('utf-8')
        except (UnicodeEncodeError, UnicodeDecodeError):
            break
        if repaired == value:
            break
        value = repaired

    replacements = {
        '\u2011': '-', '\u2013': '-', '\u2014': '-',
        '\u2018': "'", '\u2019': "'", '\u201c': '"', '\u201d': '"',
        '\u00a0': ' ', '\u00b7': ' | '
    }
    for before, after in replacements.items():
        value = value.replace(before, after)

    value = re.sub(r'[ \t]*\|[ \t]*', ' | ', value)
    value = re.sub(r'[ \t]{2,}', ' ', value)

    escapes = {
        '\\': r'\textbackslash{}',
        '&': r'\&',
        '%': r'\%',
        '$': r'\$',
        '#': r'\#',
        '_': r'\_',
        '{': r'\{',
        '}': r'\}',
        '~': r'\textasciitilde{}',
        '^': r'\textasciicircum{}',
        '|': r'\textbar{}',
        '<': r'\textless{}',
        '>': r'\textgreater{}'
    }
    return ''.join(escapes.get(char, char) for char in value)

def build_pdf(key, variant, data, settings, output):
    from build import select, date_label, progress, certificate_links, web_url
    if not shutil.which('pdflatex'):
        raise ValueError('pdflatex missing. Run bash resume/setup.sh first.')

    def link(label, url):
        return r'\href{' + tex(url) + '}{' + tex(label) + '}' if web_url(url) else tex(label)

    selected = {name: select(data[name], variant[name[:-1] + 'Ids' if name.endswith('s') else name + 'Ids'])
                for name in ('experience', 'projects', 'certifications', 'publications')}
    selected['publications'].sort(key=lambda row: str(row.get('year', '')), reverse=True)
    if variant.get('sortCertificationsByStatus'):
        selected['certifications'].sort(key=lambda row: row.get('status') != 'Completed')
    identity = data['identity']
    body = []

    def section(title):
        body.append(r'\Needspace{3\baselineskip}')
        body.append(r'\section{' + tex(title) + '}')

    def bullets(items):
        if items:
            body.extend([r'\begin{itemize}\interlinepenalty=10000', *[r'\item ' + tex(x) for x in items], r'\end{itemize}'])

    for page_index, sections in enumerate(variant['pages']):
        if page_index and settings.get('explicitPageBreaks', False):
            body.append(r'\newpage')
        for name in sections:
            if name in selected and not selected[name]:
                continue
            if name in variant.get('pageBreakBefore', []):
                body.append(r'\newpage')
            if name == 'summary':
                section('Professional Summary')
                body.append(tex(variant['summary']))
            elif name == 'skills':
                section('Technical Skills')
                for label, value in variant['skills'].items():
                    body.append(r'\Needspace{2\baselineskip}\noindent{\small\textbf{' + tex(label) + ':} ' + tex(value) + r'}\par')
                strengths = variant.get('leadership', {})
                if strengths:
                    body.append(r'\Needspace{4\baselineskip}\textbf{Leadership and Professional Strengths}\par')
                    body.append(r'\begin{itemize}')
                    for label, value in strengths.items():
                        body.append(r'\item \textbf{' + tex(label) + ':} ' + tex(value))
                    body.append(r'\end{itemize}')
            elif name == 'experience':
                section('Professional Experience')
                for row in selected[name]:
                    body.append(r'\role{' + tex(row['role']) + '}{' + tex(date_label(row.get('period'))) + '}{' + tex(row['organization']) + '}{' + tex(row.get('location', '')) + '}')
                    items = row.get('bulletsByVariant', {}).get(key) or row.get('bullets')
                    if not items:
                        text = row.get(variant.get('experienceText', key)) or row.get('generic') or row.get('faculty') or row.get('summary', '')
                        items = [text] if text else []
                    bullets(items)
            elif name == 'education':
                section('Education')
                for row in identity['education']:
                    body.append(r'\entry{' + tex(row['degree']) + '}{' + tex(row['period']) + '}')
                    body.append(tex(row['school']) + r'\par')
            elif name == 'projects':
                section('Projects' if key == 'generic' else 'Selected Projects')
                for row in selected[name]:
                    body.append(r'\entry{' + link(row['title'], row.get('url') or row.get('links', {}).get('github')) + '}{' + tex(row.get('date', '')) + '}')
                    body.append(r'\textit{' + tex(row.get('category', 'Project')) + r'}\par')
                    bullets([row['summary']])
                    if row.get('skills'):
                        body.append(r'{\small\textit{Tools \& methods:} ' + tex(', '.join(row['skills'])) + r'\par}')
            elif name == 'certifications':
                section('Certifications')
                for number, row in enumerate(selected[name], start=1):
                    count = progress(row)
                    completion = ('Completed (' + count.removesuffix(' courses') + ') courses') if count else ('Completed' if row.get('status') == 'Completed' else '')
                    issuer = row.get('issuer', '')
                    coursera = row.get('links', {}).get('coursera')
                    issuer_text = r'\textcolor{blue}{\underline{' + link(issuer or 'Coursera', coursera) + '}}' if web_url(coursera) else tex(issuer)
                    parts = [s for s in [issuer_text, tex(completion), tex(date_label(row.get('completionDate')))] if s]
                    for label, url in certificate_links(row, identity):
                        if label in ('Certificate', 'Certificate PDF'):
                            parts.append(r'\textcolor{blue}{\underline{' + link('Certificate', url) + '}}')
                    body.append(r'\Needspace{3\baselineskip}\noindent\textbf{' + tex(str(number) + '. ' + row['title']) + r'} {\small --- ' + r' \textbar{} '.join(parts) + r'}\par')
                    if row['id'] == 'ibm-rag-agentic-ai' and count == '8/8 courses':
                        body.append(r'{\small Original eight-course credential.\par}')
                    description = row.get('resumeSummary') or row.get('summary') or row.get('overview')
                    if description:
                        body.append(r'\textbf{Focus:} ' + tex(description) + r'\par')
                    skills = row.get('resumeSkills', row.get('skills', []))
                    if skills:
                        body.append(r'{\small\textbf{Tools \& Skills:} ' + tex(', '.join(skills) if isinstance(skills, list) else skills) + r'\par}')
                    if variant.get('includeCourseDetails'):
                        for course in row.get('courses', []):
                            status = course.get('status') or ('Completed' if str(course.get('completionDate', '')).startswith('Completed') else 'Status not supplied')
                            body.append(r'{\small ' + link(course['title'], course.get('courseraUrl')) + ' -- ' + tex(status) + r'\par}')
                    body.append(r'\vspace{2pt}')
            elif name == 'publications':
                section('Publications' if key == 'generic' else 'Selected Publications')
                for row in selected[name]:
                    body.append(r'\entry{' + link(row['title'], row.get('url')) + '}{' + tex(row.get('year')) + '}')
                    body.append(r'\textit{' + tex(row.get('venue', '')) + r'}\par')
                    if key == 'generic':
                        body.append(tex(row.get('summary', '')) + r'\par')
            else:
                raise ValueError('Unknown section: ' + name)

    def icon(name):
        return r'\faIcon{' + name + r'}'

    emails = identity.get('emails') or [identity.get('email'), identity.get('secondaryEmail')]
    emails = [str(email).strip() for email in emails if str(email or '').strip()]
    phone = str(identity.get('phone') or '').strip()
    phone_href = re.sub(r'[^+0-9]', '', phone)

    primary_contacts = []
    if identity.get('location'):
        primary_contacts.append(icon('map-marker-alt') + r'\enspace ' + tex(identity['location']))
    if phone:
        primary_contacts.append(icon('phone') + r'\enspace ' + r'\href{tel:' + tex(phone_href) + '}{' + tex(phone) + '}')
    if emails:
        email_links = [r'\href{mailto:' + tex(email) + '}{' + tex(email) + '}' for email in emails]
        primary_contacts.append(icon('envelope') + r'\enspace ' + r' \textbar{} '.join(email_links))

    social_contacts = []
    social_specs = [
        ('linkedin', 'LinkedIn', 'linkedin'),
        ('github', 'GitHub', 'github'),
        ('graduation-cap', 'Google Scholar', 'scholar')
    ]
    for icon_name, label, field in social_specs:
        url = identity.get('links', {}).get(field)
        if web_url(url):
            social_contacts.append(icon(icon_name) + r'\enspace ' + link(label, url))
    if web_url(identity.get('portfolioUrl')):
        social_contacts.append(icon('globe') + r'\enspace ' + link('Portfolio', identity['portfolioUrl']))

    contact_lines = []
    if primary_contacts:
        contact_lines.append(r' \quad '.join(primary_contacts))
    if social_contacts:
        contact_lines.append(r' \quad '.join(social_contacts))
    contacts = r'\\[1pt]'.join(contact_lines)

    size = int(variant.get('latexFontSize', settings.get('latexFontSize', 9)))
    if size not in (8, 9, 10, 11, 12):
        raise ValueError('latexFontSize must be 8, 9, 10, 11 or 12.')
    accent = settings.get('accent', '#155B8A').lstrip('#')
    if not re.fullmatch('[0-9A-Fa-f]{6}', accent):
        raise ValueError('accent must be a six-digit hex color.')
    margin = float(settings.get('marginInches', .55))
    if not .3 <= margin <= 1.5:
        raise ValueError('marginInches must be between 0.3 and 1.5.')
    values = dict(SIZE=str(size), PAPER={'LETTER': 'letter', 'A4': 'a4'}[settings.get('paper', 'LETTER').upper()],
                  MARGIN=str(margin), ACCENT=accent, NAME=tex(identity['name']),
                  TITLE=tex(identity['name'] + ' - ' + variant['label']),
                  HEADLINE=tex(variant['headline']), TAGLINE=tex(variant.get('tagline', '')),
                  CONTACTS=r' \quad '.join(filter(None, contacts)), BODY='\n'.join(body))
    template = (HERE / 'template.tex').read_text()
    source = re.sub(r'@@([A-Z]+)@@', lambda m: values[m[1]], template)
    output.mkdir(parents=True, exist_ok=True)
    filename = f'Waseem_Raza_{key.upper()}'
    tex_path = output / (filename + '.tex')
    tex_path.write_text(source, encoding='utf-8')
    for _ in range(2):
        proc = subprocess.run(['pdflatex', '-no-shell-escape', '-interaction=nonstopmode', '-halt-on-error', tex_path.name],
                              cwd=output, capture_output=True, text=True, timeout=120)
        if proc.returncode:
            raise ValueError('LaTeX failed; inspect ' + str(output / (filename + '.log')) + '\n' + proc.stdout[-2500:])
    log = (output / (filename + '.log')).read_text(errors='replace')
    if 'Overfull \\hbox' in log or 'Overfull \\vbox' in log:
        raise ValueError('LaTeX content overflow; inspect ' + str(output / (filename + '.log')))
    reader = PdfReader(output / (filename + '.pdf'))
    texts = [page.extract_text() or '' for page in reader.pages]
    if any(len(text.strip()) < 60 for text in texts) or identity['shortName'] not in '\n'.join(texts):
        raise ValueError('Missing or unreadable PDF text.')
    (output / (key + '.txt')).write_text('\n'.join(texts))
    return {'file': filename + '.pdf', 'pages': len(texts), 'maxPages': variant.get('maxPages', 2),
            'renderer': 'latex', 'selectedIds': {name: [r['id'] for r in rows] for name, rows in selected.items()}}
