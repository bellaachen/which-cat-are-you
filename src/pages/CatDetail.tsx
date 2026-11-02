import { Link, useParams } from 'react-router-dom';
import { CAT_BY_ID, CATS } from '../data/cats';
import type { CatId } from '../data/types';
import { useLocale } from '../i18n';
import CatImage from '../components/CatImage';
import CatProfile from '../components/CatProfile';
import Radar from '../components/Radar';
import { compatDetail } from '../lib/compat';

export default function CatDetail() {
  const { id } = useParams();
  const { t, l } = useLocale();
  const cat = CAT_BY_ID[id as CatId];

  if (!cat) {
    return (
      <section className="message">
        <h1>{t('notFound')}</h1>
        <Link className="button" to="/cats">{t('backToCats')}</Link>
      </section>
    );
  }

  const others = CATS.filter((c) => c.id !== cat.id)
    .map((c) => ({ cat: c, ...compatDetail(cat.id, c.id) }))
    .sort((a, b) => b.score - a.score);

  return (
    <article className="result">
      <Link className="back-link" to="/cats">{t('backToCats')}</Link>
      <header className="cat-hero">
        <CatImage cat={cat} eager className="cat-hero-image" />
        <div>
          <h1>{l(cat.name)}</h1>
          <p className="cat-hero-title">
            {cat.title['zh-TW']}<span lang="en">{cat.title.en}</span>
          </p>
          <blockquote>{l(cat.quote)}</blockquote>
          <ul className="chips">{cat.traits.map((x) => <li key={x.en}>{l(x)}</li>)}</ul>
        </div>
      </header>
      <section className="prose"><p>{l(cat.description)}</p></section>
      <section>
        <h2>{t('dimensions')}</h2>
        <p className="note">{t('dimensionsNote')}</p>
        <Radar scores={cat.vector} />
      </section>
      <CatProfile cat={cat} />
      <section>
        <h2>{t('allCompat')}</h2>
        <ol className="compat-list">
          {others.map((o) => (
            <li key={o.cat.id}>
              <Link to={`/cats/${o.cat.id}`}>{l(o.cat.name)}</Link>
              <span className="compat-bar"><span style={{ width: `${o.score}%` }} /></span>
              <b>{o.score}</b>
            </li>
          ))}
        </ol>
      </section>
      <div className="actions">
        <Link className="button primary" to="/quiz">{t('takeQuiz')}</Link>
        <Link className="button" to="/cats">{t('backToCats')}</Link>
      </div>
    </article>
  );
}
