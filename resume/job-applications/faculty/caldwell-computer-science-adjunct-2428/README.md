# Caldwell University — Computer Science and Information Systems Adjunct Faculty Pool

**Position:** Computer Science Adjuncts (Req. #2428)  
**Location:** Caldwell, New Jersey | **Mode:** part-time, on-campus | **Schedule:** evening classes starting at or after **5:00 p.m. Eastern**  
**Status:** Rolling adjunct pool, open until filled; placement does not guarantee a teaching assignment.  
**Official university vacancy:** https://www.caldwell.edu/hr/employment-opportunities/faculty-adjunct/  
**Apply:** https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?ccId=19000101_000001&cid=7137837f-5f45-46c7-bb9e-ceb9eafaea50&jobId=571717&lang=en_US&source=CC2  
**Catalog used:** https://catalog.caldwell.edu/C/2026-2027

## What to upload

| Required by posting | Local file or private action |
| --- | --- |
| CV | `submission-ready/WRaza_CALDWELL_CS_ADJ2428_CV.pdf` — **byte-for-byte copy** of the reusable four-page CS AI/ML CV |
| Cover letter identifying courses and schedule | `submission-ready/WRaza_CALDWELL_CS_ADJ2428_Cover_Letter.pdf` |
| Unofficial transcripts | **Private** university records; upload through ADP, never into this public repository |
| Professional references contact information | **Private** confirmed referee contact details; see `Private_Submission_Checklist.md` |

For revisions, the editable letter source is `Cover_Letter.md`, and the generated editable Word file is `submission-ready/WRaza_CALDWELL_CS_ADJ2428_Cover_Letter.docx`.

**Not requested:** separate teaching statement, research statement, diversity statement or cover-letter versions for daytime. Do not add unnecessary uploads.

## Why reuse the shared CS faculty CV unchanged

The reusable profile already demonstrates:
- PhD in Electrical and Computer Engineering, University of Oklahoma (2025).
- Previous undergraduate instruction in **Computer Programming**, Communication Systems, and Wireless Communication.
- Programming and engineering experience in Python and C/C++.
- ML, data science, LLM and AI-systems expertise through research and applied industry work.
- Networks, simulation, software development, research mentorship and practical computing experience.

Reusing the same file avoids inconsistent resumes between CS applications. The tailored **cover letter**, not a new CV variant, establishes specific Caldwell courses and evening schedule. A separate course/portal-answer reference sheet is maintained in `Course_Matches_and_Portal_Answers.md`.

## Courses prioritised

**Strongest:** CS 195 Computer Programming I; CS 196 Computer Programming II; CS 340 Introduction to Data Science; CS 420 Artificial Intelligence; CS 415 Computational Models and Simulations; CS 320 Networking and Communications.

**Additional interest, subject to detailed syllabus review:** CS 216 Data Structures; CS 302 Design and Analysis of Algorithms; CS 322 Programming Languages and Paradigms; CS 315 System and Analysis and Design. Prior teaching in the second group is not claimed.

## Local build: VS Code PowerShell (repo root)

```powershell
git status --short
git switch develop
git pull --ff-only origin develop

python -m pip install -r resume/requirements.txt

# Copies the unchanged reusable CS CV, and builds Caldwell letter PDF + DOCX.
python resume/job-applications/faculty/caldwell-computer-science-adjunct-2428/build_documents.py

explorer "resume\job-applications\faculty\caldwell-computer-science-adjunct-2428\submission-ready"
```

If the shared CV is missing locally, build it first with `python resume/build.py --variant faculty_cs_ai_ml`, which requires a working TeX installation. The letter uses the existing repository PDF/Word builders.

## Portal checklist

- [ ] Verify current evening course need and schedule feasibility (on campus, **5:00 p.m. onward**).
- [ ] Review cover-letter PDF (one page), confirm correct contact details and course codes.
- [ ] Review shared CS faculty CV (four pages), with no employer-specific customizations.
- [ ] Upload valid unofficial academic transcripts privately.
- [ ] Supply confirmed professional references privately; number and fields as requested by ADP.
- [ ] Confirm any work-authorization or outside-employment constraints before committing to teaching.
- [ ] Submit through ADP, retain confirmation, and only then update tracker status to applied.

**Status:** Public documents prepared; not yet submitted.
