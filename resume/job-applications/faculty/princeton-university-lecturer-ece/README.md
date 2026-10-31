# Princeton University — Lecturer, Electrical and Computer Engineering

**Position:** ECE Lecturer, occasional curricular needs. **Interest areas:** Computing & Networking; Data & Information Science.  
**Deadline:** July 27, 2027, 11:59 PM Eastern. **Work location:** On campus, Princeton, NJ.

This application folder is independent of the generic faculty CV and Lafayette materials.

## Upload to Interfolio: two PDF documents

1. **C.V.** — `Waseem_Raza_FACULTY_PRINCETON_UNIVERSITY_LECTURER_ECE.pdf`, built from `variant.json` based on the generic full academic CV.
2. **Cover Letter** — `Waseem_Raza_PRINCETON_LECTURER_COVER_LETTER.pdf`, rendered from `01_Princeton_Cover_Letter.md` (editable Word document also generated from `application-documents.json`).

**References:** Interfolio's separate **Reference Contact Form (3 required)** collects contact details. The applicant has prepared an updated reference document separately and changed the third referee; **do not reuse a previously drafted placeholder reference list or an outdated third contact.** No reference PDF is requested in the screenshot.

## Build

From repository root:

```bash
python resume/build.py --variant faculty_princeton_university_lecturer_ece
python resume/build_application_documents.py
python resume/job-applications/faculty/princeton-university-lecturer-ece/build_cover_letter.py
python resume/validate_pdf_layout.py
```

GitHub Actions generates both PDFs and the editable cover-letter DOCX for the draft PR as workflow artifacts. Generated PDFs are published as browseable files to `develop` by the existing workflow **after the PR is merged and the `develop` push workflow succeeds**.

## Submission checklist

- [ ] Open both PDFs; ensure names, degree, dates and current employment information are correct.
- [ ] Confirm the CV emphasizes genuine undergraduate instruction, computing and networking, and data science.
- [ ] Cover letter has one clean page and is signed with current contact information.
- [ ] Complete the three-reference form using the updated referee contacts.
- [ ] Complete Attestation, Work Eligibility, Areas of Interest and other requested Interfolio forms.
- [ ] Review and submit application; retain confirmation.
