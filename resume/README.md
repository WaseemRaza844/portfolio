# Resume and Faculty Application Workspace

Two primary folders keep source files beside deliverables:

- **[resume-profiles/](resume-profiles/README.md)**: reusable industry and faculty profiles. Each has its editable `.tex` and generated `.pdf` beside the JSON configuration.
- **[job-applications/](job-applications/README.md)**: employer/college-specific resumes, PDFs, and supporting documents. Each application has one folder.

Shared build tools, the master LaTeX template, `content.json`, and `tests/` remain under `resume/`. There is **no separate generated-output directory**.

## How the system works

For reusable profiles, Python transforms `dist/data/`, `resume/content.json`, and profile JSON into a complete LaTeX source **only when a TeX source is missing or you request it**. A normal build compiles existing `.tex` as-is into `.pdf` using `pdflatex`. This keeps small manual TeX edits intact.

### Build from repository root (Python 3.12, Node.js, and pdflatex required)

```bash
python -m pip install -r resume/requirements.txt
python -m unittest discover -s resume/tests
python resume/build.py --all
python resume/build_tailored.py --all
python resume/build_application_documents.py
python resume/validate_pdf_layout.py
```

### Refresh TeX deliberately from shared data

```bash
python resume/build.py --all --refresh-tex
python resume/build.py --variant faculty --refresh-tex
```

**Warning:** `--refresh-tex` replaces manual TeX edits in the affected variant(s). Commit or back up those changes before refreshing. A normal `--all` rebuild preserves them. To apply a change to the shared JSON or portfolio source to a document, run `--refresh-tex` for that variant, review the TeX diff, then commit both TeX and PDF.

### Recompile a single profile / tailored application

```bash
python resume/build.py --variant genai
python resume/build.py --variant faculty
python resume/build_tailored.py --job ohio-state-optimization-ml-r160519
```

Editable Word files in faculty applications are built from adjacent Markdown with:

```bash
python resume/build_application_documents.py
```

The **Build resume PDFs and application documents** GitHub Action runs tests, compiles every profile/application TeX, validates PDFs, builds Word documents, and publishes files to `develop`. The **Deploy portfolio to GitHub Pages** workflow renders PDF browser previews.

## Windows PowerShell

From the repo root after Python 3.12, Node.js, and MiKTeX/TeX Live are installed:

```powershell
python -m venv resume\.venv
.\resume\.venv\Scripts\python.exe -m pip install -r resume\requirements.txt
.\resume\.venv\Scripts\python.exe resume\build.py --all
.\resume\.venv\Scripts\python.exe resume\build_tailored.py --all
.\resume\.venv\Scripts\python.exe resume\build_application_documents.py
.\resume\.venv\Scripts\python.exe resume\validate_pdf_layout.py
```

To remove the **old local-only** `resume/output` folder after confirming no important edits are inside it:

```powershell
# First inspect any old files
Get-ChildItem resume\output -Recurse
# Then, only if you no longer need them:
Remove-Item resume\output -Recurse -Force
```

Git cannot delete an ignored/untracked folder on your Windows computer just by pulling a branch. The old `output/` is no longer used by these builders.

## Files to edit

- `dist/data/*.js`: website/shared academic and professional facts.
- `content.json`: resume-specific factual overrides.
- `resume-profiles/industry/variants.json`, `resume-profiles/faculty/*.json`: profile metadata/selections (refresh TeX to apply).
- `resume-profiles/<industry|faculty>/Waseem_Raza_*.tex`: directly editable LaTeX sources (normal build preserves edits).
- `job-applications/<industry|faculty>/<job>/*.tex`: specific resume sources (normal build preserves edits).
- `job-applications/faculty/<college>/*.md`: supporting document sources (Word files rebuilt from Markdown).
- `template.tex` and `latex_renderer.py`: common renderer used **when refreshing TeX**.

Do not commit private reference letters, identity documents, or confidential immigration files to this public repository.
