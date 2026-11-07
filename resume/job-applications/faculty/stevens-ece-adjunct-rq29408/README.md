# Stevens Institute of Technology — ECE Adjunct RQ29408

**Institution:** Stevens Institute of Technology, Hoboken NJ (in person, part time)  
**Employer Workday:** https://stevens.wd5.myworkdayjobs.com/en-US/External/job/Adjuncts---Electrical-and-Computer-Engineering---Spring-2026_RQ29408-1  
**Apply:** https://stevens.wd5.myworkdayjobs.com/en-US/External/job/Adjuncts---Electrical-and-Computer-Engineering---Spring-2026_RQ29408-1/apply  
**Requisition:** RQ29408  
**Courses named in posting:** EE 583 Wireless Communications; CPE 810 GPU & Multicore Programming  
**Search chair:** Prof. Min Song, msong6@stevens.edu  
**Applicant course preference:** EE 583 Wireless Communications; related communication systems, signals and systems, signal processing, and wireless-network courses. GPU/multicore programming is **not** a teaching interest.  
**Status:** Revised academic documents prepared, not submitted.

## Academic positioning and scope

The cover letter and supporting statements focus exclusively on the applicant's qualifications, teaching, and research interests; they **do not mention scheduling availability or the academic semester**. The employer vacancy lists two distinct topics, but the application expressly targets wireless communications and related ECE disciplines. The previous inquiry-email draft is not part of the applicant package.

The applicant holds a PhD in ECE and bachelor's and master's degrees in Telecommunication Engineering. Previous university teaching in Wireless Communication, Communication Systems, and Computer Programming; research in resilient propagation modeling, generative learning, network optimization, and digital twins; and professional experience with AT&T, AT&T Labs, and Futurewei provide the main evidence.

Continuing education is verified against `dist/data/certifications.js`: **4G Network Fundamentals** and **Business Considerations for 5G with Edge, IoT, and AI** are *completed*; **5G Network Fundamentals** remains *in progress*. Additional completed Coursera coursework relates to telecom AI and network/security optimization. References to 6G are explicitly future interests rather than claims of completed 6G research.

## Application requirements and conflicting boilerplate

The **role-specific** academic submission list in Workday is:
1. Cover letter.
2. Teaching philosophy.
3. Curriculum vitae.
4. Contact information for **three** professional references.

The later **generic** academic submission guidelines also include a **research statement**, and require teaching interests, philosophy, and an inclusive-environment plan.

**Submission strategy:** Prepare all five types of document. Upload the four role-specific files, including the private contact list. The teaching statement deliberately includes teaching interests, philosophy and inclusion/student advising. An **optional research statement** is prepared in case Workday actually requires or accepts it; do not upload extra files if the form limits attachments.

## Generated public files

| File | Purpose |
|---|---|
| `submission-ready/WRaza_STEVENS_RQ29408_CV.pdf` | **Unchanged four-page shared ECE faculty CV** |
| `submission-ready/WRaza_STEVENS_RQ29408_Cover_Letter.pdf` | One-page course-focused cover letter |
| `submission-ready/WRaza_STEVENS_RQ29408_Teaching_Philosophy.pdf` | Teaching philosophy, course interests, inclusion and student mentoring |
| `submission-ready/WRaza_STEVENS_RQ29408_Research_Statement_OPTIONAL.pdf` | Research statement if required by live Workday form |

Editable DOCX copies of the three narratives are also generated in `submission-ready/`.

**Reference contacts are private**. A ready-to-upload private PDF/DOCX is supplied separately in ChatGPT, not committed to this public repository. Always verify referee contact details and consent.

## Positioning and fit

**EE 583:** excellent alignment with PhD ECE dissertation on reliable AI for wireless networks, prior instructor-of-record work teaching Wireless Communication and Communication Systems, communications labs, and AT&T/Futurewei 5G/wireless systems research. Curriculum reference: https://stevens.catalog.prod.coursedog.com/programs/1c00f8a04b1f01d9da3d29484432a173/requirements-and-concentrations-n90Np

**CPE 810:** Listed in the employer advertisement, but **not targeted by the applicant**. Do not claim GPU/CUDA or multicore programming course preparation or offer to teach this subject in applicant-facing documents.

**Compensation:** Workday lists $8,600–$9,400, and $1,120 per student when enrollment is below eight. The unit and contractual details are not explicit; verify with HR.

## Build locally

From the root of the portfolio repository in PowerShell:

```powershell
git status --short
git switch develop
git pull --ff-only origin develop
python -m pip install -r resume/requirements.txt

# Use the committed shared ECE CV, compiling only if missing:
# python resume/build.py --variant faculty_ece_ai_wireless

python resume/job-applications/faculty/stevens-ece-adjunct-rq29408/build_documents.py

explorer "resume\job-applications\faculty\stevens-ece-adjunct-rq29408\submission-ready"
```

The dedicated GitHub workflow validates the unchanged shared CV, full one-page cover letter, teaching philosophy of at least two pages, and an approximately one-page optional research statement, and publishes only public PDF/DOCX application files.

## Submission checklist

- [ ] Review the employer portal's current requisition and available EE 583 teaching assignment; handle logistical details separately from the application narratives.
- [ ] Review cover letter and teaching philosophy against shared ECE CV.
- [ ] Verify all three private referees and consent; upload **private** list in Workday.
- [ ] Upload cover letter, teaching philosophy, CV, and private references. Add optional research statement only if the portal requests it or accepts additional materials.
- [ ] Confirm applicable work authorization and outside-employment requirements for a second employer before accepting an adjunct appointment.
- [ ] Save confirmation outside public GitHub, update tracker from Ready to Submitted **only after actual submission**.
