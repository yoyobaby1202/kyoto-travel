import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Download,
  RotateCcw,
  AlertCircle,
  Bus,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { days, tourStops } from "../data/itinerary";
import { findPlace } from "../data/places";
import { DailyTimeline } from "../components/DailyTimeline";
import { MapLink } from "../components/Common";
import { Illustration } from "../components/Illustration";
import { useLocal } from "../utils/store";
import { activeDay, delayEvents, download, overlaps } from "../utils/time";
import type { Event } from "../types";
export function Itinerary() {
  const [params, setParams] = useSearchParams();
  const id = Math.min(5, Math.max(1, Number(params.get("day")) || activeDay()));
  const day = days[id - 1];
  const [edits, save, ready, error] = useLocal<Record<string, Event[]>>(
    "itinerary-edits",
    {},
  );
  const [order, saveOrder, orderReady] = useLocal<string[]>(
    "tour-order",
    tourStops,
  );
  const [message, setMessage] = useState("");
  const [delay, setDelay] = useState(30);
  const [from, setFrom] = useState(0);
  const events = edits[id] || day.events;
  const conflicts = overlaps(events);
  const change = (ev: Event[]) => {
    void save({ ...edits, [id]: ev }).catch(() => {});
  };
  return (
    <>
      <div className="page-title">
        <span className="eyebrow">OUR DAILY ITINERARY</span>
        <h1>京都，一天一頁。</h1>
        <p>把時間留給喜歡的風景。所有時間均為日本時間 Asia/Tokyo。</p>
      </div>
      <div className="day-tabs">
        {days.map((d) => (
          <button
            className={id === d.id ? "selected" : ""}
            onClick={() => {
              setParams({ day: String(d.id) });
              setFrom(0);
              setMessage("");
            }}
            key={d.id}
          >
            <small>DAY 0{d.id}</small>
            <strong>
              12.{d.id + 9} <span>週{d.weekday}</span>
            </strong>
          </button>
        ))}
      </div>
      <section className="day-banner">
        <div>
          <span className="eyebrow">
            DAY 0{id} / {day.date}
          </span>
          <h2>{day.title}</h2>
          <p>{day.ja}</p>
        </div>
        <Illustration kind={day.art} />
      </section>
      <div className="itinerary-layout">
        <div>
          <div className="timeline-toolbar">
            <span>
              <span className="live-dot" />{" "}
              {events.filter((e) => e.done).length}/{events.length} 已完成
            </span>
            <div>
              <button
                className="text-link"
                onClick={() =>
                  download(`kyoto-day-${id}.json`, {
                    version: 1,
                    day: id,
                    date: day.date,
                    timeZone: "Asia/Tokyo",
                    events,
                  })
                }
              >
                <Download size={14} />
                匯出這一天
              </button>
              <button
                className="text-link"
                disabled={!ready}
                onClick={() => {
                  const next = { ...edits };
                  delete next[id];
                  void save(next).catch(() => {});
                }}
              >
                <RotateCcw size={13} />
                還原
              </button>
            </div>
          </div>
          {conflicts.length > 0 && (
            <div className="warning" role="alert">
              <strong>發現時間重疊</strong>
              {conflicts.map((c) => (
                <p key={c}>{c}</p>
              ))}
            </div>
          )}
          <DailyTimeline
            day={day}
            events={events}
            onChange={change}
            ready={ready}
          />
        </div>
        <aside className="itinerary-aside">
          <section className="paper-card">
            <span className="eyebrow">MAKE IT YOUR OWN</span>
            <h3>走自己的步調</h3>
            <p>
              編輯時間、上下移動卡片，依當天的心情調整。順序調整不會自動更動時間。
            </p>
            <label>
              從哪個行程開始重算
              <select
                value={Math.min(from, events.length - 1)}
                onChange={(e) => setFrom(Number(e.target.value))}
              >
                {events.map((e, i) => (
                  <option value={i} key={e.id}>
                    {e.start} {e.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              延後分鐘
              <input
                type="number"
                min="0"
                max="240"
                step="5"
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
              />
            </label>
            <button
              className="primary"
              disabled={!ready}
              onClick={() => {
                try {
                  if (!Number.isFinite(delay) || delay < 0 || delay > 240)
                    throw new Error("請輸入0–240分鐘");
                  change(delayEvents(events, delay, from));
                  setMessage(
                    "已重算彈性時段。固定班次未變動，請檢查重疊並決定是否改搭其他班次。",
                  );
                } catch (e) {
                  setMessage((e as Error).message);
                }
              }}
            >
              延誤後重新估算
            </button>
            {message && (
              <p role="status" className="note">
                {message}
              </p>
            )}
            <p className="small muted">
              固定航班／列車／船班不自動更動。跨時段衝突會警示，不代表能趕上。
            </p>
          </section>
          {id === 2 && (
            <section className="paper-card purple">
              <Bus size={24} />
              <h3>小火車之後，還要搭巴士</h3>
              <p>トロッコ亀岡站 → 站外39系統巴士 → 保津川下り乘船場。</p>
              <p className="small">
                官方現行10:35發車，旅行日適用性待確認。車程、票價與報到時間待核對；Google
                Maps可能未收錄此接駁。
              </p>
              <a
                className="text-link"
                target="_blank"
                rel="noreferrer"
                href="https://www.keihankyotokotsu.jp/bustimetable/timetable.php?no=1&stop_cd=2050"
              >
                優先查看官方接駁說明 ↗
              </a>
              <MapLink query={findPlace("boat")?.query}>乘船場參考導航</MapLink>
              <hr />
              <h3>如果遊船取消了…</h3>
              <p>
                先確認接駁巴士是否一併停駛。小火車龜岡步行至JR馬堀站（步行路程待導航確認），搭JR返回嵯峨嵐山；提早午餐，下午改走渡月橋、竹林與野宮神社。
              </p>
              <MapLink query="嵯峨嵐山駅" origin="馬堀駅" mode="transit">
                替代 JR 路線
              </MapLink>
            </section>
          )}
          {id === 3 && (
            <section className="paper-card">
              <AlertCircle size={24} />
              <h3>09:00 Klook 集合</h3>
              <p>
                建議08:45前到京都站八條東口觀光巴士停車場。精確停車格與導遊識別依訂單憑證。
              </p>
              <MapLink query={findPlace("meeting")?.query}>
                集合區域參考導航
              </MapLink>
              <p className="note">
                目前沒有商品頁／憑證，無法驗證精確集合點。不要只依此區域連結找車。
              </p>
              <hr />
              <h3>海之京都・彈性景點順序</h3>
              <p className="small">
                包含伊根至天橋立的巴士移動。11:30–15:30為規劃區間，非Klook保證；船谷部展望台與Ine
                Cafe boat
                dock精確名稱及是否含於團程待憑證確認，暫不提供可能導錯的導航。
              </p>
              {order.map((p, i) => (
                <div className="tour-stop" key={p}>
                  <span>{findPlace(p)?.name}</span>
                  <div>
                    <button
                      disabled={!orderReady || !i}
                      aria-label="景點上移"
                      onClick={() => {
                        const n = [...order];
                        [n[i - 1], n[i]] = [n[i], n[i - 1]];
                        void saveOrder(n).catch(() => {});
                      }}
                    >
                      <ArrowUp size={13} />
                    </button>
                    <button
                      disabled={!orderReady || i === order.length - 1}
                      aria-label="景點下移"
                      onClick={() => {
                        const n = [...order];
                        [n[i + 1], n[i]] = [n[i], n[i + 1]];
                        void saveOrder(n).catch(() => {});
                      }}
                    >
                      <ArrowDown size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </section>
          )}
          <p className="local-notice">
            本機編輯僅儲存在這支手機，不會自動同步給另一位旅人。共同公開版本以
            Repository 重新部署為準。
          </p>
          {error && (
            <p role="alert" className="warning">
              {error}
            </p>
          )}
        </aside>
      </div>
    </>
  );
}
