import { copyFile, stat } from 'node:fs/promises';

const source = 'public/rubox-final-v7-180.png';

await stat(source);

await copyFile(source, 'public/rubox-final-v7-192.png');
await copyFile(source, 'public/rubox-final-v7-512.png');
await copyFile(source, 'public/apple-touch-icon.png');
await copyFile(source, 'public/apple-touch-icon-precomposed.png');

console.log('Copied final RuBox icon to all required iOS/PWA paths');
