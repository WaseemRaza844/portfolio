# Portfolio and Resume Commands — GitHub Codespaces

Save this file in your repository root, beside `dist/` and `resume/`.
All commands below run in the **Codespaces terminal**, from that root.

## 1. Everyday quick start

**Terminal 1 — website with automatic refresh:**

```bash
npm run dev
```

**Terminal 2 — build all resume PDFs, serve them, and rebuild on edits:**

```bash
resume/.venv/bin/python resume/preview.py --watch
```

The second command already builds all PDFs when it starts. You do not need to
run `build.py --all` first. Leave both terminals running. Open another terminal
for other commands. Press **Ctrl+C** in a server's terminal to stop that server.

| Preview | Port | How to open |
| --- | --- | --- |
| Portfolio website | 8000 | Ports → 8000 → Open in Browser |
| Resume PDFs | 8001 | Ports → 8001 → Open in Browser → select a PDF |

If a port is missing, choose **Add Port** in the Ports panel and enter its number.
In browser-based Codespaces, use the forwarded address, not a manually typed
`localhost` address on your laptop. See [GitHub's port-forwarding guide](https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace).

## 2. First-time setup or missing dependencies

Run these once after installing the project, or when dependencies are missing:

```bash
npm install
bash resume/setup.sh
```

The resume setup creates `resume/.venv`, installs Python packages, and installs
the required LaTeX packages if missing. Its first run can take several minutes.
There is no need to activate the virtual environment: the commands use its Python
interpreter explicitly.

If Python/venv is unavailable, use **Codespaces: Rebuild Container** from the
Command Palette with the supplied Python-enabled devcontainer configuration.

To return to the Git repository root from a subfolder:

```bash
cd "$(git rev-parse --show-toplevel)"
```

Check that `dist/`, `resume/`, and `package.json` are visible in Explorer.

## 3. Generate PDFs without starting a preview server

**All variants:**

```bash
resume/.venv/bin/python resume/build.py --all
resume/.venv/bin/python resume/build_tailored.py --all
resume/.venv/bin/python resume/build_application_documents.py
resume/.venv/bin/python resume/validate_pdf_layout.py
```

**Only the variant you need — run one of these:**

```bash
resume/.venv/bin/python resume/build.py --variant genai
resume/.venv/bin/python resume/build.py --variant aiml
resume/.venv/bin/python resume/build.py --variant faculty
resume/.venv/bin/python resume/build.py --variant generic
```

**List available variant IDs:**

```bash
resume/.venv/bin/python resume/build.py --list
```

| Variant | Generated PDF |
| --- | --- |
| GenAI | `resume/generic-resume/industry/Waseem_Raza_GENAI.pdf` |
| AI/ML | `resume/generic-resume/industry/Waseem_Raza_AIML.pdf` |
| Faculty & Academic | `resume/generic-resume/faculty/Waseem_Raza_FACULTY.pdf` |
| Generic | `resume/generic-resume/industry/Waseem_Raza_GENERIC.pdf` |

Generic PDFs are stored in `resume/generic-resume/industry/` and `resume/generic-resume/faculty/`. Faculty application CVs and industry tailored PDFs are stored directly in their respective `resume/job-applications/` folders. The generic build report is `resume/generic-resume/build-report.json`. Generated LaTeX intermediates are not intended as editable source; make lasting edits in the profile JSON or application source files.

## 4. Preview options

**Build all once and serve, without watching for edits:**

```bash
resume/.venv/bin/python resume/preview.py
```

**Serve existing PDFs immediately without rebuilding:**

```bash
python3 -m http.server 8001 --bind 0.0.0.0 --directory resume
```

Use only one server on port 8001. The simple Python server has no automatic
rebuild or cache prevention. After a separate build, refresh or reopen the PDF tab.
Avoid manually running a build while the watch server is already rebuilding.

**Print direct preview links in a spare Codespaces terminal:**

```bash
printf 'Website: https://%s-8000.%s/\n' "$CODESPACE_NAME" "${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN:-app.github.dev}"
printf 'GenAI PDF: https://%s-8001.%s/Waseem_Raza_GENAI.pdf\n' "$CODESPACE_NAME" "${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN:-app.github.dev}"
```

Click the printed URL, or Ctrl+click if your editor requires it. These commands
print links; they do not start a server. The corresponding server and forwarded
port must already be running. The Ports panel's copied address is authoritative
if your environment uses a different forwarding address.

For another generic PDF, change the filename and, where appropriate, the `industry/` or `faculty/` directory. Job-specific PDFs are inside `job-applications/industry/<job>/` or `job-applications/faculty/<college>/`.
To download a PDF, use the browser PDF viewer's download button or right-click
the generated file in Codespaces Explorer and select **Download**.

## 5. Website preview and variants

Preferred command:

```bash
npm run dev
```

Your project's command serves `dist/` on port 8000, watches for edits, and disables
caching. Save an edited file to trigger refresh.

Alternative with Python, without automatic refresh:

```bash
python3 -m http.server 8000 --bind 0.0.0.0 --directory dist
```

Stop the current website server before switching commands.

Append these paths to the forwarded website address:

| Page | Path |
| --- | --- |
| Generic home | `/index.html` |
| GenAI home | `/genai/` |
| AI/ML & Data Science home | `/aiml/` |
| Faculty & Academic home | `/faculty/` |
| GenAI learning | `/learning.html?profile=genai` |
| GenAI projects | `/projects.html?profile=genai` |

Website routes depend on the files and profiles in your current site. Having an
The four active profiles are `generic`, `genai`, `aiml`, and `faculty`, with matching resume variants and website homepages.

## 6. Where to edit

| Change | Source file |
| --- | --- |
| Website/shared identity, education and experience | `dist/data/profile-data.js` |
| Certifications, course details, progress and certificate URLs | `dist/data/certifications.js` |
| Projects | `dist/data/projects.js` |
| Publications | `dist/data/publications.js` |
| Industry resume headline, summary, skills, selected IDs and page limits | `resume/resume-profiles/industry/variants.json` |
| Faculty generic, comprehensive and academic CV profiles | `resume/resume-profiles/faculty/*.json` |
| Job-specific resume overlays and supporting application documents | `resume/job-applications/` |
| Resume contacts, experience overrides and separate internship records | `resume/content.json` |
| Resume font packages, heading rules and spacing | `resume/template.tex` |
| Resume field rendering and certificate-header formatting | `resume/latex_renderer.py` |

**Website edit:** save, then check port 8000.

**Resume edit:** save, wait for a successful watch build or build manually, then
refresh the PDF on port 8001. Watch mode rebuilds after data/JSON/Python/template
changes; it does not automatically refresh the browser PDF viewer.

## 7. Troubleshooting

| Problem | Action |
| --- | --- |
| `live-server: not found` | Run `npm install` from the repository root. |
| `resume/.venv/bin/python: No such file` | Check the working directory, then run `bash resume/setup.sh`. |
| `pdflatex missing` | Run `bash resume/setup.sh`. |
| Address/port already in use | Stop the previous server with Ctrl+C in its terminal. |
| Old website content | Confirm you opened port 8000, saved the correct file under `dist/`, and hard-refresh with Ctrl+Shift+R. |
| Old PDF | Check that the build succeeded, then refresh or close and reopen its tab. |
| Build fails after a JSON edit | Check double quotes, commas and brackets; JSON does not support comments or trailing commas. |
| Unknown selected ID | Match the ID in `variants.json` to the corresponding source record. |
| PDF exceeds page budget | Edit selections/layout or increase `maxPages`; inspect the retained PDF. |
| LaTeX compilation error | Inspect the terminal message and matching `.log` in the relevant `resume/generic-resume/` or application folder. Industry LaTeX intermediates are created temporarily and are not retained. |

For an intentionally oversized draft:

```bash
resume/.venv/bin/python resume/build.py --variant genai --allow-overflow
```

This permits exceeding the page budget; it does not suppress LaTeX layout errors.
The expanded version uses budgets of three pages for focused variants and four
for Generic. Actual counts depend on your current content.

If port 8001 is unavailable, use another preview port:

```bash
resume/.venv/bin/python resume/preview.py --watch --port 8002
```

Then open port 8002 instead.

Optional checks after editing generator code:

```bash
resume/.venv/bin/python -m unittest discover -s resume/tests
```

## 8. Optional: apply the expanded-content update once

Only use this if you have not already applied the supplied `resume-update/` bundle.
Stop PDF preview first. Keep its files together beside `resume/`:

```bash
python3 resume-update/apply_update.py
resume/.venv/bin/python resume/build.py --all
```

The updater backs up affected files under `resume/backups/`. Do not run it for
ordinary daily edits: rerunning reapplies the supplied content and can replace
later changes to the summaries, skills and specified experience bullets.

## 9. Preview versus publishing

Running a preview does not update the public GitHub Pages website. To deploy website
edits, review the changed files in Source Control, commit the intended changes,
push/sync, and check your repository's Pages deployment result.

Review changes from the terminal with:

```bash
git status --short
git diff --stat
```

The **Build resume PDFs and application documents** GitHub Actions workflow builds and validates generic and tailored PDFs plus the faculty Word files. It publishes the generated files to the corresponding repository folders and provides a downloadable artifact.
Keep `.venv`, temporary compiler output, and local backups out of routine commits.

## Daily reminder

1. Website terminal: `npm run dev`.
2. PDF terminal: `resume/.venv/bin/python resume/preview.py --watch`.
3. Edit source files and save.
4. Website: port 8000. PDFs: port 8001, refresh after a successful build.
5. Stop servers with Ctrl+C when finished.
