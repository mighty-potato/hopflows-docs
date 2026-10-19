#!/usr/bin/env python3
"""Local-only preview of the checked-in Claude Design components.

This adapter implements the template features used by this snapshot. It is not
Claude Design's runtime and does not publish or write back to the source artifact.
"""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import argparse
import json

ROOT = Path(__file__).resolve().parents[2]
HERE = Path(__file__).resolve().parent
BLOBS = {
    '637eea0f0cb0fc9affcb69602a64aeba': 'assets/hopflows-app-icon.svg',
    'af734ff66eba4c9a8304432b5f21b934': 'assets/punh-punh-done.png',
    'a431a6fdd4e19f548f54f9fd97283158': 'assets/punh-punh-wave.png',
    '780266c96f9700604ecc05b950fef158': 'assets/punh-punh-wave-right.png',
    '8baaebf55e0c1d993e17cdd2cd7bfe02': 'assets/punh-punh-welcome.png',
    '45ad8afd0afb75ee4546f634d05e9875': 'assets/punh-punh-welcome-right.png',
    '9275412045caede2fafcdfc2bb2771d3': 'employee.css',
}


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        path = self.path.split('?', 1)[0]
        if path == '/':
            self.path = '/tools/design-preview/index.html'
        elif path == '/docs/design/support.js':
            self.path = '/tools/design-preview/runtime.js'
        elif path.startswith('/_blob/') and path.rsplit('/', 1)[-1] in BLOBS:
            self.path = '/docs/design/' + BLOBS[path.rsplit('/', 1)[-1]]
        super().do_GET()

    def do_POST(self):
        if self.path != '/__verification':
            self.send_error(404)
            return
        # Only the local preview may write its non-sensitive verification result.
        if self.headers.get('Origin') != f'http://127.0.0.1:{self.server.server_port}':
            self.send_error(403)
            return
        size = int(self.headers.get('Content-Length', '0'))
        if size > 200000:
            self.send_error(413)
            return
        payload = json.loads(self.rfile.read(size))
        path = ROOT / 'docs/design/review/verification.json'
        path.write_text(json.dumps(payload, indent=2) + '\n')
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b'Saved local verification results')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=4173)
    args = parser.parse_args()
    print(f'Local design preview: http://127.0.0.1:{args.port}', flush=True)
    ThreadingHTTPServer(('127.0.0.1', args.port), Handler).serve_forever()
