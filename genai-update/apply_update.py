"""Run from the portfolio root: python genai-update/apply_update.py"""
import json
import re
import shutil
from datetime import datetime, timezone
from pathlib import Path

package = Path(__file__).resolve().parent
target = Path('dist/data/certifications.js')
if not target.is_file():
    raise SystemExit('Run this command from the portfolio folder containing dist/.')
text = target.read_text(encoding='utf-8-sig')
if 'const CERT_GENAI_05_BUILDING_AI_AGENTS' in text:
    raise SystemExit('Update already applied. Edit the CERT_GENAI records directly.')
payload = json.loads((package / 'records.json').read_text(encoding='utf-8'))
renames = {
    'CERT_02_awsBedrockProfessional': 'CERT_GENAI_01_AWS_BEDROCK',
    'CERT_03_ibmGenaiEngineering': 'CERT_GENAI_02_IBM_GENAI_ENGINEERING',
}
blocks = []
for old, new in renames.items():
    pattern = re.compile(r'^[ \t]*// #region[^\n]*\n[ \t]*const ' + re.escape(old) + r'\s*=.*?^[ \t]*// #endregion[^\n]*', re.M | re.S)
    matches = list(pattern.finditer(text))
    if len(matches) != 1:
        raise SystemExit('Cannot safely locate ' + old + '. No files changed.')
    block = matches[0].group()
    blocks.append(block.replace(old, new))
    text = text[:matches[0].start()] + text[matches[0].end():]

for old, (new, record) in payload['replacements'].items():
    pattern = re.compile(r'^[ \t]*// #region[^\n]*\n[ \t]*const ' + re.escape(old) + r'\s*=.*?^[ \t]*// #endregion[^\n]*', re.M | re.S)
    matches = list(pattern.finditer(text))
    if len(matches) != 1:
        raise SystemExit('Cannot safely locate ' + old + '. No files changed.')
    text = text[:matches[0].start()] + text[matches[0].end():]
    renames[old] = new
    blocks.append('  // #region ' + new + '\n  const ' + new + ' = ' + json.dumps(record, indent=2, ensure_ascii=False) + ';\n  // #endregion')

for new, record in payload['additions']:
    blocks.append('  // #region ' + new + '\n  const ' + new + ' = ' + json.dumps(record, indent=2, ensure_ascii=False) + ';\n  // #endregion')

pattern = re.compile(r'window\.PORTFOLIO_DATA\.certifications\s*=\s*\[([^\]]*)\]\s*;')
match = pattern.search(text)
if not match:
    raise SystemExit('Cannot locate registration array. No files changed.')
entries = [s.strip() for s in match.group(1).split(',') if s.strip()]
if not all(re.fullmatch(r'[A-Za-z_$][\w$]*', s) for s in entries):
    raise SystemExit('Registration array uses an unexpected format. No files changed.')
if not all(entries.count(s) == 1 for s in renames):
    raise SystemExit('Expected each existing GenAI constant once in array. No files changed.')
order = sorted(renames.values()) + [n for n, _ in payload['additions']]
other = [s for s in entries if s not in renames]
registration = 'window.PORTFOLIO_DATA.certifications = [\n    ' + ',\n    '.join(order + other) + '\n  ];'
blocks.sort(key=lambda b: re.search(r'const (CERT_GENAI_\w+)', b).group(1))
updated = text[:match.start()] + '\n'.join(blocks) + '\n\n  ' + registration + text[match.end():]
# Reject conflicting PDF destinations before making changes.
copies = []
for source in (package / 'certificates').rglob('*.pdf'):
    dest = Path('dist/certificates') / source.relative_to(package / 'certificates')
    if dest.exists() and dest.read_bytes() != source.read_bytes():
        raise SystemExit('Different PDF already exists at ' + str(dest) + '. No files changed.')
    copies.append((source, dest))
backup = Path('genai-update-backups') / datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')
backup.mkdir(parents=True)
shutil.copy2(target, backup / 'certifications.js')
for source, dest in copies:
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, dest)
target.write_text(updated, encoding='utf-8')
print('Updated GenAI records and copied four PDFs. Backup:', backup)
print('Preview Learning; add the two new IDs to any explicit homepage/resume selections as desired.')
