import { useState } from "react";
import {
  Clock3,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Pencil,
  LockKeyhole,
  Check,
} from "lucide-react";
import type { Day, Event } from "../types";
import { findPlace, restaurants } from "../data/places";
import { routes } from "../data/transport";
import { minutes, tokyoNow } from "../utils/time";
import { MapLink, StatusBadge, TransportBadge, modeIcons } from "./Common";
import { TrainRouteCard } from "./TrainRouteCard";
import { RestaurantCard } from "./RestaurantCard";
import { Illustration } from "./Illustration";
export function DailyTimeline({
  day,
  events,
  onChange,
  ready,
}: {
  day: Day;
  events: Event[];
  onChange: (events: Event[]) => void;
  ready: boolean;
}) {
  const [edit, setEdit] = useState<string>();
  const [error, setError] = useState("");
  const now = tokyoNow();
  const t = now.slice(11, 16);
  function move(i: number, delta: number) {
    const n = [...events];
    [n[i], n[i + delta]] = [n[i + delta], n[i]];
    onChange(n);
  }
  return (
    <div className="timeline">
      {error && (
        <p role="alert" className="warning">
          {error}
        </p>
      )}
      {events.map((event, i) => {
        const p = findPlace(event.place);
        const route = routes.find((r) => r.id === event.route);
        const restaurant = restaurants.find((r) => r.id === event.restaurant);
        const Icon = modeIcons[event.mode];
        const active =
          now.slice(0, 10) === day.date && t >= event.start && t < event.end;
        return (
          <article
            className={`timeline-item ${active ? "is-current" : ""} ${event.done ? "is-done" : ""}`}
            key={event.id}
          >
            <div className="timeline-time">
              <strong>{event.start}</strong>
              <small>{event.end}</small>
            </div>
            <div className={`timeline-dot ${event.mode}`}>
              <Icon size={17} />
            </div>
            <div className="timeline-card">
              {active && <div className="current-ribbon">現在進行中</div>}
              <div className="timeline-main">
                <div className="timeline-copy">
                  <div className="event-tags">
                    <TransportBadge mode={event.mode} />
                    <StatusBadge status={event.status} />
                    {event.fixed && (
                      <span className="small fixed">
                        <LockKeyhole size={11} />
                        班次保留
                      </span>
                    )}
                  </div>
                  <h3>{event.title}</h3>
                  <span className="duration">
                    <Clock3 size={12} /> {event.start}–{event.end} ·{" "}
                    {minutes(event.end) - minutes(event.start)}分鐘
                  </span>
                  {event.note && <p className="event-note">{event.note}</p>}
                  <MapLink
                    query={p?.query}
                    mode={
                      ["train", "bus"].includes(event.mode)
                        ? "transit"
                        : "walking"
                    }
                  >
                    {["train", "bus"].includes(event.mode)
                      ? "導航到目的地"
                      : "開啟導航"}
                  </MapLink>
                </div>
                {p && event.mode === "visit" && (
                  <Illustration kind={p.art} className="timeline-thumb" zoom />
                )}
              </div>
              <div className="timeline-actions">
                <button
                  disabled={!ready}
                  aria-label={`${event.done ? "取消完成" : "完成"}${event.title}`}
                  className={`complete-button ${event.done ? "checked" : ""}`}
                  onClick={() =>
                    onChange(
                      events.map((e) =>
                        e.id === event.id ? { ...e, done: !e.done } : e,
                      ),
                    )
                  }
                >
                  <Check size={13} />
                  {event.done ? "已完成" : "完成行程"}
                </button>
                <div>
                  <button
                    disabled={!ready || event.fixed}
                    title={event.fixed ? "固定班次不可自動更動" : "編輯時間"}
                    onClick={() =>
                      setEdit(edit === event.id ? undefined : event.id)
                    }
                    aria-label={`編輯${event.title}時間`}
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    disabled={!ready || i === 0}
                    onClick={() => move(i, -1)}
                    aria-label={`上移${event.title}`}
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    disabled={!ready || i === events.length - 1}
                    onClick={() => move(i, 1)}
                    aria-label={`下移${event.title}`}
                  >
                    <ArrowDown size={14} />
                  </button>
                </div>
              </div>
              {edit === event.id && (
                <form
                  className="time-editor"
                  onSubmit={(ev) => {
                    ev.preventDefault();
                    const form = new FormData(ev.currentTarget);
                    const start = String(form.get("start")),
                      end = String(form.get("end"));
                    if (minutes(end) <= minutes(start)) {
                      setError("結束時間必須晚於開始時間");
                      return;
                    }
                    onChange(
                      events.map((e) =>
                        e.id === event.id ? { ...e, start, end } : e,
                      ),
                    );
                    setEdit(undefined);
                    setError("");
                  }}
                >
                  <label>
                    開始
                    <input
                      name="start"
                      type="time"
                      required
                      defaultValue={event.start}
                    />
                  </label>
                  <label>
                    結束
                    <input
                      name="end"
                      type="time"
                      required
                      defaultValue={event.end}
                    />
                  </label>
                  <button className="primary" type="submit">
                    儲存
                  </button>
                </form>
              )}
              {(route || restaurant) && (
                <details className="event-details">
                  <summary>
                    {route
                      ? "電車方向・停靠站・交通指南"
                      : "餐廳資訊・營業時間・備選"}
                    <ChevronDown size={14} />
                  </summary>
                  {route && (
                    <TrainRouteCard
                      route={route}
                      reverse={event.id === "2-13"}
                    />
                  )}
                  {restaurant && <RestaurantCard restaurant={restaurant} />}
                </details>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
