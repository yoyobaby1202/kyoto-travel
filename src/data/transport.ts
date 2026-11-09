import type { Route } from "../types";
export const routes: Route[] = [
  {
    "id": "nara",
    "name": "JR 奈良線・普通",
    "color": "#9a8056",
    "direction": "往奈良方向，搭乘確定停靠「稲荷」的普通列車",
    "stations": [
      "京都",
      "東福寺",
      "稲荷"
    ],
    "duration": "乘車約5–6分鐘；全程含步行候車約30分鐘",
    "from": "京都駅 JR 奈良線",
    "to": "稲荷駅 JR 奈良線",
    "official": "https://timetable.jr-odekake.net/line-timetable/2300",
    "note": "快速列車不一定停靠稲荷，請查看停靠站。回程搭往京都的普通列車。月台依現場電子看板。",
    "confirmedStops": true,
    "walk": "飯店 → 京都站；稲荷站 → 伏見稲荷大社，步行距離待確認"
  },
  {
    "id": "sagano",
    "name": "JR 嵯峨野線・普通",
    "color": "#897aaf",
    "direction": "往園部方向，搭停靠嵯峨嵐山的普通列車",
    "stations": [
      "京都",
      "梅小路京都西",
      "丹波口",
      "二条",
      "円町",
      "花園",
      "太秦",
      "嵯峨嵐山"
    ],
    "duration": "乘車約17–20分鐘；08:00–08:40含飯店步行與候車，另留08:40–09:00轉乘小火車",
    "from": "京都駅",
    "to": "嵯峨嵐山駅",
    "official": "https://www.jr-odekake.net/",
    "note": "普通列車站序；回程選往京都方向。實際發車時間待查，勿用此圖推算快速列車停靠。",
    "confirmedStops": true,
    "walk": "JR 嵯峨嵐山站 → トロッコ嵯峨站，預留10–15分鐘轉乘，距離待確認"
  },
  {
    "id": "torokko",
    "name": "嵯峨野觀光小火車",
    "color": "#bb7763",
    "direction": "嵯峨野1號・往トロッコ亀岡",
    "stations": [
      "トロッコ嵯峨",
      "トロッコ嵐山",
      "トロッコ保津峡",
      "トロッコ亀岡"
    ],
    "duration": "09:02–09:25",
    "from": "トロッコ嵯峨駅",
    "to": "トロッコ亀岡駅",
    "official": "https://www.sagano-kanko.co.jp/",
    "note": "トロッコ嵯峨出發，經トロッコ嵐山、トロッコ保津峡，抵達トロッコ亀岡。",
    "confirmedStops": true
  },
  {
    "id": "haruka-out",
    "name": "HARUKA 22號・去程規劃",
    "color": "#6499a7",
    "direction": "京都方面，目的地以實際班次為準",
    "stations": [
      "関西空港",
      "京都"
    ],
    "duration": "使用者目標12:14–13:34，待官方核對",
    "from": "関西空港駅",
    "to": "京都駅",
    "official": "https://www.westjr.co.jp/global/tc/ticket/haruka/",
    "note": "此圖僅顯示起訖，未列中途站，不計站數。未訂票。備選24號12:44–14:04亦待核對；延誤改搭下一班可用列車並縮短伏見行程。",
    "confirmedStops": false
  },
  {
    "id": "haruka-back",
    "name": "HARUKA 33號・回程規劃",
    "color": "#6499a7",
    "direction": "関西空港方面，班次名稱及時間待核對",
    "stations": [
      "京都",
      "関西空港"
    ],
    "duration": "使用者目標14:00–15:20，待官方核對",
    "from": "京都駅",
    "to": "関西空港駅",
    "official": "https://www.westjr.co.jp/global/tc/ticket/haruka/",
    "note": "僅顯示起訖，不計站數。請確認12/14時刻表及指定席，不代表已訂票；保留足夠國際線報到時間。",
    "confirmedStops": false
  },
  {
    "id": "kyoto-tofukuji",
    "name": "JR 奈良線・普通",
    "direction": "往奈良方向，東福寺下車",
    "stations": [
      "京都",
      "東福寺"
    ],
    "duration": "乘車約2–3分鐘；08:30–09:30含步行、候車與轉乘安排",
    "official": "https://www.jr-odekake.net/",
    "color": "#789981",
    "from": "京都駅 京都",
    "to": "東福寺駅 京都",
    "note": "搭乘停靠上述各站的普通列車；月台與車廂依現場看板。",
    "confirmedStops": true,
    "walk": "東福寺出JR閘口後轉京阪，預留步行與候車時間"
  },
  {
    "id": "tofukuji-demachi",
    "name": "京阪本線・鴨東線・普通",
    "direction": "往出町柳方向",
    "stations": [
      "東福寺",
      "七条",
      "清水五条",
      "祇園四条",
      "三条",
      "神宮丸太町",
      "出町柳"
    ],
    "duration": "乘車約15–20分鐘；08:30–09:30含轉乘與候車",
    "official": "https://www.keihan.co.jp/traffic/station/153/info.html",
    "color": "#789981",
    "from": "東福寺駅 京都",
    "to": "出町柳駅 京都",
    "note": "搭乘停靠上述各站的普通列車；月台與車廂依現場看板。",
    "confirmedStops": true,
    "walk": "出町柳出京阪閘口，步行轉叡山電鐵"
  },
  {
    "id": "eizan",
    "name": "叡山電鐵・叡山本線",
    "direction": "往八瀬比叡山口，請搭八瀬比叡山口行",
    "stations": [
      "出町柳",
      "元田中",
      "茶山・京都芸術大学",
      "一乗寺",
      "修学院",
      "宝ケ池",
      "三宅八幡",
      "八瀬比叡山口"
    ],
    "duration": "乘車約13分鐘；09:30–10:00含候車與步行",
    "official": "https://eizandensha.co.jp/guide/station/yase-hieizanguchi.html",
    "color": "#789981",
    "from": "出町柳駅 京都",
    "to": "八瀬比叡山口駅 京都",
    "note": "搭乘停靠上述各站的普通列車；月台與車廂依現場看板。",
    "confirmedStops": true,
    "walk": "八瀨比叡山口站 → 琉璃光院，步行約12分鐘"
  },
  {
    "id": "eizan-back",
    "name": "叡山電鐵・回程",
    "direction": "往出町柳方向",
    "stations": [
      "八瀬比叡山口",
      "三宅八幡",
      "宝ケ池",
      "修学院",
      "一乗寺",
      "茶山・京都芸術大学",
      "元田中",
      "出町柳"
    ],
    "duration": "乘車約13分鐘；11:30–12:30含步行與候車",
    "official": "https://eizandensha.co.jp/guide/station/yase-hieizanguchi.html",
    "color": "#789981",
    "from": "八瀬比叡山口駅 京都",
    "to": "出町柳駅 京都",
    "note": "搭乘停靠上述各站的普通列車；月台與車廂依現場看板。",
    "confirmedStops": true,
    "walk": "出町柳轉京阪電車，另外購票或刷卡出入閘"
  },
  {
    "id": "demachi-gojo",
    "name": "京阪鴨東線・本線・普通",
    "direction": "往淀屋橋方向，搭停靠清水五条的普通列車",
    "stations": [
      "出町柳",
      "神宮丸太町",
      "三条",
      "祇園四条",
      "清水五条"
    ],
    "duration": "乘車約10–15分鐘；11:30–12:30含候車與出站",
    "official": "https://www.keihan.co.jp/traffic/",
    "color": "#789981",
    "from": "出町柳駅 京都",
    "to": "清水五条駅 京都",
    "note": "搭乘停靠上述各站的普通列車；月台與車廂依現場看板。",
    "confirmedStops": true,
    "walk": "清水五条站 → 清水寺周邊，步行上坡約25–30分鐘"
  },
  {
    "id": "hankyu-return",
    "name": "阪急京都線",
    "direction": "往大阪梅田方向，烏丸下車",
    "stations": [
      "京都河原町",
      "烏丸"
    ],
    "duration": "1個站間區間；連同地下鐵與飯店步行安排於19:30–20:30",
    "official": "https://www.hankyu.co.jp/",
    "color": "#789981",
    "from": "京都河原町駅 京都",
    "to": "烏丸駅 京都",
    "note": "搭乘停靠上述各站的普通列車；月台與車廂依現場看板。",
    "confirmedStops": true,
    "walk": "烏丸步行轉地下鐵四条；往竹田方向，經五条至京都（2區間），再步行回飯店"
  },
  {
    "id": "inari-gion",
    "name": "京阪本線・普通",
    "color": "#7d9b81",
    "direction": "往出町柳方向，祇園四条下車",
    "stations": [
      "伏見稲荷",
      "鳥羽街道",
      "東福寺",
      "七条",
      "清水五条",
      "祇園四条"
    ],
    "duration": "乘車約10–15分鐘；16:30–17:30含步行、候車與到店緩衝",
    "from": "伏見稲荷駅 京阪 京都市伏見区",
    "to": "祇園四条駅 京阪 京都市東山区",
    "official": "https://www.keihan.co.jp/traffic/",
    "confirmedStops": true,
    "walk": "伏見稻荷大社 → 京阪伏見稲荷站；祇園四条站 → 過四条大橋 → 京都高島屋7樓三嶋亭",
    "note": "京阪伏見稲荷站與JR稲荷站不同；搭停靠以上各站的普通列車，月台依現場看板。"
  },
  {
    "id": "gion-shichijo",
    "name": "京阪本線・普通・回飯店",
    "color": "#7d9b81",
    "direction": "往淀屋橋方向，七条下車",
    "stations": [
      "祇園四条",
      "清水五条",
      "七条"
    ],
    "duration": "乘車約5–7分鐘；20:00–21:00含步行與候車",
    "from": "祇園四条駅 京阪 京都市東山区",
    "to": "七条駅 京阪 京都市東山区",
    "official": "https://www.keihan.co.jp/traffic/",
    "confirmedStops": true,
    "walk": "七条站出站往西沿七条通，步行約20–25分鐘至hotel androoms Kyoto Shichijo",
    "note": "搭停靠七条的普通列車；晚餐候位較久時，散步及返程可順延。"
  }
];
