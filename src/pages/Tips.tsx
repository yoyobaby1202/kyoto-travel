import { Download, Upload, Smartphone, Utensils } from "lucide-react";
import { useState } from "react";
import { useLocal, getLocal, putLocals } from "../utils/store";
import { validateBackup, type Backup } from "../utils/backup";
import { validateMeal, type MealSetting } from "../utils/meals";
import { download } from "../utils/time";
import { HotelCard } from "../components/HotelCard";
const preparation = [
  "護照",
  "機票",
  "飯店",
  "HARUKA",
  "小火車車票",
  "保津川遊船",
  "Klook 憑證",
  "網路 eSIM",
  "旅遊保險",
];
const carry = ["手機", "行動電源", "錢包", "交通卡", "雨具", "保暖衣物"];
// Retain previous private records without exposing the removed journal interface.
const initial: Backup = {
  version: 1 as const,
  entries: [],
  expenses: [],
  checks: {} as Record<string, boolean>,
  rate: 0.22,
};
export function Tips() {
  const [data, save, ready, error] = useLocal("private-data", initial);
  const [meals, , mealsReady] = useLocal<Record<string, MealSetting>>(
    "meal-settings",
    {},
  );
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <>
      <div className="page-title">
        <span className="eyebrow">LITTLE THINGS BEFORE WE GO</span>
        <h1>出發前的小叮嚀</h1>
        <p>重要的東西帶上，其他的留給京都。</p>
      </div>
      <div className="tips-grid">
        {[
          ["行前準備", preparation],
          ["每日隨身", carry],
        ].map(([title, items]) => (
          <section className="md-tip" key={String(title)}>
            <h2>{String(title)}</h2>
            {(items as string[]).map((item) => (
              <label className="md-check-row" key={item}>
                <input
                  type="checkbox"
                  checked={data.checks[item] || false}
                  disabled={!ready || busy}
                  onChange={(e) =>
                    void save({
                      ...data,
                      checks: { ...data.checks, [item]: e.target.checked },
                    }).catch(() => {})
                  }
                />
                <span>{item}</span>
              </label>
            ))}
          </section>
        ))}
      </div>
      <HotelCard />
      <section className="paper-card">
        <h3>
          <Utensils size={17} />
          想吃的，慢慢選
        </h3>
        <p>
          保留候選：檸檬牛舌（12/13）與弘燒肉
          京都站前店（12/11）皆預計前往，尚未確認訂位。 Maps。
        </p>
      </section>
      <section className="paper-card">
        <h3>
          <Smartphone size={17} />
          帶著手帳，安心出門
        </h3>
        <p>
          首次連網完成快取後可離線查看行程與電車圖。外部Google
          Maps及官網需要網路；本站沒有即時列車到站資訊。
        </p>
        <p>
          餐廳與清單設定儲存在目前裝置，可匯出備份。清除網站資料可能遺失，建議出發前下載一份。
        </p>
        <div className="button-row">
          <button
            className="secondary"
            disabled={!ready || !mealsReady || busy}
            onClick={async () => {
              try {
                download("kyoto-trip-backup.json", {
                  version: 2,
                  privateData: data,
                  meals,
                  completed: (await getLocal("completed-stops")) || {},
                });
              } catch {
                setMessage("備份讀取失敗，請重試。");
              }
            }}
          >
            <Download size={14} />
            匯出備份
          </button>
          <label className="secondary upload-button">
            <Upload size={14} />
            匯入備份
            <input
              type="file"
              accept="application/json,.json"
              aria-label="匯入旅行備份，取代本機資料"
              disabled={!ready || !mealsReady || busy}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setBusy(true);
                try {
                  if (file.size > 40 * 1024 * 1024)
                    throw Error("備份檔請小於40MB。");
                  const raw = JSON.parse(await file.text());
                  if (raw.version === 2) {
                    const original = validateBackup(raw.privateData);
                    if (
                      !raw.meals ||
                      typeof raw.meals !== "object" ||
                      Array.isArray(raw.meals) ||
                      Object.keys(raw.meals).length > 100
                    )
                      throw Error("餐廳備份格式錯誤。");
                    const next: Record<string, MealSetting> = {};
                    for (const [id, meal] of Object.entries(raw.meals)) {
                      if (id.length > 100) throw Error("備份欄位錯誤。");
                      next[id] = validateMeal(meal as MealSetting);
                    }
                    const c = raw.completed;
                    if (
                      !c ||
                      typeof c !== "object" ||
                      Array.isArray(c) ||
                      Object.keys(c).length > 200 ||
                      Object.values(c).some((v) => typeof v !== "boolean")
                    )
                      throw Error("完成紀錄格式錯誤。");
                    await putLocals({
                      "private-data": original,
                      "meal-settings": next,
                      "completed-stops": c,
                    });
                  } else {
                    await save(validateBackup(raw));
                  }
                  setMessage("備份已匯入。");
                } catch (err) {
                  setMessage((err as Error).message);
                } finally {
                  setBusy(false);
                  e.target.value = "";
                }
              }}
            />
          </label>
        </div>
        {message && (
          <p role="status" className="note">
            {message}
          </p>
        )}
        {error && (
          <p role="alert" className="warning">
            {error}
          </p>
        )}
      </section>
    </>
  );
}
