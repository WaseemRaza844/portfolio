#!/usr/bin/env python3
"""Validate the development portfolio's public-safe application tracker."""
import argparse
import json
import re
from datetime import date
from pathlib import Path
from urllib.parse import urlparse, urlunparse, parse_qsl, urlencode

DEFAULT = Path(__file__).resolve().parents[2] / "dist/applications/jobs.json"
STATUSES = {"saved", "researching", "preparing", "ready", "submitted", "interview", "offer", "closed"}
PRIORITIES = {"high", "medium", "low"}
DATE_FIELDS = ("deadline", "targetApplyBy", "submittedAt", "lastReviewed", "datePosted")
ENRICHMENT_STATES = {"pending", "complete", "partial", "failed"}


def canonical_job_url(value):
    try:
        parts = urlparse(str(value or ""))
        if parts.scheme != "https" or not parts.hostname:
            return ""
        host = parts.hostname.lower().removeprefix("www.")
        query = [(k, v) for k, v in parse_qsl(parts.query, keep_blank_values=True)
                 if not (k.lower().startswith("utm_") or k.lower() in {"fbclid", "gclid", "ref", "referrer"})
                 and not (host.endswith("higheredjobs.com") and k.lower() == "title")]
        if host.endswith("higheredjobs.com"):
            job_code = next((v for k, v in query if k.lower() == "jobcode"), None)
            if job_code:
                return "higheredjobs:" + job_code.lower()
        path = parts.path.rstrip("/") or "/"
        return urlunparse(("https", host, path, "", urlencode(sorted(query)), "")).rstrip("/")
    except (TypeError, ValueError):
        return ""


def validate(payload):
    errors = []
    jobs = payload.get("jobs", [])
    if payload.get("schemaVersion") != 1:
        errors.append("schemaVersion must be 1")
    if not isinstance(jobs, list):
        return ["jobs must be a list"]
    ids, URLs = set(), {}
    for i, j in enumerate(jobs):
        prefix = f"jobs[{i}]"
        if not isinstance(j, dict):
            errors.append(prefix + " must be an object")
            continue
        for k in ["id", "institution", "title", "location", "status", "priority", "postingUrl", "nextAction"]:
            if not isinstance(j.get(k), str) or not j[k].strip():
                errors.append(f"{prefix}.{k} is required")
        job_id = j.get("id", "")
        if not re.fullmatch(r"[a-z0-9][a-z0-9-]+", str(job_id)):
            errors.append(prefix + ".id must be a kebab-case stable identifier")
        if job_id in ids:
            errors.append(f"duplicate id: {job_id}")
        ids.add(job_id)
        if j.get("status") not in STATUSES:
            errors.append(f"{prefix}.status is invalid")
        if j.get("priority") not in PRIORITIES:
            errors.append(f"{prefix}.priority is invalid")
        rank = j.get("rank")
        if rank is not None and (type(rank) is not int or not 1 <= rank <= 999):
            errors.append(f"{prefix}.rank must be 1..999 or null")
        for k in DATE_FIELDS:
            value = j.get(k)
            if value is not None:
                try:
                    if date.fromisoformat(value).isoformat() != value:
                        raise ValueError
                except (ValueError, TypeError):
                    errors.append(f"{prefix}.{k} must be YYYY-MM-DD or null")
        aliases = j.get("alternateUrls", [])
        if not isinstance(aliases, list):
            errors.append(f"{prefix}.alternateUrls must be a list")
            aliases = []
        url_fields = [("postingUrl", j.get("postingUrl")), ("officialUrl", j.get("officialUrl"))]
        url_fields += [("alternateUrls", value) for value in aliases]
        for k, url in url_fields:
            if url is not None:
                parts = urlparse(str(url))
                if parts.scheme != "https" or not parts.netloc:
                    errors.append(f"{prefix}.{k} must be a valid https URL")
                if "dossier.interfolio.com/facultysearch/applications" in str(url):
                    errors.append(f"{prefix}.{k}: never commit a personal Interfolio application URL")
                key = canonical_job_url(url)
                if key and key in URLs and URLs[key] != job_id:
                    errors.append(f"{prefix}: duplicate job posting URL already belongs to {URLs[key]}")
                elif key:
                    URLs[key] = job_id
        if j.get("enrichmentStatus") is not None and j.get("enrichmentStatus") not in ENRICHMENT_STATES:
            errors.append(f"{prefix}.enrichmentStatus is invalid")
        if j.get("deadlineSource") is not None and not isinstance(j.get("deadlineSource"), str):
            errors.append(f"{prefix}.deadlineSource must be text or null")
        if j.get("postingDescription") is not None and (
            not isinstance(j.get("postingDescription"), str) or len(j["postingDescription"]) > 3000
        ):
            errors.append(f"{prefix}.postingDescription must be text up to 3000 characters")
        if not isinstance(j.get("documents"), list):
            errors.append(f"{prefix}.documents must be a list")
        if not isinstance(j.get("documentsReady"), bool):
            errors.append(f"{prefix}.documentsReady must be boolean")
        if not isinstance(j.get("deadlineVerified"), bool):
            errors.append(f"{prefix}.deadlineVerified must be boolean")
        if j.get("submittedAt") and j.get("status") not in {"submitted", "interview", "offer", "closed"}:
            errors.append(f"{prefix}: submittedAt requires a completed status")
        for private_key in ("applicantEmail", "referenceEmail", "phone", "confirmationNumber", "password", "visaStatus"):
            if private_key in j:
                errors.append(f"{prefix}: private data key {private_key} is forbidden")
        folder = j.get("applicationFolder")
        if folder is not None and (not folder.startswith("resume/job-applications/") or ".." in folder):
            errors.append(f"{prefix}.applicationFolder must be an internal application folder")
    return errors


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("path", nargs="?", type=Path, default=DEFAULT)
    args = p.parse_args()
    payload = json.loads(args.path.read_text(encoding="utf-8"))
    errors = validate(payload)
    if errors:
        for item in errors:
            print("ERROR:", item)
        raise SystemExit(1)
    active = sum(job["status"] not in {"submitted", "interview", "offer", "closed"} for job in payload["jobs"])
    print(f"Tracker valid: {len(payload['jobs'])} positions; {active} pending.")


if __name__ == "__main__":
    main()
