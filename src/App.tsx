import { useEffect, useMemo, useState } from 'react';
import { AppWindow, Gamepad2, Layers3, Search, X, type LucideIcon } from 'lucide-react';
import { seedApps } from './data/apps';
import { StoreApp } from './types';

type Tab = 'today' | 'apps' | 'games' | 'search';
type InstallStatus = 'idle' | 'loading' | 'open';

const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: 'today', label: 'Сегодня', icon: Layers3 },
  { id: 'apps', label: 'Приложения', icon: AppWindow },
  { id: 'games', label: 'Игры', icon: Gamepad2 },
  { id: 'search', label: 'Поиск', icon: Search },
];

const appIconUrls: Record<string, string> = {
  telegram: 'https://www.google.com/s2/favicons?domain=telegram.org&sz=256',
  whatsapp: 'https://www.google.com/s2/favicons?domain=whatsapp.com&sz=256',
  vk: 'https://www.google.com/s2/favicons?domain=vk.com&sz=256',
  max: 'https://www.google.com/s2/favicons?domain=max.ru&sz=256',
  'yandex-go': 'https://www.google.com/s2/favicons?domain=go.yandex&sz=256',
  'yandex-maps': 'https://www.google.com/s2/favicons?domain=maps.yandex.ru&sz=256',
  'yandex-music': 'https://www.google.com/s2/favicons?domain=music.yandex.ru&sz=256',
  'yandex-browser': 'https://www.google.com/s2/favicons?domain=browser.yandex.ru&sz=256',
  'yandex-market': 'https://www.google.com/s2/favicons?domain=market.yandex.ru&sz=256',
  '2gis': 'https://www.google.com/s2/favicons?domain=2gis.ru&sz=256',
  gosuslugi: 'https://www.google.com/s2/favicons?domain=gosuslugi.ru&sz=256',
  sberbank: 'https://www.google.com/s2/favicons?domain=sberbank.ru&sz=256',
  sbol: 'https://www.google.com/s2/favicons?domain=sberbank.ru&sz=256',
  tbank: 'https://www.google.com/s2/favicons?domain=tbank.ru&sz=256',
  alfabank: 'https://www.google.com/s2/favicons?domain=alfabank.ru&sz=256',
  vtb: 'https://www.google.com/s2/favicons?domain=vtb.ru&sz=256',
  'ozon-bank': 'https://www.google.com/s2/favicons?domain=finance.ozon.ru&sz=256',
  wildberries: 'https://www.google.com/s2/favicons?domain=wildberries.ru&sz=256',
  ozon: 'https://www.google.com/s2/favicons?domain=ozon.ru&sz=256',
  avito: 'https://www.google.com/s2/favicons?domain=avito.ru&sz=256',
  aliexpress: 'https://www.google.com/s2/favicons?domain=aliexpress.com&sz=256',
  lamoda: 'https://www.google.com/s2/favicons?domain=lamoda.ru&sz=256',
  megamarket: 'https://www.google.com/s2/favicons?domain=megamarket.ru&sz=256',
  sbermegamarket: 'https://www.google.com/s2/favicons?domain=megamarket.ru&sz=256',
  'delivery-club': 'https://www.google.com/s2/favicons?domain=delivery-club.ru&sz=256',
  kuper: 'https://www.google.com/s2/favicons?domain=kuper.ru&sz=256',
  vkusvill: 'https://www.google.com/s2/favicons?domain=vkusvill.ru&sz=256',
  samokat: 'https://www.google.com/s2/favicons?domain=samokat.ru&sz=256',
  'lenta-online': 'https://www.google.com/s2/favicons?domain=lenta.com&sz=256',
  magnit: 'https://www.google.com/s2/favicons?domain=magnit.ru&sz=256',
  tiktok: 'https://www.google.com/s2/favicons?domain=tiktok.com&sz=256',
  youtube: 'https://www.google.com/s2/favicons?domain=youtube.com&sz=256',
  rutube: 'https://www.google.com/s2/favicons?domain=rutube.ru&sz=256',
  dzen: 'https://www.google.com/s2/favicons?domain=dzen.ru&sz=256',
  pinterest: 'https://www.google.com/s2/favicons?domain=pinterest.com&sz=256',
  discord: 'https://www.google.com/s2/favicons?domain=discord.com&sz=256',
  zoom: 'https://www.google.com/s2/favicons?domain=zoom.us&sz=256',
  chrome: 'https://www.google.com/s2/favicons?domain=google.com/chrome&sz=256',
  gmail: 'https://www.google.com/s2/favicons?domain=gmail.com&sz=256',
  'google-maps': 'https://www.google.com/s2/favicons?domain=maps.google.com&sz=256',
  chatgpt: 'https://www.google.com/s2/favicons?domain=chatgpt.com&sz=256',
  capcut: 'https://www.google.com/s2/favicons?domain=capcut.com&sz=256',
  canva: 'https://www.google.com/s2/favicons?domain=canva.com&sz=256',
  minecraft: 'https://www.google.com/s2/favicons?domain=minecraft.net&sz=256',
  roblox: 'https://www.google.com/s2/favicons?domain=roblox.com&sz=256',
  'brawl-stars': 'https://www.google.com/s2/favicons?domain=supercell.com&sz=256',
  'pubg-mobile': 'https://www.google.com/s2/favicons?domain=pubgmobile.com&sz=256',
  'genshin-impact': 'https://www.google.com/s2/favicons?domain=genshin.hoyoverse.com&sz=256',
  'standoff-2': 'https://www.google.com/s2/favicons?domain=standoff2.com&sz=256',
  homescapes: 'https://www.google.com/s2/favicons?domain=playrix.com&sz=256',
};

function matchesApp(app: StoreApp, search: string) {
  const value = search.trim().toLowerCase();
  if (!value) return true;

  return [app.name, app.developer, app.category, app.subtitle, app.description, ...app.tags]
    .join(' ')
    .toLowerCase()
    .includes(value);
}

function AppIcon({ app, large = false }: { app: StoreApp; large?: boolean }) {
  const iconUrl = appIconUrls[app.id];

  return (
    <div className={`app-icon ${large ? 'large' : ''}`} style={{ background: app.iconGradient }}>
      {iconUrl ? <img src={iconUrl} alt="" loading="lazy" /> : <span>{app.iconText}</span>}
    </div>
  );
}

function ActionButton() {
  const [status, setStatus] = useState<InstallStatus>('idle');
  const [remaining, setRemaining] = useState(60);

  useEffect(() => {
    if (status !== 'loading') return;

    setRemaining(60);
    const timer = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setStatus('open');
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [status]);

  function handleClick() {
    if (status !== 'idle') return;
    setStatus('loading');
  }

  const timeLabel = `0:${remaining.toString().padStart(2, '0')}`;
  const label = status === 'open' ? 'Открыть' : status === 'loading' ? timeLabel : 'Скачать';

  return (
    <button className={`action-pill ${status}`} onClick={handleClick}>
      {status === 'loading' && <span className="loader" />}
      <span>{label}</span>
    </button>
  );
}

function AppRow({ app, onOpen, featured = false }: { app: StoreApp; onOpen: (app: StoreApp) => void; featured?: boolean }) {
  return (
    <article className={`app-row ${featured ? 'featured-row' : ''}`} onClick={() => onOpen(app)}>
      <AppIcon app={app} />
      <div className="app-row-info">
        <h3>{app.name}</h3>
        <p>{app.subtitle}</p>
        <div className="rating-line">★ ★ ★ ★ ☆ <span>{app.reviews}</span></div>
      </div>
      <div className="row-action" onClick={(event) => event.stopPropagation()}>
        <ActionButton />
        {app.hasInAppPurchases && <small>Встроенные покупки</small>}
      </div>
    </article>
  );
}

function HeroCard({ app, onOpen }: { app: StoreApp; onOpen: (app: StoreApp) => void }) {
  return (
    <button className="hero-card" onClick={() => onOpen(app)}>
      <div>
        <span>Рекомендуем</span>
        <h2>{app.name}</h2>
        <p>{app.description}</p>
      </div>
      <div className="hero-card-footer">
        <AppIcon app={app} />
        <div><strong>{app.name}</strong><small>{app.subtitle}</small></div>
        <ActionButton />
      </div>
    </button>
  );
}

function AppDetail({ app, onClose }: { app: StoreApp; onClose: () => void }) {
  return (
    <section className="detail-screen">
      <button className="close-detail" onClick={onClose}>Готово</button>
      <div className="detail-head">
        <AppIcon app={app} large />
        <div>
          <h1>{app.name}</h1>
          <p>{app.subtitle}</p>
          <ActionButton />
        </div>
      </div>
      <div className="meta-strip">
        <div><strong>{app.rating}</strong><span>рейтинг</span></div>
        <div><strong>{app.reviews}</strong><span>оценок</span></div>
        <div><strong>{app.category}</strong><span>категория</span></div>
      </div>
      {app.rank && <p className="rank-line">{app.rank}</p>}
      <div className="screenshot-strip">
        {app.screenshots.map((screen, index) => (
          <div key={screen} className="fake-shot" style={{ background: app.iconGradient }}>
            <span>{screen}</span>
            <small>{index + 1}</small>
          </div>
        ))}
      </div>
      <p className="detail-description">{app.description}</p>
      <div className="tag-row">{app.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
    </section>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('today');
  const [query, setQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<StoreApp | null>(null);

  const apps = seedApps.filter((app) => app.kind === 'app');
  const games = seedApps.filter((app) => app.kind === 'game');
  const searchResults = useMemo(() => seedApps.filter((app) => matchesApp(app, query)), [query]);
  const visibleList = activeTab === 'games' ? games : activeTab === 'search' ? searchResults : apps;

  const title = activeTab === 'today' ? 'Сегодня' : activeTab === 'apps' ? 'Приложения' : activeTab === 'games' ? 'Игры' : 'Поиск';
  const suggested = query ? searchResults.slice(0, 12) : seedApps.slice(0, 8);
  const todayHero = seedApps.find((app) => app.id === 'tiktok') ?? seedApps[0];
  const secondHero = seedApps.find((app) => app.id === 'roblox') ?? seedApps[1];
  const appsHero = apps.find((app) => app.id === 'whatsapp') ?? apps[0];
  const gamesHero = games.find((app) => app.id === 'brawl-stars') ?? games[0];

  return (
    <main className="phone-shell">
      <header className="ios-header">
        <h1>{title}</h1>
        <div className="profile-dot">R</div>
      </header>

      {activeTab === 'search' && (
        <div className="search-panel">
          <Search size={20} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Игры, приложения и другое" autoFocus />
          {query && <button onClick={() => setQuery('')}><X size={18} /></button>}
        </div>
      )}

      <section className="scroll-area">
        {activeTab === 'today' && (
          <>
            <HeroCard app={todayHero} onOpen={setSelectedApp} />
            <HeroCard app={secondHero} onOpen={setSelectedApp} />
            <h2 className="section-title">Популярное сегодня</h2>
            {seedApps.slice(0, 10).map((app) => <AppRow key={app.id} app={app} onOpen={setSelectedApp} />)}
          </>
        )}

        {activeTab === 'apps' && (
          <>
            <div className="chips">{['AR Apps', 'News', 'Utilities', 'Business'].map((chip) => <span key={chip}>{chip}</span>)}</div>
            {appsHero && <HeroCard app={appsHero} onOpen={setSelectedApp} />}
            <h2 className="section-title">Must‑Have приложения</h2>
            {visibleList.slice(0, 30).map((app) => <AppRow key={app.id} app={app} onOpen={setSelectedApp} />)}
          </>
        )}

        {activeTab === 'games' && (
          <>
            {gamesHero && <HeroCard app={gamesHero} onOpen={setSelectedApp} />}
            <h2 className="section-title">Популярные игры</h2>
            {visibleList.map((app) => <AppRow key={app.id} app={app} onOpen={setSelectedApp} />)}
          </>
        )}

        {activeTab === 'search' && (
          <>
            <h2 className="section-title">{query ? 'Результаты' : 'Предложенное'}</h2>
            {suggested.map((app) => <AppRow key={app.id} app={app} onOpen={setSelectedApp} featured={app.hasInAppPurchases} />)}
            {!suggested.length && <p className="empty-text">Ничего не найдено. Напиши мне название приложения, и я добавлю его в RuBox.</p>}
          </>
        )}
      </section>

      <nav className="bottom-tabs">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} className={activeTab === id ? 'active' : ''} onClick={() => setActiveTab(id)}>
            <Icon size={24} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {selectedApp && <AppDetail app={selectedApp} onClose={() => setSelectedApp(null)} />}
    </main>
  );
}
