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
