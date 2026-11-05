import type { Event } from "../types";
import { TrainArt } from "./TrainArt";
export function EventArtwork({ event }: { event: Event }) {
  const train = event.mode === "train";
  const food = event.mode === "food";
  const hotel = event.place === "hotel";
  return (
    <svg className="event-art" viewBox="0 0 80 70" aria-hidden="true">
      <rect
        x="2"
        y="2"
        width="76"
        height="66"
        rx="18"
        fill={food ? "#f3dfbd" : hotel ? "#e8dfd0" : "#e4e8d5"}
      />
      {train ? (
        <TrainArt x={4} y={16} width={72} height={43} />
      ) : (
        <g
          stroke="#493c35"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {food ? (
            <>
              <ellipse cx="40" cy="44" rx="26" ry="15" fill="#fffcf6" />
              <ellipse
                cx="40"
                cy="43"
                rx="19"
                ry="10"
                fill={event.restaurant === "hiro" ? "#c77862" : "#e0b77b"}
              />
              <path
                d="m26 39 20 10m-13-14 20 10M29 23q-4-5 0-10m12 10q-4-5 0-10"
                fill="none"
              />
              {event.restaurant === "lemon" && (
                <circle cx="55" cy="34" r="8" fill="#edcf74" />
              )}
            </>
          ) : event.mode === "boat" ? (
            <>
              <path d="M12 40h56L57 55H25Z" fill="#d6a077" />
              <path d="M20 58q10-5 20 0t24 0M39 17v22l18-3Z" fill="#f6dfac" />
            </>
          ) : event.mode === "bus" ? (
            <>
              <rect
                x="13"
                y="20"
                width="54"
                height="33"
                rx="9"
                fill="#b9a1c5"
              />
              <path d="M21 27h35v13H21Z" fill="#fffcf6" />
              <circle cx="25" cy="55" r="5" fill="#493c35" />
              <circle cx="56" cy="55" r="5" fill="#493c35" />
            </>
          ) : hotel ? (
            <>
              <path d="M17 56V27l23-12 23 12v29Z" fill="#e5bb83" />
              <path d="M32 56V39h16v17M24 29h7m18 0h7M24 35h7m18 0h7" />
            </>
          ) : event.mode === "flight" ? (
            <path
              d="m12 37 23-4 5-19 6 1 1 17 19 8-1 6-21-4-9 14-5-2 5-15-21 4Z"
              fill="#fffcf6"
            />
          ) : event.place === "fushimi" || event.place === "yasaka" ? (
            <>
              <path
                d="M21 57V25m38 32V25M13 18q27 6 54 0v10H13Zm6 20h43"
                fill="#d88d77"
              />
              <path d="M10 59h60" />
            </>
          ) : event.place === "bamboo" ? (
            <>
              <path
                d="M24 60V12m15 48V8m17 52V15M18 26h12m3 12h12m5-9h12"
                stroke="#798c66"
              />
              <path d="m23 29-12-8m30 0 10-9m4 36 14-8" />
            </>
          ) : (
            <>
              <path d="M14 55V33h52v22M9 33l31-19 31 19Z" fill="#e7bd8e" />
              <path d="M22 39v16m12-16v16m12-16v16m12-16v16M9 58h62" />
            </>
          )}
        </g>
      )}
    </svg>
  );
}
