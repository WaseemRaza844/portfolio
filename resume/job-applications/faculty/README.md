# Faculty Job Applications

Create one folder per institution and position. Each folder contains the tailored faculty CV, variant configuration or standalone LaTeX source, application plan, supporting statements, reference template, checklist, and generated deliverables. There are no nested `documents/`, `source/`, or `word/` directories.

Current applications:

- [Lafayette College — Assistant Professor of ECE](lafayette-college-assistant-professor-ece/README.md): profile-based CV plus five Markdown/Word supporting documents.
- [The Ohio State University — Optimization for Machine Learning](ohio-state-optimization-ml-r160519/README.md): standalone LaTeX application resume, compiled by `build_tailored.py`.

For new faculty applications, prefer a `variant.json` overlay based on `faculty`, `faculty_comprehensive`, or `academic_cv`; `build.py` generates the resulting PDF directly into that college's folder. Existing standalone LaTeX applications with `metadata.json` are also supported by `build_tailored.py --all`, which writes their PDFs directly into the same folder.

## Recent application archive (November 2026)

- [22 recently prepared positions — PDF/LaTeX backfill and status index](RECENT_APPLICATIONS_2026.md).
- The live dashboard is backed by `dist/applications/jobs.json`; the 22 job records are tracked there.
- Binary PDFs are preserved in a local ZIP prepared for a one-step Windows Git push; do not assume they exist in `develop` until that push succeeds.

- [Drew University — Spring 2027 Adjunct Mathematics & Computer Science / CSCI150](drew-university-adjunct-math-cs-spring-2027/README.md): three-page Python-focused CV and one-page letter prepared; PDFs require ZIP sync; application unsubmitted.

- [Excelsior University — Part-Time Online Faculty, Computer Science](excelsior-university-online-computer-science-adjunct-2026/README.md): CV and one-page letter verified; three private references pending; status preparing.
