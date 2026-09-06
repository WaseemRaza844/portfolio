"""Serve dist/ on port 8000 with cache disabled.

Use `npm run dev` for automatic browser refresh. This dependency-free fallback
requires a manual refresh after saving a file.
"""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    handler = partial(NoCacheRequestHandler, directory="dist")
    server = ThreadingHTTPServer(("0.0.0.0", 8000), handler)
    print("Portfolio preview: http://localhost:8000")
    print("Serving dist/ with browser caching disabled. Press Ctrl+C to stop.")
    server.serve_forever()
