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

Certification records support the title, issuer, status, completion or target date, summary, skills, and included courses. Project records support guided/portfolio category, date, summary, and skills. Publication records support year, venue, summary, topics, and an optional external URL.

The `.openai/hosting.json` file links this source project to its ChatGPT Site. Keep it if you want future Sites deployments to update the same website.
