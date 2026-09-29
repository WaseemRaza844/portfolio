# Portfolio data-file migration

This package replaces the single `dist/data.js` content file with focused files under `dist/data/`.

## Copy these files

Copy the complete `dist/` structure from the package into the repository and allow the six HTML files to be replaced. The new data files are:

| File | Edit it when you need to change |
| --- | --- |
| `dist/data/site-config.js` | Typography and learning-page display settings |
| `dist/data/domain-areas.js` | Domain-area names, descriptions, and order |
| `dist/data/certifications.js` | Certifications, courses, module counts, skills, dates, links, and PDFs |
| `dist/data/projects.js` | Project cards, skills, profile visibility, and featured status |
| `dist/data/publications.js` | Publication records, topics, URLs, profile visibility, and featured status |
| `dist/data/profile-data.js` | Personal identity, experience, education, and GenAI/Faculty variant selections |

The updated HTML files load these files in the required order:

- `dist/index.html`
- `dist/learning.html`
- `dist/projects.html`
- `dist/publications.html`
- `dist/genai/index.html`
- `dist/faculty/index.html`

## Most common update

For certification and course content, edit only:

```text
dist/data/certifications.js
```

Each certification remains one object containing a `courses` array. Add another course inside that array; do not create a separate JavaScript file for each course.

Course template:

```js
{
  "title": "Course name",
  "status": "Completed",
  "modulesCompleted": 6,
  "modulesTotal": 6,
  "completionDate": "September 2026",
  "summary": "One sentence explaining what the course covers.",
  "takeaway": "The principal knowledge or capability developed through the course.",
  "skills": [
    "Most important skill",
    "Second skill",
    "Third skill"
  ],
  "certificateUrl": "./certificates/domain/certificate-folder/course-certificate.pdf"
}
```

Certification template:

```js
{
  "id": "unique-lowercase-id",
  "profiles": ["generic", "genai"],
  "domain": "genai",
  "title": "Professional certificate name",
  "issuer": "Issuer / Coursera",
  "status": "Completed",
  "completionDate": "September 2026",
  "summary": "One or two sentences visible while the certification is closed.",
  "takeaway": "Optional expanded takeaway.",
  "skills": ["Primary skill", "Second skill", "Third skill"],
  "certificateUrl": "./certificates/domain/certificate-folder/professional-certificate.pdf",
  "links": {
    "coursera": "https://coursera.org/verify/...",
    "linkedin": "",
    "github": ""
  },
  "courses": [],
  "featured": false
}
```

## Profile visibility

Use the `profiles` array to control where a record appears:

```js
"profiles": ["generic", "genai"]
```

Common profile identifiers are:

- `generic`
- `genai`
- `faculty`
- `wireless`
- `healthcare`
- `finance`

Only `generic`, `genai`, and `faculty` currently have complete landing pages. The additional identifiers prepare records for future variants.

## Important loading rule

`site-config.js` must load first. `render.js` or `variant-render.js` must load only after all collection files. The supplied HTML files already use the correct order.

## Old file

After confirming every page works, `dist/data.js` and `dist/profile-data.js` can be removed. They are no longer referenced by the updated pages. Keeping them temporarily does not affect the website.

## Validation

From the repository root, run:

```bash
npm run dev
```

Open the forwarded Codespaces port and test:

```text
/
/learning.html
/projects.html
/publications.html
/genai/
/faculty/
```

Also test the filtered pages:

```text
/learning.html?profile=genai
/learning.html?profile=faculty
```
