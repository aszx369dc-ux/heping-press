#!/usr/bin/env node
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith('--')) continue;

    const key = token.slice(2);
    const value = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : true;
    if (value !== true) {
      i += 1;
    }
    args[key] = value;
  }
  return args;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function commandExists(command) {
  try {
    execFileSync('command', ['-v', command], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function run(command, args) {
  console.log(`$ ${command} ${args.join(' ')}`);
  execFileSync(command, args, { stdio: 'inherit' });
}

function convertWithQlmanage(inputPdf, outputDir) {
  const tempDir = path.join(outputDir, '.tmp-pages');
  ensureDir(tempDir);

  const pageCount = 999;
  for (let index = 0; index < pageCount; index += 1) {
    const outFile = path.join(tempDir, `page-${String(index + 1).padStart(3, '0')}.png`);
    const exists = fs.existsSync(outFile);
    if (exists) {
      fs.unlinkSync(outFile);
    }
  }

  const args = [
    '-c',
    `import "${inputPdf}" -page 1-999 -resize 2048x2048 -format png "${tempDir}/page-%03d.png"`,
  ];

  run('qlmanage', args);

  const generatedFiles = fs.readdirSync(tempDir)
    .filter((file) => file.endsWith('.png'))
    .sort((a, b) => a.localeCompare(b));

  generatedFiles.forEach((file, index) => {
    const sourcePath = path.join(tempDir, file);
    const destPath = path.join(outputDir, `page-${String(index + 1).padStart(3, '0')}.png`);
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Created ${path.relative(process.cwd(), destPath)}`);
  });
}

function convertWithSips(inputPdf, outputDir) {
  ensureDir(outputDir);
  const tempDir = path.join(outputDir, '.tmp-pages');
  ensureDir(tempDir);

  run('sips', ['-s', 'format', 'png', inputPdf, '--out', tempDir]);

  const generatedFiles = fs.readdirSync(tempDir)
    .filter((file) => file.endsWith('.png') || file.endsWith('.PNG'))
    .sort((a, b) => a.localeCompare(b));

  generatedFiles.forEach((file, index) => {
    const sourcePath = path.join(tempDir, file);
    const destPath = path.join(outputDir, `page-${String(index + 1).padStart(3, '0')}.png`);
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Created ${path.relative(process.cwd(), destPath)}`);
  });
}

function convertBook(options = {}) {
  const inputPdf = path.resolve(options.input || 'pdf/strange-stories.pdf');
  const bookId = options.book || 'strange';
  const outputDir = path.resolve(options.output || path.join('assets', 'books', bookId));

  if (!fs.existsSync(inputPdf)) {
    throw new Error(`PDF not found: ${inputPdf}`);
  }

  ensureDir(outputDir);

  if (commandExists('qlmanage')) {
    convertWithQlmanage(inputPdf, outputDir);
    return;
  }

  if (commandExists('sips')) {
    convertWithSips(inputPdf, outputDir);
    return;
  }

  throw new Error('No supported macOS tools found. Please ensure qlmanage or sips is available.');
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  try {
    convertBook(args);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

main();
