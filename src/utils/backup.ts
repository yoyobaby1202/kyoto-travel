import type { Entry, Expense } from "../types";
export interface Backup {
  version: 1;
  entries: Entry[];
  expenses: Expense[];
  checks: Record<string, boolean>;
  rate: number;
}
export function validateBackup(v: unknown): Backup {
  if (!v || typeof v !== "object") throw new Error("備份格式錯誤");
  const b = v as Backup;
  if (
    b.version !== 1 ||
    !Array.isArray(b.entries) ||
    !Array.isArray(b.expenses) ||
    !b.checks ||
    typeof b.checks !== "object" ||
    typeof b.rate !== "number" ||
    !Number.isFinite(b.rate) ||
    b.rate <= 0
  )
    throw new Error("備份版本或欄位不正確");
  if (b.entries.length > 500 || b.expenses.length > 10000)
    throw new Error("紀錄數量過多");
  for (const e of b.entries) {
    if (
      typeof e.id !== "string" ||
      typeof e.text !== "string" ||
      e.text.length > 20000 ||
      typeof e.mood !== "string" ||
      typeof e.place !== "string" ||
      !Number.isInteger(e.day) ||
      e.day < 1 ||
      e.day > 5 ||
      (e.photo !== undefined &&
        (typeof e.photo !== "string" ||
          !/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(
            e.photo,
          ) ||
          e.photo.length > 4000000))
    )
      throw new Error("日誌資料不正確");
  }
  for (const e of b.expenses) {
    if (
      typeof e.id !== "string" ||
      typeof e.title !== "string" ||
      typeof e.category !== "string" ||
      !Number.isFinite(e.amount) ||
      e.amount < 0 ||
      !["JPY", "TWD"].includes(e.currency) ||
      !Number.isInteger(e.day) ||
      e.day < 1 ||
      e.day > 5
    )
      throw new Error("記帳資料不正確");
  }
  for (const [key, value] of Object.entries(b.checks)) {
    if (key.length > 100 || typeof value !== "boolean")
      throw new Error("清單資料不正確");
  }
  return b;
}
export async function compressPhoto(file: File): Promise<string> {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type))
    throw new Error("請選JPEG、PNG或WebP照片；HEIC請先轉成JPEG。");
  if (file.size > 25 * 1024 * 1024) throw new Error("單張照片請小於25MB。");
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const scale = Math.min(1, 1400 / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("圖片壓縮不支援");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const result = canvas.toDataURL("image/jpeg", 0.75);
    if (result.length > 4000000)
      throw new Error("壓縮後仍過大，請選擇較小照片");
    return result;
  } finally {
    URL.revokeObjectURL(url);
  }
}
