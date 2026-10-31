# Job Applications

This directory contains employer- and institution-specific applications. Each application folder is self-contained: source configuration, job-specific resume source, README, and generated deliverables stay together.

- [Industry applications](industry/README.md): tailored LaTeX resume source, metadata, README, generated PDF, and build report in each job folder.
- [Faculty applications](faculty/README.md): one folder per college, containing the tailored CV, cover letter, teaching statement, research statement, reference template, checklist, editable Markdown sources, and generated Word documents.

Use a lowercase hyphenated folder name based on the employer/institution and role. Do not put generic profile PDFs here; those belong in `generic-resume/`.

## Faculty application tracker

Use the [application tracker guide](TRACKER.md) to record job posting links, priority, document readiness, deadlines and user-confirmed submissions. The searchable [development dashboard](https://waseemraza844.github.io/portfolio/develop/applications/) reads `dist/applications/jobs.json` and can export a CSV.
