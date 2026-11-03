# The British University in Dubai (BUiD) — Computer Science Faculty (AI Focus), January 2027

**Role:** Lecturer / Assistant / Associate Professor in Computer Science; primary focus on **Artificial Intelligence**.  
**Recommended rank for this applicant:** **Assistant Professor** (do not assume associate-level promotion record).  
**Location:** Dubai, United Arab Emirates | **Start:** January 2027  
**Employer-stated application deadline:** **9 November 2026** (verify the time zone and exact closing time in the portal).  
**Employer careers:** https://ess.buid.ac.ae/career  
**BUiD careers page:** https://www.buid.ac.ae/jobs/  
**Faculty context:** https://www.buid.ac.ae/faculty-of-engineering-cs/

The exact vacancy record is behind a JavaScript-enabled careers portal. The description and deadline are taken from the applicant's supplied job text, not from an independently accessible record.

## Submission package

The posting explicitly asks for:

1. **Cover letter:** `submission-ready/WRaza_BUID_AI27_Cover_Letter.pdf`
2. **Detailed academic CV:** `submission-ready/WRaza_BUID_AI27_CV.pdf`
3. **Teaching statement:** `submission-ready/WRaza_BUID_AI27_Teaching_Statement.pdf`
4. **Research statement:** `submission-ready/WRaza_BUID_AI27_Research_Statement.pdf`
5. **Three academic referees:** contact information entered **privately** in the portal. See `References_PRIVATE_CHECKLIST.md`; do not publish personal email addresses.

The builder also creates corresponding editable Word documents in `submission-ready/`. **Do not submit the application until the evidence checkpoints below are reviewed.**

## Positioning and truthful boundaries

- PhD, Electrical and Computer Engineering, University of Oklahoma (2025); AI/ML dissertation on wireless networks.
- Existing research and publications span robust ML, generative and transfer learning, reinforcement learning, network reliability, and wearable sensor analytics.
- University instructor-of-record modules: **Computer Programming, Communication Systems, Wireless Communication** (University of Lahore, Department of Technology). AI/ML modules are **proposed BUiD teaching contributions**, not historical faculty teaching appointments.
- COMSATS: mentoring of Bachelor's and Master's research/thesis-related work; do **not** fabricate formal supervision/completion counts.
- Existing source records do not establish named external grants held as PI or Co-PI. The **University of Oklahoma doctoral graduate research assistantship** and proposal preparation support are not equivalent to a personally awarded external grant.
- Journal publications in indexed venues are distinguished from IEEE conference papers and the accepted HEALTHINF 2026 conference paper. Author lists and year/indexing should be checked against publisher DOI pages.
- The third academic referee must meet BUiD's academic-referee requirement, with a current academic affiliation and confirmed private email address.

## Local build commands (Windows PowerShell, portfolio repository root)

```powershell
git status --short
git switch develop
git pull --ff-only origin develop
python -m pip install -r resume/requirements.txt
python -m unittest discover -s resume/tests

# Create editable DOCX for this application and other registered faculty applications:
python resume/build_application_documents.py

# Render PDFs and package the four BUiD application documents:
python resume/job-applications/faculty/buid-computer-science-ai-january-2027/build_documents.py

# Optional audit of all CV PDFs:
python resume/validate_pdf_layout.py

# Open the final BUiD folder:
explorer "resume\job-applications\faculty\buid-computer-science-ai-january-2027\submission-ready"
```

**Build implementation:** the BUiD academic CV is a self-contained, complete Markdown CV in `Academic_CV_AI.md`. The four required documents are rendered from the adjacent Markdown files using `build_documents.py` (PDFs, A4) and `resume/build_application_documents.py` (editable Word). This is separate from the generic ECE faculty resume overlays because this vacancy explicitly requires a supervision/completions, modules-taught, funding and indexed-journal format.

## Final checks (complete before 9 November)

- [ ] Confirm the correct job listing, deadline, and portal account in https://ess.buid.ac.ae/career.
- [ ] Check document page layout and eliminate any awkward final pages.
- [ ] Validate all journal authors, DOIs and Scopus / WoS indexing for each listed work.
- [ ] Review `Academic_CV_AI.md` for formally completed thesis supervision and funding history; replace any statement about *unverified* counts with factual records only if documented.
- [ ] Confirm willingness and current institutional emails of three academic referees.
- [ ] Check start-date readiness, UAE employment formalities, and personal relocation timeline.
- [ ] Submit and retain confirmation; **do not mark the tracker as submitted beforehand**.

**Status:** Public application source documents prepared and committed to develop; application not submitted. Rendered file build and employer submission require local execution and review.
