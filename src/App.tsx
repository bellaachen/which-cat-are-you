import { useEffect, useRef } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { useLocale } from './i18n';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Cats from './pages/Cats';
import CatDetail from './pages/CatDetail';

function NotFound() {
  const { t } = useLocale();
  return (
    <section className="message">
      <h1>{t('notFound')}</h1>
      <Link className="button" to="/">{t('home')}</Link>
    </section>
  );
}

export default function App() {
  const { t, toggle } = useLocale();
  const { pathname } = useLocation();
  const main = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main" onClick={(e) => { e.preventDefault(); main.current?.focus(); }}>
        {t('skip')}
      </a>
      <header className="site-header">
        <Link className="wordmark" to="/">Which Cat Are You?</Link>
        <nav>
          <Link className="nav-link" to="/cats">{t('navCats')}</Link>
          <button type="button" className="lang-toggle" onClick={toggle} aria-label={t('switchLangLabel')}>
            {t('switchLang')}
          </button>
        </nav>
      </header>
      <main id="main" ref={main} tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/cats" element={<Cats />} />
          <Route path="/cats/:id" element={<CatDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="site-footer">
        {t('footer')}
      </footer>
    </>
  );
}
