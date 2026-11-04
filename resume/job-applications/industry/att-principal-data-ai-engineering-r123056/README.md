# AT&T — Principal Data/AI Engineering (R-123056-1)

**Application:** [Official AT&T posting (Middletown, NJ)](https://www.att.jobs/job/middletown/principal-data-ai-engineering/117/102607182112)  
**Posting date:** 29 October 2026  
**Locations:** Middletown, NJ (200 S Laurel Ave Bldg A); Plano, TX (2900 W Plano Pkwy)  
**Job type:** full-time, onsite **five days a week**; **no relocation offered**.  
**Published base salary:** $174,100–$261,100 per year (actual offer based on geography, skills and other factors).

## Eligibility: confirm before applying

> AT&T explicitly states that it will not hire applicants who require employer sponsorship **now or in the future**.

The applicant has previously discussed OPT/STEM OPT and an ongoing permanent-residence process. Do not assume this role's requirement is satisfied. Independently confirm current/future unrestricted employment eligibility with HR or an immigration advisor before applying. **Do not add a work-authorization statement to the public resume unless verified.**

## Submission file

- Editable LaTeX: `Waseem_Raza_ATT_PRINCIPAL_DATA_AI_ENGINEERING.tex`
- Build target: `Waseem_Raza_ATT_PRINCIPAL_DATA_AI_ENGINEERING.pdf`
- Validation: `build-report.json` (must show exactly 3 pages)
- Role-specific configuration: `metadata.json`

This is a **standalone industry job application**, following the convention used for the Infosys and CyberCoders industry resumes. It does not modify reusable generic, AI/ML or GenAI profiles.

## Positioning

Lead with job-aligned evidence rather than a research-first CV:

1. **AT&T E911 diagnostics (2025–present):** applied AI, model-validation and operational integration; root-cause classification improvement from 20% to 80% (as documented in existing resume source).
2. **Impac Azure pipelines (2024):** Databricks, Azure Functions, Synapse, ETL/ELT, validation; 40% less data preparation and 20% better analytical-output reliability.
3. **AT&T Labs (2024):** 500K+ diagnostic logs and 20% shorter analysis time.
4. **University of Oklahoma (2019–2025):** reusable Python data/experiment pipelines, rigorous tests and robustness evaluation.
5. **Selected platform-oriented projects:** AI-ready lakehouse, document ingestion and RAG/agent prototypes — explicitly labelled as portfolio/guided when appropriate.

### Claim boundaries

- 7+ years means **combined** engineering, academic research and analytics experience; avoid claiming 7 years of dedicated cloud-platform operations.
- Neither direct ownership of enterprise-scale streaming infrastructure nor 24/7 SRE/production pager rotation is documented.
- AWS Bedrock, LangGraph and other agent tooling are training/portfolio evidence where appropriate; do not relabel them as enterprise deployment experience.
- The current AT&T job is an **AT&T contract assignment** (via Innovatix per existing resume source), not direct AT&T headcount.
- Role mentions on-call/production support and monitoring; resume emphasizes documented model performance and data-quality troubleshooting rather than inventing incidents, SLOs or SLAs.

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
