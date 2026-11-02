// End-to-end smoke test. Run against `vite preview`: node e2e/flow.cjs [baseUrl] [shotDir]
const { chromium } = require('playwright');
const fs = require('fs');
const BASE = process.argv[2] || 'http://localhost:4173/which-cat-are-you/';
const OUT = process.argv[3] || '/tmp';
const WIDTHS = [320, 375, 768, 1024, 1440];
const CODE = 'ABCDBCADCBAD';

(async () => {
  const browser = await chromium.launch();
  const fails = [];
  const check = (ok, msg) => { console.log(ok ? 'ok  ' : 'FAIL', msg); if (!ok) fails.push(msg); };

  const noOverflow = async (page, label) => {
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    check(over <= 0, `no horizontal overflow: ${label} (${over})`);
  };

  // full quiz flow
  const ctx = await browser.newContext({ viewport: { width: 375, height: 760 }, locale: 'zh-TW', acceptDownloads: true });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(BASE);
  await page.getByRole('link', { name: '開始測驗' }).click();
  check(await page.getByRole('button', { name: '下一題' }).isDisabled(), '未作答不能下一題');
  for (let i = 0; i < 12; i++) {
    if (i === 5) {
      await page.reload();
      check(await page.getByText('第 6 題，共 12 題').first().isVisible(), '重新整理後恢復進度');
    }
    await page.locator('.option').nth(i % 4).click();
    if (i === 3) {
      await page.getByRole('button', { name: 'EN' }).click();
      check(await page.locator('.option.selected').count() === 1, '切換語言保留答案');
      await page.getByRole('button', { name: 'Back' }).click();
      await page.getByRole('button', { name: 'Next' }).click();
      check(await page.locator('.option.selected').count() === 1, '返回後答案仍在');
      await page.getByRole('button', { name: '中文' }).click();
    }
    if (i < 11) await page.getByRole('button', { name: '下一題' }).click();
  }
  await page.getByRole('button', { name: '看結果' }).click();
  await page.waitForURL(/result\?v=1&a=[A-D]{12}/);
  check(page.url().endsWith('a=ABCDABCDABCD'), '結果連結含最終答案');
  const first = await page.locator('h1').innerText();
  await page.reload();
  check((await page.locator('h1').innerText()) === first, '結果重新整理不變');

  // share link in a clean browser
  const fresh = await browser.newContext({ viewport: { width: 375, height: 760 }, locale: 'en-US' });
  const p2 = await fresh.newPage();
  await p2.goto(`${BASE}#/result?v=1&a=${CODE}`);
  check(await p2.locator('.cat-hero h1').isVisible(), '新瀏覽器可還原分享連結');
  await p2.goto(`${BASE}#/result?v=1&a=ZZZ`);
  await p2.reload();
  check(await p2.getByText('This result link can’t be opened').isVisible(), '無效連結有友善提示');
  await p2.goto(`${BASE}#/cats/tabby`);
  await p2.reload();
  check(await p2.getByRole('heading', { name: 'Tabby Mix' }).isVisible(), '虎斑深連結可開啟');

  // share PNG in both languages
  for (const [locale, code] of [['zh-TW', CODE], ['en', 'AAAAAAAAAAAA'], ['zh-TW', 'DCBADCBADCBA']]) {
    const c = await browser.newContext({ viewport: { width: 1024, height: 900 }, locale, acceptDownloads: true });
    const p = await c.newPage();
    await p.goto(`${BASE}#/result?v=1&a=${code}`);
    await p.getByRole('button', { name: locale === 'en' ? 'Save result' : '儲存結果' }).click();
    const link = p.locator('.share-dialog a.button.primary');
    await link.waitFor();
    const [dl] = await Promise.all([p.waitForEvent('download'), link.click()]);
    const path = `${OUT}/share-${locale}-${code}.png`;
    await dl.saveAs(path);
    const size = fs.statSync(path).size;
    const dims = await p.evaluate(async () => {
      const img = document.querySelector('.share-dialog img');
      await img.decode();
      return [img.naturalWidth, img.naturalHeight];
    });
    check(dims[0] === 1080 && dims[1] === 1350 && size > 50000, `分享圖 ${locale} ${code} ${dims} ${size}`);
    await c.close();
  }

  // every page at every width, both locales
  const pages = ['', 'quiz', `result?v=1&a=${CODE}`, 'cats', 'cats/tabby', 'cats/norwegian'];
  for (const width of WIDTHS) {
    for (const locale of ['zh-TW', 'en-US']) {
      const c = await browser.newContext({ viewport: { width, height: 800 }, locale });
      const p = await c.newPage();
      for (const route of pages) {
        await p.goto(`${BASE}#/${route}`);
        await p.waitForTimeout(150);
        await noOverflow(p, `${width} ${locale} /${route}`);
        if (width === 375 || width === 1440) {
          await p.waitForLoadState('networkidle');
          await p.screenshot({ path: `${OUT}/${width}-${locale}-${route.split('?')[0].replace('/', '_') || 'home'}.png`, fullPage: true });
        }
      }
      await c.close();
    }
  }

  check(errors.length === 0, `no console errors ${errors.slice(0, 3).join(' | ')}`);
  await browser.close();
  console.log(fails.length ? `\n${fails.length} FAILED` : '\nALL PASSED');
  process.exit(fails.length ? 1 : 0);
})();
