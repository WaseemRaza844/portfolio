# UCNJ Union College: Engineering Technology Lecture and Lab Adjunct, Spring 2027

## Employer postings, not one combined opening

- **Day courses:** https://ucc.peopleadmin.com/postings/12652
- **Evening courses:** https://ucc.peopleadmin.com/postings/12654
- **HigherEdJobs day listing:** https://www.higheredjobs.com/details.cfm?JobCode=179568721

These are **distinct applications** in the same Engineering Technology department. Both openings cover electrical and mechanical areas, but these documents emphasize **Electrical Engineering Technology** based on actual teaching and technical preparation. They were posted on September 28, 2026, and are **open until filled**, without an employer closing date stated. Locations: Cranford, Elizabeth and Plainfield; appointment: part-time adjunct.

## Required uploads

1. **Resume/CV:** `submission-ready/WRaza_FAC_UCNJ_ET27_CV.pdf`
2. **Cover letter:** Select the schedule-matched one from `submission-ready/WRaza_FAC_UCNJ_ET27_CL_Day.pdf` or `WRaza_FAC_UCNJ_ET27_CL_Eve.pdf`.
3. **Unofficial college transcripts:** Upload the genuine academic transcripts from your private records in the employer portal. **No transcript has been generated or publicly committed.** The posting says unofficial college transcripts must be submitted before interview and lists them as required application attachments; official copies are due on hiring.

No separate teaching or research statement is listed as a required upload. Other optional material should be provided only if the application portal requests it.

## Shared CV and prominent technical skills

Both applications use **the same three-page CV** (`WRaza_FAC_UCNJ_ET27_CV.pdf`). The only schedule-specific documents are the short day and evening cover letters.

The CV places **Technical Skills & Engineering Tools** immediately after the undergraduate teaching and mentoring sections, ahead of research and publication details. It includes programming languages (Python, C/C++, MATLAB, SQL), engineering computing and simulation (Jupyter, NumPy, SciPy, Pandas, Matplotlib, Plotly), wireless systems, ML frameworks, Git, Linux, VS Code, software tools and communications laboratory instruction. These are selected from the existing faculty and industry skill inventories rather than newly claimed credentials.

The `submission-ready/` folder uses the short `WRaza_FAC_UCNJ_ET27_*` convention. The longer filenames inside the working application folder are internal build inputs, not intended for submission.

## Main teaching argument

- University of Lahore: **Lecturer, Department of Technology**, December 2017–September 2019; undergraduate **Electrical Engineering Technology** instruction in **Computer Programming, Communication Systems and Wireless Communication**, including student projects, curricula, exams and assessment.
- University of Engineering and Technology, Taxila: Communication Systems Lab research scholar and communications-course/laboratory instructional support, 2014–2016; assignments, experiments, grading and technical materials.
- COMSATS University Islamabad: Bachelor’s and Master’s research mentoring in communications and simulations, 2016–2017.
- AT&T Labs, Futurewei and AT&T: practical network and engineering analytics experience to connect classroom topics with real deployments.
- PhD, Electrical and Computer Engineering, University of Oklahoma (2025); MSc/BSc in Telecommunication Engineering, UET Taxila.

**Do not** claim prior community-college teaching: University of Lahore was university-level teaching in a Technology department, relevant to the audience but not literally a U.S. community college. **Do not** claim mechanical-technology, mechanical labs or licensure not documented. Teaching/tutoring combined experience may be cited only when explicitly distinguished from university faculty appointments.

## Portal supplemental questions

- How did you hear? **HigherEdJobs.com** if applying based on the HigherEdJobs advertisement (use whichever source is true for that particular application).
- Print/ad details: **N/A** when choosing a listed source (per portal instructions).
- Another website/source details: **N/A** when choosing a listed source.
- Highest education: **Graduate Degree**.
- At least two years' teaching or equivalent: **Yes**, based on the documented University of Lahore appointment (Dec 2017–Sep 2019) plus other teaching/tutoring experience. Confirm the answer reflects your own records.

## Build locally after changes merge to develop

```powershell
git switch develop
git pull --ff-only origin develop
python resume/build.py --variant faculty_ucnj_engineering_technology_adjunct_spring_2027
python resume/build_application_documents.py
python resume/job-applications/faculty/ucnj-engineering-technology-adjunct-spring-2027/build_documents.py
python resume/job-applications/faculty/ucnj-engineering-technology-adjunct-spring-2027/package_submission.py
python resume/validate_pdf_layout.py
```

The CI workflow compiles the CV and letters, packages names consistently, and publishes the resulting public PDFs and DOCX files to `develop`.

## Before submission

- [ ] Review the CV and the schedule-specific letter.
- [ ] Choose the correct **day** or **evening** vacancy; use the matching cover letter.
- [ ] Obtain personal **unofficial transcripts** for relevant degrees. Upload them privately to PeopleAdmin; do not put them in a public GitHub repository.
- [ ] Confirm availability for the applicable class schedule.
- [ ] Complete the portal and retain confirmation; only then mark the matching tracker entry submitted.

**Status:** Preparing, not submitted.
