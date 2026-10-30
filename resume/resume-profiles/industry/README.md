# Industry Resume Profiles

The reusable industry variants are defined in [variants.json](variants.json). They share verified source data from `resume/content.json` and `dist/data/`.

Current variants include generic, comprehensive, GenAI, AI/ML, wireless, healthcare, and finance positioning.

Build all generic profile PDFs with:

```bash
python resume/build.py --all
```

The generated PDFs are written to `resume/generic-resume/industry/`. Tailoring for a specific employer belongs in `resume/job-applications/industry/<job-slug>/`, not in this folder.
