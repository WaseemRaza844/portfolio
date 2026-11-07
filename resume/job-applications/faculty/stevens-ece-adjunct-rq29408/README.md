# Stevens Institute of Technology — ECE Adjunct RQ29408

**Institution:** Stevens Institute of Technology, Hoboken NJ (in person, part time)  
**Employer Workday:** https://stevens.wd5.myworkdayjobs.com/en-US/External/job/Adjuncts---Electrical-and-Computer-Engineering---Spring-2026_RQ29408-1  
**Apply:** https://stevens.wd5.myworkdayjobs.com/en-US/External/job/Adjuncts---Electrical-and-Computer-Engineering---Spring-2026_RQ29408-1/apply  
**Requisition:** RQ29408  
**Courses named in posting:** EE 583 Wireless Communications; CPE 810 GPU & Multicore Programming  
**Search chair:** Prof. Min Song, msong6@stevens.edu  
**User availability:** In-person classes starting at or after **5:00 p.m.**; actual course schedule unverified.  
**Status:** Documents prepared; not submitted.

## IMPORTANT: verify intended teaching semester

Workday continues to display the position as available in **November 2026**, but the job description specifically says **Spring 2026** and **potentially Fall 2026**. Spring 2026 is past and Fall 2026 is already underway. Do **not** assert that Stevens is currently hiring for Spring 2027 without confirmation.

The concise `Email_to_Search_Chair.txt` asks the search chair whether the posting is intended for future semesters and whether the EE 583 section will start after 5 p.m. It is ready to copy into email, but no email has been sent.

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

**CPE 810:** Python/C/C++, numerical computing, ML/AI workloads; specific CUDA/GPU/multicore programming expertise and teaching experience are **not evidenced** in existing academic materials. Discuss the detailed syllabus before indicating a commitment to teach CPE 810. A Stevens ECE handbook lists CPE 810A as special topics GPU & Multicore Programming, which may use more specialized software/hardware than general C++.

**Hours:** The employer does not guarantee evening sections. Do not state "flexible anytime" when the user is available after 5 p.m. only.

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

The dedicated GitHub workflow validates the unchanged shared CV, one-page cover letter, teaching philosophy, and optional research statement, and publishes only public PDF/DOCX application files.

## Submission checklist

- [ ] Confirm whether RQ29408 is genuinely hiring for a future term; send the saved note to the search chair if needed.
- [ ] Verify EE 583 evening section starts at/after 5:00 p.m. and travel time to Hoboken fits the daytime job.
- [ ] Review cover letter and teaching philosophy against shared ECE CV.
- [ ] Verify all three private referees and consent; upload **private** list in Workday.
- [ ] Upload cover letter, teaching philosophy, CV, and private references. Add optional research statement only if the portal requests it or accepts additional materials.
- [ ] Confirm applicable work authorization and outside-employment requirements for a second employer before accepting an adjunct appointment.
- [ ] Save confirmation outside public GitHub, update tracker from Ready to Submitted **only after actual submission**.
