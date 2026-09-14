# Wireless certificates update

Extract wireless-update beside dist/ and resume/. From the portfolio root run:

```sh
python wireless-update/apply_update.py
npm run dev
```

Preview http://localhost:8000/learning.html and
http://localhost:8000/learning.html?profile=wireless on your local computer.
In Codespaces use the port 8000 forwarded address with the same paths.

The script appends grouped CERT_WIRELESS records to your current certifications.js,
preserving previous edits. It backs up changed files, checks conflicting PDF files,
and avoids a duplicate Wireless domain. Your existing domain label/order is kept.
If Wireless is absent, it is appended. Move its definition in domain-areas.js to
change its order (when moving the fallback definition, remove the fallback block).

Three records are published and featured for generic, wireless, and faculty:

| ID | Credential | Completion |
|---|---|---|
| ai-for-telecommunications | AI for Telecommunications, AI CERTs | June 29, 2026; 3/3 courses |
| 4g-network-fundamentals | 4G Network Fundamentals, Institut Mines-Télécom | August 2, 2026; standalone course |
| business-considerations-5g-edge-iot-ai | Business Considerations for 5G with Edge, IoT, and AI, EDUCBA | February 19, 2026; standalone course |

AI specialization courses: AI Foundations & Industry Overview for Telecommunication
(June 20); Network and Security Optimization in Telecommunication (June 20);
Customer Experience in Telecommunication (June 29), all 2026.

Standalone course awards use one nested course each to fit your current accordion
renderer; they are not described as professional certificates. All dates and
verification URLs were extracted from the uploaded PDFs. Brief descriptions/skill
labels summarize the award titles and specialization description, not a verified
full syllabus. Module counts are omitted since the certificates do not state them.

Six exact PDF filenames are copied into dist/certificates/wireless/. Do not rename
them without updating certificateUrl. Each course has its own links.coursera and
certificateUrl. The parent credentials also have links.coursera.

## Where to edit later

- dist/data/certifications.js: search CERT_WIRELESS_. Edit these appended records,
  not the updater's source copy. The wirelessRecords array controls their order.
- Set published: false to hide a record; featured: false removes featured eligibility.
- dist/data/domain-areas.js: domain title/description/order.
- dist/data/profile-data.js: the appended Wireless block adds IDs to existing
  generic/wireless/faculty certificationIds arrays. Edit its keys/IDs to adjust.
  It does not create missing variant routes, and does not add Wireless to GenAI.
- Existing generic homepage rendering of featured certifications includes these.
- Resume selections are unchanged; add the three IDs in resume/variants.json if wanted.

## Course Coursera links with older renderers

PDF previews use existing certificateUrl handling. If your renderer does not show
links.coursera inside course details, edit dist/render.js, within courseAccordion.
Immediately before this existing expression:

```js
pdfDocument(course.certificateUrl, "course certificate")
```

insert this expression (including the trailing plus):

```js
(course.links?.coursera
  ? '<div class="credential-links">' + externalLinks({ coursera: course.links.coursera }) + '</div>'
  : '') +
```

Only add this if course links are not already rendered. It uses the existing
externalLinks helper in the project copy reviewed here. The updater does not
overwrite render.js because your newer PDF-preview edits must be retained.

Review previews and Source Control, then commit the intended dist/ files and push.
Keep the temporary updater and backup folder out of the commit. This package does
not publish your site or modify your resume configuration.
