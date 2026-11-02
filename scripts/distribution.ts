// Enumerates all 4^12 answer combinations and prints each cat's share.
import { CATS } from '../src/data/cats';
import { QUESTIONS } from '../src/data/questions';
import { DIMS } from '../src/data/types';
import { dimBounds } from '../src/lib/scoring';

const bounds = dimBounds();
const H = DIMS.map((d) => Math.max(bounds[d].hi, -bounds[d].lo));
const cats = CATS.map((c) => {
  const v = DIMS.map((d) => c.vector[d] - 50);
  return { v, n: Math.hypot(...v) };
});

const half = (qs: typeof QUESTIONS) => {
  let out: number[][] = [[0, 0, 0, 0, 0, 0]];
  for (const q of qs) {
    out = out.flatMap((r) => q.options.map((o) => r.map((x, i) => x + (o.weights[DIMS[i]] ?? 0))));
  }
  return out;
};
const left = half(QUESTIONS.slice(0, 6));
const right = half(QUESTIONS.slice(6));
const counts = new Array(CATS.length).fill(0);
const x = new Array(6).fill(0);

for (const a of left) {
  for (const b of right) {
    let nx = 0;
    for (let i = 0; i < 6; i++) {
      x[i] = (50 * (a[i] + b[i])) / H[i];
      nx += x[i] * x[i];
    }
    nx = Math.sqrt(nx);
    let best = 0;
    let bestSim = -Infinity;
    for (let c = 0; c < cats.length; c++) {
      let dot = 0;
      for (let i = 0; i < 6; i++) dot += x[i] * cats[c].v[i];
      const sim = nx === 0 ? 0 : dot / (nx * cats[c].n);
      if (sim > bestSim + 1e-9) {
        best = c;
        bestSim = sim;
      }
    }
    counts[best] += 1;
  }
}

const total = counts.reduce((s, c) => s + c, 0);
CATS.map((c, i) => [c.id, counts[i]] as const)
  .sort((p, q) => q[1] - p[1])
  .forEach(([id, n]) => console.log(id.padEnd(11), String(n).padStart(9), `${((n / total) * 100).toFixed(1)}%`));
console.log('total', total);
