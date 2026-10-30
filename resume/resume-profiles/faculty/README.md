# Faculty Resume Profiles

These three reusable academic documents share verified education, appointments, publications, projects, and Coursera certifications through `resume/content.json` and `dist/data/`.

| File | Purpose | Build variant |
| --- | --- | --- |
| `generic.json` | Generic research-oriented faculty resume | `faculty` |
| `comprehensive.json` | Expanded faculty application resume | `faculty_comprehensive` |
| `academic_cv.json` | Full academic CV | `academic_cv` |

## Build

From the repository root:

```bash
python resume/build.py --variant faculty
python resume/build.py --variant faculty_comprehensive
python resume/build.py --variant academic_cv
python resume/build.py --all
python -m unittest discover -s resume/tests
```

The three reusable PDFs are generated in `resume/resume-profiles/faculty/`. Institution-specific faculty overlays are defined in `resume/job-applications/faculty/<college>/variant.json`; their tailored CV PDFs are generated directly in the same college folder.

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
