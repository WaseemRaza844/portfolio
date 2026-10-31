# Faculty Application Tracker

This is a lightweight, version-controlled job application pipeline inside the portfolio repository. It is designed for **many applications over the next several weeks**, without introducing another account, database, or spreadsheet to synchronize.

## Open the dashboard

- Development preview (public, unindexed): https://waseemraza844.github.io/portfolio/develop/applications/
- Source of truth: [jobs.json](../../dist/applications/jobs.json)
- HTML dashboard: [dist/applications/](../../dist/applications/)
- Cover-letter and CV source folders: [faculty/](faculty/)

**Privacy:** The portfolio repository and its development website are public. Only non-sensitive job metadata and high-level status belong here. Do not put reference contact information, private application portal URLs, confirmation codes, signed letters, salary negotiations, work authorization details, personal notes, or passwords in this tracker. `noindex` prevents routine search indexing; it is **not access control**.

## Application lifecycle

| Status | Meaning |
| --- | --- |
| `saved` | Job posting received, not investigated |
| `researching` | Detailed job description and document requirements being checked |
| `preparing` | CV, letter, or forms are being tailored |
| `ready` | Documents reviewed; applicant can submit |
| `submitted` | **User confirmed** the application was actually sent |
| `interview` | Interview stage |
| `offer` | Offer stage |
| `closed` | Withdrawn, rejected, expired or no longer pursuing |

The dashboard uses strong green APPLIED/gray CLOSED labels, a thicker crossed-out title, and excludes submitted/closed applications from the numbered priority queue. A prepared PDF or merged PR is **not** evidence of submission.

## Managing applications directly from the dashboard

Open https://waseemraza844.github.io/portfolio/develop/applications/ .

- **Add applications:** Click **+ Add applications** and paste one or several public job posting URLs, one per line. Institution, title, location, priority, target date, and queue rank are optional. A URL alone creates a Saved entry for research.
- **Submit / close:** Choose **✓ Mark applied** on a pending job card, or **Close** if no longer pursuing it. Submitted and closed jobs are distinctly marked and crossed out. Use **↶ Reopen** to undo a completed stage, and **Edit details** to correct fields.
- **Duplicates:** The dashboard checks normalized URLs, HigherEdJobs JobCodes, employer URLs, and saved alternate/canonical URLs. Duplicate links are skipped. If a posting is already tracked, the form shows its existing institution, title and status, with a shortcut to that card. The validator also rejects duplicate posting URLs in GitHub data.
- **Prioritize:** Pending cards show an ordinal number. A chosen **Queue rank** takes precedence; otherwise priority and target date determine ordering. Click **Show all pending** when more than five remain.
- **Keep the page tidy:** The priority queue remains open. **Already applied** and **All applications** are separate collapsed sections below it.
- **Automatic posting details:** After sync, GitHub Actions reads the public posting page and employer URL (if needed) for Schema.org `JobPosting` or basic page metadata. It may fill missing title, institution, location, employment type, date posted, a structured deadline and a short description. It preserves researched values and never guesses a deadline. Click **Refresh tracker** after the workflow finishes. This is page extraction, not a general web search; eligibility and document requirements still need manual/ChatGPT research.
- **Update details:** Change job title, institution, URL, priority, stage, application target date, employer deadline or next action in the same dashboard. Duplicate posting detection handles HigherEdJobs JobCode changes in the URL title.
- **Sync across devices:** Clicking a button **always updates your current browser first**, with unsynced updates saved in local browser storage. A banner warns about unsynced changes. Use **Connect GitHub** to commit those changes to \`develop\`. The dashboard reads the latest GitHub JSON when opened, and weekday reminders read the same file. **Browser-only edits are NOT reflected in reminders.**
- **GitHub authorization:** GitHub Pages has no server-side write access. Create a **fine-grained personal access token** for **only** \`WaseemRaza844/portfolio\` with **Contents: Read and write** permission at https://github.com/settings/personal-access-tokens/new . Paste it into the GitHub connection dialog **on the dashboard**, not in ChatGPT. It stays in the page's JavaScript memory for this tab only (not localStorage/sessionStorage); closing or refreshing the page disconnects it. You can revoke it from GitHub settings at any time. Use an expiration date and the minimum permissions. If you prefer not to use a token, browser-only edits remain local until you provide updates here or modify the GitHub JSON yourself.
- **Connection safety:** This is a public GitHub Pages site, not an authenticated private application. Do not paste sensitive personal information or credentials other than the explicitly requested fine-grained token into the tracker. A dedicated private database and OAuth-based authentication would be required for a fully private multi-device application.

When you have several postings, sending links in ChatGPT is still useful: I can research and fill the JD, documents, verified deadline and next action in bulk and merge the updates.

## Routine workflow with ChatGPT

1. **Capture:** Send a job posting URL (or several) in chat: "Add these three postings to my faculty tracker." I research them, deduplicate by stable ID/link, and add their requirements and next actions. Unknown dates stay `null`.
2. **Prioritize:** Tell me which applications you want to finish this week and your target dates. I update `priority` and `targetApplyBy`. The dashboard automatically reorders the next-five queue.
3. **Prepare:** Ask me to prepare documents for a specific job. The tracker records its application folder, document checklist, and status as `preparing` or `ready`.
4. **Submit:** Tell me "I submitted Princeton." Only then do I mark `submitted`, and enter `submittedAt` when you provide or confirm the date.
5. **Follow up:** Track interview, offer, closed, or reminder next actions, and keep the next-five list current.
6. **Publish:** I commit updates through a PR to `develop`, merge after validation by default, and provide the local pull/build commands.

A daily ChatGPT reminder can read the **live JSON file on `develop`** and summarize up to five pending applications and approaching target dates. The reminder does not edit GitHub by itself and does not submit applications.

## Data model

Each job has a stable `id`, `institution`, `title`, `location`, `type`, `status`, `priority`, `postingUrl`, `officialUrl`, `deadline`, `deadlineVerified`, `targetApplyBy`, `documents`, `documentsReady`, `applicationFolder`, `submittedAt`, `lastReviewed`, `nextAction`, and `notes`.

Use ISO `YYYY-MM-DD` dates. Enter `null` rather than guessing. `deadlineVerified: false` indicates a date sourced from secondary listings or not independently confirmed. `targetApplyBy` is a personal goal, not an employer deadline. Use the "Export CSV" button for a spreadsheet backup.

## Local usage (Windows PowerShell)

From the portfolio repository root:

```powershell
git switch develop
git pull --ff-only origin develop
python resume/job-applications/validate_tracker.py
node --check dist/applications/app.js
python -m http.server 8000 --directory dist
```

Then open http://localhost:8000/applications/ in your browser. Press `Ctrl+C` to stop the server.

To update manually, edit `dist/applications/jobs.json`, validate again and commit to `develop` (or open a PR). For routine updates, just send the links and status changes here in ChatGPT.

## Initial import (October 30, 2026)

- Lafayette: **submitted** (user-confirmed; exact submission date not provided)
- Princeton: **submitted** (user confirmed after preparing the documents; exact submission date not provided)
- New York Tech ECET: **researching** (original posting may be unavailable)
- Grove City: **researching** (important faith/pastoral requirements)
- San Mateo telecom instructor: **researching** (deadline requires official verification)

No invented submission dates or personal application confirmation identifiers are stored.
