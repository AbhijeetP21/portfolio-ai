// One-off generator for public/og-image.png (1200x630 @2x).
// Run: mise exec -- node scripts/generate-og.mjs
// Requires: npm i --no-save satori @resvg/resvg-js
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function fetchFont(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Font fetch failed: ${url} (${res.status})`);
  return Buffer.from(await res.arrayBuffer());
}

const [inter500, inter600, mono400] = await Promise.all([
  fetchFont('https://cdn.jsdelivr.net/npm/@fontsource/inter@5.1.0/files/inter-latin-500-normal.woff'),
  fetchFont('https://cdn.jsdelivr.net/npm/@fontsource/inter@5.1.0/files/inter-latin-600-normal.woff'),
  fetchFont('https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.1.1/files/jetbrains-mono-latin-400-normal.woff'),
]);

const zinc50 = '#fafafa';
const zinc400 = '#a1a1aa';
const zinc500 = '#71717a';
const emerald = '#34d399';

const el = (type, style, children) => ({ type, props: { style, children } });

const card = el(
  'div',
  {
    width: '1200px',
    height: '630px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#0a0a0c',
    padding: '72px 80px',
    fontFamily: 'Inter',
  },
  [
    // Top: logo + status line
    el('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, [
      el('div', { display: 'flex', fontFamily: 'JetBrains Mono', fontSize: '30px', color: zinc50 }, [
        el('span', {}, 'ap'),
        el('span', { color: emerald }, '.'),
      ]),
      el('div', { display: 'flex', alignItems: 'center', gap: '12px' }, [
        el('div', {
          width: '10px',
          height: '10px',
          borderRadius: '10px',
          backgroundColor: emerald,
          display: 'flex',
        }),
        el(
          'span',
          { fontFamily: 'JetBrains Mono', fontSize: '20px', color: zinc400 },
          'open to AI / ML / SWE roles'
        ),
      ]),
    ]),

    // Middle: headline + name
    el('div', { display: 'flex', flexDirection: 'column' }, [
      el(
        'div',
        { display: 'flex', fontSize: '76px', fontWeight: 600, color: zinc50, letterSpacing: '-0.03em', lineHeight: 1.12 },
        'I build AI systems'
      ),
      el(
        'div',
        { display: 'flex', fontSize: '76px', fontWeight: 600, color: zinc500, letterSpacing: '-0.03em', lineHeight: 1.12 },
        'that hold up in production.'
      ),
      el(
        'div',
        { display: 'flex', fontSize: '28px', fontWeight: 500, color: zinc400, marginTop: '36px' },
        'Abhijeet Sandip Pachpute · AI Engineer · MS CS, University of Utah'
      ),
    ]),

    // Bottom: credentials + domain
    el('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, [
      el(
        'span',
        { fontFamily: 'JetBrains Mono', fontSize: '21px', color: zinc500 },
        '2 IEEE publications · 3 patents · RAG · agents · evals'
      ),
      el('span', { fontFamily: 'JetBrains Mono', fontSize: '21px', color: emerald }, 'abhijeetpachpute.com'),
    ]),
  ]
);

const svg = await satori(card, {
  width: 1200,
  height: 630,
  fonts: [
    { name: 'Inter', data: inter500, weight: 500, style: 'normal' },
    { name: 'Inter', data: inter600, weight: 600, style: 'normal' },
    { name: 'JetBrains Mono', data: mono400, weight: 400, style: 'normal' },
  ],
});

const png = new Resvg(svg, { fitTo: { mode: 'width', value: 2400 } }).render().asPng();
const out = path.join(root, 'public', 'og-image.png');
fs.writeFileSync(out, png);
console.log(`Wrote ${out} (${(png.length / 1024).toFixed(0)} KB, 2400x1260)`);
