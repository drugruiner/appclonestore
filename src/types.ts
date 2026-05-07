export type Review = {
  author: string;
  rating: number;
  text: string;
};

export type StoreApp = {
  id: string;
  name: string;
  developer: string;
  category: string;
  price: string;
  rating: number;
  downloads: string;
  icon: string;
  accent: string;
  tagline: string;
  description: string;
  features: string[];
  screenshots: string[];
  reviews: Review[];
};
