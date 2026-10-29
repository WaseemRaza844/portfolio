"""Compile the reference-style LaTeX template, retaining editable .tex output."""
import re
import shutil
import subprocess
from pathlib import Path
from pypdf import PdfReader

HERE = Path(__file__).resolve().parent


def read_utf8_text(path, *, errors='strict'):
    return Path(path).read_text(encoding='utf-8', errors=errors)


def write_utf8_text(path, text):
    return Path(path).write_text(text, encoding='utf-8')


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
    academic = identity.get('academic', {})
    body = []
    grouped = False
    experience_lookup = {row['id']: row for row in selected['experience']}

    def section(title):
        if grouped:
            return  # The enclosing group supplies one major heading.
        body.append(r'\Needspace{3\baselineskip}')
        body.append(r'\section{' + tex(title) + '}')

    def subsection(title):
        body.append(r'\Needspace{2\baselineskip}')
        body.append(r'\subsection{' + tex(title) + '}')

    def bullets(items):
        if items:
            body.extend([r'\begin{itemize}\interlinepenalty=10000', *[r'\item ' + tex(x) for x in items], r'\end{itemize}'])

    def render_experience_group(title, ids):
        section(title)
        for exp_id in ids:
            row = experience_lookup.get(exp_id)
            if not row:
                continue
            body.append(r'\role{' + tex(row['role']) + '}{' + tex(date_label(row.get('period'))) + '}{' + tex(row['organization']) + '}{' + tex(row.get('location', '')) + '}')
            variant_bullets = row.get('bulletsByVariant', {})
            items = (variant_bullets.get(key)
                     or variant_bullets.get(variant.get('experienceText', key))
                     or row.get('bullets'))
            if not items:
                text = row.get(variant.get('experienceText', key)) or row.get('generic') or row.get('faculty') or row.get('summary', '')
                items = [text] if text else []
            bullets(items)

    for page_index, sections in enumerate(variant['pages']):
        if page_index and settings.get('explicitPageBreaks', False):
            body.append(r'\newpage')

        # Plain section IDs still work. Groups generate one major heading and
        # optional subsection headings while reusing the same data renderers.
        entries = []
        for item in sections:
            if isinstance(item, str):
                entries.append((item, None, None, False))
            elif isinstance(item, dict):
                group_title = item.get('title')
                children = item.get('items', [])
                if not isinstance(group_title, str) or not group_title.strip() or not children:
                    raise ValueError('Section groups require a title and nonempty items.')
                for index, child in enumerate(children):
                    if isinstance(child, str):
                        name, subtitle = child, None
                    elif isinstance(child, dict):
                        name, subtitle = child.get('id'), child.get('title')
                    else:
                        raise ValueError('Invalid grouped section entry: ' + repr(child))
                    if not isinstance(name, str) or not name:
                        raise ValueError('Grouped section entries require an id.')
                    entries.append((name, group_title if index == 0 else None, subtitle, True))
            else:
                raise ValueError('Invalid section entry: ' + repr(item))

        for name, group_title, subtitle, is_grouped in entries:
            if name in selected and not selected[name]:
                continue
            if name in variant.get('pageBreakBefore', []):
                body.append(r'\newpage')
            grouped = False
            if group_title:
                section(group_title)
            grouped = is_grouped
            if subtitle:
                subsection(subtitle)
            if name == 'summary':
                section(variant.get('summarySectionTitle', 'Professional Summary'))
                body.append(tex(variant['summary']))
            elif name == 'research_interests':
                section('Research Interests')
                interests = variant.get('researchInterests') or academic.get('researchInterests', [])
                if interests:
                    body.append(tex(' | '.join(interests)) + r'\par')
            elif name == 'dissertation':
                section('Doctoral Research Focus')
                focus = variant.get('dissertationFocus') or academic.get('dissertationFocus', '')
                if focus:
                    body.append(tex(focus) + r'\par')
            elif name == 'academic_experience':
                render_experience_group(variant.get('academicExperienceTitle', 'Academic & Research Experience'),
                                        variant.get('academicExperienceIds', []))
            elif name == 'teaching_experience':
                render_experience_group('Teaching Experience', variant.get('teachingExperienceIds', []))
            elif name == 'industry_experience':
                render_experience_group('Industry Research & Engineering Experience',
                                        variant.get('industryExperienceIds', []))
            elif name == 'teaching_areas':
                section('Teaching Areas')
                areas = academic.get('teachingAreas', [])
                if areas:
                    if grouped:
                        body.append(r'{\small\textbf{Teaching areas:} ' + tex(' | '.join(areas)) + r'}\par')
                    else:
                        body.append(tex(' | '.join(areas)) + r'\par')
            elif name == 'mentoring':
                section('Student Mentoring & Research Development')
                if grouped:
                    body.append(r'\Needspace{2\baselineskip}\noindent\textbf{Student mentoring and research development}\par')
                bullets(academic.get('mentoring', []))
            elif name == 'service':
                section('Academic Service & Program Contributions')
                bullets(academic.get('service', []))
            elif name == 'honors':
                section('Selected Honors & Awards')
                honor_rows = academic.get('honors', [])
                honor_limit = variant.get('honorLimit')
                if isinstance(honor_limit, int) and honor_limit > 0:
                    honor_rows = honor_rows[:honor_limit]
                for row in honor_rows:
                    body.append(r'\entry{' + tex(row.get('title', '')) + '}{' + tex(row.get('year', '')) + '}')
                    if row.get('organization'):
                        body.append(r'{\small ' + tex(row['organization']) + r'\par}')
            elif name == 'coursework':
                section('Selected Graduate Coursework')
                courses = academic.get('selectedCoursework', [])
                if courses:
                    body.append(tex(' | '.join(courses)) + r'\par')
            elif name == 'skills':
                section(variant.get('skillsSectionTitle', 'Technical Skills'))
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
                    variant_bullets = row.get('bulletsByVariant', {})
                    items = (variant_bullets.get(key)
                             or variant_bullets.get(variant.get('experienceText', key))
                             or row.get('bullets'))
                    if not items:
                        text = row.get(variant.get('experienceText', key)) or row.get('generic') or row.get('faculty') or row.get('summary', '')
                        items = [text] if text else []
                    bullets(items)
            elif name == 'education':
                section('Education')
                for row in identity['education']:
                    body.append(r'\entry{' + tex(row['degree']) + '}{' + tex(date_label(row.get('period'))) + '}')
                    body.append(tex(row['school']) + r'\par')
            elif name == 'projects':
                section(variant.get('projectSectionTitle', 'Selected Projects'))
                for row in selected[name]:
                    project_meta = ' | '.join([part for part in [row.get('category', 'Project'), row.get('date', '')] if part])
                    body.append(r'\entry{' + link(row['title'], row.get('url') or row.get('links', {}).get('github')) + '}{' + tex(project_meta) + '}')
                    description = row.get('resumeSummary') or row.get('summary', '')
                    if not description or len(description.strip()) < 180:
                        raise ValueError('Project ' + row['id'] + ' needs a substantive resumeSummary (180+ characters).')
                    body.append(tex(description) + r'\par')
                    skills = row.get('resumeSkills') or row.get('skills', [])
                    skill_text = ', '.join(skills) if isinstance(skills, list) else str(skills or '')
                    if len(skill_text.strip()) < 60:
                        raise ValueError('Project ' + row['id'] + ' needs substantive resumeSkills.')
                    body.append(r'{\small\textit{Tools \& Methods:} ' + tex(skill_text) + r'\par}')
                    body.append(r'\vspace{1pt}')
            elif name == 'certifications':
                section(variant.get('certificationSectionTitle', 'Certifications & Professional Development'))
                for number, row in enumerate(selected[name], start=1):
                    if variant.get('facultyLearningLayout'):
                        # Keep the exact course title on the left and metadata
                        # independently right-aligned; a description spans both.
                        coursera = row.get('links', {}).get('coursera')
                        links = certificate_links(row, identity)
                        certificate = next((url for label, url in links if label in ('Certificate', 'Certificate PDF')), '')
                        title = link(row['title'], certificate or coursera)
                        issuer = link(row.get('issuer') or 'Coursera', coursera)
                        status = row.get('status') or 'Status not supplied'
                        if status.lower() == 'in progress' and row.get('progressPercent') not in (None, 0):
                            status = f"In progress ({row['progressPercent']}%)"
                        course_date = date_label(row.get('completionDate'))
                        course_date = re.sub(r'\b(January|February|March|April|May|June|July|August|September|October|November|December)\b',
                                             lambda match: match.group(1)[:3], course_date)
                        meta = [issuer, tex(status)]
                        if course_date:
                            meta.append(tex(course_date))
                        description = row.get('facultyDescription')
                        if not description:
                            raise ValueError('Faculty course description missing for ' + row['id'])
                        body.append(r'\Needspace{4\baselineskip}\noindent'
                                    r'\begin{tabularx}{\linewidth}{@{}>{\raggedright\arraybackslash}X'
                                    r'>{\raggedleft\arraybackslash}p{0.46\linewidth}@{}}')
                        body.append(r'\textbf{' + tex(str(number) + '. ') + title + r'} & '
                                    r'{\scriptsize ' + r' \textbar{} '.join(meta) + r'}\')
                        body.append(r'\end{tabularx}')
                        body.append(r'\noindent{\footnotesize ' + tex(description) + r'}\par\vspace{2pt}')
                        continue
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
                    if variant.get('compactCertifications', False):
                        body.append(r'\vspace{1pt}')
                        continue
                    detailed = variant.get('detailedCertificationDescriptions', True)
                    if detailed:
                        description = row.get('resumeSummary')
                        skills = row.get('resumeSkills', [])
                        if not description or len(description.strip()) < 150:
                            raise ValueError('Certification ' + row['id'] + ' needs a substantive resumeSummary (150+ characters).')
                        skill_text = ', '.join(skills) if isinstance(skills, list) else str(skills or '')
                        if len(skill_text.strip()) < 60:
                            raise ValueError('Certification ' + row['id'] + ' needs a substantive resumeSkills description.')
                    else:
                        description = row.get('summary') or row.get('overview')
                        skills = row.get('skills', [])
                        skill_text = ', '.join(skills) if isinstance(skills, list) else str(skills or '')
                    if description:
                        body.append(r'\textbf{Focus:} ' + tex(description) + r'\par')
                    if skill_text:
                        body.append(r'{\small\textbf{Tools \& Skills:} ' + tex(skill_text) + r'\par}')
                    if variant.get('includeCourseDetails'):
                        for course in row.get('courses', []):
                            status = course.get('status') or ('Completed' if str(course.get('completionDate', '')).startswith('Completed') else 'Status not supplied')
                            body.append(r'{\small ' + link(course['title'], course.get('courseraUrl')) + ' -- ' + tex(status) + r'\par}')
                    body.append(r'\vspace{2pt}')
            elif name == 'publications':
                section(variant.get('publicationSectionTitle', 'Publications' if key == 'generic' else 'Selected Publications'))
                for row in selected[name]:
                    body.append(r'\entry{' + link(row['title'], row.get('url')) + '}{' + tex(row.get('year')) + '}')
                    body.append(r'\textit{' + tex(row.get('venue', '')) + r'}\par')
                    if key == 'generic':
                        body.append(tex(row.get('summary', '')) + r'\par')
            else:
                raise ValueError('Unknown section: ' + name)

    emails = identity.get('emails') or [identity.get('email'), identity.get('secondaryEmail')]
    emails = [str(email).strip() for email in emails if str(email or '').strip()]
    phone = str(identity.get('phone') or '').strip()
    phone_href = re.sub(r'[^+0-9]', '', phone)

    # Contact order prioritizes email, keeps phone last, and presents a
    # compact third row of clickable professional profiles.
    contact_lines = []
    if emails:
        email_links = [r'\href{mailto:' + tex(email) + '}{' + tex(email) + '}' for email in emails]
        contact_lines.append(r'\ding{41}\enspace ' + r' \textbar{} '.join(email_links))
    secondary_contacts = []
    if identity.get('location'):
        secondary_contacts.append(tex(identity['location']))
    if phone:
        secondary_contacts.append(r'\ding{37}\enspace '
                                  + r'\href{tel:' + tex(phone_href) + '}{' + tex(phone) + '}')
    if secondary_contacts:
        contact_lines.append(r' \quad '.join(secondary_contacts))

    social_contacts = []
    for label, field in [('LinkedIn', 'linkedin'), ('GitHub', 'github'), ('Google Scholar', 'scholar')]:
        url = identity.get('links', {}).get(field)
        if web_url(url):
            social_contacts.append(link(label, url))
    if web_url(identity.get('courseraPortfolioUrl')):
        social_contacts.append(link('Coursera Courses', identity['courseraPortfolioUrl']))
    if web_url(identity.get('portfolioUrl')):
        social_contacts.append(link('Portfolio', identity['portfolioUrl']))
    if social_contacts:
        contact_lines.append(r' \textbar{} '.join(social_contacts))
    contacts = r'\\[1pt]'.join(contact_lines)

    size = int(variant.get('latexFontSize', settings.get('latexFontSize', 9)))
    if size not in (8, 9, 10, 11, 12):
        raise ValueError('latexFontSize must be 8, 9, 10, 11 or 12.')
    accent = settings.get('accent', '#155B8A').lstrip('#')
    if not re.fullmatch('[0-9A-Fa-f]{6}', accent):
        raise ValueError('accent must be a six-digit hex color.')
    horizontal_margin = float(variant.get('horizontalMarginInches', settings.get('horizontalMarginInches', .68)))
    vertical_margin = float(variant.get('verticalMarginInches', settings.get('verticalMarginInches', .45)))
    if not .3 <= horizontal_margin <= 1.5 or not .3 <= vertical_margin <= 1.5:
        raise ValueError('Resume margins must be between 0.3 and 1.5 inches.')
    values = dict(SIZE=str(size), PAPER={'LETTER': 'letter', 'A4': 'a4'}[settings.get('paper', 'LETTER').upper()],
                  HMARGIN=str(horizontal_margin), VMARGIN=str(vertical_margin), ACCENT=accent, NAME=tex(identity['name']),
                  TITLE=tex(identity['name'] + ' - ' + variant['label']),
                  HEADLINE=tex(variant['headline']), TAGLINE=tex(variant.get('tagline', '')),
                  DEGREE=(' ' + tex('(' + variant['headerDegree'] + ')')) if variant.get('headerDegree') else '',
                  TYPOGRAPHY=(r'\hyphenpenalty=8500\exhyphenpenalty=8500\emergencystretch=1em'
                              if variant.get('headerDegree') else ''),
                  CONTACTS=contacts, BODY='\n'.join(body))
    template = read_utf8_text(HERE / 'template.tex')
    source = re.sub(r'@@([A-Z]+)@@', lambda m: values[m[1]], template)
    output.mkdir(parents=True, exist_ok=True)
    filename = f'Waseem_Raza_{key.upper()}'
    tex_path = output / (filename + '.tex')
    write_utf8_text(tex_path, source)
    for _ in range(2):
        proc = subprocess.run(['pdflatex', '-no-shell-escape', '-interaction=nonstopmode', '-halt-on-error', tex_path.name],
                              cwd=output, capture_output=True, text=True, encoding='utf-8',
                              errors='replace', timeout=120)
        if proc.returncode:
            raise ValueError('LaTeX failed; inspect ' + str(output / (filename + '.log')) + '\n' + proc.stdout[-2500:])
    log = read_utf8_text(output / (filename + '.log'), errors='replace')
    if 'Overfull \\hbox' in log or 'Overfull \\vbox' in log:
        raise ValueError('LaTeX content overflow; inspect ' + str(output / (filename + '.log')))
    reader = PdfReader(output / (filename + '.pdf'))
    texts = [page.extract_text() or '' for page in reader.pages]
    if any(len(text.strip()) < 60 for text in texts) or identity['shortName'] not in '\n'.join(texts):
        raise ValueError('Missing or unreadable PDF text.')
    write_utf8_text(output / (key + '.txt'), '\n'.join(texts))
    page_text_chars = [len(re.sub(r'\s+', ' ', text).strip()) for text in texts]
    return {'file': filename + '.pdf', 'pages': len(texts),
            'minPages': variant.get('minPages', 1),
            'minPageTextChars': variant.get('minPageTextChars', 0),
            'minLastPageChars': variant.get('minLastPageChars', 0),
            'maxPages': variant.get('maxPages', 2),
            'pageTextChars': page_text_chars,
            'renderer': 'latex', 'selectedIds': {name: [r['id'] for r in rows] for name, rows in selected.items()}}
