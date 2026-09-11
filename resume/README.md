# Reference-style resume PDFs

Python fills `template.tex` from portfolio data and runs pdflatex. The style follows
your supplied resumes: Latin Modern serif fonts, centered name/title/tagline,
blue section headings with rules, compact bullets, right-aligned dates, 9 pt text,
Letter paper and 0.55 inch margins. Contact links use words instead of Font Awesome
icons. No running header or page numbers, as in the reference.

The four variants keep their portfolio-derived content. Additional achievement
bullets and metrics in the reference resumes were not imported automatically.
Only email and phone were copied into contact settings. The website is unchanged.

## Installation and preview

Copy `resume/` and `.github/workflows/build-resumes.yml` into your repository root.
For a first installation also merge `.devcontainer/devcontainer.json`. Preserve any
newer website edits instead of replacing them with old copies from the full ZIP.
Run from the directory containing `dist/`:

```bash
bash resume/setup.sh
resume/.venv/bin/python resume/build.py --all
resume/.venv/bin/python resume/preview.py --watch
```

First setup installs TeX Live and Latin Modern using apt, requiring normal
Codespaces sudo access and an internet connection. Later builds run locally.
Python writes LaTeX directly; PyLaTeX is not required. If Python/venv is missing,
rebuild the Codespace with the supplied Python devcontainer feature.

Open **Ports > 8001 > Open in Browser**, then select a PDF. Keep the terminal
running. Changes to data, JSON, Python or the template trigger rebuilds; refresh
the PDF tab after success. A failed build may leave previous PDFs: check the
terminal. Laptop localhost is not the Codespaces preview address.
Your website can run separately using `npm run dev` on port 8000.

## Editing map

| File | Purpose |
| --- | --- |
| `resume/variants.json` | Headline, tagline, summary, skills, selected IDs and section order |
| `resume/content.json` | Contacts, resume-only overrides/additions and display settings |
| `resume/template.tex` | Fonts, centered header, heading rules and spacing |
| `resume/latex_renderer.py` | Maps data to LaTeX sections and compiles PDFs |
| `dist/data/profile-data.js` | Shared identity, experience and education |
| `dist/data/certifications.js` | Certifications, progress and links |
| `dist/data/projects.js` | Projects |
| `dist/data/publications.js` | Publications |

Build one variant with `resume/.venv/bin/python resume/build.py --variant genai`.
Other IDs: `aiml`, `wireless`, `generic`. `--list` lists available variants.

## Outputs and layout

`resume/output/` contains four PDFs, matching standalone `.tex` files, extracted
text, compiler logs and `build-report.json`. Focused variants are two pages each;
the comprehensive CV is three. Content edits may change these counts. Generated
output and virtual environments are gitignored. Generated `.tex` files are
overwritten: edit the template/JSON for persistent changes, or copy a generated
file elsewhere before editing independently. Standalone compilation uses
`pdflatex -no-shell-escape Waseem_Raza_GENAI.tex`.

LaTeX settings in `content.json`:

```json
"renderer": "latex",
"latexFontSize": 9,
"marginInches": 0.55,
"accent": "#155B8A",
"paper": "LETTER",
"explicitPageBreaks": false
```

Use margin 0.47 for the narrower Founding AI reference. Font sizes supported:
8, 9, 10, 11, 12. `template.tex` loads Latin Modern with `\usepackage{lmodern}`.
The old ReportLab renderer remains available with `renderer: "reportlab"`; only
that renderer uses the old `fontSize` and `leading` settings.

The `pages` groups define section order. LaTeX flows continuously by default.
`pageBreakBefore: ["projects"]` starts projects on page two in focused variants.
Remove it for continuous flow. Alternatively, turn on `explicitPageBreaks` to
force each `pages` group onto a new page; remove `pageBreakBefore` in that case.
The build fails on compiler overflow or exceeding `maxPages`, keeping output for
inspection. Shorten selections or increase the page budget. `--allow-overflow`
permits oversized drafts but does not suppress compiler errors.

## Content overrides

Review the copied email and phone before applying. Set `identity.portfolioUrl` to
your current public portfolio root ending in `/`; this enables local PDF links.
Example resume-only override in `content.json`:

```json
"experienceOverrides": {
  "att-current": {
    "bulletsByVariant": {
      "genai": [
        "Developing ML and early GenAI capabilities for network diagnostics.",
        "Connecting unstructured operational data with automation workflows."
      ]
    }
  }
}
```

`bullets` applies to every variant; `bulletsByVariant` takes precedence. Fields
such as `period`, `organization`, `role` and `location` can also be overridden.
Use reviewed facts. Certification overrides support `resumeSummary` for focus
text. The `additionalExperience`, `additionalProjects`, `additionalCertifications`
and `additionalPublications` arrays accept website-schema records with unique IDs.
Select new IDs in `variants.json`; unknown IDs fail the build.

## Selection, status and links

Focused PDFs use explicit `experienceIds`, `projectIds`, `certificationIds` and
`publicationIds`, independently of website profile tags. Generic uses `"all"`.
Publications sort newest first. GenAI selects AWS Bedrock, IBM GenAI Engineering,
IBM RAG and Agentic AI, and GenAI Fundamentals.

Source `published: false` hides a record from every PDF even if selected; a resume
override cannot undo this. `resumePublished: false` hides it from PDFs only.
Finance is hidden in the supplied ZIP; Healthcare is published at 0/3.
Progress uses `reportedProgress`, not possibly incomplete course arrays. IBM RAG
retains the original 8/8 award. Fundamentals stores three courses while describing
five, so no ratio is inferred. Placeholder dates are omitted. Review all notes in
`build-report.json` before sharing.

Supplied social, project, publication and credential URLs are clickable. Local
PDF links require `portfolioUrl`, existing files under `dist/`, and public
deployment of those files. Set `includeCourseDetails: true` in a variant to list
courses with clickable `courseraUrl` titles when supplied; adjust the page budget.

## GitHub automation and checks

The separate **Build resume PDFs** workflow installs LaTeX and builds on relevant
main-branch changes or via Actions > Run workflow. Download **Waseem-Raza-Resumes**
under Artifacts: PDFs, generated TeX and report, retained for 30 days. It has not
yet run in your GitHub repository. It does not publish PDFs to Pages. To publish
later, explicitly copy selected PDFs to `dist/resumes/` in the Pages workflow.

```bash
resume/.venv/bin/python -m unittest discover -s resume/tests
```

Tests cover visibility, progress, IDs and escaping. Inspect final PDFs after
content edits; extraction alone is not a guarantee for every ATS system.
