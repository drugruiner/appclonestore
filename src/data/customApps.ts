import { seedApps } from './apps';
import { appStoreIcons, appStoreMetadata, appStoreScreenshots } from './appStoreIcons';

const customApps = [
  {
    id: 'rave',
    name: 'Rave',
    developer: 'Rave Media, Inc.',
    category: 'Развлечения',
    kind: 'app' as const,
    subtitle: 'Фильмы и сериалы вместе',
    description: 'Смотрите фильмы, сериалы и видео вместе с друзьями в синхронном режиме, общайтесь в чате и устраивайте совместные просмотры онлайн.',
    iconText: 'R',
    iconGradient: 'linear-gradient(135deg,#7b2cff,#00d4ff)',
    rating: '4.7',
    reviews: '18K',
    rank: '#12 в Развлечения',
    tags: ['Фильмы', 'Видео', 'Друзья', 'Watch Party'],
    screenshots: ['Смотрите вместе', 'Чат с друзьями', 'Видео онлайн'],
    action: 'Скачать' as const,
  },
  {
    id: 'oniongram',
    name: 'OnionGram',
    developer: 'Darknet Media',
    category: 'Социальные сети',
    kind: 'app' as const,
    subtitle: 'Мессенджер',
    description: 'Анонимность. Скорость. Привилегии',
    iconText: 'O',
    iconGradient: 'linear-gradient(135deg,#111827,#16a34a)',
    rating: '4.9',
    reviews: '15K',
    rank: '#9 в Социальные сети',
    tags: ['Мессенджер', 'Анонимность', 'Чаты'],
    screenshots: ['Анонимные чаты', 'Быстрые сообщения', 'Приватность'],
    action: 'Скачать' as const,
  },
];

for (const app of customApps) {
  if (!seedApps.some((item) => item.id === app.id)) {
    seedApps.push(app);
  }
}

appStoreIcons['yandex-music'] = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 128 128%22%3E%3Crect width=%22128%22 height=%22128%22 rx=%2228%22 fill=%22%23000%22/%3E%3Ccircle cx=%2264%22 cy=%2264%22 r=%2244%22 fill=%22url(%23g)%22/%3E%3Cpath d=%22M78 34v54.5c0 11-9.3 18.5-21.2 18.5C45.4 107 37 100.7 37 91.4c0-9.8 8.9-16.3 20.2-16.3 4.1 0 7.5.8 10.1 2.1V42.6L78 34Z%22 fill=%22%23000%22/%3E%3Ccircle cx=%2257%22 cy=%2291%22 r=%2211%22 fill=%22%23000%22/%3E%3Cdefs%3E%3ClinearGradient id=%22g%22 x1=%2224%22 y1=%2224%22 x2=%22105%22 y2=%22108%22 gradientUnits=%22userSpaceOnUse%22%3E%3Cstop stop-color=%22%23FFE600%22/%3E%3Cstop offset=%22.52%22 stop-color=%22%23FF8A00%22/%3E%3Cstop offset=%221%22 stop-color=%22%23FF2D55%22/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E';
appStoreIcons.sberbank = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 128 128%22%3E%3Crect width=%22128%22 height=%22128%22 rx=%2228%22 fill=%22%23fff%22/%3E%3Ccircle cx=%2264%22 cy=%2264%22 r=%2243%22 fill=%22none%22 stroke=%22%231FAF38%22 stroke-width=%2213%22 stroke-linecap=%22round%22 stroke-dasharray=%22205 75%22 transform=%22rotate(-35 64 64)%22/%3E%3Cpath d=%22M43 64.5 58.2 79 87 48%22 fill=%22none%22 stroke=%22%231FAF38%22 stroke-width=%2212%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/%3E%3Cpath d=%22M94 29 101 20M105 43l11-5M108 59h12%22 stroke=%22%2300AEEF%22 stroke-width=%226%22 stroke-linecap=%22round%22/%3E%3C/svg%3E';

appStoreIcons.rave = 'https://i.postimg.cc/kGPnwQyy/image.png';
appStoreScreenshots.rave = [
  'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop',
];
appStoreMetadata.rave = {
  rating: '4.7',
  ratingsCount: '18K',
  ageRating: '12+',
  category: 'Развлечения',
  developer: 'Rave Media, Inc.',
  languages: 'RU',
  languagesMore: 1,
  size: '165 MB',
  version: '7.0',
};

appStoreIcons.oniongram = 'https://i.postimg.cc/YCgDMFKr/Chat-GPT-Image-2-maa-2026-g-23-41-48.png';
appStoreScreenshots.oniongram = [
  'https://i.postimg.cc/CMQc87wx/image.png',
  'https://i.postimg.cc/6pdcDNnX/image.png',
  'https://i.postimg.cc/5tg32qsn/image.png',
  'https://i.postimg.cc/tTgzZZfJ/image.png',
];
appStoreMetadata.oniongram = {
  rating: '4.9',
  ratingsCount: '15K',
  ageRating: '16+',
  category: 'Социальные сети',
  developer: 'Darknet Media',
  languages: 'RU',
  languagesMore: 0,
  size: '169 MB',
  version: '1.6.6',
};