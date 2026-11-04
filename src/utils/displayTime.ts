import type { Event } from "../types";
export function displayTime(event: Event) {
  if (event.id === "1-1")
    return { start: "07:00", end: "10:25", startZone: "台灣", endZone: "日本" };
  if (event.id === "5-10")
    return { start: "18:55", end: "21:15", startZone: "日本", endZone: "台灣" };
  return {
    start: event.start,
    end: event.end,
    startZone: undefined,
    endZone: undefined,
  };
}
