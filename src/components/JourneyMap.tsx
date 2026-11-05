import { useState } from "react";
import { journeyMaps } from "../data/journeyMaps";
function Landmark({ art }: { art: string }) {
  return (
    <g
      stroke="#493c35"
      strokeWidth="2.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {art === "torii" ? (
        <>
          <path
            d="M-36 20v-66m72 66v-66M-50-58q50 10 100 0v16H-50Zm10 40h80"
            fill="#cf8b73"
          />
          <path d="M-55 25H55" />
        </>
      ) : art === "boat" ? (
        <>
          <path d="M-55-5H55L36 23H-35Z" fill="#e4b56c" />
          <path d="M-32-10v-30h64v30m-75-30q43-18 86 0Z" fill="#fffcf6" />
          <path d="M-55 32q15-8 30 0t30 0 30 0" stroke="#86afbb" fill="none" />
        </>
      ) : art === "bridge" ? (
        <>
          <path d="M-65-5Q0-35 65-5v13Q0-20-65 8Z" fill="#dfbd89" />
          <path d="M-50 4v28m25-34v28M0-10v32m25-28v28m25-18v28" />
          <path d="M-70 40q20-8 40 0t40 0 50 0" stroke="#86afbb" fill="none" />
        </>
      ) : art === "food" ? (
        <>
          <ellipse cy="0" rx="47" ry="25" fill="#fffcf6" />
          <ellipse cy="0" rx="33" ry="15" fill="#d89572" />
          <path
            d="m-20-6 30 13m-17-18 25 11m-35-31q-6-8 0-15m20 15q-6-8 0-15"
            fill="none"
          />
          <circle cx="35" cy="-17" r="10" fill="#edcf74" />
        </>
      ) : art === "airport" ? (
        <>
          <path d="M-60 22V-8H60v30Z" fill="#e4dfcb" />
          <path d="M-45-8v-18h55v18m-42-8h8m8 0h8" fill="#fffcf6" />
          <path d="M40-8v-42m-12 0h25v-12H28Z" fill="#b8cbd1" />
          <path d="M-50 3H25m-60 0v19M0 3v19" stroke="#9caaac" />
        </>
      ) : art === "park" ? (
        <>
          <path d="M-65 25q65-40 130 0" fill="#c5d4a9" />
          <path d="M-25 15v-45m50 45v-60" />
          <circle cx="-25" cy="-38" r="23" fill="#aebe97" />
          <circle cx="25" cy="-48" r="29" fill="#d9b381" />
        </>
      ) : art === "view" ? (
        <>
          <path d="M-60 28q20-80 60-45 30-70 60 45" fill="#b3c2a1" />
          <path d="M-30 28Q0 4 35 13" stroke="#86afbb" strokeWidth="14" />
          <path d="M-15 28q20-25 45-20" stroke="#e7d0a3" strokeWidth="6" />
        </>
      ) : (
        <>
          <path
            d="M-49 25V-27h98v52Z"
            fill={art === "hotel" ? "#e4b56c" : "#dfc8a6"}
          />
          <path
            d={
              art === "temple"
                ? "M-62-27Q-30-30 0-68q30 38 62 41Z"
                : "m-60-27 60-35 60 35Z"
            }
            fill={art === "boathouse" ? "#acb8a7" : "#aab594"}
          />
          <path d="M-30 25V-10h18v35m24 0V-10h18v35M-48 1h96" fill="#fffcf6" />
          {art === "shop" && <path d="M-50-22H50v15H-50Z" fill="#d9957c" />}
          {art === "hotel" && <path d="M-9-42V-27m18-15v15m-18-8H9" />}
          {art === "boathouse" && (
            <path
              d="M-58 35q17-8 34 0t34 0 34 0"
              stroke="#86afbb"
              fill="none"
            />
          )}
        </>
      )}
    </g>
  );
}
export function JourneyMap({
  day,
  animate = true,
}: {
  day: number;
  animate?: boolean;
}) {
  const data = journeyMaps[day];
  const [reduce] = useState(
    () =>
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  if (!data) return null;
  const color = {
    rail: "#8f82ab",
    walk: "#a38c71",
    bus: "#aa85ad",
    flight: "#b97b63",
  };
  const lines = (
    x: number,
    y: number,
    rows: string[],
    size = 25,
    fill = "#493c35",
  ) => (
    <text x={x} y={y} fontSize={size} fill={fill}>
      {rows.map((row, i) => (
        <tspan key={row} x={x} dy={i ? size * 1.5 : 0}>
          {row}
        </tspan>
      ))}
    </text>
  );
  const notes = data.notes.flatMap((note) => {
    const rows: string[] = [];
    let line = "";
    let units = 0;
    for (const char of note) {
      const next = /[\x00-\x7f]/.test(char) ? 0.55 : 1;
      if (units + next > 43) {
        rows.push(line);
        line = "";
        units = 0;
      }
      line += char;
      units += next;
    }
    if (line) rows.push(line);
    return rows;
  });
  return (
    <svg
      className="arashiyama-map"
      viewBox="0 0 1200 1550"
      role="img"
      aria-label={`${data.region}交通與景點示意圖`}
    >
      <rect width="1200" height="1550" rx="26" fill="#fffcf6" />
      <path
        d="M80 175 240 110 390 145 510 90 650 150 820 125 1080 230 1130 440 1090 650 1140 880 1070 1185 830 1280 660 1200 460 1290 220 1200 100 960 140 740 55 470Z"
        fill={day === 3 ? "#edf0e5" : "#f5efdf"}
        stroke="#d8cbb0"
        strokeWidth="3"
        strokeDasharray="8 10"
      />
      {day === 3 ? (
        <>
          <path
            d="M50 170Q260 20 530 180T1150 200"
            stroke="#d2e8e7"
            strokeWidth="65"
            fill="none"
          />
          <path
            d="M50 170Q260 20 530 180T1150 200"
            stroke="#9fc6cb"
            strokeWidth="8"
            fill="none"
          />
        </>
      ) : (
        <>
          <path
            d="M80 180q100-100 210 0 110-130 230 0 130-100 250 10 120-100 280 50"
            fill="#dce3c5"
            stroke="#bfcca3"
            strokeWidth="4"
          />
          <path
            d="M730 140Q570 600 690 1230"
            stroke="#d6e7e5"
            strokeWidth="16"
            fill="none"
            opacity=".7"
          />
        </>
      )}
      {lines(55, 55, [data.region], 27, "#9c876b")}
      {lines(55, 95, ["區域與行程順序示意・非比例地圖"], 22, "#9c876b")}
      <g transform="translate(1130 80)">
        <path d="m0-15-10 25L0 3 10 10Z" fill="#493c35" />
        {lines(-10, -30, ["北"], 21)}
      </g>
      {data.legs.map((leg, i) => (
        <g key={i}>
          <path
            d={leg.path}
            fill="none"
            stroke={color[leg.kind]}
            strokeWidth={leg.kind === "walk" ? 5 : 7}
            strokeDasharray={
              leg.kind === "walk"
                ? "4 12"
                : leg.kind === "flight"
                  ? "10 14"
                  : undefined
            }
            strokeLinecap="round"
          />
          {leg.kind === "rail" && (
            <path d={leg.path} fill="none" stroke="#fffcf6" strokeWidth="2" />
          )}
          <text
            x={leg.x}
            y={leg.y}
            fontSize="23"
            fill={color[leg.kind]}
            paintOrder="stroke"
            stroke="#fffcf6"
            strokeWidth="7"
            strokeLinejoin="round"
          >
            {leg.text}
          </text>
        </g>
      ))}
      {data.stops.map((stop, i) => {
        const width = Math.max(185, [...stop.name].length * 25 + 50);
        return (
          <g
            key={stop.name}
            data-map-stop={i + 1}
            transform={`translate(${stop.x} ${stop.y})`}
          >
            <Landmark art={stop.art} />
            <rect
              x={-width / 2}
              y="42"
              width={width}
              height="45"
              rx="16"
              fill="#fffcf6"
              stroke="#c3ad92"
              strokeWidth="1.6"
            />
            <circle
              cx={-width / 2 + 21}
              cy="64"
              r="13"
              fill={day === 3 ? "#d7e8e8" : "#f0d2b3"}
              stroke="#8b755e"
            />
            <text x={-width / 2 + 21} y="70" textAnchor="middle" fontSize="18">
              {i + 1}
            </text>
            <text
              x="15"
              y="72"
              textAnchor="middle"
              fontSize="25"
              fill="#493c35"
            >
              {stop.name}
            </text>
            <text
              y="116"
              textAnchor="middle"
              fontSize="22"
              fill="#9c876b"
              paintOrder="stroke"
              stroke="#fffcf6"
              strokeWidth="5"
            >
              {stop.note}
            </text>
          </g>
        );
      })}
      {[
        { x: 80, y: 1010 },
        { x: 1080, y: 550 },
        { x: 550, y: 180 },
      ].map((p, i) => (
        <path
          key={i}
          transform={`translate(${p.x} ${p.y})`}
          d="m0-20 7 10 13-6-3 14 15 1-14 9 5 12-17-7-12 8 3-13-13-9 14-2Z"
          fill={i % 2 ? "#e1b16b" : "#cf8863"}
        />
      ))}
      {data.flight && (
        <g
          transform={
            animate && !reduce
              ? undefined
              : day === 1
                ? "translate(440 510)"
                : "translate(250 1160)"
          }
        >
          {animate && !reduce && (
            <animateMotion
              path={data.flight}
              dur="5s"
              begin="0s"
              fill="freeze"
              rotate="auto"
            />
          )}
          <g
            transform={
              animate && !reduce
                ? "rotate(0)"
                : day === 1
                  ? "rotate(25)"
                  : "rotate(155)"
            }
            stroke="#493c35"
            strokeWidth="2.5"
            strokeLinejoin="round"
          >
            <path
              d="m-40-7 29-3 10-32 10 1 1 31 31 9v10L8 4-3 32h-9l4-30-30 2Z"
              fill="#fffcf6"
            />
            <path d="m-30-6 3-12 7 1 1 10" fill="#d9957c" />
          </g>
        </g>
      )}
      <rect
        x="50"
        y="1320"
        width="1100"
        height="190"
        rx="24"
        fill={day === 3 ? "#e2ebea" : "#f3e3ce"}
        stroke="#d0bda4"
        strokeWidth="2"
      />
      {lines(75, 1360, notes, 23, "#806d58")}
    </svg>
  );
}
