# Lafayette College — Assistant Professor of Electrical & Computer Engineering

**Application cycle:** 2027–28  
**Institution:** Lafayette College, Easton, Pennsylvania  
**Application portal:** https://apply.interfolio.com/189650

All materials for this application are kept together in this folder. There are no nested document/source/Word folders.

## Application materials

| Material | Editable Markdown source | Editable Word document |
| --- | --- | --- |
| Tailored academic CV | Generated from [variant.json](variant.json) | [PDF](Waseem_Raza_FACULTY_LAFAYETTE_COLLEGE_ASSISTANT_PROFESSOR_ECE.pdf) |
| Cover letter | [01_Lafayette_Cover_Letter.md](01_Lafayette_Cover_Letter.md) | [01_Lafayette_Cover_Letter.docx](01_Lafayette_Cover_Letter.docx) |
| Teaching interests and philosophy | [02_Lafayette_Teaching_Statement.md](02_Lafayette_Teaching_Statement.md) | [02_Lafayette_Teaching_Statement.docx](02_Lafayette_Teaching_Statement.docx) |
| Research statement and undergraduate engagement plan | [03_Lafayette_Research_Statement.md](03_Lafayette_Research_Statement.md) | [03_Lafayette_Research_Statement.docx](03_Lafayette_Research_Statement.docx) |
| Three professional references | [04_Lafayette_Professional_References_Template.md](04_Lafayette_Professional_References_Template.md) | [04_Lafayette_Professional_References_Template.docx](04_Lafayette_Professional_References_Template.docx) |
| Application checklist | [05_Lafayette_Application_Checklist.md](05_Lafayette_Application_Checklist.md) | [05_Lafayette_Application_Checklist.docx](05_Lafayette_Application_Checklist.docx) |

Additional planning notes: [application-plan.md](application-plan.md).

## Editing

- To edit in GitHub, open a Markdown source, select the pencil icon, make changes, and commit. The **Build resume PDFs and application documents** workflow regenerates the Word file.
- To edit with full Word formatting in a browser, download the DOCX and open it in Word for the web through OneDrive. Changes made in Word are not synchronized back into the Markdown source; if the Markdown is later changed, the DOCX is regenerated from that source.
- The reference template intentionally contains blank fields. Add only real referees who have agreed to be listed.

## Build

From the repository root:

```bash
python resume/build.py --variant faculty_lafayette_college_assistant_professor_ece
python resume/build_application_documents.py
python resume/validate_pdf_layout.py
```

The tailored CV PDF is generated directly in this folder. All five DOCX files are generated beside their corresponding Markdown sources.
