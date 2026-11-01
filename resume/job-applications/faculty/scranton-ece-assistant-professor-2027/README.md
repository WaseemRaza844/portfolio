# University of Scranton — Assistant Professor of Electrical/Computer Engineering

**Official employer posting:** https://universityofscrantonjobs.com/postings/9126  
**Posting:** F00625P | **Department:** Physics & Engineering | **Start:** August 2027  
**Appointment:** Full-time, tenure-track, nine-month academic year, **9–12 teaching credits per semester**  
**Full-consideration date:** December 11, 2026. Remains open until filled; this is not necessarily a hard closure date.  
**Applicant personal target:** November 20, 2026.

## What the employer requires

| Upload / form item | Submission guidance |
| --- | --- |
| Cover letter | `submission-ready/WRaza_FAC_SCR27_CL.pdf` |
| Curriculum vitae | `submission-ready/WRaza_FAC_SCR27_CV.pdf` |
| Teaching statement, **no more than 2 pages** | `submission-ready/WRaza_FAC_SCR27_Teaching.pdf` |
| Research statement, **no more than 2 pages** | `submission-ready/WRaza_FAC_SCR27_Research.pdf` |
| **Academic transcripts** | Your genuine transcripts. Upload **privately** to the official university application system. Do **not** publish in the portfolio repo. |
| **Three professional references, names + emails** | Enter privately in PeopleAdmin. References will be contacted for recommendation letters. Never commit personal reference contact details to this public repo. |

Word copies are also in `submission-ready/` for your review and editing; Markdown files in this folder are the canonical editable text.

## Reuse policy

The CV is not a new rewrite. `build_documents.py` copies the **identical PDF** from `../ece-shared-2027/Waseem_Raza_FACULTY_ECE_SHARED_2027.pdf` into this Scranton package with a short upload-friendly filename. Source: `../ece-shared-2027/variant.json` (reusable academic CV). This ensures consistent qualifications, research experience, teaching dates, programming tools, and publications across applications.

The Scranton cover letter, teaching statement, and research statement were *separately written* for this posting, based on prior ECE materials without merely copying another institution's name. Emphasis: undergraduate teaching and labs; **engineering applications of AI/ML**; ABET evidence-based assessment; accessible course design and Jesuit service; sustainable undergraduate-focused research. The applicant's previously taught courses are **Computer Programming, Communication Systems, and Wireless Communication** in the University of Lahore's **Department of Technology**, with laboratory support at UET Taxila and project/thesis mentoring at COMSATS.

The employer prioritizes power and energy, power electronics, electrical machines, robotics/autonomy, computer architecture, **or engineering applications of AI/ML/cybersecurity**. The application supports AI/ML, communications and sensing, while not falsely claiming power, microelectronics, or robotics instructor-of-record experience.

## Important eligibility issue: Work authorization

**The employer explicitly states:** applicants must already be authorized to work **for any employer** in the United States, and **immigration sponsorship will not be provided**. This must be checked against the applicant's actual work authorization and its validity for an **August 2027 tenure-track appointment**. Do not infer that prior OPT/STEM OPT status satisfies the broad wording; restrictions, E-Verify requirements, employer training obligations, and expiration date can matter. Clarify with the university HR/search committee and a qualified immigration advisor if uncertain. Do **not** state or imply unrestricted work authorization in application materials without verification.

## Private reference preparation

Previously reviewed three-reference list:
- Professor Ali Imran — PhD supervisor
- Professor Nadeem Javaid — Master's supervisor
- Dr. Muhammad Sajid Riaz — senior research colleague

Verify each referee is still willing to respond and use the **previously confirmed private email records**, not invented or scraped addresses. Employer will request letters through the portal.

## Pre-submission review

- [ ] Verify work authorization **for any employer** and expected validity in August 2027; no sponsorship available.
- [ ] Read the 4-page common CV for teaching, technical tools, and completeness.
- [ ] Review cover letter, teaching statement and research statement for accuracy and natural voice.
- [ ] Confirm two-page ceilings and readable page breaks in PDF.
- [ ] Upload genuine academic transcripts privately.
- [ ] Provide three verified references with private email addresses.
- [ ] Complete and confirm application by December 11, preferably well before full consideration; update tracker only after submission.

## Rebuild locally after merge

From portfolio repository root, PowerShell:

```powershell
git switch develop
git pull --ff-only origin develop

# Existing reusable 2027 ECE academic CV: no job-specific rewrite
python resume/build.py --variant faculty_ece_shared_2027 --refresh-tex

# Generate editable Word and public PDFs
python resume/build_application_documents.py
python resume/job-applications/faculty/scranton-ece-assistant-professor-2027/build_documents.py

# Repository-wide layout audit
python resume/validate_pdf_layout.py
```

**Status:** Prepared for personal review, not submitted.
