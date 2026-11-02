// Collects every non-ASCII character the app can render, for font subsetting.
import { writeFileSync } from 'node:fs';
import { CATS } from '../src/data/cats';
import { PAIRINGS } from '../src/data/pairings';
import { QUESTIONS } from '../src/data/questions';
import { DIM_LABELS, UI } from '../src/i18n';

export function appChars(): string {
  const text = JSON.stringify([CATS, PAIRINGS, QUESTIONS, DIM_LABELS, UI]);
  return [...new Set(text)].filter((c) => c.charCodeAt(0) > 126).sort().join('');
}

if (process.argv[1]?.endsWith('charset.ts')) {
  writeFileSync('scripts/charset.txt', appChars());
  console.log(appChars().length, 'characters');
}
