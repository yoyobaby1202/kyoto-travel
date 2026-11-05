import fs from "node:fs";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import {
  Bus,
  Ship,
  Footprints,
  TrainFront,
  Utensils,
  Hotel,
} from "lucide-react";
import { TrainArt } from "../src/components/TrainArt";
const C = {
  ink: "#493c35",
  paper: "#fffcf6",
  red: "#bd624d",
  gold: "#e4b56c",
  jr: "#8f82ab",
  bus: "#aa85ad",
  river: "#86afbb",
  walk: "#a58e72",
};
const esc = (s: string) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
function text(
  x: number,
  y: number,
  s: string,
  size = 28,
  fill = C.ink,
  anchor = "start",
) {
  return `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}">${esc(s)}</text>`;
}
function rect(
  x: number,
  y: number,
  w: number,
  h: number,
  fill = C.paper,
  r = 22,
  stroke = C.ink,
  sw = 3,
) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
}
function icon(
  Icon: typeof Bus,
  x: number,
  y: number,
  size = 42,
  color = C.ink,
) {
  return renderToStaticMarkup(
    React.createElement(Icon, {
      x,
      y,
      width: size,
      height: size,
      color,
      strokeWidth: 1.8,
    }),
  );
}
function node(
  x: number,
  y: number,
  w: number,
  n: string,
  title: string,
  sub: string,
  fill: string,
  Icon?: typeof Bus,
) {
  return (
    rect(x, y, w, 110, fill) +
    `<circle cx="${x + 21}" cy="${y + 21}" r="22" fill="${C.ink}"/>` +
    text(x + 21, y + 29, n, 23, C.paper, "middle") +
    (Icon ? icon(Icon, x + 24, y + 43, 44) : "") +
    text(x + (Icon ? 83 : 36), y + 52, title, 29) +
    text(x + (Icon ? 83 : 36), y + 86, sub, 22, "#8c745d")
  );
}
function route(
  d: string,
  color: string,
  marker: string,
  dashed = false,
  width = 8,
) {
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${dashed ? 'stroke-dasharray="7 12"' : ""} marker-end="url(#${marker})"/>`;
}
const defs = Object.entries({
  red: C.red,
  jr: C.jr,
  bus: C.bus,
  river: C.river,
  walk: C.walk,
})
  .map(
    ([id, color]) =>
      `<marker id="${id}" markerWidth="12" markerHeight="12" refX="9" refY="5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0 10 5 0 10Z" fill="${color}" stroke="${color}" stroke-width="2"/></marker>`,
  )
  .join("");
let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1550" viewBox="0 0 1200 1550"><defs>${defs}</defs><rect width="1200" height="1550" fill="${C.paper}"/><g font-family="Huninn,Microsoft JhengHei,sans-serif" font-weight="400">`;
svg +=
  rect(54, 45, 155, 45, "#edc48e", 22) +
  text(131, 76, "DAY 02", 25, C.ink, "middle") +
  text(1128, 76, "2026.12.11 週五", 24, "#9c8061", "end");
svg +=
  text(55, 145, "嵐山一日交通圖", 54) +
  text(57, 188, "搭小火車去龜岡，坐船回嵐山，晚餐回京都。", 27, "#8c745d");
const legend = [
  ["JR電車", C.jr, TrainFront],
  ["小火車", C.red, TrainFront],
  ["接駁巴士", C.bus, Bus],
  ["遊船", C.river, Ship],
  ["步行", C.walk, Footprints],
] as const;
legend.forEach(([name, color, Icon], i) => {
  const x = 60 + i * 222;
  svg +=
    `<path d="M${x} 234h35" stroke="${color}" stroke-width="7" stroke-linecap="round" ${i === 4 ? 'stroke-dasharray="4 7"' : ""}/>` +
    icon(Icon, x + 46, 215, 30, color) +
    text(x + 86, 239, name, 24);
});
svg += rect(45, 270, 1110, 940, "#fbf5e9", 30, "#d3bda0", 2);
svg +=
  text(88, 312, "西側・龜岡", 25, "#a78261") +
  text(780, 312, "東側・嵐山", 25, "#a78261");
svg += text(1120, 312, "行程順序示意", 18, "#9e846a", "end");
// Transport paths sit behind stations. This is a schematic, not a navigable basemap.
svg += route("M770 415H620V660H400", C.red, "red");
svg += route("M240 605V470", C.bus, "bus");
svg += route("M940 605V470", C.walk, "walk", true, 5);
svg += `<path d="M85 415H70Q57 415 57 440V914Q57 966 110 966H390" fill="none" stroke="#d5e4e3" stroke-width="29" stroke-linecap="round" stroke-linejoin="round"/>`;
svg += route(
  "M85 415H70Q57 415 57 440V914Q57 966 110 966H390",
  C.river,
  "river",
  false,
  7,
);
svg += route("M540 910V878", C.walk, "walk", true, 5);
svg += route("M687 820H725V660H766", C.walk, "walk", true, 5);
svg += route("M909 1070V722", C.jr, "jr", false, 7);
svg += route("M977 715V1065", C.jr, "jr", false, 7);
svg += node(
  85,
  355,
  310,
  "⑤",
  "遊船乘船場",
  "龜岡・報到與候船",
  "#e7efeb",
  Ship,
);
svg += node(
  85,
  605,
  310,
  "④",
  "小火車龜岡站",
  "トロッコ亀岡駅",
  "#f4e0d0",
  TrainFront,
);
svg += node(
  770,
  355,
  340,
  "③",
  "小火車嵯峨站",
  "トロッコ嵯峨駅",
  "#f4e0d0",
  TrainFront,
);
svg += node(
  770,
  605,
  340,
  "②",
  "JR 嵯峨嵐山站",
  "嵯峨嵐山駅",
  "#ece7f1",
  TrainFront,
);
svg +=
  rect(399, 771, 288, 107, "#e5e9d6", 24) +
  text(543, 806, "⑦ 嵐山步行散策", 28, C.ink, "middle") +
  text(543, 842, "渡月橋 → 竹林・野宮", 22, "#7d7f68", "middle");
svg += node(
  390,
  910,
  350,
  "⑥",
  "下船・渡月橋附近",
  "目標約14:00抵達",
  "#e4efee",
  Ship,
);
svg +=
  rect(799, 1070, 310, 110, "#f7e6ca", 24) +
  text(954, 1112, "① 出發／⑧ 返回", 24, C.ink, "middle") +
  text(954, 1155, "京都站", 34, C.ink, "middle");
svg += text(957, 1200, "京都站位於嵐山東南側", 19, "#9e846a", "middle");
// The single canonical red/yellow Sagano train used on the website.
svg += renderToStaticMarkup(
  React.createElement(TrainArt, { x: 638, y: 354, width: 118, height: 64 }),
);
svg +=
  text(484, 463, "往トロッコ亀岡", 25, C.red, "middle") +
  text(479, 505, "小火車 3個站間區間", 25, C.red, "middle") +
  text(479, 541, "中途停靠 2站", 24, C.red, "middle") +
  text(479, 576, "目標10:02–10:25", 24, "#9f7759", "middle");
svg +=
  text(100, 511, "39系統", 24, C.bus) +
  text(100, 546, "轉乘巴士", 23, C.bus) +
  text(100, 579, "10:35待核對", 20, "#9b7a9e");
svg +=
  text(962, 506, "步行轉乘", 24, C.walk) +
  text(962, 542, "預留10–15分", 20, C.walk) +
  text(962, 574, "兩站相鄰", 20, C.walk);
svg +=
  icon(Ship, 115, 757, 48, C.river) +
  text(182, 790, "保津川順流而下", 25, "#608a96") +
  text(117, 830, "目標12:00–14:00", 25, "#608a96") +
  text(117, 868, "冬季船班・河況待確認", 21, "#7e9696");
svg +=
  rect(793, 768, 313, 205, "#fffcf6", 19, "#d6ccdd", 2) +
  text(950, 810, "JR 嵯峨野線・普通", 27, C.jr, "middle") +
  text(950, 850, "去程 ↑ 往園部方向", 24, C.jr, "middle") +
  text(950, 887, "回程 ↓ 往京都方向", 24, C.jr, "middle") +
  text(950, 926, "各 7區間・中途6站", 24, C.ink, "middle") +
  text(950, 954, "乘車約17–20分／不用轉車", 19, "#93859b", "middle");
svg += text(579, 731, "步行回 JR 站", 21, C.walk, "middle");
svg += route("M954 1180V1325", C.walk, "walk", true, 5);
svg +=
  text(635, 1250, "18:00–18:30 京都站附近", 24, "#876b51") +
  text(635, 1287, "18:30–19:00 步行＋緩衝", 24, "#876b51");
svg += route("M651 1384H485", C.walk, "walk", true, 5);
svg +=
  rect(650, 1330, 480, 112, "#f0d4bc", 22) +
  `<g transform="translate(671 1358)" stroke="${C.ink}" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="8" width="48" height="39" rx="10" fill="#fffcf6"/><path d="M8 18h34M8 26h34M8 34h34m-24-19v24m9-24v24m9-24v24" stroke="#cbb99e" stroke-width="1.3"/><path d="M14 17q8-6 14-3l7 10q-4 7-14 4l-9-4Z" fill="#c97962"/><path d="m18 20 6 4m1-6 5 4M13 49v5m24-5v5m-21-51 2-6m11 6 2-5"/></g>` +
  text(735, 1370, "弘燒肉 京都站前店", 29) +
  text(735, 1402, "19:00–20:30 · 京の焼肉処 弘 京都駅前店", 18) +
  text(735, 1427, "預計用餐・尚未確認訂位", 20, "#9a6848");
svg +=
  rect(80, 1330, 402, 112, "#f5e9d4", 22) +
  icon(Hotel, 105, 1360, 44) +
  text(170, 1373, "androoms 京都七条", 28) +
  text(170, 1410, "返回飯店・自由活動", 23, "#8c745d");
svg +=
  text(564, 1348, "20:30後", 22, C.walk, "middle") +
  text(564, 1428, "步行", 22, C.walk, "middle");
svg += text(
  60,
  1487,
  "區域方位示意，非比例地圖；車站為閱讀排列，步行請依實際導航。",
  20,
  "#9b8066",
);
svg += text(
  60,
  1520,
  "站數依普通列車；小火車、接駁與遊船均非已訂票，冬季船班仍待確認。",
  20,
  "#9b8066",
);
svg += "</g></svg>";

fs.mkdirSync("public/maps", { recursive: true });
const font = fs
  .readFileSync("public/fonts/huninn-trip.woff2")
  .toString("base64");
function save(day: number, content: string) {
  fs.writeFileSync(
    "public/maps/day-" + day + ".svg",
    content.replace(
      "<defs>",
      "<defs><style>@font-face{font-family:Huninn;src:url(data:font/woff2;base64," +
        font +
        ")}</style>",
    ),
  );
}
save(2, svg);
// Other days share the same palette, stroke, original train, and schematic vocabulary.
const daily = [
  {
    day: 1,
    title: "抵達京都・伏見稻荷",
    region: "關西機場 → 京都市區 → 京都南側",
    stops: [
      ["關西機場", "10:25抵達・入境與午餐"],
      ["京都站", "HARUKA目標12:14–13:34"],
      ["androoms 京都七条", "13:34後寄放行李・稍作休息"],
      ["京都站 → 稲荷站", "JR奈良線普通・往奈良方向"],
      ["伏見稻荷大社", "15:30–17:00・千本鳥居"],
      ["晚餐待定 → 飯店", "18:00–19:30晚餐・之後散步"],
    ],
    edges: [
      "HARUKA 22號・未訂票／備選24號12:44–14:04",
      "步行・依實際導航",
      "步行回站・候車包含在15:00–15:30",
      "2個站間區間・中途東福寺1站／乘車約5–6分",
      "步行遊覽・晚餐選定後再規劃交通",
    ],
    note: "HARUKA時刻與停靠站待核對；請搭確實停靠稲荷站的普通列車。",
  },
  {
    day: 3,
    title: "天橋立・伊根舟屋",
    region: "京都站 → 京都北部海岸 → 京都站",
    stops: [
      ["京都站八條東口集合", "08:45前抵達・09:00依憑證集合"],
      ["伊根舟屋散策", "舟屋・展望景點依旅行團安排"],
      ["伊根灣觀光船", "約30分鐘・依當日團體安排"],
      ["天橋立彈性遊覽", "Viewland／智恩寺／迴旋橋等"],
      ["觀光巴士返回京都", "旅行社預計17:30–18:00抵達"],
      ["晚餐待定 → 飯店", "預留塞車與用餐彈性"],
    ],
    edges: [
      "觀光巴士・去程約2.5小時為概估",
      "團體安排・包含步行與集合",
      "伊根 → 天橋立須搭觀光巴士・不可省略車程",
      "觀光巴士・順序與停留由導遊決定",
      "京都站周邊用餐・步行返回",
    ],
    note: "景點順序只是示意，11:30–15:30為含午餐及移動的彈性時段，非保證時間。",
  },
  {
    day: 4,
    title: "清水寺・東山慢慢走",
    region: "京都站 → 東北側東山 → 河原町 → 京都站",
    stops: [
      ["京都站 → 清水寺", "08:30–09:30・巴士與上坡步行"],
      ["清水寺 → 三年坂・二年坂", "09:30–12:00・午餐待定"],
      ["高台寺周邊 → 八坂神社", "13:00–15:00・寧寧之道與圓山公園"],
      ["祇園 → 河原町", "15:00–18:00・散策與購物"],
      ["檸檬牛舌 京都店", "18:30–19:30・預計用餐／未確認訂位"],
      ["阪急烏丸 → 地下鐵四条 → 京都", "19:30後返回androoms 京都七条"],
    ],
    edges: [
      "市巴士往清水道／五条坂方向・班次待查",
      "東山景點以步行串連・12:00–13:00午餐",
      "步行・停留時間包含移動",
      "18:00–18:30步行與用餐緩衝",
      "阪急京都河原町 → 烏丸：1區間／往大阪梅田方向",
    ],
    note: "烏丸步行轉四条：烏丸線往京都・竹田方向，經五条至京都，2區間／中途1站。",
  },
  {
    day: 5,
    title: "京都最後散策・回家",
    region: "京都站周邊 → 關西機場 → 桃園",
    stops: [
      ["androoms 京都七条", "09:00–10:00退房・寄放行李"],
      ["京都 Porta・伊勢丹", "10:00–11:30購物・11:30午餐"],
      ["回飯店取行李 → 京都站", "12:30–14:00・採買與乘車準備"],
      ["HARUKA 33號 → 關西機場", "目標14:00–15:20・未訂票"],
      ["關西機場報到與安檢", "15:30–17:30・晚餐依登機時間調整"],
      ["IT213 → 桃園", "18:55日本起飛 → 21:15台灣抵達"],
    ],
    edges: [
      "步行・京都站周邊活動",
      "步行・預留領行李時間",
      "HARUKA往關西機場・實際月台依看板",
      "到站後步行至航空公司指定航廈",
      "飛機・航班依航空公司通知再確認",
    ],
    note: "HARUKA班號、時刻與停靠站仍待確認；抵達機場至起飛預留約3.5小時。",
  },
];
for (const d of daily) {
  let image = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1550" viewBox="0 0 1200 1550"><defs>${defs}</defs><rect width="1200" height="1550" fill="${C.paper}"/><g font-family="Huninn,Microsoft JhengHei,sans-serif">`;
  image +=
    rect(55, 42, 155, 45, "#edc48e") +
    text(132, 74, "DAY 0" + d.day, 25, C.ink, "middle") +
    text(1130, 75, "2026.12." + (9 + d.day), 25, "#9c8061", "end") +
    text(55, 143, d.title, 48) +
    text(55, 191, d.region, 27, "#8c745d");
  image += rect(45, 230, 1110, 1170, "#fbf5e9", 30, "#d3bda0", 2);
  d.stops.forEach(([title, sub], i) => {
    const y = 265 + i * 185;
    if (i < 5) {
      const color = d.day === 3 ? C.bus : d.day === 4 ? C.walk : C.jr;
      image +=
        route(
          "M140 " + (y + 110) + "V" + (y + 179),
          color,
          d.day === 3 ? "bus" : d.day === 4 ? "walk" : "jr",
          d.day === 4,
          6,
        ) + text(195, y + 153, d.edges[i], 23, color);
    }
    image +=
      rect(
        83,
        y,
        1020,
        110,
        i === 4 ? "#f0d4bc" : i % 2 ? "#e8e8dc" : "#f7e6ca",
      ) +
      `<circle cx="140" cy="${y + 55}" r="25" fill="${C.ink}"/>` +
      text(140, y + 64, String(i + 1), 26, C.paper, "middle") +
      text(195, y + 46, title, 32) +
      text(195, y + 84, sub, 25, "#8c745d");
  });
  image += text(
    55,
    1450,
    "方位與行程順序示意，非比例地圖；點開導航確認實際步行路線。",
    23,
    "#9b8066",
  );
  // Wrap the long information note rather than shrinking it on mobile.
  const chunks = d.note.match(/.{1,43}/gu) || [];
  chunks.forEach(
    (line, i) => (image += text(55, 1490 + i * 31, line, 23, "#9b8066")),
  );
  image += "</g></svg>";
  save(d.day, image);
}
console.log("Generated five self-contained offline SVG transport maps.");
