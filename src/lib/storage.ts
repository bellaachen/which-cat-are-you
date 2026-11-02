import type { Locale } from '../data/types';
import { QUESTION_COUNT, isValidAnswers } from './scoring';

const KEY = 'which-cat:v1';

interface Stored {
  locale?: Locale;
  answers?: (number | null)[];
  step?: number;
  last?: number[];
}

function read(): Stored {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? '{}');
    return parsed && typeof parsed === 'object' ? (parsed as Stored) : {};
  } catch {
    return {};
  }
}

function patch(next: Partial<Stored>) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...read(), ...next }));
  } catch {
    /* 私密瀏覽等情況無法儲存時，測驗仍可正常進行 */
  }
}

export const emptyAnswers = (): (number | null)[] => new Array(QUESTION_COUNT).fill(null);

export function loadProgress(): { answers: (number | null)[]; step: number } {
  const { answers, step } = read();
  const ok =
    Array.isArray(answers) &&
    answers.length === QUESTION_COUNT &&
    answers.every((a) => a === null || (Number.isInteger(a) && a >= 0 && a <= 3));
  if (!ok) return { answers: emptyAnswers(), step: 0 };
  const safeStep = Number.isInteger(step) ? Math.min(Math.max(step!, 0), QUESTION_COUNT - 1) : 0;
  return { answers: answers!, step: safeStep };
}

export const saveProgress = (answers: (number | null)[], step: number) => patch({ answers, step });

export const hasProgress = () => loadProgress().answers.some((a) => a !== null);

export const saveLast = (answers: number[]) =>
  patch({ last: answers, answers: emptyAnswers(), step: 0 });

export function loadLast(): number[] | null {
  const { last } = read();
  return isValidAnswers(last) ? last : null;
}

export const clearAll = () => patch({ answers: emptyAnswers(), step: 0, last: undefined });

export function loadLocale(): Locale | null {
  const { locale } = read();
  return locale === 'zh-TW' || locale === 'en' ? locale : null;
}

export const saveLocale = (locale: Locale) => patch({ locale });
