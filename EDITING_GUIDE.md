# Editing the learning archive

All learning content and display defaults are controlled from `dist/data.js`.

## Change typography without adding public controls

At the top of `dist/data.js`, edit `settings.typography`:

```js
typography: {
  preset: "executive", // executive, modern, or classic
  size: "medium"       // small, medium, or large
}
```

Save the file and refresh the site. The choices apply to every visitor; no selector appears on the page.

## Show or hide key takeaways

Set `settings.learning.showTakeaways` to `true` or `false`. With `false`, the open certification shows the overview and Key Skills & Tools without the takeaway blocks.

## Add a domain area

Add an object to `domainAreas`:

```js
{ id: "security", title: "AI Security & Governance", description: "Security, safety, governance, and responsible deployment." }
```

The array order is the page order. A domain with no certifications stays hidden unless `showEmptyPaths` is `true`.

## Add a certification

Copy an existing object in `certifications`. Give it a `domain` matching a domain-area ID. Keep courses in display order; their labels C1, C2, C3 are generated automatically. Certification numbers restart at 1 in every domain.

The progress label is also automatic. A course counts as complete when its `completionDate` begins with `Completed`. For example, four completed courses in a five-course certificate becomes `Completed (4/5) courses`.

Use month granularity for dates:

```js
status: "Completed",
completionDate: "July 2026"
```

or:

```js
status: "In progress",
completionDate: "December 2026"
```

Add only the links you have; empty links are not rendered:

```js
links: {
  coursera: "https://www.coursera.org/account/accomplishments/...",
  linkedin: "",
  github: ""
}
```

Write `summary` as the one- or two-sentence description shown while the card is closed. Use the longer `summary` text as the overview inside the open card. Put the most important skills first in `skills`.

## Add courses and credential PDFs

Each course needs a title, completion date, optional takeaway, skills, and optional PDF path. Store PDFs by domain and certificate:

```text
dist/certificates/genai/ibm-generative-ai/course-name.pdf
```

Then set:

```js
certificateUrl: "./certificates/genai/ibm-generative-ai/course-name.pdf"
```

Use lowercase filenames with hyphens. Do not use spaces. After editing, open `dist/index.html` or run the local server described in `README.md` and test every link.
