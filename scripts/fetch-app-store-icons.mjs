import { writeFile } from 'node:fs/promises';

const apps = [
  ['telegram', 'Telegram'],
  ['whatsapp', 'WhatsApp Messenger'],
  ['vk', 'ВКонтакте'],
  ['max', 'MAX messenger'],
  ['yandex-go', 'Яндекс Go'],
  ['yandex-maps', 'Яндекс Карты'],
  ['yandex-music', 'Яндекс Музыка'],
  ['yandex-browser', 'Яндекс Браузер'],
  ['yandex-market', 'Яндекс Маркет'],
  ['2gis', '2ГИС'],
  ['gosuslugi', 'Госуслуги'],
  ['sberbank', 'СберБанк Онлайн'],
  ['sbol', 'СБОЛ'],
  ['tbank', 'T-Bank'],
  ['alfabank', 'Альфа-Банк'],
  ['vtb', 'ВТБ Онлайн'],
  ['ozon-bank', 'Ozon Банк'],
  ['wildberries', 'Wildberries'],
  ['ozon', 'Ozon'],
  ['avito', 'Avito'],
  ['aliexpress', 'AliExpress'],
  ['lamoda', 'Lamoda'],
  ['megamarket', 'Мегамаркет'],
  ['sbermegamarket', 'СберМегаМаркет'],
  ['delivery-club', 'Delivery Club'],
  ['kuper', 'Купер доставка'],
  ['vkusvill', 'ВкусВилл'],
  ['samokat', 'Самокат'],
  ['lenta-online', 'Лента Онлайн'],
  ['magnit', 'Магнит доставка продуктов'],
  ['tiktok', 'TikTok'],
  ['youtube', 'YouTube'],
  ['rutube', 'Rutube'],
  ['dzen', 'Дзен'],
  ['pinterest', 'Pinterest'],
  ['discord', 'Discord'],
  ['zoom', 'Zoom'],
  ['chrome', 'Google Chrome'],
  ['gmail', 'Gmail'],
  ['google-maps', 'Google Maps'],
  ['chatgpt', 'ChatGPT'],
  ['capcut', 'CapCut'],
  ['canva', 'Canva'],
  ['minecraft', 'Minecraft'],
  ['roblox', 'Roblox'],
  ['brawl-stars', 'Brawl Stars'],
  ['pubg-mobile', 'PUBG MOBILE'],
  ['genshin-impact', 'Genshin Impact'],
  ['standoff-2', 'Standoff 2'],
  ['homescapes', 'Homescapes'],
];

function polish(url) {
  return url.replace(/\d+x\d+bb\.(jpg|png|webp)/, '512x512bb.$1');
}

async function lookup(id, term, country) {
  const url = new URL('https://itunes.apple.com/search');
  url.searchParams.set('term', term);
  url.searchParams.set('entity', 'software');
  url.searchParams.set('limit', '8');
  url.searchParams.set('country', country);

  const response = await fetch(url);
  if (!response.ok) return '';
  const data = await response.json();
  const results = data.results ?? [];
  const exact = results.find((item) => item.trackName?.toLowerCase() === term.toLowerCase()) ?? results[0];
  const icon = exact?.artworkUrl512 ?? exact?.artworkUrl100 ?? '';
  return icon ? polish(icon) : '';
}

const icons = {};

for (const [id, term] of apps) {
  let icon = '';
  for (const country of ['ru', 'us']) {
    try {
      icon = await lookup(id, term, country);
      if (icon) break;
    } catch (error) {
      console.warn(`Icon fetch failed for ${id} in ${country}: ${error.message}`);
    }
  }

  if (icon) icons[id] = icon;
}

const content = `export const appStoreIcons: Record<string, string> = ${JSON.stringify(icons, null, 2)};\n`;
await writeFile('src/data/appStoreIcons.ts', content, 'utf8');
console.log(`Generated ${Object.keys(icons).length} App Store icons`);
