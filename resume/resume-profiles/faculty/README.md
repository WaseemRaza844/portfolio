# Faculty Resume Profiles

These five reusable academic CV profiles share verified education, appointments, publications, projects, and Coursera certifications through `resume/content.json` and `dist/data/`. **The two preferred cross-application CVs are ECE and CS below**; the other three remain as archival/general baselines.

| File | Purpose | Build variant |
| --- | --- | --- |
| `generic.json` | Generic research-oriented faculty resume | `faculty` |
| `comprehensive.json` | Expanded faculty application resume | `faculty_comprehensive` |
| `ece_ai_wireless.json` | **Preferred shared ECE CV**: AI/ML, wireless communications and networks; adjunct, lecturer, teaching-track and tenure-track ECE roles | `faculty_ece_ai_wireless` |
| `cs_ai_ml.json` | **Preferred shared CS CV**: AI/ML, data science, deep learning and intelligent systems; adjunct, lecturer and professor CS roles | `faculty_cs_ai_ml` |
| `academic_cv.json` | Full academic CV | `academic_cv` |

## Build

From the repository root:

```bash
python resume/build.py --variant faculty
python resume/build.py --variant faculty_comprehensive
python resume/build.py --variant academic_cv
python resume/build.py --variant faculty_ece_ai_wireless --refresh-tex
python resume/build.py --variant faculty_cs_ai_ml --refresh-tex
python resume/build.py --all
python -m unittest discover -s resume/tests
```

The two cross-application PDFs are generated in `resume/resume-profiles/faculty/`:

- **ECE:** `Waseem_Raza_FACULTY_ECE_AI_WIRELESS.pdf` (source: matching `.tex`, data: `ece_ai_wireless.json`).
- **CS:** `Waseem_Raza_FACULTY_CS_AI_ML.pdf` (source: matching `.tex`, data: `cs_ai_ml.json`).

Use one shared PDF for all matching applications, rather than storing a separate copy in each institution's folder. Institution-specific faculty overlays are defined in `resume/job-applications/faculty/<college>/variant.json`; their tailored CV PDFs are generated directly in the same college folder.

## Section hierarchy

All academic variants use a consistent, teaching-forward hierarchy:

1. **Academic Profile:** profile summary, research interests, and doctoral research focus.
2. **Education:** degrees and relevant graduate coursework where selected.
3. **Teaching, Research & Professional Experience:** teaching appointments first, teaching areas and student mentoring, university research appointments, then industry R&D.
4. **Research Contributions:** publications and research projects.
5. **Research Methods & Technical Expertise.**
6. **Academic Service & Recognition.**
7. **Self-Learning:** selected completed courses and clearly labeled in-progress learning.

The generic faculty resume leads with the PhD in Electrical and Computer Engineering and doctoral research in AI/ML for wireless networks. The full academic CV preserves the broader academic record. Do not infer grants, courses taught, hardware expertise, student supervision, or publication status from general descriptions.

Coursera selections are drawn from the reconciled course inventory in `dist/data/certifications.js`. In-progress courses must not be represented as awarded certificates. The 5G Network Fundamentals course is currently marked in progress (60%) in the shared resume data.

## Tailoring

Create one folder under `resume/job-applications/faculty/` for each real institution and position. Add a `variant.json` with a `baseVariant` of `faculty`, `faculty_comprehensive`, or `academic_cv`. Use a lowercase, hyphenated college-and-role slug. Keep the tailored CV and all supporting documents together in that application folder.

## Editing LaTeX directly

The source `.tex` and output `.pdf` live in this folder. Edit a profile's TeX and run `python resume/build.py --variant <id>` to compile without replacing the TeX. To explicitly regenerate a TeX source after updating JSON or shared portfolio data, use `python resume/build.py --variant <id> --refresh-tex` (overwrites manual TeX edits).

## Faculty application workflow (recommended)

1. Select the shared **ECE** or **CS** CV depending on the academic department and specialization.
2. Reuse the **same CV** across adjunct, lecturer, teaching-track, and tenure-track applications, unless a posting requires special sections such as an exhaustive funding history or specifically asks for a shorter resume.
3. Store institution-specific **cover letters, teaching statements, research statements, diversity/mission statements and checklists** in `resume/job-applications/faculty/<institution-and-role>/`.
4. Upload academic transcripts and referee contact details privately through employer portals; do not commit them to the public repository.
5. Maintain the parent data (`resume/content.json`, portfolio JS) as the source of truth. Rebuild the two CVs whenever that evidence changes.

**Accuracy:** University of Lahore Computer Programming, Communication Systems, and Wireless Communication are documented prior teaching; proposed CS courses (AI/ML, Data Science, etc.) are research/technical preparation, not claimed instructor-of-record assignments. Student mentoring is not misrepresented as a verified count of completed formal thesis supervisions. Do not imply sponsored grants or awarded funding without verified evidence.

**Rebuilding:** `--refresh-tex` regenerates TeX from JSON, replacing manual edits. To recompile an already generated `.tex` without replacing it, omit `--refresh-tex`.
