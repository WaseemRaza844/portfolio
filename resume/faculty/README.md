# Academic and faculty resume family

The faculty documents are deliberately maintained apart from industry resumes while
sharing the portfolio's verified education, appointments, publications, projects, and
Coursera certifications through `resume/content.json` and `dist/data/`.

| File | Purpose | Build variant |
| --- | --- | --- |
| `generic.json` | Generic research-oriented faculty resume (3–4 pages) | `faculty` |
| `comprehensive.json` | Expanded faculty application resume (4–5 pages) | `faculty_comprehensive` |
| `academic_cv.json` | Full academic CV (5–7 pages) | `academic_cv` |
| `tailored/<institution-role>/variant.json` | Academic application-specific overlays | `faculty_<institution_role>` |

## Build

From repository root:

```bash
python resume/build.py --list
python resume/build.py --variant faculty
python resume/build.py --variant faculty_comprehensive
python resume/build.py --variant academic_cv
python resume/build.py --all
python -m unittest discover -s resume/tests
```

Faculty PDF and TeX outputs are in `resume/output/faculty/`; nonfaculty
outputs are in `resume/output/industry/`. Reports remain in
`resume/output/build-report.json`. GitHub Actions also collects both groups.

## Section hierarchy

All three academic variants now follow a consistent, teaching-forward hierarchy:

1. **Academic Profile:** profile summary, research interests, and doctoral research focus.
2. **Education:** degrees, and graduate coursework in the expanded CV.
3. **Teaching, Research & Professional Experience:** teaching appointments first, related teaching areas and student mentoring (where selected), academic research appointments, then industry R&D.
4. **Research Contributions:** publications and research projects in one section.
5. **Research Methods & Technical Expertise.**
6. **Academic Service & Recognition:** academic service (where selected) and honors.
7. **Professional Development:** selected completed certifications.

Major section headings have accent rules, while relevant subsections use
smaller, bold, compact headings. The same source records are reused; headings
do not duplicate positions or remove research evidence. Institution-specific
variants can override `pages` if a posting calls for a different emphasis.

## Faculty focus

The generic resume leads with PhD Electrical and Computer Engineering and
doctoral research in AI/ML for wireless networks, followed by academic
appointments, teaching, research outputs, and select technical training. The CV
uses the full academic record and is not intended to be a compressed industry
resume. Keep accepted/published/in-review manuscript status accurate in the
source. Do not infer grants, courses taught, academic titles, student supervision,
or publication status from general descriptions.

Coursera selection is drawn from the existing signed-in course inventory
reconciled into `dist/data/certifications.js`. Prioritize completed ML, deep
learning, computer vision, telecom AI, wireless network and data-science courses;
do not represent an *in-progress* course as an awarded certificate. The faculty
variants now include 5G Network Fundamentals, marked **In progress (21%)**,
without a completion date or an awarded-certificate claim.

The last main section is **Self-Learning**, with each exact course title on the
left, issuer/status/date right-aligned, and a concise one-line topic and skills
description below. Descriptions are stored as `facultyDescription` overrides
in `resume/content.json` and verified in unit tests. Faculty headers identify
the PhD discipline directly, list emails before the phone number, and link to
the portfolio's Coursera courses page. To avoid PDF portability issues,
professional profiles use clickable text labels rather than extra icon fonts.

## Tailored versions

For a new application, create
`resume/faculty/tailored/<institution-role>/variant.json`. Use a lowercase
hyphenated directory name and a minimal **JSON object**, for example:

```json
{
  "baseVariant": "faculty",
  "label": "Faculty | Example University | Assistant Professor ECE",
  "headline": "Assistant Professor Applicant | Wireless AI & Networked Systems",
  "summary": "A focused, evidence-based summary suitable for this posting."
}
```

The build automatically inherits all unspecified fields from the base variant,
exposes it as `faculty_example_university_assistant_professor`, and writes its
output into `resume/output/faculty/`. The snippet is illustrative and not an
actual active application. More specific project IDs, publication IDs, research
interests, teaching topics, and section ordering can be overridden per posting.

The industry application resumes remain independently managed under
`resume/tailored/` and `resume/variants.json`. Keep shared factual corrections
in source data so every variant benefits.
