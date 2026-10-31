import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from enrich_postings import enrich_job, extract_posting_metadata


JOB_HTML = """<!doctype html>
<html><head>
<title>Faculty jobs | Example University</title>
<meta property="og:site_name" content="Example University">
<meta property="og:title" content="Lecturer in Computer Networking">
<meta name="description" content="Teach undergraduate networking and data systems courses.">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[]}
</script>
<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"JobPosting",
  "title":"Lecturer in Computer Networking",
  "datePosted":"2026-10-01",
  "validThrough":"2027-07-27T23:59:59-04:00",
  "employmentType":"PART_TIME",
  "hiringOrganization":{"@type":"Organization","name":"Example University"},
  "jobLocation":{"@type":"Place","address":{"@type":"PostalAddress","addressLocality":"Princeton","addressRegion":"NJ","addressCountry":"US"}},
  "description":"<p>Teach undergraduate computer networking and data information science.</p>"
}
</script>
</head><body>Job details</body></html>"""


class PostingEnrichmentTests(unittest.TestCase):
    def test_extracts_schema_job_posting_from_multiple_jsonld_scripts(self):
        data = extract_posting_metadata(JOB_HTML, "https://jobs.example.edu/lecturer")
        self.assertTrue(data["structuredJobPosting"])
        self.assertEqual(data["title"], "Lecturer in Computer Networking")
        self.assertEqual(data["institution"], "Example University")
        self.assertEqual(data["location"], "Princeton, NJ, US")
        self.assertEqual(data["deadline"], "2027-07-27")
        self.assertEqual(data["datePosted"], "2026-10-01")
        self.assertIn("computer networking", data["description"].lower())

    def test_enriches_only_placeholder_fields_and_preserves_researched_values(self):
        job = {
            "id": "job-1",
            "postingUrl": "https://jobs.example.edu/lecturer",
            "institution": "Not researched",
            "title": "Posting to research (jobs.example.edu)",
            "location": "Not specified",
            "type": "Faculty / teaching (unverified)",
            "deadline": None,
            "deadlineVerified": False,
            "enrichmentStatus": "pending",
        }
        enriched, changed = enrich_job(job, fetcher=lambda url: (JOB_HTML, url), today="2026-10-31")
        self.assertTrue(changed)
        self.assertEqual(enriched["institution"], "Example University")
        self.assertEqual(enriched["title"], "Lecturer in Computer Networking")
        self.assertEqual(enriched["location"], "Princeton, NJ, US")
        self.assertEqual(enriched["type"], "PART_TIME")
        self.assertEqual(enriched["deadline"], "2027-07-27")
        self.assertTrue(enriched["deadlineVerified"])
        self.assertEqual(enriched["enrichmentStatus"], "complete")
        self.assertEqual(enriched["enrichedAt"], "2026-10-31")

        job["institution"] = "Manually researched University"
        job["deadline"] = "2027-06-30"
        job["deadlineVerified"] = False
        preserved, _ = enrich_job(job, fetcher=lambda url: (JOB_HTML, url), today="2026-10-31")
        self.assertEqual(preserved["institution"], "Manually researched University")
        self.assertEqual(preserved["deadline"], "2027-07-27")
        self.assertTrue(preserved["deadlineVerified"])

    def test_non_pending_record_is_not_fetched_or_changed(self):
        job = {"id": "done", "enrichmentStatus": "complete"}
        enriched, changed = enrich_job(job, fetcher=lambda url: self.fail("must not fetch"))
        self.assertIs(enriched, job)
        self.assertFalse(changed)

    def test_fetch_failure_is_flagged_without_guessing_a_deadline(self):
        job = {
            "id": "job-2",
            "postingUrl": "https://jobs.example.edu/private",
            "institution": "Not researched",
            "title": "Posting to research",
            "location": "Not specified",
            "type": "Faculty / teaching (unverified)",
            "deadline": None,
            "deadlineVerified": False,
            "enrichmentStatus": "pending",
        }
        enriched, changed = enrich_job(
            job, fetcher=lambda url: (_ for _ in ()).throw(OSError("connection refused")),
            today="2026-10-31"
        )
        self.assertTrue(changed)
        self.assertEqual(enriched["enrichmentStatus"], "failed")
        self.assertIsNone(enriched["deadline"])
        self.assertFalse(enriched["deadlineVerified"])


if __name__ == "__main__":
    unittest.main()
