# Rowan University — Adjunct Faculty, Electrical and Computer Engineering

**Official posting:** https://jobs.rowan.edu/cw/en-us/job/501674/adjunct-faculty-department-of-electrical-and-computer-engineering  
**Job no:** 501674 | **Campus:** Glassboro, New Jersey | **Deadline:** July 1, 2027.  
**Status:** Prepared sources; no application submission claimed.

## How this folder follows existing faculty workflow

Uses the shared `faculty_ece_ai_wireless` LaTeX CV as its baseline, with a Rowan-specific `variant.json` overlay, and the repository's standard Markdown -> Word and Markdown -> PDF renderers. Existing Caldwell, Farmingdale, UCNJ and Stevens packages were consulted for structure. No unrelated resumes or prior application folders are overwritten.

- `variant.json` — tailored faculty CV while preserving comprehensive teaching, research, industry and publications.
- `Cover_Letter.md` — full academic/industry-focused cover letter.
- `Teaching_Interests_and_Philosophy.md` — explicit course list, qualifications, hands-on pedagogy and flexibility.
- `References_PRIVATE_TEMPLATE.md` — reference contact collection guidance without publicly exposing private details.
- `Course_Alignment_and_Submission_Checklist.md` — required uploads, course fit, status and checkpoints.
- `application-documents.json`, `build_documents.py` — reusable Word/PDF production.
- `submission-ready/` — generated output (after successful local build).

## Build once / future double-click workflow

From repo root on Windows, double-click `Update-and-Build-Applications.cmd`, choose the Rowan default, and the launcher will pull updates from `develop` and build these documents. The launcher refuses to discard unsaved local edits.

If running manually:

```powershell
git switch develop
git pull --ff-only origin develop
python -m pip install -r resume/requirements.txt
python resume/build.py --variant faculty_rowan_university_ece_adjunct_501674 --refresh-tex
python resume/job-applications/faculty/rowan-university-ece-adjunct-501674/build_documents.py
```

On subsequent normal builds, omit `--refresh-tex` to preserve changes made directly to the generated LaTeX source. The launcher auto-bootstraps TeX from the variant only if it is absent.

## Private required materials

Rowan requests two professional references with contact information and unofficial transcripts. Provide through the university portal; keep personal phone/email details and transcripts out of this public repository. Optional materials should be submitted only if genuine and relevant.

**Do not mark submitted until confirmed in Rowan's portal.**
