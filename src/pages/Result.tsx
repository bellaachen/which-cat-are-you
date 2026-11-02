import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useLocale } from '../i18n';
import CatImage from '../components/CatImage';
import CatProfile from '../components/CatProfile';
import Radar from '../components/Radar';
import { absoluteResultUrl, decodeAnswers, resultPath } from '../lib/link';
import { computeResult } from '../lib/scoring';
import { renderShareCard } from '../lib/shareCard';
import { clearAll, loadLast } from '../lib/storage';

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.append(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
}

export default function Result() {
  const { t, l, locale } = useLocale();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [share, setShare] = useState<{ status: 'making' | 'ready' | 'failed'; url?: string } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => () => { if (share?.url) URL.revokeObjectURL(share.url); }, [share?.url]);

  const hasParams = params.has('a') || params.has('v');
  if (!hasParams) {
    const last = loadLast();
    if (last) return <Navigate to={resultPath(last)} replace />;
    return (
      <section className="message">
        <h1>{t('noResultTitle')}</h1>
        <p>{t('noResultBody')}</p>
        <Link className="button primary" to="/quiz">{t('start')}</Link>
      </section>
    );
  }

  const answers = decodeAnswers(params.get('v'), params.get('a'));
  if (!answers) {
    return (
      <section className="message">
        <h1>{t('invalidTitle')}</h1>
        <p>{t('invalidBody')}</p>
        <Link className="button primary" to="/quiz">{t('retake')}</Link>
      </section>
    );
  }

  const { cat, scores } = computeResult(answers);

  const makeImage = async () => {
    setShare({ status: 'making' });
    dialog.current?.showModal();
    // 把焦點放在彈窗本身，開啟時叉叉不會出現焦點外框；鍵盤按 Tab 時才會顯示
    dialog.current?.focus();
    try {
      const blob = await renderShareCard(cat, locale);
      setShare({ status: 'ready', url: URL.createObjectURL(blob) });
    } catch {
      setShare({ status: 'failed' });
    }
  };

  const copyLink = async () => {
    await copyText(absoluteResultUrl(answers));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2400);
  };

  const retake = () => {
    clearAll();
    navigate('/quiz');
  };

  return (
    <article className="result">
      <header className="cat-hero">
        <CatImage cat={cat} eager className="cat-hero-image" />
        <div>
          <p className="cat-hero-lead">{t('youAre')}</p>
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
        <Radar scores={scores} />
      </section>
      <CatProfile cat={cat} />
      <section className="result-actions">
        <button type="button" className="button primary" onClick={makeImage}>{t('saveResult')}</button>
        <button type="button" className="button" onClick={copyLink}>{copied ? t('copied') : t('copyLink')}</button>
        <button type="button" className="button" onClick={retake}>{t('retake')}</button>
        <Link className="button" to="/cats">{t('viewCats')}</Link>
        <span className="visually-hidden" aria-live="polite">{copied ? t('copied') : ''}</span>
      </section>
      <dialog
        ref={dialog} className="share-dialog" aria-labelledby="share-title" tabIndex={-1}
        onClick={(e) => { if (e.target === dialog.current) dialog.current?.close(); }}
      >
        <button type="button" className="dialog-close" aria-label={t('close')} onClick={() => dialog.current?.close()}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6.5 18 17.5M17.5 6 6.5 18" /></svg>
        </button>
        <h2 id="share-title">{t('shareTitle')}</h2>
        {share?.status === 'making' && <p role="status">{t('shareMaking')}</p>}
        {share?.status === 'failed' && <p role="alert">{t('shareFail')}</p>}
        {share?.status === 'ready' && (
          <>
            <img src={share.url} alt={`${l(cat.name)} ${l(cat.title)}`} />
            <p className="note">{t('shareHint')}</p>
          </>
        )}
        {share?.status === 'ready' && (
          <a className="button primary share-save" href={share.url} download={`which-cat-${cat.id}.png`}>{t('saveImage')}</a>
        )}
      </dialog>
    </article>
  );
}
