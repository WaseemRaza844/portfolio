# Villanova University — Continuing Non-Tenure-Track Assistant Teaching Professor in Electrical Engineering

**Posting:** 20260097F | **Department:** Electrical and Computer Engineering  
**Location:** Villanova, PA | **Appointment:** Full time, 9 months | **Start:** Spring 2027  
**Official vacancy:** https://jobs.villanova.edu/postings/36606
**Posting date:** October 21, 2026 | **Closing date:** no deadline published; review begins immediately until filled.

## Required initial-stage application

1. Cover letter — `submission-ready/WRaza_VIL_ECE_TP27_CL.pdf`
2. Teaching-oriented CV — `submission-ready/WRaza_VIL_ECE_TP27_CV.pdf`
3. Statement of teaching philosophy — `submission-ready/WRaza_VIL_ECE_TP27_Teaching.pdf`
4. Genuine **academic transcripts** — upload privately to Villanova's portal. Never publish transcripts in this repository.
5. **Exactly three professional references** with verified names and contact details — enter privately in the portal (see `References_PRIVATE_CHECKLIST.md`). Do not commit referee emails or numbers to this public repository.

**Finalist stage only:** Statement of Contribution to the University Mission and enduring commitments. A draft is prepared in `Mission_Statement_FINALIST_DRAFT.md`; its PDF and DOCX are built under `finalist-only/`, not in the initial submission folder.

The employer lists Cover Letter, CV, Teaching Philosophy and Transcripts as required *document uploads*, and requests three references through the portal. The Mission Statement is listed as optional upload but **expressly required for finalists**. It is not necessary to upload with the initial package unless the portal or search committee requests it.

## Targeted teaching narrative

The posting especially values **circuits and control systems**. The applicant has a verified PhD in ECE and previously taught Computer Programming, Communication Systems and Wireless Communication as a Lecturer in the University of Lahore's Department of Technology. Experience at UET Taxila includes communications laboratory support, not instructor-of-record circuits or controls courses. COMSATS experience includes undergraduate/graduate research and project mentoring; AT&T Labs/Futurewei/AT&T brings real engineering practices.

The CV and documents emphasize connections among engineering fundamentals, signal/system analysis, quantitative simulation, optimization and project-based teaching. Any proposed circuits/controls classroom exercises are labeled **future instructional plans**, not historical course teaching or pedagogical scholarship. Do not invent prior circuit-lab teaching, control-course instruction, or formal education-research publications.

Villanova mission: https://www.villanova.edu/university/president/about-university.html
Villanova electrical engineering program: https://www.villanova.edu/university/engineering/academic-programs/electrical-computer/bs-electrical-engineering.html

## Build locally, PowerShell from portfolio root

```powershell
git switch develop
git pull --ff-only origin develop
python -m pip install -r resume/requirements.txt
python -m unittest discover -s resume/tests
python resume/build.py --variant faculty_villanova_ece_assistant_teaching_professor_spring_2027 --refresh-tex
python resume/build_application_documents.py
python resume/job-applications/faculty/villanova-ece-assistant-teaching-professor-spring-2027/build_documents.py
python resume/validate_pdf_layout.py
```

Refresh-tex recreates this Villanova variant's TeX source from JSON; avoid it if you have unsaved manual changes to that TeX file. The Word and PDF statement builders use the canonical Markdown in this folder.

## Pre-submission verification

- [ ] Inspect each generated PDF for correct layout and pagination.
- [ ] Review the language concerning circuits and controls and ensure it accurately represents your technical preparation.
- [ ] Confirm which transcript copies the portal accepts; upload privately.
- [ ] Confirm willingness and current private emails for exactly three references.
- [ ] Verify availability to be **on campus full-time** starting in Spring 2027, and confirm any employer work-authorization or sponsorship requirements through HR.
- [ ] Submit promptly; there is no employer-published closing date, and review has already started.
- [ ] Only mark the tracker `applied` after receipt of submission confirmation.

**Status: Prepared for review; not submitted.**
