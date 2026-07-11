# 和平故事集網站交接說明

這份 README 是給下一位接手網站的老師看的。

如果您完全沒有程式背景，也沒關係。這個專案的日常維護，大多是：

1. 更新故事圖片
2. 確認 `data.js`
3. 本機測試
4. 上傳到 GitHub

## 專案介紹

這是一個把孩子作品做成線上閱讀網站的專案。

目前網站收錄三本書：

- 《奇聞異事》
- 《楓香辭典》
- 《自主學習》

讀者可以在首頁選書，再進入閱讀器翻頁、查目錄、搜尋故事。

## 網站用途

適合用在：

- 校內成果展示
- 家長閱讀
- 課程成果保存
- 班級或學校網站分享

## GitHub Repository

- Repository：`https://github.com/aszx369dc-ux/heping-press`

## GitHub Pages 網址

- 正式網站：`https://aszx369dc-ux.github.io/heping-press/`

如果未來網址改掉，請到 GitHub 的 `Settings` → `Pages` 再確認一次。

## 專案資料夾介紹

- `index.html`
  網站主畫面與閱讀器版面結構。

- `style.css`
  網站外觀、字體、排版、按鈕樣式。

- `script.js`
  網站功能主程式，例如翻頁、目錄、選書、搜尋、封面封底。

- `data.js`
  三本書的資料總表，包含書名、頁數、圖片路徑、故事目錄、作者與精選設定。

- `assets/`
  網站會用到的圖片檔。

- `assets/books/`
  每一本書的頁面 PNG、封面、封底。

- `tools/`
  協助轉檔的小工具，目前最重要的是 `convert-book.js`。

- `pdf/`
  放 Illustrator 或 Canva 匯出的 PDF 原始檔。

- `docs/`
  給接手老師看的教學文件。

## 故事集更新簡單流程圖

Illustrator / Canva

↓

匯出 PDF

↓

放進 `pdf/`

↓

執行 `convert-book.js`

↓

產生 `page-001.png` 等圖片

↓

放進 `assets/books/書籍資料夾/`

↓

確認 `data.js`

↓

本機測試

↓

Git Commit / Push

↓

GitHub Pages 上線

## 如何更新故事集

如果只是更新已經存在的一本書，通常照下面順序做：

1. 準備好新的 PDF
2. 放進 `pdf/`
3. 執行 `node tools/convert-book.js 書籍代號`
4. 確認圖片有出現在 `assets/books/書籍資料夾/`
5. 如果有封面，放 `cover.png`
6. 如果有封底，放 `back-cover.png`
7. 打開 `data.js` 檢查頁數、路徑、故事起始頁
8. 打開 `index.html` 本機測試
9. 用 Git commit / push 發布

完整版本請看：

- [故事集更新 SOP](docs/02_故事集更新SOP.md)

## 如何發布網站

最簡單的理解方式是：

1. 確認要上傳哪些檔案
2. `git status`
3. `git add` 指定檔案
4. `git commit`
5. `git push`
6. 等 GitHub Pages 自動更新

完整版本請看：

- [GitHub 發布網站說明](docs/03_GitHub發布網站.md)

## 常見問題

### 1. 我改完了，網站怎麼沒有更新？

請先確認：

- 有沒有存檔
- 有沒有 `git add` 正確檔案
- 有沒有 `git commit`
- 有沒有 `git push`

如果都做了，請：

- 等 1 到 5 分鐘
- 重新整理網頁
- 做 Hard Refresh

### 2. 圖片出不來怎麼辦？

請檢查：

- 圖片是否放到正確資料夾
- 檔名是否打錯
- `data.js` 的 `imagePattern`、`cover`、`backCover` 路徑是否正確

### 3. 目錄頁碼不對怎麼辦？

通常是 `data.js` 裡某篇故事的 `startPage` 沒有對好。

如果 PDF 頁數有改過，請重新檢查全部故事的 `startPage`。

### 4. 我不懂程式，可以怎麼改？

先看：

- [AI 協作手冊](docs/04_AI協作手冊.md)
- [AI 提示詞範例](docs/06_AI提示詞範例.md)

### 5. 哪些檔案最重要？

最常會用到的是：

- `data.js`
- `assets/books/`
- `pdf/`
- `tools/convert-book.js`
- `docs/`

### 6. 如果真的不確定要不要改，怎麼辦？

先不要直接亂改正式網站。

建議順序：

1. 先備份
2. 先問 AI
3. 先看 `git diff`
4. 本機測試
5. 確認後再 push

## 建議閱讀順序

第一次接手建議依序看：

1. [開始之前](docs/01_開始之前.md)
2. [資料夾說明](docs/05_資料夾說明.md)
3. [故事集更新 SOP](docs/02_故事集更新SOP.md)
4. [GitHub 發布網站](docs/03_GitHub發布網站.md)
5. [AI 協作手冊](docs/04_AI協作手冊.md)
6. [AI 提示詞範例](docs/06_AI提示詞範例.md)
7. [緊急救援](docs/99_緊急救援.md)
