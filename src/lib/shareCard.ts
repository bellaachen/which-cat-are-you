import type { Cat, Locale } from '../data/types';
import { UI } from '../i18n';

const W = 1080;
const H = 1350;
const INK = '#403B35';
const SOFT = '#6B6258';
const PAPER = '#F7F1E6';
const SANS = '"DM Sans", "Noto Sans TC", sans-serif';
const SITE = 'bellaachen.github.io/which-cat-are-you';

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

/** 中文逐字斷行、英文逐詞斷行，回傳不超過欄寬的各行。 */
export function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, locale: Locale) {
  const tokens = locale === 'en' ? text.split(' ') : [...text];
  const glue = locale === 'en' ? ' ' : '';
  const lines: string[] = [];
  let line = '';
  for (const token of tokens) {
    const attempt = line ? line + glue + token : token;
    if (ctx.measureText(attempt).width > maxWidth && line) {
      lines.push(line);
      line = token;
    } else {
      line = attempt;
    }
  }
  if (line) lines.push(line);
  // 避免中文標點落單在行首
  for (let i = 1; i < lines.length; i++) {
    const ch = lines[i][0];
    if ('，。、！？：；」）'.includes(ch)) {
      lines[i - 1] += ch;
      lines[i] = lines[i].slice(1);
    }
  }
  return lines.filter(Boolean);
}

function fitLines(ctx: CanvasRenderingContext2D, text: string, weight: number, start: number, min: number, maxWidth: number, maxLines: number, locale: Locale) {
  for (let size = start; size >= min; size -= 2) {
    ctx.font = `${weight} ${size}px ${SANS}`;
    const lines = wrapText(ctx, text, maxWidth, locale);
    if (lines.length <= maxLines) return { size, lines };
  }
  ctx.font = `${weight} ${min}px ${SANS}`;
  return { size: min, lines: wrapText(ctx, text, maxWidth, locale).slice(0, maxLines) };
}

async function ensureFonts(text: string) {
  await Promise.all(
    [`400 40px "Noto Sans TC"`, `700 80px "Noto Sans TC"`, `500 34px "DM Sans"`, `700 80px "DM Sans"`, `600 48px Caveat`].map((f) =>
      document.fonts.load(f, text),
    ),
  );
  await document.fonts.ready;
}

function drawPaper(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);
  // 以固定種子撒紙張顆粒，同一隻貓每次產出相同圖片
  let seed = 7;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 9000; i++) {
    ctx.fillStyle = `rgba(64,59,53,${0.012 + rand() * 0.03})`;
    ctx.fillRect(rand() * W, rand() * H, 1 + rand() * 1.6, 1 + rand() * 1.6);
  }
}

export async function renderShareCard(cat: Cat, locale: Locale): Promise<Blob> {
  const name = cat.name[locale];
  const title = cat.title[locale];
  const quote = cat.quote[locale];
  const traits = cat.traits.map((x) => x[locale]);
  await ensureFonts([name, title, quote, ...traits, UI[locale].shareUrlLabel, SITE].join(''));

  const img = await loadImage(`${import.meta.env.BASE_URL}${cat.image.src}.webp`);
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is unavailable');

  drawPaper(ctx);
  ctx.textBaseline = 'alphabetic';

  ctx.fillStyle = INK;
  ctx.textAlign = 'left';
  ctx.font = '600 48px Caveat';
  ctx.fillText('Which Cat Are You?', 76, 96);

  // 主圖底部約有 8% 留白，文字從圖下方開始，不與插畫重疊
  const art = 770;
  ctx.drawImage(img, (W - art) / 2, 84, art, art);

  const left = 76;
  const width = W - left * 2;
  let y = 888;

  const nameFit = fitLines(ctx, name, 700, 78, 54, width, 1, locale);
  ctx.font = `700 ${nameFit.size}px ${SANS}`;
  ctx.fillText(nameFit.lines[0], left, y);
  y += 54;

  const titleFit = fitLines(ctx, title, 500, 38, 28, width, 1, locale);
  ctx.font = `500 ${titleFit.size}px ${SANS}`;
  ctx.fillStyle = SOFT;
  ctx.fillText(titleFit.lines[0], left, y);
  y += 66;

  const quoteFit = fitLines(ctx, quote, 500, 42, 30, width, 2, locale);
  ctx.font = `500 ${quoteFit.size}px ${SANS}`;
  ctx.fillStyle = INK;
  for (const line of quoteFit.lines) {
    ctx.fillText(line, left, y);
    y += quoteFit.size * 1.42;
  }
  y += 18;

  ctx.font = `500 30px ${SANS}`;
  let x = left;
  const chipH = 56;
  for (const trait of traits) {
    const w = ctx.measureText(trait).width + 44;
    if (x + w > W - left) break;
    ctx.fillStyle = cat.color;
    ctx.beginPath();
    ctx.roundRect(x, y, w, chipH, 28);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.fillText(trait, x + 22, y + 39);
    x += w + 14;
  }

  ctx.font = `500 26px ${SANS}`;
  ctx.fillStyle = SOFT;
  ctx.fillText(`${UI[locale].shareUrlLabel}  ${SITE}`, left, H - 58);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('PNG export failed'))), 'image/png');
  });
}
