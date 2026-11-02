import { CATS } from '../data/cats';
import { QUESTIONS } from '../data/questions';
import { CAT_IDS, DIMS } from '../data/types';
import type { Cat, CatId, Dim, OptionId, Question, Vector } from '../data/types';

export const OPTION_IDS: OptionId[] = ['A', 'B', 'C', 'D'];
export const QUESTION_COUNT = QUESTIONS.length;

/** 每維實際可達的原始分上下界：逐題取該維的最小與最大權重加總。 */
export function dimBounds(questions: Question[] = QUESTIONS): Record<Dim, { lo: number; hi: number }> {
  const out = {} as Record<Dim, { lo: number; hi: number }>;
  for (const d of DIMS) {
    let lo = 0;
    let hi = 0;
    for (const q of questions) {
      const ws = q.options.map((o) => o.weights[d] ?? 0);
      lo += Math.min(...ws);
      hi += Math.max(...ws);
    }
    out[d] = { lo, hi };
  }
  return out;
}

const BOUNDS = dimBounds();

export function isValidAnswers(answers: unknown): answers is number[] {
  return (
    Array.isArray(answers) &&
    answers.length === QUESTION_COUNT &&
    answers.every((a) => Number.isInteger(a) && a >= 0 && a <= 3)
  );
}

/** 六維原始分：0 分起算，加總所選選項的權重。 */
export function rawScores(answers: number[], questions: Question[] = QUESTIONS): Vector {
  const raw: Vector = { S: 0, A: 0, E: 0, R: 0, B: 0, T: 0 };
  answers.forEach((a, i) => {
    const weights = questions[i].options[a].weights;
    for (const d of DIMS) raw[d] += weights[d] ?? 0;
  });
  return raw;
}

/** 對稱標準化：50 + 50 × raw / H，H 為該維可達上下界的最大絕對值，結果限制在 0–100。 */
export function normalize(raw: Vector): Vector {
  const out = {} as Vector;
  for (const d of DIMS) {
    const h = Math.max(BOUNDS[d].hi, Math.abs(BOUNDS[d].lo));
    out[d] = Math.min(100, Math.max(0, 50 + (50 * raw[d]) / h));
  }
  return out;
}

export const scoreAnswers = (answers: number[]): Vector => normalize(rawScores(answers));

/** 以 50 為中心的餘弦相似度。任一向量位於中心時回傳 0。 */
export function similarity(a: Vector, b: Vector): number {
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (const d of DIMS) {
    const x = a[d] - 50;
    const y = b[d] - 50;
    dot += x * y;
    na += x * x;
    nb += y * y;
  }
  return na === 0 || nb === 0 ? 0 : dot / Math.sqrt(na * nb);
}

const EPSILON = 1e-9;

/** 找出最接近的角色。同分時依 CAT_IDS 固定次序取前者，全程不使用隨機。 */
export function matchCat(scores: Vector, cats: Cat[] = CATS): Cat {
  const ordered = [...cats].sort((x, y) => CAT_IDS.indexOf(x.id) - CAT_IDS.indexOf(y.id));
  let best = ordered[0];
  let bestSim = similarity(scores, best.vector);
  for (const cat of ordered.slice(1)) {
    const sim = similarity(scores, cat.vector);
    if (sim > bestSim + EPSILON) {
      best = cat;
      bestSim = sim;
    }
  }
  return best;
}

export interface QuizResult {
  answers: number[];
  scores: Vector;
  cat: Cat;
}

export function computeResult(answers: number[]): QuizResult {
  if (!isValidAnswers(answers)) throw new Error('Invalid answers');
  const scores = scoreAnswers(answers);
  return { answers, scores, cat: matchCat(scores) };
}

export type { CatId };
