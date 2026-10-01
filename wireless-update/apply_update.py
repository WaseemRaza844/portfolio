"""Run from the portfolio root: python wireless-update/apply_update.py"""
from pathlib import Path
from datetime import datetime, timezone
import shutil

package = Path(__file__).resolve().parent
root = Path.cwd()
certs = root / 'dist/data/certifications.js'
domains = root / 'dist/data/domain-areas.js'
profile = root / 'dist/data/profile-data.js'
if not certs.is_file() or not domains.is_file():
    raise SystemExit('Run from the portfolio root containing dist/data/.')
marker = 'WIRELESS_CERTIFICATES_V1'
text = certs.read_text(encoding='utf-8-sig')
if marker in text:
    raise SystemExit('Wireless update already applied. Edit its records in certifications.js.')
ids = ['ai-for-telecommunications', '4g-network-fundamentals', 'business-considerations-5g-edge-iot-ai']
import re
if any(re.search(r'''["']?id["']?\s*:\s*["']''' + re.escape(i) + r'''["']''', text) for i in ids):
    raise SystemExit('A Wireless record ID already exists. No files changed; merge manually to avoid duplicates.')
domain_block = '''
// WIRELESS_CERTIFICATES_V1: reuse an existing domain; otherwise append it.
if (!window.PORTFOLIO_DATA.domainAreas.some(area => area.id === "wireless")) {
  window.PORTFOLIO_DATA.domainAreas.push({
    id: "wireless",
    title: "Wireless Networks & Telecommunications",
    description: "Cellular networks, AI for telecommunications, and 5G applications."
  });
}
'''
profile_block = '''
// WIRELESS_CERTIFICATES_V1: add to existing relevant homepage selections only.
(function () {
  const ids = ["ai-for-telecommunications", "4g-network-fundamentals", "business-considerations-5g-edge-iot-ai"];
  for (const key of ["generic", "wireless", "faculty"]) {
    const variant = window.PROFILE_DATA?.variants?.[key];
    if (variant && Array.isArray(variant.certificationIds)) {
      for (const id of ids) {
        if (!variant.certificationIds.includes(id)) variant.certificationIds.push(id);
      }
    }
  }
})();
'''
changes = {
    certs: text + '\n' + (package / 'wireless-records.js').read_text(encoding='utf-8'),
    domains: domains.read_text(encoding='utf-8-sig') + domain_block,
}
if profile.is_file():
    changes[profile] = profile.read_text(encoding='utf-8-sig') + profile_block
copies = []
for source in (package / 'pdfs').glob('*.pdf'):
    dest = root / 'dist/certificates/wireless' / source.name
    if dest.exists() and dest.read_bytes() != source.read_bytes():
        raise SystemExit('Different PDF already exists: ' + str(dest) + '. No files changed.')
    copies.append((source, dest))
backup = root / 'wireless-update-backups' / datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')
for path in changes:
    saved = backup / path.relative_to(root)
    saved.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(path, saved)
for source, dest in copies:
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, dest)
for path, content in changes.items():
    path.write_text(content, encoding='utf-8')
print('Added three Wireless records, domain fallback, homepage selections, and six PDFs.')
print('Backup:', backup)
print('Preview /learning.html and /learning.html?profile=wireless. No new route is created.')
