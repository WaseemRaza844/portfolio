(function () {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;
  const settings = data.settings || {};
  const learningSettings = settings.learning || {};

  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
  const tags = (items) => '<div class="tags">' + items.map((x) => '<span>' + esc(x) + '</span>').join("") + "</div>";

  const pdfDocument = (url, label) => {
    if (!url) return "";
    const isPdf = /\.pdf(?:$|[?#])/i.test(url);
    if (!isPdf) {
      return '<a class="pdf-link" href="' + esc(url) + '" target="_blank" rel="noopener">Open ' + esc(label) + ' <span>↗</span></a>';
    }
    return '<details class="pdf-preview"><summary>Preview ' + esc(label) + '<span class="preview-chevron" aria-hidden="true">⌄</span></summary>' +
      '<div class="pdf-preview-body"><iframe src="' + esc(url) + '#view=FitH" title="' + esc(label) + ' preview" loading="lazy"></iframe>' +
      '<a class="pdf-link" href="' + esc(url) + '" target="_blank" rel="noopener">Open full PDF in a new tab <span>↗</span></a></div></details>';
  };
  const externalLinks = (links) => {
    const labels = { coursera: "Coursera", linkedin: "LinkedIn", github: "GitHub" };
    return Object.entries(links || {}).filter(([, url]) => url).map(([key, url]) =>
      '<a href="' + esc(url) + '" target="_blank" rel="noopener" onclick="event.stopPropagation()">' + esc(labels[key] || key) + ' ↗</a>'
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
      (course.summary ? '<small class="course-teaser">' + esc(course.summary) + '</small>' : '') + '</span>' +
      '<span class="course-progress"><strong>' + esc(moduleText) + '</strong>' + (dateText ? '<small>' + esc(dateText) + '</small>' : '') + '</span>' +
      '<span class="accordion-icon" aria-hidden="true"></span></summary>' +
      '<div class="course-content">' + (course.takeaway ? '<div class="takeaway-field"><p class="field-label">Key takeaway</p><p>' + esc(course.takeaway) + '</p></div>' : '') +
      (course.skills?.length ? '<div><p class="field-label">Skills</p>' + tags(course.skills) + '</div>' : '') +
      pdfDocument(course.certificateUrl, "course certificate") + '</div></details>';
  }

  function certificationAccordion(item, index) {
    const completed = completedCount(item.courses);
    const total = item.courses.length;
    const inProgress = item.status.toLowerCase().includes('progress');
    const rawDate = item.completionDate.replace(/^(Target:|Completed:?)\s*/i, '');
    const dateText = rawDate && !/^completed$/i.test(rawDate) ? (inProgress ? 'Target: ' : 'Completed: ') + rawDate : 'Completion date on credential';
    return '<details class="certification-accordion reveal visible"><summary><span class="cert-number">' + (index + 1) + '</span><div class="cert-summary-main"><p class="detail-type">' + esc(item.issuer) + '</p><h2>' + esc(item.title) + '</h2><p class="cert-teaser">' + esc(item.summary) + '</p></div><div class="cert-summary-side"><div class="credential-links">' + externalLinks(item.links) + '</div><span class="accordion-icon" aria-hidden="true"></span><div class="cert-progress"><strong>Completed (' + completed + '/' + total + ') courses</strong><span>' + esc(dateText) + '</span></div></div></summary>' +
      '<div class="certification-content"><div class="cert-overview"><div><p class="field-label">Certification overview</p><p>' + esc(item.summary) + '</p></div>' + (item.takeaway ? '<div class="takeaway-field"><p class="field-label">Key takeaway</p><p>' + esc(item.takeaway) + '</p></div>' : '') + '<div><p class="field-label">Key skills &amp; tools</p>' + tags(item.skills) + '</div>' + pdfDocument(item.certificateUrl, "professional certificate") + '</div>' +
      '<div class="course-section"><div class="course-heading"><p class="field-label">Courses included</p><span>Select a course to see details</span></div>' + item.courses.map(courseAccordion).join("") + '</div></div></details>';
  }
  function projectCard(item) {
    return '<article class="project-card reveal visible"><div class="detail-card-top"><p class="project-year">' + esc(item.date) + '</p><span class="project-kind">' + esc(item.category) + '</span></div><h3>' + esc(item.title) + '</h3><p>' + esc(item.summary) + '</p>' + tags(item.skills) + '</article>';
  }
  function publicationCard(item) {
    const body = '<span class="year">' + esc(item.year) + '</span><div><p class="pub-venue">' + esc(item.venue) + '</p><h3>' + esc(item.title) + '</h3><p>' + esc(item.summary) + '</p>' + tags(item.topics) + '</div><span class="arrow">' + (item.url ? "↗" : "") + '</span>';
    return item.url ? '<a class="pub reveal visible" href="' + esc(item.url) + '" target="_blank" rel="noopener">' + body + '</a>' : '<article class="pub reveal visible">' + body + '</article>';
  }
  function mount(id, items, render, featured) {
    const el = document.getElementById(id);
    if (!el) return;
    const selected = featured ? items.filter((x) => x.featured) : items;
    el.innerHTML = selected.map(render).join("");
  }
  function domainAreaSection(area, items) {
    return '<section class="domain-area" data-domain="' + esc(area.id) + '"><div class="domain-area-head"><div><p class="eyebrow">DOMAIN AREA</p><h2>' + esc(area.title) + '</h2><p>' + esc(area.description) + '</p></div><span>' + items.length + ' certification' + (items.length === 1 ? '' : 's') + '</span></div><div class="accordion-list">' + items.map(certificationAccordion).join('') + '</div></section>';
  }
  function mountDomainAreas() {
    const el = document.getElementById('all-certifications');
    if (!el) return;
    const areas = data.domainAreas || [];
    el.innerHTML = areas.map((area) => {
      const items = data.certifications.filter((item) => item.domain === area.id);
      return items.length || learningSettings.showEmptyPaths ? domainAreaSection(area, items) : '';
    }).join('');
    const stats = document.getElementById('learning-stats');
    if (stats) {
      const visibleAreas = areas.filter((area) => data.certifications.some((item) => item.domain === area.id)).length;
      const inProgress = data.certifications.filter((item) => item.status.toLowerCase().includes('progress')).length;
      stats.innerHTML = '<span><strong>' + visibleAreas + '</strong> domain areas</span><span><strong>' + data.certifications.length + '</strong> certifications</span><span><strong>' + inProgress + '</strong> in progress</span>';
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
  mount("all-projects", data.projects, projectCard, false);
  mount("featured-publications", data.publications, publicationCard, true);
  mount("all-publications", data.publications, publicationCard, false);
  applySiteSettings();
}());
