# William Paterson University — Adjunct Faculty, Computer Science (Job 1084)

**Campus:** Wayne, New Jersey | **Type:** part-time, as-needed adjunct pool | **Department:** Computer Science, College of Science and Health.

**Job posting:** https://www.higheredjobs.com/faculty/details.cfm?JobCode=179612375&Title=Adjunct%20Faculty%20-%20Computer%20Science

## Required application files

The posting requests a **cover letter** and **resume/CV**. It does not require a separate teaching or research statement.

- `variant.json`: focused overlay on the shared `faculty_cs_ai_ml` four-page academic CV using the existing LaTeX renderer.
- `Cover_Letter.md`: institution-specific, substantive one-page letter. Based on the existing Caldwell CS adjunct format.
- `application-documents.json`: drives the repository Word generator.
- `build_documents.py`: compiles the tailored LaTeX CV and builds both PDF and editable DOCX cover letters.
- `submission-ready/`: generated PDFs and Word file after local build.

## Course preferences

1. **Primary:** Computer and Information Technology.
2. **Primary:** Fundamentals of Computer Networking.
3. **Additional, with syllabus review:** Discrete Structures.

Previous direct teaching: Computer Programming, Communication Systems and Wireless Communication; do not misrepresent proposed courses as previously taught.

## Local build (PowerShell, repository root)

```powershell
git switch develop
git pull --ff-only origin develop
python -m pip install -r resume/requirements.txt
python resume/build.py --variant faculty_william_paterson_cs_adjunct_1084 --refresh-tex
python resume/job-applications/faculty/william-paterson-cs-adjunct-1084/build_documents.py
explorer "resume\job-applications\faculty\william-paterson-cs-adjunct-1084\submission-ready"
```

After the first build, omit `--refresh-tex` to preserve manually edited TeX. Requires a working LaTeX installation and Word/PDF Python dependencies.

## Review and submission

- [ ] Inspect CV PDF for layout and correct qualifications.
- [ ] Confirm cover letter remains exactly one page and fills the page appropriately.
- [ ] Confirm teaching availability and course scheduling before accepting an assignment.
- [ ] Upload the CV and cover letter to the university portal.
- [ ] Update application tracker **only after actual submission**.

**Status:** source documents prepared on develop; not submitted. Generated binaries require running the build.
