# Industry Resume Profiles

The reusable industry variants are defined in [variants.json](variants.json). They share verified source data from `resume/content.json` and `dist/data/`.

Current variants include generic, comprehensive, GenAI, AI/ML, wireless, healthcare, and finance positioning.

Build all generic profile PDFs with:

```bash
python resume/build.py --all
```

The generated PDFs are written to `resume/resume-profiles/industry/`. Tailoring for a specific employer belongs in `resume/job-applications/industry/<job-slug>/`, not in this folder.

## Editing LaTeX directly

The source `.tex` and output `.pdf` live in this folder. Edit a profile's TeX and run `python resume/build.py --variant <id>` to compile without replacing the TeX. To explicitly regenerate a TeX source after updating JSON or shared portfolio data, use `python resume/build.py --variant <id> --refresh-tex` (overwrites manual TeX edits).
