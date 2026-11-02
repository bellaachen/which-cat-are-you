import { Link } from 'react-router-dom';
import { CAT_BY_ID } from '../data/cats';
import { PAIRINGS } from '../data/pairings';
import type { Cat, PairingNote } from '../data/types';
import { useLocale } from '../i18n';
import { compatDetail } from '../lib/compat';
import CatImage from './CatImage';

function PairCard({ cat, note }: { cat: Cat; note: PairingNote }) {
  const { l, t } = useLocale();
  const other = CAT_BY_ID[note.id];
  const detail = compatDetail(cat.id, note.id);
  return (
    <li className="pair">
      <Link to={`/cats/${other.id}`} className="pair-head">
        <CatImage cat={other} size="small" decorative className="pair-image" />
        <span>
          <strong>{l(other.name)}</strong>
          <small>{l(other.title)}</small>
        </span>
      </Link>
      <p className="pair-score">
        <span>{t('compatIndex')} <b>{detail.score}</b></span>
        <span>{t('rhythm')} {detail.rhythm}</span>
        <span>{t('complement')} {detail.complement}</span>
      </p>
      <p>{l(note.reason)}</p>
    </li>
  );
}

/** 結果頁與角色詳細頁共用的文案區塊。 */
export default function CatProfile({ cat }: { cat: Cat }) {
  const { l, t } = useLocale();
  const pairs = PAIRINGS[cat.id];
  return (
    <>
      <section className="profile-grid">
        <div>
          <h2>{t('strengths')}</h2>
          <ul className="tick-list">{cat.strengths.map((s) => <li key={s.en}>{l(s)}</li>)}</ul>
        </div>
        <div>
          <h2>{t('quirks')}</h2>
          <ul className="tick-list quirk">{cat.quirks.map((s) => <li key={s.en}>{l(s)}</li>)}</ul>
        </div>
      </section>
      <section className="prose">
        <h2>{t('relationship')}</h2>
        <p>{l(cat.relationship)}</p>
      </section>
      <section>
        <h2>{t('bestFriends')}</h2>
        <ul className="pair-list">{pairs.best.map((n) => <PairCard key={n.id} cat={cat} note={n} />)}</ul>
      </section>
      <section>
        <h2>{t('rivals')}</h2>
        <p className="note">{t('rivalsNote')}</p>
        <ul className="pair-list">{pairs.rival.map((n) => <PairCard key={n.id} cat={cat} note={n} />)}</ul>
      </section>
    </>
  );
}
