import { DIMS } from '../data/types';
import type { Vector } from '../data/types';
import { DIM_LABELS, useLocale } from '../i18n';

const SIZE = 340;
const C = SIZE / 2;
const R = 112;

const point = (i: number, value: number) => {
  const angle = -Math.PI / 2 + (i * Math.PI * 2) / DIMS.length;
  const r = (value / 100) * R;
  return [C + r * Math.cos(angle), C + r * Math.sin(angle)] as const;
};
const poly = (values: number[]) => values.map((v, i) => point(i, v).map((n) => n.toFixed(1)).join(',')).join(' ');

export default function Radar({ scores }: { scores: Vector }) {
  const { l, t } = useLocale();
  const values = DIMS.map((d) => scores[d]);
  const summary = DIMS.map((d) => `${l(DIM_LABELS[d].name)} ${Math.round(scores[d])}`).join(', ');

  return (
    <div className="radar">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={`${t('dimensions')}: ${summary}`}>
        {[25, 50, 75, 100].map((ring) => (
          <polygon key={ring} points={poly(DIMS.map(() => ring))} className="radar-ring" />
        ))}
        {DIMS.map((d, i) => {
          const [x, y] = point(i, 100);
          return <line key={d} x1={C} y1={C} x2={x} y2={y} className="radar-axis" />;
        })}
        <polygon points={poly(values)} className="radar-shape" />
        {DIMS.map((d, i) => {
          const [x, y] = point(i, values[i]);
          return (
            <circle key={d} cx={x} cy={y} r={5} className="radar-dot">
              <title>{`${l(DIM_LABELS[d].name)} ${Math.round(scores[d])}`}</title>
            </circle>
          );
        })}
        {DIMS.map((d, i) => {
          const [x, y] = point(i, 121);
          const anchor = Math.abs(x - C) < 4 ? 'middle' : x > C ? 'start' : 'end';
          return (
            <text key={d} x={x} y={y + (y < C - 40 ? -2 : y > C + 40 ? 12 : 4)} textAnchor={anchor} className="radar-label">
              {l(DIM_LABELS[d].high)}
            </text>
          );
        })}
      </svg>
      <dl className="trait-list">
        {DIMS.map((d) => (
          <div key={d} className="trait-row">
            <dt>{l(DIM_LABELS[d].name)}</dt>
            <dd>
              <span className="trait-end">{l(DIM_LABELS[d].low)}</span>
              <span className="trait-track"><span className="trait-mark" style={{ left: `${scores[d]}%` }} /></span>
              <span className="trait-end">{l(DIM_LABELS[d].high)}</span>
              <span className="trait-value">{Math.round(scores[d])}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
