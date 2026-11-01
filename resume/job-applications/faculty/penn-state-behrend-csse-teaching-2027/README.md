# Lecturer / Assistant Teaching Professor, Computer Science and Software Engineering

**Employer:** Penn State Behrend  
**Posting:** REQ_0000072445  
**Official application:** https://psu.wd1.myworkdayjobs.com/en-US/PSU_Academic/job/Lecturer-or-Assistant-Teaching-Professor-in-Computer-Science-and-Software-Engineering_REQ_0000072445-1

## The reusable-document approach

All four applications use **one identical, neutral-header ECE academic CV** generated once from `../ece-shared-2027/variant.json` and copied to this folder under `WRaza_PSU_CS_TL27_CV.pdf`. The letter is specific to this search; teaching and research statements are selected from the common ECE/CS library and tailored by discipline or research priorities.

The application folder's `submission-ready/` directory contains:

- `WRaza_PSU_CS_TL27_CV.pdf` — identical CV across all four positions
- `WRaza_PSU_CS_TL27_CL.pdf` — this position's letter
- `WRaza_PSU_CS_TL27_Teaching.pdf` — Teaching_CS.md
- `WRaza_PSU_CS_TL27_Research.pdf` — Research_CS.md
- Corresponding editable Word files for cover letter and statements

**References are not included in the public repository.** Three people are confirmed from prior applications: Prof. Ali Imran, Prof. Nadeem Javaid and Dr. Muhammad Sajid Riaz. Use a private contact sheet and verify their consent.

**Penn State asks for the names of three referees; their private emails should be entered directly into the application, not committed to GitHub.**

## Position-specific research and teaching fit

Non-tenure-line. Employer text currently says Fall 2026 (already past as of Nov 1, 2026). Verify the requisition is active and has a current/future appointment before submission. CV is intentionally the same ECE CV, emphasizing real CS teaching, computing and industry ML.

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
