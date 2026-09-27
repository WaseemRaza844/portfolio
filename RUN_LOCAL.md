# Local Run Guide

Use this file for the normal local/Codespaces workflow for both the website and resume generator.

## 1. Start from the development branch

```bash
git switch develop
git pull origin develop
```

## 2. First-time setup — GitHub Codespaces / Linux

From the repository root:

```bash
npm install
bash resume/setup.sh
```

The resume setup creates `resume/.venv`, installs the Python dependencies, and prepares the LaTeX environment used to generate PDFs.

## 3. Daily development — Codespaces / Linux

Open two terminals from the repository root.

**Terminal 1 — portfolio website**

```bash
npm run dev
```

Open port **8000**.

**Terminal 2 — resume PDFs with automatic rebuild**

```bash
resume/.venv/bin/python resume/preview.py --watch
```

Open port **8001**.

The resume preview command builds all variants when it starts and rebuilds after relevant source changes.

## 4. Build resumes without the preview server

List variants:

```bash
resume/.venv/bin/python resume/build.py --list
```

Build all variants:

```bash
resume/.venv/bin/python resume/build.py --all
```

Build one variant:

```bash
resume/.venv/bin/python resume/build.py --variant generic
resume/.venv/bin/python resume/build.py --variant genai
resume/.venv/bin/python resume/build.py --variant aiml
resume/.venv/bin/python resume/build.py --variant faculty
```

Generated files are written to `resume/output/`.

## 5. Windows PowerShell setup

From the repository root:

```powershell
git switch develop
git pull origin develop

npm install

python -m venv resume\.venv
.\resume\.venv\Scripts\python.exe -m pip install --upgrade pip
.\resume\.venv\Scripts\python.exe -m pip install -r resume\requirements.txt
```

A working `pdflatex` installation is also required. MiKTeX or TeX Live can provide it.

Check:

```powershell
pdflatex --version
```

Run the website:

```powershell
npm run dev
```

Build all resumes:

```powershell
.\resume\.venv\Scripts\python.exe resume\build.py --all
```

Run resume preview/watch mode:

```powershell
.\resume\.venv\Scripts\python.exe resume\preview.py --watch
```

## 6. Tests

Codespaces / Linux:

```bash
resume/.venv/bin/python -m unittest discover -s resume/tests
```

Windows PowerShell:

```powershell
.\resume\.venv\Scripts\python.exe -m unittest discover -s resume\tests
```

## 7. Main source files

| Purpose | File |
| --- | --- |
| Shared identity, education, and experience | `dist/data/profile-data.js` |
| Certifications and courses | `dist/data/certifications.js` |
| Projects | `dist/data/projects.js` |
| Publications | `dist/data/publications.js` |
| Resume variant selection and positioning | `resume/variants.json` |
| Resume-specific overrides and contact data | `resume/content.json` |
| Resume layout | `resume/template.tex` |
| Resume rendering logic | `resume/latex_renderer.py` |

## 8. Normal branch flow

```text
feature/... → develop → main
```

Website feature branches use the naming pattern:

```text
feature/web-wr-<description>
```

Resume feature branches should use:

```text
feature/resume-wr-<description>
```

Automatic resume Actions run only on `develop` and `main`. Public GitHub Pages deployment runs only from `main`.
