# Lafayette College ECE — editable application documents

This folder preserves the **five Word application documents** and a text source for each one. It belongs only to the 2027–28 Lafayette College Assistant Professor of ECE application. The faculty CV remains separately generated at `resume/output/faculty/Waseem_Raza_FACULTY_LAFAYETTE_COLLEGE_ASSISTANT_PROFESSOR_ECE.pdf`.

| Material | Edit text in GitHub | Download/edit in Word |
| --- | --- | --- |
| Cover letter | [Markdown](source/01_Lafayette_Cover_Letter.md) | [DOCX](word/01_Lafayette_Cover_Letter.docx) |
| Teaching philosophy | [Markdown](source/02_Lafayette_Teaching_Statement.md) | [DOCX](word/02_Lafayette_Teaching_Statement.docx) |
| Research statement | [Markdown](source/03_Lafayette_Research_Statement.md) | [DOCX](word/03_Lafayette_Research_Statement.docx) |
| References template | [Markdown](source/04_Lafayette_Professional_References_Template.md) | [DOCX](word/04_Lafayette_Professional_References_Template.docx) |
| Application checklist | [Markdown](source/05_Lafayette_Application_Checklist.md) | [DOCX](word/05_Lafayette_Application_Checklist.docx) |

## Editing directly in GitHub (web browser)

1. Open a `source/*.md` file from the table.
2. Click the pencil **Edit this file**, modify the text, then **Commit changes** to `develop` (or open a PR).
3. The **Build Lafayette application Word files** workflow regenerates all five `word/*.docx` documents automatically. On `develop`, the updated Word files are committed by GitHub Actions. You can then download the latest file or its Actions artifact.

GitHub edits the **Markdown text** in the browser. **It does not offer full in-browser Word-format (.docx) editing.** For Word's familiar rich editor, upload a DOCX to OneDrive, open it with **Word for the web**, and save your changes there. To keep the GitHub copy synchronized, either apply those edits to the Markdown source and rebuild, or upload the revised DOCX back to this repository (a future rebuild from Markdown will overwrite direct DOCX edits).

## Local generation

```bash
python -m pip install python-docx==1.2.0
python resume/faculty/tailored/lafayette-college-assistant-professor-ece/documents/build_documents.py
```

Word outputs are regenerated from `source/` Markdown. The compact `source.seed.part*.txt` snapshots are only for the initial import/recovery; **edit the Markdown, not these seed files**.

## Before sending to Lafayette

- Confirm the cover letter date, personal examples, teaching claims, and names of three references.
- Fill the references template with **real, consenting contacts**. No referees are invented.
- The search requests a cover letter, CV, teaching philosophy/interests statement, research statement with plans to involve undergraduates, and three professional references. Confidential recommendation letters are requested later from invited interview candidates.
- Apply at https://apply.interfolio.com/189650 and follow the portal's document-format requirements.
- These are working drafts; edit and proofread before uploading.

**Security:** Avoid adding sensitive immigration documents, identification numbers, or unredacted recommendation letters to this repository.
