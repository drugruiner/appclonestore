import { useMemo, useState } from 'react';
import { AppWindow, Gamepad2, Layers3, Search, X, type LucideIcon } from 'lucide-react';
import { seedApps } from './data/apps';
import { StoreApp } from './types';

type Tab = 'today' | 'apps' | 'games' | 'search';

const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: 'today', label: 'Сегодня', icon: Layers3 },
  { id: 'apps', label: 'Приложения', icon: AppWindow },
  { id: 'games', label: 'Игры', icon: Gamepad2 },
  { id: 'search', label: 'Поиск', icon: Search },
];

function matchesApp(app: StoreApp, search: string) {
  const value = search.trim().toLowerCase();
  if (!value) return true;

  return [app.name, app.developer, app.category, app.subtitle, app.description, ...app.tags]
    .join(' ')
    .toLowerCase()
    .includes(value);
}

function AppIcon({ app, large = false }: { app: StoreApp; large?: boolean }) {
  return (
    <div className={`app-icon ${large ? 'large' : ''}`} style={{ background: app.iconGradient }}>
      <span>{app.iconText}</span>
    </div>
  );
}

function ActionButton({ app }: { app: StoreApp }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function handleClick() {
    if (loading || done || app.action === 'Открыть') return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1500);
  }

  const label = app.action === 'Открыть' ? 'Открыть' : done ? 'Готово' : app.action;

  return (
    <button className={`action-pill ${loading ? 'loading' : ''} ${done ? 'done' : ''}`} onClick={handleClick}>
      {loading ? <span className="loader" /> : label}
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
        <ActionButton app={app} />
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
        <ActionButton app={app} />
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
          <ActionButton app={app} />
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
