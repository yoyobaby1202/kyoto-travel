import {
  ArrowUpRight,
  Navigation,
  TrainFront,
  Footprints,
  Bus,
  Ship,
  Plane,
  Utensils,
  MapPin,
  Hotel,
} from "lucide-react";
import type { Mode, Status } from "../types";
import { maps } from "../utils/maps";
export function MapLink({
  query,
  mode = "walking",
  children,
  origin,
}: {
  query?: string;
  mode?: "walking" | "transit";
  children?: React.ReactNode;
  origin?: string;
}) {
  return query ? (
    <a
      className="map-link"
      href={maps(query, mode, origin)}
      target="_blank"
      rel="noreferrer"
    >
      <Navigation size={14} />
      {children || "Google Maps"}
      <ArrowUpRight size={13} />
    </a>
  ) : (
    <span className="muted small">地點待確認，暫不導航</span>
  );
}
export const modeIcons = {
  train: TrainFront,
  walk: Footprints,
  bus: Bus,
  boat: Ship,
  flight: Plane,
  food: Utensils,
  visit: MapPin,
  hotel: Hotel,
};
export const modeNames = {
  train: "電車",
  walk: "步行",
  bus: "巴士",
  boat: "遊船",
  flight: "飛機",
  food: "用餐",
  visit: "散策",
  hotel: "飯店",
};
export function TransportBadge({ mode }: { mode: Mode }) {
  const Icon = modeIcons[mode];
  return (
    <span className={`transport-badge ${mode}`}>
      <Icon size={13} />
      {modeNames[mode]}
    </span>
  );
}
export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`status ${status === "已確認" ? "confirmed" : status === "待確認" ? "pending" : ""}`}
    >
      {status}
    </span>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
