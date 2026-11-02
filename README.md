# Which Cat Are You?｜你是哪一種貓咪？

12 道情境題、六維人格、16 種貓咪類型的雙語娛樂測驗。React + TypeScript + Vite，部署於 GitHub Pages，無後端、無帳號、不蒐集個資。

## 本機啟動

```bash
npm install
npm run dev       # 開發伺服器
npm test          # 單元測試
npm run build     # 型別檢查並建置到 dist/
npm run report    # 窮舉 4^12 種答案，列出各角色佔比
```

瀏覽器流程測試（需安裝 Playwright）：先 `npm run build && npx vite preview --port 4173`，再執行 `node e2e/flow.cjs http://localhost:4173/which-cat-are-you/ ./shots`。

## 部署

推到 `main` 後，`.github/workflows/deploy.yml` 會測試、建置，並把 `dist/` 發佈到 `gh-pages` 分支。Repository 的 Settings → Pages 需設為 Deploy from a branch：`gh-pages`、`/ (root)`。

若 repo 名稱改變，請同步修改 `vite.config.ts` 的 `base`，以及 `src/lib/shareCard.ts` 的 `SITE`。

## 結構

| 路徑 | 內容 |
|---|---|
| `src/data/` | 題庫與權重、16 種角色、配對文案（型別化 TS） |
| `src/lib/` | 計分、相容性、分享連結、分享圖、localStorage |
| `src/i18n.tsx` | 所有介面文字 |
| `art/` | 插畫原圖與 1200×1200 透明 PNG 母檔，清單見 `art/manifest.json` |
| `public/cats/` | 網頁用 WebP |
| `docs/` | 計分與相容性規則、測試報告 |

## 修改文案或插畫

- 新增中文字後執行 `npm run charset`，再用 `scripts/subset_font.py` 重建字型；單元測試會擋下缺字。
- 更換插畫：更新 `art/source/sheet.png` 後執行 `python3 scripts/cut_sheet.py`。
- 調整權重或向量：`data` 改動會影響舊分享連結的結果，請同時提高 `src/lib/link.ts` 的 `DATA_VERSION`。
