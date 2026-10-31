# Princeton University — Lecturer, Electrical and Computer Engineering

**Role:** Lecturer (occasional curricular needs); focus on Computing & Networking and Data & Information Science.  
**Opening:** July 27, 2026. **Deadline:** July 27, 2027, 11:59 p.m. Eastern.  
**Instructional appointments:** Fall 2026 and/or Spring 2027, depending on enrollments and curricular needs.  
**Workplace:** In person, Princeton, New Jersey.

This tailored application is independent of the generic faculty CV and Lafayette application.

## Required submission materials (PDF)

1. **Curriculum vitae:** Generated from `variant.json` using `academic_cv` as the base; PDF output in this folder.
2. **Cover letter:** `01_Princeton_Cover_Letter.md`; render to PDF for submission.
3. **Three references:** `02_Princeton_Professional_References.md`; confirm details and render to PDF.

No teaching or research statement is requested in the supplied advertisement. Do not upload extras unless Princeton asks.

## Build

From the repository root:

```bash
python resume/build.py --variant faculty_princeton_university_lecturer_ece
```

The repository's existing `resume/build_application_documents.py` only generates DOCX from entries in an `application-documents.json`. For this application, Markdown sources are authoritative until PDF generation is configured and verified.

## Review before submitting

- [ ] Confirm all three references' current affiliations and email addresses, and obtain permission.
- [ ] Confirm accuracy of degree, teaching dates and academic appointments against the master source.
- [ ] Ensure CV is focused on the advertised teaching areas and is readable without sparse or clipped pages.
- [ ] Render CV, cover letter and references to PDFs and inspect each.
- [ ] Submit via Princeton's official application portal before the deadline.
