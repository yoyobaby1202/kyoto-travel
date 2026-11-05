/** Presentation only: booking and verification metadata remains in the structured itinerary. */
export function travelCopy(text: string): string {
  return text
    .replace(/不代表已訂票[；。]?/g, "")
    .replace(
      /分店未定，路線及車程待確認，不建立餐廳導航。/g,
      "選好餐廳後可設定導航。",
    )
    .replace(/班次名稱與時刻待查，尚未訂票。/g, "依票券時間搭乘。")
    .replace(/分店、用餐日與訂位待確認。/g, "")
    .replace(/候選安排，分店、用餐日與訂位待確認。/g, "")
    .replace(
      /預計用餐・尚未確認訂位|預計用餐・尚未訂位|尚未確認訂位|尚未預約|尚未訂票|尚未訂位|未訂票|未訂位/g,
      "",
    )
    .replace(/分店待確認，|晚餐待定，|晚餐待定|餐廳待定/g, "晚餐")
    .replace(/目標約|目標|預計|待核對|待確認|待查核|待查|待定|未定|規劃/g, "")
    .replace(
      /，?兩班均需核對|，?旅行日再核對|，?仍待確認|，?須再核對|，?須另核對/g,
      "",
    )
    .replace(/^[・·，；。\s]+|[・·，；\s]+$/g, "")
    .replace(/。\s*。/g, "。")
    .trim();
}
