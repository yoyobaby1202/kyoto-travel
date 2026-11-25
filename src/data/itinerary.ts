import type { Day } from "../types";
export const days: Day[] = [
  {
    "id": 1,
    "date": "2026-12-10",
    "weekday": "四",
    "title": "抵達京都・伏見稻荷",
    "ja": "京都、はじめまして。",
    "subtitle": "飛向京都，走進千本鳥居",
    "art": "torii",
    "color": "pink",
    "events": [
      {
        "id": "1-1",
        "start": "08:00",
        "end": "10:25",
        "title": "IT210 · 桃園飛往關西",
        "mode": "flight",
        "place": "airport",
        "note": "桃園07:00（台灣時間）起飛 → 關西10:25（日本時間）抵達。依航空公司通知再確認。",
        "status": "預計",
        "fixed": true
      },
      {
        "id": "1-2",
        "start": "10:30",
        "end": "12:00",
        "title": "入境、領行李・機場輕食",
        "mode": "food",
        "place": "airport",
        "note": "入境速度依現場情況；預留購票與前往月台時間。",
        "status": "預計",
        "fixed": false
      },
      {
        "id": "1-3",
        "start": "12:14",
        "end": "13:34",
        "title": "HARUKA 22號 → 京都",
        "mode": "train",
        "place": "kyoto",
        "note": "未訂票；若趕不上，備選24號12:44–14:04，兩班均需核對。",
        "route": "haruka-out",
        "status": "待確認",
        "fixed": true
      },
      {
        "id": "1-4",
        "start": "13:34",
        "end": "14:30",
        "title": "京都站・飯店寄放行李",
        "mode": "hotel",
        "place": "hotel",
        "note": "最早從13:34抵達後開始。入住15:00起，先詢問寄放行李。",
        "status": "預計",
        "fixed": false
      },
      {
        "id": "1-5",
        "start": "14:30",
        "end": "15:00",
        "title": "稍作休息・準備出門",
        "mode": "hotel",
        "place": "hotel",
        "status": "預計",
        "fixed": false
      },
      {
        "id": "1-6",
        "start": "15:00",
        "end": "15:30",
        "title": "JR 奈良線 → 稲荷",
        "mode": "train",
        "place": "inari",
        "note": "含步行與候車。",
        "route": "nara",
        "status": "預計",
        "fixed": false
      },
      {
        "id": "1-7",
        "start": "15:30",
        "end": "16:30",
        "title": "伏見稻荷大社・千本鳥居",
        "mode": "visit",
        "place": "fushimi",
        "status": "預計",
        "fixed": false
      },
      {
        "id": "1-8",
        "start": "16:30",
        "end": "17:30",
        "title": "京阪伏見稲荷 → 祇園四条・前往檸檬牛舌",
        "mode": "train",
        "note": "大社步行至京阪伏見稲荷站，搭往出町柳方向的普通列車至祇園四条；過四条大橋步行至河原町的檸檬牛舌 京都店，含候車與步行。",
        "status": "預計",
        "fixed": false,
        "place": "lemon",
        "route": "inari-gion"
      },
      {
        "id": "1-kawaramachi-free",
        "start": "17:30",
        "end": "18:00",
        "title": "河原町自由散步・逛街",
        "mode": "walk",
        "place": "kawaramachi",
        "status": "預計",
        "fixed": false
      },
      {
        "id": "1-lemon-checkin",
        "start": "18:00",
        "end": "18:30",
        "title": "前往檸檬牛舌・入店緩衝",
        "mode": "walk",
        "place": "lemon",
        "status": "預計",
        "fixed": false,
        "note": "18:30訂位，預留步行與準時入店時間。"
      },
      {
        "id": "1-lemon-dinner",
        "start": "18:30",
        "end": "20:00",
        "title": "檸檬牛舌 京都店・晚餐",
        "mode": "food",
        "note": "已訂位・2人・18:30入店。用餐暫留90分鐘，餐後祇園散步再回飯店。",
        "status": "已確認",
        "fixed": true,
        "meal": true,
        "restaurant": "lemon",
        "reserved": true
      },
      {
        "id": "1-10",
        "start": "20:00",
        "end": "20:30",
        "title": "餐後祇園散步・花見小路",
        "mode": "walk",
        "place": "gion",
        "status": "預計",
        "fixed": false,
        "note": "由檸檬牛舌 京都店步行過四条大橋前往祇園，沿花見小路散步，之後返回飯店。"
      },
      {
        "id": "1-hotel-after-gion",
        "start": "20:30",
        "end": "21:30",
        "title": "祇園 → 七条・返回飯店",
        "mode": "train",
        "status": "預計",
        "fixed": false,
        "place": "hotel",
        "route": "gion-shichijo",
        "note": "京阪祇園四条搭往淀屋橋方向、停靠七条的普通列車；下車後往西步行約20–25分鐘回飯店，全程含步行與候車預留60分鐘。"
      }
    ]
  },
  {
    "id": 2,
    "date": "2026-12-11",
    "weekday": "五",
    "title": "嵐山小火車・保津川遊船",
    "ja": "嵐山の小旅行",
    "subtitle": "沿著山與河，慢慢旅行",
    "art": "train",
    "color": "green",
    "events": [
      {
        "id": "2-1",
        "start": "07:30",
        "end": "08:00",
        "title": "早餐・準備出發",
        "mode": "food",
        "status": "預計",
        "fixed": false,
        "place": "hotel"
      },
      {
        "id": "2-2",
        "start": "08:00",
        "end": "08:40",
        "title": "JR 嵯峨野線 → 嵯峨嵐山",
        "mode": "train",
        "status": "預計",
        "fixed": false,
        "place": "sagajr",
        "route": "sagano",
        "note": "含飯店步行至京都站與候車；往園部／龜岡方向，搭停靠嵯峨嵐山的普通列車。"
      },
      {
        "id": "2-3",
        "start": "08:40",
        "end": "09:00",
        "title": "步行至小火車嵯峨站・乘車準備",
        "mode": "walk",
        "status": "預計",
        "fixed": false,
        "place": "torokko",
        "note": "確認票券、車廂與乘車位置。"
      },
      {
        "id": "2-4",
        "start": "09:02",
        "end": "09:25",
        "title": "嵯峨野觀光小火車 1 號",
        "mode": "train",
        "status": "已確認",
        "fixed": true,
        "place": "kameoka",
        "route": "torokko",
        "note": "已訂位・09:02トロッコ嵯峨出發，09:25抵達トロッコ亀岡。",
        "reserved": true
      },
      {
        "id": "2-6",
        "start": "09:25",
        "end": "10:00",
        "title": "接駁巴士 → 保津川乘船場",
        "mode": "bus",
        "status": "預計",
        "fixed": false,
        "place": "boat",
        "note": "由小火車龜岡站前往站外39系統巴士站。此為步行、候車與接駁的安排時段，實際發車依官方時刻表。"
      },
      {
        "id": "2-7",
        "start": "10:00",
        "end": "10:30",
        "title": "乘船場報到・確認船班",
        "mode": "boat",
        "status": "預計",
        "fixed": false,
        "place": "boat",
        "note": "備妥票券，依現場報到與登船指示。"
      },
      {
        "id": "2-boat-wait",
        "start": "10:30",
        "end": "11:00",
        "title": "休息・等候登船",
        "mode": "boat",
        "status": "預計",
        "fixed": false,
        "place": "boat"
      },
      {
        "id": "2-8",
        "start": "11:00",
        "end": "13:00",
        "title": "保津川遊船・龜岡 → 嵐山",
        "mode": "boat",
        "status": "已確認",
        "fixed": true,
        "place": "boat",
        "note": "已訂位・11:00出發。約2小時，實際航程依河況與天氣調整。",
        "reserved": true
      },
      {
        "id": "2-10",
        "start": "13:00",
        "end": "13:30",
        "title": "下船緩衝・渡月橋散步拍照",
        "mode": "walk",
        "status": "預計",
        "fixed": false,
        "place": "bridge",
        "note": "約13:00抵達，實際下船時間依河況；先在渡月橋北側附近散步。"
      },
      {
        "id": "2-matsugae-checkin",
        "start": "13:30",
        "end": "14:00",
        "title": "步行前往松ヶ枝・入店緩衝",
        "mode": "walk",
        "status": "預計",
        "fixed": false,
        "place": "matsugae",
        "note": "由渡月橋北側步行至松ヶ枝，14:00準時入店。若遊船延誤，先前往餐廳。"
      },
      {
        "id": "2-matsugae-lunch",
        "start": "14:00",
        "end": "15:00",
        "title": "とうふと湯葉 松ヶ枝・午餐",
        "mode": "food",
        "status": "已確認",
        "reserved": true,
        "fixed": true,
        "meal": true,
        "restaurant": "matsugae",
        "note": "已訂位・2位成人・14:00入店。用餐暫留60分鐘，結束時間依現場安排。"
      },
      {
        "id": "2-tenryu",
        "start": "15:00",
        "end": "15:30",
        "title": "天龍寺參觀",
        "mode": "visit",
        "status": "預計",
        "fixed": false,
        "place": "tenryuji",
        "note": "含餐後步行，安排庭園重點參觀；若用餐較久，可縮短或略過，保留竹林散步。"
      },
      {
        "id": "2-11",
        "start": "15:30",
        "end": "16:30",
        "title": "竹林小徑・野宮神社",
        "mode": "walk",
        "status": "預計",
        "fixed": false,
        "place": "bamboo"
      },
      {
        "id": "2-12",
        "start": "16:30",
        "end": "17:30",
        "title": "嵐山商店街・甜點與伴手禮",
        "mode": "walk",
        "status": "預計",
        "fixed": false,
        "place": "bridge"
      },
      {
        "id": "2-13",
        "start": "17:30",
        "end": "18:30",
        "title": "JR 返回京都市區",
        "mode": "train",
        "status": "預計",
        "fixed": false,
        "place": "kyoto",
        "route": "sagano",
        "note": "往京都方向；含步行、候車與移動時間。"
      },
      {
        "id": "2-hiro-walk",
        "start": "18:30",
        "end": "19:15",
        "title": "步行前往弘燒肉 八条口店・用餐緩衝",
        "mode": "walk",
        "status": "預計",
        "fixed": false,
        "place": "hiro",
        "note": "京都站往南側八條口，再步行至八条口店；預留站內穿越與報到時間。"
      },
      {
        "id": "2-hiro-hachijoguchi",
        "start": "19:15",
        "end": "21:15",
        "title": "弘燒肉 八条口店・晚餐",
        "mode": "food",
        "status": "已確認",
        "fixed": true,
        "restaurant": "hiro",
        "meal": true,
        "note": "2位成人｜19:15入店・21:15離店（日本時間）。",
        "reserved": true
      },
      {
        "id": "2-15",
        "start": "21:15",
        "end": "21:45",
        "title": "返回飯店休息",
        "mode": "walk",
        "status": "預計",
        "fixed": false,
        "place": "hotel",
        "note": "用餐後由八條口側返回京都站北側的飯店，預留約30分鐘步行。"
      }
    ]
  },
  {
    "id": 3,
    "date": "2026-12-12",
    "weekday": "六",
    "title": "清水寺・琉璃光院・下鴨散策",
    "ja": "朝の清水、糺の森へ。",
    "subtitle": "清晨清水寺、八瀨庭園與出町柳的悠閒午後",
    "art": "temple",
    "color": "orange",
    "events": [
      {
        "id": "relaxed-breakfast",
        "start": "05:30",
        "end": "06:00",
        "title": "起床・超商早餐・準備出門",
        "mode": "food",
        "status": "預計",
        "fixed": false,
        "note": "早餐可前一晚先買好。"
      },
      {
        "id": "relaxed-taxi-kiyomizu",
        "start": "06:00",
        "end": "06:30",
        "title": "飯店 → 清水寺附近",
        "mode": "taxi",
        "status": "預計",
        "fixed": false,
        "place": "kiyomizu",
        "note": "計程車至清水寺附近可下車處，再步行入寺；本日06:00從飯店出發。"
      },
      {
        "id": "ruri-kiyomizu",
        "start": "06:30",
        "end": "07:30",
        "title": "清水寺・清晨參觀",
        "mode": "visit",
        "status": "預計",
        "fixed": false,
        "place": "kiyomizu",
        "note": "慢慢拍照與欣賞清水舞台。"
      },
      {
        "id": "relaxed-slopes",
        "start": "07:30",
        "end": "08:00",
        "title": "三年坂・二年坂清晨散步",
        "mode": "walk",
        "status": "預計",
        "fixed": false,
        "place": "sannenzaka",
        "note": "以街景拍照為主，多數商店尚未開門。"
      },
      {
        "id": "relaxed-to-yase",
        "start": "08:00",
        "end": "09:30",
        "title": "清水五条 → 出町柳 → 八瀨・琉璃光院",
        "mode": "train",
        "status": "預計",
        "fixed": false,
        "place": "rurikoin",
        "note": "下坡步行至清水五条，搭京阪普通往出町柳，轉叡山本線八瀬比叡山口行，再步行約12分鐘至琉璃光院。含步行、候車與轉乘。",
        "route": "gojo-demachi",
        "connections": [
          "eizan"
        ]
      },
      {
        "id": "relaxed-ruri-queue",
        "start": "09:30",
        "end": "10:00",
        "title": "琉璃光院・排隊與入場緩衝",
        "mode": "visit",
        "status": "預計",
        "fixed": false,
        "place": "rurikoin",
        "note": "10:00開門後依現場排隊入場。"
      },
      {
        "id": "ruri-visit",
        "start": "10:00",
        "end": "11:30",
        "title": "琉璃光院・庭園與書院倒影",
        "mode": "visit",
        "status": "預計",
        "fixed": false,
        "place": "rurikoin",
        "note": "官方秋季開放至2026/12/13，10:00開門；12/12依官方公告不需預約。"
      },
      {
        "id": "relaxed-to-seiken",
        "start": "11:30",
        "end": "12:30",
        "title": "八瀨 → 出町柳・前往生研會館",
        "mode": "train",
        "status": "預計",
        "fixed": false,
        "place": "seiken",
        "note": "步行至八瀨比叡山口，搭叡山本線往出町柳，再步行至生研會館。含候車與步行。",
        "route": "eizan-back"
      },
      {
        "id": "relaxed-seiken-lunch",
        "start": "12:30",
        "end": "13:30",
        "title": "生研會館・午餐",
        "mode": "food",
        "status": "預計",
        "fixed": false,
        "note": "每人預算約¥2,500；用餐暫留60分鐘，候位另計。午餐最後點餐13:30，上午延誤時先確認能否入店。",
        "meal": true,
        "restaurant": "seiken"
      },
      {
        "id": "relaxed-to-shimogamo",
        "start": "13:30",
        "end": "14:00",
        "title": "餐後散步・前往下鴨神社",
        "mode": "walk",
        "status": "預計",
        "fixed": false,
        "place": "shimogamo",
        "note": "保留餐後步行與休息緩衝。"
      },
      {
        "id": "relaxed-shimogamo",
        "start": "14:00",
        "end": "15:30",
        "title": "下鴨神社・糺之森",
        "mode": "visit",
        "status": "預計",
        "fixed": false,
        "place": "shimogamo",
        "note": "慢慢參拜與森林散步；河合神社視體力順遊，不必全部走完。"
      },
      {
        "id": "relaxed-river",
        "start": "15:30",
        "end": "16:00",
        "title": "出町柳・鴨川河邊散步",
        "mode": "walk",
        "status": "預計",
        "fixed": false,
        "place": "demachi",
        "note": "天冷或下雨可直接前往商店街。"
      },
      {
        "id": "relaxed-masugata",
        "start": "16:00",
        "end": "17:00",
        "title": "出町桝形商店街",
        "mode": "walk",
        "status": "預計",
        "fixed": false,
        "place": "masugata",
        "note": "小店、點心與伴手禮，各店營業時間不同。"
      },
      {
        "id": "relaxed-coffee",
        "start": "17:00",
        "end": "18:00",
        "title": "咖啡休息・出町座のソコ",
        "mode": "food",
        "status": "預計",
        "fixed": false,
        "place": "demachiza",
        "note": "出町座のソコ列為候選，保留一小時坐下休息，依當日營業安排。"
      },
      {
        "id": "relaxed-free",
        "start": "18:00",
        "end": "18:30",
        "title": "自由活動・交通緩衝",
        "mode": "walk",
        "status": "預計",
        "fixed": false,
        "place": "masugata",
        "note": "不再增加景點。"
      },
      {
        "id": "3-to-karasemitei",
        "start": "18:30",
        "end": "19:00",
        "title": "計程車前往空蟬庭",
        "mode": "taxi",
        "status": "預計",
        "fixed": false,
        "place": "karasemitei",
        "note": "建議計程車，減少晚間步行；預留候車與市區交通時間。"
      },
      {
        "id": "3-karasemitei-checkin",
        "start": "19:00",
        "end": "19:30",
        "title": "空蟬庭附近・入店緩衝",
        "mode": "walk",
        "status": "預計",
        "fixed": false,
        "place": "karasemitei",
        "note": "19:30準時入店；備妥訂位資訊，2人用餐。"
      },
      {
        "id": "3-karasemitei-dinner",
        "start": "19:30",
        "end": "20:30",
        "title": "空蟬庭・晚餐",
        "mode": "food",
        "status": "已確認",
        "fixed": true,
        "restaurant": "karasemitei",
        "meal": true,
        "note": "已訂位・2人・僅訂座位。餐費當天現場支付；店家座位使用原則1小時，依現場安排。",
        "reserved": true
      },
      {
        "id": "3-hotel-after-karasemitei",
        "start": "20:30",
        "end": "21:00",
        "title": "餐後計程車返回飯店",
        "mode": "taxi",
        "status": "預計",
        "fixed": false,
        "place": "hotel",
        "note": "20:30後依實際用餐結束時間離店；建議計程車回飯店休息。"
      }
    ]
  },
  {
    "id": 4,
    "date": "2026-12-13",
    "weekday": "日",
    "title": "天橋立 × 伊根舟屋一日遊",
    "ja": "海の京都に会いに",
    "subtitle": "搭上巴士，去看海邊的舟屋",
    "art": "sea",
    "color": "blue",
    "events": [
      {
        "id": "3-1",
        "start": "07:00",
        "end": "08:00",
        "title": "早餐",
        "mode": "food",
        "place": "hotel",
        "status": "預計",
        "fixed": false
      },
      {
        "id": "3-2",
        "start": "08:00",
        "end": "08:30",
        "title": "步行至京都站八條東口",
        "mode": "walk",
        "place": "meeting",
        "note": "由車站北側前往南側，留意站內動線。",
        "status": "預計",
        "fixed": false
      },
      {
        "id": "3-3",
        "start": "08:30",
        "end": "09:00",
        "title": "Klook 集合・報到",
        "mode": "bus",
        "place": "meeting",
        "note": "08:45前抵達；09:00集合依提供資訊，精確位置依憑證。",
        "status": "待確認",
        "fixed": true
      },
      {
        "id": "3-4",
        "start": "09:00",
        "end": "11:30",
        "title": "觀光巴士・前往丹後",
        "mode": "bus",
        "place": "ine",
        "note": "車程預估，依旅行社路線與路況調整。",
        "status": "預計",
        "fixed": false
      },
      {
        "id": "3-5",
        "start": "11:30",
        "end": "15:30",
        "title": "伊根・天橋立彈性遊覽時段",
        "mode": "visit",
        "place": "ine",
        "note": "包含伊根舟屋、約30分鐘觀光船、午餐、伊根→天橋立巴士移動及天橋立景點。4小時可能緊湊，順序／停留由導遊決定，非官方保證。",
        "status": "預計",
        "fixed": false
      },
      {
        "id": "3-6",
        "start": "15:30",
        "end": "18:00",
        "title": "觀光巴士・返回京都",
        "mode": "bus",
        "place": "kyoto",
        "note": "旅行社預計17:30–18:00返抵；道路狀況可能延誤。",
        "status": "預計",
        "fixed": false
      },
      {
        "id": "4-to-mishima",
        "start": "18:00",
        "end": "19:00",
        "title": "京都站 → 四条・河原町高島屋",
        "mode": "train",
        "status": "預計",
        "fixed": false,
        "place": "mishima",
        "route": "kyoto-shijo",
        "connections": [
          "karasuma-kawaramachi"
        ],
        "note": "旅行團返回京都後，地下鐵京都往國際會館方向至四条，步行轉阪急烏丸往京都河原町，出站直達京都高島屋，前往7樓。含轉乘與步行。"
      },
      {
        "id": "4-mishima-dinner",
        "start": "19:00",
        "end": "20:30",
        "title": "三嶋亭 高島屋店・晚餐",
        "mode": "food",
        "status": "預計",
        "fixed": false,
        "restaurant": "mishima",
        "meal": true,
        "note": "19:00左右到店現場候位，不接受訂位；用餐及結束時間依現場候位調整。餐後直接回飯店休息。"
      },
      {
        "id": "4-hotel-after-mishima",
        "start": "20:30",
        "end": "21:30",
        "title": "河原町 → 京都・回飯店休息",
        "mode": "train",
        "status": "預計",
        "fixed": false,
        "place": "hotel",
        "route": "hankyu-return",
        "connections": [
          "shijo-kyoto"
        ],
        "note": "阪急京都河原町往大阪梅田方向至烏丸，步行轉地下鐵四条往竹田方向至京都，再步行回飯店。餐後不另安排散步。"
      }
    ]
  },
  {
    "id": 5,
    "date": "2026-12-14",
    "weekday": "一",
    "title": "最後散策・帶京都回家",
    "ja": "またね、京都。",
    "subtitle": "把回憶裝進行李，下一次再見",
    "art": "town",
    "color": "pink",
    "events": [
      {
        "id": "5-1",
        "start": "08:00",
        "end": "09:00",
        "title": "早餐",
        "mode": "food",
        "place": "hotel",
        "status": "預計",
        "fixed": false
      },
      {
        "id": "5-2",
        "start": "09:00",
        "end": "10:00",
        "title": "整理行李・退房寄放",
        "mode": "hotel",
        "place": "hotel",
        "note": "飯店10:00退房，確認領取行李時間。",
        "status": "預計",
        "fixed": false
      },
      {
        "id": "5-3",
        "start": "10:00",
        "end": "11:30",
        "title": "京都 Porta・伊勢丹購物",
        "mode": "visit",
        "place": "porta",
        "status": "預計",
        "fixed": false
      },
      {
        "id": "5-4",
        "start": "11:30",
        "end": "12:30",
        "title": "午餐",
        "mode": "food",
        "status": "預計",
        "fixed": false,
        "meal": true
      },
      {
        "id": "5-5",
        "start": "12:30",
        "end": "13:30",
        "title": "最後採買・回飯店領行李",
        "mode": "walk",
        "place": "hotel",
        "status": "預計",
        "fixed": false
      },
      {
        "id": "5-6",
        "start": "13:30",
        "end": "14:00",
        "title": "京都站・HARUKA 乘車準備",
        "mode": "walk",
        "place": "kyoto",
        "note": "備妥票券，確認8號車乘車位置；月台依當日電子看板。",
        "status": "預計",
        "fixed": false
      },
      {
        "id": "5-7",
        "start": "14:00",
        "end": "15:20",
        "title": "HARUKA 33號 → 關西機場",
        "mode": "train",
        "place": "airport",
        "note": "已訂位・8號車・10C／10D。14:00京都出發，15:20抵達關西機場（日本時間）。",
        "route": "haruka-back",
        "status": "已確認",
        "fixed": true,
        "reserved": true
      },
      {
        "id": "5-8",
        "start": "15:30",
        "end": "17:30",
        "title": "機場報到・托運・安檢",
        "mode": "flight",
        "place": "airport",
        "note": "抵達至報到間保留10分鐘移動，實際航廈與櫃檯依航空公司公告。",
        "status": "預計",
        "fixed": false
      },
      {
        "id": "5-9",
        "start": "17:30",
        "end": "18:30",
        "title": "晚餐・機場輕食",
        "mode": "food",
        "place": "airport",
        "note": "依登機時間提早結束用餐；不要等到18:30才前往登機門。",
        "status": "預計",
        "fixed": false,
        "meal": true
      },
      {
        "id": "5-10",
        "start": "18:55",
        "end": "22:15",
        "title": "IT213 · 關西飛往桃園",
        "mode": "flight",
        "place": "taoyuan",
        "note": "關西18:55（日本時間）起飛 → 桃園21:15（台灣時間）抵達。依航空公司通知再確認。",
        "status": "預計",
        "fixed": true
      }
    ]
  }
];
export const tourStops = ["ine","ineboat","inepark","view","chion","kaisen","sand"];

