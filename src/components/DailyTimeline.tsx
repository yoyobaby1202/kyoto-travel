import { ChevronDown, Check } from "lucide-react";
import { travelCopy } from "../utils/travelCopy";
import type { Day, Event } from "../types";
import { findPlace } from "../data/places";
import { routes } from "../data/transport";
import { tokyoNow } from "../utils/time";
import { displayTime } from "../utils/displayTime";
import { MapLink, StatusBadge, TransportBadge } from "./Common";
import { TrainRouteCard } from "./TrainRouteCard";
import { EventArtwork } from "./EventArtwork";
import { MealCard } from "./MealCard";
export function DailyTimeline({
  day,
  completed,
  onComplete,
  ready,
}: {
  day: Day;
  completed: Record<string, boolean>;
  onComplete: (id: string) => void;
  ready: boolean;
}) {
  const now = tokyoNow();
  return (
    <div className="md-timeline">
      {day.events.map((event: Event) => {
        const p = findPlace(event.place);
        const eventRoutes = [event.route, ...(event.connections || [])]
          .map(id => routes.find(r => r.id === id)).filter(r => r !== undefined);
        const clock = displayTime(event);
        const transport = ["train", "walk", "bus", "boat", "flight"].includes(
          event.mode,
        );
        const active =
          now.slice(0, 10) === day.date &&
          now.slice(11, 16) >= event.start &&
          now.slice(11, 16) < event.end;
        const done = completed[event.id];
        return (
          <article
            className={`md-item ${transport ? "transport-row" : ""} ${active ? "is-current" : ""} ${done ? "is-done" : ""}`}
            key={event.id}
          >
            <div className="md-hour">
              <strong>{clock.start}</strong>
              {clock.startZone === "台灣" && <small>台灣</small>}
              <small>
                {clock.end}
                {clock.endZone === "台灣" ? " 台灣" : ""}
              </small>
            </div>
            <span
              className={`md-node ${transport ? "" : "filled"}`}
              aria-hidden="true"
            />
            <div className={transport ? "md-transport" : "md-stop"}>
              {active && <span className="current-ribbon">現在進行中</span>}
              <EventArtwork event={event} />
              {transport ? (
                <div className="md-transport-title">
                  <TransportBadge mode={event.mode} />
                  <h3>{event.title}</h3>
                </div>
              ) : (
                <div className="stop-heading">
                  <h3>{event.title}</h3>
                  <StatusBadge status={event.status} />
                </div>
              )}
              <p className="event-time">
                {clock.start}
                {clock.startZone ? `（${clock.startZone}）` : ""}–{clock.end}
                {clock.endZone ? `（${clock.endZone}）` : ""}
              </p>
              {event.note && travelCopy(event.note) && (
                <p>{travelCopy(event.note)}</p>
              )}
              {event.meal ? (
                <MealCard
                  slotId={event.id}
                  preset={event.restaurant}
                  confirmed={event.status === "已確認"}
                />
              ) : (
                <div className="md-stop-actions">
                  {p?.query &&
                    !(event.place === "hotel" && event.mode === "food") && (
                      <MapLink
                        query={p.query}
                        mode={
                          event.mode === "train" || event.mode === "bus"
                            ? "transit"
                            : "walking"
                        }
                      >
                        導航
                      </MapLink>
                    )}
                  {!p?.query && event.id === "1-8" && (
                    <span className="small muted">
                      選定晚餐分店後再安排交通。
                    </span>
                  )}
                </div>
              )}
              {event.id === "3-5" && (
                <div className="flex-meal">
                  <h4>團體自由時間・午餐</h4>
                  <MealCard slotId="3-lunch" />
                </div>
              )}
              {eventRoutes.length > 0 && (
                <details className="event-details">
                  <summary>
                    方向・站數・搭車小抄
                    <ChevronDown size={13} />
                  </summary>
                  {eventRoutes.map(route => <TrainRouteCard key={route.id} route={route} reverse={event.id === "2-13"} />)}
                </details>
              )}
              {!transport && (
                <button
                  className={`complete-button ${done ? "checked" : ""}`}
                  disabled={!ready}
                  aria-label={`${done ? "取消完成" : "完成"}${event.title}`}
                  onClick={() => onComplete(event.id)}
                >
                  <span className="check-square">
                    {done && <Check size={11} />}
                  </span>
                  {done ? "已完成" : "完成這一站"}
                </button>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
