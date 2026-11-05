import { useEffect, useRef, useState } from "react";
import { dayPalette } from "../data/dayPalette";
import { days } from "../data/itinerary";
import { TrainArt } from "./TrainArt";
export function TrainDayPicker({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect: (id: number) => void;
}) {
  const [moving, setMoving] = useState(false);
  const [direction, setDirection] = useState(1);
  const previous = useRef(selected);
  useEffect(() => {
    if (previous.current === selected) return;
    setDirection(selected > previous.current ? 1 : -1);
    previous.current = selected;
    setMoving(true);
    const timer = window.setTimeout(() => setMoving(false), 850);
    return () => window.clearTimeout(timer);
  }, [selected]);
  return (
    <div
      className="md-picker"
      style={
        {
          "--md-day": dayPalette[selected - 1][0],
          "--md-day-soft": dayPalette[selected - 1][1],
        } as React.CSSProperties
      }
    >
      <div className="md-rail" aria-hidden="true">
        <div className="md-ties" />
        <div className="md-track" />
        <div className="md-stations">
          {days.map((d) => (
            <span key={d.id} className={selected === d.id ? "md-active" : ""} />
          ))}
        </div>
        <div
          className={`md-train ${moving ? "train-moving" : ""}`}
          style={
            {
              left: `${10 + (selected - 1) * 20}%`,
              "--train-direction": direction,
            } as React.CSSProperties
          }
        >
          <TrainArt />
        </div>
      </div>
      <div className="md-date-grid" aria-label="切換旅行日期">
        {days.map((d) => (
          <button
            type="button"
            aria-pressed={selected === d.id}
            aria-label={`12/${d.id + 9} 週${d.weekday}`}
            key={d.id}
            onClick={() => onSelect(d.id)}
          >
            <strong>12/{d.id + 9}</strong>
            <small>週{d.weekday}</small>
          </button>
        ))}
      </div>
    </div>
  );
}
