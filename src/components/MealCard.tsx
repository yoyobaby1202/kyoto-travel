import { useState } from "react";
import { Plus, Pencil, Navigation, ExternalLink, X } from "lucide-react";
import { useLocal } from "../utils/store";
import { maps } from "../utils/maps";
import { validateMeal, type MealSetting } from "../utils/meals";
export function MealCard({
  slotId,
  preset,
}: {
  slotId: string;
  preset?: "lemon" | "hiro";
}) {
  const [settings, save, ready, error] = useLocal<Record<string, MealSetting>>(
    "meal-settings",
    {},
  );
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const current = settings[slotId];
  const name =
    current?.name ||
    (preset === "lemon" ? "檸檬牛舌" : preset === "hiro" ? "弘燒肉" : "");
  const url =
    current?.mapsUrl ||
    (current?.address
      ? maps(`${current.name} ${current.address}`, "walking")
      : undefined);
  async function submit(form: HTMLFormElement) {
    const f = new FormData(form);
    try {
      const meal = validateMeal({
        name: String(f.get("name")),
        address: String(f.get("address")),
        mapsUrl: String(f.get("mapsUrl")),
        status: String(f.get("status")) as MealSetting["status"],
        note: String(f.get("note")),
      });
      setBusy(true);
      await save({ ...settings, [slotId]: meal });
      setEditing(false);
      setMessage("");
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="meal-setting">
      {name && (
        <div className="meal-name">
          <strong>{name}</strong>
          <span>{current?.status || "預計前往"}</span>
        </div>
      )}
      {current?.address && <p>{current.address}</p>}
      {current?.note && <p>{current.note}</p>}
      {preset && !current && (
        <p>候選未訂位 · 分店{preset === "hiro" ? "、日期" : ""}待確認</p>
      )}
      <div className="button-row">
        {url && (
          <a className="map-link" href={url} target="_blank" rel="noreferrer">
            <Navigation size={13} />
            餐廳導航
            <ExternalLink size={12} />
          </a>
        )}
        <button
          disabled={!ready || busy}
          className="md-small-button"
          onClick={() => {
            setEditing(!editing);
            setMessage("");
          }}
          aria-expanded={editing}
        >
          {current ? <Pencil size={12} /> : <Plus size={12} />}
          {current ? "修改餐廳" : "設定餐廳"}
        </button>
      </div>
      {!url && name && <p className="small muted">選定分店後再設定導航。</p>}
      {editing && (
        <form
          className="meal-form"
          onSubmit={(e) => {
            e.preventDefault();
            void submit(e.currentTarget);
          }}
        >
          <label>
            餐廳名稱
            <input
              name="name"
              required
              maxLength={100}
              placeholder="填入餐廳與分店名稱"
              defaultValue={name}
            />
          </label>
          <div className="meal-presets">
            <span>保留餐廳</span>
            {["檸檬牛舌", "弘燒肉"].map((n) => (
              <button
                key={n}
                type="button"
                onClick={(e) => {
                  const form = e.currentTarget.closest("form")!;
                  (form.elements.namedItem("name") as HTMLInputElement).value =
                    n;
                }}
              >
                {n}
              </button>
            ))}
          </div>
          <label>
            分店地址
            <input
              name="address"
              maxLength={300}
              placeholder="例如：京都市…（請填精確分店地址）"
              defaultValue={current?.address || ""}
            />
          </label>
          <label>
            Google Maps 連結
            <input
              name="mapsUrl"
              type="url"
              inputMode="url"
              placeholder="貼上Google Maps分享連結"
              defaultValue={current?.mapsUrl || ""}
            />
          </label>
          <p className="small muted">
            填入精確地址或地圖連結後，才會出現導航按鈕。
          </p>
          <label>
            訂位狀態
            <select name="status" defaultValue={current?.status || "預計前往"}>
              {["尚未決定", "預計前往", "已訂位", "已完成用餐"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label>
            備註
            <textarea
              name="note"
              maxLength={1000}
              rows={2}
              placeholder="訂位時間、想吃的料理…"
              defaultValue={current?.note || ""}
            />
          </label>
          <div className="button-row">
            <button disabled={busy} className="primary" type="submit">
              {busy ? "儲存中…" : "儲存餐廳"}
            </button>
            <button
              type="button"
              className="text-link"
              onClick={() => setEditing(false)}
            >
              <X size={13} />
              取消
            </button>
            {current && (
              <button
                type="button"
                className="text-link"
                disabled={busy}
                onClick={async () => {
                  setBusy(true);
                  try {
                    const next = { ...settings };
                    delete next[slotId];
                    await save(next);
                    setEditing(false);
                  } catch {
                    setMessage("清除失敗，請稍後重試。");
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                清除設定
              </button>
            )}
          </div>
          <p className="small muted">餐廳設定儲存於此裝置。</p>
        </form>
      )}
      {(error || message) && (
        <p role="alert" className="warning">
          {error || message}
        </p>
      )}
    </div>
  );
}
