from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os
import posixpath
import sys

ROOT = Path(__file__).resolve().parents[1]
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4173


class SPARequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def translate_path(self, path):
        path = path.split('?', 1)[0].split('#', 1)[0]
        path = posixpath.normpath(path)
        words = [w for w in path.split('/') if w]
        p = ROOT
        for word in words:
            if word in (os.curdir, os.pardir):
                continue
            p = p / word
        return str(p)

    def _rewrite_for_spa(self):
        requested = Path(self.translate_path(self.path))

        # Serve existing files normally
        if requested.exists() and requested.is_file():
            return

        # Serve index.html for extensionless SPA routes
        route = self.path.split('?', 1)[0].split('#', 1)[0]
        if not Path(route).suffix:
            self.path = '/index.html'

    def do_GET(self):
        self._rewrite_for_spa()
        return super().do_GET()

    def do_HEAD(self):
        self._rewrite_for_spa()
        return super().do_HEAD()


if __name__ == '__main__':
    os.chdir(ROOT)
    server = ThreadingHTTPServer(('127.0.0.1', PORT), SPARequestHandler)
    print(f'SPA server running at http://127.0.0.1:{PORT}/')
    server.serve_forever()
