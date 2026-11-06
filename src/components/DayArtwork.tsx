import { TrainArt } from "./TrainArt";
export function DayArtwork({ day }: { day: number }) {
  return (
    <div className="md-chapter-art">
      <svg viewBox="0 0 80 80" role="img" aria-label={`Day ${day}主題原創插畫`}>
        <g
          stroke="#493c35"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          {day === 1 ? (
            <>
              <path
                d="M20 64V22m40 42V22M12 16q28 7 56 0v12H12zM17 41h46"
                fill="#e8ae97"
              />
              <path d="M39 29v12M10 67h60" />
            </>
          ) : day === 2 ? (
            <path d="M0 59 22 35l19 15 19-31 20 27v34H0" fill="#f1dbb0" />
          ) : day === 4 ? (
            <>
              <path d="M0 56q20-6 40 0t40 0v24H0Z" fill="#c9e2e9" />
              <path d="M15 53V33h28v20M10 33l19-16 20 16Z" fill="#d6d9c8" />
              <path d="M23 39h12v14H23" fill="#fffcf6" />
              <path d="M50 57h21l-6 10H55Z" fill="#e9b795" />
            </>
          ) : day === 3 ? (
            <>
              <path d="M15 66V35h50v31M9 36l31-21 31 21Z" fill="#e7ceaf" />
              <path d="M22 41v23m12-23v23m12-23v23m12-23v23M10 68h60" />
              <path d="M28 17V9h24v8" fill="#e7ceaf" />
            </>
          ) : (
            <>
              <rect
                x="19"
                y="24"
                width="43"
                height="42"
                rx="7"
                fill="#e7bc7d"
              />
              <path d="M31 24V14h19v10m-22 1v39m25-39v39" fill="none" />
              <circle cx="28" cy="69" r="3" fill="#493c35" />
              <circle cx="53" cy="69" r="3" fill="#493c35" />
            </>
          )}
        </g>
        {day === 2 && <TrainArt x="4" y="28" width="72" height="42" />}
      </svg>
    </div>
  );
}
