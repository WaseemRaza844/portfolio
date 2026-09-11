#!/usr/bin/env python3
"""Serve only generated PDFs on port 8001, optionally rebuilding on edits."""
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
    return tuple((str(path), path.stat().st_mtime_ns) for path in sorted(paths))


def build():
    return subprocess.run([sys.executable, str(HERE / 'build.py'), '--all']).returncode


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=8001)
    parser.add_argument('--watch', action='store_true', help='Rebuild all PDFs when source files change.')
    args = parser.parse_args()
    if build():
        sys.exit('Fix the build error before starting the preview.')
    handler = functools.partial(NoCacheHandler, directory=str(HERE / 'output'))
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
                        print('BUILD FAILED: inspect the terminal; PDF files may be from the last successful build.', flush=True)
                    else:
                        print('Rebuilt. Refresh the PDF browser tab.', flush=True)
            except OSError as exc:
                print('Watch: ' + str(exc), flush=True)

    if args.watch:
        threading.Thread(target=watch, daemon=True).start()
    print(f'PDF preview on port {args.port}. In Codespaces, open that port from the Ports tab.', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        stop.set()
        server.server_close()


if __name__ == '__main__':
    main()
