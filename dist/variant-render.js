(function () {
  const portfolio = window.PORTFOLIO_DATA;
  const profileData = window.PROFILE_DATA;
  const variantId = document.body.dataset.variant;
  const variant = profileData?.variants?.[variantId];
  const shared = profileData?.shared;
  if (!portfolio || !variant || !shared) return;

  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
  const byIds = (items, ids) => ids.map((id) => items.find((item) => item.id === id)).filter(Boolean);
  const tags = (items) => '<div class="tags">' + items.map((item) => '<span>' + esc(item) + '</span>').join('') + '</div>';

  document.title = variant.label + " | " + shared.name;
  document.querySelector('meta[name="description"]')?.setAttribute('content', variant.intro);
  document.getElementById('variant-label').textContent = variant.label;
  document.getElementById('variant-eyebrow').textContent = variant.eyebrow;
  document.getElementById('variant-name').textContent = shared.name;
  document.getElementById('variant-professional-title').textContent = variant.professionalTitle;
  document.getElementById('variant-motto').textContent = variant.motto;
  document.getElementById('variant-intro').textContent = variant.intro;
  document.getElementById('variant-image').src = shared.image;
  document.getElementById('variant-image').alt = "Temporary technology workspace visual for " + shared.shortName + "'s portfolio";
  document.getElementById('variant-designations').innerHTML = variant.designations.map((x) => '<span>' + esc(x) + '</span>').join('');

  document.getElementById('variant-proof').innerHTML = variant.proof.map((item) =>
    '<div><span class="proof-kicker">' + esc(item[0]) + '</span><strong>' + esc(item[1]) + '</strong><small>' + esc(item[2]) + '</small></div>'
  ).join('');

  document.getElementById('variant-skills').innerHTML = variant.skills.map((item, index) =>
    '<article class="research-card reveal visible"><span class="num">0' + (index + 1) + '</span><h3>' + esc(item[0]) + '</h3><p>' + esc(item[1]) + '</p></article>'
  ).join('');

  const certifications = byIds(portfolio.certifications, variant.certificationIds);
  document.getElementById('variant-certifications').innerHTML = certifications.map((item) =>
    '<article class="detail-card reveal visible"><div class="detail-card-top"><span class="credential-state' + (item.status.toLowerCase().includes('progress') ? ' active' : '') + '">' + esc(item.status) + '</span><span class="detail-date">' + esc(item.completionDate) + '</span></div><p class="detail-type">' + esc(item.issuer) + '</p><h3>' + esc(item.title) + '</h3><p>' + esc(item.summary) + '</p>' + tags(item.skills.slice(0, 6)) + '<a class="text-link" href="../learning.html?profile=' + esc(variantId) + '">View relevant credential details ↗</a></article>'
  ).join('');

  const projects = byIds(portfolio.projects, variant.projectIds);
  document.getElementById('variant-projects').innerHTML = projects.map((item) =>
    '<article class="project-card reveal visible"><div class="detail-card-top"><p class="project-year">' + esc(item.date) + '</p><span class="project-kind">' + esc(item.category) + '</span></div><h3>' + esc(item.title) + '</h3><p>' + esc(item.summary) + '</p>' + tags(item.skills) + '</article>'
  ).join('');

  const experience = shared.experience.filter((item) => item.profiles.includes(variantId));
  document.getElementById('variant-experience').innerHTML = experience.map((item) =>
    '<article class="timeline-item reveal visible"><div class="dot"></div><p class="date">' + esc(item.period) + '</p><div><h3>' + esc(item.role) + ' <span>· ' + esc(item.organization) + '</span></h3><p>' + esc(item[variantId] || item.generic) + '</p></div></article>'
  ).join('');

  const publications = byIds(portfolio.publications, variant.publicationIds);
  document.getElementById('variant-publications').innerHTML = publications.map((item) => {
    const content = '<span class="year">' + esc(item.year) + '</span><div><p class="pub-venue">' + esc(item.venue) + '</p><h3>' + esc(item.title) + '</h3><p>' + esc(item.summary) + '</p>' + tags(item.topics) + '</div><span class="arrow">' + (item.url ? '↗' : '') + '</span>';
    return item.url ? '<a class="pub reveal visible" href="' + esc(item.url) + '" target="_blank" rel="noopener">' + content + '</a>' : '<article class="pub reveal visible">' + content + '</article>';
  }).join('');

  document.getElementById('variant-education').innerHTML = shared.education.map((item) =>
    '<article><span>' + esc(item.period) + '</span><h3>' + esc(item.degree) + '</h3><p>' + esc(item.school) + '</p></article>'
  ).join('');
  document.getElementById('closing-title').textContent = variant.closingTitle;
  document.getElementById('closing-text').textContent = variant.closingText;
}());
