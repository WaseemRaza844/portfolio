# Tenure-Track Assistant Professor, Electrical or Computer Engineering

**Employer:** Penn State Behrend  
**Posting:** REQ_0000072782  
**Official application:** https://psu.wd1.myworkdayjobs.com/en-US/PSU_Academic/job/Assistant-Professor-in-Electrical-or-Computer-Engineering_REQ_0000072782-1

## The reusable-document approach

All four applications use **one identical, neutral-header ECE academic CV** generated once from `../ece-shared-2027/variant.json` and copied to this folder under `WRaza_PSU_ECE_TT27_CV.pdf`. The letter is specific to this search; teaching and research statements are selected from the common ECE/CS library and tailored by discipline or research priorities.

The application folder's `submission-ready/` directory contains:

- `WRaza_PSU_ECE_TT27_CV.pdf` — identical CV across all four positions
- `WRaza_PSU_ECE_TT27_CL.pdf` — this position's letter
- `WRaza_PSU_ECE_TT27_Teaching.pdf` — Teaching_ECE.md
- `WRaza_PSU_ECE_TT27_Research.pdf` — Research_ECE.md
- Corresponding editable Word files for cover letter and statements

**References are not included in the public repository.** Three people are confirmed from prior applications: Prof. Ali Imran, Prof. Nadeem Javaid and Dr. Muhammad Sajid Riaz. Use a private contact sheet and verify their consent.

**Penn State asks for the names of three referees; their private emails should be entered directly into the application, not committed to GitHub.**

## Position-specific research and teaching fit

Tenure-track, Fall 2027. Employer review begins immediately and continues until filled; third-party Nov 6 closing date is not established as employer's binding deadline. Prioritize prompt submission; research statement includes undergraduate program and funding development.

## Application documents listed by employer

Cover letter; complete CV; teaching statement (including support of diversity for the two teaching-professor positions); research statement; names of three references. Review begins immediately and remains open until filled in the official description.

## Build locally after merging

```powershell
git switch develop
git pull --ff-only origin develop
python resume/build.py --variant faculty_ece_shared_2027 --refresh-tex
python resume/build_application_documents.py
python resume/job-applications/faculty/ece-shared-2027/build_packages.py
```

**Review status:** prepared for applicant review; not submitted.
