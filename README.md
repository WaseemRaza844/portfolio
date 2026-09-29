# Waseem Raza — Portfolio & Resume

This repository contains two connected outputs built from shared professional data:

- a static multi-profile portfolio website under `dist/`;
- a LaTeX/Python resume generator under `resume/`.

## Active professional variants

- Generic / Comprehensive
- GenAI & Agentic AI
- AI/ML & Data Science
- Faculty & Academic

The website and resume system reuse shared identity, experience, certification, project, and publication records where practical, while keeping output-specific positioning and selections separate.

## Quick start

For the complete local/Codespaces commands for both the website and resumes, use:

**[RUN_LOCAL.md](./RUN_LOCAL.md)**

Typical Codespaces workflow:

```bash
npm run dev
resume/.venv/bin/python resume/preview.py --watch
```

- Website preview: port **8000**
- Resume preview: port **8001**

## Main source locations

| Area | Source |
| --- | --- |
| Shared profile, education, and experience | `dist/data/profile-data.js` |
| Certifications and courses | `dist/data/certifications.js` |
| Projects | `dist/data/projects.js` |
| Publications | `dist/data/publications.js` |
| Website pages | `dist/*.html`, `dist/genai/`, `dist/aiml/`, `dist/faculty/` |
| Website renderer | `dist/render.js`, `dist/variant-render.js` |
| Website styling | `dist/styles.css` |
| Resume variants | `resume/variants.json` |
| Resume-specific content | `resume/content.json` |
| Resume generator | `resume/build.py`, `resume/latex_renderer.py`, `resume/template.tex` |

## Branch workflow

```text
feature/... → develop → main
```

Preferred branch naming:

- Website: `feature/web-wr-<description>`
- Resume: `feature/resume-wr-<description>`

Automatic resume builds run on `develop` and `main`. GitHub Pages publishes the website from `main` only.

## Documentation

Additional implementation and historical guides are kept under `docs/`:

- [Certification source and navigation](./docs/CERTIFICATION_SOURCE_AND_NAVIGATION_GUIDE.md)
- [Course and PDF upgrade notes](./docs/COURSE_AND_PDF_UPGRADE.md)
- [Data-file migration guide](./docs/DATA_FILES_MIGRATION_GUIDE.md)
- [Editing guide](./docs/EDITING_GUIDE.md)
- [Hosting guide](./docs/HOSTING_GUIDE.md)
- [Detailed portfolio/resume commands](./docs/PORTFOLIO_RESUME_COMMANDS.md)
- [Variant editing guide](./docs/VARIANT_EDITING_GUIDE.md)

## Deployment

The portfolio is static. `.github/workflows/deploy-pages.yml` publishes `dist/` to GitHub Pages from `main`.

The resume workflow generates all configured PDF variants and stores the generated files as a GitHub Actions artifact.
