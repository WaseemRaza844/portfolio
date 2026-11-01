# Tenure-Track Assistant Professor, Electrical and Computer Engineering

**Employer:** Princeton University  
**Posting:** Interfolio 190824  
**Official application:** https://apply.interfolio.com/190824

## The reusable-document approach

All four applications use **one identical, neutral-header ECE academic CV** generated once from `../ece-shared-2027/variant.json` and copied to this folder under `WRaza_PRI_ECE_TT27_CV.pdf`. The letter is specific to this search; teaching and research statements are selected from the common ECE/CS library and tailored by discipline or research priorities.

The application folder's `submission-ready/` directory contains:

- `WRaza_PRI_ECE_TT27_CV.pdf` — identical CV across all four positions
- `WRaza_PRI_ECE_TT27_CL.pdf` — this position's letter
- `WRaza_PRI_ECE_TT27_Teaching.pdf` — Teaching_ECE.md
- `WRaza_PRI_ECE_TT27_Research.pdf` — Research_Princeton.md
- Corresponding editable Word files for cover letter and statements

**References are not included in the public repository.** Three people are confirmed from prior applications: Prof. Ali Imran, Prof. Nadeem Javaid and Dr. Muhammad Sajid Riaz. Use a private contact sheet and verify their consent.

**Critical: Princeton requires FOUR confidential recommendation letters. A fourth referee has not been verified. Arrange and confirm that fourth referee, and use the Interfolio letter-request workflow before treating this application as complete.**

## Position-specific research and teaching fit

Princeton invites all ECE areas with special focus on devices/device integration. Your established expertise is AI/ML wireless, sensing and systems; the Princeton research statement positions device integration as prospective collaboration, not claimed fabrication experience. Requires FOUR recommendation letters (not merely three contacts). Full-consideration date Dec 1, 2026.

## Application documents listed by employer

Cover letter; complete CV; description of teaching interests; description of research interests; four recommendation letters. Full consideration **December 1, 2026**.

## Build locally after merging

```powershell
git switch develop
git pull --ff-only origin develop
python resume/build.py --variant faculty_ece_shared_2027 --refresh-tex
python resume/build_application_documents.py
python resume/job-applications/faculty/ece-shared-2027/build_packages.py
```

**Review status:** prepared for applicant review; not submitted.
