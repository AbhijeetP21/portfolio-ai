// Generates a LinkedIn profile banner (1584x396 @2x) matching the portfolio theme.
// Run: mise exec -- node scripts/generate-linkedin-banner.mjs
// Requires: npm i --no-save satori @resvg/resvg-js
//
// Note: LinkedIn overlays your profile photo on the lower-left of the banner,
// so all content here sits in the top-left corner and the right half.
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

const banner = el(
  'div',
  {
    width: '1584px',
    height: '396px',
    display: 'flex',
    backgroundColor: '#0a0a0c',
    fontFamily: 'Inter',
    position: 'relative',
  },
  [
    // Logo, top-left (clear of the profile photo, which overlaps lower-left)
    el(
      'div',
      {
        position: 'absolute',
        top: '40px',
        left: '56px',
        display: 'flex',
        fontFamily: 'JetBrains Mono',
        fontSize: '32px',
        color: zinc50,
      },
      [el('span', {}, 'ap'), el('span', { color: emerald }, '.')]
    ),

    // Main block, right half, vertically centered
    el(
      'div',
      {
        position: 'absolute',
        top: '0px',
        right: '72px',
        height: '396px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
      },
      [
        el(
          'div',
          { display: 'flex', fontSize: '54px', fontWeight: 600, color: zinc50, letterSpacing: '-0.03em' },
          'AI systems that hold up'
        ),
        el(
          'div',
          { display: 'flex', fontSize: '54px', fontWeight: 600, color: zinc500, letterSpacing: '-0.03em' },
          'in production.'
        ),
        el(
          'div',
          { display: 'flex', fontFamily: 'JetBrains Mono', fontSize: '21px', color: zinc400, marginTop: '30px' },
          'RAG · agents · evals · full-stack engineering'
        ),
        el(
          'div',
          { display: 'flex', fontFamily: 'JetBrains Mono', fontSize: '21px', color: zinc500, marginTop: '12px' },
          [
            el('span', {}, '2 IEEE publications · 3 patents ·'),
            el('span', { color: emerald, marginLeft: '12px' }, 'abhijeetpachpute.com'),
          ]
        ),
      ]
    ),
  ]
);

const svg = await satori(banner, {
  width: 1584,
  height: 396,
  fonts: [
    { name: 'Inter', data: inter500, weight: 500, style: 'normal' },
    { name: 'Inter', data: inter600, weight: 600, style: 'normal' },
    { name: 'JetBrains Mono', data: mono400, weight: 400, style: 'normal' },
  ],
});

const png = new Resvg(svg, { fitTo: { mode: 'width', value: 3168 } }).render().asPng();
const out = path.join(root, 'branding', 'linkedin-banner.png');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, png);
console.log(`Wrote ${out} (${(png.length / 1024).toFixed(0)} KB, 3168x792)`);
