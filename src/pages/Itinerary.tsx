import { useSearchParams } from "react-router-dom";
import { Download, AlertCircle, Bus } from "lucide-react";
import { dayPalette as palette } from "../data/dayPalette";
import { days, tourStops } from "../data/itinerary";
import { findPlace } from "../data/places";
import { DailyTimeline } from "../components/DailyTimeline";
import { TrainDayPicker } from "../components/TrainDayPicker";
import { DayArtwork } from "../components/DayArtwork";
import { MapLink } from "../components/Common";
import { useLocal } from "../utils/store";
import { selectedTripDay } from "../utils/selectedTripDay";
import { download } from "../utils/time";
export function Itinerary() {
  const [params, setParams] = useSearchParams();
  const id = selectedTripDay(params.toString());
  const day = days[id - 1];
  const [completed, save, ready, error] = useLocal<Record<string, boolean>>(
    "completed-stops",
    {},
  );
  return (
    <section
      className="journey-page"
      style={
        {
          "--md-day": palette[id - 1][0],
          "--md-day-soft": palette[id - 1][1],
        } as React.CSSProperties
      }
    >
      <TrainDayPicker
        selected={id}
        onSelect={(n) =>
          setParams({ day: String(n) }, { preventScrollReset: true })
        }
      />
      <div className="md-chapter">
        <DayArtwork day={id} />
        <div>
          <small>
            Day {id} · {day.ja}
          </small>
          <h2>{day.title}</h2>
          <p>{day.subtitle}</p>
        </div>
      </div>
      <div className="timeline-toolbar">
        <span>
          {day.events.filter((e) => completed[e.id]).length}/
          {
            day.events.filter(
              (e) =>
                !["train", "walk", "bus", "boat", "flight"].includes(e.mode),
            ).length
          }{" "}
          站已收藏
        </span>
        <button
          className="text-link"
          onClick={() =>
            download(`kyoto-day-${id}.json`, {
              version: 2,
              day: id,
              date: day.date,
              events: day.events,
              completed,
            })
          }
        >
          <Download size={12} />
          匯出這一天
        </button>
      </div>
      <DailyTimeline
        day={day}
        completed={completed}
        ready={ready}
        onComplete={(eventId) =>
          void save({ ...completed, [eventId]: !completed[eventId] }).catch(
            () => {},
          )
        }
      />
      {id === 2 && (
        <details className="day-reminder">
          <summary>
            <Bus size={15} />
            接駁與停航備案
          </summary>
          <div>
            <h3>小火車之後，還要搭巴士</h3>
            <p>
              トロッコ亀岡站 → 站外39系統巴士 →
              保津川下り乘船場。09:25–10:00安排轉乘，11:00登船，報到依票券資訊。
            </p>
            <a
              className="text-link"
              href="https://www.keihankyotokotsu.jp/bustimetable/timetable.php?no=1&stop_cd=2050"
              target="_blank"
              rel="noreferrer"
            >
              官方接駁說明 ↗
            </a>
            <MapLink query={findPlace("boat")?.query}>乘船場參考導航</MapLink>
            <h3>如果遊船取消</h3>
            <p>
              先確認接駁是否一併停駛。從小火車龜岡步行至JR馬堀站（依導航確認步行路程），搭JR返回嵯峨嵐山；改為提早午餐、渡月橋、竹林與野宮神社。
            </p>
            <MapLink query="嵯峨嵐山駅" origin="馬堀駅" mode="transit">
              替代JR路線
            </MapLink>
          </div>
        </details>
      )}
      {id === 4 && (
        <details className="day-reminder" open>
          <summary>
            <AlertCircle size={15} />
            09:00 Klook 集合提醒
          </summary>
          <div>
            <p>
              08:45前抵達京都站八條東口觀光巴士停車場。精確停車格與導遊標示依訂單憑證，目前僅能提供集合區域參考導航。
            </p>
            <MapLink query={findPlace("meeting")?.query}>
              集合區域參考導航
            </MapLink>
            <p>
              包含伊根至天橋立車程；景點時間與順序依導遊安排，非官方保證。船谷部展望台與Ine
              Cafe boat dock精確位置待憑證確認。
            </p>
            <div className="tour-stop-list">
              {tourStops.map((p) => (
                <span key={p}>{findPlace(p)?.name}</span>
              ))}
            </div>
          </div>
        </details>
      )}
      {error && (
        <p role="alert" className="warning">
          {error}
        </p>
      )}
      <p className="md-day-note">
        日本時間 · 桃園起飛與抵達桃園另標台灣時間
        <br />
        交通班次與預約狀態以實際確認為準
      </p>
    </section>
  );
}
