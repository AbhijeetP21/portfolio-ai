// Generates the full favicon set from the "ap." mark.
// Run: mise exec -- node scripts/generate-icons.mjs
// Requires: npm i --no-save satori @resvg/resvg-js png-to-ico
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import pngToIco from 'png-to-ico';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'favicon');

async function fetchFont(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Font fetch failed: ${url} (${res.status})`);
  return Buffer.from(await res.arrayBuffer());
}

const mono700 = await fetchFont(
  'https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.1.1/files/jetbrains-mono-latin-700-normal.woff'
);

// 512x512 mark: dark rounded tile, "ap" in white, emerald dot.
// Generous corner radius so it also works as a maskable icon.
const mark = {
  type: 'div',
  props: {
    style: {
      width: '512px',
      height: '512px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0a0a0c',
      borderRadius: '96px',
      fontFamily: 'JetBrains Mono',
      fontSize: '232px',
      fontWeight: 700,
      letterSpacing: '-0.06em',
    },
    children: [
      { type: 'span', props: { style: { color: '#fafafa', marginTop: '-24px' }, children: 'ap' } },
      { type: 'span', props: { style: { color: '#34d399', marginTop: '-24px' }, children: '.' } },
    ],
  },
};

const svg = await satori(mark, {
  width: 512,
  height: 512,
  fonts: [{ name: 'JetBrains Mono', data: mono700, weight: 700, style: 'normal' }],
});

const renderPng = (size) =>
  new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();

fs.writeFileSync(path.join(outDir, 'favicon.svg'), svg);
fs.writeFileSync(path.join(outDir, 'favicon-96x96.png'), renderPng(96));
fs.writeFileSync(path.join(outDir, 'apple-touch-icon.png'), renderPng(180));
fs.writeFileSync(path.join(outDir, 'web-app-manifest-192x192.png'), renderPng(192));
fs.writeFileSync(path.join(outDir, 'web-app-manifest-512x512.png'), renderPng(512));
fs.writeFileSync(
  path.join(outDir, 'favicon.ico'),
  await pngToIco([renderPng(16), renderPng(32), renderPng(48)])
);

console.log(`Wrote favicon set to ${outDir}`);
