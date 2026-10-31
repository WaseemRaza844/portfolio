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

The dashboard crosses out submitted/finished applications and excludes them from the next-five queue. A prepared PDF or merged PR is **not** evidence of submission.

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
- Princeton: **preparing** (documents ready; actual submission unconfirmed)
- New York Tech ECET: **researching** (original posting may be unavailable)
- Grove City: **researching** (important faith/pastoral requirements)
- San Mateo telecom instructor: **researching** (deadline requires official verification)

No invented submission dates or personal application confirmation identifiers are stored.
