import { useState } from 'react';
import type { Cat } from '../data/types';
import { useLocale } from '../i18n';

const base = import.meta.env.BASE_URL;

export const catImageUrl = (cat: Cat, size: 'full' | 'small' = 'full') =>
  `${base}${cat.image.src}${size === 'small' ? '-480' : ''}.webp`;

interface Props {
  cat: Cat;
  size?: 'full' | 'small';
  eager?: boolean;
  className?: string;
  decorative?: boolean;
}

export default function CatImage({ cat, size = 'full', eager, className, decorative }: Props) {
  const { l } = useLocale();
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className={`cat-fallback ${className ?? ''}`} style={{ background: cat.color }}>
        {l(cat.name)}
      </span>
    );
  }

  return (
    <img
      className={className}
      src={catImageUrl(cat, size)}
      srcSet={`${catImageUrl(cat, 'small')} 480w, ${catImageUrl(cat)} 1200w`}
      sizes={size === 'small' ? '(min-width: 900px) 260px, 45vw' : '(min-width: 900px) 520px, 90vw'}
      width={1200}
      height={1200}
      alt={decorative ? '' : l(cat.image.alt)}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
