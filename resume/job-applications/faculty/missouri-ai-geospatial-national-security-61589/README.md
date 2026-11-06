# University of Missouri — Assistant Professor in Artificial Intelligence (Job ID 61589)

**Department:** David L. Payne Department of Electrical Engineering and Computer Science, Columbia, Missouri  
**Focus:** AI with geospatial intelligence and national-security applications; remote sensing, image/video analysis, multisensor fusion, automated feature detection, and high-performance computing.  
**Status:** rolling review until filled; application prepared, **not submitted**.  
**Job search:** https://erecruit.umsystem.edu/ (search **61589**; the PeopleSoft direct posting page may require browser cookies).  
**Supporting role mirror:** https://www.milwaukeejobs.com/job/detail/88786682/Assistant-Professor-in-Artificial-Intelligence  
**Center for Geospatial Intelligence:** https://engineering.missouri.edu/research/centers/center-for-geospatial-intelligence-cgi/  
**Mizzou AERI:** https://aeri.missouri.edu/

## Exactly what the posting requests

1. **Cover letter summarizing professional accomplishments:** `submission-ready/WRaza_MU_AI61589_Cover_Letter.pdf`
2. **Curriculum vitae:** `submission-ready/WRaza_MU_AI61589_CV.pdf` — unchanged copy of the common four-page **CS AI/ML** faculty CV
3. **Narrative of research vision:** `submission-ready/WRaza_MU_AI61589_Research_Vision.pdf`
4. **Names and complete contact information of three references:** submit privately in the PeopleSoft form (see `References_PRIVATE_CHECKLIST.md`). The university states it will notify candidates before contacting references.

Word copies of the letter and research vision are generated in `submission-ready/`. **Teaching statement, research funding statements, teaching evaluations, transcripts, citizenship/clearance documents and additional materials are not enumerated as required initial uploads** in Job 61589. Do not confuse with the **separate** MizzouForward CGI Job **61368**, which asks for additional information.

### Why reuse the shared CS AI/ML CV

The existing common `resume/resume-profiles/faculty/Waseem_Raza_FACULTY_CS_AI_ML.pdf` already covers teaching, AI methods, peer-reviewed scholarship, research projects and mentoring. A specialized geospatial CV is not warranted when the applicant's core portfolio is in transferable AI methods, not past direct remote-sensing research. The research-vision narrative is the appropriate place for a carefully differentiated application.

**Accurate bridge from existing work:** PhD dissertation on data-efficient and resilient AI for wireless/networked systems; GANs and domain adaptation; intelligent sensing and time-series ML; network/geolocation data; industry AI and operational reliability. **Proposed (future):** image/scene understanding, optical/SAR fusion, public geospatial datasets, and geospatial decision support. Do not assert prior satellite-imagery, security clearance, military/defense grants, or federal PI funding.

## Research agenda

`Research_Vision.md` outlines:
- **Theme 1:** cross-region robust visual learning, low-label learning, object detection, calibration and error analysis
- **Theme 2:** optical/radar/geolocation/time-series fusion; missing-modality and alignment robustness
- **Theme 3:** efficient inference, confidence-based triage, human oversight and responsible use
- Milestones for years 1–5, partnership/funding strategy, student research and new MS/PhD AI programs

Suggested public benchmark references (use under their own licenses): https://www.spacenet.ai/datasets/ and https://www.diu.mil/ai-xview-challenge.

## Visa, research eligibility and relocation

The posting says employment visa sponsorship **may be available** for candidates in the United States with H-1B or another work-authorized status. This is not a guarantee of sponsorship or future eligibility; confirm with Missouri HR as the process proceeds. Separate national-security projects may have citizenship, clearance, export-control or data-access restrictions; do not infer that the faculty appointment itself requires a clearance. The role is full-time on campus in Columbia, Missouri; confirm relocation/availability before final submission.

## Build locally — PowerShell from portfolio repository root

```powershell
git status --short
git switch develop
git pull --ff-only origin develop

python -m pip install -r resume/requirements.txt
# Shared CS CV normally exists already; if missing:
# python resume/build.py --variant faculty_cs_ai_ml

python resume/job-applications/faculty/missouri-ai-geospatial-national-security-61589/build_documents.py

explorer "resume\job-applications\faculty\missouri-ai-geospatial-national-security-61589\submission-ready"
```

Build output is a **4-page unchanged shared CS CV**, a **1-page letter**, and a **2–4-page research narrative** in PDF plus editable Word counterparts, subject to successful automated validation.

## Submission review

- [ ] Proofread all research and publication claims against the shared CV and source papers.
- [ ] Confirm the PeopleSoft Job ID is **61589**, not the separate CGI faculty role 61368.
- [ ] Review all generated PDFs for layout and page count.
- [ ] Verify the three academic referees' current affiliations, permission, preferred email and phone **privately**; do not commit them.
- [ ] Confirm expected start date, full-time relocation feasibility, and employment authorization details.
- [ ] Upload the 3 PDFs and provide 3 references through PeopleSoft; save private confirmation.
- [ ] Change tracker to `submitted` **only after successful submission**.

**The application has not been submitted.**
