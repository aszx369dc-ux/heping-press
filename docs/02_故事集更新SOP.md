# 02 故事集更新 SOP

這份文件分成兩種情況：

- A. 更新已經存在的故事集
- B. 新增一本全新的故事集

請先分清楚自己要做的是哪一種。

## 先記住的共同原則

### 1. PDF 內文不要包含封面、封底、目錄、版權頁

網站的封面與封底是另外放圖片，不算在內文頁碼裡。

### 2. `cover.png` / `back-cover.png` 不算入 `totalPages`

`totalPages` 只算內文最後一頁。

### 3. `startPage` 從內文 P.1 開始

不要把封面或封底算進故事頁碼。

### 4. 如果 PDF 頁數改變，必須重新檢查全部 `startPage`

只要前面頁數有增減，後面故事的起始頁通常都會一起改掉。

### 5. 不要習慣一次加入全部檔案

請優先使用指定檔案的方式，例如：

```bash
git add data.js
git add tools/convert-book.js
git add assets/books/strange/
```

只有在非常確定沒有舊檔、PDF、ZIP、測試檔混進去時，才考慮一次加入全部檔案。

## A. 更新已經存在的故事集

這種情況是指：

- 原本網站上已經有這本書
- 只是更新頁面、封面、封底或故事資料

### 流程

1. 從 Illustrator 或 Canva 匯出新的 PDF
2. 把 PDF 放進 `pdf/`
3. 確認 `tools/convert-book.js` 對應的書籍設定存在
4. 執行對應指令，例如：

```bash
node tools/convert-book.js strange
```

或：

```bash
node tools/convert-book.js fengxiang
```

或：

```bash
node tools/convert-book.js self-learning
```

5. 確認 PNG 已輸出到正確資料夾
6. 如果有封面，更新 `cover.png`
7. 如果有封底，更新 `back-cover.png`
8. 打開 `data.js` 檢查：
   - `totalPages`
   - `imagePattern`
   - `cover`
   - `backCover`
   - 每篇故事 `startPage`
   - `featured`
9. 本機打開 `index.html` 測試
10. 看 `git diff`
11. 指定檔案 `git add`
12. `git commit`
13. `git push`
14. 到 GitHub Pages 驗收

## B. 新增一本全新的故事集

這種情況是指：

- 網站原本沒有這本書
- 需要從 0 開始加進網站

### 完整流程

#### 1. 決定英文資料夾名稱

例如：

- `family-stories`

這會用在：

- `assets/books/family-stories/`
- `pdf/family-stories.pdf`

#### 2. 決定 JavaScript `id`

例如：

- `familyStories`

這會用在 `data.js` 和 `script.js` 的選書入口。

#### 3. 將 PDF 放進 `pdf/`

例如：

- `pdf/family-stories.pdf`

#### 4. 在 `tools/convert-book.js` 新增該書設定

要補一筆類似：

```js
"family-stories": {
  pdf: "pdf/family-stories.pdf",
  output: "assets/books/family-stories"
}
```

#### 5. 建立 `assets/books/新書資料夾/`

例如：

- `assets/books/family-stories/`

#### 6. 執行轉檔

```bash
node tools/convert-book.js family-stories
```

#### 7. 確認總頁數

請確認：

- 內文總共幾頁
- 最後一頁是否正確
- `totalPages` 是否只算內文

#### 8. 準備 `cover.png` 與 `back-cover.png`

如果這本書有封面與封底，請放進：

- `assets/books/family-stories/cover.png`
- `assets/books/family-stories/back-cover.png`

#### 9. 更新 `data.js` 的完整 book 物件

需要補上：

- `id`
- `title`
- `subtitle`
- `description`
- `totalPages`
- `cover`
- `backCover`
- `imagePattern`
- `stories`

#### 10. 新增首頁卡片

通常要在 `index.html` 增加新的書籍卡片。

#### 11. 新增 `setBook("familyStories")` 入口

通常要在 `script.js` 補上點擊事件，讓首頁卡片可以進入閱讀器。

#### 12. 本機測試

請至少檢查：

- 首頁是否看得到新書
- 點進去是否正常
- 目錄是否可跳頁
- 封面與封底是否正常
- `上一頁 / 下一頁`
- `上一篇 / 下一篇`
- 搜尋與精選是否正常

#### 13. Commit / Push

建議先看：

```bash
git status
git diff
```

然後指定加入：

```bash
git add data.js
git add index.html
git add script.js
git add tools/convert-book.js
git add assets/books/family-stories/
```

最後再：

```bash
git commit -m "新增 family stories 故事集"
git push
```

#### 14. GitHub Pages 驗收

請到正式網站確認：

- 首頁卡片
- 閱讀器
- 圖片
- 目錄
- 頁碼
- 封面封底

## 最後提醒

### 最容易出錯的地方

- `startPage`
- `totalPages`
- `cover` / `backCover` 路徑
- `imagePattern`
- 新書 `id`
- 首頁卡片入口

### 最安全的習慣

1. 一次只更新一本書
2. 改完先本機測試
3. 一定先看 `git diff`
4. 優先用指定檔案 `git add`
