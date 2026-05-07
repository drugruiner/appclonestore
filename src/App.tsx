import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Search, Sparkles, Star, Download, Plus, X, ChevronRight, Check } from 'lucide-react';
import { seedApps } from './data/apps';
import { StoreApp } from './types';

const emptyApp = {
  name: '',
  developer: '',
  category: '',
  price: 'Free',
  icon: '',
  tagline: '',
  description: '',
  features: '',
  screenshots: '',
};

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function syntheticReviews(appName: string) {
  return [
    { author: 'Demo User', rating: 5, text: `${appName} feels polished, fast, and ready for daily use.` },
    { author: 'Synthetic Reviewer', rating: 4, text: 'Clean interface, useful features, and a very smooth onboarding flow.' },
  ];
}

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
  const [apps, setApps] = useState<StoreApp[]>(seedApps);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(seedApps[0].id);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(emptyApp);
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const app: StoreApp = {
      id: slugify(form.name || `custom-${Date.now()}`),
      name: form.name || 'Untitled App',
      developer: form.developer || 'Independent Developer',
      category: form.category || 'Utilities',
      price: form.price || 'Free',
      rating: 4.8,
      downloads: 'New',
      icon: form.icon || 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=160&q=80',
      accent: '#007aff',
      tagline: form.tagline || 'A beautiful new app for your collection.',
      description: form.description || 'Manually added application. Edit the data source later to make it permanent.',
      features: form.features.split(',').map((item) => item.trim()).filter(Boolean),
      screenshots: form.screenshots.split(',').map((item) => item.trim()).filter(Boolean),
      reviews: syntheticReviews(form.name || 'This app'),
    };

    if (app.features.length === 0) app.features = ['Clean UI', 'Fast launch', 'Mobile-ready'];
    if (app.screenshots.length === 0) {
      app.screenshots = ['https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80'];
    }

    setApps((current) => [app, ...current]);
    setSelectedId(app.id);
    setQuery(app.name);
    setCategory('All');
    setForm(emptyApp);
    setIsFormOpen(false);
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
          <button className="add-button" onClick={() => setIsFormOpen(true)}>
            <Plus size={18} /> Add app
          </button>
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
                <span>Попробуй другое название или добавь приложение вручную.</span>
                <button onClick={() => setIsFormOpen(true)}>Добавить приложение</button>
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

      {isFormOpen && (
        <div className="modal-backdrop">
          <form className="app-form" onSubmit={handleSubmit}>
            <button type="button" className="close" onClick={() => setIsFormOpen(false)}><X size={20} /></button>
            <h2>Add application manually</h2>
            <p>Заполни форму, и приложение появится в RuBox. Позже сделаем сохранение в backend или GitHub data-файл.</p>
            {Object.keys(emptyApp).map((key) => (
              <label key={key}>
                {key}
                <input value={form[key as keyof typeof form]} onChange={(event) => setForm({ ...form, [key]: event.target.value })} placeholder={key === 'features' || key === 'screenshots' ? 'Comma separated values' : ''} />
              </label>
            ))}
            <button className="submit-button" type="submit">Create app card</button>
          </form>
        </div>
      )}
    </main>
  );
}
