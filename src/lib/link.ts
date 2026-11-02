import { QUESTION_COUNT, OPTION_IDS, isValidAnswers } from './scoring';

export const DATA_VERSION = '1';

export const encodeAnswers = (answers: number[]): string =>
  answers.map((a) => OPTION_IDS[a]).join('');

/** 解析分享參數；版本或答案不合法時回傳 null，由頁面顯示友善提示。 */
export function decodeAnswers(version: string | null, code: string | null): number[] | null {
  if (version !== DATA_VERSION || !code) return null;
  if (!new RegExp(`^[A-D]{${QUESTION_COUNT}}$`).test(code)) return null;
  const answers = [...code].map((c) => OPTION_IDS.indexOf(c as (typeof OPTION_IDS)[number]));
  return isValidAnswers(answers) ? answers : null;
}

export const resultPath = (answers: number[]): string =>
  `/result?v=${DATA_VERSION}&a=${encodeAnswers(answers)}`;

export function absoluteResultUrl(answers: number[]): string {
  const { origin, pathname } = window.location;
  return `${origin}${pathname}#${resultPath(answers)}`;
}
