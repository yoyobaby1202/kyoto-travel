import { TrainFront, ExternalLink, Footprints } from "lucide-react";
import type { Route } from "../types";
import { MapLink } from "./Common";
export function TrainRouteCard({
  route,
  reverse = false,
}: {
  route: Route;
  reverse?: boolean;
}) {
  const stations = reverse ? [...route.stations].reverse() : route.stations;
  return (
    <article
      className="route-card"
      style={{ "--route-color": route.color } as React.CSSProperties}
    >
      <header>
        <span className="route-icon">
          <TrainFront size={22} />
        </span>
        <div>
          <span className="eyebrow">TRAIN GUIDE</span>
          <h3>
            {route.name}
            {reverse ? "・回程" : ""}
          </h3>
        </div>
      </header>
      <p className="route-direction">
        {reverse ? "往京都方向，請搭普通列車" : route.direction}
      </p>
      <p className="small">{route.duration}</p>
      <details open>
        <summary>
          查看路線圖{" "}
          {route.confirmedStops
            ? `· ${stations.length - 1}個站間區間／中途${stations.length - 2}站`
            : "· 中途停靠待確認"}
        </summary>
        <div className="station-diagram">
          <svg
            viewBox={`0 0 44 ${stations.length * 48}`}
            width="44"
            height={stations.length * 48}
            aria-hidden="true"
          >
            <path
              d={`M22 24V${(stations.length - 1) * 48 + 24}`}
              stroke={route.color}
              strokeWidth="4"
              strokeDasharray={route.confirmedStops ? undefined : "5 5"}
            />
            {stations.map((_, i) => (
              <circle
                key={i}
                cx="22"
                cy={i * 48 + 24}
                r={i === 0 || i === stations.length - 1 ? 8 : 5}
                fill={
                  i === 0 || i === stations.length - 1 ? route.color : "#faf7f0"
                }
                stroke={route.color}
                strokeWidth="2"
              />
            ))}
          </svg>
          <div>
            {stations.map((s, i) => (
              <div className="station" key={s}>
                <strong>{s}</strong>
                <span>
                  {i === 0
                    ? "上車"
                    : i === stations.length - 1
                      ? "下車"
                      : "中途停靠"}
                </span>
              </div>
            ))}
          </div>
        </div>
        {route.walk && (
          <p className="walk-note">
            <svg width="16" height="30" viewBox="0 0 16 30" aria-hidden="true">
              <path
                d="M8 0v30"
                stroke="#b1af97"
                strokeWidth="2"
                strokeDasharray="3 4"
              />
            </svg>
            <Footprints size={15} />
            {route.walk}
          </p>
        )}
      </details>
      <p className="note">{route.note}</p>
      <div className="button-row">
        <MapLink query={reverse ? route.to : route.from}>導航到上車站</MapLink>
        <MapLink
          query={reverse ? route.from : route.to}
          origin={reverse ? route.to : route.from}
          mode="transit"
        >
          查看大眾運輸路線
        </MapLink>
        <a
          className="text-link"
          href={route.official}
          target="_blank"
          rel="noreferrer"
        >
          官方資訊 <ExternalLink size={12} />
        </a>
      </div>
    </article>
  );
}
