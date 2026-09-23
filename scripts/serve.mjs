// 점검용 정적 서버. Node 내장 http 만 쓴다 — python3 같은 바깥 실행 파일에 기대지 않는다(윈도우에서도 돈다).
// serve(root, port, host) 는 { url, port, ready, close() } 를 돌려준다.
// 기본 바인딩은 127.0.0.1 이다 — 검수(e2e·shots)는 방화벽 대화상자를 띄우면 안 되기 때문이다.
// 폰에서 열어 보는 개발 서버(scripts/dev.mjs)만 '0.0.0.0' 을 넘긴다.
import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import path from 'node:path';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

export function serve(root, port = 4183, host = '127.0.0.1') {
  const base = path.resolve(root);
  const server = createServer((request, response) => {
    let pathname = '/';
    try { pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname); } catch (error) { pathname = '/'; }
    if (pathname.endsWith('/')) pathname += 'index.html';
    const file = path.join(base, path.normalize(pathname).replace(/^([\\/]|\.\.)+/u, ''));
    // 루트 밖으로 나가는 요청은 막는다.
    if (!file.startsWith(base)) { response.writeHead(403).end('forbidden'); return; }
    let info;
    try { info = statSync(file); } catch (error) { info = null; }
    if (!info || !info.isFile()) { response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('not found'); return; }
    response.writeHead(200, {
      'content-type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'content-length': info.size,
      'cache-control': 'no-store',
    });
    createReadStream(file).pipe(response);
  });
  server.listen(port, host);
  const ready = new Promise((resolve, reject) => {
    server.once('listening', resolve);
    server.once('error', reject);
  });
  return {
    url: `http://127.0.0.1:${port}`,
    port,
    ready,
    close: () => new Promise((resolve) => { server.closeAllConnections?.(); server.close(() => resolve()); }),
  };
}
