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
    cover: "assets/books/strange/cover.png",
    backCover: "assets/books/strange/back-cover.png",
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
    cover: "assets/books/fengxiang/cover.png",
    backCover: "assets/books/fengxiang/back-cover.png",
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
  },
  {
    id: "selfLearning",
    title: "自主學習",
    subtitle: "楓香故事集",
    description: "以角色成長為主軸，串起和平實小從低年級到高年級的自主探索、選修課與個展歷程。",
    totalPages: 318,
    cover: "assets/books/self-learning/cover.png",
    backCover: "assets/books/self-learning/back-cover.png",
    imagePattern: "assets/books/self-learning/page-{page}.png",
    stories: [
      {
        number: "01",
        chapter: "第一章 低年級｜王妖貓",
        title: "王妖貓的新生日常",
        author: "蘇柏宇",
        startPage: 1,
        featured: false
      },
      {
        number: "02",
        chapter: "第一章 低年級｜王妖貓",
        title: "刺激的樂樂棒球賽",
        author: "王元謙",
        startPage: 11,
        featured: true
      },
      {
        number: "03",
        chapter: "第一章 低年級｜王妖貓",
        title: "足球的風波",
        author: "王日霖",
        startPage: 17,
        featured: true
      },
      {
        number: "04",
        chapter: "第一章 低年級｜王妖貓",
        title: "不知所措的體適能",
        author: "王日霖",
        startPage: 25,
        featured: false
      },
      {
        number: "05",
        chapter: "第一章 低年級｜王妖貓",
        title: "美躲的比賽衝突",
        author: "王元謙",
        startPage: 31,
        featured: false
      },
      {
        number: "06",
        chapter: "第一章 低年級｜王妖貓",
        title: "自主探索的突發狀況",
        author: "蘇柏宇",
        startPage: 43,
        featured: true
      },
      {
        number: "07",
        chapter: "第一章 低年級｜林曉桐",
        title: "林曉桐的新生日常",
        author: "蘇柏宇",
        startPage: 53,
        featured: true
      },
      {
        number: "08",
        chapter: "第一章 低年級｜林曉桐",
        title: "林曉桐的無聊體適能",
        author: "王元謙",
        startPage: 60,
        featured: false
      },
      {
        number: "09",
        chapter: "第一章 低年級｜林曉桐",
        title: "林曉桐的下課趣事",
        author: "王元謙",
        startPage: 66,
        featured: true
      },
      {
        number: "10",
        chapter: "第一章 低年級｜林曉桐",
        title: "林曉桐的美躲初體驗",
        author: "蘇柏宇",
        startPage: 73,
        featured: false
      },
      {
        number: "11",
        chapter: "第一章 低年級｜林曉桐",
        title: "自主探索的好去處",
        author: "王日霖",
        startPage: 79,
        featured: false
      },
      {
        number: "12",
        chapter: "第一章 低年級｜林曉桐",
        title: "下課的社團時光",
        author: "王日霖",
        startPage: 87,
        featured: true
      },
      {
        number: "13",
        chapter: "第二章 中年級｜選修課的選擇",
        title: "「選修課」？",
        author: "潘長歆恬",
        startPage: 93,
        featured: true
      },
      {
        number: "14",
        chapter: "第二章 中年級｜選修課的選擇",
        title: "難以做出決定",
        author: "方昱蘅",
        startPage: 103,
        featured: false
      },
      {
        number: "15",
        chapter: "第二章 中年級｜各種選修課",
        title: "你做的每一件事都是有前因後果的",
        author: "賴于媗",
        startPage: 111,
        featured: true
      },
      {
        number: "16",
        chapter: "第二章 中年級｜各種選修課",
        title: "成就感",
        author: "方昱蘅",
        startPage: 122,
        featured: true
      },
      {
        number: "17",
        chapter: "第二章 中年級｜各種選修課",
        title: "總有一天，我會走出陰影",
        author: "潘長歆恬",
        startPage: 128,
        featured: true
      },
      {
        number: "18",
        chapter: "第二章 中年級｜各種選修課",
        title: "不要太高估自己",
        author: "賴于媗",
        startPage: 137,
        featured: false
      },
      {
        number: "19",
        chapter: "第二章 中年級｜各種選修課",
        title: "並不是任何事情都很簡單",
        author: "賴于媗",
        startPage: 151,
        featured: false
      },
      {
        number: "20",
        chapter: "第二章 中年級｜各種選修課",
        title: "無聊的選修課",
        author: "潘長歆恬",
        startPage: 163,
        featured: false
      },
      {
        number: "21",
        chapter: "第二章 中年級｜各種選修課",
        title: "克服困難也是一種技能",
        author: "賴于媗",
        startPage: 169,
        featured: true
      },
      {
        number: "22",
        chapter: "第二章 中年級｜各種選修課",
        title: "沒有什麼是完美的",
        author: "潘長歆恬",
        startPage: 180,
        featured: false
      },
      {
        number: "23",
        chapter: "第二章 中年級｜各種選修課",
        title: "要專心聽課",
        author: "方昱蘅",
        startPage: 190,
        featured: false
      },
      {
        number: "24",
        chapter: "第二章 中年級｜各種選修課",
        title: "總是有辦法的",
        author: "方昱蘅",
        startPage: 197,
        featured: true
      },
      {
        number: "25",
        chapter: "第三章 高年級｜體適能",
        title: "揮灑汗水的一場樂樂棒比賽",
        author: "謝濟謙",
        startPage: 204,
        featured: false
      },
      {
        number: "26",
        chapter: "第三章 高年級｜體適能",
        title: "羽球比賽的那堵牆",
        author: "李夏澄",
        startPage: 215,
        featured: false
      },
      {
        number: "27",
        chapter: "第三章 高年級｜林曉桐的個展",
        title: "無聊的選修課-獨立研究",
        author: "陳慶甯",
        startPage: 229,
        featured: true
      },
      {
        number: "28",
        chapter: "第三章 高年級｜林曉桐的個展",
        title: "想不到主題的個展",
        author: "陳慶甯",
        startPage: 239,
        featured: true
      },
      {
        number: "29",
        chapter: "第三章 高年級｜林曉桐的個展",
        title: "進度落後的個展歷程",
        author: "陳慶甯",
        startPage: 246,
        featured: false
      },
      {
        number: "30",
        chapter: "第三章 高年級｜林曉桐的個展",
        title: "緊張的個展發表會",
        author: "陳慶甯",
        startPage: 254,
        featured: false
      },
      {
        number: "31",
        chapter: "第三章 高年級｜羅妍雪的個展",
        title: "在漫畫中開啟的序章",
        author: "李夏澄",
        startPage: 263,
        featured: false
      },
      {
        number: "32",
        chapter: "第三章 高年級｜羅妍雪的個展",
        title: "個展冒險",
        author: "李夏澄",
        startPage: 277,
        featured: true
      },
      {
        number: "33",
        chapter: "第三章 高年級｜羅妍雪的個展",
        title: "光照進的個展報告",
        author: "李夏澄",
        startPage: 287,
        featured: true
      },
      {
        number: "34",
        chapter: "第三章 高年級｜王妖貓的個展",
        title: "豎立在我面前的個展這道牆",
        author: "謝濟謙",
        startPage: 299,
        featured: false
      },
      {
        number: "35",
        chapter: "第三章 高年級｜王妖貓的個展",
        title: "一場令人煩惱的冒險",
        author: "謝濟謙",
        startPage: 306,
        featured: true
      },
      {
        number: "36",
        chapter: "第三章 高年級｜王妖貓的個展",
        title: "個展的奇幻旅程",
        author: "謝濟謙",
        startPage: 313,
        featured: true
      }
    ]
  },
  {
    id: "teacherManual",
    title: "老師使用說明書",
    subtitle: "楓香故事集",
    description: "透過三位不同風格的老師，帶領讀者看見和平實小師生互動、班級經營與友誼建立的各種樣貌。",
    totalPages: 327,
    cover: "assets/books/teacher-manual/cover.png",
    backCover: "assets/books/teacher-manual/back-cover.png",
    imagePattern: "assets/books/teacher-manual/page-{page}.png",
    stories: [
      {
        id: "01",
        number: "01",
        title: "老師，我不會！",
        author: "劉宇捷",
        chapter: "第一章 全天候保母模式啟動",
        section: "第一節 袋鼠老師是媽媽？！",
        startPage: 1,
        featured: true
      },
      {
        id: "02",
        number: "02",
        title: "作業是什麼？還要寫！",
        author: "謝忻桐",
        chapter: "第一章 全天候保母模式啟動",
        section: "第一節 袋鼠老師是媽媽？！",
        startPage: 11,
        featured: true
      },
      {
        id: "03",
        number: "03",
        title: "書包不見了",
        author: "謝忻桐",
        chapter: "第一章 全天候保母模式啟動",
        section: "第一節 袋鼠老師是媽媽？！",
        startPage: 19,
        featured: false
      },
      {
        id: "04",
        number: "04",
        title: "老師，我、我、我！",
        author: "謝忻桐",
        chapter: "第一章 全天候保母模式啟動",
        section: "第一節 袋鼠老師是媽媽？！",
        startPage: 27,
        featured: true
      },
      {
        id: "05",
        number: "05",
        title: "我要告老師",
        author: "謝忻桐",
        chapter: "第一章 全天候保母模式啟動",
        section: "第二節 老師！他不跟我好了！",
        startPage: 35,
        featured: false
      },
      {
        id: "06",
        number: "06",
        title: "老師！他嘲笑我",
        author: "劉宇捷",
        chapter: "第一章 全天候保母模式啟動",
        section: "第二節 老師！他不跟我好了！",
        startPage: 43,
        featured: true
      },
      {
        id: "07",
        number: "07",
        title: "老師他打我",
        author: "劉宇捷",
        chapter: "第一章 全天候保母模式啟動",
        section: "第二節 老師！他不跟我好了！",
        startPage: 51,
        featured: false
      },
      {
        id: "08",
        number: "08",
        title: "老師我牙齒掉了！",
        author: "劉宇捷",
        chapter: "第一章 全天候保母模式啟動",
        section: "第二節 老師！他不跟我好了！",
        startPage: 59,
        featured: true
      },
      {
        id: "09",
        number: "09",
        title: "第一次被老師罵",
        author: "黃琳軒",
        chapter: "第一章 全天候保母模式啟動",
        section: "第三節 老師不喜歡我了",
        startPage: 65,
        featured: false
      },
      {
        id: "10",
        number: "10",
        title: "老師不聽我說話",
        author: "黃琳軒",
        chapter: "第一章 全天候保母模式啟動",
        section: "第三節 老師不喜歡我了",
        startPage: 79,
        featured: true
      },
      {
        id: "11",
        number: "11",
        title: "我舉手老師都不點我",
        author: "黃琳軒",
        chapter: "第一章 全天候保母模式啟動",
        section: "第三節 老師不喜歡我了",
        startPage: 89,
        featured: false
      },
      {
        id: "12",
        number: "12",
        title: "老師不教我寫作業",
        author: "黃琳軒",
        chapter: "第一章 全天候保母模式啟動",
        section: "第三節 老師不喜歡我了",
        startPage: 97,
        featured: true
      },
      {
        id: "13",
        number: "13",
        title: "老師的真面目",
        author: "楊環羽",
        chapter: "第二章 當老師變成猴",
        section: "第一節 初次見面老師！",
        startPage: 103,
        featured: true
      },
      {
        id: "14",
        number: "14",
        title: "哈哈哈，真幽默",
        author: "馮樂恩",
        chapter: "第二章 當老師變成猴",
        section: "第一節 初次見面老師！",
        startPage: 113,
        featured: false
      },
      {
        id: "15",
        number: "15",
        title: "老師有點呆",
        author: "馮樂恩",
        chapter: "第二章 當老師變成猴",
        section: "第一節 初次見面老師！",
        startPage: 125,
        featured: true
      },
      {
        id: "16",
        number: "16",
        title: "放學後的老師",
        author: "廖宥銘",
        chapter: "第二章 當老師變成猴",
        section: "第二節 猴子老師的秘密",
        startPage: 139,
        featured: false
      },
      {
        id: "17",
        number: "17",
        title: "老師⋯是你嗎？",
        author: "楊環羽",
        chapter: "第二章 當老師變成猴",
        section: "第二節 猴子老師的秘密",
        startPage: 147,
        featured: true
      },
      {
        id: "18",
        number: "18",
        title: "哼，我跟你絕交",
        author: "廖宥銘",
        chapter: "第二章 當老師變成猴",
        section: "第二節 猴子老師的秘密",
        startPage: 155,
        featured: false
      },
      {
        id: "19",
        number: "19",
        title: "棕熊你很煩欸！",
        author: "廖宥銘",
        chapter: "第二章 當老師變成猴",
        section: "第三節 我討厭你",
        startPage: 165,
        featured: true
      },
      {
        id: "20",
        number: "20",
        title: "為什麼呀！",
        author: "楊環羽",
        chapter: "第二章 當老師變成猴",
        section: "第三節 我討厭你",
        startPage: 175,
        featured: false
      },
      {
        id: "21",
        number: "21",
        title: "終於結束了",
        author: "馮樂恩",
        chapter: "第二章 當老師變成猴",
        section: "第三節 我討厭你",
        startPage: 187,
        featured: true
      },
      {
        id: "22",
        number: "22",
        title: "我還沒準備好",
        author: "廖宥銘",
        chapter: "第二章 當老師變成猴",
        section: "第四節 拜拜，猴子",
        startPage: 199,
        featured: false
      },
      {
        id: "23",
        number: "23",
        title: "老師使用說明書",
        author: "馮樂恩",
        chapter: "第二章 當老師變成猴",
        section: "第四節 拜拜，猴子",
        startPage: 207,
        featured: true
      },
      {
        id: "24",
        number: "24",
        title: "謝謝你，猴子老師",
        author: "楊環羽",
        chapter: "第二章 當老師變成猴",
        section: "第四節 拜拜，猴子",
        startPage: 217,
        featured: false
      },
      {
        id: "25",
        number: "25",
        title: "當羊咩咩老師遇到蝙蝠學生",
        author: "杜京霏",
        chapter: "第三章 解鎖隱藏的友誼模式",
        section: "第一節 羊咩咩老師",
        startPage: 225,
        featured: true
      },
      {
        id: "26",
        number: "26",
        title: "當羊咩咩老師遇到海豚學生",
        author: "杜京霏",
        chapter: "第三章 解鎖隱藏的友誼模式",
        section: "第一節 羊咩咩老師",
        startPage: 241,
        featured: false
      },
      {
        id: "27",
        number: "27",
        title: "當羊咩咩老師遇到水母學生",
        author: "杜京霏",
        chapter: "第三章 解鎖隱藏的友誼模式",
        section: "第一節 羊咩咩老師",
        startPage: 253,
        featured: true
      },
      {
        id: "28",
        number: "28",
        title: "當羊咩咩老師遇到白頰山雀學生",
        author: "杜京霏",
        chapter: "第三章 解鎖隱藏的友誼模式",
        section: "第一節 羊咩咩老師",
        startPage: 261,
        featured: false
      },
      {
        id: "29",
        number: "29",
        title: "當貓咪老師遇到蝙蝠學生",
        author: "蔡秉辰",
        chapter: "第三章 解鎖隱藏的友誼模式",
        section: "第二節 貓咪老師",
        startPage: 271,
        featured: true
      },
      {
        id: "30",
        number: "30",
        title: "當貓咪老師遇到海豚學生",
        author: "蔡秉辰",
        chapter: "第三章 解鎖隱藏的友誼模式",
        section: "第二節 貓咪老師",
        startPage: 279,
        featured: false
      },
      {
        id: "31",
        number: "31",
        title: "當貓咪老師遇到水母學生",
        author: "蔡秉辰",
        chapter: "第三章 解鎖隱藏的友誼模式",
        section: "第二節 貓咪老師",
        startPage: 285,
        featured: true
      },
      {
        id: "32",
        number: "32",
        title: "當貓咪老師遇到白頰山雀學生",
        author: "蔡秉辰",
        chapter: "第三章 解鎖隱藏的友誼模式",
        section: "第二節 貓咪老師",
        startPage: 295,
        featured: false
      },
      {
        id: "33",
        number: "33",
        title: "當暴龍老師遇到蝙蝠學生",
        author: "陳逸珊",
        chapter: "第三章 解鎖隱藏的友誼模式",
        section: "第三節 暴龍老師",
        startPage: 301,
        featured: true
      },
      {
        id: "34",
        number: "34",
        title: "當暴龍老師遇到海豚學生",
        author: "陳逸珊",
        chapter: "第三章 解鎖隱藏的友誼模式",
        section: "第三節 暴龍老師",
        startPage: 309,
        featured: false
      },
      {
        id: "35",
        number: "35",
        title: "當暴龍老師遇到水母學生",
        author: "陳逸珊",
        chapter: "第三章 解鎖隱藏的友誼模式",
        section: "第三節 暴龍老師",
        startPage: 315,
        featured: true
      },
      {
        id: "36",
        number: "36",
        title: "當暴龍老師遇到白頰山雀學生",
        author: "陳逸珊",
        chapter: "第三章 解鎖隱藏的友誼模式",
        section: "第三節 暴龍老師",
        startPage: 321,
        featured: false
      }
    ]
  }
];
