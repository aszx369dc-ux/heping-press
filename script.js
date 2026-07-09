let currentBookId = "strange";
let currentStoryIndex = 0;
let currentPage = 1;
let filter = "all";

const catalog = document.getElementById("catalog");
const sidebar = document.getElementById("sidebar");
const searchInput = document.getElementById("searchInput");

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

function bookStats() {
  const activeStories = getActiveStories();
  const bookMeta = getCurrentBook();
  const showFeatured = shouldShowFeatured();
  const introTitle = document.querySelector(".book-cover h2");
  const introDesc = document.querySelector(".book-about h2");
  const introText = document.querySelector(".book-about p:nth-of-type(2)");
  const heading = bookMeta.aboutHeading || (currentBookId === "fengxiang"
    ? "一本由艾利恩記錄下來的和平實小校園日常"
    : isSelfLearningBook()
      ? "一本關於自主探索與成長的故事"
      : "一本由孩子共同打造的和平怪奇宇宙");
  const body = bookMeta.aboutBody || (currentBookId === "fengxiang"
    ? "這裡收錄《楓香辭典》整本內容，點擊後即可在閱讀器中連續翻閱。"
    : isSelfLearningBook()
      ? "收錄《自主學習》36 篇故事，透過角色的成長歷程，帶領讀者看見和平實小自主探索、選修課與個展課程的學習樣貌。"
      : "這裡收錄《奇聞異事》全 36 篇故事。家長可以依照章節閱讀，也可以直接從第一篇開始，一頁一頁翻到最後。"
  );

  document.querySelector(".book-cover p").textContent = bookMeta.subtitle || bookMeta.group || "和平出版社";
  introTitle.textContent = bookMeta.title;
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
  const story = getCurrentStory();
  const showFeatured = shouldShowFeatured();
  if (!story) {
    return;
  }

  const storyStartPage = typeof story.startPage === "number" ? story.startPage : 1;
  const storyEndPage = getStoryEndPage(currentBookId, currentStoryIndex) || book.totalPages || storyStartPage;

  if (currentPage < storyStartPage) {
    currentPage = storyStartPage;
  }
  if (currentPage > storyEndPage) {
    currentPage = storyEndPage;
  }

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
  const img = getPageImage(currentBookId, currentPage);
  if (img) {
    pageImg.src = img;
    pageImg.alt = `${story.title} 第 ${currentPage} 頁`;
  } else {
    pageImg.removeAttribute("src");
  }

  document.getElementById("pageCaption").textContent = `${story.title}｜第 ${currentPage} 頁 / 共 ${book.totalPages} 頁`;
  document.getElementById("progress").textContent = `第 ${currentPage} 頁 / 共 ${book.totalPages} 頁`;

  const atFirst = currentStoryIndex === 0 && currentPage === storyStartPage;
  const atLast = currentStoryIndex === activeStories.length - 1 && currentPage === storyEndPage;
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
  const activeStories = getActiveStories();
  const story = getCurrentStory();
  if (!story) {
    render();
    return;
  }

  const storyEndPage = getStoryEndPage(currentBookId, currentStoryIndex) || getCurrentBook().totalPages || currentPage;
  if (currentPage < storyEndPage) {
    currentPage++;
  } else if (currentStoryIndex < activeStories.length - 1) {
    currentStoryIndex++;
    const nextStory = getCurrentStory();
    currentPage = nextStory && typeof nextStory.startPage === "number" ? nextStory.startPage : 1;
  }
  render();
}

function prevPage() {
  const story = getCurrentStory();
  if (!story) {
    render();
    return;
  }

  const storyStartPage = typeof story.startPage === "number" ? story.startPage : 1;
  if (currentPage > storyStartPage) {
    currentPage--;
  } else if (currentStoryIndex > 0) {
    currentStoryIndex--;
    const prevStory = getCurrentStory();
    currentPage = prevStory && typeof prevStory.startPage === "number" ? prevStory.startPage : 1;
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

document.getElementById("menuBtn").addEventListener("click", () => sidebar.classList.add("open"));
document.getElementById("closeMenu").addEventListener("click", () => sidebar.classList.remove("open"));
document.getElementById("focusBtn").addEventListener("click", () => document.body.classList.toggle("focus"));

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
    sidebar.classList.remove("open");
    document.body.classList.remove("focus");
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
