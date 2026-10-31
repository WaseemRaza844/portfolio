# Susquehanna University — Assistant Professor of Computer Science (Tenure Track)

**Official position:** https://www.schooljobs.com/careers/susqu/jobs/5527323/assistant-professor-of-computer-science  
**Job number:** 0000311 | **Location:** Selinsgrove, PA | **Start:** August 2027  
**Application review begins:** November 30, 2026; continuously open until filled.  
**Internal tracker target:** November 20, 2026 (adjustable personal planning date, not employer deadline).

## Submit the following five items

| Required | File or action |
| --- | --- |
| Cover letter (liberal-arts teaching/research fit **and** proposed individual undergraduate capstones) | `submission-ready/WRaza_FAC_SUSQUEHANNA_CS_2027_Cover_Letter.pdf` |
| Academic CV | `submission-ready/WRaza_FAC_SUSQUEHANNA_CS_2027_CV.pdf` |
| Statement of teaching philosophy and/or portfolio | `submission-ready/WRaza_FAC_SUSQUEHANNA_CS_2027_Teaching_Philosophy.pdf` |
| Research plans including undergraduate participation | `submission-ready/WRaza_FAC_SUSQUEHANNA_CS_2027_Research_Plan.pdf` |
| Names and contact information for three professional references | **Private applicant copy only:** `WRaza_FAC_SUSQUEHANNA_CS_2027_References.pdf` generated outside GitHub from the previously completed reference list |

The official employer advertisement says references will later be asked for letters, **at least one addressing teaching experience**. Contact the appropriate referee before submission to confirm they can give a firsthand teaching assessment. A separate AcademicJobsOnline mirror describes three letters, but directs applicants to the official schooljobs site. Follow the actual employer portal's document collection fields.

## Positioning and integrity

The target is a **Computer Science department** at a small undergraduate-focused liberal-arts university, not an ECE Lecturer pool. Application materials emphasize programming, computational problem-solving, data science and machine learning, networks, reproducible software, and genuinely individual capstone ideas. The PhD is correctly described as **Electrical and Computer Engineering**, not Computer Science.

- Previously taught at the University of Lahore: Computer Programming, Communication Systems, Wireless Communication.
- UET Taxila: communications lab/course support. COMSATS: Bachelor’s and Master’s project/thesis research mentoring.
- Introductory CS programming, data-oriented computing, networking and ML fit actual training and practice. Courses like Data Structures or Algorithms are addressed as part of departmental curriculum; the application does **not** claim they were previously taught as instructor of record.
- Proposed student projects use open/authorized datasets, baseline implementations and compact computing. No grant, clinical validation, hardware laboratory or proprietary AT&T dataset is claimed.
- Prior combined tutoring experience may be mentioned, distinctly from university appointments.

## Source files

`variant.json` is a tailored academic CV overlay using the generic faculty CV data. All other documents have editable Markdown and Word sources, PDF outputs and stable submission filenames.

**Never commit referee email addresses or the complete references contact file to this public repository.** `04_Susquehanna_References_PUBLIC.md` is a redacted roster for review, not the required upload.

## Local build commands (PowerShell; repository root)

```powershell
git switch develop
git pull --ff-only origin develop
python resume/build.py --variant faculty_susquehanna_cs_assistant_professor_2027
python resume/build_application_documents.py
python resume/job-applications/faculty/susquehanna-cs-assistant-professor-2027/build_documents.py
python resume/job-applications/faculty/susquehanna-cs-assistant-professor-2027/package_submission.py
python resume/validate_pdf_layout.py
```

The repository's existing GitHub Actions build generates and publishes the public CV, cover letter, teaching philosophy and research plan PDFs/DOCXs to `develop` once validated.

## Review before submitting

- [ ] Review CV courses, degrees, work history, selected publications and contact email.
- [ ] Review consistency of capstone ideas across cover letter and research plan.
- [ ] Confirm three referees' willingness and identify one who can comment directly on teaching.
- [ ] Upload private reference-contact list (never the redacted public copy).
- [ ] Complete application at official portal and save confirmation.
- [ ] Change tracker from Preparing to Submitted only after application confirmation.

**Status:** Prepared for applicant review; no application has been submitted.
