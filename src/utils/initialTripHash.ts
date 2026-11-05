export function initialTripHash(hash: string): string {
  const [path, search = ""] = hash.replace(/^#/, "").split("?");
  const params = new URLSearchParams(search);
  params.set("day", "1");
  return `#${path || "/"}?${params.toString()}`;
}
