import { Link } from 'react-router-dom';
import { CATS } from '../data/cats';
import { useLocale } from '../i18n';
import CatImage from '../components/CatImage';

export default function Cats() {
  const { t, l } = useLocale();

  return (
    <section className="cats-page">
      <h1>{t('catsTitle')}</h1>
      <p className="lede">{t('catsIntro')}</p>
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
  );
}
