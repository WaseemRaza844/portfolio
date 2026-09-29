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
    return '<details class="pdf-preview"><summary>Preview ' + esc(label) + '<span class="preview-chevron" aria-hidden="true">⌄</span></summary>' +
      '<div class="pdf-preview-body"><iframe src="' + esc(url) + '#view=FitH" title="' + esc(label) + ' preview" loading="lazy"></iframe>' +
      '<a class="pdf-link" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">Open full PDF in a new tab <span>↗</span></a></div></details>';
  };
  const externalLinks = (links) => {
    const labels = { coursera: "Coursera", linkedin: "LinkedIn", github: "GitHub" };
    return Object.entries(links || {}).filter(([, url]) => url).map(([key, url]) =>
      '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">' + esc(labels[key] || key) + ' ↗</a>'
    ).join('');
  };
  const completedCount = (courses) => courses.filter((course) =>
    /^completed/i.test(course.status || '') || /^completed/i.test(course.completionDate || '')
  ).length;

  function featuredCertificationCard(item) {
    const active = item.status.toLowerCase().includes("progress") ? " active" : "";
    return '<article class="detail-card reveal visible">' +
      '<div class="detail-card-top"><span class="credential-state' + active + '">' + esc(item.status) + '</span><span class="detail-date">' + esc(item.completionDate) + '</span></div>' +
      '<p class="detail-type">' + esc(item.issuer) + '</p><h3>' + esc(item.title) + '</h3><p>' + esc(learningSettings.showTakeaways ? (item.takeaway || item.summary) : item.summary) + '</p>' +
      tags(item.skills) + '<a class="text-link" href="./learning.html">View courses and credentials ↗</a></article>';
  }

  function courseAccordion(course, index) {
    const status = course.status || (/^completed/i.test(course.completionDate || '') ? 'Completed' : 'In progress');
    const hasModuleCount = Number.isFinite(course.modulesCompleted) && Number.isFinite(course.modulesTotal);
    const moduleText = hasModuleCount ? status + ' (' + course.modulesCompleted + '/' + course.modulesTotal + ') modules' : status;
    const rawDate = String(course.completionDate || '').replace(/^(Target:|Completed:?)\s*/i, '');
    const dateText = rawDate && !/^(completed|in progress)$/i.test(rawDate)
      ? (status.toLowerCase().includes('progress') ? 'Target: ' : 'Completed: ') + rawDate
      : '';
    return '<details class="course-accordion"><summary><span class="course-number">C' + (index + 1) + '</span><span class="course-title"><strong>' + esc(course.title) + '</strong>' +
      ((course.summary || course.takeaway) ? '<small class="course-teaser">' + esc(course.summary || course.takeaway) + '</small>' : '') + '</span>' +
      '<span class="course-progress"><strong>' + esc(moduleText) + '</strong>' + (dateText ? '<small>' + esc(dateText) + '</small>' : '') + '</span>' +
      '<span class="accordion-icon" aria-hidden="true"></span></summary>' +
      '<div class="course-content">' + (course.takeaway ? '<div class="takeaway-field"><p class="field-label">Key takeaway</p><p>' + esc(course.takeaway) + '</p></div>' : '') +
      (course.skills?.length ? '<div><p class="field-label">Skills</p>' + tags(course.skills) + '</div>' : '') +
      pdfDocument(course.certificateUrl, "course certificate") + '</div></details>';
  }

  function certificationAccordion(item, index) {
    const completed = item.reportedProgress?.completed ?? completedCount(item.courses);
    const total = item.reportedProgress?.total ?? item.courses.length;
    const inProgress = item.status.toLowerCase().includes('progress');
    const rawDate = item.completionDate.replace(/^(Target:|Completed:?)\s*/i, '');
    const dateText = rawDate && !/^completed$/i.test(rawDate) ? (inProgress ? 'Target: ' : 'Completed: ') + rawDate : 'Completion date on credential';
    const progressLabel = inProgress ? 'In progress (' + completed + '/' + total + ') courses' : 'Completed (' + completed + '/' + total + ') courses';
    return '<details class="certification-accordion reveal visible"><summary><span class="cert-number">' + (index + 1) + '</span><div class="cert-summary-main"><p class="detail-type">' + esc(item.issuer) + '</p><h2>' + esc(item.title) + '</h2><p class="cert-teaser">' + esc(item.summary) + '</p></div><div class="cert-summary-side"><div class="credential-links">' + externalLinks(item.links) + '</div><span class="accordion-icon" aria-hidden="true"></span><div class="cert-progress"><strong>' + esc(progressLabel) + '</strong><span>' + esc(dateText) + '</span></div></div></summary>' +
      '<div class="certification-content"><div class="cert-overview"><div><p class="field-label">Certification overview</p><p>' + esc(item.summary) + '</p></div>' + (item.curriculumNote ? '<div><p class="field-label">Curriculum version</p><p>' + esc(item.curriculumNote) + '</p></div>' : '') + (item.takeaway ? '<div class="takeaway-field"><p class="field-label">Key takeaway</p><p>' + esc(item.takeaway) + '</p></div>' : '') + '<div><p class="field-label">Key skills &amp; tools</p>' + tags(item.skills) + '</div>' + pdfDocument(item.certificateUrl, "professional certificate") + '</div>' +
      '<div class="course-section"><div class="course-heading"><p class="field-label">Courses included</p><span>Select a course to see details</span></div>' + item.courses.map(courseAccordion).join("") + '</div></div></details>';
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
      '<footer class="project-actions">' + architectureLink + caseStudyLink + '</footer>' +
      '</article>';
  }

  function projectLinkList(links) {
    const labels = { github: 'GitHub', demo: 'Live demo', coursera: 'Coursera', paper: 'Publication', project: 'Project link' };
    return Object.entries(links || {}).filter(([, url]) => url).map(([key, url]) =>
      '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">' + esc(labels[key] || key) + ' ↗</a>'
    ).join('');
  }

  function projectAccordion(item, index) {
    const projectLinks = projectLinkList(item.links);
    const relatedCertifications = (item.relatedCertificationIds || [])
      .map((id) => data.certifications.find((cert) => cert.id === id))
      .filter(Boolean);
    const credentialBlock = item.certificateUrl
      ? '<div><p class="field-label">Project certificate / credential</p>' + pdfDocument(item.certificateUrl, 'project certificate') + '</div>'
      : relatedCertifications.length
        ? '<div><p class="field-label">Related learning credentials</p><div class="project-related-credentials">' + relatedCertifications.map((cert) => '<span>' + esc(cert.title) + '</span>').join('') + '</div></div>'
        : '<div><p class="field-label">Certificate / credential</p><p>No separate project certificate is currently recorded for this project.</p></div>';

    return '<details class="project-accordion reveal visible" id="' + esc(item.id || '') + '"><summary>' +
      '<span class="project-number">' + String(index + 1).padStart(2, '0') + '</span>' +
      '<div class="project-summary-main"><p class="detail-type">' + esc(item.category) + '</p><h2>' + esc(item.title) + '</h2>' +
      (item.skills?.length ? tags(item.skills) : '') + '</div>' +
      '<div class="project-summary-side"><div class="project-links">' + projectLinks + '</div><span class="accordion-icon" aria-hidden="true"></span>' +
      '<div class="project-status"><strong>' + esc(item.status || 'Project') + '</strong><span>' + esc(item.date || '') + '</span></div></div>' +
      '</summary><div class="project-accordion-content">' +
      '<div class="project-overview"><div><p class="field-label">Project overview</p><p>' + esc(item.summary) + '</p></div>' +
      '<div><p class="field-label">Project type</p><p>' + esc(item.category) + '</p></div>' +
      '<div><p class="field-label">Status & timeline</p><p>' + esc(item.status || '') + (item.date ? ' · ' + esc(item.date) : '') + '</p></div></div>' +
      '<div class="project-evidence"><div><p class="field-label">Important skills & tools</p>' + tags(item.skills || []) + '</div>' +
      (projectLinks ? '<div><p class="field-label">Relevant links</p><div class="project-links expanded">' + projectLinks + '</div></div>' : '') +
      credentialBlock + '</div></div></details>';
  }

  function projectGroupSection(group, items) {
    return '<section class="project-group" data-project-group="' + esc(group.id) + '">' +
      '<div class="project-group-head"><div><p class="eyebrow">PROJECT GROUP</p><h2>' + esc(group.title) + '</h2><p>' + esc(group.description) + '</p></div>' +
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
      '<time class="year" itemprop="datePublished" datetime="' + esc(item.year) + '">' + esc(item.year) + '</time>' +
      '<div class="publication-copy"><span class="badge publication-badge" itemprop="isPartOf">' + esc(venueBadge) + '</span>' +
      '<h3 itemprop="headline">' + esc(item.title) + '</h3><p itemprop="description">' + esc(item.summary) + '</p>' +
      (item.topics?.length ? tags(item.topics) : '') +
      '<div class="publication-actions"><a href="' + esc(paperUrl) + '" target="_blank" rel="noopener noreferrer" itemprop="url">' + esc(paperLabel) + '</a>' +
      '<button type="button" data-bibtex="' + esc(encodedBibtex) + '" onclick="navigator.clipboard.writeText(decodeURIComponent(this.dataset.bibtex)); this.textContent=\'Copied\'; setTimeout(() => { this.textContent=\'BibTeX\'; }, 1200);">BibTeX</button></div></div>' +
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
  function domainAreaSection(area, items) {
    return '<section class="domain-area" data-domain="' + esc(area.id) + '"><div class="domain-area-head"><div><p class="eyebrow">DOMAIN AREA</p><h2>' + esc(area.title) + '</h2><p>' + esc(area.description) + '</p></div><span>' + items.length + ' certification' + (items.length === 1 ? '' : 's') + '</span></div><div class="accordion-list">' + items.map(certificationAccordion).join('') + '</div></section>';
  }
  function mountDomainAreas() {
    const el = document.getElementById('all-certifications');
    if (!el) return;
    const areas = data.domainAreas || [];
    const filteredCertifications = data.certifications.filter(visibleForProfile);
    el.innerHTML = areas.map((area) => {
      const items = filteredCertifications.filter((item) => item.domain === area.id);
      return items.length || learningSettings.showEmptyPaths ? domainAreaSection(area, items) : '';
    }).join('');
    const stats = document.getElementById('learning-stats');
    if (stats) {
      const visibleAreas = areas.filter((area) => filteredCertifications.some((item) => item.domain === area.id)).length;
      const inProgress = filteredCertifications.filter((item) => item.status.toLowerCase().includes('progress')).length;
      stats.innerHTML = '<span><strong>' + visibleAreas + '</strong> domain areas</span><span><strong>' + filteredCertifications.length + '</strong> certifications</span><span><strong>' + inProgress + '</strong> in progress</span>';
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
