#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT"

LOG="/tmp/waseem-portfolio-8000.log"
PIDFILE="/tmp/waseem-portfolio-8000.pid"

# If the portfolio is already responding, keep the existing server.
if curl -fsS --max-time 2 http://127.0.0.1:8000/ >/dev/null 2>&1; then
  echo "Portfolio preview is already available on port 8000."
  exit 0
fi

# Remove a stale PID file if the previous process no longer exists.
if [[ -f "$PIDFILE" ]]; then
  OLD_PID="$(cat "$PIDFILE" 2>/dev/null || true)"
  if [[ -n "$OLD_PID" ]] && ! kill -0 "$OLD_PID" 2>/dev/null; then
    rm -f "$PIDFILE"
  fi
fi

echo "Starting portfolio preview on port 8000..."
nohup npm run dev >"$LOG" 2>&1 &
echo $! >"$PIDFILE"

for _ in {1..30}; do
  if curl -fsS --max-time 2 http://127.0.0.1:8000/ >/dev/null 2>&1; then
    echo "Portfolio preview is ready on port 8000."
    echo "In Codespaces, open the forwarded port from the Ports panel."
    exit 0
  fi
  sleep 0.5
done

echo "Portfolio preview did not start successfully."
echo "Recent server output:"
tail -n 40 "$LOG" || true
exit 1
