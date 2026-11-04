import type { Event } from "../types";
export const minutes = (s: string) =>
  Number(s.slice(0, 2)) * 60 + Number(s.slice(3));
export const clock = (n: number) =>
  `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
export function overlaps(events: Event[]) {
  return events.flatMap((a, i) =>
    events
      .slice(i + 1)
      .filter(
        (b) =>
          minutes(a.start) < minutes(b.end) &&
          minutes(b.start) < minutes(a.end),
      )
      .map((b) => `${a.title} ↔ ${b.title}`),
  );
}
export function delayEvents(events: Event[], delay: number, from: number) {
  let cursor = 0;
  return events.map((e, i) => {
    if (i < from) {
      cursor = minutes(e.end);
      return e;
    }
    if (e.fixed) {
      cursor = minutes(e.end);
      return e;
    }
    const duration = minutes(e.end) - minutes(e.start);
    const start = Math.max(minutes(e.start) + delay, cursor);
    if (start + duration > 1439)
      throw new Error("調整後超過當日，請分段手動調整。");
    cursor = start + duration;
    return { ...e, start: clock(start), end: clock(cursor) };
  });
}
export function tokyoNow() {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}
export function activeDay() {
  const d = Number(tokyoNow().slice(8, 10));
  return tokyoNow().startsWith("2026-12-") && d >= 10 && d <= 14 ? d - 9 : 1;
}
export const download = (name: string, value: unknown) => {
  const u = URL.createObjectURL(
    new Blob([JSON.stringify(value, null, 2)], { type: "application/json" }),
  );
  const a = document.createElement("a");
  a.href = u;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(u), 1000);
};
