# Certification source and VS Code navigation guide

## Source review

The two supplied LaTeX files contain the same certification material. The second file only expands three abbreviated formal-education course names.

The LaTeX source contains three kinds of records:

1. completed or explicitly in-progress credentials;
2. repeated short, brief, and long descriptions of the same credentials; and
3. extensive referred or candidate programs that should not automatically be presented as earned credentials.

This update preserves the existing public records and adds source records only where the LaTeX provides both an explicit progress count and a complete course tree:

- Google Cloud Cybersecurity Professional Certificate — reported as 4/5 courses;
- IBM AI Product Manager Professional Certificate — reported as 4/10 courses;
- Google Cloud Data Analytics Professional Certificate — expanded from three to all five courses listed in the source.

The individual completed-course identities for the first two programs were not specified in the LaTeX. Their overall `reportedProgress` is therefore displayed accurately, while individual course records say `Status to verify` until their certificates or exact completion list are supplied.

The LaTeX also reports several partial programs without enough course-level evidence for an accurate portfolio record, including Azure DP-100, Google Advanced Data Analytics, IBM Data Analyst, Google Business Intelligence, and Control Systems Analysis. These should be added after confirming exact completed courses, current totals, dates, and credential links.

## Certification navigation in VS Code

Every certification in `dist/data/certifications.js` now has:

- a named constant beginning with `CERT_`;
- a numbered `// #region` block;
- its courses nested inside the same certification object.

Example:

```js
// #region 02 — AWS Generative AI and AI Agents with Amazon Bedrock
const CERT_02_awsBedrockProfessional = {
  // certification fields and courses
};
// #endregion
```

### Fastest navigation

With `certifications.js` active:

1. Press `Ctrl+Shift+O` on Windows/Linux or `Cmd+Shift+O` on macOS.
2. Type `CERT_`.
3. Select the certification name.

### Clean Outline settings

In the Outline panel:

1. Open the Outline `...` menu.
2. Disable **Show Properties**, **Show Fields**, and **Show Methods** if displayed.
3. Keep **Show Variables** and **Show Functions** enabled.
4. Sort by **Position**.

This leaves the named certification variables visible while hiding most field-level noise.

### Folding

Use the folding arrow beside each `// #region` to collapse an entire certification. The region title remains visible in the editor and minimap.

No extension is required. If manual jump points are still useful, the optional **Bookmarks** extension by Alessandro Fragnani can mark frequently edited certifications.

## Progress fields

When exact course-level completion values are known, set course `status` and `completionDate` normally. When only an overall count is confirmed, use:

```js
"reportedProgress": {
  "completed": 4,
  "total": 10
}
```

The updated `dist/render.js` uses this value for the certification header without guessing which individual courses are complete.

## Files to replace

- `dist/data/certifications.js`
- `dist/data/domain-areas.js`
- `dist/render.js`

After replacement, run `npm run dev` and inspect `learning.html` before committing the changes.
