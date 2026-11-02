import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CAT_BY_ID, CATS } from '../data/cats';
import { useLocale } from '../i18n';
import CatImage from '../components/CatImage';
import { resultPath } from '../lib/link';
import { clearAll, loadLast, loadProgress } from '../lib/storage';

export default function Home() {
  const { t, l } = useLocale();
  const [progress, setProgress] = useState(loadProgress);
  const [last, setLast] = useState(loadLast);
  const inProgress = progress.answers.some((a) => a !== null);

  const clear = () => {
    clearAll();
    setProgress(loadProgress());
    setLast(null);
  };

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>{t('heroTitle')}</h1>
          <p>{t('heroBody')}</p>
          <div className="actions">
            <Link className="button primary" to="/quiz">
              {inProgress ? t('resume', { n: progress.step + 1 }) : t('start')}
            </Link>
            <Link className="button" to="/cats">{t('browseCats')}</Link>
          </div>
          {(inProgress || last) && (
            <p className="hero-links">
              {last && <Link to={resultPath(last)}>{t('lastResult')}</Link>}
              <button type="button" className="text-button" onClick={clear}>{t('clearRecord')}</button>
            </p>
          )}
        </div>
        <div className="hero-art" aria-hidden="true">
          <CatImage cat={CAT_BY_ID.tabby} eager decorative className="hero-cat a" />
          <CatImage cat={CAT_BY_ID.tuxedo} eager decorative className="hero-cat b" />
        </div>
      </section>
      <section className="roster">
        <h2>{t('rosterTitle')}</h2>
        <p className="note">{t('rosterNote')}</p>
        <ul className="cat-grid">
          {CATS.map((cat) => (
            <li key={cat.id}>
              <Link to={`/cats/${cat.id}`} className="cat-card">
                <CatImage cat={cat} size="small" />
                <strong>{l(cat.name)}</strong>
                <small>{l(cat.title)}</small>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
