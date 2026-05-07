import { FormEvent, useMemo, useState } from 'react';
import { Search, Sparkles, Star, Download, Plus, X, ChevronRight } from 'lucide-react';
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

export default function App() {
  const [apps, setApps] = useState<StoreApp[]>(seedApps);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(seedApps[0].id);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(emptyApp);

  const selectedApp = apps.find((app) => app.id === selectedId) ?? apps[0];
  const categories = ['All', ...Array.from(new Set(apps.map((app) => app.category)))];
  const [category, setCategory] = useState('All');

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesSearch = `${app.name} ${app.developer} ${app.category}`.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'All' || app.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [apps, category, query]);

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
    setForm(emptyApp);
    setIsFormOpen(false);
  }

  return (
    <main>
      <section className="hero">
        <nav className="topbar">
          <div className="brand">
            <div className="brand-mark"><Sparkles size={22} /></div>
            <span>App Clone Store</span>
          </div>
          <button className="add-button" onClick={() => setIsFormOpen(true)}>
            <Plus size={18} /> Add app
          </button>
        </nav>

        <div className="hero-grid">
          <div>
            <p className="eyebrow">Premium app discovery</p>
            <h1>Красивый каталог приложений в стиле App Store.</h1>
            <p className="hero-copy">Автоматический импорт данных можно подключить следующим этапом, а сейчас MVP уже поддерживает карточки, страницы приложений, карусели, отзывы и ручное добавление.</p>
            <div className="search-box">
              <Search size={20} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search apps, developers, categories" />
            </div>
          </div>
          <div className="featured-card" style={{ '--accent': selectedApp.accent } as React.CSSProperties}>
            <img src={selectedApp.icon} alt="" />
            <div>
              <p>Featured today</p>
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
          </div>
        </aside>

        <section className="detail-panel">
          <div className="app-header">
            <img src={selectedApp.icon} alt="" className="large-icon" />
            <div>
              <p className="category-label">{selectedApp.category}</p>
              <h2>{selectedApp.name}</h2>
              <p>{selectedApp.developer}</p>
              <button className="get-button">{selectedApp.price === 'Free' ? 'Get' : selectedApp.price}</button>
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
            <p>Заполни форму, и приложение появится в каталоге. Позже сделаем сохранение в backend или GitHub data-файл.</p>
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
