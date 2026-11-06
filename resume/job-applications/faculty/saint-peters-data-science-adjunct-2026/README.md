# Saint Peter's University — Adjunct of Data Science (Graduate Data Science)

**Department/program:** Data Science Institute, Frank J. Guarini School of Business  
**Location:** Jersey City, New Jersey | **Type:** part-time adjunct graduate teaching  
**Position source:** https://www.paycomonline.net/v4/ats/web.php/portal/055E28882001FE667534B0880CFCD275/jobs/12720  
**Employer graduate curriculum:** https://www.saintpeters.edu/academics/graduate-programs/master-of-science-in-data-science/curriculum/  
**Schedule preference:** on-campus/hybrid evening classes on weekdays **starting at or after 5:00 p.m.** The university says the M.S. Data Science in-person classes meet Monday–Thursday evenings and has fully online options.

## Reuse the shared CS Faculty CV unchanged

The application uses the established `resume/resume-profiles/faculty/Waseem_Raza_FACULTY_CS_AI_ML.pdf`. The build copies it byte-for-byte into `submission-ready/` and verifies its hash. There is no need to maintain a separate tailored CV or modify the reusable CS profile.

## Submission-ready documents

| File | Intended use |
| --- | --- |
| `submission-ready/WRaza_SP_DS_ADJ26_CV.pdf` | Unchanged shared four-page CS AI/ML academic CV |
| `submission-ready/WRaza_SP_DS_ADJ26_Cover_Letter.pdf` | Institution-specific cover letter naming relevant graduate courses and evening schedule |
| `submission-ready/WRaza_SP_DS_ADJ26_Cover_Letter.docx` | Editable cover letter in case the portal requires different wording |

**Important:** The employer's Paycom application form is JavaScript-only for external reading. The job text does not list a required document checklist. Confirm each actual upload field when applying. A separate teaching or research statement is not explicitly required in the listing, so none is included initially.

The letter and its course matches are supported by the user's verified PhD ECE, AI/ML research, previous university teaching, AT&T/Impac engineering, and user-confirmed IBM Watson and Excel experience. It avoids claiming prior instructor-of-record delivery of the listed DS courses or unsupported SAS/Tableau expertise. See `Course_Matches_and_Portal_Answers.md` and `Private_Submission_Checklist.md`.

## Compensation clarification

The job's detailed description says **$750–$1,000 per academic credit hour**, not an annual salary or hourly wage. A three-credit class therefore implies **$2,250–$3,000 total** per teaching assignment at that rate. The generic salary metadata incorrectly/ambiguously labels the range as *Commission*. Ask Saint Peter's HR about pay per section, teaching format, class cancellation policies, and pay schedule; don't assume the exact contract terms without confirmation.

## Build from Windows PowerShell in the portfolio repository root

```powershell
git status --short
git switch develop
git pull --ff-only origin develop
python -m pip install -r resume/requirements.txt

# Use the prebuilt common CS CV. Build it only if the file is missing:
# python resume/build.py --variant faculty_cs_ai_ml

python resume/job-applications/faculty/saint-peters-data-science-adjunct-2026/build_documents.py

explorer "resume\job-applications\faculty\saint-peters-data-science-adjunct-2026\submission-ready"
```

The packaging script writes one PDF CV, one PDF letter and one editable Word letter. It checks that the CV matches the shared faculty PDF and that the letter is exactly one page.

## Application steps

1. Review the generated letter and shared academic CV.
2. Apply to the employer's actual Paycom job listing; upload documents required by its current form.
3. If the portal requests transcripts, referee information, work history or personal documentation, submit these **privately**; never add them to a public GitHub repository.
4. Confirm whether an evening section is available and that current work authorization permits a separate part-time employer.
5. If an offer is discussed, confirm **$750–$1,000 per academic credit**, section credits, total stipend and payment timing in writing.
6. Only mark the application **Submitted** after submission confirmation.

**Status:** Documents prepared for review, not submitted.
