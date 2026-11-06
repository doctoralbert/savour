// Meet hoeveel uur aan Savour is gewerkt met Claude Code op deze computer en schrijft dat naar api/_lib/uren.js.
// Draai: node tools/uren-meten.mjs. Telt tijd tussen berichten; een pauze langer dan 20 minuten telt niet mee.
// Alleen tijdstippen worden gelezen, nooit de inhoud van gesprekken.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import readline from 'node:readline';
import { execSync } from 'node:child_process';

const GAP = 20 * 60 * 1000;
const root = path.join(os.homedir(), '.claude', 'projects');
const files = [];
const walk = dir => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.jsonl') && /savour/i.test(p)) files.push(p);
  }
};
walk(root);

const stamps = [];
for (const file of files) {
  const lines = readline.createInterface({ input: fs.createReadStream(file), crlfDelay: Infinity });
  for await (const line of lines) {
    const m = line.match(/"timestamp":"(\d{4}-\d\d-\d\dT[^"]+)"/);
    if (m) stamps.push(Date.parse(m[1]));
  }
}
const git = execSync('git log --all --format=%ct')
  .toString()
  .trim()
  .split('\n')
  .map(x => Number(x) * 1000);

// Actieve tijd per maand. Tijd tot het volgende tijdstip telt mee als die binnen de pauzegrens valt.
function active(list) {
  const months = {};
  const sorted = [...new Set(list)].filter(Number.isFinite).sort((a, b) => a - b);
  for (let i = 1; i < sorted.length; i++) {
    const gap = sorted[i] - sorted[i - 1];
    if (gap > GAP) continue;
    const month = new Date(sorted[i]).toISOString().slice(0, 7);
    months[month] = (months[month] || 0) + gap / 3600000;
  }
  for (const k of Object.keys(months)) months[k] = Math.round(months[k] * 10) / 10;
  return months;
}
// Vóór de eerste bewaarde Claude-sessie: schatting uit Git. Commits binnen 2 uur vormen één werkblok, plus 30 minuten
// per blok voor het werk vóór de eerste commit. Dit is een schatting, geen meting.
function estimateFromGit(list, until) {
  const sorted = list.filter(t => t < until).sort((a, b) => a - b);
  let ms = 0;
  for (let i = 0; i < sorted.length; i++) {
    const gap = i ? sorted[i] - sorted[i - 1] : Infinity;
    ms += gap <= 2 * 3600000 ? gap : 30 * 60000;
  }
  return Math.round((ms / 3600000) * 10) / 10;
}
const sum = o => Math.round(Object.values(o).reduce((a, b) => a + b, 0) * 10) / 10;
const byMonth = active(stamps);
const days = new Set(stamps.filter(Number.isFinite).map(t => new Date(t).toISOString().slice(0, 10))).size;
const result = {
  measuredOn: new Date().toISOString().slice(0, 10),
  claudeCodeHours: sum(byMonth),
  gitEstimateHours: estimateFromGit(git, stamps.length ? Math.min(...stamps) : Date.now()),
  byMonth,
  workDays: days,
  sessions: files.length,
  firstClaude: stamps.length ? new Date(Math.min(...stamps)).toISOString().slice(0, 10) : '',
  firstCommit: new Date(Math.min(...git)).toISOString().slice(0, 10),
  commits: git.length
};
fs.writeFileSync(
  'api/_lib/uren.js',
  `// Gegenereerd door tools/uren-meten.mjs: gemeten uren met Claude Code op de eigen computer.\nexport const MEASURED_HOURS = ${JSON.stringify(result, null, 2)};\n`
);
console.log(result);
