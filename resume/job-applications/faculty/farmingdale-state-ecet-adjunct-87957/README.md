# Farmingdale State College — Adjunct Assistant Professor, Electrical and Computer Engineering Technology

**Position ID:** 87957 | **Location:** Farmingdale, NY | **Type:** Part-time, adjunct faculty pool  
**Original posting date:** August 9, 2017 | **Status on supplied posting:** Open until filled  
**Apply:** https://farmingdale.interviewexchange.com/jobofferdetails.jsp?JOBID=87957  
**Employer careers:** https://www.farmingdale.edu/human-resources/employment-opportunities.shtml

## Required employer uploads

1. Cover letter: `submission-ready/WRaza_FAC_FSC_ADJ87957_CL.pdf`
2. Resume/CV: `submission-ready/WRaza_FAC_FSC_ADJ87957_CV.pdf`

An editable cover letter will be produced as `submission-ready/WRaza_FAC_FSC_ADJ87957_CL.docx`. No teaching statement, research statement, transcripts, or referee roster was specifically requested in the supplied posting. Provide those only if the live application portal asks.

## Position-fit focus

- PhD in Electrical and Computer Engineering, University of Oklahoma, 2025.
- University of Lahore: previously taught Computer Programming, Communication Systems, and Wireless Communication in the Department of Technology to undergraduate Electrical Engineering Technology students.
- UET Taxila: supported communication-systems laboratories and related instruction.
- COMSATS: undergraduate/graduate project and thesis mentoring.
- AT&T Labs, Futurewei and AT&T: applied telecom engineering, measurement, analysis and ML.
- Strongest potential teaching contributions: programming, computer applications, communications, data networking, wireless systems, signal-processing-related work and experiments.
- Supports inclusive, applied instruction, reproducible experiments, and student mentoring.

Avoid implying prior instructor-of-record experience in electrical machines, circuit design, microprocessors, digital electronics, or other specializations not documented in the original CV. The UCNJ Engineering Technology three-page adjunct CV variant provided the reusable structure; this application uses a distinct Farmingdale-specific overlay.

## Build from VS Code (PowerShell, portfolio repo root)

```powershell
git switch develop
git pull --ff-only origin develop
python -m pip install -r resume/requirements.txt
python resume/build.py --variant faculty_farmingdale_state_ecet_adjunct_87957 --refresh-tex
python resume/build_application_documents.py
python resume/job-applications/faculty/farmingdale-state-ecet-adjunct-87957/build_documents.py
python resume/validate_pdf_layout.py
```

The tailored variant is stored in `variant.json`. The canonical cover letter is `Cover_Letter.md`. The application-document manifest produces its Word version. The packaging builder compiles a one-page PDF letter and copies the dedicated CV into `submission-ready/`.

## Before submission

- [ ] Verify the old (2017) rolling-pool posting is still accepting applications on the employer portal and confirm which course sections are currently needed.
- [ ] Review and proofread the one-page cover letter and three-page teaching-oriented CV. The builder permits 2–4 pages for the CV to accommodate subsequent adjustments.
- [ ] Confirm availability for on-campus teaching in Farmingdale, NY.
- [ ] Confirm employment authorization without employer visa sponsorship (explicitly unavailable in the posting).
- [ ] Apply online and keep your application confirmation; update the tracker only after submission.

**Status:** Prepared for review; not submitted. The posting is a rolling candidate pool, not a verified current course assignment. Do not store private immigration materials or referee email addresses in this public repository.
