#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
command -v python3 >/dev/null || { echo 'Python 3 is required.'; exit 1; }
command -v node >/dev/null || { echo 'Node.js is required to read the portfolio data.'; exit 1; }
if ! command -v pdflatex >/dev/null || ! kpsewhich needspace.sty >/dev/null || ! kpsewhich lmodern.sty >/dev/null; then
  echo 'Installing LaTeX for the reference resume style (first setup only)...'
  sudo apt-get update
  sudo apt-get install -y --no-install-recommends texlive-latex-extra texlive-fonts-recommended lmodern
fi
python3 -m venv resume/.venv
resume/.venv/bin/python -m pip install -r resume/requirements.txt
echo 'Ready: resume/.venv/bin/python resume/build.py --all'
