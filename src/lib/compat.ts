import { CATS } from '../data/cats';
import type { CatId, Vector } from '../data/types';

/** 共同節奏：社交（S）與生活節奏（R）差距越小越高。 */
export function rhythm(a: Vector, b: Vector): number {
  return 100 - (Math.abs(a.S - b.S) + Math.abs(a.R - b.R)) / 2;
}

const COMPLEMENT_PEAK = 35;

/** 互補空間：行動、情緒、關係、思考四維的差距接近 35 分時最高。 */
export function complement(a: Vector, b: Vector): number {
  const dims = ['A', 'E', 'B', 'T'] as const;
  const total = dims.reduce((sum, d) => {
    const diff = Math.abs(a[d] - b[d]);
    return sum + 100 - (Math.abs(diff - COMPLEMENT_PEAK) / 65) * 100;
  }, 0);
  return total / dims.length;
}

export const rawCompat = (a: Vector, b: Vector): number =>
  0.55 * rhythm(a, b) + 0.45 * complement(a, b);

const offDiagonal: number[] = [];
for (const a of CATS) for (const b of CATS) if (a.id !== b.id) offDiagonal.push(rawCompat(a.vector, b.vector));
const MIN = Math.min(...offDiagonal);
const MAX = Math.max(...offDiagonal);

/** 娛樂性速配指數：把角色間的原始值線性換算到 30–95。 */
export function compatScore(a: CatId, b: CatId): number {
  const va = CATS.find((c) => c.id === a)!.vector;
  const vb = CATS.find((c) => c.id === b)!.vector;
  return Math.round(30 + (65 * (rawCompat(va, vb) - MIN)) / (MAX - MIN));
}

export function compatDetail(a: CatId, b: CatId) {
  const va = CATS.find((c) => c.id === a)!.vector;
  const vb = CATS.find((c) => c.id === b)!.vector;
  return {
    score: compatScore(a, b),
    rhythm: Math.round(rhythm(va, vb)),
    complement: Math.round(complement(va, vb)),
  };
}

const CAP = 4;

/** 依分數排序後貪婪挑選，每隻貓各選 2 位，且每隻最多被選入 CAP 次。 */
export function selectPairs(mode: 'best' | 'rival'): Record<CatId, CatId[]> {
  const directed: { value: number; i: number; j: number }[] = [];
  CATS.forEach((a, i) =>
    CATS.forEach((b, j) => {
      if (i !== j) directed.push({ value: Math.round(rawCompat(a.vector, b.vector) * 1e6) / 1e6, i, j });
    }),
  );
  directed.sort((x, y) =>
    (mode === 'best' ? y.value - x.value : x.value - y.value) || x.i - y.i || x.j - y.j,
  );
  const picks = CATS.map(() => [] as number[]);
  const used = CATS.map(() => 0);
  for (const { i, j } of directed) {
    if (picks[i].length < 2 && used[j] < CAP) {
      picks[i].push(j);
      used[j] += 1;
    }
  }
  return Object.fromEntries(CATS.map((c, i) => [c.id, picks[i].map((j) => CATS[j].id)])) as Record<CatId, CatId[]>;
}
