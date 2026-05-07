import { seedApps } from './apps';
import { appStoreIcons, appStoreMetadata, appStoreScreenshots } from './appStoreIcons';

const raveId = 'rave';

if (!seedApps.some((app) => app.id === raveId)) {
  seedApps.push({
    id: raveId,
    name: 'Rave',
    developer: 'Rave Media, Inc.',
    category: 'Развлечения',
    kind: 'app',
    subtitle: 'Фильмы и сериалы вместе',
    description: 'Смотрите фильмы, сериалы и видео вместе с друзьями в синхронном режиме, общайтесь в чате и устраивайте совместные просмотры онлайн.',
    iconText: 'R',
    iconGradient: 'linear-gradient(135deg,#7b2cff,#00d4ff)',
    rating: '4.7',
    reviews: '18K',
    rank: '#12 в Развлечения',
    tags: ['Фильмы', 'Видео', 'Друзья', 'Watch Party'],
    screenshots: ['Смотрите вместе', 'Чат с друзьями', 'Видео онлайн'],
    action: 'Скачать',
  });
}

appStoreIcons[raveId] = 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/4e/9a/7c/4e9a7c4c-0a68-b163-0000-0a850ac67334/AppIcon-0-0-1x_U007epad-0-1-85-220.png/512x512bb.png';

appStoreScreenshots[raveId] = [
  'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/25/72/5c/25725c10-7a35-a710-2f6f-74038d50f16a/ru_iphone_1.png/392x696bb.png',
  'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/ea/80/f8/ea80f8f0-ff0a-f4c6-7d38-94d0eced3de1/ru_iphone_2.png/392x696bb.png',
  'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/3f/a4/b8/3fa4b83c-3477-4345-253d-122d47a41a02/ru_iphone_3.png/392x696bb.png',
];

appStoreMetadata[raveId] = {
  rating: '4.7',
  ratingsCount: '18K',
  ageRating: '12+',
  category: 'Развлечения',
  developer: 'Rave Media, Inc.',
  languages: 'RU',
  languagesMore: 1,
  size: '165.0 MB',
  version: '7.0',
};
