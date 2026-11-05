export function FlightGeography() {
  return (
    <g aria-label="北朝上：台灣在西南，關西機場在京都西南，右上方為日本陸地">
      <rect x="50" y="120" width="1100" height="1180" rx="40" fill="#e8f2f2" />
      <path
        d="M50 120H1150V1300H1000L890 1190 810 1080 710 980 680 830 550 670 440 520 370 350 220 210 50 170Z"
        fill="#f5efdf"
        stroke="#d8cbb0"
        strokeWidth="3"
      />
      <path
        d="M148 1110Q185 1120 191 1170L155 1245Q120 1270 111 1230L126 1150Z"
        fill="#d9e4c3"
        stroke="#aab995"
        strokeWidth="3"
      />
      <path
        d="m425 1027 100-74 17 29-100 75Z"
        fill="#e5e5d3"
        stroke="#b2bda8"
        strokeWidth="3"
      />
      <path d="M533 978 705 940" fill="none" stroke="#c2c3b4" strokeWidth="5" />
      <g stroke="#b8d4d9" strokeWidth="3" fill="none" strokeLinecap="round">
        {[
          [85, 650],
          [170, 800],
          [320, 920],
          [70, 1060],
          [370, 1190],
        ].map(([x, y]) => (
          <path key={x} d={`M${x} ${y}q12 8 24 0t24 0t24 0`} />
        ))}
      </g>
      <g fontSize="25" fill="#6c98a2">
        <text x="80" y="1100">
          台灣
        </text>
        <text x="900" y="170">
          日本・關西／京都
        </text>
        <text x="110" y="950">
          海上航線
        </text>
      </g>
    </g>
  );
}
