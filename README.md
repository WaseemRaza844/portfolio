# Waseem Raza Portfolio

This is a lightweight multi-page static portfolio. No build step or framework is required.

## Files

- `dist/index.html` — landing page
- `dist/learning.html` — complete certification and learning archive
- `dist/projects.html` — guided and portfolio projects
- `dist/publications.html` — complete publication archive
- `dist/data.js` — editable content for certifications, projects, and publications
- `dist/render.js` — reusable card rendering for the landing and archive pages
- `dist/styles.css` — layout, colors, typography, and responsive styling
- `dist/script.js` — reveal animations and automatic footer year
- `COURSE_AND_PDF_UPGRADE.md` — module-progress, PDF-preview, and GitHub Pages instructions
- `VARIANT_EDITING_GUIDE.md` — profile tagging, filtered archives, and future variant instructions

## Preview in GitHub Codespaces (recommended)

From the repository root, run:

```bash
npm install
npm run dev
```

Open port **8000** from the Codespaces **Ports** tab. This server watches every file inside `dist`, disables caching, and refreshes the preview after you save a change.

Important: edit the files inside `dist/`. This project does not have a separate source/build directory. In particular:

- Edit content in `dist/data.js`.
- Edit page wording or structure in the `dist/*.html` files.
- Edit the design in `dist/styles.css`.
- Edit rendering behavior in `dist/render.js`.

If you uploaded this ZIP into an existing Codespace, run `npm install` once before `npm run dev`. A newly created Codespace will run the installation automatically through `.devcontainer/devcontainer.json`.

## Python fallback

For a dependency-free server that disables caching, run this from the repository root:

```bash
python3 serve.py
```

Refresh the browser manually after saving. Prefer this command over the generic `python -m http.server 8000 --directory dist` command.

If you still see an old page, stop any existing server with `Ctrl+C`, start only one preview server, open the URL shown for port 8000 in the Ports tab, and perform one hard refresh (`Ctrl+Shift+R` on Windows/Linux or `Cmd+Shift+R` on macOS).

## Edit locally

1. Edit collection content in `dist/data.js`, page text in the HTML files, and styling in `dist/styles.css`.
2. Run `npm run dev` or `python3 serve.py` from the repository root.
3. Open `http://localhost:8000` (or the forwarded Codespaces port).

## Add or feature content

Add a new object to the relevant array in `dist/data.js`:

- `certifications`
- `projects`
- `publications`

Set `featured: true` to show that item on the landing page. Set it to `false` to keep the item only on its dedicated archive page.

Certification records support the title, issuer, status, completion or target date, overview, optional key takeaway, skills, an optional certificate PDF, and included course records. Each course supports its own completion date, optional takeaway, skills, and certificate PDF.

## Organize domain areas and presentation

The `settings` and `domainAreas` blocks at the top of `dist/data.js` control the learning archive:

- Set `typography.preset` to `executive`, `modern`, or `classic`.
- Set `typography.size` to `small`, `medium`, or `large`.
- Set `learning.showTakeaways` to `false` to show only the certification overview and key skills.
- Set `learning.showEmptyPaths` to `true` when you want an empty domain area to appear before adding its first certification.
- Add or reorder objects in `domainAreas` to control the subject sections and their order.
- Set each certification's `domain` to the matching domain ID, such as `genai`, `wireless`, `ml-data`, `system-design`, or `cloud-devops`.

These settings are source-code controls; there are no public font or content controls on the website.

Example:

```js
{
  domain: "genai",
  title: "Professional Certificate Name",
  issuer: "IBM / Coursera",
  status: "Completed",
  completionDate: "May 2026",
  summary: "Short certification overview.",
  takeaway: "The main capability developed through the program.",
  skills: ["RAG", "LangGraph", "Evaluation"],
  certificateUrl: "./certificates/professional-certificate.pdf",
  links: {
    coursera: "https://www.coursera.org/account/accomplishments/...",
    linkedin: "https://www.linkedin.com/...",
    github: "https://github.com/..."
  },
  courses: [
    {
      title: "Course Name",
      completionDate: "March 2026",
      takeaway: "The most important idea learned in this course.",
      skills: ["Skill One", "Skill Two"],
      certificateUrl: "./certificates/course-name.pdf"
    }
  ],
  featured: true
}
```

Place downloaded Coursera PDFs in `dist/certificates/`. The `certificateUrl` may also contain a public Coursera credential URL instead of a local PDF path.

Project records support guided/portfolio category, date, summary, and skills. Publication records support year, venue, summary, topics, and an optional external URL.

Course records additionally support `status`, `modulesCompleted`, `modulesTotal`, and `summary`. These fields populate the richer closed course row. Local PDF files receive an inline preview automatically.

## Publish on GitHub Pages

This package includes `.github/workflows/deploy-pages.yml`, which publishes `dist/` whenever you push to `main`. In the GitHub repository, open **Settings → Pages** and set **Source** to **GitHub Actions**. See `COURSE_AND_PDF_UPGRADE.md` for the complete workflow.

## Focused profiles

- `/` — comprehensive Machine Learning and Wireless AI portfolio
- `/genai/` — Generative AI and Agentic AI portfolio
- `/faculty/` — Faculty and academic portfolio

Shared records remain in `dist/data.js`; shared identity, education, experience, and profile-specific selections live in `dist/profile-data.js`.

The `.openai/hosting.json` file links this source project to its ChatGPT Site. Keep it if you want future Sites deployments to update the same website.
