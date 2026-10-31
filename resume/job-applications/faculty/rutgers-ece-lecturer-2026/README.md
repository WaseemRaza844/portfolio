# Rutgers University - ECE Lecturers (2026-2027)

Official posting: https://jobs.rutgers.edu/postings/275804
Posting number: 26FA0517; Piscataway, NJ; part-time; $2,777/credit; closes February 1, 2027.
Personal apply-by target November 3, 2026 (preserved from application tracker).

## Required application documents

1. Resume/CV: generated from variant.json as Waseem_Raza_FACULTY_RUTGERS_ECE_LECTURER_2026.pdf.
2. Teaching Philosophy: Waseem_Raza_RUTGERS_Teaching_Philosophy.pdf.
3. List of Professional References with contact information: a private finalized reference sheet. The public-repository template 03_Rutgers_Professional_References.md and its INCOMPLETE PDF are NOT READY TO SUBMIT. The third reference had been replaced; its current private details were not available here. Do not upload the incomplete PDF.
4. List of Courses Taught: Waseem_Raza_RUTGERS_Courses_Taught.pdf.

An optional cover letter is also prepared but is NOT among the four required uploads. No research statement required.

## Academic positioning

Documented teaching: Computer Programming, Communication Systems, Wireless Communication at the University of Lahore. Communications laboratory/course support at UET Taxila and research/project mentoring at COMSATS are separate experiences, not courses independently taught. Potential Rutgers ECE matches based on preparation (not prior teaching claims): 14:332:423 Computer and Communication Networks; 14:332:443 Machine Learning for Engineers. See https://ece.rutgers.edu/ece-course-descriptions.

## Local commands from repository root (PowerShell)

```powershell
git switch develop
git pull --ff-only origin develop
python resume/build.py --variant faculty_rutgers_ece_lecturer_2026
python resume/build_application_documents.py
python resume/job-applications/faculty/rutgers-ece-lecturer-2026/build_documents.py
python -m unittest discover -s resume/tests
python resume/validate_pdf_layout.py
```

The GitHub Actions build generates the CV, editable Word documents and supporting PDFs and publishes them to develop after validation.

## Before submission

- Verify CV and teaching documents, education, title, course history and email.
- Use your privately finalized references list with three confirmed contacts.
- Submit four required files using the Rutgers ROCS portal.
- Mark tracker Submitted only after actual application submission.

No Rutgers application has been submitted by the repository.
