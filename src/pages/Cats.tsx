import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CATS } from '../data/cats';
import { useLocale } from '../i18n';
import CatImage from '../components/CatImage';

type Filter = 'all' | 'breed' | 'coat';

export default function Cats() {
  const { t, l } = useLocale();
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATS.filter((c) => filter === 'all' || c.kind === filter).filter((c) =>
      !q || [c.name, c.title].some((x) => `${x['zh-TW']} ${x.en}`.toLowerCase().includes(q)),
    );
  }, [filter, query]);

  const filters: [Filter, string][] = [['all', t('filterAll')], ['breed', t('filterBreed')], ['coat', t('filterCoat')]];

  return (
    <section className="cats-page">
      <h1>{t('catsTitle')}</h1>
      <p className="lede">{t('catsIntro')}</p>
      <div className="cat-tools">
        <div className="filter-group" role="group" aria-label={t('catsTitle')}>
          {filters.map(([key, label]) => (
            <button key={key} type="button" className="filter" aria-pressed={filter === key} onClick={() => setFilter(key)}>
              {label}
            </button>
          ))}
        </div>
        <label className="search">
          <span className="visually-hidden">{t('searchLabel')}</span>
          <input type="search" value={query} placeholder={t('searchPlaceholder')} onChange={(e) => setQuery(e.target.value)} />
        </label>
      </div>
      {visible.length === 0 ? <p className="note" role="status">{t('noMatch')}</p> : (
        <ul className="cat-grid">
          {visible.map((cat) => (
            <li key={cat.id}>
              <Link to={`/cats/${cat.id}`} className="cat-card">
                <CatImage cat={cat} size="small" />
                <strong>{l(cat.name)}</strong>
                <small>{l(cat.title)}</small>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
