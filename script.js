// ================= 全域狀態與宣告 =================
let currentBookId = "strange";
let currentStoryIndex = 0;
let currentPage = 1;
let filter = "all";
const showFeatured = true;

const sidebar = document.getElementById("sidebar");
const searchInput = document.getElementById("searchInput");
const exitFocusBtn = document.getElementById("exitFocusBtn");

// ================= 輔助函式 =================
function getCurrentBook() {
  if (typeof books === "undefined" || !Array.isArray(books)) return null;
  return books.find(b => b.id === currentBookId) || books[0];
}

function getActiveStories() {
  const book = getCurrentBook();
  if (!book || !Array.isArray(book.stories)) return [];
  const keyword = (searchInput ? searchInput.value.trim().toLowerCase() : "");

  return book.stories.filter(story => {
    const matchFilter = filter === "all" || (filter === "featured" && story.featured);
    const matchKeyword = !keyword ||
      (story.title && story.title.toLowerCase().includes(keyword)) ||
      (story.author && story.author.toLowerCase().includes(keyword)) ||
      (story.chapter && story.chapter.toLowerCase().includes(keyword));
    return matchFilter && matchKeyword;
  });
}

function getCurrentStory() {
  const activeStories = getActiveStories();
  return activeStories[currentStoryIndex] || null;
}

function hasCover(book) {
  return Boolean(book && book.cover);
}

function hasBackCover(book) {
  return Boolean(book && book.backCover);
}

function getMinReadablePage(book) {
  return hasCover(book) ? 0 : 1;
}

function getMaxReadablePage(book) {
  const total = (book && book.totalPages) ? book.totalPages : 1;
  return hasBackCover(book) ? total + 1 : total;
}

function getStoryEndPage(bookId, storyIdx) {
  const book = getCurrentBook();
  if (!book || !book.stories) return 0;
  const current = book.stories[storyIdx];
  const next = book.stories[storyIdx + 1];
  if (next && typeof next.startPage === "number") {
    return next.startPage - 1;
  }
  return book.totalPages || (current ? current.startPage : 1);
}

function syncStoryIndexByPage(page) {
  const book = getCurrentBook();
  if (!book || !Array.isArray(book.stories)) return;
  for (let i = book.stories.length - 1; i >= 0; i--) {
    if (page >= book.stories[i].startPage) {
      currentStoryIndex = i;
      break;
    }
  }
}

function getPageImage(bookId, page) {
  const book = getCurrentBook();
  if (!book) return "";
  if (book.imagePattern) {
    const padPage = String(page).padStart(3, "0");
    return book.imagePattern.replace("{page}", padPage);
  }
  const padPage = String(page).padStart(3, "0");
  return `assets/books/${bookId}/page-${padPage}.png`;
}

function exitFocusMode() {
  document.body.classList.remove("focus");
}

function buildCatalog() {
  const catalogNav = document.getElementById("catalog");
  if (!catalogNav) return;
  catalogNav.innerHTML = "";

  const activeStories = getActiveStories();
  activeStories.forEach((story, idx) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = `toc-btn ${idx === currentStoryIndex ? "active" : ""}`;
    item.setAttribute("data-page", String(Math.max(story.startPage, 1)));
    item.innerHTML = `
      ${story.number ? `${story.number} ` : ""}${story.title || story.chapter}
      <small>第 ${story.startPage} 頁</small>
    `;
    item.addEventListener("click", () => {
      currentStoryIndex = idx;
      currentPage = typeof story.startPage === "number" ? story.startPage : 1;
      render();
      if (sidebar) sidebar.classList.remove("open");
    });
    catalogNav.appendChild(item);
  });
}

function setBook(bookId) {
  currentBookId = bookId;
  const book = getCurrentBook();
  if (!book) return;

  currentStoryIndex = 0;
  currentPage = hasCover(book) ? 0 : 1;
  filter = "all";
  if (searchInput) searchInput.value = "";

  document.querySelectorAll(".filter").forEach(b => {
    b.classList.toggle("active", b.dataset.filter === "all");
  });

  render();
}

// ================= 核心渲染邏輯 =================
function render() {
  const book = getCurrentBook();
  if (!book) return;

  const activeStories = getActiveStories();
  const isCoverPage = hasCover(book) && currentPage === 0;
  const isBackCoverPage = hasBackCover(book) && currentPage === (book.totalPages || 0) + 1;

  if (!isCoverPage && !isBackCoverPage) {
    syncStoryIndexByPage(currentPage);
  }

  const story = getCurrentStory();
  if (!story) {
    return;
  }
  const storyStartPage = typeof story.startPage === "number" ? story.startPage : 1;
  const storyEndPage = getStoryEndPage(currentBookId, currentStoryIndex) || book.totalPages || storyStartPage;

  const sideH2 = document.querySelector(".side-head h2");
  if (sideH2) sideH2.textContent = book.title;

  document.querySelectorAll('.filter[data-filter="featured"]').forEach(btn => {
    btn.hidden = !showFeatured;
  });

  const chapterLabel = document.getElementById("chapterLabel");
  if (chapterLabel) chapterLabel.textContent = `${story.chapter}｜第 ${story.number} 篇`;

  const storyTitle = document.getElementById("storyTitle");
  if (storyTitle) storyTitle.textContent = story.title;

  const storyMeta = document.getElementById("storyMeta");
  if (storyMeta) {
    storyMeta.textContent = showFeatured
      ? `作者｜${story.author}${story.featured ? "｜紙本精選 ⭐" : "｜電子版"}`
      : `作者｜${story.author}`;
  }

  const pageImg = document.getElementById("pageImg");
  const img = isCoverPage
    ? book.cover
    : isBackCoverPage
      ? book.backCover
      : getPageImage(currentBookId, currentPage);

  if (pageImg) {
    if (img) {
      pageImg.onerror = () => {
        pageImg.onerror = null;
        if (isCoverPage) {
          currentPage = 1;
          syncStoryIndexByPage(currentPage);
          render();
          return;
        }
        if (isBackCoverPage) {
          currentPage = book.totalPages || storyEndPage;
          syncStoryIndexByPage(currentPage);
          render();
          return;
        }
        pageImg.removeAttribute("src");
      };
      pageImg.src = img;
      pageImg.alt = isCoverPage
        ? `${book.title} 封面`
        : isBackCoverPage
          ? `${book.title} 封底`
          : `${story.title} 第 ${currentPage} 頁`;
    } else {
      pageImg.onerror = null;
      pageImg.removeAttribute("src");
    }
  }

  const pageCaption = document.getElementById("pageCaption");
  if (pageCaption) {
    pageCaption.textContent = isCoverPage
      ? "封面"
      : isBackCoverPage
        ? "封底"
        : `${story.title}｜第 ${currentPage} 頁 / 共 ${book.totalPages} 頁`;
  }

  const progress = document.getElementById("progress");
  if (progress) {
    progress.textContent = isCoverPage
      ? "封面"
      : isBackCoverPage
        ? "封底"
        : `第 ${currentPage} 頁 / 共 ${book.totalPages} 頁`;
  }

  const atFirst = currentStoryIndex === 0 && currentPage === getMinReadablePage(book);
  const atLast = currentStoryIndex === activeStories.length - 1 && currentPage === getMaxReadablePage(book);
  ["prevTurn", "prevPage"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = atFirst;
  });
  ["nextTurn", "nextPage"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = atLast;
  });

  const prevStoryBtn = document.getElementById("prevStory");
  const nextStoryBtn = document.getElementById("nextStory");
  if (prevStoryBtn) prevStoryBtn.disabled = currentStoryIndex === 0;
  if (nextStoryBtn) nextStoryBtn.disabled = currentStoryIndex === activeStories.length - 1;

  const endCard = document.getElementById("endCard");
  if (endCard) {
    if (currentPage === storyEndPage && currentStoryIndex < activeStories.length - 1) {
      const next = activeStories[currentStoryIndex + 1];
      const hint = document.getElementById("nextStoryHint");
      if (hint) hint.textContent = `下一篇：${next.number} ${next.title}｜${next.author}`;
      endCard.classList.remove("hidden");
    } else {
      endCard.classList.add("hidden");
    }
  }

  buildCatalog();
}

function nextPage() {
  const book = getCurrentBook();
  if (!book || !getActiveStories().length) {
    render();
    return;
  }

  syncStoryIndexByPage(currentPage);

  if (hasCover(book) && currentPage === 0) {
    currentPage = 1;
    syncStoryIndexByPage(currentPage);
  } else if (currentPage < (book.totalPages || 0)) {
    currentPage++;
    syncStoryIndexByPage(currentPage);
  } else if (currentPage === (book.totalPages || 0) && hasBackCover(book)) {
    currentPage = (book.totalPages || 0) + 1;
  }
  render();
}

function prevPage() {
  const book = getCurrentBook();
  if (!book || !getActiveStories().length) {
    render();
    return;
  }

  if (hasBackCover(book) && currentPage === (book.totalPages || 0) + 1) {
    currentPage = book.totalPages || 1;
    syncStoryIndexByPage(currentPage);
  } else if (currentPage > 1) {
    currentPage--;
    syncStoryIndexByPage(currentPage);
  } else if (hasCover(book)) {
    currentPage = 0;
  }
  render();
}

function goStory(delta) {
  const activeStories = getActiveStories();
  const nextIndex = currentStoryIndex + delta;
  if (nextIndex >= 0 && nextIndex < activeStories.length) {
    currentStoryIndex = nextIndex;
    const story = getCurrentStory();
    currentPage = story && typeof story.startPage === "number" ? story.startPage : 1;
    render();
  }
}

// ================= 事件監聽與初始化 =================
const startReadingBtn = document.getElementById("startReading");
if (startReadingBtn) {
  startReadingBtn.addEventListener("click", () => {
    const reader = document.getElementById("readerApp");
    if (reader) reader.scrollIntoView({ behavior: "smooth" });
    setBook("strange");
  });
}

const openDictBtn = document.getElementById("openDictionary");
if (openDictBtn) {
  openDictBtn.addEventListener("click", () => {
    const reader = document.getElementById("readerApp");
    if (reader) reader.scrollIntoView({ behavior: "smooth" });
    setBook("fengxiang");
  });
}

const openSelfBtn = document.getElementById("openSelfLearning");
if (openSelfBtn) {
  openSelfBtn.addEventListener("click", () => {
    const reader = document.getElementById("readerApp");
    if (reader) reader.scrollIntoView({ behavior: "smooth" });
    setBook("selfLearning");
  });
}

const openTeacherBtn = document.getElementById("openTeacherManual");
if (openTeacherBtn) {
  openTeacherBtn.addEventListener("click", () => {
    const reader = document.getElementById("readerApp");
    if (reader) reader.scrollIntoView({ behavior: "smooth" });
    setBook("teacherManual");
  });
}

const openFamilyBtn = document.getElementById("openFamily");
if (openFamilyBtn) {
  openFamilyBtn.addEventListener("click", () => {
    const reader = document.getElementById("readerApp");
    if (reader) reader.scrollIntoView({ behavior: "smooth" });
    setBook("family");
  });
}

const relBtn = document.getElementById("openRelationship");
if (relBtn) {
  relBtn.addEventListener("click", () => {
    const reader = document.getElementById("readerApp");
    if (reader) reader.scrollIntoView({ behavior: "smooth" });
    setBook("relationship");
  });
}

const menuBtn = document.getElementById("menuBtn");
if (menuBtn && sidebar) menuBtn.addEventListener("click", () => sidebar.classList.add("open"));

const closeMenuBtn = document.getElementById("closeMenu");
if (closeMenuBtn && sidebar) closeMenuBtn.addEventListener("click", () => sidebar.classList.remove("open"));

const focusBtn = document.getElementById("focusBtn");
if (focusBtn) focusBtn.addEventListener("click", () => document.body.classList.toggle("focus"));

if (exitFocusBtn) exitFocusBtn.addEventListener("click", exitFocusMode);

const nextTurn = document.getElementById("nextTurn");
const nextPageEl = document.getElementById("nextPage");
const prevTurn = document.getElementById("prevTurn");
const prevPageEl = document.getElementById("prevPage");
const nextStory = document.getElementById("nextStory");
const prevStory = document.getElementById("prevStory");
const goNextStory = document.getElementById("goNextStory");

if (nextTurn) nextTurn.addEventListener("click", nextPage);
if (nextPageEl) nextPageEl.addEventListener("click", nextPage);
if (prevTurn) prevTurn.addEventListener("click", prevPage);
if (prevPageEl) prevPageEl.addEventListener("click", prevPage);
if (nextStory) nextStory.addEventListener("click", () => goStory(1));
if (prevStory) prevStory.addEventListener("click", () => goStory(-1));
if (goNextStory) goNextStory.addEventListener("click", () => goStory(1));

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.filter;
    buildCatalog();
  });
});

if (searchInput) searchInput.addEventListener("input", buildCatalog);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextPage();
  if (e.key === "ArrowLeft") prevPage();
  if (e.key === "Escape") {
    exitFocusMode();
  }
});

let touchStartX = 0;
const pageImgElement = document.getElementById("pageImg");
if (pageImgElement) {
  pageImgElement.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
  });
  pageImgElement.addEventListener("touchend", e => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (diff < -50) nextPage();
    if (diff > 50) prevPage();
  });
}

// 頁面初始化
document.addEventListener("DOMContentLoaded", () => {
  render();
});