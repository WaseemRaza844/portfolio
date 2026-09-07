# Managing portfolio variants

The site keeps one authoritative record for each certification, project, and publication. The `profiles` array controls where that record is relevant.

## Current profiles

- `generic` — comprehensive Machine Learning and Wireless AI profile
- `genai` — Generative AI and Agentic AI profile
- `faculty` — Faculty and academic profile
- `healthcare` and `finance` — reserved for later variants

## Tag a certification

In `dist/data.js`, give every certification a stable `id` and a `profiles` list:

```js
{
  id: "aws-bedrock-professional",
  profiles: ["generic", "genai", "faculty"],
  domain: "genai",
  title: "AWS Generative AI and AI Agents with Amazon Bedrock",
  // remaining fields...
}
```

The certification and all of its courses are inherited together. Do not duplicate its course records for each portfolio.

Examples:

```js
profiles: ["generic", "genai"]
profiles: ["generic", "wireless", "faculty"]
profiles: ["healthcare", "faculty"]
profiles: ["finance"]
```

## Tag a project or publication

Projects and publications use the same fields:

```js
{
  id: "wearable-intelligence",
  profiles: ["faculty", "healthcare"],
  title: "Wearable Intelligence for Health Monitoring",
  // remaining fields...
}
```

## Choose featured items and their order

`dist/profile-data.js` contains the ordered selections for each focused page:

```js
certificationIds: ["aws-bedrock-professional", "ibm-genai-engineering"],
projectIds: ["agentic-ai-rag", "meeting-minutes-llm"],
publicationIds: ["resilient-propagation-2024"]
```

Only listed IDs appear on that focused landing page, in the order shown. The `profiles` field separately controls filtered archive pages such as:

```text
learning.html?profile=genai
projects.html?profile=faculty
publications.html?profile=faculty
```

Opening the archive without a query parameter shows the comprehensive collection.

## Add Healthcare or Finance later

1. Add `healthcare` or `finance` to relevant records' `profiles` arrays.
2. Add its wording and ordered record IDs under `variants` in `dist/profile-data.js`.
3. Copy one existing variant folder, update `data-variant` on its `<body>`, and adjust the profile-specific section labels.
4. Add the new profile to each Profiles menu.

## Replace the temporary image

Replace:

```text
dist/assets/images/profile-placeholder.png
```

with your professional photo using the same filename. A portrait-oriented 4:5 image is recommended. No HTML or JavaScript change is required.

## Content principle

The comprehensive pages are an evidence archive. Focused profiles are curated narratives. A record may appear in more than one profile when it provides genuine evidence for both, while unrelated records should remain available only in the comprehensive archive.
