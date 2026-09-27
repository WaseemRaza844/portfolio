# Course summaries, module progress, and PDF previews

## Files changed

- `dist/render.js` renders the richer course headers and PDF previews.
- `dist/styles.css` styles those elements responsively.
- `.github/workflows/deploy-pages.yml` deploys `dist/` to GitHub Pages.
- `dist/.nojekyll` tells GitHub Pages to publish the static files as written.

Keep your existing `dist/data.js` and `dist/certificates/` when applying this upgrade to a repository that already contains your latest records and PDFs.

## Updated course record

Use these fields for every course:

```js
{
  title: "Getting Started with AWS Generative AI for Developers",
  status: "Completed",
  modulesCompleted: 6,
  modulesTotal: 6,
  completionDate: "August 2026",
  summary: "Foundation course covering generative AI concepts, language models, prompt engineering, and AWS services for developers.",
  takeaway: "Established the foundations needed to design and evaluate generative AI applications on AWS.",
  skills: [
    "AWS Generative AI",
    "Foundation Models",
    "Large Language Models",
    "Prompt Engineering"
  ],
  certificateUrl: "./certificates/genai/aws-bedrock/c1-getting-started-aws-generative-ai.pdf"
}
```

The closed course row uses `title`, `summary`, `status`, module counts, and `completionDate`. The expanded row uses `takeaway`, `skills`, and `certificateUrl`.

For an unfinished course, use:

```js
status: "In progress",
modulesCompleted: 3,
modulesTotal: 6,
completionDate: "October 2026"
```

It will display `In progress (3/6) modules` and `Target: October 2026`.

For a completed course, use:

```js
status: "Completed",
modulesCompleted: 6,
modulesTotal: 6,
completionDate: "August 2026"
```

It will display `Completed (6/6) modules` and `Completed: August 2026`.

## PDF behavior

A local URL ending in `.pdf` receives two controls automatically:

1. `Preview course certificate` or `Preview professional certificate` expands an embedded viewer.
2. `Open full PDF in a new tab` remains available under the preview.

External Coursera pages are presented as normal external links because many websites block embedding. Keep local PDFs under `dist/certificates/` when you want the inline preview.

## GitHub Pages setup

1. Commit and push the entire project, including `.github/workflows/deploy-pages.yml`, `dist/.nojekyll`, and the PDFs.
2. On GitHub, open the repository and select **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Open the **Actions** tab and select **Deploy portfolio to GitHub Pages**.
5. Wait for the workflow to complete, then use its deployment URL or select **Settings → Pages → Visit site**.

Every later push to `main` deploys the current contents of `dist/` automatically.
