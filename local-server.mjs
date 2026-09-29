import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3000);

function loadEnvFile(file) {
  const p = path.join(ROOT, file);
  if (!fs.existsSync(p)) return;
  const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

// Local development convenience. Never expose this file through the static server.
loadEnvFile('.env.local');
loadEnvFile('.env');

const handlers = new Map();
for (const name of ['ai-import', 'bug-report', 'admin-reset']) {
  const module = await import(pathToFileURL(path.join(ROOT, 'api', `${name}.js`)).href);
  handlers.set(`/api/${name}`, module.default);
}

function mime(file) {
  const ext = path.extname(file).toLowerCase();
  return {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain; charset=utf-8',
    '.pdf': 'application/pdf'
  }[ext] || 'application/octet-stream';
}

function createResponse(res) {
  return {
    status(code) { res.statusCode = code; return this; },
    json(value) {
      if (!res.headersSent) res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(value));
    },
    send(value) { res.end(value); }
  };
}

async function readBody(req) {
  const chunks = [];
  let size = 0;
  const limit = 16 * 1024 * 1024;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > limit) throw Object.assign(new Error('Request body too large'), { statusCode: 413 });
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  const contentType = String(req.headers['content-type'] || '').split(';')[0];
  if (contentType === 'application/json') return JSON.parse(raw);
  return raw;
}

async function apiRequest(req, res, handler) {
  try {
    req.body = await readBody(req);
  } catch (err) {
    res.statusCode = err.statusCode || 400;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: err.statusCode === 413 ? 'Request is te groot.' : 'Ongeldige JSON-body.' }));
    return;
  }
  try {
    await handler(req, createResponse(res));
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ error: err?.message || 'Lokale API-fout.' }));
    }
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(url.pathname);

  const handler = handlers.get(pathname);
  if (handler) {
    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();
      return;
    }
    await apiRequest(req, res, handler);
    return;
  }

  if (pathname.startsWith('/api/')) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: 'Lokale API-route niet gevonden.' }));
    return;
  }

  let relative = pathname === '/' ? '/index.html' : pathname;
  let file = path.resolve(ROOT, `.${relative}`);
  const safeRoot = path.resolve(ROOT) + path.sep;
  if (!file.startsWith(safeRoot) && file !== path.resolve(ROOT, 'index.html')) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  // Client-side routes such as /admin, /join/... and /r/... use index.html.
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(ROOT, 'index.html');
  try {
    const data = fs.readFileSync(file);
    res.statusCode = 200;
    res.setHeader('Content-Type', mime(file));
    res.setHeader('Cache-Control', 'no-cache');
    res.end(data);
  } catch {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`\nSavour local server draait op http://localhost:${PORT}`);
  console.log('API-routes: /api/ai-import  /api/bug-report  /api/admin-reset');
  console.log('Stoppen: Ctrl+C\n');
});
