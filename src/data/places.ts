import type { Place, Restaurant } from "../types";
export const hotel: Place = {
  "id": "hotel",
  "name": "hotel androoms Kyoto Shichijo",
  "ja": "ホテル・アンドルームス京都七条",
  "query": "ホテル・アンドルームス京都七条 京都市下京区夷之町730",
  "official": "https://www.hotel-androoms.com/aks/",
  "description": "這幾天，京都的小小歸宿。京都站步行圈，回到暖暖的房間休息。",
  "duration": "12/10–12/14 · 4晚 · 2位成人",
  "art": "town",
  "note": "地址：京都府京都市下京区夷之町730｜電話：+81-75-353-5700｜15:00入住、10:00退房。依提供資訊訂房已確認、房費已支付，適用住宿稅現場另付。"
};
export const places: Place[] = [
  {
    "id": "hotel",
    "name": "hotel androoms Kyoto Shichijo",
    "ja": "ホテル・アンドルームス京都七条",
    "query": "ホテル・アンドルームス京都七条 京都市下京区夷之町730",
    "official": "https://www.hotel-androoms.com/aks/",
    "description": "這幾天，京都的小小歸宿。京都站步行圈，回到暖暖的房間休息。",
    "duration": "12/10–12/14 · 4晚 · 2位成人",
    "art": "town",
    "note": "地址：京都府京都市下京区夷之町730｜電話：+81-75-353-5700｜15:00入住、10:00退房。依提供資訊訂房已確認、房費已支付，適用住宿稅現場另付。"
  },
  {
    "id": "kyoto",
    "name": "京都站",
    "ja": "京都駅",
    "query": "京都駅 JR 京都市",
    "description": "旅途的起點，也是每天回家的方向。",
    "duration": "依轉乘而定",
    "art": "train",
    "official": "https://www.jr-odekake.net/eki/top?id=0610116"
  },
  {
    "id": "airport",
    "name": "關西國際機場",
    "ja": "関西国際空港",
    "query": "関西国際空港 第1ターミナル",
    "description": "抵達日本與返程報到；航廈以航空公司通知為準。",
    "duration": "保留報到緩衝",
    "art": "train",
    "official": "https://www.kansai-airport.or.jp/"
  },
  {
    "id": "taoyuan",
    "name": "桃園國際機場",
    "ja": "台湾桃園国際空港",
    "query": "臺灣桃園國際機場",
    "description": "航班時間依航空公司最新通知。",
    "duration": "依航班",
    "art": "train",
    "official": "https://www.tigerairtw.com/"
  },
  {
    "id": "fushimi",
    "name": "伏見稻荷大社",
    "ja": "伏見稲荷大社",
    "query": "伏見稲荷大社 京都市伏見区深草藪之内町68",
    "description": "走進朱紅鳥居，收藏京都的第一個午後。",
    "duration": "90分鐘",
    "art": "torii",
    "official": "https://inari.jp/",
    "note": "冬季天黑較早，山路依體力折返，不安排夜間登頂。"
  },
  {
    "id": "inari",
    "name": "JR 稻荷站",
    "ja": "稲荷駅",
    "query": "稲荷駅 JR 奈良線 京都",
    "description": "下車後步行前往伏見稻荷大社。",
    "duration": "步行約5分鐘",
    "art": "train"
  },
  {
    "id": "saga",
    "name": "嵯峨嵐山站",
    "ja": "嵯峨嵐山駅",
    "query": "嵯峨嵐山駅 JR 京都",
    "description": "JR 嵯峨野線下車後，步行轉乘觀光小火車。",
    "duration": "轉乘預留10–15分鐘",
    "art": "train"
  },
  {
    "id": "torokko",
    "name": "小火車嵯峨站",
    "ja": "トロッコ嵯峨駅",
    "query": "トロッコ嵯峨駅 京都",
    "description": "乘著小火車，沿保津峽慢慢前進。",
    "duration": "報到預留30分鐘",
    "art": "train",
    "official": "https://www.sagano-kanko.co.jp/"
  },
  {
    "id": "kameoka",
    "name": "小火車龜岡站",
    "ja": "トロッコ亀岡駅",
    "query": "トロッコ亀岡駅 亀岡市",
    "description": "抵達後前往站外巴士站，轉乘39系統。",
    "duration": "步行及候車緩衝",
    "art": "train",
    "official": "https://www.keihankyotokotsu.jp/bustimetable/timetable.php?no=1&stop_cd=2050"
  },
  {
    "id": "boat",
    "name": "保津川遊船乘船場",
    "ja": "保津川下り乗船場",
    "query": "保津川下り乗船場 亀岡市保津町下中島2",
    "description": "從龜岡順流而下，在山谷與河水之間慢遊。",
    "duration": "約2小時，依河況",
    "art": "river",
    "official": "https://www.hozugawakudari.jp/",
    "note": "12月冬季船班與報到期限待核對；天候、河況可能停航。"
  },
  {
    "id": "bridge",
    "name": "嵐山渡月橋",
    "ja": "渡月橋",
    "query": "渡月橋 京都 嵐山",
    "description": "橋、山、流水，是一起走過的京都風景。",
    "duration": "30分鐘",
    "art": "river",
    "official": "https://www.arashiyamahoshokai.com/"
  },
  {
    "id": "bamboo",
    "name": "竹林小徑",
    "ja": "竹林の小径",
    "query": "嵐山 竹林の小径 京都",
    "description": "在竹葉的聲音裡，慢慢散步。",
    "duration": "45–60分鐘",
    "art": "bamboo"
  },
  {
    "id": "nonomiya",
    "name": "野宮神社",
    "ja": "野宮神社",
    "query": "野宮神社 京都市右京区嵯峨野宮町1",
    "description": "竹林旁的小小神社，留一個溫柔的願望。",
    "duration": "20分鐘",
    "art": "bamboo",
    "official": "https://www.nonomiya.com/"
  },
  {
    "id": "meeting",
    "name": "Klook 集合地點",
    "ja": "京都駅八条東口 観光バス駐車場",
    "query": "京都駅八条口 観光バス乗降場",
    "description": "08:45前抵達，09:00集合。",
    "duration": "預留30分鐘",
    "art": "train",
    "note": "僅為八條口區域參考導航。缺少訂購商品與憑證，精確停車格／導遊旗幟待核對，務必依Klook憑證。"
  },
  {
    "id": "ine",
    "name": "伊根舟屋",
    "ja": "伊根の舟屋",
    "query": "伊根の舟屋 京都府与謝郡伊根町",
    "description": "海邊的舟屋，像時間停下來的村落。",
    "duration": "依旅行團",
    "art": "sea",
    "official": "https://www.ine-kankou.jp/"
  },
  {
    "id": "ineboat",
    "name": "伊根灣觀光船",
    "ja": "伊根湾めぐり遊覧船",
    "query": "伊根湾めぐり遊覧船 日出桟橋",
    "description": "從海上看舟屋，觀光航程約30分鐘。",
    "duration": "約30分鐘",
    "art": "sea",
    "official": "https://www.inewan.com/"
  },
  {
    "id": "inepark",
    "name": "舟屋之里公園",
    "ja": "舟屋の里公園",
    "query": "舟屋の里公園 伊根町",
    "description": "高處望向伊根灣，散策順序依導遊安排。",
    "duration": "依旅行團",
    "art": "sea",
    "official": "https://www.ine-kankou.jp/"
  },
  {
    "id": "view",
    "name": "天橋立 Viewland",
    "ja": "天橋立ビューランド",
    "query": "天橋立ビューランド 宮津市文珠437",
    "description": "從飛龍觀望向天橋立，記得試試股のぞき。",
    "duration": "依旅行團",
    "art": "sea",
    "official": "https://www.viewland.jp/"
  },
  {
    "id": "kaisen",
    "name": "迴旋橋",
    "ja": "廻旋橋",
    "query": "廻旋橋 天橋立 宮津市",
    "description": "連接天橋立沙洲的特色橋樑。",
    "duration": "依旅行團",
    "art": "sea"
  },
  {
    "id": "sand",
    "name": "天橋立沙洲",
    "ja": "天橋立",
    "query": "天橋立 宮津市",
    "description": "在松林沙洲散步，依團體時間折返。",
    "duration": "依旅行團",
    "art": "sea",
    "official": "https://www.amanohashidate.jp/"
  },
  {
    "id": "chion",
    "name": "智恩寺",
    "ja": "智恩寺",
    "query": "智恩寺 宮津市文珠466",
    "description": "天橋立旁的古寺。",
    "duration": "依旅行團",
    "art": "temple",
    "official": "https://www.monjudo-chionji.jp/"
  },
  {
    "id": "kiyomizu",
    "name": "清水寺",
    "ja": "清水寺",
    "query": "清水寺 京都市東山区清水1丁目294",
    "description": "從清水舞台望向冬日京都，把風景收進手帳裡。",
    "duration": "90分鐘",
    "art": "temple",
    "official": "https://www.kiyomizudera.or.jp/"
  },
  {
    "id": "sannenzaka",
    "name": "三年坂・二年坂",
    "ja": "産寧坂・二寧坂",
    "query": "産寧坂 京都市東山区",
    "description": "石板坡道、町家小店，留一點時間給偶遇。",
    "duration": "60分鐘",
    "art": "town",
    "note": "階梯多，穿防滑好走的鞋。"
  },
  {
    "id": "kodaiji",
    "name": "高台寺・寧寧之道",
    "ja": "高台寺・ねねの道",
    "query": "高台寺 京都市東山区高台寺下河原町526",
    "description": "在東山的石板路與寺院周邊散步。",
    "duration": "60分鐘",
    "art": "temple",
    "official": "https://www.kodaiji.com/"
  },
  {
    "id": "yasaka",
    "name": "八坂神社・圓山公園",
    "ja": "八坂神社・円山公園",
    "query": "八坂神社 京都市東山区祇園町北側625",
    "description": "從神社一路散步到公園，歇歇腳。",
    "duration": "60分鐘",
    "art": "torii",
    "official": "https://www.yasaka-jinja.or.jp/"
  },
  {
    "id": "gion",
    "name": "祇園花見小路",
    "ja": "祇園 花見小路",
    "query": "花見小路 京都市東山区祇園町南側",
    "description": "在町家街道放慢腳步，尊重居民的日常。",
    "duration": "90分鐘",
    "art": "town",
    "note": "遵守禁拍與私人巷道標示，不追拍藝舞伎。"
  },
  {
    "id": "kawaramachi",
    "name": "河原町",
    "ja": "京都河原町",
    "query": "京都河原町駅 京都市",
    "description": "最後一杯咖啡，再挑一份京都小物。",
    "duration": "90分鐘",
    "art": "town"
  },
  {
    "id": "porta",
    "name": "京都站購物",
    "ja": "京都ポルタ・ジェイアール京都伊勢丹",
    "query": "京都ポルタ 京都駅",
    "description": "把伴手禮與這趟旅行的記憶帶回家。",
    "duration": "90分鐘",
    "art": "town",
    "official": "https://www.porta.co.jp/"
  },
  {
    "id": "sagajr",
    "name": "JR 嵯峨嵐山站",
    "ja": "嵯峨嵐山駅",
    "query": "嵯峨嵐山駅 京都市右京区",
    "official": "https://www.jr-odekake.net/",
    "description": "嵯峨野線普通列車停靠站。",
    "art": "train",
    "duration": "依行程安排"
  },
  {
    "id": "tenryuji",
    "name": "天龍寺",
    "ja": "天龍寺",
    "query": "天龍寺 京都市右京区嵯峨天龍寺芒ノ馬場町68",
    "official": "https://www.tenryuji.com/",
    "description": "沿嵐山庭園與寺院慢慢散步。",
    "art": "temple",
    "duration": "依行程安排"
  },
  {
    "id": "tofukuji",
    "name": "東福寺站",
    "ja": "東福寺駅",
    "query": "東福寺駅 京都市東山区",
    "official": "https://www.keihan.co.jp/traffic/station/153/info.html",
    "description": "JR奈良線與京阪本線轉乘站。",
    "art": "train",
    "duration": "依行程安排"
  },
  {
    "id": "demachi",
    "name": "出町柳站",
    "ja": "出町柳駅",
    "query": "出町柳駅 京都市左京区",
    "official": "https://eizandensha.co.jp/guide/station/",
    "description": "京阪鴨東線與叡山電鐵轉乘站。",
    "art": "train",
    "duration": "依行程安排"
  },
  {
    "id": "yase",
    "name": "八瀨比叡山口站",
    "ja": "八瀬比叡山口駅",
    "query": "八瀬比叡山口駅 京都市左京区",
    "official": "https://eizandensha.co.jp/guide/station/yase-hieizanguchi.html",
    "description": "叡山本線終點站，步行前往琉璃光院。",
    "art": "train",
    "duration": "依行程安排"
  },
  {
    "id": "rurikoin",
    "name": "琉璃光院",
    "ja": "瑠璃光院",
    "query": "瑠璃光院 京都市左京区上高野東山55",
    "official": "https://rurikoin.komyoji.com/",
    "description": "在書院欣賞庭園與桌面倒影，慢慢收藏八瀨風景。",
    "art": "temple",
    "duration": "90分鐘"
  },
  {
    "id": "kiyomizu-gojo",
    "name": "清水五条站",
    "ja": "清水五条駅",
    "query": "清水五条駅 京阪 京都市東山区",
    "official": "https://www.keihan.co.jp/traffic/",
    "description": "出站後沿五条坂方向步行上坡至清水寺。",
    "art": "train",
    "duration": "依行程安排"
  },
  {
    "id": "ninenzaka",
    "name": "二年坂",
    "ja": "二寧坂",
    "query": "二寧坂 京都市東山区桝屋町",
    "official": "https://ja.kyoto.travel/",
    "description": "石板路旁的傳統街屋與特色小店。",
    "art": "town",
    "duration": "依行程安排"
  },
  {
    "id": "yasaka-tower",
    "name": "八坂塔・法觀寺",
    "ja": "八坂の塔・法観寺",
    "query": "法観寺 京都市東山区清水八坂上町388",
    "official": "https://ja.kyoto.travel/",
    "description": "在東山巷弄外觀賞五重塔，與八坂神社是不同景點。",
    "art": "temple",
    "duration": "依行程安排"
  }
];
export const restaurants: Restaurant[] = [
  {
    "id": "lemon",
    "name": "檸檬牛舌 京都店",
    "ja": "牛たんの檸檬 京都店",
    "query": "牛たんの檸檬 京都店 京都市下京区真町90",
    "address": "〒600-8001 京都府京都市下京区四条通河原町西入真町90 吉寿屋四条ビル3階",
    "phone": "075-335-9530",
    "official": "https://www.store-gyutan-lemon.com/",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=牛たんの檸檬+京都店",
    "description": "期待一頓熱熱的牛舌晚餐。",
    "duration": "90分鐘",
    "art": "food",
    "dish": "牛舌料理",
    "hours": "分店待確認",
    "lastOrder": "待確認",
    "alternative": "京都站內營業中的日式定食；選定店家後再導航"
  },
  {
    "id": "hiro",
    "name": "弘燒肉 八条口店",
    "ja": "京の焼肉処 弘 八条口店",
    "query": "京の焼肉処 弘 八条口店 京都市南区東九条南山王町25",
    "address": "〒601-8011 京都府京都市南区東九条南山王町25",
    "phone": "075-662-1129",
    "official": "https://yakiniku-hiro.com/shop/hachijoguchi.php",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=%E4%BA%AC%E3%81%AE%E7%84%BC%E8%82%89%E5%87%A6%20%E5%BC%98%20%E5%85%AB%E6%9D%A1%E5%8F%A3%E5%BA%97%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%8D%97%E5%8C%BA%E6%9D%B1%E4%B9%9D%E6%9D%A1%E5%8D%97%E5%B1%B1%E7%8E%8B%E7%94%BA25",
    "description": "12/11 19:15–21:15，2位成人。",
    "duration": "120分鐘",
    "art": "food",
    "dish": "燒肉",
    "hours": "17:00–23:00",
    "lastOrder": "餐點22:00／飲品22:30",
    "alternative": "其他已選定餐廳"
  }
];
export const findPlace = (id?: string) => [...places, ...restaurants].find(p=>p.id===id);
