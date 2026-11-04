export interface MealSetting {
  name: string;
  address: string;
  mapsUrl: string;
  status: "尚未決定" | "預計前往" | "已訂位" | "已完成用餐";
  note: string;
}
export function validMapsUrl(value: string) {
  try {
    const u = new URL(value);
    if (u.protocol !== "https:" || u.username || u.password) return false;
    return (
      ((u.hostname === "www.google.com" ||
        u.hostname === "google.com" ||
        u.hostname === "maps.google.com") &&
        (u.pathname === "/maps" || u.pathname.startsWith("/maps/"))) ||
      u.hostname === "maps.app.goo.gl" ||
      (u.hostname === "goo.gl" && u.pathname.startsWith("/maps/"))
    );
  } catch {
    return false;
  }
}
export function validateMeal(value: MealSetting) {
  const v = {
    ...value,
    name: value.name.trim(),
    address: value.address.trim(),
    mapsUrl: value.mapsUrl.trim(),
    note: value.note.trim(),
  };
  if (!v.name || v.name.length > 100)
    throw new Error("請填寫餐廳名稱（100字以內）。");
  if (v.address.length > 300 || v.note.length > 1000)
    throw new Error("地址或備註過長。");
  if (v.mapsUrl && !validMapsUrl(v.mapsUrl))
    throw new Error("請貼上HTTPS的Google Maps網址或分享短連結。");
  if (!["尚未決定", "預計前往", "已訂位", "已完成用餐"].includes(v.status))
    throw new Error("訂位狀態不正確。");
  return v;
}
