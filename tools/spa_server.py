from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import quote
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

    def _spa_redirect_target(self):
        requested = Path(self.translate_path(self.path))

        if requested.exists() and requested.is_file():
            return None

        route = self.path.split('?', 1)[0].split('#', 1)[0]
        if route == '/':
            return None

        if not Path(route).suffix:
            return f'/?r={quote(route, safe="/-_~")}'

        return None

    def _send_spa_redirect(self):
        target = self._spa_redirect_target()
        if not target:
            return False

        self.send_response(302)
        self.send_header('Location', target)
        self.end_headers()
        return True

    def do_GET(self):
        if self._send_spa_redirect():
            return
        return super().do_GET()

    def do_HEAD(self):
        if self._send_spa_redirect():
            return
        return super().do_HEAD()


if __name__ == '__main__':
    os.chdir(ROOT)
    server = ThreadingHTTPServer(('127.0.0.1', PORT), SPARequestHandler)
    print(f'SPA server running at http://127.0.0.1:{PORT}/')
    server.serve_forever()
