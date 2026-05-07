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
    screenshots: ['https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop'],
    action: 'Скачать',
  });
}

appStoreIcons[raveId] = ''https://i.postimg.cc/kGPnwQyy/image.png'';

appStoreScreenshots[raveId] = [
  'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop'
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
