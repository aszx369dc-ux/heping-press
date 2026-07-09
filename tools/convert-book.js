#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const BOOKS = {
  strange: {
    pdf: "pdf/strange.pdf",
    output: "assets/books/strange"
  },
  fengxiang: {
    pdf: "pdf/fengxiang.pdf",
    output: "assets/books/fengxiang"
  },
  "self-learning": {
    pdf: "pdf/self-learning.pdf",
    output: "assets/books/self-learning"
  }
};

const book = process.argv[2];

if (!BOOKS[book]) {
  console.log(`
使用方式：

node tools/convert-book.js strange
node tools/convert-book.js fengxiang
node tools/convert-book.js self-learning
`);
  process.exit(1);
}

const config = BOOKS[book];

fs.mkdirSync(config.output, { recursive: true });

// 刪除舊頁面（保留 cover/back-cover）
fs.readdirSync(config.output)
  .filter(f => /^page-\d+\.png$/.test(f))
  .forEach(f => fs.unlinkSync(path.join(config.output, f)));

console.log("📄 開始轉換 PDF...");

execSync(
  `pdftoppm -png "${config.pdf}" "${config.output}/page"`,
  { stdio: "inherit" }
);

// 重新命名 page-1.png -> page-001.png
fs.readdirSync(config.output)
  .filter(f => /^page-\d+\.png$/.test(f))
  .sort((a, b) => {
    const na = parseInt(a.match(/\d+/)[0]);
    const nb = parseInt(b.match(/\d+/)[0]);
    return na - nb;
  })
  .forEach(file => {
    const num = parseInt(file.match(/\d+/)[0]);
    const newName = `page-${String(num).padStart(3, "0")}.png`;

    if (file !== newName) {
      fs.renameSync(
        path.join(config.output, file),
        path.join(config.output, newName)
      );
    }
  });

const total = fs.readdirSync(config.output)
  .filter(f => /^page-\d+\.png$/.test(f)).length;

console.log("");
console.log("✅ 完成！");
console.log(`📚 ${book}`);
console.log(`📄 共 ${total} 頁`);