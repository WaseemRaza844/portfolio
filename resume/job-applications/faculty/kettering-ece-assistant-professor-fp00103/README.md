# Kettering University — Assistant Professor, Electrical and Computer Engineering

**Faculty posting:** FP00103 | **Position number:** F00009 | **Location:** Flint, Michigan | **Mode:** Full-time, regular faculty  
**Official advertisement:** https://jobs.kettering.edu/postings/10425  
**HigherEdJobs:** https://www.higheredjobs.com/faculty/details.cfm?JobCode=179605437  
**Posted:** November 2, 2026 | **Closing date:** **Open until filled**; no specific deadline stated by the employer.  
**Official 2026–2027 EE catalog:** https://catalog.kettering.edu/coursesaz/undergrad/ee/

## Required applicant documents — verified on the employer page

| Employer field | Public source/finished upload |
| --- | --- |
| Cover Letter | `submission-ready/WRaza_KETTERING_FP00103_Cover_Letter.pdf` |
| Teaching Philosophy | `submission-ready/WRaza_KETTERING_FP00103_Teaching_Philosophy.pdf` |
| Curriculum Vitae | `submission-ready/WRaza_KETTERING_FP00103_CV.pdf` |
| List of References | **Private** PDF with contact details from confirmed referees; never commit those personal details to public GitHub |
| Research Philosophy | `submission-ready/WRaza_KETTERING_FP00103_Research_Philosophy.pdf` |

The three tailored documents also have editable `.docx` versions in `submission-ready/`, built from `Cover_Letter.md`, `Teaching_Philosophy.md`, and `Research_Philosophy.md`. A local-only **complete reference PDF and DOCX** can be shared directly with the applicant rather than included in the public GitHub history.

**Do not create institution-specific CV variants unless there is a material reason.** The public builder copies `resume/resume-profiles/faculty/Waseem_Raza_FACULTY_ECE_AI_WIRELESS.pdf` byte-for-byte and verifies the four-page length and hash.

## Application strategy

Kettering is explicitly a **teacher-scholar** position with the following expected work split:

- **55% teaching**: undergraduate/graduate courses, laboratory instruction and development, curriculum, student project supervision;
- **25% research and scholarship**: a sustainable applied program, student participation, peer-reviewed outputs;
- **20% service and citizenship**: departmental, university, professional, and community activities.

Kettering's experiential learning and co-op program is central to its mission. The application emphasizes previous teaching of **Computer Programming, Communication Systems, Wireless Communication** at the University of Lahore; lab support at UET Taxila; Bachelor/Master student projects at COMSATS; PhD ECE and publications; and AT&T/Futurewei applied telecommunications engineering.

**Strongest possible Kettering course contributions, subject to department assignment:** EE-430 Communication Systems, EE-340 Electromagnetic Wave Propagation, EE-336/338 Signals and Systems, selected components of EE-434 Digital Signal Processing, computational engineering and student projects. Direct hands-on instructor-of-record roles in circuits, electrical machines, energy storage, electrification, robotics, or control labs have **not** been independently established. The documents do not claim such roles.

**Research philosophy:** reliable/data-efficient learning for intelligent sensing and communications; adaptive networks and resilience; reproducible, collaborative applied platforms that integrate students and possible co-op/industry partners. No claim of awarded external PI grants or battery/motor-specific funded projects.

## Full-time role and work eligibility

The posting requires proof of legal authority to work. No verified commitment to immigration sponsorship has been found; clarify it with HR if relevant. A full-time on-campus appointment in Flint may require relocation; **do not reuse the evening-only availability** wording from adjunct applications.

## Build in VS Code PowerShell (portfolio root)

```powershell
git status --short
git switch develop
git pull --ff-only origin develop

python -m pip install -r resume/requirements.txt

# The shared ECE faculty PDF is already committed. If absent:
# python resume/build.py --variant faculty_ece_ai_wireless

python resume/job-applications/faculty/kettering-ece-assistant-professor-fp00103/build_documents.py

explorer "resume\job-applications\faculty\kettering-ece-assistant-professor-fp00103\submission-ready"
```

The dedicated GitHub Actions workflow builds and validates **four public PDF documents** (shared ECE CV + letter + teaching/research philosophies) and three editable Word documents independently of other job applications. It does not publish referee contact details.

## Application tracking and last check

Tracker record: `higheredjobs-179605437-unknown` was **reused** and updated to Kettering, avoiding a duplicate. Source file: `dist/applications/jobs.json`. The previously inferred **2028-04-25** `validThrough` date was removed because the official page says **Open Until Filled** and no closing date.

**Tracker:** https://waseemraza844.github.io/portfolio/develop/applications/  
**Current status:** Preparing; not submitted. After GitHub validates all public files, update to Ready. Only mark Submitted after applicant confirms university portal submission.

## Submission review

- [ ] Check all content for accuracy against CV, teaching and research history.
- [ ] Review generated PDF page flow; ensure the application is for Kettering **FP00103 / F00009**.
- [ ] Confirm private referee contacts and permission before uploading the list.
- [ ] Upload the **five** employer-requested documents.
- [ ] Confirm work authorization and any sponsorship questions on employer form, as applicable.
- [ ] Save the application confirmation and change tracker status to Submitted.
