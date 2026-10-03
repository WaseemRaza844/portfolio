(function () {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;
  const settings = data.settings || {};
  const learningSettings = settings.learning || {};
  const profileFilter = new URLSearchParams(window.location.search).get('profile');
  const profileLabels = { generic: 'Generic / Comprehensive', genai: 'GenAI & Agentic AI', aiml: 'AI/ML & Data Science', faculty: 'Faculty & Academic' };
  const visibleForProfile = (item) =>  item.published !== false &&  (!profileFilter || (item.profiles || []).includes(profileFilter));

  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
  const tags = (items) => '<div class="tags">' + items.map((x) => '<span>' + esc(x) + '</span>').join("") + "</div>";

  const pdfDocument = (url, label) => {
    if (!url) return "";
    const isPdf = /\.pdf(?:$|[?#])/i.test(url);
    if (!isPdf) {
      return '<a class="pdf-link" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">Open ' + esc(label) + ' <span>↗</span></a>';
    }
    return '<details class="pdf-preview"><summary class="preview-btn">Preview ' + esc(label) + '<span class="preview-chevron" aria-hidden="true">⌄</span></summary>' +
      '<div class="pdf-preview-body"><iframe src="' + esc(url) + '#view=FitH" title="' + esc(label) + ' preview" loading="lazy"></iframe>' +
      '<a class="pdf-link" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">Open full PDF in a new tab <span>↗</span></a></div></details>';
  };
  const externalLinks = (links) => {
    const labels = { coursera: "Coursera", linkedin: "LinkedIn", github: "GitHub" };
    return Object.entries(links || {}).filter(([, url]) => url).map(([key, url]) =>
      '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">' + esc(labels[key] || key) + ' ↗</a>'
    ).join('');
  };
  const credentialAction = (url) => {
    if (!url) return '';
    const verified = /\/verify\//i.test(url) || /account\/accomplishments\//i.test(url);
    return '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">' +
      (verified ? 'Verify Coursera Credential ↗' : 'View Coursera Course ↗') + '</a>';
  };
  const completedCount = (courses) => courses.filter((course) =>
    /^completed/i.test(course.status || '') || /^completed/i.test(course.completionDate || '')
  ).length;

  const isVerifiedCompletedCourse = (item) => {
    const url = item?.links?.coursera || "";
    return item?.status === "Completed" &&
      item?.progressPercent === 100 &&
      Boolean(String(item?.completionDate || "").trim()) &&
      /coursera\.org\/(?:account\/accomplishments\/|verify\/)/i.test(url);
  };

  const courseFromRecord = (record) => {
    const nested = record?.courses?.[0] || {};
    return {
      ...nested,
      title: record.title,
      status: "Completed",
      completionDate: record.completionDate,
      progressPercent: 100,
      summary: record.summary || nested.summary || "",
      takeaway: record.takeaway || nested.takeaway || "",
      skills: record.skills || nested.skills || [],
      certificateUrl: record.certificateUrl || nested.certificateUrl || "",
      links: record.links || nested.links || {},
      relatedCredentials: []
    };
  };

  const programAction = (program) => {
    const url = program?.links?.coursera;
    if (!url) return "";
    const verified = /\/verify\//i.test(url) || /account\/accomplishments\//i.test(url);
    return '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">' +
      (verified ? 'Verify Program Credential ↗' : 'View Coursera Program ↗') + '</a>';
  };

  function featuredCertificationCard(item) {
    const active = item.status.toLowerCase().includes("progress") ? " active" : "";
    return '<article class="detail-card reveal visible">' +
      '<div class="detail-card-top"><span class="credential-state' + active + '">' + esc(item.status) + '</span><span class="detail-date">' + esc(item.completionDate) + '</span></div>' +
      '<p class="detail-type">' + esc(item.issuer) + '</p><h3>' + esc(item.title) + '</h3><p>' + esc(learningSettings.showTakeaways ? (item.takeaway || item.summary) : item.summary) + '</p>' +
      tags(item.skills) + '<a class="text-link" href="./learning.html">View courses and credentials ↗</a></article>';
  }

  function courseAccordion(course, index) {
    const rawDate = String(course.completionDate || '').replace(/^(Target:|Completed:?)\s*/i, '');
    const dateText = rawDate && !/^(completed|in progress)$/i.test(rawDate)
      ? rawDate
      : 'Completion date verified';
    const verifyLink = course.links?.coursera ? credentialAction(course.links.coursera) : '';
    const githubLink = course.links?.github
      ? '<a href="' + esc(course.links.github) + '" target="_blank" rel="noopener noreferrer">View GitHub Repo ↗</a>'
      : '';
    const relatedCredentialMarkup = (course.relatedCredentials || []).map(credential =>
      '<div class="course-related-credential"><p class="field-label">Related program credential · ' + esc(credential.title) + '</p>' +
      (credential.links?.coursera ? '<div class="credential-links course-credential-links">' + credentialAction(credential.links.coursera) + '</div>' : '') +
      pdfDocument(credential.certificateUrl, 'Program Certificate') + '</div>'
    ).join('');

    return '<article class="course-accordion course-card">' +
      '<div class="course-card-row"><span class="course-number">C' + (index + 1) + '</span>' +
      '<div class="course-title"><strong>' + esc(course.title) + '</strong>' +
      ((course.summary || course.takeaway) ? '<small class="course-teaser">' + esc(course.summary || course.takeaway) + '</small>' : '') +
      '</div><div class="course-card-meta"><span class="credential-state">Completed</span><span class="course-date">' + esc(dateText) + '</span>' +
      ((verifyLink || githubLink) ? '<div class="credential-links course-credential-links">' + verifyLink + githubLink + '</div>' : '') +
      '</div></div>' +
      '<div class="course-card-details">' +
      pdfDocument(course.certificateUrl, 'course certificate') +
      (course.takeaway ? '<div class="takeaway-field"><p class="field-label">Key takeaway</p><p>' + esc(course.takeaway) + '</p></div>' : '') +
      (course.skills?.length ? '<div><p class="field-label">Skills</p>' + tags(course.skills) + '</div>' : '') +
      relatedCredentialMarkup +
      '</div></article>';
  }

  function certificationAccordion(item, index) {
    const rawDate = String(item.completionDate || "").replace(/^(Target:|Completed:?)\s*/i, '');
    const dateText = rawDate && !/^completed$/i.test(rawDate) ? rawDate : 'Verified completion date';
    return '<details class="certification-accordion standalone-credential reveal visible">' +
      '<summary><span class="cert-number">' + (index + 1) + '</span>' +
      '<div class="cert-summary-main"><span class="credential-provider-badge">' + esc(item.issuer) + '</span><h2>' + esc(item.title) + '</h2><p class="cert-teaser">' + esc(item.summary) + '</p></div>' +
      '<div class="cert-summary-side"><span class="credential-state">Completed</span><span class="credential-date">' + esc(dateText) + '</span>' +
      '<div class="credential-links">' + credentialAction(item.links?.coursera) + '</div><span class="accordion-icon" aria-hidden="true"></span></div></summary>' +
      '<div class="certification-content vertical-credential-content">' +
      '<div class="certificate-preview-row">' + pdfDocument(item.certificateUrl, 'course certificate') + '</div>' +
      '<div class="cert-overview standalone-overview"><div><p class="field-label">Course overview</p><p>' + esc(item.summary) + '</p></div>' +
      (item.takeaway ? '<div class="takeaway-field"><p class="field-label">Key takeaway</p><p>' + esc(item.takeaway) + '</p></div>' : '') +
      '<div><p class="field-label">Key skills &amp; tools</p>' + tags(item.skills || []) + '</div></div>' +
      '</div></details>';
  }

  function programAccordion(program, index, records) {
    const courses = (program.courseIds || [])
      .map((id) => records.find((record) => record.id === id))
      .filter(Boolean)
      .filter(visibleForProfile)
      .filter(isVerifiedCompletedCourse)
      .map(courseFromRecord);
    if (!courses.length) return "";

    const awardedLabel = program.awarded ? 'Completed program' : 'Completed courses only';
    const dateText = program.completionDate
      ? program.completionDate
      : (program.awarded ? 'Program credential verified' : 'Parent curriculum in progress');
    return '<details class="certification-accordion reveal visible program-accordion">' +
      '<summary><span class="cert-number">' + (index + 1) + '</span>' +
      '<div class="cert-summary-main"><span class="credential-provider-badge">' + esc(program.issuer || 'Coursera') + '</span><p class="detail-type">' + esc(program.credentialType || 'Program') + '</p><h2>' + esc(program.title) + '</h2><p class="cert-teaser">' + esc(program.summary || '') + '</p></div>' +
      '<div class="cert-summary-side"><span class="credential-state">' + esc(awardedLabel) + '</span><span class="credential-date">' + esc(dateText) + '</span>' +
      '<div class="credential-links">' + programAction(program) + '</div><span class="accordion-icon" aria-hidden="true"></span></div></summary>' +
      '<div class="certification-content vertical-credential-content">' +
      '<div class="certificate-preview-row">' + pdfDocument(program.certificateUrl, 'Program Certificate') + '</div>' +
      '<section class="course-section completed-subcourses-section"><div class="completed-subcourses-head"><h3>COMPLETED SUB-COURSES <span>(' + courses.length + ' verified credential' + (courses.length === 1 ? '' : 's') + ')</span></h3></div>' +
      '<div class="completed-course-stack">' + courses.map(courseAccordion).join("") + '</div></section>' +
      '</div></details>';
  }

  function projectCard(item) {
    const home = item.home || {};
    const problem = home.problem || item.summary || "";
    const implementation = home.implementation || "";
    const architectureUrl = home.architectureUrl || item.links?.github || "";
    const caseStudyUrl = home.caseStudyUrl || ("./projects.html#" + encodeURIComponent(item.id || ""));
    const architectureLink = architectureUrl
      ? '<a class="project-action primary-action" href="' + esc(architectureUrl) + '"' +
        (/^https?:\/\//i.test(architectureUrl) ? ' target="_blank" rel="noopener noreferrer"' : '') +
        '>View Architecture / Code <span>↗</span></a>'
      : "";
    const caseStudyLink = '<a class="project-action" href="' + esc(caseStudyUrl) + '">Case Study <span>↗</span></a>';

    return '<article class="project-card engineering-card reveal visible">' +
      '<header class="engineering-card-head"><span class="project-kind">' + esc(home.badge || item.category) + '</span><span class="project-year">' + esc(item.date) + '</span></header>' +
      '<h3>' + esc(item.title) + '</h3>' +
      '<div class="engineering-card-copy"><p><strong>Problem.</strong> ' + esc(problem) + '</p>' +
      (implementation ? '<p><strong>Implementation.</strong> ' + esc(implementation) + '</p>' : '') + '</div>' +
      (item.skills?.length ? tags(item.skills) : '') +
      '<div class="project-actions">' + architectureLink + caseStudyLink + '</div>' +
      '</article>';
  }

  function projectLinkList(item) {
    const labels = { github: 'GitHub', demo: 'Live demo', coursera: 'Coursera', paper: 'Publication', project: 'Project link' };
    const standard = Object.entries(item.links || {}).filter(([, url]) => url).map(([key, url]) =>
      '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">' + esc(labels[key] || key) + ' ↗</a>'
    );
    const research = (item.resourceLinks || []).filter((link) => link?.url).map((link) =>
      '<a class="research-link" href="' + esc(link.url) + '" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">' + esc(link.label) + ' ↗</a>'
    );
    return standard.concat(research).join('');
  }

  function projectAccordion(item, index) {
    const projectLinks = projectLinkList(item);
    const credentialBlock = item.certificateUrl
      ? '<div><p class="field-label">Project certificate / credential</p>' + pdfDocument(item.certificateUrl, 'project certificate') + '</div>'
      : '';

    return '<details class="project-accordion reveal visible" id="' + esc(item.id || '') + '"><summary>' +
      '<span class="project-number">' + String(index + 1).padStart(2, '0') + '</span>' +
      '<div class="project-summary-main"><p class="detail-type">' + esc(item.category) + '</p><h2>' + esc(item.title) + '</h2>' +
      (item.skills?.length ? tags(item.skills) : '') + '</div>' +
      '<div class="project-summary-side"><div class="project-links">' + projectLinks + '</div><span class="accordion-icon" aria-hidden="true"></span>' +
      '<div class="project-status"><strong>' + esc(item.status || 'Project') + '</strong><span>' + esc(item.date || '') + '</span></div></div>' +
      '</summary><div class="project-accordion-content">' +
      '<div class="project-overview"><div><p class="field-label">Project overview</p><p>' + esc(item.summary) + '</p></div>' +
      (item.architecture ? '<div><p class="field-label">Architecture overview</p><p>' + esc(item.architecture) + '</p></div>' : '') +
      '<div><p class="field-label">Project type</p><p>' + esc(item.category) + '</p></div>' +
      '<div><p class="field-label">Status & timeline</p><p>' + esc(item.status || '') + (item.date ? ' · ' + esc(item.date) : '') + '</p></div></div>' +
      '<div class="project-evidence"><div><p class="field-label">Important skills & tools</p>' + tags(item.skills || []) + '</div>' +
      (projectLinks ? '<div><p class="field-label">Relevant links</p><div class="project-links expanded">' + projectLinks + '</div></div>' : '') +
      credentialBlock + '</div></div></details>';
  }

  function projectGroupSection(group, items) {
    const badges = {
      'academic-research': '🔬 Academic & Research',
      'guided': '⚙ Guided Implementations',
      'coursera-portfolio': '🧩 Portfolio & Applied Learning'
    };
    return '<section class="project-group" data-project-group="' + esc(group.id) + '">' +
      '<div class="project-group-head"><div><span class="section-badge">' + esc(badges[group.id] || group.title) + '</span><h2>' + esc(group.title) + '</h2><p>' + esc(group.description) + '</p></div>' +
      '<span>' + items.length + ' project' + (items.length === 1 ? '' : 's') + '</span></div>' +
      '<div class="project-accordion-list">' + items.map(projectAccordion).join('') + '</div></section>';
  }

  function mountProjectGroups() {
    const el = document.getElementById('all-projects');
    if (!el) return;
    const visibleProjects = data.projects.filter(visibleForProfile);
    const groups = data.projectGroups || [];
    el.innerHTML = groups.map((group) => {
      const items = visibleProjects.filter((item) => item.group === group.id);
      return items.length ? projectGroupSection(group, items) : '';
    }).join('');

    const stats = document.getElementById('project-stats');
    if (stats) {
      const visibleGroups = groups.filter((group) => visibleProjects.some((item) => item.group === group.id)).length;
      const active = visibleProjects.filter((item) => /progress|active/i.test(item.status || '')).length;
      stats.innerHTML = '<span><strong>' + visibleProjects.length + '</strong> projects</span><span><strong>' + visibleGroups + '</strong> project groups</span><span><strong>' + active + '</strong> active / in progress</span>';
    }
  }
  function publicationCard(item) {
    const venueBadge = item.badge || item.venue || "Publication";
    const paperUrl = item.url || ("https://scholar.google.com/scholar?q=" + encodeURIComponent(item.title || ""));
    const paperLabel = item.url ? "Paper / DOI ↗" : "Find paper ↗";
    const isProceedings = /PIMRC|HEALTHINF|WCNC|SmartNets|conference/i.test(item.venue || "");
    const bibType = isProceedings ? "inproceedings" : "article";
    const venueField = isProceedings ? "booktitle" : "journal";
    const bibKey = (item.id || "publication").replace(/[^a-zA-Z0-9_-]/g, "");
    const bibtex = "@" + bibType + "{" + bibKey + ",\n" +
      "  title={" + (item.title || "").replace(/[{}]/g, "") + "},\n" +
      "  " + venueField + "={" + (item.venue || "").replace(/[{}]/g, "") + "},\n" +
      "  year={" + (item.year || "").replace(/[{}]/g, "") + "}\n}";
    const encodedBibtex = encodeURIComponent(bibtex);

    return '<article class="pub publication-item reveal visible" itemscope itemtype="https://schema.org/ScholarlyArticle">' +
      '<div class="publication-copy"><div class="publication-meta">' +
      '<time class="year publication-year" itemprop="datePublished" datetime="' + esc(item.year) + '">' + esc(item.year) + '</time>' +
      '<span class="badge publication-badge" itemprop="isPartOf">' + esc(venueBadge) + '</span></div>' +
      '<h3 itemprop="headline">' + esc(item.title) + '</h3><p itemprop="description">' + esc(item.summary) + '</p>' +
      (item.topics?.length ? tags(item.topics) : '') +
      '<div class="publication-actions"><a href="' + esc(paperUrl) + '" target="_blank" rel="noopener noreferrer" itemprop="url">' + esc(paperLabel) + '</a>' +
      '<button type="button" aria-label="Copy BibTeX for ' + esc(item.title) + '" data-bibtex="' + esc(encodedBibtex) + '" onclick="navigator.clipboard.writeText(decodeURIComponent(this.dataset.bibtex)); this.textContent=\'Copied\'; setTimeout(() => { this.textContent=\'BibTeX\'; }, 1200);">BibTeX</button></div></div>' +
      '</article>';
  }
  function mount(id, items, render, featured) {
    const el = document.getElementById(id);
    if (!el) return;
    const visible = items.filter(visibleForProfile);
    const requestedIds = String(el.dataset.featuredIds || "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
    const selected = requestedIds.length
      ? requestedIds.map((id) => visible.find((item) => item.id === id)).filter(Boolean)
      : (featured ? visible.filter((x) => x.featured) : visible);
    el.innerHTML = selected.map(render).join("");
  }
  function learningSubsection(title, description, content, countLabel) {
    if (!content) return "";
    return '<section class="course-section learning-subsection"><div class="course-heading"><div><p class="field-label">' + esc(title) + '</p>' +
      (description ? '<p class="course-teaser">' + esc(description) + '</p>' : '') + '</div><span>' + esc(countLabel) + '</span></div><div class="accordion-list">' + content + '</div></section>';
  }

  function domainAreaSection(area, verifiedRecords, allPrograms, guidedIds) {
    const programs = (allPrograms || []).filter((program) => program.domain === area.id);
    const programMarkup = [];
    const groupedIds = new Set();

    programs.forEach((program) => {
      const eligibleIds = (program.courseIds || []).filter((id) =>
        verifiedRecords.some((record) => record.id === id)
      );
      if (!eligibleIds.length) return;
      eligibleIds.forEach((id) => groupedIds.add(id));
      const markup = programAccordion(program, programMarkup.length, verifiedRecords);
      if (markup) programMarkup.push(markup);
    });

    const guided = verifiedRecords.filter((record) =>
      guidedIds.has(record.id) && record.domain === area.id
    );
    const formalStandalone = verifiedRecords.filter((record) =>
      record.domain === area.id && !guidedIds.has(record.id) && !groupedIds.has(record.id)
    );

    const formalMarkup = programMarkup.join('') +
      formalStandalone.map((item, index) => certificationAccordion(item, programMarkup.length + index)).join('');
    const guidedMarkup = guided.map(certificationAccordion).join('');

    const uniqueCourseIds = new Set([
      ...programs.flatMap((program) => (program.courseIds || []).filter((id) => verifiedRecords.some((record) => record.id === id))),
      ...formalStandalone.map((item) => item.id),
      ...guided.map((item) => item.id)
    ]);

    if (!uniqueCourseIds.size && !learningSettings.showEmptyPaths) return '';

    const formalCount = new Set([
      ...programs.flatMap((program) => (program.courseIds || []).filter((id) => verifiedRecords.some((record) => record.id === id))),
      ...formalStandalone.map((item) => item.id)
    ]).size;

    return '<section class="domain-area" data-domain="' + esc(area.id) + '"><div class="domain-area-head"><div><p class="eyebrow">DOMAIN AREA</p><h2>' + esc(area.title) + '</h2><p>' + esc(area.description) + '</p></div><span>' + uniqueCourseIds.size + ' verified completed course' + (uniqueCourseIds.size === 1 ? '' : 's') + '</span></div>' +
      learningSubsection(area.formalTitle || 'Formal Certifications & Specializations', 'Parent programs contain only completed, dated, Coursera-verified sub-courses. Standalone formal courses remain single-course credentials.', formalMarkup, formalCount + ' formal course credential' + (formalCount === 1 ? '' : 's')) +
      learningSubsection(area.guidedTitle || 'Applied Guided Projects & Practical Labs', area.guidedDescription || '', guidedMarkup, guided.length + ' guided project' + (guided.length === 1 ? '' : 's')) +
      '</section>';
  }

  function mountDomainAreas() {
    const el = document.getElementById('all-certifications');
    if (!el) return;
    const areas = data.domainAreas || [];
    const allPrograms = data.learningPrograms || [];
    const guidedIds = new Set(data.learningGuidedProjectIds || []);
    const verifiedRecords = data.certifications
      .filter(visibleForProfile)
      .filter(isVerifiedCompletedCourse);

    el.innerHTML = areas.map((area) =>
      domainAreaSection(area, verifiedRecords, allPrograms, guidedIds)
    ).join('');

    const stats = document.getElementById('learning-stats');
    if (stats) {
      const visibleAreas = areas.filter((area) => {
        const direct = verifiedRecords.some((item) => item.domain === area.id);
        const grouped = allPrograms.some((program) =>
          program.domain === area.id &&
          (program.courseIds || []).some((id) => verifiedRecords.some((record) => record.id === id))
        );
        return direct || grouped;
      }).length;
      const guidedCount = verifiedRecords.filter((item) => guidedIds.has(item.id)).length;
      const formalCount = verifiedRecords.length - guidedCount;
      stats.innerHTML = '<span><strong>' + visibleAreas + '</strong> domains</span><span><strong>' + verifiedRecords.length + '</strong> verified completed courses</span><span><strong>' + formalCount + '</strong> formal course credentials</span><span><strong>' + guidedCount + '</strong> guided projects</span>';
    }
  }
  function applySiteSettings() {
    document.documentElement.dataset.font = settings.typography?.preset || 'executive';
    document.documentElement.dataset.fontSize = settings.typography?.size || 'medium';
    document.body.classList.toggle('hide-takeaways', learningSettings.showTakeaways === false);
  }
  mount("featured-certifications", data.certifications, featuredCertificationCard, true);
  mountDomainAreas();
  mount("featured-projects", data.projects, projectCard, true);
  mountProjectGroups();
  mount("featured-publications", data.publications, publicationCard, true);
  mount("all-publications", data.publications, publicationCard, false);
  const visiblePublications = data.publications.filter(visibleForProfile);
  const publicationStats = document.getElementById('publication-stats');
  if (publicationStats) publicationStats.innerHTML = '<span><strong>' + visiblePublications.length + '</strong> selected records</span><span><strong>2026–2020</strong> current range</span>';
  applySiteSettings();
  if (profileFilter && profileLabels[profileFilter]) {
    const variantHome = ({ genai: './genai/', aiml: './aiml/', faculty: './faculty/' })[profileFilter] || './index.html';
    const brand = document.querySelector('.site-header .brand');
    if (brand) brand.setAttribute('href', variantHome);
    document.querySelectorAll('.site-header nav a, footer a').forEach((link) => {
      const href = link.getAttribute('href');
      if (href === './index.html') link.setAttribute('href', variantHome);
      if (['./learning.html', './projects.html', './publications.html'].includes(href)) {
        link.setAttribute('href', href + '?profile=' + encodeURIComponent(profileFilter));
      }
    });
    const hero = document.querySelector('.page-hero');
    const cleanPath = window.location.pathname.split('/').pop() || 'index.html';
    if (hero) hero.insertAdjacentHTML('beforeend', '<div class="filter-note">Filtered for <strong>' + esc(profileLabels[profileFilter]) + '</strong><a href="' + esc(cleanPath) + '">Show comprehensive archive</a></div>');
  }
}());
