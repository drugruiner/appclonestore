import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const svg = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="58%" r="62%">
      <stop offset="0%" stop-color="#0E5BFF" stop-opacity="0.65"/>
      <stop offset="58%" stop-color="#071C55" stop-opacity="0.58"/>
      <stop offset="100%" stop-color="#020817" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="bg" x1="110" y1="60" x2="920" y2="980" gradientUnits="userSpaceOnUse">
      <stop stop-color="#071844"/>
      <stop offset="0.5" stop-color="#02113C"/>
      <stop offset="1" stop-color="#010713"/>
    </linearGradient>
    <linearGradient id="cubeTop" x1="380" y1="180" x2="620" y2="405" gradientUnits="userSpaceOnUse">
      <stop stop-color="#7BE2FF"/>
      <stop offset="1" stop-color="#0E7DFF"/>
    </linearGradient>
    <linearGradient id="cubeSide" x1="620" y1="360" x2="810" y2="690" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0B68FF"/>
      <stop offset="1" stop-color="#06227F"/>
    </linearGradient>
    <linearGradient id="rFace" x1="170" y1="270" x2="585" y2="820" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFFFFF"/>
      <stop offset="1" stop-color="#AFCBFF"/>
    </linearGradient>
    <filter id="shadow" x="70" y="80" width="860" height="850" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="34" stdDeviation="34" flood-color="#00164E" flood-opacity="0.58"/>
    </filter>
    <filter id="edgeGlow" x="70" y="70" width="880" height="880" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#2E7BFF" flood-opacity="0.55"/>
    </filter>
  </defs>
  <rect width="1024" height="1024" fill="url(#bg)"/>
  <rect width="1024" height="1024" fill="url(#glow)"/>
  <g filter="url(#shadow)">
    <path d="M484 160L778 326L524 478L238 305L484 160Z" fill="url(#cubeTop)"/>
    <path d="M524 478L778 326V714L524 864V478Z" fill="url(#cubeSide)" filter="url(#edgeGlow)"/>
    <path d="M238 305L524 478V864L238 690V305Z" fill="#051F76" fill-opacity="0.94"/>
    <path d="M246 344C246 312 272 286 304 286H458C527 286 582 339 582 406C582 466 537 516 477 525L610 752C622 773 607 800 583 800H506C492 800 479 792 472 780L360 590H340V744C340 776 314 802 282 802C262 802 246 786 246 766V344Z" fill="url(#rFace)"/>
    <path d="M340 377V493H444C480 493 508 468 508 435C508 402 480 377 444 377H340Z" fill="#061A57" fill-opacity="0.94"/>
    <path d="M778 326L524 478" stroke="#8FE7FF" stroke-width="10" stroke-linecap="round"/>
    <path d="M484 160L238 305" stroke="#C9F5FF" stroke-opacity="0.58" stroke-width="8" stroke-linecap="round"/>
    <path d="M778 326V714" stroke="#56B8FF" stroke-opacity="0.85" stroke-width="8" stroke-linecap="round"/>
  </g>
</svg>`;

await mkdir('public', { recursive: true });

for (const size of [180, 192, 512]) {
  const png = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
  await writeFile(`public/icon-${size}.png`, png);
}

await writeFile('public/icon-ios.svg', svg, 'utf8');
console.log('Generated iOS PNG icons');
