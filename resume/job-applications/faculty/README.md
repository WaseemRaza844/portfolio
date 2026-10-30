# Faculty Job Applications

Create one folder per institution and position. Each folder contains the tailored faculty CV, variant configuration or standalone LaTeX source, application plan, supporting statements, reference template, checklist, and generated deliverables. There are no nested `documents/`, `source/`, or `word/` directories.

Current applications:

- [Lafayette College — Assistant Professor of ECE](lafayette-college-assistant-professor-ece/README.md): profile-based CV plus five Markdown/Word supporting documents.
- [The Ohio State University — Optimization for Machine Learning](ohio-state-optimization-ml-r160519/README.md): preserved standalone LaTeX application resume and metadata from the earlier application workflow.

For new faculty applications, prefer a `variant.json` overlay based on `faculty`, `faculty_comprehensive`, or `academic_cv`; `build.py` generates the resulting PDF directly into that college's folder. Existing standalone LaTeX applications with `metadata.json` are also supported by `build_tailored.py --all`, which writes their PDFs directly into the same folder.
