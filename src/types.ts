export type Mode =
  "train" | "walk" | "bus" | "boat" | "flight" | "food" | "visit" | "hotel";
export type Status = "已確認" | "預計" | "待確認";
export interface Place {
  id: string;
  name: string;
  ja: string;
  query?: string;
  official?: string;
  description: string;
  duration: string;
  art: string;
  note?: string;
}
export interface Restaurant extends Place {
  address?: string;
  phone?: string;
  mapsUrl?: string;
  dish: string;
  hours: string;
  lastOrder: string;
  reservation?: string;
  alternative: string;
  price?: string;
}
export interface Event {
  id: string;
  start: string;
  end: string;
  title: string;
  mode: Mode;
  status: Status;
  place?: string;
  route?: string;
  connections?: string[];
  note?: string;
  fixed?: boolean;
  restaurant?: string;
  done?: boolean;
  meal?: boolean;
}
export interface Day {
  id: number;
  date: string;
  weekday: string;
  title: string;
  ja: string;
  subtitle: string;
  art: string;
  color: string;
  events: Event[];
}
export interface Route {
  id: string;
  name: string;
  color: string;
  direction: string;
  stations: string[];
  duration: string;
  from: string;
  to: string;
  official: string;
  note: string;
  confirmedStops: boolean;
  walk?: string;
}
export interface Entry {
  id: string;
  day: number;
  text: string;
  mood: string;
  place: string;
  photo?: string;
}
export interface Expense {
  id: string;
  day: number;
  title: string;
  amount: number;
  currency: "JPY" | "TWD";
  category: string;
}
