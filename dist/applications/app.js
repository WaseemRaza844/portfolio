"use strict";

const C = window.ApplicationTrackerCore;
const REPO_FILE = "dist/applications/jobs.json";
const API_URL = "https://api.github.com/repos/WaseemRaza844/portfolio/contents/" + REPO_FILE + "?ref=develop";
const UPDATE_URL = "https://api.github.com/repos/WaseemRaza844/portfolio/contents/" + REPO_FILE;
const STORE = "waseem-faculty-tracker-pending-v2";
const STATUS = { saved:"Saved", researching:"Researching", preparing:"Preparing", ready:"Ready to submit",
  submitted:"Applied", interview:"Interview", offer:"Offer", closed:"Closed" };
let basePayload = null;
let records = [];
let pendingOps = loadPending();
let token = ""; // NEVER save a token in localStorage, sessionStorage or repository.
let syncing = false;
let showAllQueue = false;
let lastMessage = "";
let duplicateNotice = "";

const el = id => document.getElementById(id);
function make(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}
function button(label, handler, className) {
  const b = make("button", className || "small-btn", label);
  b.type = "button";
  b.addEventListener("click", handler);
  return b;
}
function link(label, href) {
  const a = make("a", "button-link", label);
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  return a;
}
function loadPending() {
  try {
    const value = JSON.parse(localStorage.getItem(STORE) || "[]");
    return Array.isArray(value) ? value.filter(op => op && ["add", "update"].includes(op.type)) : [];
  } catch (_) { return []; }
}
function persistPending() {
  try { localStorage.setItem(STORE, JSON.stringify(pendingOps)); }
  catch (_) { lastMessage = "Browser storage blocked. Use Export CSV before leaving."; }
}
function todayISO() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone:"America/New_York", year:"numeric", month:"2-digit", day:"2-digit"
  }).formatToParts(new Date());
  const p = Object.fromEntries(parts.map(v => [v.type, v.value]));
  return p.year + "-" + p.month + "-" + p.day;
}
function daysLeft(value) {
  if (!value) return null;
  const a = Date.parse(value + "T00:00:00Z"), b = Date.parse(todayISO() + "T00:00:00Z");
  return Number.isFinite(a) ? Math.round((a-b)/86400000) : null;
}
function niceDate(value) {
  if (!value) return "Not set";
  const d = new Date(value + "T00:00:00Z");
  if (!Number.isFinite(d.getTime())) return "Not set";
  return d.toLocaleDateString("en-US", {year:"numeric",month:"short",day:"numeric",timeZone:"UTC"});
}
function badge(text, name) { return make("span", "pill " + name, text); }
function refreshLocal() {
  if (!basePayload) return;
  records = C.applyOperations(basePayload, pendingOps).jobs;
  render();
  showSyncStatus();
}
function showSyncStatus() {
  const count = pendingOps.length;
  const head = el("sync-label"), detail=el("sync-detail"), dot=el("sync-indicator"), syncButton=el("sync-now");
  dot.className = "sync-dot " + (syncing ? "working" : count ? "pending" : "synced");
  if (syncing) {
    head.textContent = "Saving changes to GitHub...";
    detail.textContent = "The changes remain in this browser until the commit succeeds.";
  } else if (count) {
    head.textContent = count + " unsynced change" + (count===1?"":"s");
    detail.textContent = token
      ? (lastMessage || "Changes saved locally. Click Sync changes to retry GitHub.")
      : "Saved in this browser only. Connect GitHub to update develop and your reminders.";
  } else {
    head.textContent = token ? "GitHub connected · all changes saved" : "Up to date · viewing saved GitHub data";
    detail.textContent = lastMessage || duplicateNotice || (token ? "Edits will automatically commit to develop." : "You can edit immediately; connect GitHub to sync across devices.");
  }
  syncButton.hidden = syncing || count===0;
  syncButton.disabled = syncing;
  el("connect-github").textContent = token ? "Disconnect GitHub" : "Connect GitHub";
}
function appendLinks(parent, job) {
  if (job.postingUrl) parent.append(link("View posting ↗", job.postingUrl));
  if (job.officialUrl && job.officialUrl !== job.postingUrl) parent.append(link("Employer ↗", job.officialUrl));
  if (job.applicationFolder) {
    parent.append(link("Application files ↗",
      "https://github.com/WaseemRaza844/portfolio/tree/develop/" + job.applicationFolder));
  }
}
function detailsSection(job) {
  const node=make("details", "job-details");
  node.append(make("summary", "", "Details and required documents"));
  const inside=make("div", "details-body");
  inside.append(make("p", "", job.documents && job.documents.length
    ? "Documents: " + job.documents.join(" · ") : "Documents not yet researched"));
  if (job.submittedAt) inside.append(make("p", "", "Application submitted: " + niceDate(job.submittedAt)));
  if (job.area) inside.append(make("p", "", "Focus: " + job.area));
  if (job.postingDescription) inside.append(make("p", "", "Posting summary: " + job.postingDescription));
  if (job.enrichmentMessage) inside.append(make("p", "", "Automatic details: " + job.enrichmentMessage));
  if (job.notes) inside.append(make("p", "", job.notes));
  node.append(inside);
  return node;
}
function card(job, position) {
  const done = C.done(job);
  const item=make("article", "job" + (done ? " done " + job.status : ""));
  item.dataset.jobId=job.id;
  if (done) item.append(make("div", "completion-mark", job.status==="closed"?"✕ CLOSED":"✓ APPLIED"));
  const titleRow=make("div", "job-top");
  const title=make("div", "job-title");
  if (position != null) title.append(make("span", "queue-number", String(position)));
  const names=make("div", "job-name");
  names.append(make("h3", "", job.title));
  names.append(make("p", "muted", job.institution + " · " + job.location));
  title.append(names);
  titleRow.append(title);
  const pills=make("div", "job-badges");
  pills.append(badge(STATUS[job.status] || job.status,"stage-"+job.status));
  pills.append(badge((job.priority || "medium").toUpperCase()+" PRIORITY","priority-"+job.priority));
  if (job.enrichmentStatus==="pending") pills.append(badge("Metadata pending","research-pending"));
  else if (job.enrichmentStatus==="partial" || job.enrichmentStatus==="failed") pills.append(badge("Needs research","research-needed"));
  else if (job.enrichmentStatus==="complete") pills.append(badge("Page details extracted","research-done"));
  titleRow.append(pills);
  item.append(titleRow);

  const info=make("div", "job-meta");
  info.append(make("span", "", job.type || "Faculty / teaching"));
  if (job.targetApplyBy) info.append(badge("Apply by " + niceDate(job.targetApplyBy), "target"));
  if (job.deadline) info.append(make("span", "", "Employer deadline: " + niceDate(job.deadline) +
    (job.deadlineVerified ? "" : " (unverified)")));
  const due=daysLeft(job.targetApplyBy || job.deadline);
  if (C.pending(job) && due != null) {
    info.append(badge(due<0?"Date passed":due===0?"Due today":due===1?"Due tomorrow":due+" days left",
      due<=7?"urgent":"due"));
  }
  item.append(info);
  const next=make("p","next-action");
  next.append(make("strong","",done?"Follow-up: ":"Next: "));
  next.append(document.createTextNode(job.nextAction || "Review posting and requirements."));
  item.append(next);

  const actions=make("div","job-actions");
  if (C.pending(job)) {
    actions.append(button("✓ Mark applied", () => setStatus(job,"submitted"), "small-btn applied-action"));
    actions.append(button("Close", () => setStatus(job,"closed")));
  } else if (job.status==="closed" || job.status==="submitted") {
    actions.append(button("↶ Reopen", () => setStatus(job,"saved")));
  } else {
    actions.append(button("Update stage",()=>openEdit(job)));
  }
  actions.append(button("Edit details",()=>openEdit(job),"small-btn edit-action"));
  item.append(actions);
  const footer=make("div","job-bottom");
  footer.append(detailsSection(job));
  const urls=make("div","job-links"); appendLinks(urls,job); footer.append(urls);
  item.append(footer);
  return item;
}
function render() {
  if (!basePayload) return;
  const active=records.filter(C.pending).sort(C.prioritySort);
  el("stat-total").textContent=records.length;
  el("stat-active").textContent=active.length;
  el("stat-submitted").textContent=records.filter(C.submitted).length;
  el("stat-closed").textContent=records.filter(j=>j.status==="closed").length;
  el("queue-count").textContent=active.length+" pending";
  const queue=el("next-five");queue.replaceChildren();
  const visible=showAllQueue?active:active.slice(0,5);
  if (!visible.length) queue.append(make("p","empty","All caught up! Add new job links to continue."));
  visible.forEach((j,i)=>queue.append(card(j,i+1)));
  const toggle=el("toggle-queue");
  toggle.hidden=active.length<=5;
  toggle.textContent=showAllQueue?"Show top five only":"Show all "+active.length+" pending applications";

  const submitted=records.filter(C.submitted).sort(C.prioritySort);
  el("submitted-count").textContent=submitted.length+" applications";
  const submittedList=el("submitted-jobs");submittedList.replaceChildren();
  if (!submitted.length) submittedList.append(make("p","empty","No submitted applications yet."));
  submitted.forEach(j=>submittedList.append(card(j,null)));

  const q=el("search").value.trim().toLowerCase();
  const status=el("filter-stage").value, priority=el("filter-priority").value;
  const list=records.filter(j=>{
    if (status==="pending" && !C.pending(j)) return false;
    if (status==="submitted-group" && !C.submitted(j)) return false;
    if (!["all","pending","submitted-group"].includes(status) && j.status!==status) return false;
    if (priority!=="all" && j.priority!==priority) return false;
    return [j.institution,j.title,j.location,j.area,j.notes,j.postingUrl,j.officialUrl,j.postingDescription].join(" ").toLowerCase().includes(q);
  });
  const ordering=el("sort-by").value;
  if (ordering==="institution") list.sort((a,b)=>a.institution.localeCompare(b.institution));
  else if (ordering==="status") list.sort((a,b)=>a.status.localeCompare(b.status)||C.prioritySort(a,b));
  else if (ordering==="deadline") list.sort((a,b)=>
    (a.targetApplyBy||a.deadline||"9999").localeCompare(b.targetApplyBy||b.deadline||"9999")||C.prioritySort(a,b));
  else list.sort((a,b)=>{
    const x=C.pending(a)?0:C.submitted(a)?1:2, y=C.pending(b)?0:C.submitted(b)?1:2;
    return x-y||C.prioritySort(a,b);
  });
  el("result-count").textContent=list.length+" positions";
  const all=el("all-jobs");all.replaceChildren();
  if (!list.length) all.append(make("p","empty","No positions match this filter."));
  const indices=new Map(active.map((j,i)=>[j.id,i+1]));
  list.forEach(j=>all.append(card(j,indices.has(j.id)?indices.get(j.id):null)));
}
function newOp(type, extras) {
  return Object.assign({type:type, opId:Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,10)},extras);
}
function recordChange(operation) {
  duplicateNotice="";
  pendingOps.push(operation);
  persistPending();
  lastMessage="";
  refreshLocal();
  if (token) void syncGitHub();
}
function setStatus(job, status) {
  if (job.status===status) return;
  const patch={status:status, lastReviewed:todayISO()};
  if (status==="submitted") {
    patch.submittedAt=todayISO();
    patch.nextAction="Application submitted. Monitor responses and next steps.";
  } else if (status==="closed") {
    patch.submittedAt=null;
    patch.nextAction="Closed or no longer pursuing this opportunity.";
  } else {
    patch.submittedAt=null;
    patch.nextAction="Review posting and plan the next application step.";
  }
  recordChange(newOp("update",{jobId:job.id,patch:patch}));
}
function closeDialog(name) { el(name).close(); }
function showFormError(message, existingJob) {
  const error=el("form-error");
  error.replaceChildren(document.createTextNode(message+" "));
  if (existingJob) {
    error.append(button("View existing application",()=>{
      closeDialog("job-dialog");
      el("search").value="";
      el("filter-stage").value="all";
      el("filter-priority").value="all";
      if (C.submitted(existingJob)) el("submitted-section").open=true;
      else if (C.pending(existingJob)) showAllQueue=true;
      else el("all-section").open=true;
      render();
      const match=[...document.querySelectorAll(".job[data-job-id]")].find(n=>n.dataset.jobId===existingJob.id);
      if (match) { match.scrollIntoView({behavior:"smooth",block:"center"}); match.classList.add("duplicate-highlight"); }
    },"small-btn edit-action"));
  }
  error.hidden=false;
}
function openAdd() {
  el("job-form").reset();
  el("editing-id").value="";
  el("job-dialog-title").textContent="Add new job postings";
  el("form-help").textContent="Paste one or more posting links on separate lines. All other information can be filled in later.";
  el("urls-label").firstChild.textContent="Job posting URL(s)";
  el("job-urls").rows=3;el("job-urls").required=true;
  el("save-job").textContent="Add to tracker";
  el("form-error").hidden=true;
  el("job-dialog").showModal();
  el("job-urls").focus();
}
function openEdit(job) {
  el("job-form").reset();el("editing-id").value=job.id;
  el("job-dialog-title").textContent="Edit application";
  el("form-help").textContent="Update status, priority, target date or job details. Changes save locally immediately.";
  el("job-urls").value=job.postingUrl;
  el("job-urls").rows=2;
  el("job-institution").value=job.institution==="Not researched"?"":job.institution;
  el("job-title").value=job.title.startsWith("Posting to research")?"":job.title;
  el("job-location").value=job.location==="Not specified"?"":job.location;
  el("job-priority").value=job.priority||"medium";
  el("job-status").value=job.status;
  el("job-rank").value=job.rank||"";
  el("job-target").value=job.targetApplyBy||"";
  el("job-deadline").value=job.deadline||"";
  el("job-submitted").value=job.submittedAt||"";
  el("job-next-action").value=job.nextAction||"";
  el("save-job").textContent="Save changes"; el("form-error").hidden=true;
  el("job-dialog").showModal();
}
function publicURL(s) {
  const normal=C.cleanUrl(s);
  if (!normal) throw new Error("Enter a valid job posting URL.");
  const u=new URL(normal);
  if (u.protocol!=="https:") throw new Error("Use an HTTPS job posting URL.");
  if (/^dossier\.interfolio\.com$/i.test(u.hostname)) {
    throw new Error("Do not put a private Interfolio applicant link in this public tracker. Use the public job posting URL.");
  }
  return normal;
}
function formInput(id) { return el(id).value.trim(); }
function submitJobForm(e) {
  e.preventDefault();const error=el("form-error");error.hidden=true;
  try {
    const editId=formInput("editing-id");
    const urls=formInput("job-urls").split(/\s+/).filter(Boolean).map(publicURL);
    if (!urls.length) throw new Error("Paste at least one job posting URL.");
    if (editId && urls.length!==1) throw new Error("A single application can only have one posting URL.");
    const duplicateJobs=[];
    const duplicateInputs=[];
    const uniqueUrls=[];
    const keys=new Set();
    for (const url of urls) {
      const key=C.jobKey(url);
      if (keys.has(key)) { duplicateInputs.push(url); continue; }
      keys.add(key);
      const match=C.findDuplicate(records,url,editId);
      if (match) { duplicateJobs.push(match); continue; }
      uniqueUrls.push(url);
    }
    if (editId && duplicateJobs.length) {
      const match=duplicateJobs[0];
      showFormError("This URL already belongs to "+match.institution+" — "+match.title+" ("+(STATUS[match.status]||match.status)+"). No change was made.",match);
      return;
    }
    if (!editId && uniqueUrls.length===0) {
      if (duplicateJobs.length) {
        const match=duplicateJobs[0];
        showFormError("Already tracked: "+match.institution+" — "+match.title+" ("+(STATUS[match.status]||match.status)+"). No duplicate was added.",match);
      } else {
        showFormError("The same URL appears more than once in your pasted list. No duplicate was added.");
      }
      return;
    }
    if (urls.length>1 && (formInput("job-title")||formInput("job-institution")) &&
        !window.confirm("You entered shared institution/title details for multiple links. Apply those same details to all postings?")) return;
    const st=formInput("job-status");
    const rankRaw=formInput("job-rank");
    const rank=rankRaw ? Number(rankRaw) : null;
    if (rank!==null && (!Number.isInteger(rank)||rank<1||rank>999)) throw new Error("Queue rank must be a whole number from 1 to 999.");
    const target=formInput("job-target")||null, deadline=formInput("job-deadline")||null;
    const submittedAt=formInput("job-submitted") || (st==="submitted"&&!editId?todayISO():null);
    const fields={
      priority:formInput("job-priority"), status:st, rank:rank, targetApplyBy:target,
      deadline:deadline, submittedAt:["submitted","interview","offer"].includes(st)?submittedAt:null,
      lastReviewed:todayISO()
    };
    const institution=formInput("job-institution"), title=formInput("job-title"), location=formInput("job-location");
    const next=formInput("job-next-action");
    if (editId) {
      const previous=records.find(j=>j.id===editId);
      if (!previous) throw new Error("Application was not found; refresh the page.");
      Object.assign(fields,{
        postingUrl:uniqueUrls[0], institution:institution||previous.institution, title:title||previous.title,
        location:location||previous.location,
        nextAction:next||previous.nextAction
      });
      if (!C.samePosting(previous.postingUrl,uniqueUrls[0])) {
        fields.alternateUrls=[...new Set([...(previous.alternateUrls||[]),previous.postingUrl].filter(Boolean))];
        fields.enrichmentStatus="pending";
        fields.enrichmentMessage="Posting URL changed; queued for public page metadata extraction after sync.";
      }
      if (st==="submitted" && previous.status!=="submitted" && !fields.submittedAt) fields.submittedAt=todayISO();
      recordChange(newOp("update",{jobId:editId,patch:fields}));
    } else {
      const adds=uniqueUrls.map((url,i)=>{
        const hostname=new URL(url).hostname.replace(/^www\./,"");
        const j=Object.assign({
          id:"job-"+Date.now().toString(36)+"-"+i+"-"+Math.random().toString(36).slice(2,8),
          institution:institution||"Not researched",
          title:title||"Posting to research ("+hostname+")",
          location:location||"Not specified",
          type:"Faculty / teaching (unverified)",
          area:"", postingUrl:url, officialUrl:null, deadlineVerified:false,
          documents:[], documentsReady:false, applicationFolder:null,
          nextAction:next||"Research job description, deadline, eligibility and required documents.",
          notes:"Added directly from dashboard; job details have not yet been verified.",
          enrichmentStatus:"pending",
          enrichmentMessage:"Waiting for automatic extraction from the public posting page."
        },fields);
        if (st==="closed" || st==="saved") j.submittedAt=null;
        return j;
      });
      adds.forEach(job=>pendingOps.push(newOp("add",{job:job})));
      duplicateNotice="";
      if (duplicateJobs.length || duplicateInputs.length) {
        const existing=duplicateJobs[0];
        duplicateNotice="Added "+adds.length+" new posting(s); skipped "+(duplicateJobs.length+duplicateInputs.length)+" duplicate link(s)."+
          (existing ? " Already tracked: "+existing.institution+" — "+existing.title+" ("+(STATUS[existing.status]||existing.status)+")." : "");
      } else duplicateNotice="Added "+adds.length+" posting(s). Automatic page-metadata extraction will run after GitHub sync.";
      persistPending();lastMessage="";refreshLocal();
      if (token) void syncGitHub();
    }
    closeDialog("job-dialog");
    el("filter-stage").value="all";el("search").value="";render();
  } catch (err) {showFormError(err.message);}
}
async function githubRead(authToken) {
  const headers={Accept:"application/vnd.github+json"};
  if (authToken) headers.Authorization="Bearer "+authToken;
  const response=await fetch(API_URL,{headers:headers,cache:"no-store"});
  if (!response.ok) throw new Error(response.status===401?"Invalid or expired GitHub token":response.status===403?"GitHub permission or rate limit error":"GitHub read failed (HTTP "+response.status+")");
  const obj=await response.json();
  if (!obj.sha || !obj.content) throw new Error("Unexpected GitHub file response");
  const raw=atob(obj.content.replace(/\s/g,""));
  const bytes=Uint8Array.from(raw,c=>c.charCodeAt(0));
  const payload=JSON.parse(new TextDecoder().decode(bytes));
  if (!Array.isArray(payload.jobs)) throw new Error("Invalid GitHub tracker JSON");
  return {payload:payload,sha:obj.sha};
}
async function githubWrite(payload,sha) {
  const text=JSON.stringify(payload,null,2)+"\n";
  const bytes=new TextEncoder().encode(text);
  let binary="";
  for (let i=0;i<bytes.length;i+=8192) binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
  const content=btoa(binary);
  const response=await fetch(UPDATE_URL,{
    method:"PUT",
    headers:{Accept:"application/vnd.github+json",Authorization:"Bearer "+token,
      "Content-Type":"application/json"},
    body:JSON.stringify({message:"chore(applications): update faculty tracker from dashboard",
      content:content,sha:sha,branch:"develop"})
  });
  if (response.status===409 || response.status===422) return {conflict:true};
  if (!response.ok) {
    let hint="";
    try { const err=await response.json(); if (err.message) hint=": "+String(err.message).slice(0,160); } catch (_){}
    throw new Error("GitHub save failed (HTTP "+response.status+")"+hint);
  }
  return {conflict:false};
}
async function syncGitHub() {
  if (syncing) return;
  if (!token) {el("github-dialog").showModal();return;}
  const notice=duplicateNotice;
  syncing=true;lastMessage="";showSyncStatus();
  try {
    let attempt=0;
    while (pendingOps.length) {
      const batch=pendingOps.slice();
      const fresh=await githubRead(token);
      const updated=C.applyOperations(fresh.payload,batch);
      updated.asOf=todayISO();
      const saved=await githubWrite(updated,fresh.sha);
      if (saved.conflict) {
        attempt++;
        if (attempt>3) throw new Error("File changed elsewhere. Retry synchronization.");
        continue;
      }
      attempt=0;
      const included=new Set(batch.map(op=>op.opId));
      pendingOps=pendingOps.filter(op=>!included.has(op.opId));
      persistPending();
      basePayload=updated;
      records=C.applyOperations(basePayload,pendingOps).jobs;
      render();
    }
    lastMessage=(notice ? notice+" " : "")+"Changes committed to GitHub develop. Public posting metadata will be extracted automatically when available; refresh in a minute to see it.";
  } catch (err) {
    lastMessage="Sync failed: "+err.message+". Your edits are still saved in this browser.";
  } finally {
    syncing=false;
    showSyncStatus();
  }
}
async function refreshFromGitHub() {
  const refreshButton=el("refresh-data");
  refreshButton.disabled=true;
  const oldLabel=refreshButton.textContent;
  refreshButton.textContent="Refreshing...";
  try {
    let latest;
    if (token) {
      latest=(await githubRead(token)).payload;
    } else {
      const response=await fetchWithTimeout(
        "https://raw.githubusercontent.com/WaseemRaza844/portfolio/develop/dist/applications/jobs.json?v="+Date.now(),5000);
      if (!response.ok) throw new Error("GitHub returned HTTP "+response.status);
      latest=await response.json();
    }
    if (!latest || !Array.isArray(latest.jobs)) throw new Error("GitHub returned invalid tracker data.");
    basePayload=latest;
    records=C.applyOperations(basePayload,pendingOps).jobs;
    lastMessage="Loaded the latest GitHub tracker, including any extracted posting details.";
    render();
    showSyncStatus();
  } catch (err) {
    lastMessage="Could not refresh GitHub data: "+err.message;
    showSyncStatus();
  } finally {
    refreshButton.disabled=false;
    refreshButton.textContent=oldLabel;
  }
}

async function connectGithub(e) {
  e.preventDefault();
  const value=formInput("github-token");
  const error=el("github-error");error.hidden=true;
  el("authorize-github").disabled=true;
  try {
    if (!value) throw new Error("Paste your GitHub token into this field.");
    const fresh=await githubRead(value);
    token=value;
    el("github-token").value="";
    basePayload=fresh.payload; // Pull in any updates from chat or another device.
    refreshLocal();
    closeDialog("github-dialog");
    lastMessage="GitHub connected for this tab.";
    if (pendingOps.length) await syncGitHub();
    else showSyncStatus();
  } catch (err) {
    error.textContent=err.message;error.hidden=false;
  } finally { el("authorize-github").disabled=false; }
}
function exportCSV() {
  const keys=["institution","title","location","status","priority","rank","targetApplyBy",
    "deadline","submittedAt","nextAction","postingUrl"];
  const safe=v=>{
    let s=String(v??"");
    if (/^[=+\-@\t\r]/.test(s)) s="'"+s; // Excel formula-injection defense.
    return '"'+s.replace(/"/g,'""')+'"';
  };
  const csv=[keys.join(","),...records.map(j=>keys.map(k=>safe(j[k])).join(","))].join("\r\n");
  const url=URL.createObjectURL(new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"}));
  const a=make("a");a.href=url;a.download="faculty-applications.csv";
  document.body.append(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
async function fetchWithTimeout(url, milliseconds) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), milliseconds);
  try {
    return await fetch(url, { cache:"no-store", signal:controller.signal });
  } finally {
    window.clearTimeout(timer);
  }
}
async function init() {
  try {
    ["search","filter-stage","filter-priority","sort-by"].forEach(name=>
      el(name).addEventListener(name==="search"?"input":"change",render));
    el("toggle-queue").addEventListener("click",()=>{showAllQueue=!showAllQueue;render();});
    el("add-job").addEventListener("click",openAdd);
    el("job-form").addEventListener("submit",submitJobForm);
    el("github-form").addEventListener("submit",connectGithub);
    el("connect-github").addEventListener("click",()=>{
      if (token) {
        token="";lastMessage="Disconnected. Token cleared from this page.";showSyncStatus();
      } else {
        el("github-error").hidden=true;el("github-token").value="";
        el("github-dialog").showModal();
      }
    });
    el("sync-now").addEventListener("click",()=>void syncGitHub());
    el("refresh-data").addEventListener("click",()=>void refreshFromGitHub());
    el("export-csv").addEventListener("click",exportCSV);
    for (const b of document.querySelectorAll("[data-close]")) {
      b.addEventListener("click",()=>closeDialog(b.dataset.close));
    }
    el("sync-label").textContent="Loading your application list...";
    el("sync-detail").textContent="Connecting to the latest tracker data.";
    if (!C) throw new Error("The tracker helper did not load. Refresh this page to load the latest scripts.");
    let loadError = null;
    try {
      const live = await fetchWithTimeout(
        "https://raw.githubusercontent.com/WaseemRaza844/portfolio/develop/dist/applications/jobs.json?v="+Date.now(), 4000);
      if (!live.ok) throw new Error("GitHub returned HTTP "+live.status);
      basePayload = await live.json();
    } catch (err) {
      loadError = err;
      const local = await fetchWithTimeout("./jobs.json?v=20261031-quickfix1", 5000);
      if (!local.ok) throw new Error("Could not load the tracker from GitHub or this site (HTTP "+local.status+").");
      basePayload = await local.json();
      lastMessage = "Using the latest dashboard copy. Connect GitHub to synchronize edits.";
    }
    if (!basePayload || !Array.isArray(basePayload.jobs)) throw new Error("The application list is not valid JSON.");
    refreshLocal();
    if (loadError) {
      el("sync-detail").textContent="Loaded the dashboard copy. "+(pendingOps.length ? "You have unsynced browser edits." : "Connect GitHub when you are ready to save changes.");
    }
  } catch (err) {
    el("sync-label").textContent="Tracker could not finish loading";
    el("sync-detail").textContent=err.message+" You can still refresh the page; no existing GitHub records were changed.";
    el("sync-indicator").className="sync-dot pending";
  }
}
init();
