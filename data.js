function getBook(bookId) {
  return books.find(book => book.id === bookId) || null;
}

function getStory(bookId, storyIndex) {
  const book = getBook(bookId);
  if (!book || !book.stories || storyIndex < 0 || storyIndex >= book.stories.length) {
    return null;
  }
  return book.stories[storyIndex];
}

function getStoryEndPage(bookId, storyIndex) {
  const book = getBook(bookId);
  if (!book || !book.stories) {
    return null;
  }

  const story = getStory(bookId, storyIndex);
  if (!story) {
    return null;
  }

  if (storyIndex < book.stories.length - 1) {
    return book.stories[storyIndex + 1].startPage - 1;
  }

  return book.totalPages;
}

function getPageImage(bookId, page) {
  const book = getBook(bookId);
  if (!book || !book.imagePattern) {
    return null;
  }

  return book.imagePattern.replace('{page}', String(page).padStart(3, '0'));
}

const books = [
  {
    id: "strange",
    title: "奇聞異事",
    subtitle: "楓香故事集",
    description: "一切從校園裡那些說不清、講不明，卻又讓人忍不住想繼續聽下去的故事開始。",
    totalPages: 254,
    cover: "assets/books/strange/cover.webp",
    imagePattern: "assets/books/strange/page-{page}.png",
    stories: [
      {
        number: "01",
        chapter: "序章",
        title: "一切的開端",
        author: "翁晨菡",
        startPage: 1,
        featured: true
      },
      {
        number: "02",
        chapter: "第一章 校園怪談",
        title: "微笑的女人",
        author: "林仝",
        startPage: 12,
        featured: true
      },
      {
        number: "03",
        chapter: "第一章 校園怪談",
        title: "微笑的女人2",
        author: "林仝",
        startPage: 18,
        featured: false
      },
      {
        number: "04",
        chapter: "第一章 校園怪談",
        title: "暗鏡怨靈",
        author: "張愷勻",
        startPage: 26,
        featured: true
      },
      {
        number: "05",
        chapter: "第一章 校園怪談",
        title: "流水的男廁",
        author: "高信信",
        startPage: 36,
        featured: false
      },
      {
        number: "06",
        chapter: "第一章 校園怪談",
        title: "午夜的光",
        author: "林仝",
        startPage: 46,
        featured: true
      },
      {
        number: "07",
        chapter: "第一章 校園怪談",
        title: "無形的照片",
        author: "高信信",
        startPage: 55,
        featured: true
      },
      {
        number: "08",
        chapter: "第一章 校園怪談",
        title: "實體的幽魂",
        author: "高信信",
        startPage: 65,
        featured: true
      },
      {
        number: "09",
        chapter: "第一章 校園怪談",
        title: "上鎖的門",
        author: "劉祐潔",
        startPage: 77,
        featured: false
      },
      {
        number: "10",
        chapter: "第一章 校園怪談",
        title: "樹居大怒神",
        author: "鄭亞桑",
        startPage: 83,
        featured: true
      },
      {
        number: "11",
        chapter: "第二章 都市傳說",
        title: "河豚謀殺案",
        author: "傅昊文",
        startPage: 90,
        featured: true
      },
      {
        number: "12",
        chapter: "第二章 都市傳說",
        title: "雞母蟲謀殺案",
        author: "傅昊文",
        startPage: 97,
        featured: false
      },
      {
        number: "13",
        chapter: "第二章 都市傳說",
        title: "消失的同學",
        author: "湯晴亦",
        startPage: 103,
        featured: false
      },
      {
        number: "14",
        chapter: "第二章 都市傳說",
        title: "金柚盃陰謀論",
        author: "湯晴亦",
        startPage: 109,
        featured: false
      },
      {
        number: "15",
        chapter: "第二章 都市傳說",
        title: "一個人的捉迷藏",
        author: "邱亮衡",
        startPage: 114,
        featured: false
      },
      {
        number: "16",
        chapter: "第二章 都市傳說",
        title: "不斷出現的洞",
        author: "高信信",
        startPage: 120,
        featured: false
      },
      {
        number: "17",
        chapter: "第二章 都市傳說",
        title: "偷紙怪",
        author: "鄭亞桑",
        startPage: 128,
        featured: true
      },
      {
        number: "18",
        chapter: "第二章 都市傳說",
        title: "會亂飛的球",
        author: "鄭亞桑",
        startPage: 135,
        featured: true
      },
      {
        number: "19",
        chapter: "第三章 荒謬日常",
        title: "校長吃人（一）",
        author: "劉祐潔",
        startPage: 141,
        featured: true
      },
      {
        number: "20",
        chapter: "第三章 荒謬日常",
        title: "校長吃人（二）",
        author: "劉祐潔",
        startPage: 147,
        featured: false
      },
      {
        number: "21",
        chapter: "第三章 荒謬日常",
        title: "ABC屎者",
        author: "傅昊文",
        startPage: 155,
        featured: true
      },
      {
        number: "22",
        chapter: "第三章 荒謬日常",
        title: "炊煮不意外",
        author: "翁晨菡",
        startPage: 161,
        featured: false
      },
      {
        number: "23",
        chapter: "第三章 荒謬日常",
        title: "四年級的日常",
        author: "邱亮衡",
        startPage: 170,
        featured: true
      },
      {
        number: "24",
        chapter: "第三章 荒謬日常",
        title: "衛生紙炸彈",
        author: "劉祐潔",
        startPage: 174,
        featured: true
      },
      {
        number: "25",
        chapter: "第三章 荒謬日常",
        title: "午餐雞塊事件",
        author: "林仝",
        startPage: 180,
        featured: false
      },
      {
        number: "26",
        chapter: "第四章 角色故事",
        title: "為什麼雞婆想聽八卦",
        author: "邱亮衡",
        startPage: 189,
        featured: true
      },
      {
        number: "27",
        chapter: "第四章 角色故事",
        title: "肥肥故事",
        author: "張愷勻",
        startPage: 194,
        featured: false
      },
      {
        number: "28",
        chapter: "第四章 角色故事",
        title: "漠漠與肥肥",
        author: "湯晴亦",
        startPage: 198,
        featured: true
      },
      {
        number: "29",
        chapter: "第四章 角色故事",
        title: "鼠對頭的恩怨",
        author: "鄭亞桑",
        startPage: 205,
        featured: false
      },
      {
        number: "30",
        chapter: "第四章 角色故事",
        title: "有仇必報＆秘密行動",
        author: "翁晨菡",
        startPage: 211,
        featured: false
      },
      {
        number: "31",
        chapter: "第四章 角色故事",
        title: "妮德·雪樂",
        author: "湯晴亦",
        startPage: 217,
        featured: true
      },
      {
        number: "32",
        chapter: "第四章 角色故事",
        title: "死神快來了",
        author: "傅昊文",
        startPage: 223,
        featured: false
      },
      {
        number: "33",
        chapter: "第五章 和平世界觀",
        title: "和平是個什麼樣子的地方？",
        author: "邱亮衡",
        startPage: 228,
        featured: true
      },
      {
        number: "34",
        chapter: "第五章 和平世界觀",
        title: "和平說明書＋怪談",
        author: "張愷勻",
        startPage: 235,
        featured: true
      },
      {
        number: "35",
        chapter: "第五章 和平世界觀",
        title: "詭異の自主探索",
        author: "張愷勻",
        startPage: 240,
        featured: false
      },
      {
        number: "36",
        chapter: "終章 尾聲",
        title: "生死抉擇",
        author: "翁晨菡",
        startPage: 246,
        featured: false
      }
    ]
  },
  {
    id: "fengxiang",
    title: "楓香辭典",
    subtitle: "楓香故事集",
    description: "以外星人艾利恩的視角，紀錄和平實驗小學的生活與文化。",
    totalPages: 299,
    cover: "",
    imagePattern: "assets/books/fengxiang/page-{page}.png",
    stories: [
      {
        number: "01",
        chapter: "一年級",
        title: "認識校園",
        author: "劉玥頤",
        startPage: 1,
        featured: false
      },
      {
        number: "02",
        chapter: "一年級",
        title: "分家族",
        author: "陳筠霏",
        startPage: 12,
        featured: false
      },
      {
        number: "03",
        chapter: "一年級",
        title: "體適能",
        author: "林廷叡、校稿組同學",
        startPage: 26,
        featured: false
      },
      {
        number: "04",
        chapter: "一年級",
        title: "自主探索",
        author: "洪睿遠",
        startPage: 37,
        featured: false
      },
      {
        number: "05",
        chapter: "一年級",
        title: "生活高手",
        author: "傅唯翔、校稿組",
        startPage: 46,
        featured: false
      },
      {
        number: "06",
        chapter: "一年級",
        title: "中秋慶典",
        author: "戴妘芯",
        startPage: 53,
        featured: false
      },
      {
        number: "07",
        chapter: "一年級",
        title: "小農食堂",
        author: "戴妘芯",
        startPage: 65,
        featured: false
      },
      {
        number: "08",
        chapter: "二年級",
        title: "童玩設計師",
        author: "陳筠霏",
        startPage: 80,
        featured: false
      },
      {
        number: "09",
        chapter: "二年級",
        title: "故事大玩家",
        author: "陳筠霏",
        startPage: 91,
        featured: false
      },
      {
        number: "10",
        chapter: "二年級",
        title: "社區導遊",
        author: "戴妘芯",
        startPage: 99,
        featured: false
      },
      {
        number: "11",
        chapter: "二年級",
        title: "愛心特攻隊",
        author: "戴妘芯",
        startPage: 108,
        featured: false
      },
      {
        number: "12",
        chapter: "二年級",
        title: "冬至慶典",
        author: "潘羿彤",
        startPage: 119,
        featured: false
      },
      {
        number: "13",
        chapter: "二年級",
        title: "野餐規劃師",
        author: "郭奕辰",
        startPage: 129,
        featured: false
      },
      {
        number: "14",
        chapter: "二年級",
        title: "校慶",
        author: "郭奕辰",
        startPage: 135,
        featured: false
      },
      {
        number: "15",
        chapter: "二年級",
        title: "空間設計師",
        author: "傅唯翔",
        startPage: 141,
        featured: false
      },
      {
        number: "16",
        chapter: "三年級",
        title: "文化時光機",
        author: "劉玥頤",
        startPage: 148,
        featured: false
      },
      {
        number: "17",
        chapter: "三年級",
        title: "城市建築師",
        author: "傅唯翔",
        startPage: 155,
        featured: false
      },
      {
        number: "18",
        chapter: "三年級",
        title: "生態好野人",
        author: "陳筠霏",
        startPage: 160,
        featured: false
      },
      {
        number: "19",
        chapter: "三年級",
        title: "健康小學堂",
        author: "劉玥頤",
        startPage: 169,
        featured: false
      },
      {
        number: "20",
        chapter: "三年級",
        title: "選修課",
        author: "林廷叡、校稿組同學",
        startPage: 180,
        featured: false
      },
      {
        number: "21",
        chapter: "四年級",
        title: "心情設計師",
        author: "劉玥頤",
        startPage: 187,
        featured: false
      },
      {
        number: "22",
        chapter: "四年級",
        title: "獨立書店長",
        author: "潘羿彤",
        startPage: 193,
        featured: false
      },
      {
        number: "23",
        chapter: "四年級",
        title: "和平村運會",
        author: "林廷叡、校稿組同學",
        startPage: 200,
        featured: false
      },
      {
        number: "24",
        chapter: "四年級",
        title: "春季慶典",
        author: "郭奕辰",
        startPage: 208,
        featured: false
      },
      {
        number: "25",
        chapter: "四年級",
        title: "科學實驗家",
        author: "林廷叡、校稿組同學",
        startPage: 215,
        featured: false
      },
      {
        number: "26",
        chapter: "四年級",
        title: "財經俱樂部",
        author: "潘羿彤",
        startPage: 225,
        featured: false
      },
      {
        number: "27",
        chapter: "五年級",
        title: "和平聯合國",
        author: "陳筠霏",
        startPage: 234,
        featured: false
      },
      {
        number: "28",
        chapter: "五年級",
        title: "志工企業家",
        author: "傅唯翔、校稿組",
        startPage: 241,
        featured: false
      },
      {
        number: "29",
        chapter: "五年級",
        title: "和平兒童劇團",
        author: "陳筠霏",
        startPage: 250,
        featured: false
      },
      {
        number: "30",
        chapter: "五年級",
        title: "夏季慶典",
        author: "郭奕辰",
        startPage: 262,
        featured: false
      },
      {
        number: "31",
        chapter: "六年級",
        title: "超級創客",
        author: "洪睿遠",
        startPage: 270,
        featured: false
      },
      {
        number: "32",
        chapter: "六年級",
        title: "營養總舖師",
        author: "潘羿彤",
        startPage: 278,
        featured: false
      },
      {
        number: "33",
        chapter: "六年級",
        title: "壯遊冒險家",
        author: "洪睿遠",
        startPage: 286,
        featured: false
      },
      {
        number: "34",
        chapter: "六年級",
        title: "和平出版社",
        author: "洪睿遠",
        startPage: 292,
        featured: false
      }
    ]
  }
];
