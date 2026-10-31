# Reusable Resume Profiles

Industry and faculty profile sources and outputs are kept **together**, with no separate generic output directory.

- **[industry/](industry/README.md)**: `variants.json`, seven editable `Waseem_Raza_*.tex` sources, and corresponding PDFs.
- **[faculty/](faculty/README.md)**: three reusable faculty JSON configurations, editable TeX sources, and corresponding PDFs.
- `build-report.json`: report for the latest generic/faculty/application-profile build.

To compile existing editable TeX sources without overwriting them:

```bash
python resume/build.py --all
```

To intentionally regenerate TeX from shared data and JSON:

```bash
python resume/build.py --all --refresh-tex
```

Use `--refresh-tex` with care; it overwrites manual edits in those `.tex` files. Application-specific files belong under `resume/job-applications/`.
