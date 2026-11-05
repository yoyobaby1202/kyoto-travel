export interface MapStop {
  x: number;
  y: number;
  name: string;
  note: string;
  art: string;
}
export interface MapLeg {
  path: string;
  x: number;
  y: number;
  text: string;
  kind: "rail" | "walk" | "bus" | "flight";
}
export interface JourneyMapData {
  region: string;
  stops: MapStop[];
  legs: MapLeg[];
  notes: string[];
  flight?: string;
}
export const journeyMaps: Record<number, JourneyMapData> = {
  1: {
    region: "台灣 → 關西 → 京都・伏見",
    stops: [
      {
        x: 170,
        y: 210,
        name: "桃園機場",
        note: "07:00 起飛・台灣時間",
        art: "airport",
      },
      {
        x: 440,
        y: 510,
        name: "關西機場",
        note: "10:25 抵達・日本時間",
        art: "airport",
      },
      {
        x: 960,
        y: 470,
        name: "京都站",
        note: "目標13:34抵達後再出站",
        art: "station",
      },
      {
        x: 920,
        y: 800,
        name: "androoms 京都七条",
        note: "寄放行李・稍作休息",
        art: "hotel",
      },
      {
        x: 450,
        y: 900,
        name: "JR 稲荷站",
        note: "京都 → 東福寺 → 稲荷",
        art: "station",
      },
      {
        x: 260,
        y: 1160,
        name: "伏見稻荷大社",
        note: "15:30–17:00・千本鳥居",
        art: "torii",
      },
      {
        x: 850,
        y: 1170,
        name: "晚餐待定・返回飯店",
        note: "18:00–19:30・可自行設定餐廳",
        art: "food",
      },
    ],
    legs: [
      {
        path: "M170 255Q170 430 440 510",
        x: 75,
        y: 365,
        text: "IT210・台灣虎航",
        kind: "flight",
      },
      {
        path: "M510 510Q700 500 900 470",
        x: 590,
        y: 410,
        text: "HARUKA 22號（待核對）",
        kind: "rail",
      },
      {
        path: "M960 550V720",
        x: 970,
        y: 660,
        text: "步行至飯店",
        kind: "walk",
      },
      {
        path: "M860 800Q700 800 470 870",
        x: 525,
        y: 755,
        text: "回京都站搭 JR 奈良線普通",
        kind: "rail",
      },
      {
        path: "M430 960 290 1080",
        x: 350,
        y: 1040,
        text: "步行",
        kind: "walk",
      },
      {
        path: "M330 1160H780",
        x: 460,
        y: 1120,
        text: "晚餐選定後安排交通",
        kind: "walk",
      },
    ],
    flight: "M170 255Q170 430 440 510",
    notes: [
      "HARUKA 目標12:14–13:34；備選24號12:44–14:04。兩班未訂票、待核對。",
      "JR奈良線往奈良方向，確實停靠稲荷的普通列車：2區間・中途1站。",
      "乘車約5–6分；15:00–15:30包含飯店步行、候車與車站移動。",
    ],
  },
  3: {
    region: "京都站 → 丹後海岸・伊根與天橋立",
    stops: [
      {
        x: 250,
        y: 230,
        name: "伊根舟屋",
        note: "舟屋散策・船谷部展望台",
        art: "boathouse",
      },
      {
        x: 850,
        y: 300,
        name: "伊根灣觀光船",
        note: "約30分・Ine Cafe周邊依團安排",
        art: "boat",
      },
      {
        x: 900,
        y: 660,
        name: "舟屋之里公園",
        note: "景點順序與停留由導遊調整",
        art: "park",
      },
      {
        x: 300,
        y: 710,
        name: "天橋立 Viewland",
        note: "展望台・飛龍觀景色",
        art: "view",
      },
      {
        x: 350,
        y: 1040,
        name: "智恩寺・迴旋橋・沙洲",
        note: "依旅行團自由活動時間散策",
        art: "bridge",
      },
      {
        x: 950,
        y: 1130,
        name: "京都站八條東口",
        note: "08:45前抵達・09:00依憑證集合",
        art: "station",
      },
    ],
    legs: [
      {
        path: "M950 1040Q1110 200 350 230",
        x: 590,
        y: 130,
        text: "去程觀光巴士・車程概估2.5小時",
        kind: "bus",
      },
      {
        path: "M330 260Q570 340 770 300",
        x: 450,
        y: 350,
        text: "團體安排・步行／接駁",
        kind: "walk",
      },
      {
        path: "M850 400V570",
        x: 890,
        y: 505,
        text: "伊根彈性遊覽",
        kind: "walk",
      },
      {
        path: "M810 660H400",
        x: 430,
        y: 595,
        text: "伊根 → 天橋立・觀光巴士移動",
        kind: "bus",
      },
      {
        path: "M300 800V950",
        x: 80,
        y: 890,
        text: "團體安排・步行",
        kind: "walk",
      },
      {
        path: "M430 1070Q650 1180 860 1130",
        x: 480,
        y: 1040,
        text: "觀光巴士返回京都",
        kind: "bus",
      },
    ],
    notes: [
      "11:30–15:30為彈性時段，包含午餐、遊覽及伊根→天橋立車程。",
      "圖上順序僅為示意，非Klook保證行程；預計17:30–18:00回京都。",
      "本日全程依旅行團安排，不需一般電車轉乘。晚餐待定。",
    ],
  },
  4: {
    region: "京都站 → 東山步行散策 → 河原町",
    stops: [
      {
        x: 920,
        y: 1040,
        name: "清水寺",
        note: "09:30–11:00・清水舞台",
        art: "temple",
      },
      {
        x: 930,
        y: 760,
        name: "三年坂・二年坂",
        note: "11:00–12:00・午餐待定",
        art: "town",
      },
      {
        x: 930,
        y: 470,
        name: "高台寺・寧寧之道",
        note: "13:00–14:00",
        art: "temple",
      },
      {
        x: 750,
        y: 180,
        name: "八坂神社・圓山公園",
        note: "14:00–15:00",
        art: "torii",
      },
      {
        x: 340,
        y: 380,
        name: "祇園・花見小路",
        note: "15:00–16:30・尊重私人巷道",
        art: "town",
      },
      {
        x: 250,
        y: 690,
        name: "河原町",
        note: "17:00–18:00・逛街自由活動",
        art: "shop",
      },
      {
        x: 260,
        y: 970,
        name: "檸檬牛舌 京都店",
        note: "18:30–19:30・未確認訂位",
        art: "food",
      },
      {
        x: 530,
        y: 1170,
        name: "京都站・androoms",
        note: "08:30出發・19:30後返回",
        art: "station",
      },
    ],
    legs: [
      {
        path: "M620 1190Q820 1210 900 1125",
        x: 710,
        y: 1215,
        text: "去程巴士＋上坡步行",
        kind: "bus",
      },
      { path: "M940 960V845", x: 960, y: 910, text: "步行", kind: "walk" },
      { path: "M930 680V555", x: 950, y: 620, text: "步行", kind: "walk" },
      { path: "M900 390 790 260", x: 860, y: 340, text: "步行", kind: "walk" },
      { path: "M670 220 400 350", x: 440, y: 260, text: "步行", kind: "walk" },
      {
        path: "M320 465 270 600",
        x: 110,
        y: 550,
        text: "步行至河原町",
        kind: "walk",
      },
      {
        path: "M250 780V885",
        x: 60,
        y: 845,
        text: "18:00起步行＋緩衝",
        kind: "walk",
      },
      {
        path: "M300 1055Q320 1150 470 1180",
        x: 70,
        y: 1150,
        text: "阪急 → 地下鐵 → 步行",
        kind: "rail",
      },
    ],
    notes: [
      "京都站→清水寺預留60分，包含巴士候車與上坡步行；班次依當日查核。",
      "回程阪急京都河原町→烏丸：往大阪梅田方向，1區間・無中途站。",
      "步行轉四条→五条→京都：烏丸線往京都・竹田方向，2區間・中途1站。",
    ],
  },
  5: {
    region: "京都站周邊 → 關西機場 → 台灣",
    stops: [
      {
        x: 900,
        y: 230,
        name: "androoms 京都七条",
        note: "09:00–10:00退房・寄放行李",
        art: "hotel",
      },
      {
        x: 350,
        y: 400,
        name: "京都 Porta・伊勢丹",
        note: "10:00購物・11:30午餐",
        art: "shop",
      },
      {
        x: 920,
        y: 640,
        name: "飯店領行李",
        note: "12:30–13:30・最後採買",
        art: "hotel",
      },
      {
        x: 600,
        y: 850,
        name: "京都站・HARUKA",
        note: "13:30–14:00乘車準備",
        art: "station",
      },
      {
        x: 850,
        y: 1120,
        name: "關西機場",
        note: "目標15:20抵達・報到安檢",
        art: "airport",
      },
      {
        x: 200,
        y: 1170,
        name: "桃園機場",
        note: "21:15 抵達・台灣時間",
        art: "airport",
      },
    ],
    legs: [
      {
        path: "M820 260 430 400",
        x: 450,
        y: 260,
        text: "步行至京都站周邊",
        kind: "walk",
      },
      {
        path: "M420 460Q650 650 840 640",
        x: 460,
        y: 560,
        text: "步行回飯店取行李",
        kind: "walk",
      },
      {
        path: "M850 700 670 820",
        x: 770,
        y: 780,
        text: "步行至京都站",
        kind: "walk",
      },
      {
        path: "M650 935 820 1040",
        x: 680,
        y: 980,
        text: "HARUKA 往關西機場",
        kind: "rail",
      },
      {
        path: "M780 1150Q500 1050 250 1160",
        x: 400,
        y: 1200,
        text: "IT213・18:55日本起飛",
        kind: "flight",
      },
    ],
    flight: "M780 1150Q500 1050 250 1160",
    notes: [
      "HARUKA 33號目標14:00–15:20；班號、時刻待核對，尚未訂票。",
      "15:30–17:30機場報到、托運與安檢；晚餐依實際登機時間調整。",
      "18:55關西起飛（日本時間）→21:15桃園抵達（台灣時間）。",
    ],
  },
};
