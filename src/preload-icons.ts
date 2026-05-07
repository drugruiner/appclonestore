import { appStoreIcons } from './data/appStoreIcons';

const preloaded = new Set<string>();

function preload(src: string) {
  if (!src || preloaded.has(src)) return;
  preloaded.add(src);

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);

  const image = new Image();
  image.decoding = 'async';
  image.src = src;
}

Object.values(appStoreIcons).forEach(preload);
