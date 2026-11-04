export function maps(
  query: string,
  mode?: "walking" | "transit",
  origin?: string,
) {
  const p = new URLSearchParams({ api: "1" });
  if (mode) {
    p.set("destination", query);
    p.set("travelmode", mode);
    if (origin) p.set("origin", origin);
    return `https://www.google.com/maps/dir/?${p}`;
  }
  p.set("query", query);
  return `https://www.google.com/maps/search/?${p}`;
}
