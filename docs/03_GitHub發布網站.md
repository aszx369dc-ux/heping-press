# 03 GitHub 發布網站

這份文件是教您如何把修改後的網站發布到 GitHub Pages。

## 最常用的四個指令

### 1. `git status`

用途：

- 看目前有哪些檔案被改過
- 看哪些檔案還沒加入 commit

```bash
git status
```

### 2. `git add`

用途：

- 把這次真的要發布的檔案加入更新

建議優先使用：

```bash
git add data.js
git add index.html
git add script.js
git add tools/convert-book.js
git add assets/books/指定書籍資料夾/
```

只有在非常確定沒有舊檔、PDF、ZIP、測試檔混進去時，才考慮一次加入全部檔案。

### 3. `git commit`

用途：

- 幫這次修改寫一個簡短標題

例如：

```bash
git commit -m "更新楓香辭典頁面與故事資料"
```

### 4. `git push`

用途：

- 把本機修改上傳到 GitHub

```bash
git push
```

## 標準發布流程

```bash
git status
git add data.js
git add assets/books/指定書籍資料夾/
git commit -m "寫這次修改內容"
git push
```

如果這次還有改首頁或工具，再補：

```bash
git add index.html
git add script.js
git add tools/convert-book.js
```

## GitHub Pages 是什麼

GitHub Pages 是 GitHub 提供的網站空間。

這個專案在 push 後，GitHub 會自動重新部署網站。

網站網址通常是：

`https://aszx369dc-ux.github.io/heping-press/`

## 如何確認部署成功

### 方法 1：直接打開網站

打開正式網站，看內容有沒有更新。

### 方法 2：看 GitHub Actions

到 GitHub 專案頁面：

1. 點 `Actions`
2. 找最新一次流程
3. 如果顯示綠色勾勾，通常代表部署成功

### 方法 3：看 Pages 設定

到 GitHub：

1. `Settings`
2. `Pages`
3. 確認公開網址與部署狀態

## 如果網站沒更新怎麼辦

請照下面順序檢查：

### 第 1 步：確認有沒有真的 push

```bash
git status
```

如果還有未提交內容，表示尚未完整發布。

### 第 2 步：確認瀏覽器快取

有時候網站其實更新了，但瀏覽器還在看舊版。

請做 Hard Refresh：

- Windows：`Ctrl + F5`
- Mac：`Cmd + Shift + R`

### 第 3 步：看 GitHub Actions

如果 Actions 卡住或失敗：

1. 打開 `Actions`
2. 點進最新一次流程
3. 看哪一步失敗

### 第 4 步：重新確認加入了哪些檔案

有時不是網站沒更新，而是根本沒把正確檔案加入 commit。

請重新看：

- `git status`
- `git diff`

## GitHub Actions 卡住如何處理

可以先做以下事情：

1. 等 3 到 10 分鐘
2. 重新整理 GitHub 頁面
3. 看失敗訊息
4. 如果是暫時性錯誤，可重新執行流程

若不知道怎麼判斷，請把畫面截圖或錯誤文字貼給 AI 協助判讀。

## 發布前建議檢查

發布前至少看一次：

- `git status`
- `git diff`
- `index.html` 是否能正常開啟
- 新增圖片是否存在
- `data.js` 是否有打錯逗號或引號

## 不建議的做法

- 不要一次改太多事情再一起 push
- 不要沒測試就直接發布
- 不要看不懂 `git diff` 就直接上傳
- 不要習慣一次加入全部檔案

## 最後提醒

最安全的方式是：

1. 先本機測試
2. 再看 `git diff`
3. 再 commit
4. 再 push
5. 再看正式網站
