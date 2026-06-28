
const stories = library.stories;
let storyIndex = 0;
let pageIndex = 0;
let filter = "all";

const catalog = document.getElementById("catalog");
const sidebar = document.getElementById("sidebar");
const searchInput = document.getElementById("searchInput");

function getCurrentStory(){ return stories[storyIndex]; }

function bookStats(){
  const pages = stories.reduce((sum,s)=>sum+s.pages.length,0);
  document.getElementById("bookStats").innerHTML = `
    <span class="stat">全書 ${stories.length} 篇</span>
    <span class="stat">共 ${pages} 頁</span>
    <span class="stat">紙本精選 ${stories.filter(s=>s.featured).length} 篇</span>
  `;
}

function buildCatalog(){
  const keyword = searchInput.value.trim().toLowerCase();
  const filtered = stories.map((s,i)=>({...s,i})).filter(s=>{
    const text = `${s.number} ${s.chapter} ${s.title} ${s.author}`.toLowerCase();
    const matchKeyword = !keyword || text.includes(keyword);
    const matchFilter = filter === "all" || s.featured;
    return matchKeyword && matchFilter;
  });

  const chapters = [...new Set(filtered.map(s=>s.chapter))];
  catalog.innerHTML = chapters.map(ch=>{
    const items = filtered.filter(s=>s.chapter===ch).map(s=>`
      <button class="toc-btn ${s.i===storyIndex ? "active":""}" data-index="${s.i}">
        ${s.number}　${s.title}${s.featured ? "　⭐" : ""}
        <small>${s.author}｜${s.pages.length} 頁</small>
      </button>
    `).join("");
    return `<div class="chapter-title">${ch}</div>${items}`;
  }).join("");

  if(!filtered.length){
    catalog.innerHTML = `<p style="color:rgba(255,247,232,.65);line-height:1.8;">找不到符合條件的故事。</p>`;
  }

  document.querySelectorAll(".toc-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
      storyIndex = Number(btn.dataset.index);
      pageIndex = 0;
      sidebar.classList.remove("open");
      render();
    });
  });
}

function render(){
  const s = getCurrentStory();
  const pages = s.pages || [];
  if(pageIndex >= pages.length) pageIndex = Math.max(0, pages.length-1);

  document.getElementById("chapterLabel").textContent = `${s.chapter}｜第 ${s.number} 篇`;
  document.getElementById("storyTitle").textContent = s.title;
  document.getElementById("storyMeta").textContent = `作者｜${s.author}${s.featured ? "｜紙本精選 ⭐" : "｜電子版"}`;

  const img = document.getElementById("pageImg");
  if(pages.length){
    img.src = pages[pageIndex];
    img.alt = `${s.title} 第 ${pageIndex+1} 頁`;
  }else{
    img.removeAttribute("src");
  }

  document.getElementById("pageCaption").textContent = `${s.title}｜第 ${pageIndex+1} 頁 / 共 ${Math.max(pages.length,1)} 頁`;
  document.getElementById("progress").textContent = `故事 ${storyIndex+1}/${stories.length}　頁 ${pageIndex+1}/${Math.max(pages.length,1)}`;

  const atFirst = storyIndex === 0 && pageIndex === 0;
  const atLast = storyIndex === stories.length - 1 && pageIndex === pages.length - 1;
  ["prevTurn","prevPage"].forEach(id=>document.getElementById(id).disabled = atFirst);
  ["nextTurn","nextPage"].forEach(id=>document.getElementById(id).disabled = atLast);
  document.getElementById("prevStory").disabled = storyIndex === 0;
  document.getElementById("nextStory").disabled = storyIndex === stories.length - 1;

  const endCard = document.getElementById("endCard");
  if(pageIndex === pages.length - 1 && storyIndex < stories.length - 1){
    const next = stories[storyIndex+1];
    document.getElementById("nextStoryHint").textContent = `下一篇：${next.number} ${next.title}｜${next.author}`;
    endCard.classList.remove("hidden");
  }else{
    endCard.classList.add("hidden");
  }

  buildCatalog();
}

function nextPage(){
  const s = getCurrentStory();
  if(pageIndex < s.pages.length - 1){
    pageIndex++;
  }else if(storyIndex < stories.length - 1){
    storyIndex++;
    pageIndex = 0;
  }
  render();
}

function prevPage(){
  if(pageIndex > 0){
    pageIndex--;
  }else if(storyIndex > 0){
    storyIndex--;
    pageIndex = stories[storyIndex].pages.length - 1;
  }
  render();
}

function goStory(delta){
  const nextIndex = storyIndex + delta;
  if(nextIndex >= 0 && nextIndex < stories.length){
    storyIndex = nextIndex;
    pageIndex = 0;
    render();
  }
}

document.getElementById("startReading").addEventListener("click",()=>{
  document.getElementById("readerApp").scrollIntoView({behavior:"smooth"});
  storyIndex = 0;
  pageIndex = 0;
  render();
});

document.getElementById("menuBtn").addEventListener("click",()=>sidebar.classList.add("open"));
document.getElementById("closeMenu").addEventListener("click",()=>sidebar.classList.remove("open"));
document.getElementById("focusBtn").addEventListener("click",()=>document.body.classList.toggle("focus"));

document.getElementById("nextTurn").addEventListener("click",nextPage);
document.getElementById("nextPage").addEventListener("click",nextPage);
document.getElementById("prevTurn").addEventListener("click",prevPage);
document.getElementById("prevPage").addEventListener("click",prevPage);
document.getElementById("nextStory").addEventListener("click",()=>goStory(1));
document.getElementById("prevStory").addEventListener("click",()=>goStory(-1));
document.getElementById("goNextStory").addEventListener("click",()=>goStory(1));

document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.filter;
    buildCatalog();
  });
});

searchInput.addEventListener("input", buildCatalog);

document.addEventListener("keydown",(e)=>{
  if(e.key === "ArrowRight") nextPage();
  if(e.key === "ArrowLeft") prevPage();
  if(e.key === "Escape"){
    sidebar.classList.remove("open");
    document.body.classList.remove("focus");
  }
});

let touchStartX = 0;
const pageImg = document.getElementById("pageImg");
pageImg.addEventListener("touchstart",e=>touchStartX = e.changedTouches[0].screenX);
pageImg.addEventListener("touchend",e=>{
  const diff = e.changedTouches[0].screenX - touchStartX;
  if(diff < -50) nextPage();
  if(diff > 50) prevPage();
});

bookStats();
buildCatalog();
render();
