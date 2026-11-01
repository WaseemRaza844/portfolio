# Reusable ECE Faculty Application Library — 2027

This folder provides a **single academic CV** and a small set of well-defined, editable statements for four faculty searches:

1. Penn State Behrend — Lecturer/Assistant Teaching Professor in ECE (`REQ_0000072462`).
2. Penn State Behrend — Lecturer/Assistant Teaching Professor in CS & Software Engineering (`REQ_0000072445`).
3. Penn State Behrend — tenure-track Assistant Professor in EE or CE (`REQ_0000072782`).
4. Princeton University — tenure-track Assistant Professor in ECE (`Interfolio 190824`).

**The Princeton Lecturer posting previously applied to is a different search. Do not submit that Lecturer application again.**

## One CV, four cover letters

The neutral headline is *Electrical and Computer Engineering | Research, Teaching & Applied AI*. The document includes actual university instruction, academic appointments, industrial R&D, applied programming and engineering tools, selected publications and research platforms. It is not labeled Lecturer or Assistant Professor, so exactly the same CV PDF can accompany all four applications.

- `variant.json` — canonical editable shared CV overlay, based on `academic_cv`.
- `Teaching_ECE.md` — reusable ECE teaching statement, including teaching practices that support diverse preparation.
- `Teaching_CS.md` — computing-focused teaching statement and support of diverse learners.
- `Research_ECE.md` — research program in reliable wireless AI, intelligent sensing and network resilience, including students and funding plans.
- `Research_CS.md` — software and data-science-centered research plan.
- `Research_Princeton.md` — research interests for Princeton, explicitly honest about limited device-fabrication background.
- `build_packages.py` — generates the same CV in each folder and renders/stores three supporting PDFs and their Word copies.

**Edit the shared source to change all four applications consistently.** Edit an individual application's `Cover_Letter.md` to tailor tone, match and institution. Keep appointment dates, titles and requirements in the four READMEs for review.

## Required documents and important differences

| Position | Documents | Special consideration |
| --- | --- | --- |
| Penn State Behrend ECE Teaching | Cover letter, CV, teaching + support-of-diversity statement, research statement, three references | Non-tenure-line; teaching-list includes circuits, power, PLC, DSP and labs; emphasize verified teaching and lab strengths |
| Penn State Behrend CS/SE Teaching | Cover letter, CV, teaching + support-of-diversity statement, research statement, three references | Employer posting still says **Fall 2026**, which has passed; confirm the vacancy is still active |
| Penn State Behrend ECE Assistant Professor | Cover letter, CV, teaching statement, research statement, three references | Tenure track; research funding and undergraduate work; review now until filled; external Nov 6 date not verified as employer deadline |
| Princeton ECE Assistant Professor | Cover letter, CV, teaching interests, research interests, **four letters of recommendation** | **Device/device-integration preference**; full consideration **Dec 1, 2026**. A fourth referee has not been confirmed |

Links: [PSU ECE Teaching](https://psu.wd1.myworkdayjobs.com/en-US/PSU_Academic/job/Lecturer-or-Assistant-Teaching-Professor-in-Electrical-and-Computer-Engineering_REQ_0000072462-2), [PSU CS Teaching](https://psu.wd1.myworkdayjobs.com/en-US/PSU_Academic/job/Lecturer-or-Assistant-Teaching-Professor-in-Computer-Science-and-Software-Engineering_REQ_0000072445-1), [PSU ECE Tenure Track](https://psu.wd1.myworkdayjobs.com/en-US/PSU_Academic/job/Assistant-Professor-in-Electrical-or-Computer-Engineering_REQ_0000072782-1), [Princeton](https://apply.interfolio.com/190824).

**Reference privacy:** A prior private three-reference list included Prof. Ali Imran, Prof. Nadeem Javaid and Dr. Muhammad Sajid Riaz. Do not commit reference emails or private recommendation letters to this public repository. For Princeton arrange a fourth qualified referee and invite all letter writers through Interfolio. Do not imply letters are already received.

## Academic integrity and claims

- PhD in ECE, University of Oklahoma, 2025. Research focus AI/ML for wireless networks.
- Lecturer in University of Lahore Department of Technology: actually taught Computer Programming, Communication Systems and Wireless Communication.
- UET Taxila instructional lab support and COMSATS research mentoring are not listed as independently taught courses.
- Research on network self-healing, reliable propagation and time-series wearable sensing is supported by prior projects and publications.
- **Do not claim** prior semiconductor/device fabrication, power-system laboratories, VLSI/PLC instruction, or all undergraduate CS core courses.
- Industry work at AT&T/Futurewei is cited only in general terms; no employer-confidential data or grant support is asserted.

## Build and local review (PowerShell, repo root)

```powershell
git switch develop
git pull --ff-only origin develop

# Refresh the one canonical CV profile
python resume/build.py --variant faculty_ece_shared_2027 --refresh-tex

# Build four sets of editable documents from their manifests
python resume/build_application_documents.py

# Render all application PDFs and copy the same CV into every application folder
python resume/job-applications/faculty/ece-shared-2027/build_packages.py

# Optional overall resume layout validation
python resume/validate_pdf_layout.py
```

Review each application's `submission-ready` directory and its README. The generated PDFs and Word files are public review drafts; do not submit until you check contact email, document content, actual position status and required private reference materials.
