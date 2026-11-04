import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  BookHeart,
  Download,
  Upload,
  Plus,
  Trash2,
  Camera,
  Check,
  Wallet,
  CheckCheck,
} from "lucide-react";
import type { Entry, Expense } from "../types";
import { useLocal } from "../utils/store";
import { download } from "../utils/time";
import { compressPhoto, validateBackup } from "../utils/backup";
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
const daily = ["手機", "行動電源", "錢包", "交通卡", "雨具", "保暖衣物"];
const initial = {
  version: 1 as const,
  entries: [] as Entry[],
  expenses: [] as Expense[],
  checks: {} as Record<string, boolean>,
  rate: 0.22,
};
export function Journal() {
  const [params, setParams] = useSearchParams();
  const tab = params.get("tab") || "diary";
  const [data, save, ready, error] = useLocal("private-data", initial);
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState<string>();
  const [processing, setProcessing] = useState(false);
  const [usage, setUsage] = useState("");
  const [day, setDay] = useState(1);
  const [expenseDay, setExpenseDay] = useState(0);
  useEffect(() => {
    navigator.storage
      ?.estimate()
      .then((e) =>
        setUsage(
          `本站約使用 ${((e.usage || 0) / 1048576).toFixed(1)} MB／瀏覽器可用上限約 ${((e.quota || 0) / 1048576).toFixed(0)} MB`,
        ),
      )
      .catch(() => setUsage("瀏覽器未提供容量估計"));
  }, [data]);
  async function persist(d: typeof data) {
    try {
      await save(d);
      return true;
    } catch {
      setMessage("儲存失敗，請匯出備份並釋放容量。");
      return false;
    }
  }
  const total = data.expenses.reduce(
    (sum, e) => sum + (e.currency === "JPY" ? e.amount * data.rate : e.amount),
    0,
  );
  return (
    <>
      <div className="page-title">
        <span className="eyebrow">OUR LITTLE BOOK OF MEMORIES</span>
        <h1>把京都，寫進日子裡。</h1>
        <p>小小的記錄，也是我們一起旅行的證明。</p>
      </div>
      <div className="privacy-banner">
        <BookHeart size={24} />
        <div>
          <strong>只在這支手機上的旅行手帳</strong>
          <p>
            日誌、照片、清單與記帳存在本機 IndexedDB，不會上傳
            GitHub，也不會同步另一支手機。清除網站資料可能遺失，請定期匯出。
          </p>
        </div>
      </div>
      <div className="journal-tabs segmented">
        {[
          ["diary", "旅遊日誌", BookHeart],
          ["expenses", "旅行記帳", Wallet],
          ["checklist", "旅行清單", CheckCheck],
        ].map(([id, name, Icon]) => {
          const I = Icon as typeof BookHeart;
          return (
            <button
              className={tab === id ? "selected" : ""}
              key={String(id)}
              onClick={() => setParams({ tab: String(id) })}
            >
              <I size={17} />
              {String(name)}
            </button>
          );
        })}
      </div>
      {(error || message) && (
        <p className="warning" role="status">
          {error || message}
        </p>
      )}
      {tab === "checklist" ? (
        <div className="checklist-grid">
          {[
            ["行前準備", preparation],
            ["每日隨身", daily],
          ].map(([title, items]) => (
            <section className="paper-card" key={String(title)}>
              <span className="eyebrow">LITTLE THINGS MATTER</span>
              <h2>{String(title)}</h2>
              {(items as string[]).map((item) => (
                <label className="check-item" key={item}>
                  <input
                    type="checkbox"
                    disabled={!ready}
                    checked={data.checks[item] || false}
                    onChange={(ev) =>
                      void persist({
                        ...data,
                        checks: { ...data.checks, [item]: ev.target.checked },
                      })
                    }
                  />
                  <span>{item}</span>
                  {data.checks[item] && <Check size={15} />}
                </label>
              ))}
              <p className="small muted">
                {(items as string[]).filter((x) => data.checks[x]).length}/
                {(items as string[]).length} 已準備
              </p>
            </section>
          ))}
        </div>
      ) : tab === "expenses" ? (
        <>
          <div className="expense-summary">
            <div>
              <span className="eyebrow">TOTAL MEMORIES, TOTAL SPENDING</span>
              <h2>NT$ {Math.round(total).toLocaleString()}</h2>
              <p>整趟旅行換算總計 · 不含未記錄支出</p>
            </div>
            <label>
              自訂匯率：1 JPY =
              <input
                aria-label="日幣換算台幣匯率"
                type="number"
                min="0.001"
                step="0.001"
                value={data.rate}
                disabled={!ready}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  if (Number.isFinite(n) && n > 0)
                    void persist({ ...data, rate: n });
                }}
              />{" "}
              TWD <small>手動參考值，非即時匯率</small>
            </label>
          </div>
          <div className="daily-totals">
            {[1, 2, 3, 4, 5].map((d) => (
              <div key={d}>
                <small>DAY 0{d}</small>
                <strong>
                  NT${" "}
                  {Math.round(
                    data.expenses
                      .filter((e) => e.day === d)
                      .reduce(
                        (s, e) =>
                          s +
                          (e.currency === "JPY"
                            ? e.amount * data.rate
                            : e.amount),
                        0,
                      ),
                  ).toLocaleString()}
                </strong>
              </div>
            ))}
          </div>
          <form
            className="paper-card expense-form"
            onSubmit={(ev) => {
              ev.preventDefault();
              const form = ev.currentTarget;
              const f = new FormData(form);
              const amount = Number(f.get("amount"));
              if (!Number.isFinite(amount) || amount <= 0) return;
              void persist({
                ...data,
                expenses: [
                  ...data.expenses,
                  {
                    id: crypto.randomUUID(),
                    day: Number(f.get("day")),
                    title: String(f.get("title")),
                    amount,
                    currency: f.get("currency") as "JPY" | "TWD",
                    category: String(f.get("category")),
                  },
                ],
              }).then((saved) => {
                if (saved) form.reset();
              });
            }}
          >
            <h3>記下一筆花費</h3>
            <label>
              品項
              <input
                name="title"
                required
                placeholder="例如：一起吃的蕎麥麵"
                maxLength={120}
              />
            </label>
            <label>
              金額
              <input
                name="amount"
                type="number"
                min="0.01"
                step="0.01"
                required
              />
            </label>
            <label>
              幣別
              <select name="currency">
                <option>JPY</option>
                <option>TWD</option>
              </select>
            </label>
            <label>
              日期
              <select name="day">
                {[1, 2, 3, 4, 5].map((d) => (
                  <option key={d} value={d}>
                    Day {d}
                  </option>
                ))}
              </select>
            </label>
            <label>
              分類
              <select name="category">
                {["交通", "餐飲", "購物", "門票", "住宿", "其他"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <button disabled={!ready} className="primary">
              <Plus size={15} />
              新增支出
            </button>
          </form>
          <label className="expense-filter">
            查看日期
            <select
              value={expenseDay}
              onChange={(e) => setExpenseDay(Number(e.target.value))}
            >
              <option value={0}>整趟旅行</option>
              {[1, 2, 3, 4, 5].map((d) => (
                <option value={d} key={d}>
                  DAY 0{d}
                </option>
              ))}
            </select>
          </label>
          <div className="expense-list">
            {data.expenses
              .filter((e) => !expenseDay || e.day === expenseDay)
              .map((e) => (
                <div key={e.id}>
                  <span className="tag">
                    DAY 0{e.day} · {e.category}
                  </span>
                  <strong>{e.title}</strong>
                  <span>
                    {e.currency} {e.amount.toLocaleString()}
                  </span>
                  <button
                    aria-label={`刪除支出${e.title}`}
                    onClick={() =>
                      void persist({
                        ...data,
                        expenses: data.expenses.filter((x) => x.id !== e.id),
                      })
                    }
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            {!data.expenses.length && (
              <p className="empty">還沒有花費，從第一筆旅程開銷開始吧。</p>
            )}
          </div>
        </>
      ) : (
        <div className="journal-layout">
          <form
            className="paper-card diary-form"
            onSubmit={(ev) => {
              ev.preventDefault();
              const form = ev.currentTarget;
              const f = new FormData(form);
              void persist({
                ...data,
                entries: [
                  {
                    id: crypto.randomUUID(),
                    day,
                    text: String(f.get("text")),
                    mood: String(f.get("mood")),
                    place: String(f.get("place")),
                    photo,
                  },
                  ...data.entries,
                ],
              }).then((saved) => {
                if (saved) {
                  form.reset();
                  setPhoto(undefined);
                }
              });
            }}
          >
            <span className="eyebrow">DEAR KYOTO, TODAY…</span>
            <h2>今天，有什麼小美好？</h2>
            <div className="form-row">
              <label>
                旅行日
                <select
                  value={day}
                  onChange={(e) => setDay(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((d) => (
                    <option value={d} key={d}>
                      Day 0{d} · 12/{d + 9}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                心情
                <select name="mood">
                  {[
                    "很幸福",
                    "好好吃",
                    "被風景感動",
                    "有點累但開心",
                    "今天也很棒",
                  ].map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              在哪裡
              <input name="place" placeholder="例如：渡月橋" maxLength={120} />
            </label>
            <label>
              想記住的事情
              <textarea
                name="text"
                placeholder="今天的京都，和你一起……"
                required
                maxLength={20000}
                rows={6}
              />
            </label>
            <label className="photo-upload">
              <Camera size={20} />
              <span>
                {processing ? "正在壓縮照片…" : "加入今日照片（自動壓縮）"}
              </span>
              <input
                aria-label="選擇日誌照片"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                disabled={processing}
                onChange={async (ev) => {
                  const file = ev.target.files?.[0];
                  if (!file) return;
                  setProcessing(true);
                  try {
                    setPhoto(await compressPhoto(file));
                    setMessage("");
                  } catch (err) {
                    setMessage((err as Error).message);
                  } finally {
                    setProcessing(false);
                  }
                }}
              />
            </label>
            {photo && (
              <div className="photo-preview">
                <img src={photo} alt="待儲存日誌照片" />
                <button type="button" onClick={() => setPhoto(undefined)}>
                  移除照片
                </button>
              </div>
            )}
            <p className="small muted">
              最長邊1400px、JPEG壓縮；單張原始照片上限25MB。{usage}
            </p>
            <button className="primary" disabled={!ready || processing}>
              <Plus size={16} />
              收藏這一天
            </button>
          </form>
          <div className="journal-entries">
            {data.entries.length ? (
              data.entries.map((e) => (
                <article className="paper-card entry" key={e.id}>
                  {e.photo && (
                    <img
                      loading="lazy"
                      src={e.photo}
                      alt={`Day ${e.day} ${e.place}的旅行照片`}
                    />
                  )}
                  <div className="entry-meta">
                    <span>
                      DAY 0{e.day} · {e.place}
                    </span>
                    <span className="tag">{e.mood}</span>
                  </div>
                  <p>{e.text}</p>
                  <button
                    className="text-link"
                    aria-label="刪除此日誌"
                    onClick={() =>
                      void persist({
                        ...data,
                        entries: data.entries.filter((x) => x.id !== e.id),
                      })
                    }
                  >
                    <Trash2 size={13} />
                    刪除
                  </button>
                </article>
              ))
            ) : (
              <div className="empty-diary">
                <BookHeart size={46} strokeWidth={1} />
                <h3>故事，從我們出發開始。</h3>
                <p>在這裡留下一張照片，或一句喜歡的話。</p>
              </div>
            )}
          </div>
        </div>
      )}
      <section className="backup-bar">
        <div>
          <strong>回憶值得好好備份</strong>
          <p>
            JSON包含本機日誌、照片、清單、記帳與匯率。匯入會取代這些本機資料。
          </p>
        </div>
        <div className="button-row">
          <button
            disabled={!ready}
            className="secondary"
            onClick={() => download("our-kyoto-private-backup.json", data)}
          >
            <Download size={15} />
            匯出備份
          </button>
          <label className="secondary upload-button">
            <Upload size={15} />
            匯入備份
            <input
              aria-label="匯入JSON備份，會取代本機資料"
              type="file"
              accept="application/json,.json"
              disabled={!ready}
              onChange={async (ev) => {
                const f = ev.target.files?.[0];
                if (!f) return;
                try {
                  if (f.size > 40 * 1024 * 1024)
                    throw new Error("備份檔過大（上限40MB）");
                  const b = validateBackup(JSON.parse(await f.text()));
                  await save(b);
                  setMessage("備份已匯入此裝置。");
                } catch (err) {
                  setMessage((err as Error).message);
                }
                ev.target.value = "";
              }}
            />
          </label>
        </div>
      </section>
    </>
  );
}
