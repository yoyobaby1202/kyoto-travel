export function selectedTripDay(search: string): number {
  const raw = new URLSearchParams(search).get("day");
  const value = Number(raw);
  return raw !== null && Number.isInteger(value) && value >= 1 && value <= 5
    ? value
    : 1;
}
