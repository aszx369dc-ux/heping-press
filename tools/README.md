# tools 資料夾說明

這裡放的是協助整理書本頁面的工具。

目前最重要的是：

- `convert-book.js`

## `convert-book.js` 是做什麼的

它的用途是把 PDF 轉成網站可以使用的 PNG 頁面圖片。

簡單說：

1. 先把 PDF 放進 `pdf/`
2. 執行 `convert-book.js`
3. 產生 `page-001.png`、`page-002.png` 這些圖片

## 需要先安裝什麼

### 1. Node.js

因為 `convert-book.js` 是用 Node.js 執行的。

#### Windows 安裝方式

1. 到 Node.js 官網下載 LTS 版本
2. 安裝時一路按下一步即可
3. 安裝完成後，重新開一個新的終端機

#### 驗證方式

```bash
node -v
npm -v
```

如果有顯示版本號，就代表安裝成功。

### 2. Poppler / `pdftoppm`

這支工具實際上會呼叫系統中的 `pdftoppm`。

#### Windows 安裝方式

1. 安裝 Poppler for Windows
2. 解壓縮到一個固定位置
3. 把 Poppler 的 `bin` 資料夾加入 Windows 的 Path
4. 重新開終端機

#### 驗證方式

```bash
pdftoppm -v
```

如果有顯示版本號，就代表安裝成功。

## PDF 要放哪裡

放在專案根目錄的：

- `pdf/strange.pdf`
- `pdf/fengxiang.pdf`
- `pdf/self-learning.pdf`

## PNG 會輸出到哪裡

會輸出到：

- `assets/books/strange/`
- `assets/books/fengxiang/`
- `assets/books/self-learning/`

## 如何執行

### 奇聞異事

```bash
node tools/convert-book.js strange
```

### 楓香辭典

```bash
node tools/convert-book.js fengxiang
```

### 自主學習

```bash
node tools/convert-book.js self-learning
```

## 如何新增新書到 BOOKS 設定

如果未來要新增一本新書，請在 `convert-book.js` 的 `BOOKS` 裡加一筆：

```js
"family-stories": {
  pdf: "pdf/family-stories.pdf",
  output: "assets/books/family-stories"
}
```

新增後就可以執行：

```bash
node tools/convert-book.js family-stories
```

## 成功輸出時應看到什麼

執行成功後，通常會看到：

- 開始轉換 PDF
- 完成
- 書籍代號
- 共幾頁

例如：

- `✅ 完成！`
- `📚 strange`
- `📄 共 254 頁`

## 如何確認 PNG 數量

最簡單的方式：

1. 打開對應的 `assets/books/書籍資料夾/`
2. 看是不是有連續的 `page-001.png`、`page-002.png`、`page-003.png`
3. 最後一張頁碼是否等於 `totalPages`

## 為什麼 `cover.png`、`back-cover.png` 不會被刪除

因為 `convert-book.js` 只會刪除：

- `page-xxx.png`

它不會刪除：

- `cover.png`
- `back-cover.png`

所以封面封底可以另外獨立保留。

## 常見錯誤與處理方式

### 1. `node` 找不到

可能原因：

- Node.js 沒安裝
- 安裝後沒重開終端機

請先檢查：

```bash
node -v
```

### 2. `pdftoppm` 找不到

可能原因：

- Poppler 沒安裝
- Path 沒設好

請先檢查：

```bash
pdftoppm -v
```

### 3. 執行了但沒有產生 PNG

可能原因：

- PDF 路徑不對
- PDF 檔名不對
- `BOOKS` 設定寫錯

### 4. 頁數不對

可能原因：

- PDF 本身頁數就不對
- 匯出的 PDF 包含不該算進內文的頁面

### 5. 圖片有了但網站沒顯示

可能原因：

- `data.js` 的 `imagePattern` 不對
- 資料夾名稱不一致
