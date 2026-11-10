import { useLocal } from "../utils/store";
import { type Backup } from "../utils/backup";
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
                  disabled={!ready}
                  onChange={(e) =>
                    void save({
                      ...data,
                      checks: { ...data.checks, [item]: e.target.checked },
                    }).catch(() => {})
                  }
                />
                <span>{item}</span>
                {["小火車車票", "保津川遊船"].includes(item) && <span className="status confirmed">已訂位</span>}
              </label>
            ))}
          </section>
        ))}
      </div>
      <HotelCard />
      {error && <p role="alert" className="warning">{error}</p>}
    </>
  );
}
