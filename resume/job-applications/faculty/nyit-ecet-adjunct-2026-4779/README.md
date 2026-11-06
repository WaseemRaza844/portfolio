# New York Institute of Technology — Adjunct Faculty, Electrical & Computer Engineering Technology

**Job ID:** 2026-4779 | **Location:** Old Westbury, New York | **Type:** Part-time, on-campus adjunct  
**Official NYIT job:** https://careers-nyit.icims.com/jobs/4320/adjunct-faculty--electrical-%26-computer-engineering-technology/job  
**First posted:** October 22, 2026 | **Posted hourly rate:** $101–$110 (dependent on adjunct rank).  
**2026–2027 program curriculum:** https://catalog.nyit.edu/engineering/electrical_and_computer_engineering_technology/curriculum/

**Important:** The previous tracker entry pointed incorrectly to **NYC Job 2025-4086**. This is a different and newer **Old Westbury Job 2026-4779**. The older job ID is not the intended application.

## Required/public application documents

The visible employer posting does **not** specify an exhaustive list of uploads; check live iCIMS form fields. The default minimal application package contains:

1. **Existing reusable ECE Faculty CV:** `submission-ready/WRaza_NYIT_ECET4779_CV.pdf` — byte-for-byte copy of `resume/resume-profiles/faculty/Waseem_Raza_FACULTY_ECE_AI_WIRELESS.pdf`.
2. **NYIT-specific cover letter:** `submission-ready/WRaza_NYIT_ECET4779_Cover_Letter.pdf` — one page, with a matching editable `Cover_Letter.docx`.

Other records (transcripts, private referee contact information) should be supplied only if explicitly requested in the application portal; never commit private information to public GitHub.

## Fit and boundaries

- PhD ECE, University of Oklahoma, 2025; MSc/BSc in Telecommunication Engineering.
- Previously taught undergraduate **Computer Programming, Communication Systems and Wireless Communication** at University of Lahore.
- Communications-laboratory instruction support at UET Taxila; project and student mentoring at COMSATS.
- Industry engineering with AT&T, AT&T Labs and Futurewei; RF/wireless measurements, analysis, Python/MATLAB computational exercises.
- Strongest curriculum matches: **ETEC 310 Communication Circuits**, **ETEC 422 Wireless Communication Technology**, **CTEC 204 Programming Techniques I**, **CTEC 249 Computational Analysis**, **CTEC 405 Applied Machine Learning and AI**.
- **ETEC 110 and ETEC 120 Electrical Technology I/II** are additional courses to explore after reviewing their syllabus, instrumentation and laboratory requirements. Do not claim prior instructor-of-record teaching in circuits/electronics/hardware that has not been substantiated.

The letter explicitly states the applicant's preferred on-campus **evening availability for classes starting at or after 5:00 p.m.** Availability of particular evening assignments is unknown and must be confirmed with NYIT.

## Building locally from Windows VS Code (repository root)

```powershell
git status --short
git switch develop
git pull --ff-only origin develop
python -m pip install -r resume/requirements.txt

# If the prebuilt shared ECE PDF is missing:
# python resume/build.py --variant faculty_ece_ai_wireless

# Create the cover-letter PDF/DOCX and copy the common ECE CV
python resume/job-applications/faculty/nyit-ecet-adjunct-2026-4779/build_documents.py

explorer "resume\job-applications\faculty\nyit-ecet-adjunct-2026-4779\submission-ready"
```

A dedicated GitHub workflow validates the **4-page shared ECE CV**, **1-page cover letter**, editable Word copy, and byte-identical reuse of the shared PDF before publication.

## Tracker and submission

The university was already in `dist/applications/jobs.json` under `nyit-ecet-adjunct-179595929`. Its status was `researching` with no `submittedAt`. It was **updated, not duplicated**, to reflect Old Westbury Job 2026-4779. Previous conversation and repo evidence do not confirm a submitted NYIT application.

**Tracker:** https://waseemraza844.github.io/portfolio/develop/applications/  
When using the public dashboard, use `Refresh tracker` to see the latest repository-backed state. If there are browser-only unsynced edits, **sync or export them before refreshing** to avoid discarding unsaved changes.

**As of November 6, 2026:** Applicant reported University of Missouri AI Job 61589 submitted; its tracker row was updated to `submitted`. The exact submission date/time was not provided, so `submittedAt` remains null.

After NYIT iCIMS submission, save confirmation and set NYIT to `submitted`. Do **not** mark it as submitted merely because documents are ready.

## Check before acceptance

- Verify evening teaching availability and travel feasibility from your daytime position to Old Westbury.
- Confirm adjunct duties and what NYIT means by $101–$110/hour; avoid treating the hourly figure as full-time compensation.
- Verify that holding a second part-time role complies with relevant employment authorization and outside-employment rules.

**Status: documents prepared, application not yet submitted.**
