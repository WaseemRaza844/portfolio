# Expanded resume content update

This small update uses your supplied Founding AI resume to expand technical
expertise, leadership and experience. It does not replace website data.

## Apply

Extract the ZIP so `resume-update/` sits beside `resume/` and `dist/` in your
repository. Stop the running resume preview with Ctrl+C before applying.
From the repository root:

```bash
python3 resume-update/apply_update.py
resume/.venv/bin/python resume/build.py --all
resume/.venv/bin/python resume/preview.py --watch
```

Open port 8001 using the Codespaces Ports tab, then click a PDF. If the Python
virtual environment is missing, run `bash resume/setup.sh` first.

The updater backs up variants.json, content.json and latex_renderer.py under
`resume/backups/<timestamp>/`. It then merges the content and replaces the renderer.
For rollback, copy those three backup files into `resume/` and rebuild.

## What changes

- Expanded technical expertise, prioritizing GenAI, AI/ML or wireless by variant.
- Six leadership/professional strengths with bold labels.
- Detailed AT&T, Impac and graduate research achievement bullets from your PDF.
- Separate AT&T Labs 2024, Futurewei 2022–2023 and AT&T Labs 2022 internships.
- Resume-only suppression of the old combined internship record to avoid duplication.
- Removed forced page breaks; ordinary page margins and natural final-page space remain.
- Focused variants have a three-page budget and 10 pt body type. Generic has a
  four-page budget and 9 pt body type. Latin Modern, color and template remain.
- Numbered certification titles; Completed (x/y) courses; bold Focus/Tools & Skills;
  blue underlined issuer links and a separate Certificate link when available.

Your existing contacts, portfolio URL, certificate/project/publication records,
their selections, certificate overrides and custom resume skills lists remain.
This update intentionally replaces the four variants' summaries, technical skills,
leadership, and the specified experience bullets/dates. Previous short per-variant
bullets for those jobs are cleared so they do not override the expanded text.
The website's shared experience data is not edited.

The included sample PDFs were built from the last portfolio snapshot available
here. Your locally updated certificate links and counts take effect when you build
in Codespaces. Final page counts can change with additional content.

## Further editing

After applying, edit the live resume files (not the update payload):

| Content | Location |
| --- | --- |
| Variant intro and technical categories | `resume/variants.json`: summary and skills |
| Leadership labels and descriptions | `resume/variants.json`: leadership |
| Focused font size/page budget | `resume/variants.json`: latexFontSize and maxPages |
| AT&T, Impac and research bullets/dates | `resume/content.json`: experienceOverrides |
| Three separate internships | `resume/content.json`: additionalExperience |
| Certificate selection and ordering | `resume/variants.json`: certificationIds |

Keep `settings.explicitPageBreaks` false in content.json and omit `pageBreakBefore`
in variants.json to avoid deliberate gaps. Adding text may increase page count;
the budget is a maximum, not a command to pad a resume to that length.

Dates and metrics were taken from your reference PDF, not independently verified.
The source portfolio's combined-internship dates differ; resume overrides now use
the detailed reference dates. Education remains as recorded in the portfolio.
Reference claims such as 20% to 80% diagnostic accuracy, 40% ETL time reduction,
and 25% CSI compression improvement should remain only if you can substantiate them.

Run the updater once; rerunning reapplies this content and backs up the current
files again. Commit the updated resume source after reviewing the PDFs.
