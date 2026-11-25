export interface MapStop {
  x: number;
  y: number;
  name: string;
  note: string;
  art: string;
  geo?: string;
  labelDx?: number;
  labelDy?: number;
}
export interface MapLeg {
  path: string;
  x: number;
  y: number;
  text: string;
  kind: "taxi" | "rail" | "walk" | "bus" | "flight" | "boat";
}
export interface JourneyMapData {
  region: string;
  stops: MapStop[];
  legs: MapLeg[];
  notes: string[];
  flight?: string;
}
export const journeyMaps: Record<number, JourneyMapData> = {
  "1": {
    "region": "北朝上・台灣／關西／京都分區縮尺",
    "stops": [
      {
        "x": 160,
        "y": 1190,
        "name": "桃園機場",
        "note": "07:00起飛・台灣時間",
        "art": "airport",
        "geo": "taoyuan"
      },
      {
        "x": 480,
        "y": 1010,
        "name": "關西機場",
        "note": "10:25抵達・日本時間",
        "art": "airport",
        "geo": "kix"
      },
      {
        "x": 850,
        "y": 450,
        "name": "京都站",
        "note": "日本・北側為京都市區",
        "art": "station",
        "geo": "kyoto"
      },
      {
        "x": 760,
        "y": 270,
        "name": "androoms 京都七条",
        "note": "京都站西北側・步行可達",
        "art": "hotel",
        "geo": "hotel"
      },
      {
        "x": 920,
        "y": 900,
        "name": "JR 稲荷站",
        "note": "京都 → 東福寺 → 稲荷",
        "art": "station",
        "geo": "inari"
      },
      {
        "x": 1030,
        "y": 740,
        "name": "伏見稻荷大社",
        "note": "15:30–16:30・千本鳥居",
        "art": "torii",
        "geo": "fushimi"
      }
    ],
    "legs": [
      {
        "path": "M160 1160Q200 1080 480 960",
        "x": 180,
        "y": 1060,
        "text": "IT210・跨海前往日本",
        "kind": "flight"
      },
      {
        "path": "M510 960Q620 700 830 500",
        "x": 540,
        "y": 680,
        "text": "HARUKA → 京都",
        "kind": "rail"
      },
      {
        "path": "M830 410 780 320",
        "x": 500,
        "y": 370,
        "text": "步行・飯店在西北側",
        "kind": "walk"
      },
      {
        "path": "M840 510Q850 700 910 850",
        "x": 630,
        "y": 810,
        "text": "JR奈良線普通・往奈良",
        "kind": "rail"
      },
      {
        "path": "M950 860 1010 800",
        "x": 980,
        "y": 850,
        "text": "步行至大社",
        "kind": "walk"
      }
    ],
    "flight": "M160 1160Q200 1080 480 960",
    "notes": [
      "HARUKA 目標12:14–13:34；備選24號12:44–14:04。兩班未訂票、待核對。",
      "JR奈良線往奈良方向，確實停靠稲荷的普通列車：2區間・中途1站。",
      "乘車約5–6分；15:00–15:30包含飯店步行、候車與車站移動。",
      "16:30京阪伏見稲荷→祇園四条；18:30檸檬牛舌 京都店晚餐・2人已訂位，餐後祇園散步再回飯店。"
    ]
  },
  "2": {
    "region": "北朝上・龜岡在嵯峨西南方，京都站在東南方",
    "stops": [
      {
        "x": 1080,
        "y": 1170,
        "name": "京都站",
        "note": "JR 嵯峨野線出發／返回",
        "art": "station",
        "geo": "kyoto"
      },
      {
        "x": 970,
        "y": 360,
        "name": "JR 嵯峨嵐山站",
        "note": "JR普通",
        "art": "station",
        "geo": "sagajr",
        "labelDx": 100,
        "labelDy": -180
      },
      {
        "x": 850,
        "y": 400,
        "name": "小火車嵯峨站",
        "note": "09:02出發・已訂位",
        "art": "train",
        "geo": "sagatorokko",
        "labelDx": -80,
        "labelDy": 50
      },
      {
        "x": 330,
        "y": 850,
        "name": "小火車龜岡站",
        "note": "09:25抵達目標",
        "art": "station",
        "geo": "kameoka"
      },
      {
        "x": 140,
        "y": 620,
        "name": "保津川乘船場",
        "note": "接駁目的地・船班報到",
        "art": "boathouse",
        "geo": "boat"
      },
      {
        "x": 700,
        "y": 1000,
        "name": "嵐山下船・渡月橋",
        "note": "約13:00下船・14:00松ヶ枝午餐",
        "art": "bridge",
        "geo": "bridge"
      },
      {
        "x": 580,
        "y": 550,
        "name": "竹林小徑・野宮神社",
        "note": "位於JR站西南側",
        "art": "bamboo",
        "geo": "nonomiya"
      },
      {
        "x": 1020,
        "y": 1100,
        "name": "京都七条飯店",
        "note": "androoms・京都站西北側",
        "art": "pin",
        "geo": "hotel",
        "labelDx": -200,
        "labelDy": -90
      }
    ],
    "legs": [
      {
        "path": "M1080 1110Q1120 750 990 420",
        "x": 960,
        "y": 850,
        "text": "JR嵯峨野線",
        "kind": "rail"
      },
      {
        "path": "M940 370 890 400",
        "x": 835,
        "y": 300,
        "text": "相鄰步行轉乘",
        "kind": "walk"
      },
      {
        "path": "M850 400Q740 170 550 280T330 810",
        "x": 380,
        "y": 220,
        "text": "小火車往龜岡・3區間／中途2站",
        "kind": "rail"
      },
      {
        "path": "M290 800Q190 750 150 690",
        "x": 50,
        "y": 780,
        "text": "39系統接駁巴士",
        "kind": "bus"
      },
      {
        "path": "M160 620C220 450 260 180 500 180S650 620 700 960",
        "x": 250,
        "y": 430,
        "text": "保津川遊船・順流回嵐山",
        "kind": "boat"
      },
      {
        "path": "M680 940 590 620",
        "x": 520,
        "y": 790,
        "text": "步行・渡月橋 → 竹林",
        "kind": "walk"
      },
      {
        "path": "M650 550Q810 550 940 410",
        "x": 720,
        "y": 600,
        "text": "步行回JR站",
        "kind": "walk"
      }
    ],
    "notes": [
      "JR普通：去程往園部方向／回程往京都，7區間・中途6站，乘車約17–20分。",
      "小火車已訂位09:02–09:25；接駁安排09:25–10:00。14:00松ヶ枝午餐・2位已訂位。",
      "遊船已訂位11:00出發，約13:00抵達；航程依河況與天氣調整。",
      "17:30–18:30返回京都市區 → 19:15–21:15弘燒肉 八条口店・成人2位。"
    ]
  },
  "3": {
    "region": "北朝上・清水寺→八瀨→下鴨・出町柳",
    "stops": [
      {
        "geo": "hotel",
        "name": "androoms 京都七条",
        "note": "06:00出發",
        "art": "hotel",
        "x": 185,
        "y": 1090
      },
      {
        "geo": "kiyomizu",
        "name": "清水寺",
        "note": "06:30–07:30",
        "art": "temple",
        "x": 865,
        "y": 1000
      },
      {
        "geo": "sannenzaka",
        "name": "三年坂・二年坂",
        "note": "07:30清晨散步",
        "art": "town",
        "x": 780,
        "y": 820
      },
      {
        "geo": "kiyomizu-gojo",
        "name": "清水五条",
        "note": "京阪上車",
        "art": "station",
        "x": 270,
        "y": 910
      },
      {
        "geo": "demachi",
        "name": "出町柳",
        "note": "轉叡山／返回市區",
        "art": "station",
        "x": 610,
        "y": 460
      },
      {
        "geo": "yase",
        "name": "八瀨比叡山口",
        "note": "叡山下車",
        "art": "station",
        "x": 950,
        "y": 100
      },
      {
        "geo": "rurikoin",
        "name": "琉璃光院",
        "note": "10:00–11:30",
        "art": "temple",
        "x": 1035,
        "y": 190
      },
      {
        "geo": "seiken",
        "name": "生研會館",
        "note": "12:30午餐・尚未訂位",
        "art": "food",
        "x": 525,
        "y": 370
      },
      {
        "geo": "shimogamo",
        "name": "下鴨神社・糺之森",
        "note": "14:00–15:30",
        "art": "temple",
        "x": 695,
        "y": 280
      },
      {
        "geo": "masugata",
        "name": "出町桝形商店街",
        "note": "16:00–17:00",
        "art": "town",
        "x": 440,
        "y": 640
      },
      {
        "geo": "demachiza",
        "name": "出町座のソコ",
        "note": "17:00咖啡休息・候選",
        "art": "town",
        "x": 355,
        "y": 550
      },
      {
        "geo": "karasemitei",
        "name": "空蟬庭",
        "note": "19:30・2人已訂位",
        "art": "food",
        "x": 100,
        "y": 730
      }
    ],
    "legs": [
      {
        "path": "M185 1090L865 1000",
        "x": 525,
        "y": 1045,
        "text": "06:00計程車",
        "kind": "taxi"
      },
      {
        "path": "M865 1000L270 910",
        "x": 567.5,
        "y": 955,
        "text": "下坡步行",
        "kind": "walk"
      },
      {
        "path": "M270 910L610 460",
        "x": 440,
        "y": 685,
        "text": "京阪往出町柳・4區間",
        "kind": "rail"
      },
      {
        "path": "M610 460L950 100",
        "x": 780,
        "y": 280,
        "text": "叡山往八瀨比叡山口・7區間",
        "kind": "rail"
      },
      {
        "path": "M950 100L1035 190",
        "x": 992.5,
        "y": 145,
        "text": "步行約12分鐘",
        "kind": "walk"
      },
      {
        "path": "M950 100L610 460",
        "x": 780,
        "y": 280,
        "text": "叡山回出町柳・7區間",
        "kind": "rail"
      },
      {
        "path": "M610 460L525 370",
        "x": 567.5,
        "y": 415,
        "text": "步行至午餐",
        "kind": "walk"
      },
      {
        "path": "M525 370L695 280",
        "x": 610,
        "y": 325,
        "text": "餐後散步",
        "kind": "walk"
      },
      {
        "path": "M695 280L440 640",
        "x": 567.5,
        "y": 460,
        "text": "步行散策",
        "kind": "walk"
      },
      {
        "path": "M440 640L355 550",
        "x": 397.5,
        "y": 595,
        "text": "咖啡休息",
        "kind": "walk"
      },
      {
        "path": "M355 550L100 730",
        "x": 227.5,
        "y": 640,
        "text": "18:30計程車",
        "kind": "taxi"
      },
      {
        "path": "M100 730L185 1090",
        "x": 142.5,
        "y": 910,
        "text": "餐後計程車",
        "kind": "taxi"
      }
    ],
    "notes": [
      "06:00飯店出發・06:30清水寺・10:00琉璃光院",
      "京阪清水五条→出町柳4區間；叡山往八瀨比叡山口／回出町柳各7區間",
      "12:30生研會館午餐尚未訂位；午後下鴨神社、糺之森、出町桝形商店街與咖啡",
      "18:30建議計程車前往空蟬庭，19:30已訂位；餐後計程車返回飯店"
    ]
  },
  "4": {
    "region": "北朝上・伊根在天橋立東北方，京都在東南方",
    "stops": [
      {
        "x": 740,
        "y": 350,
        "name": "伊根舟屋",
        "note": "舟屋散策・展望景點依團安排",
        "art": "boathouse",
        "geo": "ine"
      },
      {
        "x": 550,
        "y": 500,
        "name": "伊根灣觀光船",
        "note": "約30分鐘・日出乘船場",
        "art": "boat",
        "geo": "ineboat"
      },
      {
        "x": 900,
        "y": 180,
        "name": "舟屋之里公園",
        "note": "位於舟屋聚落東北側高台",
        "art": "park",
        "geo": "inepark"
      },
      {
        "x": 200,
        "y": 1020,
        "name": "天橋立 Viewland",
        "note": "位於智恩寺西南側山上",
        "art": "view",
        "geo": "view"
      },
      {
        "x": 350,
        "y": 810,
        "name": "智恩寺",
        "note": "文珠地區・沙洲南側",
        "art": "temple",
        "geo": "chion"
      },
      {
        "x": 460,
        "y": 650,
        "name": "迴旋橋・天橋立沙洲",
        "note": "智恩寺東北側・橋接沙洲",
        "art": "bridge",
        "geo": "kaisen"
      },
      {
        "x": 1000,
        "y": 1180,
        "name": "京都站八條東口",
        "note": "08:45前抵達・09:00依憑證集合",
        "art": "station",
        "geo": "kyoto"
      }
    ],
    "legs": [
      {
        "path": "M980 1100Q1150 600 800 390",
        "x": 970,
        "y": 690,
        "text": "觀光巴士",
        "kind": "bus"
      },
      {
        "path": "M700 400 590 460",
        "x": 520,
        "y": 420,
        "text": "伊根灣遊覽",
        "kind": "walk"
      },
      {
        "path": "M770 310 860 220",
        "x": 590,
        "y": 260,
        "text": "伊根彈性景點",
        "kind": "walk"
      },
      {
        "path": "M520 550Q300 550 240 940",
        "x": 75,
        "y": 650,
        "text": "伊根 ↔ 天橋立・觀光巴士",
        "kind": "bus"
      },
      {
        "path": "M230 960 320 860",
        "x": 80,
        "y": 900,
        "text": "步行／團體安排",
        "kind": "walk"
      },
      {
        "path": "M380 760 440 710",
        "x": 250,
        "y": 730,
        "text": "步行至橋與沙洲",
        "kind": "walk"
      },
      {
        "path": "M400 850Q650 1100 950 1160",
        "x": 530,
        "y": 1110,
        "text": "返回京都・觀光巴士",
        "kind": "bus"
      }
    ],
    "notes": [
      "11:30–15:30為彈性時段，包含午餐、遊覽及伊根→天橋立車程。",
      "圖上順序僅為示意，非Klook保證行程；預計17:30–18:00回京都。",
      "白天依旅行團安排；返京都後地下鐵轉阪急至河原町，19:00左右三嶋亭高島屋店現場候位，餐後回飯店。",
      "伊根灣乘船場在舟屋聚落西南側；景點順序仍由旅行團決定。"
    ]
  },
  "5": {
    "region": "北朝上・京都／關西／台灣分區縮尺",
    "stops": [
      {
        "x": 760,
        "y": 270,
        "name": "androoms 京都七条",
        "note": "09:00–10:00退房・12:30後領行李",
        "art": "hotel",
        "geo": "hotel"
      },
      {
        "x": 850,
        "y": 450,
        "name": "京都站",
        "note": "Porta／伊勢丹購物・13:30乘車準備",
        "art": "station",
        "geo": "kyoto"
      },
      {
        "x": 480,
        "y": 1010,
        "name": "關西機場",
        "note": "目標15:20抵達・15:30起報到安檢",
        "art": "airport",
        "geo": "kix"
      },
      {
        "x": 160,
        "y": 1190,
        "name": "桃園機場",
        "note": "21:15抵達・台灣時間",
        "art": "airport",
        "geo": "taoyuan"
      }
    ],
    "legs": [
      {
        "path": "M780 320 830 400",
        "x": 510,
        "y": 360,
        "text": "飯店 ↔ 京都站周邊・步行",
        "kind": "walk"
      },
      {
        "path": "M830 500Q630 720 510 960",
        "x": 535,
        "y": 710,
        "text": "HARUKA → 關西機場",
        "kind": "rail"
      },
      {
        "path": "M480 960Q200 1080 160 1160",
        "x": 150,
        "y": 1060,
        "text": "IT213・跨海返回台灣",
        "kind": "flight"
      }
    ],
    "flight": "M480 960Q200 1080 160 1160",
    "notes": [
      "HARUKA 33號14:00–15:20・已訂位・8號車10C／10D。",
      "15:30–17:30機場報到、托運與安檢；晚餐依實際登機時間調整。",
      "18:55關西起飛（日本時間）→21:15桃園抵達（台灣時間）。",
      "10:00購物、11:30午餐，領行李後再前往京都站。"
    ]
  }
};
