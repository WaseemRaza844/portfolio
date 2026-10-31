"use strict";
/* Pure tracker helpers shared by the dashboard and Node tests. */
(function (root) {
  const ACTIVE = new Set(["saved", "researching", "preparing", "ready"]);
  const SUBMITTED = new Set(["submitted", "interview", "offer"]);
  const FINISHED = new Set(["submitted", "interview", "offer", "closed"]);
  const PRIORITIES = { high: 0, medium: 1, low: 2 };
  const STAGE = { ready: 0, preparing: 1, researching: 2, saved: 3 };

  function cleanUrl(url) {
    try {
      const u = new URL(String(url || "").trim());
      if (u.protocol !== "https:" && u.protocol !== "http:") return "";
      u.hash = "";
      for (const key of [...u.searchParams.keys()]) {
        if (/^(utm_|fbclid$|gclid$|mc_)/i.test(key) ||
            (u.hostname.endsWith("higheredjobs.com") && key.toLowerCase() === "title")) {
          u.searchParams.delete(key);
        }
      }
      u.hostname = u.hostname.toLowerCase();
      u.pathname = u.pathname.replace(/\/+$/, "") || "/";
      return u.toString();
    } catch (_) { return ""; }
  }
  function jobKey(url) {
    const canonical = cleanUrl(url);
    if (!canonical) return "";
    const u = new URL(canonical);
    const code = u.searchParams.get("JobCode") || u.searchParams.get("jobcode");
    if (u.hostname.endsWith("higheredjobs.com") && code) return "higheredjobs:" + code.toLowerCase();
    return canonical.replace(/^http:/, "https:").replace(/\/$/, "");
  }
  function samePosting(a, b) {
    const x = jobKey(a), y = jobKey(b);
    return !!x && x === y;
  }
  function pending(job) { return ACTIVE.has(job.status); }
  function submitted(job) { return SUBMITTED.has(job.status); }
  function done(job) { return FINISHED.has(job.status); }
  function prioritySort(a, b) {
    const ar = Number.isInteger(a.rank) && a.rank > 0 ? a.rank : Infinity;
    const br = Number.isInteger(b.rank) && b.rank > 0 ? b.rank : Infinity;
    if (ar !== br) return ar - br;
    const p = (PRIORITIES[a.priority] ?? 3) - (PRIORITIES[b.priority] ?? 3);
    if (p) return p;
    const ad = a.targetApplyBy || a.deadline || "9999-99-99";
    const bd = b.targetApplyBy || b.deadline || "9999-99-99";
    if (ad !== bd) return ad.localeCompare(bd);
    const stage = (STAGE[a.status] ?? 10) - (STAGE[b.status] ?? 10);
    if (stage) return stage;
    return a.institution.localeCompare(b.institution) || a.id.localeCompare(b.id);
  }
  function applyOperations(source, operations) {
    const copy = JSON.parse(JSON.stringify(source));
    if (!Array.isArray(copy.jobs)) throw new Error("Invalid tracker payload");
    for (const op of operations) {
      if (op.type === "add") {
        if (!copy.jobs.some(j => j.id === op.job.id || samePosting(j.postingUrl, op.job.postingUrl))) {
          copy.jobs.push(JSON.parse(JSON.stringify(op.job)));
        }
      } else if (op.type === "update") {
        const index = copy.jobs.findIndex(j => j.id === op.jobId);
        if (index >= 0) {
          const patch = JSON.parse(JSON.stringify(op.patch));
          delete patch.id;
          copy.jobs[index] = Object.assign({}, copy.jobs[index], patch);
        }
      } else {
        throw new Error("Unsupported update operation");
      }
    }
    return copy;
  }
  const api = { ACTIVE, SUBMITTED, FINISHED, cleanUrl, jobKey, samePosting, pending, submitted, done, prioritySort, applyOperations };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.ApplicationTrackerCore = api;
})(typeof window !== "undefined" ? window : null);
