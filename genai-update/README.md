# GenAI certificate update

Extract this folder into your portfolio root, alongside dist/ and resume/.
Run from that root in PowerShell or Codespaces:

```sh
python genai-update/apply_update.py
npm run dev
```

The updater backs up certifications.js, preserves unrelated records (including
your recent cloud/cybersecurity edits), and copies four original uploaded PDFs.
It stops if expected old constant names/region markers are missing or a different
PDF exists at a destination. It is a one-time updater; edit certifications.js
directly afterward. No other website file or resume configuration is changed.

## Grouped constants

| Constant | Record ID | Courses / award date |
|---|---|---|
| CERT_GENAI_01_AWS_BEDROCK | aws-bedrock-professional | Your current data preserved |
| CERT_GENAI_02_IBM_GENAI_ENGINEERING | ibm-genai-engineering | Your current data preserved |
| CERT_GENAI_03_IBM_RAG_AGENTIC_AI | ibm-rag-agentic-ai | 8/8; February 14, 2026 |
| CERT_GENAI_04_FUNDAMENTALS | genai-fundamentals | 5/5; July 16, 2026 |
| CERT_GENAI_05_BUILDING_AI_AGENTS | ibm-building-ai-agents | 3/3; February 14, 2026 |
| CERT_GENAI_06_RAG_APPLICATIONS | ibm-rag-generative-ai-applications | 4/4; March 21, 2026 |

All six declarations are grouped together and registered first. The four
PDF-backed records are published and featured, with generic/genai eligibility;
existing additional profile assignments on updated records are retained.
AWS and IBM Engineering visibility and content are preserved from your file.
Constant names do not control display order: the registration array does.
Domain order remains in dist/data/domain-areas.js.

GenAI Fundamentals replaces the incorrect three-course list with the five titles
on your award. RAG uses its eight awarded courses, not the two later curriculum
additions. Those later entries remain recoverable from your backup.
The two specializations share courses with the professional certificate; this is
expected and does not represent additional unique courses.

Individual course dates, module counts, and individual credential URLs are not
specified by these specialization PDFs. Course status is Completed; exact course
dates are not inferred from award dates. Existing RAG course links are retained.
Professional/specialization PDF and verification links are included. Course PDF
fields without supplied files are blank; no specialization PDF is mislabeled as
an individual course certificate.

## New selections

The Learning archive uses the registration array. If a variant homepage uses
an explicit certificationIds list in dist/data/profile-data.js, add:

```js
"ibm-building-ai-agents",
"ibm-rag-generative-ai-applications"
```

Add those same IDs to resume/variants.json only for resumes where desired.
Existing IDs have not changed. To hide a record, set published: false; featured:
false only removes it from featured views. Public source/PDF files remain public.

## PDF locations after applying

- dist/certificates/genai/ibm-building-ai-agents/ibm-building-ai-agents.pdf
- dist/certificates/genai/ibm-rag-applications/ibm-rag-applications.pdf
- dist/certificates/genai/ibm-genai-fundamentals/ibm-genai-fundamentals.pdf
- dist/certificates/genai/ibm-rag-agentic-ai/ibm-rag-agentic-ai-professional-certificate.pdf

Check PDF previews and the four course lists locally, then review and commit the
intended dist/ changes. Do not commit the temporary updater or backup folder.
No deployment has been performed by this package.
