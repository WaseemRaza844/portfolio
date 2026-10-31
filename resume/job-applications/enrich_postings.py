#!/usr/bin/env python3
"""Extract public job-posting metadata for newly added tracker records.

This is deliberately conservative: it reads the supplied public posting URL,
prefers Schema.org JobPosting data, and never guesses a deadline or overwrites
fields already researched by the applicant or ChatGPT.
"""
from __future__ import annotations

import argparse
import datetime as dt
import ipaddress
import json
import re
import socket
import sys
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse, urljoin
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[2]
DEFAULT_PATH = ROOT / "dist/applications/jobs.json"
MAX_BYTES = 1_500_000
TIMEOUT_SECONDS = 15
USER_AGENT = "Mozilla/5.0 (compatible; FacultyApplicationTracker/1.0; +https://github.com/WaseemRaza844/portfolio)"
JOB_BOARD_HOSTS = (
    "higheredjobs.com", "indeed.com", "linkedin.com", "glassdoor.com",
    "ziprecruiter.com", "academicpositions.com", "jobs.ac.uk", "careerbuilder.com",
)


class PostingHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.meta: dict[str, str] = {}
        self.title_parts: list[str] = []
        self.jsonld_parts: list[str] = []
        self.jsonld_scripts: list[str] = []
        self._in_title = False
        self._in_jsonld = False
        self.canonical = ""

    def handle_starttag(self, tag, attrs):
        attrs = {key.lower(): value or "" for key, value in attrs}
        if tag.lower() == "meta":
            key = (attrs.get("property") or attrs.get("name") or attrs.get("itemprop") or "").lower()
            value = attrs.get("content", "").strip()
            if key and value:
                self.meta[key] = value
        elif tag.lower() == "title":
            self._in_title = True
        elif tag.lower() == "link" and "canonical" in attrs.get("rel", "").lower().split():
            self.canonical = attrs.get("href", "").strip()
        elif tag.lower() == "script" and "ld+json" in attrs.get("type", "").lower():
            self._in_jsonld = True
            self.jsonld_parts = []

    def handle_endtag(self, tag):
        if tag.lower() == "title":
            self._in_title = False
        elif tag.lower() == "script" and self._in_jsonld:
            self.jsonld_scripts.append("".join(self.jsonld_parts))
            self._in_jsonld = False

    def handle_data(self, data):
        if self._in_title:
            self.title_parts.append(data)
        if self._in_jsonld:
            self.jsonld_parts.append(data)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)


def clean_text(value: object, limit: int = 1800) -> str:
    if value is None:
        return ""
    text = unescape(str(value))
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text[:limit]


def _walk_json(value):
    if isinstance(value, list):
        for item in value:
            yield from _walk_json(item)
    elif isinstance(value, dict):
        yield value
        for child in value.values():
            if isinstance(child, (dict, list)):
                yield from _walk_json(child)


def _job_postings(parser: PostingHTMLParser):
    for raw in parser.jsonld_scripts:
        try:
            payload = json.loads(raw)
        except (json.JSONDecodeError, TypeError):
            continue
        for node in _walk_json(payload):
            types = node.get("@type", [])
            if isinstance(types, str):
                types = [types]
            if any(str(value).lower().endswith("jobposting") for value in types):
                yield node


def _first(value):
    if isinstance(value, list):
        return _first(value[0]) if value else None
    return value


def _location(value) -> str:
    entries = value if isinstance(value, list) else [value]
    result = []
    for entry in entries:
        if not isinstance(entry, dict):
            continue
        address = entry.get("address", entry)
        if isinstance(address, list):
            address = _first(address)
        if isinstance(address, dict):
            parts = [
                address.get("addressLocality"),
                address.get("addressRegion"),
                address.get("postalCode"),
                address.get("addressCountry"),
            ]
            text = ", ".join(str(part).strip() for part in parts if part)
            if text and text not in result:
                result.append(text)
    return "; ".join(result)


def _date_only(value) -> str | None:
    if not value:
        return None
    text = str(value).strip()
    try:
        if len(text) == 10:
            return dt.date.fromisoformat(text).isoformat()
        return dt.datetime.fromisoformat(text.replace("Z", "+00:00")).date().isoformat()
    except ValueError:
        return None


def extract_posting_metadata(html: str, source_url: str = "") -> dict:
    """Extract structured job data and conservative Open Graph fallbacks."""
    parser = PostingHTMLParser()
    parser.feed(html or "")
    parser.close()

    result = {
        "title": "",
        "institution": "",
        "location": "",
        "employmentType": "",
        "deadline": None,
        "datePosted": None,
        "description": "",
        "canonicalUrl": urljoin(source_url, parser.canonical) if parser.canonical else source_url,
        "pageTitle": clean_text(" ".join(parser.title_parts), 300),
        "pageDescription": clean_text(parser.meta.get("description") or parser.meta.get("og:description"), 1000),
        "siteName": clean_text(parser.meta.get("og:site_name"), 160),
        "structuredJobPosting": False,
    }

    posting = next(iter(_job_postings(parser)), None)
    if posting:
        result["structuredJobPosting"] = True
        result["title"] = clean_text(posting.get("title"), 240)
        organization = posting.get("hiringOrganization")
        if isinstance(organization, list):
            organization = _first(organization)
        if isinstance(organization, dict):
            result["institution"] = clean_text(organization.get("name"), 200)
        result["location"] = _location(posting.get("jobLocation") or posting.get("jobLocationType"))
        employment = posting.get("employmentType")
        if isinstance(employment, list):
            employment = ", ".join(str(x) for x in employment)
        result["employmentType"] = clean_text(employment, 120)
        result["deadline"] = _date_only(posting.get("validThrough"))
        result["datePosted"] = _date_only(posting.get("datePosted"))
        result["description"] = clean_text(posting.get("description"), 1800)

    # Open Graph fallbacks are useful for a summary, but generic job-board
    # branding is never mistaken for the hiring institution.
    if not result["title"]:
        result["title"] = clean_text(parser.meta.get("og:title"), 240)
    if not result["description"]:
        result["description"] = result["pageDescription"]
    host = (urlparse(source_url).hostname or "").lower().removeprefix("www.")
    is_job_board = any(host == domain or host.endswith("." + domain) for domain in JOB_BOARD_HOSTS)
    if not result["institution"] and result["siteName"] and not is_job_board:
        result["institution"] = result["siteName"]
    return result


def _validate_public_url(url: str) -> None:
    parsed = urlparse(str(url or ""))
    host = (parsed.hostname or "").lower()
    if parsed.scheme != "https" or not host or parsed.username or parsed.password:
        raise ValueError("Only public HTTPS posting URLs can be fetched.")
    if host in {"localhost", "metadata.google.internal"} or host.endswith((".local", ".internal")):
        raise ValueError("Private or local hostnames are not allowed.")
    if host == "dossier.interfolio.com":
        raise ValueError("Private Interfolio applicant links are not allowed.")
    try:
        address = ipaddress.ip_address(host)
        if not address.is_global:
            raise ValueError("Private or reserved IP addresses are not allowed.")
    except ValueError as exc:
        if "not allowed" in str(exc):
            raise
        # A non-IP hostname is expected.
    # Check DNS answers before fetching to avoid internal-network destinations.
    try:
        addresses = {item[4][0] for item in socket.getaddrinfo(host, 443, type=socket.SOCK_STREAM)}
        if addresses and any(not ipaddress.ip_address(item).is_global for item in addresses):
            raise ValueError("Posting host resolves to a private or reserved address.")
    except socket.gaierror:
        # The actual request will report an ordinary DNS failure.
        pass


def fetch_posting_page(url: str) -> tuple[str, str]:
    _validate_public_url(url)
    request = Request(url, headers={
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml;q=0.9,*/*;q=0.5",
    })
    with urlopen(request, timeout=TIMEOUT_SECONDS) as response:
        final_url = response.geturl()
        _validate_public_url(final_url)
        content_type = response.headers.get("Content-Type", "").lower()
        if content_type and "html" not in content_type and "text/" not in content_type:
            raise ValueError("The posting URL did not return an HTML page.")
        raw = response.read(MAX_BYTES + 1)
        if len(raw) > MAX_BYTES:
            raw = raw[:MAX_BYTES]
        charset = response.headers.get_content_charset() or "utf-8"
        return raw.decode(charset, errors="replace"), final_url


def _placeholder(value: str, expected: str) -> bool:
    return not value or value.strip().lower() == expected.lower()


def enrich_job(job: dict, fetcher=fetch_posting_page, today: str | None = None) -> tuple[dict, bool]:
    """Enrich only records explicitly marked pending; preserve researched fields."""
    if job.get("enrichmentStatus") != "pending":
        return job, False
    updated = dict(job)
    try:
        last_error = None
        best = None
        best_score = -1
        candidates = list(dict.fromkeys([job.get("postingUrl"), job.get("officialUrl")]))
        for candidate in candidates:
            if not candidate:
                continue
            try:
                html, final_url = fetcher(candidate)
                metadata_candidate = extract_posting_metadata(html, final_url)
                score = (
                    10 * int(metadata_candidate["structuredJobPosting"])
                    + 3 * int(bool(metadata_candidate["institution"]))
                    + 2 * int(bool(metadata_candidate["title"]))
                    + 2 * int(bool(metadata_candidate["location"]))
                    + 2 * int(bool(metadata_candidate["deadline"]))
                    + int(bool(metadata_candidate["description"]))
                )
                if score > best_score:
                    best = (html, final_url, metadata_candidate)
                    best_score = score
                if metadata_candidate["structuredJobPosting"]:
                    break
            except (HTTPError, URLError, TimeoutError, ValueError, OSError) as exc:
                last_error = exc
        if best is None:
            raise last_error or ValueError("No public posting URL was available.")
        html, final_url, metadata = best
        if _placeholder(updated.get("title", ""), "Posting to research") or updated.get("title", "").startswith("Posting to research ("):
            if metadata["title"] and metadata["title"].lower() not in {"jobs", "careers", "job search"}:
                updated["title"] = metadata["title"]
        if _placeholder(updated.get("institution", ""), "Not researched") and metadata["institution"]:
            updated["institution"] = metadata["institution"]
        if _placeholder(updated.get("location", ""), "Not specified") and metadata["location"]:
            updated["location"] = metadata["location"]
        if _placeholder(updated.get("type", ""), "Faculty / teaching (unverified)") and metadata["employmentType"]:
            updated["type"] = metadata["employmentType"]
        if metadata["deadline"] and (not updated.get("deadline") or not updated.get("deadlineVerified", False)):
            updated["deadline"] = metadata["deadline"]
            updated["deadlineVerified"] = True
        if metadata["datePosted"]:
            updated["datePosted"] = metadata["datePosted"]
        if metadata["description"]:
            updated["postingDescription"] = metadata["description"]
        canonical = metadata.get("canonicalUrl")
        if canonical and canonical.startswith("https://") and canonical != job.get("postingUrl"):
            updated["alternateUrls"] = list(dict.fromkeys(
                [*(updated.get("alternateUrls") or []), canonical]
            ))
        if metadata["structuredJobPosting"]:
            updated["enrichmentStatus"] = "complete"
            updated["enrichmentMessage"] = (
                "Structured JobPosting data extracted from the public posting page. "
                "Review the details and verify required documents before applying."
            )
        elif metadata["title"] or metadata["description"] or metadata["siteName"]:
            updated["enrichmentStatus"] = "partial"
            updated["enrichmentMessage"] = (
                "Basic page metadata extracted. Institution, deadline, eligibility, and required documents "
                "may still need manual verification."
            )
        else:
            updated["enrichmentStatus"] = "partial"
            updated["enrichmentMessage"] = (
                "The page opened, but it did not expose usable job details. Manual research is still needed."
            )
        updated["enrichmentSource"] = final_url
        updated["enrichedAt"] = today or dt.datetime.now(dt.timezone.utc).date().isoformat()
    except (HTTPError, URLError, TimeoutError, ValueError, OSError) as exc:
        updated["enrichmentStatus"] = "failed"
        updated["enrichmentMessage"] = (
            "Automatic page extraction could not access this posting (" +
            clean_text(str(exc), 180) + "). Research the link manually."
        )
        updated["enrichedAt"] = today or dt.datetime.now(dt.timezone.utc).date().isoformat()
    return updated, updated != job


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("path", nargs="?", type=Path, default=DEFAULT_PATH)
    args = parser.parse_args()
    payload = json.loads(args.path.read_text(encoding="utf-8"))
    changed = 0
    for index, job in enumerate(payload.get("jobs", [])):
        if job.get("enrichmentStatus") is None and job.get("status") in {"saved", "researching", "preparing", "ready"}:
            job = dict(job)
            job["enrichmentStatus"] = "pending"
            job["enrichmentMessage"] = "Queued for public posting-page metadata extraction."
        if job.get("enrichmentStatus") != "pending":
            continue
        updated, did_change = enrich_job(job)
        payload["jobs"][index] = updated
        changed += int(did_change)
        print(f"{updated.get('institution')} | {updated.get('title')} | {updated.get('enrichmentStatus')}")
    if changed:
        payload["asOf"] = dt.datetime.now(dt.timezone.utc).date().isoformat()
        args.path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Enriched {changed} pending posting(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
