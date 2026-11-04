import type { Restaurant } from "../types";
import { MapLink } from "./Common";
import { Illustration } from "./Illustration";
import { useLocal } from "../utils/store";
export function RestaurantCard({ restaurant: r }: { restaurant: Restaurant }) {
  const [statuses, save, ready, error] = useLocal<Record<string, string>>(
    "restaurant-status",
    {},
  );
  return (
    <article className="restaurant-card">
      <Illustration kind="food" />
      <div className="card-body">
        <span className="eyebrow">おいしい京都 · 候選餐廳</span>
        <h3>{r.ja}</h3>
        <p>
          {r.dish} · 用餐約{r.duration}
        </p>
        <label className="small">
          訂位狀態{" "}
          <select
            disabled={!ready}
            value={statuses[r.id] || "預計前往"}
            onChange={(ev) =>
              void save({ ...statuses, [r.id]: ev.target.value }).catch(
                () => {},
              )
            }
          >
            {["尚未決定", "預計前往", "已訂位", "已完成用餐"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <dl className="restaurant-info">
          <dt>營業時間</dt>
          <dd>{r.hours}</dd>
          <dt>最後點餐</dt>
          <dd>{r.lastOrder}</dd>
          {r.price && (
            <>
              <dt>參考價格</dt>
              <dd>{r.price}</dd>
            </>
          )}
        </dl>
        <p className="note">備選：{r.alternative}</p>
        {error && <p role="alert">{error}</p>}
        <div className="button-row">
          <MapLink query={r.query} />
          {r.official && (
            <a
              className="text-link"
              href={r.official}
              target="_blank"
              rel="noreferrer"
            >
              官方網站 ↗
            </a>
          )}
          {r.reservation && (
            <a
              className="text-link"
              href={r.reservation}
              target="_blank"
              rel="noreferrer"
            >
              前往官方訂位入口 ↗
            </a>
          )}
        </div>
        <p className="small muted">
          2026/11/05查核 ·
          營業與供餐依當日公告。未取得照片授權，使用原創示意插畫。
        </p>
      </div>
    </article>
  );
}
