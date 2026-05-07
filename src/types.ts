export type StoreAppKind = 'app' | 'game';

export type StoreApp = {
  id: string;
  name: string;
  developer: string;
  category: string;
  kind: StoreAppKind;
  subtitle: string;
  description: string;
  iconText: string;
  iconGradient: string;
  rating: string;
  reviews: string;
  rank?: string;
  tags: string[];
  screenshots: string[];
  action: 'Скачать' | 'Обновить' | 'Открыть';
  hasInAppPurchases?: boolean;
};
