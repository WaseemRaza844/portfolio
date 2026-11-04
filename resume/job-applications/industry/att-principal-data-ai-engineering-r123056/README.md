# AT&T — Principal Data/AI Engineering (R-123056-1)

**Application:** [Official AT&T posting (Middletown, NJ)](https://www.att.jobs/job/middletown/principal-data-ai-engineering/117/102607182112)  
**Posting date:** 29 October 2026  
**Locations:** Middletown, NJ (200 S Laurel Ave Bldg A); Plano, TX (2900 W Plano Pkwy)  
**Job type:** full-time, onsite **five days a week**; **no relocation offered**.  
**Published base salary:** $174,100–$261,100 per year (actual offer based on geography, skills and other factors).

## Eligibility: confirm before applying

> AT&T explicitly states that it will not hire applicants who require employer sponsorship **now or in the future**.

Employment authorization has not been independently verified for this job. Do not assume this role's requirement is satisfied. Independently confirm current/future unrestricted employment eligibility with HR or an immigration advisor before applying. **Do not add a work-authorization statement to the public resume unless verified.**

## Submission file

- Editable LaTeX: `Waseem_Raza_ATT_PRINCIPAL_DATA_AI_ENGINEERING.tex`
- Build target: `Waseem_Raza_ATT_PRINCIPAL_DATA_AI_ENGINEERING.pdf`
- Validation: `build-report.json` (must show exactly 3 pages)
- Role-specific configuration: `metadata.json`

This is a **standalone industry job application**, using the exact LaTeX design and almost all substantive content from `resume/resume-profiles/industry/Waseem_Raza_COMPREHENSIVE.tex`. The reusable Generic, GenAI, and Comprehensive sources are not modified.

## Minimal tailoring decisions

1. **Base:** existing `Waseem_Raza_COMPREHENSIVE.tex` (3 pages, consistent profile look).
2. **Preserved:** formatting, section structure, complete work history and numerical evidence, most technical skills, leadership bullets, existing projects, publications, and certification descriptions.
3. **Changed:** title/subtitle and professional profile to prioritize enterprise AI/data platforms; put the existing Data Engineering and MLOps skill categories first; modestly clarify Azure Functions/Synapse, monitoring-oriented model evaluation and troubleshooting.
4. **Reordered:** the existing AI-Ready Lakehouse project is placed before Agentic AI and RAG. Other projects, work history, metrics and certificates stay in their Comprehensive-profile wording.
5. **No embellishment:** seven-plus years refers to combined research/engineering experience, not seven years of on-call platform ownership. No fabricated streaming data platform, production Kubernetes responsibility, SLO/SLI ownership, or employer-sponsorship eligibility claim.
6. **Evidence already present:** current AT&T 20% to 80% E911 classification accuracy; Impac Azure ingestion, 40% data-preparation reduction and 20% analytical-output reliability; AT&T Labs 500K+ logs and 20% diagnostic-time reduction.

**Applicant-confirmed additions (4 November 2026):** hands-on setup/deployment/execution of Azure-based production pipelines; practical GitHub Actions use; some Grafana-based monitoring experience; conceptual familiarity with Prometheus. No claim of ownership of enterprise observability stacks, SRE/on-call duties, Prometheus administration, or streaming infrastructure. Clarify the exact Azure pipeline service in an interview or later revision.

## Local build (PowerShell, portfolio repository root)

```powershell
git status --short
git switch develop
git pull --ff-only origin develop

python -m pip install -r resume/requirements.txt
python -m unittest discover -s resume/tests

python resume/build_tailored.py --job att-principal-data-ai-engineering-r123056

python resume/validate_pdf_layout.py
explorer "resume\job-applications\industry\att-principal-data-ai-engineering-r123056"
```

Build prerequisites: Python, `pypdf` and MiKTeX/TeX Live with `pdflatex`. If a fresh build fails, inspect the LaTeX log, page count and density; do not silently ship 2 or 4 pages. The existing GitHub resume workflow runs `python resume/build_tailored.py --all` and publishes generated PDFs to `develop`.

## Final quality gate

- [ ] Verify **exactly three filled pages** (no clipped lines, layout issues or sparse page 3).
- [ ] Validate current employment dates, metrics, named tools and AT&T contracting attribution.
- [ ] Confirm suitability for Middletown NJ or Plano TX five-day onsite arrangement.
- [ ] Verify the non-sponsorship eligibility condition.
- [ ] Submit via the official AT&T portal; update tracker status only after confirmation.

**Status: Resume prepared; application not submitted.**
