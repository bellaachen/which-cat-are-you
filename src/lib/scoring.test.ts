import { describe, expect, it } from 'vitest';
import { CATS } from '../data/cats';
import { QUESTIONS } from '../data/questions';
import { CAT_IDS, DIMS } from '../data/types';
import { computeResult, dimBounds, isValidAnswers, matchCat, normalize, rawScores, scoreAnswers, similarity } from './scoring';
import { decodeAnswers, encodeAnswers } from './link';

describe('題庫結構', () => {
  it('恰有 12 題、每題 4 選項', () => {
    expect(QUESTIONS).toHaveLength(12);
    QUESTIONS.forEach((q) => expect(q.options.map((o) => o.id)).toEqual(['A', 'B', 'C', 'D']));
  });

  it('每個選項影響 1–3 個維度，權重合法', () => {
    QUESTIONS.flatMap((q) => q.options).forEach((o) => {
      const values = Object.values(o.weights);
      expect(values.length).toBeGreaterThanOrEqual(1);
      expect(values.length).toBeLessThanOrEqual(3);
      values.forEach((w) => expect([-2, -1, 1, 2]).toContain(w));
    });
  });

  it('每個維度至少由四題覆蓋', () => {
    DIMS.forEach((d) => {
      const covered = QUESTIONS.filter((q) => q.options.some((o) => o.weights[d])).length;
      expect(covered).toBeGreaterThanOrEqual(4);
    });
  });
});

describe('標準化與極值', () => {
  const bounds = dimBounds();

  it('每一維的正負上限對稱', () => {
    DIMS.forEach((d) => expect(bounds[d].hi).toBe(-bounds[d].lo));
  });

  it('沒有偏向時為 50，分數一律落在 0–100', () => {
    expect(normalize({ S: 0, A: 0, E: 0, R: 0, B: 0, T: 0 }).S).toBe(50);
    const clamped = normalize({ S: 99, A: -99, E: 0, R: 0, B: 0, T: 0 });
    expect(clamped.S).toBe(100);
    expect(clamped.A).toBe(0);
  });

  it('每一維的 0 與 100 都能由真實答案達成', () => {
    DIMS.forEach((d) => {
      const pick = (dir: 1 | -1) =>
        QUESTIONS.map((q) => {
          const ws = q.options.map((o) => (o.weights[d] ?? 0) * dir);
          return ws.indexOf(Math.max(...ws));
        });
      expect(scoreAnswers(pick(1))[d]).toBe(100);
      expect(scoreAnswers(pick(-1))[d]).toBe(0);
    });
  });

  it('原始分是所選權重的加總', () => {
    expect(rawScores(new Array(12).fill(0)).S).toBe(
      QUESTIONS.reduce((sum, q) => sum + (q.options[0].weights.S ?? 0), 0),
    );
  });
});

describe('配對', () => {
  it('相同答案永遠得到相同結果', () => {
    const answers = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3];
    const ids = new Set(Array.from({ length: 50 }, () => computeResult(answers).cat.id));
    expect(ids.size).toBe(1);
  });

  it('角色原型向量會配對回自己', () => {
    CATS.forEach((c) => expect(matchCat(c.vector).id).toBe(c.id));
  });

  it('同分時依固定 id 次序，且不受輸入順序影響', () => {
    const center = { S: 50, A: 50, E: 50, R: 50, B: 50, T: 50 };
    expect(similarity(center, CATS[0].vector)).toBe(0);
    expect(matchCat(center).id).toBe(CAT_IDS[0]);
    expect(matchCat(center, [...CATS].reverse()).id).toBe(CAT_IDS[0]);
  });

  it('拒絕無效答案', () => {
    expect(isValidAnswers([0, 1])).toBe(false);
    expect(isValidAnswers(new Array(12).fill(4))).toBe(false);
    expect(isValidAnswers(new Array(12).fill(1.5))).toBe(false);
    expect(() => computeResult([0])).toThrow();
  });
});

describe('可達性與分布（固定種子抽樣 40 萬組答案）', () => {
  let seed = 20261102;
  const next = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed;
  };
  const counts = new Map<string, number>();
  const n = 400_000;
  for (let i = 0; i < n; i++) {
    const answers = Array.from({ length: 12 }, () => (next() >>> 16) % 4);
    const id = matchCat(scoreAnswers(answers)).id;
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }

  it('16 種角色全部可達', () => expect(counts.size).toBe(16));

  it('沒有角色壟斷或過於稀有（3%–11%）', () => {
    counts.forEach((c) => {
      expect(c / n).toBeGreaterThan(0.03);
      expect(c / n).toBeLessThan(0.11);
    });
  });
});

describe('分享連結', () => {
  const answers = [0, 1, 2, 3, 3, 2, 1, 0, 0, 0, 3, 3];

  it('可完整還原', () => {
    expect(decodeAnswers('1', encodeAnswers(answers))).toEqual(answers);
  });

  it('拒絕無效參數', () => {
    ['', 'ABC', 'ABCDABCDABCE', 'abcdabcdabcd', 'ABCDABCDABCDA'].forEach((code) =>
      expect(decodeAnswers('1', code)).toBeNull(),
    );
    expect(decodeAnswers('2', encodeAnswers(answers))).toBeNull();
    expect(decodeAnswers(null, null)).toBeNull();
  });
});
