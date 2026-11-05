import { useState } from "react";
import { TrainArt } from "./TrainArt";
/** Day 2 artwork is a schematic of western Kyoto and Kameoka, not a surveyed boundary. */
export function ArashiyamaMap({ animate = true }: { animate?: boolean }) {
  const [reduce] = useState(
    () =>
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const motion = animate && !reduce;
  const rail = "M840 410 C680 410 570 325 360 325";
  const river = "M155 550 C55 570 105 650 270 700 S390 820 530 920";
  const label = (
    x: number,
    y: number,
    lines: string[],
    size = 27,
    color = "#493c35",
  ) => (
    <text x={x} y={y} fontSize={size} fill={color}>
      {lines.map((s, i) => (
        <tspan x={x} dy={i ? size * 1.45 : 0} key={s}>
          {s}
        </tspan>
      ))}
    </text>
  );
  const station = (
    x: number,
    y: number,
    name: string,
    n: number,
    color = "#f7e6ca",
  ) => (
    <g>
      <rect
        x={x}
        y={y}
        width="270"
        height="92"
        rx="22"
        fill={color}
        stroke="#493c35"
        strokeWidth="3"
      />
      <circle cx={x + 20} cy={y + 15} r="22" fill="#493c35" />
      <text
        x={x + 20}
        y={y + 23}
        textAnchor="middle"
        fontSize="24"
        fill="#fffcf6"
      >
        {n}
      </text>
      {label(x + 38, y + 40, [name], 27)}
    </g>
  );
  const leaf = (x: number, y: number, color = "#cf8863") => (
    <path
      transform={`translate(${x} ${y})`}
      d="m0-22 7 11 13-7-3 15 16 1-15 10 5 12-17-7-13 8 3-14-13-9 15-2Z"
      fill={color}
    />
  );
  const house = (x: number, y: number, color = "#e2bb80") => (
    <g
      transform={`translate(${x} ${y})`}
      stroke="#493c35"
      strokeWidth="3"
      strokeLinejoin="round"
    >
      <path d="M-45 0V-40h90V0Z" fill={color} />
      <path d="m-56-41 56-35 56 35Z" fill="#9ca783" />
      <path d="M-26 0v-30h17V0m18 0v-30h17V0" fill="#fffcf6" />
    </g>
  );
  return (
    <svg
      className="arashiyama-map"
      viewBox="0 0 1200 1550"
      role="img"
      aria-label="嵐山交通圖：嵯峨搭小火車往龜岡，接駁至乘船場，遊船回嵐山，再步行回JR搭車往京都。"
    >
      <defs>
        <pattern
          id="map-streets"
          width="90"
          height="100"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(12)"
        >
          <path
            d="M0 15H90M20 0V100"
            fill="none"
            stroke="#e9ddc5"
            strokeWidth="3"
          />
        </pattern>
        <marker
          id="map-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path
            d="m0 0 7 4-7 4"
            fill="none"
            stroke="#a38c71"
            strokeWidth="1.5"
          />
        </marker>
      </defs>
      <rect width="1200" height="1550" rx="26" fill="#fffcf6" />
      {/* A gentle regional outline anchors the map without implying exact administrative boundaries. */}
      <path
        d="M70 200 170 110 320 145 420 90 535 165 690 135 780 220 1000 210 1120 340 1090 530 1150 660 1100 930 1140 1170 1020 1260 790 1210 640 1280 480 1190 290 1210 210 1010 85 920 120 720 50 570 100 390Z"
        fill="#f5efdf"
        stroke="#d8cbb0"
        strokeWidth="3"
        strokeDasharray="9 9"
      />
      <path
        d="M720 300H1120V1240H720Z"
        fill="url(#map-streets)"
        opacity=".65"
      />
      <path
        d="M40 220q100-180 230-30 100-170 230 10 130-160 250 40 130-120 300 30"
        fill="#dce3c5"
        stroke="#bfcca3"
        strokeWidth="5"
      />
      <path
        d="M65 248q100-115 230-20 130-110 240 5 100-90 250 50"
        fill="#c8d3ad"
        opacity=".7"
      />
      {label(75, 60, ["京都周邊區域示意・非比例地圖"], 25, "#9c876b")}
      {label(80, 120, ["龜岡側"], 29, "#9c876b")}
      {label(740, 290, ["嵐山側"], 29, "#9c876b")}
      <g transform="translate(1115 85)">
        <path d="m0-20-12 28L0 1 12 8Z" fill="#493c35" />
        {label(-12, -35, ["北"], 23)}
      </g>
      {/* River and rail are drawn first; moving vehicles run on top of these paths. */}
      <path
        d={river}
        fill="none"
        stroke="#d2e8e7"
        strokeWidth="44"
        strokeLinecap="round"
      />
      <path
        d={river}
        fill="none"
        stroke="#86afbb"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path d={rail} fill="none" stroke="#bd624d" strokeWidth="13" />
      <path d={rail} fill="none" stroke="#f4d1b3" strokeWidth="6" />
      <path
        d={rail}
        fill="none"
        stroke="#bd624d"
        strokeWidth="24"
        strokeDasharray="4 20"
      />
      <path
        d="M310 370Q230 405 155 430"
        fill="none"
        stroke="#a985b2"
        strokeWidth="9"
        strokeDasharray="8 14"
      />
      <path
        d="M1000 1175V765M1060 765V1175"
        fill="none"
        stroke="#8f82ab"
        strokeWidth="8"
      />
      <path
        d="m987 790 13-20 13 20m34 357 13 20 13-20"
        fill="none"
        stroke="#8f82ab"
        strokeWidth="5"
      />
      <path
        d="M950 660V465"
        fill="none"
        stroke="#a38c71"
        strokeWidth="6"
        strokeDasharray="5 12"
        markerEnd="url(#map-arrow)"
      />
      <path
        d="M570 918 650 775 690 725H880"
        fill="none"
        stroke="#a38c71"
        strokeWidth="6"
        strokeDasharray="5 12"
        markerEnd="url(#map-arrow)"
      />
      {house(325, 180)}
      {house(950, 360)}
      {house(970, 660)}
      {house(145, 435)}
      {station(185, 200, "小火車龜岡站", 4, "#f2d8c5")}
      {station(815, 445, "小火車嵯峨站", 3, "#f2d8c5")}
      {station(830, 680, "JR 嵯峨嵐山站", 2, "#e9e2ef")}
      {station(45, 410, "保津川乘船場", 5, "#e2eeea")}
      {label(
        490,
        460,
        ["往トロッコ亀岡", "3區間・中途2站", "目標10:02–10:25"],
        27,
        "#b66b54",
      )}
      {label(52, 580, ["39系統接駁巴士", "10:35待核對"], 25, "#92749e")}
      <g transform="translate(235 390)" stroke="#493c35" strokeWidth="2.5">
        <rect x="-25" y="-23" width="62" height="35" rx="9" fill="#b69bc4" />
        <path d="M-15-14H25V0H-15Z" fill="#fffcf6" />
        <circle cx="-10" cy="13" r="5" fill="#493c35" />
        <circle cx="24" cy="13" r="5" fill="#493c35" />
      </g>
      {label(973, 535, ["步行轉乘"], 23, "#9c876b")}
      {label(973, 573, ["預留", "10–15分"], 21, "#9c876b")}
      {label(
        80,
        790,
        ["保津川順流而下", "目標12:00–14:00", "冬季船班・河況待確認"],
        25,
        "#608e9b",
      )}
      {/* Bamboo, shrine, bridge, Kyoto station and tower are native original illustrations. */}
      <g stroke="#748e62" strokeWidth="8" strokeLinecap="round">
        <path d="M590 685V550m26 140V525m27 160V550m28 140V535" />
        <path d="m590 595-25-22m50-5 24-23m6 65 27-25" strokeWidth="5" />
      </g>
      <g stroke="#493c35" strokeWidth="3">
        <path
          d="M683 687v-65m53 65v-65m-63-13q37 10 75 0v16h-75Zm8 38h58"
          fill="#cf8b73"
        />
      </g>
      {label(550, 728, ["竹林小徑・野宮神社"], 25)}
      {label(705, 785, ["步行回 JR 車站"], 23, "#a38c71")}
      <g
        transform="translate(530 932)"
        stroke="#493c35"
        strokeWidth="3"
        fill="#d8b17b"
      >
        <path d="M-125 5Q0-30 125 5v12Q0-15-125 17Z" />
        <path d="M-100 15v38m50-46v37M0 3v38m50-34v37m50-29v38" />
        <path
          d="M-125-10Q0-42 125-10m-100-5v20m40-26v21m40-25v20m40-15v20m40-10v20"
          fill="none"
        />
      </g>
      {label(420, 1045, ["⑥ 嵐山下船・渡月橋"], 29)}
      {label(440, 1083, ["目標約14:00抵達"], 23, "#608e9b")}
      <g transform="translate(995 1150)" stroke="#493c35" strokeWidth="3">
        <path d="M-80 40V-25h160v65Z" fill="#e5e0ce" />
        <path d="m-92-25 92-40 92 40Z" fill="#b4beb5" />
        <path d="M-54-15v32h108v-32Z" fill="#fffcf6" />
        <path d="M-48 40V23h28v17m40 0V23h28v17" fill="#abbdc4" />
      </g>
      <g transform="translate(1120 1130)" stroke="#493c35" strokeWidth="3">
        <path d="M-12 50 0-75 12 50Z" fill="#eee4cf" />
        <ellipse cy="-60" rx="18" ry="8" fill="#cf8b73" />
        <path d="M0-80v-25" />
      </g>
      {station(825, 1190, "京都站・出發／返回", 1, "#f3dfbb")}
      <rect
        x="800"
        y="840"
        width="345"
        height="203"
        rx="22"
        fill="#fffcf6"
        stroke="#d2c4da"
        strokeWidth="2"
      />
      {label(
        820,
        880,
        [
          "JR 嵯峨野線・普通",
          "去程 ↑ 往園部方向",
          "回程 ↓ 往京都方向",
          "7區間・中途6站",
          "乘車約17–20分",
        ],
        25,
        "#8f82ab",
      )}
      {leaf(465, 240)}
      {leaf(740, 190, "#e1b16b")}
      {leaf(720, 860)}
      {leaf(370, 1010, "#e1b16b")}
      {leaf(1100, 350)}
      {/* Static fallback stays at destination; SMIL plays once and freezes, including on Safari. */}
      <g transform={motion ? undefined : "translate(360 325)"}>
        {motion && (
          <animateMotion
            path={rail}
            dur="4s"
            begin="0s"
            fill="freeze"
            calcMode="spline"
            keyTimes="0;1"
            keySplines=".35 0 .3 1"
          />
        )}
        <g transform="scale(-1 1)">
          <TrainArt x={-65} y={-65} width={130} height={69} />
        </g>
      </g>
      <g transform={motion ? undefined : "translate(530 920)"}>
        {motion && (
          <animateMotion
            path={river}
            dur="9.8s"
            begin="0s"
            keyPoints="0;0;1"
            keyTimes="0;0.4898;1"
            calcMode="linear"
            fill="freeze"
          />
        )}
        <g
          stroke="#493c35"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M-62-10H62L43 16H-40Z" fill="#e4b56c" />
          <path d="M-55-8H55" stroke="#bd624d" strokeWidth="7" />
          <path d="M-32-14v-28h65v28" fill="#fffcf6" />
          <path d="M-43-42q42-18 87 0Z" fill="#e4b56c" />
          <circle cx="-10" cy="-24" r="8" fill="#f2d8bd" />
          <circle cx="16" cy="-24" r="8" fill="#f2d8bd" />
          <path d="M-47-15v-24m-10 5 10-11 10 11Z" fill="#a9b594" />
        </g>
      </g>
      <path
        d="M960 1285H240"
        stroke="#a38c71"
        strokeWidth="5"
        strokeDasharray="5 12"
      />
      <rect
        x="50"
        y="1320"
        width="1100"
        height="145"
        rx="24"
        fill="#f3e3ce"
        stroke="#493c35"
        strokeWidth="3"
      />
      {label(80, 1360, ["18:00–18:30 京都站附近 → 18:30–19:00 步行＋緩衝"], 25)}
      {label(
        80,
        1400,
        ["弘燒肉 京都站前店 19:00–20:30 → 20:30後 返回飯店"],
        26,
      )}
      {label(80, 1438, ["預計用餐・尚未確認訂位"], 23, "#9a6848")}
      {label(
        55,
        1510,
        ["示意非實際導航；列車、接駁與遊船均須核對旅行日班次。"],
        23,
        "#9c876b",
      )}
    </svg>
  );
}
