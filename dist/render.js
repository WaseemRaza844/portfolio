(function () {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
  const tags = (items) => '<div class="tags">' + items.map((x) => '<span>' + esc(x) + '</span>').join("") + "</div>";

  function certificationCard(item) {
    const active = item.status.toLowerCase().includes("progress") ? " active" : "";
    return '<article class="detail-card reveal visible">' +
      '<div class="detail-card-top"><span class="credential-state' + active + '">' + esc(item.status) + '</span><span class="detail-date">' + esc(item.completionDate) + '</span></div>' +
      '<p class="detail-type">' + esc(item.issuer) + '</p><h3>' + esc(item.title) + '</h3><p>' + esc(item.summary) + '</p>' +
      '<div class="detail-block"><strong>Key skills</strong>' + tags(item.skills) + '</div>' +
      '<div class="detail-block"><strong>Courses included</strong><ul>' + item.courses.map((x) => '<li>' + esc(x) + '</li>').join("") + '</ul></div></article>';
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
  mount("featured-certifications", data.certifications, certificationCard, true);
  mount("all-certifications", data.certifications, certificationCard, false);
  mount("featured-projects", data.projects, projectCard, true);
  mount("all-projects", data.projects, projectCard, false);
  mount("featured-publications", data.publications, publicationCard, true);
  mount("all-publications", data.publications, publicationCard, false);
}());
