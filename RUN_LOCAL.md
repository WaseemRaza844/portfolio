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
resume/.venv/bin/python resume/build.py --variant comprehensive
resume/.venv/bin/python resume/build.py --variant genai
resume/.venv/bin/python resume/build.py --variant aiml
resume/.venv/bin/python resume/build.py --variant wireless
resume/.venv/bin/python resume/build.py --variant healthcare
resume/.venv/bin/python resume/build.py --variant finance
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

## 9. Codespaces port troubleshooting

The repository explicitly forwards ports **8000** (website) and **8001** (resume PDFs).
After a change to `.devcontainer/devcontainer.json`, simply pulling the repository does **not** re-apply container settings to an already-running Codespace.

If a forwarded `*.app.github.dev` URL returns **HTTP 404**, do this:

1. In the Command Palette, run **Codespaces: Rebuild Container**.
2. Wait for the container to finish rebuilding. The repository's `postStartCommand` now starts the portfolio server automatically.
3. Open the **Ports** panel and use **Open in Browser** for port **8000**.
4. Confirm the server inside the Codespace with:

```bash
curl -I http://127.0.0.1:8000/
```

A successful local response means the website server is healthy. If the forwarded browser URL still fails, remove the existing port entry from the Ports panel, add **8000** again, and reopen it from that panel.

Server log:

```bash
tail -n 50 /tmp/waseem-portfolio-8000.log
```

To restart the automatically started website server:

```bash
pkill -f "live-server dist" || true
bash .devcontainer/start-portfolio.sh
```

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
