import { describe, expect, it } from 'vitest';
import { CATS } from '../data/cats';
import { PAIRINGS } from '../data/pairings';
import { CAT_IDS } from '../data/types';
import { compatScore, selectPairs } from './compat';

describe('相容性', () => {
  it('16×16 矩陣對稱，分數落在 30–95', () => {
    CAT_IDS.forEach((a) =>
      CAT_IDS.forEach((b) => {
        expect(compatScore(a, b)).toBe(compatScore(b, a));
        if (a !== b) {
          expect(compatScore(a, b)).toBeGreaterThanOrEqual(30);
          expect(compatScore(a, b)).toBeLessThanOrEqual(95);
        }
      }),
    );
  });

  it('文案表與規則算出的配對一致', () => {
    const best = selectPairs('best');
    const rival = selectPairs('rival');
    CAT_IDS.forEach((id) => {
      expect(PAIRINGS[id].best.map((p) => p.id)).toEqual(best[id]);
      expect(PAIRINGS[id].rival.map((p) => p.id)).toEqual(rival[id]);
    });
  });

  it('每隻貓有 4 個不重複且非自己的配對', () => {
    CAT_IDS.forEach((id) => {
      const ids = [...PAIRINGS[id].best, ...PAIRINGS[id].rival].map((p) => p.id);
      expect(new Set(ids).size).toBe(4);
      expect(ids).not.toContain(id);
    });
  });

  it('好友分數高於歡喜冤家，且同一隻貓被列入不超過 4 次', () => {
    const seen: Record<string, number> = {};
    CAT_IDS.forEach((id) => {
      const low = Math.min(...PAIRINGS[id].best.map((p) => compatScore(id, p.id)));
      const high = Math.max(...PAIRINGS[id].rival.map((p) => compatScore(id, p.id)));
      expect(low).toBeGreaterThan(high);
      PAIRINGS[id].rival.forEach((p) => (seen[p.id] = (seen[p.id] ?? 0) + 1));
    });
    Object.values(seen).forEach((n) => expect(n).toBeLessThanOrEqual(4));
  });

  it('每段配對原因都不重複', () => {
    const reasons = CAT_IDS.flatMap((id) =>
      [...PAIRINGS[id].best, ...PAIRINGS[id].rival].flatMap((p) => [p.reason['zh-TW'], p.reason.en]),
    );
    expect(new Set(reasons).size).toBe(reasons.length);
    expect(reasons).toHaveLength(128);
  });
});

describe('角色文案', () => {
  it('16 種角色的欄位完整', () => {
    expect(CATS.map((c) => c.id)).toEqual([...CAT_IDS]);
    CATS.forEach((c) => {
      const zh = [...c.description['zh-TW']].filter((ch) => /\p{Script=Han}/u.test(ch)).length;
      expect(zh, c.id).toBeGreaterThanOrEqual(100);
      expect([...c.description['zh-TW']].length, c.id).toBeLessThanOrEqual(190);
      expect(c.strengths).toHaveLength(3);
      expect(c.quirks).toHaveLength(2);
      expect(c.image.alt.en.length).toBeGreaterThan(10);
    });
  });
});

describe('字型子集', () => {
  it('介面用到的中文字都在 charset.txt', async () => {
    const { readFileSync } = await import('node:fs');
    const { appChars } = await import('../../scripts/charset');
    const subset = new Set(readFileSync('scripts/charset.txt', 'utf8'));
    expect([...appChars()].filter((c) => !subset.has(c))).toEqual([]);
  });
});
