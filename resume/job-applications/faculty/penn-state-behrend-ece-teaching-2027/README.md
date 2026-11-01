# Lecturer / Assistant Teaching Professor, Electrical and Computer Engineering

**Employer:** Penn State Behrend  
**Posting:** REQ_0000072462  
**Official application:** https://psu.wd1.myworkdayjobs.com/en-US/PSU_Academic/job/Lecturer-or-Assistant-Teaching-Professor-in-Electrical-and-Computer-Engineering_REQ_0000072462-2

## The reusable-document approach

All four applications use **one identical, neutral-header ECE academic CV** generated once from `../ece-shared-2027/variant.json` and copied to this folder under `WRaza_PSU_ECE_TL27_CV.pdf`. The letter is specific to this search; teaching and research statements are selected from the common ECE/CS library and tailored by discipline or research priorities.

The application folder's `submission-ready/` directory contains:

- `WRaza_PSU_ECE_TL27_CV.pdf` — identical CV across all four positions
- `WRaza_PSU_ECE_TL27_CL.pdf` — this position's letter
- `WRaza_PSU_ECE_TL27_Teaching.pdf` — Teaching_ECE.md
- `WRaza_PSU_ECE_TL27_Research.pdf` — Research_ECE.md
- Corresponding editable Word files for cover letter and statements

**References are not included in the public repository.** Three people are confirmed from prior applications: Prof. Ali Imran, Prof. Nadeem Javaid and Dr. Muhammad Sajid Riaz. Use a private contact sheet and verify their consent.

**Penn State asks for the names of three referees; their private emails should be entered directly into the application, not committed to GitHub.**

## Position-specific research and teaching fit

Non-tenure-line, Fall 2027. The posted instructional list emphasizes circuits, electromagnetics, power, PLCs, DSP, embedded systems and labs; the application presents strongest preparation in communications, signal analysis, programming and teaching laboratories.

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
