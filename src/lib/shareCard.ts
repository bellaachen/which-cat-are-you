import type { Cat, Locale } from '../data/types';
import { CAT_BY_ID } from '../data/cats';
import { PAIRINGS } from '../data/pairings';
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
  console.warn(`Share card text truncated: ${text.slice(0, 24)}`);
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

function chip(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
  else ctx.rect(x, y, w, h);
  ctx.fill();
}

const MARGIN = 76;
const INK_LINE = 'rgba(64,59,53,0.28)';

/** 分享圖的貓咪配對欄：只放圖、名稱和稱號。 */
function drawPairTile(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, name: string, title: string, locale: Locale) {
  const w = 214;
  ctx.drawImage(img, 0, 96, 480, 368, x, y, w, 164);
  const nameFit = fitLines(ctx, name, 700, 26, 20, w, 1, locale);
  ctx.font = `700 ${nameFit.size}px ${SANS}`;
  ctx.fillStyle = INK;
  ctx.fillText(nameFit.lines[0], x, y + 196);
  const titleFit = fitLines(ctx, title, 500, 21, 18, w, 2, locale);
  ctx.font = `500 ${titleFit.size}px ${SANS}`;
  ctx.fillStyle = SOFT;
  titleFit.lines.forEach((line, i) => ctx.fillText(line, x, y + 226 + i * (titleFit.size + 5)));
}

export async function renderShareCard(cat: Cat, locale: Locale): Promise<Blob> {
  const ui = UI[locale];
  const name = cat.name[locale];
  const title = cat.title[locale];
  const quote = cat.quote[locale];
  const description = cat.description[locale];
  const traits = cat.traits.map((x) => x[locale]);
  const groups = [
    { label: ui.bestFriends, cats: PAIRINGS[cat.id].best.map((p) => CAT_BY_ID[p.id]) },
    { label: ui.rivals, cats: PAIRINGS[cat.id].rival.map((p) => CAT_BY_ID[p.id]) },
  ];
  const others = groups.flatMap((g) => g.cats);
  await ensureFonts([
    name, title, quote, description, ...traits, ui.shareUrlLabel, SITE, ui.bestFriends, ui.rivals,
    ...others.flatMap((c) => [c.name[locale], c.title[locale]]),
  ].join(''));

  const base = import.meta.env.BASE_URL;
  const [img, ...thumbs] = await Promise.all([
    loadImage(`${base}${cat.image.src}.webp`),
    ...others.map((c) => loadImage(`${base}${c.image.src}-480.webp`)),
  ]);
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is unavailable');

  drawPaper(ctx);
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';

  ctx.fillStyle = INK;
  ctx.font = '600 44px Caveat';
  ctx.fillText('Which Cat Are You?', MARGIN, 88);

  // 上半部：左圖右文，主圖下緣約有 8% 留白
  ctx.drawImage(img, 36, 62, 540, 540);

  const col = 590;
  const colWidth = W - MARGIN - col;
  let y = 188;

  const nameFit = fitLines(ctx, name, 700, locale === 'en' ? 58 : 70, 44, colWidth, 2, locale);
  ctx.font = `700 ${nameFit.size}px ${SANS}`;
  for (const line of nameFit.lines) {
    ctx.fillText(line, col, y);
    y += nameFit.size * 1.16;
  }
  y -= nameFit.size * 0.16;
  y += 34;

  const titleFit = fitLines(ctx, title, 500, 32, 24, colWidth, 2, locale);
  ctx.font = `500 ${titleFit.size}px ${SANS}`;
  ctx.fillStyle = SOFT;
  for (const line of titleFit.lines) {
    ctx.fillText(line, col, y);
    y += titleFit.size * 1.3;
  }
  y += 22;

  const quoteFit = fitLines(ctx, quote, 500, locale === 'en' ? 29 : 34, 26, colWidth, 4, locale);
  ctx.font = `500 ${quoteFit.size}px ${SANS}`;
  ctx.fillStyle = INK;
  for (const line of quoteFit.lines) {
    ctx.fillText(line, col, y);
    y += quoteFit.size * 1.42;
  }
  y += 2;

  ctx.font = `500 ${locale === 'en' ? 23 : 26}px ${SANS}`;
  let x = col;
  const chipH = locale === 'en' ? 42 : 48;
  for (const trait of traits) {
    const w = ctx.measureText(trait).width + 34;
    if (x + w > W - MARGIN && x > col) {
      x = col;
      y += chipH + 10;
    }
    ctx.fillStyle = cat.color;
    chip(ctx, x, y, w, chipH, 24);
    ctx.fillStyle = INK;
    ctx.fillText(trait, x + 17, y + chipH * 0.68);
    x += w + 10;
  }
  const textTop = Math.max(638, y + chipH + 50);

  // 性格短文
  const textWidth = W - MARGIN * 2;
  const maxLines = Math.floor((900 - textTop) / (locale === 'en' ? 36 : 45)) + 1;
  const descFit = fitLines(ctx, description, 400, locale === 'en' ? 26 : 30, 23, textWidth, maxLines, locale);
  ctx.font = `400 ${descFit.size}px ${SANS}`;
  ctx.fillStyle = INK;
  const lineHeight = descFit.size * 1.5;
  y = textTop;
  for (const line of descFit.lines) {
    ctx.fillText(line, MARGIN, y);
    y += lineHeight;
  }

  // 最佳貓友與歡喜冤家
  const groupY = 952;
  ctx.strokeStyle = INK_LINE;
  ctx.setLineDash([6, 6]);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(MARGIN, groupY - 34);
  ctx.lineTo(W - MARGIN, groupY - 34);
  ctx.stroke();
  ctx.setLineDash([]);

  groups.forEach((group, g) => {
    const gx = MARGIN + g * 478;
    ctx.font = `700 28px ${SANS}`;
    ctx.fillStyle = INK;
    ctx.fillText(group.label, gx, groupY + 8);
    group.cats.forEach((other, i) => {
      drawPairTile(ctx, thumbs[g * 2 + i], gx + i * 226, groupY + 26, other.name[locale], other.title[locale], locale);
    });
  });

  ctx.font = `500 24px ${SANS}`;
  ctx.fillStyle = SOFT;
  ctx.fillText(`${ui.shareUrlLabel}  ${SITE}`, MARGIN, H - 40);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('PNG export failed'))), 'image/png');
  });
}
