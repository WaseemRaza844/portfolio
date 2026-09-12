#!/usr/bin/env python3
"""Run from the portfolio repository root. Back up and merge the resume update."""
import json
from pathlib import Path
import shutil
from datetime import datetime, timezone

HERE = Path(__file__).resolve().parent
ROOT = Path.cwd()
TARGET = ROOT / 'resume'

def read(path):
    return json.loads(path.read_text(encoding='utf-8'))

def main():
    if not (TARGET / 'variants.json').is_file():
        raise SystemExit('Run this command from your repository root containing resume/ and dist/.')
    payload = read(HERE / 'expanded-content.json')
    if not (HERE / 'latex_renderer.py').is_file():
        raise SystemExit('Keep all three update files together before running this script.')
    variants = read(TARGET / 'variants.json')
    config = read(TARGET / 'content.json')
    # Read existing IDs so all-selected variants preserve custom experience records.
    import sys
    sys.path.insert(0, str(TARGET))
    from build import read_source
    source_ids = [r['id'] for r in read_source()['identity']['experience']]
    old_extra_ids = [r['id'] for r in config.get('additionalExperience', [])]
    new_ids = [r['id'] for r in payload['additionalExperience']]
    for key, changes in payload['variants'].items():
        if key not in variants:
            continue
        variant = variants[key]
        variant.update(changes)
        variant.pop('pageBreakBefore', None)
        ids = variant.get('experienceIds', [])
        if ids == 'all':
            ids = list(dict.fromkeys(source_ids + old_extra_ids))
        if 'industry-research' in ids:
            index = ids.index('industry-research')
            ids[index:index + 1] = new_ids
        variant['experienceIds'] = list(dict.fromkeys(ids))
    overrides = config.setdefault('experienceOverrides', {})
    for key, changes in payload['experienceOverrides'].items():
        existing = overrides.setdefault(key, {})
        existing.update(changes)
        # Prior short per-variant bullets would otherwise hide the new full bullets.
        by_variant = existing.get('bulletsByVariant', {})
        if 'bullets' in changes:
            for variant in payload['variants']:
                by_variant.pop(variant, None)
    extra = config.setdefault('additionalExperience', [])
    for row in payload['additionalExperience']:
        if row['id'] in source_ids:
            overrides.setdefault(row['id'], {}).update(row)
            continue
        old = next((r for r in extra if r['id'] == row['id']), None)
        if old is None:
            extra.append(row)
        else:
            old.update(row)
    config.setdefault('settings', {})['explicitPageBreaks'] = False
    backup = TARGET / 'backups' / datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')
    backup.mkdir(parents=True)
    for name in ('variants.json', 'content.json', 'latex_renderer.py'):
        shutil.copy2(TARGET / name, backup / name)
    for name, value in [('variants.json', variants), ('content.json', config)]:
        (TARGET / name).write_text(json.dumps(value, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    shutil.copyfile(HERE / 'latex_renderer.py', TARGET / 'latex_renderer.py')
    print('Updated skills, leadership, experience and continuous pagination.')
    print('Preserved contact settings, certificate/project/publication selections and overrides.')
    print('Original files backed up at:', backup.relative_to(ROOT))
    print('Next: resume/.venv/bin/python resume/build.py --all')

if __name__ == '__main__':
    main()
