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

## Edit locally

1. Open `dist/index.html` in a browser.
2. Edit collection content in `data.js`, page text in the HTML files, and styling in `styles.css`.
3. Refresh the browser to review your changes.

To serve it locally with Python:

```bash
cd dist
python -m http.server 8000
```

Then open `http://localhost:8000`.

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

The `.openai/hosting.json` file links this source project to its ChatGPT Site. Keep it if you want future Sites deployments to update the same website.
