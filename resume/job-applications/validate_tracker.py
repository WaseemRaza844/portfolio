#!/usr/bin/env python3
"""Validate the development portfolio's public-safe application tracker."""
import argparse
import json
import re
from datetime import date
from pathlib import Path
from urllib.parse import urlparse

DEFAULT = Path(__file__).resolve().parents[2] / "dist/applications/jobs.json"
STATUSES = {"saved", "researching", "preparing", "ready", "submitted", "interview", "offer", "closed"}
PRIORITIES = {"high", "medium", "low"}
DATE_FIELDS = ("deadline", "targetApplyBy", "submittedAt", "lastReviewed")


def validate(payload):
    errors = []
    jobs = payload.get("jobs", [])
    if payload.get("schemaVersion") != 1:
        errors.append("schemaVersion must be 1")
    if not isinstance(jobs, list):
        return ["jobs must be a list"]
    ids, URLs = set(), set()
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
        for k in DATE_FIELDS:
            value = j.get(k)
            if value is not None:
                try:
                    if date.fromisoformat(value).isoformat() != value:
                        raise ValueError
                except (ValueError, TypeError):
                    errors.append(f"{prefix}.{k} must be YYYY-MM-DD or null")
        for k in ("postingUrl", "officialUrl"):
            url = j.get(k)
            if url is not None:
                parts = urlparse(str(url))
                if parts.scheme != "https" or not parts.netloc:
                    errors.append(f"{prefix}.{k} must be a valid https URL")
                if "dossier.interfolio.com/facultysearch/applications" in str(url):
                    errors.append(f"{prefix}.{k}: never commit a personal Interfolio application URL")
        if j.get("postingUrl") in URLs:
            errors.append(f"{prefix}: duplicate postingUrl")
        URLs.add(j.get("postingUrl"))
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
