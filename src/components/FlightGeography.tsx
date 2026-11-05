export function FlightGeography({ day }: { day: number }) {
  const outbound = day === 1;
  const japan = outbound
    ? "M500 135 650 170 820 140 1070 235 1120 460 1080 690 1140 930 1060 1200 850 1270 670 1200 480 1280 230 1200 110 960 150 760 330 680 350 440 450 370Z"
    : "M180 160 380 130 540 180 700 125 1000 175 1110 400 1070 660 1140 900 1080 1190 850 1270 690 1190 620 1010 430 900 300 670 110 520Z";
  const taiwan = outbound
    ? "M200 125Q245 150 225 215L160 300Q115 320 115 270L155 170Q170 135 200 125Z"
    : "M220 1035Q265 1065 245 1130L180 1240Q130 1270 130 1210L175 1090Q190 1050 220 1035Z";
  return (
    <g aria-label="台灣與日本之間的海面示意">
      <rect x="50" y="120" width="1100" height="1170" rx="65" fill="#e8f2f2" />
      <path d={japan} fill="#f5efdf" stroke="#d8cbb0" strokeWidth="3" />
      <path d={taiwan} fill="#d9e4c3" stroke="#aab995" strokeWidth="3" />
      <g stroke="#b8d4d9" strokeWidth="3" fill="none" strokeLinecap="round">
        {(outbound
          ? [
              [85, 380],
              [270, 310],
              [300, 570],
              [80, 650],
              [350, 200],
            ]
          : [
              [80, 950],
              [310, 1050],
              [410, 1190],
              [60, 1150],
              [480, 1260],
            ]
        ).map(([x, y]) => (
          <path key={x + "," + y} d={`M${x} ${y}q12 8 24 0t24 0t24 0`} />
        ))}
      </g>
      <g fontSize="25" fill="#6c98a2">
        <text x={outbound ? 140 : 150} y={outbound ? 115 : 1015}>
          台灣
        </text>
        <text x="1000" y="215">
          日本
        </text>
        <text x={outbound ? 230 : 340} y={outbound ? 395 : 1110}>
          海上航線
        </text>
      </g>
    </g>
  );
}
