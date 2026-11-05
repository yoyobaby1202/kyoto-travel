import { Bus, Footprints } from "lucide-react";
import { MapLink } from "./Common";

export function KyotoBusGuide() {
  return (
    <section className="kyoto-bus-guide" aria-labelledby="kyoto-bus-title">
      <span className="eyebrow">12/13 · KYOTO CITY BUS</span>
      <h3 id="kyoto-bus-title"><Bus size={20} /> 京都站 → 清水寺搭車小抄</h3>
      <ol>
        <li><strong>先到京都站北側・烏丸口</strong><p>從飯店步行至站前巴士總站，找 D2 乘車處；不是八條口。依現場站牌確認乘車位置。</p></li>
        <li><strong>搭 206 系統・東山通方向</strong><p>車頭確認「三十三間堂・清水寺・祇園／北大路バスターミナル」。同為 206 也有不同方向，請選經東山通、清水寺的車。</p></li>
        <li><strong>五条坂（ごじょうざか）下車</strong><p>聽到下一站「五条坂」時按下車鈴，停穩後下車。車程抓約 20–30 分鐘；連同飯店步行、候車及上坡，整段預留 60 分鐘，塞車時提早出門。</p></li>
        <li><strong><Footprints size={16} /> 沿五条坂、清水坂上坡至清水寺</strong><p>官方步行參考約 10 分鐘；這天安排 15–20 分鐘，留意坡道、車輛與人潮。</p></li>
      </ol>
      <div className="kyoto-bus-payment">
        <h4>怎麼上車、付錢？</h4>
        <p>一般市巴士 206：後門上車、前門下車，降車時付款。均一區間成人每趟 ¥230，兩人共 ¥460；ICOCA、Suica 等交通 IC 卡可用，各自刷卡最方便，先確認餘額。</p>
        <p className="small">京都正推進乘車方式調整，請配合車門標示與司機指示。觀光特急 EX100／EX101 採前門上車、先付款，票價另計，與這張 206 搭車小抄不同。</p>
      </div>
      <div className="map-stop-links">
        <MapLink query="京都駅 烏丸口" mode="walking">步行到京都站北口</MapLink>
        <MapLink origin="京都駅" query="五条坂 バス停 京都市東山区" mode="transit">查看公車路線</MapLink>
        <MapLink origin="五条坂 バス停 京都市東山区" query="清水寺 京都市東山区清水1丁目294" mode="walking">下車後步行到清水寺</MapLink>
      </div>
      <p className="small">12/13 是星期日，官方時刻表請看「休日」。Google Maps 不一定指定 206 系統，搭車仍核對車頭與站牌。</p>
      <div className="kyoto-bus-sources">
        <a href="https://www2.city.kyoto.lg.jp/kotsu/busdia/hyperdia/06124204.htm" target="_blank" rel="noreferrer">206 官方時刻表 ↗</a>
        <a href="https://www2.city.kyoto.lg.jp/kotsu/webguide/ja/bus/howtoride_bus.html" target="_blank" rel="noreferrer">官方乘車方式 ↗</a>
        <a href="https://www.kiyomizudera.or.jp/access/" target="_blank" rel="noreferrer">清水寺交通指南 ↗</a>
      </div>
    </section>
  );
}
