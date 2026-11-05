import { useState } from "react";
import { ZoomIn, X } from "lucide-react";
import { days } from "../data/itinerary";
import { findPlace } from "../data/places";
import { routes } from "../data/transport";
import { TrainRouteCard } from "../components/TrainRouteCard";
import { MapLink } from "../components/Common";
export function Transport() {
  const [day, setDay] = useState(2);
  const [zoom, setZoom] = useState(false);
  const [scale, setScale] = useState(1);
  const selected = days[day - 1];
  const ids =
    day === 1
      ? ["haruka-out", "nara"]
      : day === 2
        ? ["sagano", "torokko"]
        : day === 5
          ? ["haruka-back"]
          : [];
  const src = `${import.meta.env.BASE_URL}maps/day-${day}.svg`;
  return (
    <>
      <div className="page-title">
        <span className="eyebrow">OUR LITTLE ROUTE MAP</span>
        <h1>今天，沿著這條線旅行。</h1>
        <p>每天一張交通小抄。方位為示意，班次依官方公告與現場看板。</p>
      </div>
      <div className="map-day-tabs" aria-label="選擇交通日期">
        {days.map((d) => (
          <button
            key={d.id}
            aria-pressed={day === d.id}
            onClick={() => setDay(d.id)}
          >
            12/{9 + d.id}
            <small>{["四", "五", "六", "日", "一"][d.id - 1]}</small>
          </button>
        ))}
      </div>
      <section className="daily-route-map paper-card">
        <h2>{selected.title}</h2>
        <button
          className="route-image-button"
          onClick={() => {
            setScale(1);
            setZoom(true);
          }}
          aria-label={`放大12月${day + 9}日交通圖`}
        >
          <img
            src={src}
            alt={`${selected.title}交通圖，詳細文字與導航請展開下方資訊`}
            width="1200"
            height="1550"
          />
          <span>
            <ZoomIn size={16} /> 點圖放大查看
          </span>
        </button>
      </section>
      <details className="paper-card">
        <summary>展開站序、交通提醒與導航</summary>
        {ids.map((id) => (
          <TrainRouteCard key={id} route={routes.find((r) => r.id === id)!} />
        ))}
        {day === 2 && (
          <p className="note">
            小火車龜岡站 →
            保津川遊船乘船場須搭39系統接駁巴士。10:35現行班次需再核對12/11適用情況；車程、票價與冬季船班待確認。停駛時巴士可能全停。
            <a
              href="https://www.keihankyotokotsu.jp/bustimetable/timetable.php?no=1&stop_cd=2050"
              target="_blank"
              rel="noreferrer"
            >
              官方接駁時刻 ↗
            </a>
          </p>
        )}
        {day === 3 && (
          <p className="note">
            08:45前抵達八條東口，精確集合點依Klook憑證。觀光巴士包含伊根與天橋立之間的移動；景點時間與順序均由旅行團安排。
          </p>
        )}
        {day === 4 && (
          <p className="note">
            清水寺去程採市巴士加步行，含候車預留60分鐘。回程阪急京都河原町→烏丸1區間，步行轉四条，地下鐵經五条至京都2區間。方向與月台依當日看板。
            <a
              href="https://www2.city.kyoto.lg.jp/kotsu/tikadia/hyperdia/line02.htm"
              target="_blank"
              rel="noreferrer"
            >
              地下鐵官方站序 ↗
            </a>
          </p>
        )}
        <div className="map-stop-links">
          {selected.events
            .filter(
              (e) => e.place && !(e.place === "hotel" && e.mode === "food"),
            )
            .map((e) => (
              <span key={e.id}>
                <MapLink
                  query={findPlace(e.place)?.query}
                  mode={
                    e.mode === "train" || e.mode === "bus"
                      ? "transit"
                      : "walking"
                  }
                >
                  {e.title}
                </MapLink>
              </span>
            ))}
        </div>
      </details>
      <p className="local-notice">
        查核日期2026/11/05。此頁沒有即時到站資訊；HARUKA、冬季遊船及接駁班次仍待確認。離線可看示意圖，外部導航需要網路。
      </p>
      {zoom && (
        <div
          className="route-zoom"
          role="dialog"
          aria-modal="true"
          aria-label="交通圖放大檢視"
          onKeyDown={(e) => {
            if (e.key === "Escape") setZoom(false);
          }}
        >
          <div className="route-zoom-tools">
            <button autoFocus onClick={() => setZoom(false)}>
              <X size={18} />
              關閉
            </button>
            <button
              onClick={() => setScale(Math.max(1, scale - 0.5))}
              disabled={scale === 1}
            >
              縮小
            </button>
            <button
              onClick={() => setScale(Math.min(4, scale + 0.5))}
              disabled={scale === 4}
            >
              放大
            </button>
          </div>
          <div className="route-zoom-scroll">
            <img
              src={src}
              alt={`${selected.title}詳細交通圖`}
              style={{ width: `${scale * 100}%`, maxWidth: "none" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
