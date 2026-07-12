let currentBookId = "strange";
let currentStoryIndex = 0;
let currentPage = 1;
let filter = "all";

const catalog = document.getElementById("catalog");
const sidebar = document.getElementById("sidebar");
const searchInput = document.getElementById("searchInput");
const exitFocusBtn = document.getElementById("exitFocusBtn");

function isSelfLearningBook() {
  return currentBookId === "selfLearning";
}

function shouldShowFeatured() {
  return getActiveStories().some(story => story.featured === true);
}

function getActiveStories() {
  const book = getBook(currentBookId);
  return book ? book.stories : [];
}

function getCurrentBook() {
  return getBook(currentBookId) || { title: "奇聞異事", subtitle: "", description: "", year: "", group: "", totalPages: 1 };
}

function getCurrentStory() {
  const activeStories = getActiveStories();
  return activeStories[currentStoryIndex] || activeStories[0] || null;
}

function syncStoryIndexByPage(page) {
  const activeStories = getActiveStories();
  if (!activeStories.length || page < 1) {
    return;
  }

  let nextIndex = 0;
  for (let i = 0; i < activeStories.length; i++) {
    const startPage = activeStories[i].startPage || 1;
    if (startPage <= page) {
      nextIndex = i;
    } else {
      break;
    }
  }

  currentStoryIndex = nextIndex;
}

function supportsCoverPages(book) {
  return Boolean(
    book &&
    ["strange", "fengxiang", "selfLearning", "teacherManual"].includes(book.id)
  );
}

function hasCover(book) {
  return supportsCoverPages(book) && Boolean(book.cover);
}

function hasBackCover(book) {
  return supportsCoverPages(book) && Boolean(book.backCover);
}

function getMinReadablePage(book) {
  return hasCover(book) ? 0 : 1;
}

function getMaxReadablePage(book) {
  return hasBackCover(book) ? (book.totalPages || 0) + 1 : (book.totalPages || 0);
}

function exitFocusMode() {
  sidebar.classList.remove("open");
  document.body.classList.remove("focus");
}

function updateIntroCover(bookMeta) {
  const coverCard = document.querySelector(".book-cover");
  const coverImage = document.getElementById("bookCoverImage");

  if (!coverCard || !coverImage) {
    return;
  }

  if (bookMeta.cover) {
    coverImage.onerror = () => {
      coverImage.onerror = null;
      coverImage.hidden = true;
      coverImage.removeAttribute("src");
      coverImage.alt = "";
      coverCard.classList.remove("has-image");
    };
    coverImage.onload = () => {
      coverCard.classList.add("has-image");
      coverImage.hidden = false;
    };
    coverImage.src = bookMeta.cover;
    coverImage.alt = `${bookMeta.title} 封面`;
    return;
  }

  coverImage.onerror = null;
  coverImage.onload = null;
  coverImage.hidden = true;
  coverImage.removeAttribute("src");
  coverImage.alt = "";
  coverCard.classList.remove("has-image");
}

function bookStats() {
  const activeStories = getActiveStories();
  const bookMeta = getCurrentBook();
  const showFeatured = shouldShowFeatured();
  const introTitle = document.querySelector(".book-cover h2");
  const introDesc = document.querySelector(".book-about h2");
  const introText = document.querySelector(".book-about p:nth-of-type(2)");
  const heading = bookMeta.aboutHeading || (currentBookId === "fengxiang"
    ? "一本由艾利恩記錄下來的和平實小校園日常"
    : currentBookId === "teacherManual"
      ? "一本關於師生相遇與彼此理解的故事"
      : isSelfLearningBook()
        ? "一本關於自主探索與成長的故事"
        : "一本由孩子共同打造的和平怪奇宇宙");
  const body = bookMeta.aboutBody || (currentBookId === "fengxiang"
    ? "這裡收錄《楓香辭典》整本內容，點擊後即可在閱讀器中連續翻閱。"
    : currentBookId === "teacherManual"
      ? "收錄《老師使用說明書》36 篇故事，從低年級依賴老師的日常，到師生磨合、教學風格與友誼建立，呈現和平實小師生互動的多元樣貌。"
      : isSelfLearningBook()
        ? "收錄《自主學習》36 篇故事，透過角色的成長歷程，帶領讀者看見和平實小自主探索、選修課與個展課程的學習樣貌。"
        : "這裡收錄《奇聞異事》全 36 篇故事。家長可以依照章節閱讀，也可以直接從第一篇開始，一頁一頁翻到最後。"
  );

  document.querySelector(".book-cover p").textContent = bookMeta.subtitle || bookMeta.group || "和平故事集";
  introTitle.textContent = bookMeta.title;
  updateIntroCover(bookMeta);
  introDesc.textContent = heading;
  introText.textContent = body;
  document.getElementById("bookStats").innerHTML = `
    <span class="stat">全書 ${activeStories.length} 篇</span>
    <span class="stat">共 ${bookMeta.totalPages || 0} 頁</span>
    ${showFeatured ? `<span class="stat">紙本精選 ${activeStories.filter(s => s.featured).length} 篇</span>` : ""}
  `;
}

function setBook(bookId) {
  currentBookId = bookId;
  currentStoryIndex = 0;
  const firstStory = getCurrentStory();
  currentPage = firstStory && typeof firstStory.startPage === "number" ? firstStory.startPage : 1;
  filter = "all";
  searchInput.value = "";
  document.querySelectorAll(".filter").forEach(btn => btn.classList.toggle("active", btn.dataset.filter === "all"));
  bookStats();
  render();
}

function buildCatalog() {
  const keyword = searchInput.value.trim().toLowerCase();
  const book = getCurrentBook();
  const showFeatured = shouldShowFeatured();

  if (book.chapters) {
    const filtered = book.chapters.filter(ch => {
      const text = `${ch.number} ${ch.chapter}`.toLowerCase();
      return !keyword || text.includes(keyword);
    });

    catalog.innerHTML = filtered.map(ch => `
      <button class="toc-btn" data-page="${Math.max(ch.startPage, 1)}">
        ${ch.number}　${ch.chapter}
        <small>第 ${ch.startPage} 頁</small>
      </button>
    `).join("");

    if (!filtered.length) {
      catalog.innerHTML = `<p style="color:rgba(255,247,232,.65);line-height:1.8;">找不到符合條件的章節。</p>`;
    }

    document.querySelectorAll(".toc-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        currentStoryIndex = 0;
        currentPage = Number(btn.dataset.page) || 1;
        sidebar.classList.remove("open");
        render();
      });
    });
    return;
  }

  const activeStories = getActiveStories();
  const filtered = activeStories.map((s, i) => ({ ...s, i })).filter(s => {
    const text = `${s.number} ${s.chapter} ${s.title} ${s.author}`.toLowerCase();
    const matchKeyword = !keyword || text.includes(keyword);
    const matchFilter = filter === "all" || s.featured;
    return matchKeyword && matchFilter;
  });

  const chapters = [...new Set(filtered.map(s => s.chapter))];
  catalog.innerHTML = chapters.map(ch => {
    const items = filtered.filter(s => s.chapter === ch).map(s => `
      <button class="toc-btn ${s.i === currentStoryIndex ? "active" : ""}" data-index="${s.i}">
        ${s.number}　${s.title}${showFeatured && s.featured ? "　⭐" : ""}
        <small>${s.author}　P.${s.startPage || 1}</small>
      </button>
    `).join("");
    return `<div class="chapter-title">${ch}</div>${items}`;
  }).join("");

  if (!filtered.length) {
    catalog.innerHTML = `<p style="color:rgba(255,247,232,.65);line-height:1.8;">找不到符合條件的故事。</p>`;
  }

  document.querySelectorAll(".toc-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const storyIndex = Number(btn.dataset.index);
      const story = activeStories[storyIndex];
      if (!story) return;
      currentStoryIndex = storyIndex;
      currentPage = story.startPage || 1;
      sidebar.classList.remove("open");
      render();
    });
  });
}

function render() {
  const activeStories = getActiveStories();
  const book = getCurrentBook();
  const showFeatured = shouldShowFeatured();
  if (!activeStories.length) {
    return;
  }

  if (currentPage < getMinReadablePage(book)) {
    currentPage = getMinReadablePage(book);
  }
  if (currentPage > getMaxReadablePage(book)) {
    currentPage = getMaxReadablePage(book);
  }

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

  document.querySelector(".side-head h2").textContent = book.title;
  document.querySelectorAll('.filter[data-filter="featured"]').forEach(btn => {
    btn.hidden = !showFeatured;
  });
  document.getElementById("chapterLabel").textContent = `${story.chapter}｜第 ${story.number} 篇`;
  document.getElementById("storyTitle").textContent = story.title;
  document.getElementById("storyMeta").textContent = showFeatured
    ? `作者｜${story.author}${story.featured ? "｜紙本精選 ⭐" : "｜電子版"}`
    : `作者｜${story.author}`;

  const pageImg = document.getElementById("pageImg");
  const img = isCoverPage
    ? book.cover
    : isBackCoverPage
      ? book.backCover
      : getPageImage(currentBookId, currentPage);
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

  document.getElementById("pageCaption").textContent = isCoverPage
    ? "封面"
    : isBackCoverPage
      ? "封底"
      : `${story.title}｜第 ${currentPage} 頁 / 共 ${book.totalPages} 頁`;
  document.getElementById("progress").textContent = isCoverPage
    ? "封面"
    : isBackCoverPage
      ? "封底"
      : `第 ${currentPage} 頁 / 共 ${book.totalPages} 頁`;

  const atFirst = currentStoryIndex === 0 && currentPage === getMinReadablePage(book);
  const atLast = currentStoryIndex === activeStories.length - 1 && currentPage === getMaxReadablePage(book);
  ["prevTurn", "prevPage"].forEach(id => document.getElementById(id).disabled = atFirst);
  ["nextTurn", "nextPage"].forEach(id => document.getElementById(id).disabled = atLast);
  document.getElementById("prevStory").disabled = currentStoryIndex === 0;
  document.getElementById("nextStory").disabled = currentStoryIndex === activeStories.length - 1;

  const endCard = document.getElementById("endCard");
  if (currentPage === storyEndPage && currentStoryIndex < activeStories.length - 1) {
    const next = activeStories[currentStoryIndex + 1];
    document.getElementById("nextStoryHint").textContent = `下一篇：${next.number} ${next.title}｜${next.author}`;
    endCard.classList.remove("hidden");
  } else {
    endCard.classList.add("hidden");
  }

  buildCatalog();
}

function nextPage() {
  const book = getCurrentBook();
  if (!getActiveStories().length) {
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
  if (!getActiveStories().length) {
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

document.getElementById("startReading").addEventListener("click", () => {
  document.getElementById("readerApp").scrollIntoView({ behavior: "smooth" });
  setBook("strange");
});

document.getElementById("openDictionary").addEventListener("click", () => {
  document.getElementById("readerApp").scrollIntoView({ behavior: "smooth" });
  setBook("fengxiang");
});

document.getElementById("openSelfLearning").addEventListener("click", () => {
  document.getElementById("readerApp").scrollIntoView({ behavior: "smooth" });
  setBook("selfLearning");
});

document.getElementById("openTeacherManual").addEventListener("click", () => {
  document.getElementById("readerApp").scrollIntoView({ behavior: "smooth" });
  setBook("teacherManual");
});

document.getElementById("menuBtn").addEventListener("click", () => sidebar.classList.add("open"));
document.getElementById("closeMenu").addEventListener("click", () => sidebar.classList.remove("open"));
document.getElementById("focusBtn").addEventListener("click", () => document.body.classList.toggle("focus"));
exitFocusBtn.addEventListener("click", exitFocusMode);

document.getElementById("nextTurn").addEventListener("click", nextPage);
document.getElementById("nextPage").addEventListener("click", nextPage);
document.getElementById("prevTurn").addEventListener("click", prevPage);
document.getElementById("prevPage").addEventListener("click", prevPage);
document.getElementById("nextStory").addEventListener("click", () => goStory(1));
document.getElementById("prevStory").addEventListener("click", () => goStory(-1));
document.getElementById("goNextStory").addEventListener("click", () => goStory(1));

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.filter;
    buildCatalog();
  });
});

searchInput.addEventListener("input", buildCatalog);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextPage();
  if (e.key === "ArrowLeft") prevPage();
  if (e.key === "Escape") {
    exitFocusMode();
  }
});

let touchStartX = 0;
const pageImg = document.getElementById("pageImg");
pageImg.addEventListener("touchstart", e => touchStartX = e.changedTouches[0].screenX);
pageImg.addEventListener("touchend", e => {
  const diff = e.changedTouches[0].screenX - touchStartX;
  if (diff < -50) nextPage();
  if (diff > 50) prevPage();
});

bookStats();
buildCatalog();
render();
