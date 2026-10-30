# Resume and Academic Application System

This directory contains reusable resume profiles, job-specific applications, and generated generic resume PDFs. Shared factual source data and build tools stay at this level.

## Folder map

| Folder | Purpose |
| --- | --- |
| [resume-profiles/](resume-profiles/README.md) | Reusable industry and faculty resume configurations |
| [job-applications/](job-applications/README.md) | Job-specific resume sources and all supporting application materials |
| [generic-resume/](generic-resume/README.md) | Generated generic industry and faculty resume PDFs |
| [tests/](tests/) | Automated checks for data selection, content, and layout contracts |

## Build commands

Run from the repository root:

```bash
python -m pip install -r resume/requirements.txt
python -m unittest discover -s resume/tests
python resume/build.py --list
python resume/build.py --all
python resume/build_tailored.py --all
python resume/build_application_documents.py
python resume/validate_pdf_layout.py
```

- `build.py --all` generates generic industry/faculty PDFs and institution-specific faculty CVs. Generic PDFs go to `generic-resume/`; a faculty application CV is generated directly inside its college folder.
- `build_tailored.py --all` compiles standalone LaTeX application PDFs (industry and legacy faculty) directly beside their sources in `job-applications/industry/<job>/` or `job-applications/faculty/<college>/`.
- `build_application_documents.py` generates editable Word files beside Markdown sources in faculty application folders.
- `preview.py --watch` builds all outputs and serves the resume tree on port 8001.

## Editing rules

1. Correct shared facts in `content.json` or the portfolio data under `dist/data/`.
2. Edit reusable profile emphasis and selections under `resume-profiles/`.
3. Edit job-specific overlays, LaTeX sources, and supporting documents under the relevant `job-applications/` folder.
4. Treat PDFs and DOCX files as generated deliverables. For faculty statements, edit the Markdown source and regenerate the Word file; direct edits to a DOCX are not synchronized back to Markdown.
5. Never place confidential reference letters, identity documents, or private immigration records in this public portfolio repository.

## Shared source files

- `content.json`: resume-only factual overrides and additional verified records.
- `export-source.cjs`: exports shared profile, experience, education, project, certification, and publication data.
- `template.tex` and `latex_renderer.py`: common LaTeX rendering.
- `build.py`: generic and faculty profile builder.
- `build_tailored.py`: standalone LaTeX job-application builder for industry and legacy faculty applications.
- `build_application_documents.py`: faculty application Markdown-to-Word builder.
- `validate_pdf_layout.py`: faculty PDF pagination and line-break audit.
- `preview.py`: local browser preview and watch mode.

See the three folder-level READMEs for detailed conventions.
