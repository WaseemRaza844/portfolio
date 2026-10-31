"use strict";

/* Source of truth: ./jobs.json. This dashboard is read-only by design. */
const STATUS = {
  saved: "Saved",
  researching: "Researching",
  preparing: "Preparing",
  ready: "Ready to submit",
  submitted: "Submitted",
  interview: "Interview",
  offer: "Offer",
  closed: "Closed"
};
const FINISHED = new Set(["submitted", "interview", "offer", "closed"]);
const PRIO = { high: 0, medium: 1, low: 2 };
let data = [];

const byId = id => document.getElementById(id);
const make = (tag, className, value) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value !== undefined) node.textContent = value;
  return node;
};
const isoDate = value => /^\d{4}-\d{2}-\d{2}$/.test(value || "");
const asUTC = date => Date.parse(date + "T00:00:00Z");
function todayUTC() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit"
  }).formatToParts(new Date());
  const obj = Object.fromEntries(parts.map(p => [p.type, p.value]));
  return asUTC(obj.year + "-" + obj.month + "-" + obj.day);
}
function daysUntil(value) {
  return isoDate(value) ? Math.round((asUTC(value) - todayUTC()) / 86400000) : null;
}
function dateLabel(value) {
  if (!isoDate(value)) return "Deadline not listed";
  const [year, month, day] = value.split("-");
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC", year: "numeric", month: "short", day: "numeric" })
    .format(new Date(Date.UTC(Number(year), Number(month) - 1, Number(day))));
}
function dueLabel(job) {
  const date = job.targetApplyBy || job.deadline;
  if (!date) return "No confirmed deadline";
  const diff = daysUntil(date);
  if (FINISHED.has(job.status)) return "Submitted";
  if (diff < 0) return "Date passed · recheck vacancy";
  if (diff === 0) return "Due today";
  if (diff === 1) return "Due tomorrow";
  return diff + " days remaining";
}
function prioritySort(a, b) {
  const prio = (PRIO[a.priority] ?? 3) - (PRIO[b.priority] ?? 3);
  if (prio) return prio;
  const stage = { ready: 0, preparing: 1, researching: 2, saved: 3 };
  const st = (stage[a.status] ?? 10) - (stage[b.status] ?? 10);
  if (st) return st;
  return (a.targetApplyBy || a.deadline || "9999").localeCompare(b.targetApplyBy || b.deadline || "9999")
    || a.institution.localeCompare(b.institution);
}
function deadlineSort(a,b) {
  return (a.targetApplyBy || a.deadline || "9999").localeCompare(b.targetApplyBy || b.deadline || "9999") || prioritySort(a,b);
}
function link(text, href, className) {
  const a = make("a", className, text);
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  return a;
}
function badge(text, kind) { return make("span", "pill " + (kind || ""), text); }
function detailsSection(job) {
  const block = make("details", "job-details");
  const summary = make("summary", "", "Documents and notes");
  block.append(summary);
  const body = make("div", "details-body");
  const docLine = make("p", "", "Required/prepared: " + (job.documents || []).join(" · "));
  body.append(docLine);
  if (job.applicationFolder) {
    body.append(link("Open application files in repository ↗",
      "https://github.com/WaseemRaza844/portfolio/tree/develop/" + job.applicationFolder, "subtle-link"));
  }
  if (job.notes) body.append(make("p", "", job.notes));
  if (job.submittedAt) body.append(make("p", "", "Submitted: " + dateLabel(job.submittedAt)));
  block.append(body);
  return block;
}
function jobCard(job, compact=false) {
  const article = make("article", "job" + (FINISHED.has(job.status) ? " done" : "") + (compact ? " compact" : ""));
  const top = make("div", "job-top");
  const titleWrap = make("div", "job-title");
  titleWrap.append(make("h3", "", job.title));
  titleWrap.append(make("p", "muted", job.institution + " · " + job.location));
  top.append(titleWrap);
  const status = make("div", "job-badges");
  status.append(badge(STATUS[job.status] || job.status, "stage-" + job.status));
  status.append(badge(job.priority + " priority", "priority-" + job.priority));
  top.append(status);
  article.append(top);

  const info = make("div", "job-meta");
  info.append(make("span", "", job.type || "Faculty"));
  if (job.deadline) info.append(make("span", "", "Deadline: " + dateLabel(job.deadline) + (job.deadlineVerified ? "" : " (unverified)")));
  else info.append(make("span", "", "Deadline: not confirmed"));
  info.append(badge(dueLabel(job), "due"));
  article.append(info);

  const next = make("p", "next-action");
  next.append(make("strong", "", FINISHED.has(job.status) ? "Follow-up: " : "Next action: "));
  next.append(document.createTextNode(job.nextAction || "Review job posting."));
  article.append(next);

  if (!compact) {
    const bottom = make("div", "job-bottom");
    bottom.append(detailsSection(job));
    const buttons = make("div", "job-links");
    if (job.postingUrl) buttons.append(link("Job posting ↗", job.postingUrl, "button-link"));
    if (job.officialUrl && job.officialUrl !== job.postingUrl) buttons.append(link("Employer page ↗", job.officialUrl, "button-link light"));
    bottom.append(buttons);
    article.append(bottom);
  }
  return article;
}
function render() {
  const active = data.filter(job => !FINISHED.has(job.status));
  byId("stat-total").textContent = data.length;
  byId("stat-active").textContent = active.length;
  byId("stat-submitted").textContent = data.filter(j => j.status === "submitted" || j.status === "interview" || j.status === "offer").length;
  byId("stat-soon").textContent = active.filter(j => {
    const d = daysUntil(j.targetApplyBy || j.deadline);
    return d !== null && d >= 0 && d <= 14;
  }).length;

  const focus = byId("next-five");
  focus.replaceChildren();
  const topFive = [...active].sort(prioritySort).slice(0, 5);
  if (!topFive.length) focus.append(make("p", "muted", "No pending applications. Add a job link to begin."));
  else topFive.forEach(job => focus.append(jobCard(job, true)));

  const text = byId("search").value.trim().toLowerCase();
  const stage = byId("filter-stage").value;
  const priority = byId("filter-priority").value;
  let filtered = data.filter(job => {
    if (stage === "pending" && FINISHED.has(job.status)) return false;
    if (stage !== "all" && stage !== "pending" && job.status !== stage) return false;
    if (priority !== "all" && job.priority !== priority) return false;
    return [job.institution, job.title, job.location, job.area, job.notes].join(" ").toLowerCase().includes(text);
  });
  const sort = byId("sort-by").value;
  if (sort === "institution") filtered.sort((a,b) => a.institution.localeCompare(b.institution));
  else if (sort === "status") filtered.sort((a,b) => a.status.localeCompare(b.status) || prioritySort(a,b));
  else filtered.sort(sort === "deadline" ? deadlineSort : prioritySort);

  byId("result-count").textContent = filtered.length + " positions";
  const list = byId("all-jobs");
  list.replaceChildren();
  if (!filtered.length) list.append(make("p", "muted", "No positions match these filters."));
  filtered.forEach(job => list.append(jobCard(job)));
}
function exportCSV() {
  const fields = ["institution","title","location","type","status","priority","deadline","deadlineVerified","targetApplyBy","documentsReady","submittedAt","nextAction","postingUrl","applicationFolder"];
  const escapeCSV = value => '"' + String(value == null ? "" : value).replaceAll('"','""') + '"';
  const csv = [fields.join(","),...data.map(j => fields.map(k => escapeCSV(j[k])).join(","))].join("\r\n");
  const url = URL.createObjectURL(new Blob(["\ufeff" + csv], {type:"text/csv;charset=utf-8"}));
  const a = document.createElement("a");
  a.href=url; a.download="faculty-applications.csv"; document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url),1000);
}
async function init() {
  ["search","filter-stage","filter-priority","sort-by"].forEach(id => byId(id).addEventListener(
    id === "search" ? "input" : "change", render));
  byId("export-csv").addEventListener("click", exportCSV);
  try {
    const response = await fetch("./jobs.json", { cache: "no-store" });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const payload = await response.json();
    if (!Array.isArray(payload.jobs)) throw new Error("Invalid job list");
    data = payload.jobs;
    byId("load-status").textContent = "Last reviewed " + dateLabel(payload.asOf) + " · Times shown for America/New_York";
    render();
  } catch (e) {
    byId("load-status").textContent = "Could not load jobs.json. Open this page through the development site or a local HTTP server. (" + e.message + ")";
  }
}
init();
