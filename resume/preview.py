#!/usr/bin/env python3
"""Serve the organized resume tree on port 8001, rebuilding when sources change."""
import argparse
import functools
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import subprocess
import sys
import threading

HERE = Path(__file__).resolve().parent


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()


def source_stamp():
    paths = list((HERE.parent / 'dist' / 'data').glob('*.js'))
    paths += list(HERE.glob('*.py')) + list(HERE.glob('*.json'))
    paths += list(HERE.glob('*.cjs')) + list(HERE.glob('*.tex'))
    for folder in (HERE / 'resume-profiles', HERE / 'job-applications'):
        if folder.exists():
            paths += [p for p in folder.rglob('*') if p.is_file() and p.suffix.lower() in {'.json', '.tex', '.md'}]
    return tuple((str(path), path.stat().st_mtime_ns) for path in sorted(set(paths)))


def run_script(name, *args):
    return subprocess.run([sys.executable, str(HERE / name), *args]).returncode


def build():
    for script, args in (
        ('build.py', ('--all',)),
        ('build_tailored.py', ('--all',)),
        ('build_application_documents.py', ()),
    ):
        code = run_script(script, *args)
        if code:
            return code
    return 0


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=8001)
    parser.add_argument('--watch', action='store_true', help='Rebuild all PDFs and application documents when sources change.')
    args = parser.parse_args()
    if build():
        sys.exit('Fix the build error before starting the preview.')
    # Serve the resume root so generic PDFs and job-specific files have one
    # consistent browser URL hierarchy matching the repository.
    handler = functools.partial(NoCacheHandler, directory=str(HERE))
    server = ThreadingHTTPServer(('0.0.0.0', args.port), handler)
    stop = threading.Event()

    def watch():
        previous = source_stamp()
        while not stop.wait(1):
            try:
                current = source_stamp()
                if current != previous:
                    previous = current
                    if build():
                        print('BUILD FAILED: inspect the terminal; previous generated files are unchanged.', flush=True)
                    else:
                        print('Rebuilt PDFs and Word application documents. Refresh the browser tab.', flush=True)
            except OSError as exc:
                print('Watch: ' + str(exc), flush=True)

    if args.watch:
        threading.Thread(target=watch, daemon=True).start()
    print(f'Resume preview on port {args.port}. Open /resume-profiles/ or /job-applications/ in the browser.', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        stop.set()
        server.server_close()


if __name__ == '__main__':
    main()
