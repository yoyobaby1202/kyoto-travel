import { useSearchParams } from "react-router-dom";
import { selectedTripDay } from "../utils/selectedTripDay";
import { useState } from "react";
import { ZoomIn, X } from "lucide-react";
import { TrainDayPicker } from "../components/TrainDayPicker";
import { IllustratedJourneyMap } from "../components/IllustratedJourneyMap";
import { ArashiyamaMap } from "../components/ArashiyamaMap";
import { days } from "../data/itinerary";
import { geographySources } from "../data/geography";
import { findPlace } from "../data/places";
import { routes } from "../data/transport";
import { TrainRouteCard } from "../components/TrainRouteCard";
import { MapLink } from "../components/Common";
export function Transport() {
  const [params, setParams] = useSearchParams();
  const day = selectedTripDay(params.toString());
  const setDay = (n: number) =>
    setParams({ day: String(n) }, { preventScrollReset: true });
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
  return (
    <>
      <div className="page-title">
        <span className="eyebrow">OUR LITTLE ROUTE MAP</span>
        <h1>今天，沿著這條線旅行。</h1>
        <p>每天一張交通小抄。方位為示意，班次依官方公告與現場看板。</p>
      </div>
      <TrainDayPicker selected={day} onSelect={setDay} />
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
          {day === 2 ? (
            <ArashiyamaMap />
          ) : (
            <IllustratedJourneyMap key={day} day={day} />
          )}
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
            保津川遊船乘船場，搭乘39系統接駁巴士，10:35出發。乘車位置及運行資訊請見官方接駁說明。
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
      <details className="paper-card">
        <summary>方位與地圖資料來源</summary>
        <p>
          各圖均北朝上，依地標位置核對東西南北。跨海、關西與京都採分區縮尺，近距離景點已放大，標籤另作避讓；線條為交通示意，並非實際道路或海岸線。
        </p>
        {geographySources.map((s) => (
          <p key={s.url}>
            <a
              className="text-link"
              href={s.url}
              target="_blank"
              rel="noreferrer"
            >
              {s.title} ↗
            </a>
          </p>
        ))}
      </details>
      <p className="local-notice">
        離線可查看交通圖與景點資訊，Google Maps導航及官方網站需要網路。
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
            <div style={{ width: `${scale * 100}%` }}>
              {day === 2 ? (
                <ArashiyamaMap animate={false} />
              ) : (
                <IllustratedJourneyMap day={day} animate={false} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
