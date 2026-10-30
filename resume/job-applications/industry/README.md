# Industry Job Applications

Each employer-specific folder contains one tailored LaTeX resume source, `metadata.json`, a positioning/quality-control README, and the generated PDF. The builder uses a temporary directory for LaTeX intermediates so the application folder stays uncluttered.

Build every industry application:

```bash
python resume/build_tailored.py --all
```

Build one application:

```bash
python resume/build_tailored.py --job cybercoders-senior-ml-engineer
```

The resulting PDF and concise `build-report.json` are written directly into the matching application folder. Reusable base profiles remain under `resume/resume-profiles/industry/`; generic profile PDFs are under `resume/generic-resume/industry/`.
