import { useEffect, useMemo, useState } from 'react';
import { Search, Sparkles, Star, Download, ChevronRight, Check } from 'lucide-react';
import { seedApps } from './data/apps';
import { StoreApp } from './types';

function matchesApp(app: StoreApp, search: string) {
  const normalizedSearch = search.trim().toLowerCase();
  if (!normalizedSearch) return true;

  return [
    app.name,
    app.developer,
    app.category,
    app.tagline,
    app.description,
    ...app.features,
  ]
    .join(' ')
    .toLowerCase()
    .includes(normalizedSearch);
}

export default function App() {
  const [apps] = useState<StoreApp[]>(seedApps);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(seedApps[0].id);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);

  const categories = ['All', ...Array.from(new Set(apps.map((app) => app.category)))];
  const [category, setCategory] = useState('All');

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesSearch = matchesApp(app, query);
      const matchesCategory = category === 'All' || app.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [apps, category, query]);

  const selectedApp = apps.find((app) => app.id === selectedId) ?? filteredApps[0] ?? apps[0];

  useEffect(() => {
    if (filteredApps.length > 0 && !filteredApps.some((app) => app.id === selectedId)) {
      setSelectedId(filteredApps[0].id);
    }
  }, [filteredApps, selectedId]);

  function handleDownload(appId: string) {
    if (downloadingId || downloadedIds.includes(appId)) return;

    setDownloadingId(appId);
    window.setTimeout(() => {
      setDownloadingId(null);
      setDownloadedIds((current) => (current.includes(appId) ? current : [...current, appId]));
    }, 1600);
  }

  const isSelectedDownloading = downloadingId === selectedApp.id;
  const isSelectedDownloaded = downloadedIds.includes(selectedApp.id);

  return (
    <main>
      <section className="hero">
        <nav className="topbar">
          <div className="brand">
            <div className="brand-mark"><Sparkles size={22} /></div>
            <span>RuBox</span>
          </div>
        </nav>

        <div className="hero-grid">
          <div>
            <p className="eyebrow">RuBox app library</p>
            <h1>RuBox</h1>
            <p className="hero-copy">Открывай страницы приложений, ищи нужные названия, смотри функции, отзывы и запускай красивую имитацию скачивания прямо из каталога.</p>
            <div className="search-box">
              <Search size={20} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Введите название приложения" />
            </div>
            {query.trim() && (
              <p className="search-hint">
                Найдено: {filteredApps.length}. Нажми на приложение в списке, чтобы открыть его страницу.
              </p>
            )}
          </div>
          <div className="featured-card" style={{ '--accent': selectedApp.accent } as React.CSSProperties}>
            <img src={selectedApp.icon} alt="" />
            <div>
              <p>Сейчас в RuBox</p>
              <h2>{selectedApp.name}</h2>
              <span>{selectedApp.tagline}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid">
        <aside className="sidebar">
          <div className="category-row">
            {categories.map((item) => (
              <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>
            ))}
          </div>

          <div className="app-list">
            {filteredApps.map((app) => (
              <button key={app.id} className={`app-row ${selectedId === app.id ? 'selected' : ''}`} onClick={() => setSelectedId(app.id)}>
                <img src={app.icon} alt="" />
                <div>
                  <strong>{app.name}</strong>
                  <span>{app.developer}</span>
                </div>
                <ChevronRight size={18} />
              </button>
            ))}

            {filteredApps.length === 0 && (
              <div className="empty-state">
                <strong>Ничего не найдено</strong>
                <span>Если нужно добавить новое приложение в RuBox, напиши мне, и я внесу его вручную.</span>
              </div>
            )}
          </div>
        </aside>

        <section className="detail-panel">
          <div className="app-header">
            <img src={selectedApp.icon} alt="" className="large-icon" />
            <div>
              <p className="category-label">{selectedApp.category}</p>
              <h2>{selectedApp.name}</h2>
              <p>{selectedApp.developer}</p>
              <button
                className={`download-button ${isSelectedDownloading ? 'loading' : ''} ${isSelectedDownloaded ? 'done' : ''}`}
                onClick={() => handleDownload(selectedApp.id)}
                disabled={isSelectedDownloading}
                aria-label={`Download ${selectedApp.name}`}
              >
                {isSelectedDownloading && <span className="download-spinner" />}
                {isSelectedDownloaded && !isSelectedDownloading && <Check size={18} />}
                {!isSelectedDownloading && !isSelectedDownloaded && <Download size={18} />}
                <span>{isSelectedDownloading ? 'Загрузка' : isSelectedDownloaded ? 'Готово' : 'Скачать'}</span>
              </button>
            </div>
          </div>

          <div className="stats">
            <div><Star size={18} /><strong>{selectedApp.rating}</strong><span>Rating</span></div>
            <div><Download size={18} /><strong>{selectedApp.downloads}</strong><span>Downloads</span></div>
            <div><Sparkles size={18} /><strong>{selectedApp.features.length}</strong><span>Features</span></div>
          </div>

          <p className="description">{selectedApp.description}</p>

          <div className="feature-cloud">
            {selectedApp.features.map((feature) => <span key={feature}>{feature}</span>)}
          </div>

          <h3>Preview</h3>
          <div className="screenshots">
            {selectedApp.screenshots.map((shot) => <img key={shot} src={shot} alt="App screenshot" />)}
          </div>

          <h3>Synthetic reviews</h3>
          <div className="reviews">
            {selectedApp.reviews.map((review) => (
              <article key={`${review.author}-${review.text}`}>
                <div><strong>{review.author}</strong><span>{'★'.repeat(review.rating)}</span></div>
                <p>{review.text}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
