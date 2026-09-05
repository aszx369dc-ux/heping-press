// ================= 全域狀態與變數 =================
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
  
  // 優先使用 pattern，支援三位數補零 (如 page-001.png)
  if (book.imagePattern) {
    const padPage = String(page).padStart(3, "0");
    let url = book.imagePattern.replace("{page}", padPage);
    return url;
  }
  
  const padPage = String(page).padStart(3, "0");
  return `assets/books/${bookId}/page-${padPage}.png`;
}

function exitFocusMode() {
  document.body.classList.remove("focus");
}

// ================= 渲染目錄 =================
function buildCatalog() {
  const catalogNav = document.getElementById("catalog");
  if (!catalogNav) return;
  catalogNav.innerHTML = "";

  const activeStories = getActiveStories();
  activeStories.forEach((story, idx) => {
    const item = document.createElement("div");
    item.className = `catalog-item ${idx === currentStoryIndex ? "active" : ""}`;
    item.innerHTML = `
      <div class="cat-num">${story.number || ""}</div>
      <div class="cat-info">
        <div class="cat-title">${story.title}</div>
        <div class="cat-meta">${story.author} · 第 ${story.startPage} 頁</div>
      </div>
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

// ================= 更新 ABOUT THIS BOOK 區塊 =================
function updateAboutSection(book) {
  const aboutTitle = document.getElementById("aboutBookTitle") || document.querySelector(".book-about h2");
  const aboutDesc = document.getElementById("aboutBookDesc") || document.querySelector(".book-about p:not(.eyebrow)");
  const coverImg = document.getElementById("bookCoverImage");
  const coverFallback = document.getElementById("bookCoverFallback") || document.querySelector(".book-cover-text");
  const statsDiv = document.getElementById("bookStats");

  if (aboutTitle) {
    if (book.id === "relationship") {
      aboutTitle.textContent = "一本由孩子共同打造的和平人際世界";
    } else {
      aboutTitle.textContent = book.introTitle || `一本由孩子共同打造的${book.title}`;
    }
  }

  if (aboutDesc) {
    const totalStories = (book.stories && book.stories.length) ? book.stories.length : 0;
    aboutDesc.textContent = book.description || `這裡收錄《${book.title}》全 ${totalStories} 篇故事。家長可以依照章節閱讀，也可以直接從第一篇開始，一頁一頁翻到最後。`;
  }

  if (coverImg) {
    if (book.cover) {
      coverImg.src = book.cover;
      coverImg.hidden = false;
      coverImg.style.display = "block";
      if (coverFallback) coverFallback.style.display = "none";
    } else {
      coverImg.hidden = true;
      coverImg.style.display = "none";
      if (coverFallback) {
        coverFallback.style.display = "block";
        const h2 = coverFallback.querySelector("h2");
        if (h2) h2.textContent = book.title;
      }
    }
  }

  if (statsDiv && book.stories) {
    const featuredCount = book.stories.filter(s => s.featured).length;
    statsDiv.innerHTML = `
      <span class="stat-tag">全書 ${book.stories.length} 篇</span>
      <span class="stat-tag">共 ${book.totalPages || 0} 頁</span>
      ${featuredCount > 0 ? `<span class="stat-tag">紙本精選 ${featuredCount} 篇</span>` : ""}
    `;
  }
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
  const storyStartPage = story && typeof story.startPage === "number" ? story.startPage : 1;
  const storyEndPage = getStoryEndPage(currentBookId, currentStoryIndex) || book.totalPages || storyStartPage;

  // 側邊欄標題
  const sideTitle = document.getElementById("sidebarBookTitle") || document.querySelector(".side-head h2");
  if (sideTitle) sideTitle.textContent = book.title;

  document.querySelectorAll('.filter[data-filter="featured"]').forEach(btn => {
    btn.hidden = !showFeatured;
  });

  if (story) {
    document.getElementById("chapterLabel").textContent = `${story.chapter}｜第 ${story.number} 篇`;
    document.getElementById("storyTitle").textContent = story.title;
    document.getElementById("storyMeta").textContent = showFeatured
      ? `作者｜${story.author}${story.featured ? "｜紙本精選 ⭐" : "｜電子版"}`
      : `作者｜${story.author}`;
  }

  const pageImg = document.getElementById("pageImg");
  const img = isCoverPage
    ? book.cover
    : isBackCoverPage
      ? book.backCover
      : getPageImage(currentBookId, currentPage);

  if (pageImg && img) {
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
        : `${story ? story.title : ""} 第 ${currentPage} 頁`;
  } else if (pageImg) {
    pageImg.onerror = null;
    pageImg.removeAttribute("src");
  }

  document.getElementById("pageCaption").textContent = isCoverPage
    ? "封面"
    : isBackCoverPage
      ? "封底"
      : `${story ? story.title : ""}｜第 ${currentPage} 頁 / 共 ${book.totalPages} 頁`;

  document.getElementById("progress").textContent = isCoverPage
    ? "封面"
    : isBackCoverPage
      ? "封底"
      : `第 ${currentPage} 頁 / 共 ${book.totalPages} 頁`;

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
      document.getElementById("nextStoryHint").textContent = `下一篇：${next.number} ${next.title}｜${next.author}`;
      endCard.classList.remove("hidden");
    } else {
      endCard.classList.add("hidden");
    }
  }

  buildCatalog();
}

// ================= 切換書籍 =================
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

  updateAboutSection(book);
  render();
}

// ================= 翻頁操作 =================
function nextPage() {
  const book = getCurrentBook();
  if (!getActiveStories().length || !book) {
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
  if (!getActiveStories().length || !book) {
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

// ================= 事件綁定 =================
function bindButtonBook(btnId, bookId) {
  const btn = document.getElementById(btnId);
  if (btn) {
    btn.addEventListener("click", () => {
      setBook(bookId);
      const target = document.getElementById("library") || document.getElementById("readerApp");
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  }
}

bindButtonBook("startReading", "strange");
bindButtonBook("openDictionary", "fengxiang");
bindButtonBook("openSelfLearning", "selfLearning");
bindButtonBook("openTeacherManual", "teacherManual");
bindButtonBook("openFamily", "family");
bindButtonBook("openRelationship", "relationship");

const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const focusBtn = document.getElementById("focusBtn");

if (menuBtn && sidebar) menuBtn.addEventListener("click", () => sidebar.classList.add("open"));
if (closeMenu && sidebar) closeMenu.addEventListener("click", () => sidebar.classList.remove("open"));
if (focusBtn) focusBtn.addEventListener("click", () => document.body.classList.toggle("focus"));
if (exitFocusBtn) exitFocusBtn.addEventListener("click", exitFocusMode);

const nextTurn = document.getElementById("nextTurn");
const nextPageBtn = document.getElementById("nextPage");
const prevTurn = document.getElementById("prevTurn");
const prevPageBtn = document.getElementById("prevPage");
const nextStoryBtn = document.getElementById("nextStory");
const prevStoryBtn = document.getElementById("prevStory");
const goNextStoryBtn = document.getElementById("goNextStory");

if (nextTurn) nextTurn.addEventListener("click", nextPage);
if (nextPageBtn) nextPageBtn.addEventListener("click", nextPage);
if (prevTurn) prevTurn.addEventListener("click", prevPage);
if (prevPageBtn) prevPageBtn.addEventListener("click", prevPage);
if (nextStoryBtn) nextStoryBtn.addEventListener("click", () => goStory(1));
if (prevStoryBtn) prevStoryBtn.addEventListener("click", () => goStory(-1));
if (goNextStoryBtn) goNextStoryBtn.addEventListener("click", () => goStory(1));

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
  if (e.key === "Escape") exitFocusMode();
});

// 觸控翻頁支援
let touchStartX = 0;
const pageImgEl = document.getElementById("pageImg");
if (pageImgEl) {
  pageImgEl.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
  });
  pageImgEl.addEventListener("touchend", e => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (diff < -50) nextPage();
    if (diff > 50) prevPage();
  });
}

// 頁面初次載入啟動
document.addEventListener("DOMContentLoaded", () => {
  setBook(currentBookId);
});