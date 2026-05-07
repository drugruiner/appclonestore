import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const svg = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="57%" r="68%">
      <stop offset="0%" stop-color="#114DFF" stop-opacity="0.72"/>
      <stop offset="52%" stop-color="#061D63" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="#010613" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="bg" x1="80" y1="40" x2="950" y2="1000" gradientUnits="userSpaceOnUse">
      <stop stop-color="#071B4D"/>
      <stop offset="0.52" stop-color="#021449"/>
      <stop offset="1" stop-color="#010716"/>
    </linearGradient>
    <linearGradient id="cubeTop" x1="408" y1="146" x2="662" y2="384" gradientUnits="userSpaceOnUse">
      <stop stop-color="#8EEBFF"/>
      <stop offset="0.55" stop-color="#199CFF"/>
      <stop offset="1" stop-color="#0873FF"/>
    </linearGradient>
    <linearGradient id="cubeSide" x1="640" y1="330" x2="860" y2="744" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0B78FF"/>
      <stop offset="1" stop-color="#051E82"/>
    </linearGradient>
    <linearGradient id="cubeLeft" x1="230" y1="300" x2="520" y2="850" gradientUnits="userSpaceOnUse">
      <stop stop-color="#08359F"/>
      <stop offset="1" stop-color="#04145F"/>
    </linearGradient>
    <linearGradient id="rFace" x1="145" y1="260" x2="600" y2="870" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFFFFF"/>
      <stop offset="0.48" stop-color="#E9F2FF"/>
      <stop offset="1" stop-color="#9FBEFF"/>
    </linearGradient>
    <filter id="shadow" x="20" y="30" width="980" height="980" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="38" stdDeviation="42" flood-color="#000B38" flood-opacity="0.72"/>
    </filter>
    <filter id="blueGlow" x="20" y="20" width="990" height="990" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="0" stdDeviation="11" flood-color="#287CFF" flood-opacity="0.58"/>
    </filter>
  </defs>
  <rect width="1024" height="1024" fill="url(#bg)"/>
  <rect width="1024" height="1024" fill="url(#bgGlow)"/>
  <g filter="url(#shadow)" transform="translate(-18 -6) scale(1.08)">
    <path d="M486 122L815 308L532 480L214 288L486 122Z" fill="url(#cubeTop)"/>
    <path d="M532 480L815 308V742L532 912V480Z" fill="url(#cubeSide)" filter="url(#blueGlow)"/>
    <path d="M214 288L532 480V912L214 718V288Z" fill="url(#cubeLeft)"/>
    <path d="M222 334C222 296 253 266 291 266H463C544 266 609 329 609 407C609 477 557 535 488 546L644 810C658 834 641 866 613 866H527C510 866 495 857 486 842L356 620H331V795C331 833 300 864 262 864C240 864 222 846 222 824V334Z" fill="url(#rFace)"/>
    <path d="M331 374V509H447C489 509 522 480 522 442C522 404 489 374 447 374H331Z" fill="#061A57" fill-opacity="0.94"/>
    <path d="M815 308L532 480" stroke="#91EBFF" stroke-width="11" stroke-linecap="round"/>
    <path d="M486 122L214 288" stroke="#D6FAFF" stroke-opacity="0.58" stroke-width="8" stroke-linecap="round"/>
    <path d="M815 308V742" stroke="#5FC2FF" stroke-opacity="0.9" stroke-width="9" stroke-linecap="round"/>
  </g>
</svg>`;

await mkdir('public', { recursive: true });

for (const size of [180, 192, 512]) {
  const png = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
  await writeFile(`public/rubox-icon-v3-${size}.png`, png);
}

await writeFile('public/rubox-icon-v3.svg', svg, 'utf8');
console.log('Generated RuBox iOS v3 PNG icons');
