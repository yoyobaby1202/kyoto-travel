import { Bus, Ship, Footprints, TrainFront, ArrowDown } from "lucide-react";
import { routes } from "../data/transport";
import { TrainRouteCard } from "../components/TrainRouteCard";
import { MapLink } from "../components/Common";
export function Transport() {
  return (
    <>
      <div className="page-title">
        <span className="eyebrow">A LITTLE TRAIN COMPANION</span>
        <h1>下一站，京都的風景。</h1>
        <p>
          方向、站數與轉乘，一張卡片看懂。這裡是靜態交通指南，沒有即時到站資訊。
        </p>
      </div>
      <section className="transport-flow paper-card">
        <h3>Day 2 · 一天五種旅行方式</h3>
        <div>
          {[
            [TrainFront, "JR 嵯峨野線"],
            [TrainFront, "嵯峨野小火車"],
            [Bus, "紫色接駁巴士"],
            [Ship, "保津川遊船"],
            [Footprints, "步行遊嵐山"],
          ].map(([Icon, label], i) => {
            const I = Icon as typeof Bus;
            return (
              <span key={i} className={i === 2 ? "purple" : ""}>
                <I size={22} />
                <strong>{String(label)}</strong>
                {i < 4 && <ArrowDown size={13} />}
              </span>
            );
          })}
        </div>
        <p className="note">
          小火車龜岡站 →
          保津川遊船乘船場：需搭接駁巴士。39系統站外乘車，目的地「保津川下り乗船場」。車程、票價及12/11適用班次待確認；小火車或遊船停駛，巴士可能全停。
        </p>
        <a
          className="text-link"
          href="https://www.keihankyotokotsu.jp/bustimetable/timetable.php?no=1&stop_cd=2050"
          target="_blank"
          rel="noreferrer"
        >
          官方巴士時刻／接駁說明 ↗
        </a>{" "}
        <MapLink query="保津川下り乗船場 亀岡市保津町下中島2">
          乘船場參考導航
        </MapLink>
      </section>
      <div className="route-grid">
        {routes.map((r) => (
          <TrainRouteCard route={r} key={r.id} />
        ))}
      </div>
      <section className="paper-card">
        <h3>東山散策・巴士比繞搭電車更直接</h3>
        <p>
          Day 4
          京都站至清水寺，以市巴士加上坡步行規劃60分鐘。路線、車站及壅塞狀況請當天查核；東山景點之間以步行串連。Day
          3 使用觀光巴士，不安排一般電車轉乘。
        </p>
        <MapLink
          query="清水寺 京都市東山区清水1丁目294"
          origin="京都駅"
          mode="transit"
        >
          查看當日大眾運輸建議
        </MapLink>
        <a
          className="text-link"
          href="https://www2.city.kyoto.lg.jp/kotsu/webguide/"
          target="_blank"
          rel="noreferrer"
        >
          京都市交通局官方指南 ↗
        </a>
      </section>
      <p className="local-notice">
        查核日期2026/11/05。站序以普通列車為準；班次、方向及月台仍應核對當日看板。HARUKA僅為規劃、尚未訂票。
      </p>
    </>
  );
}
