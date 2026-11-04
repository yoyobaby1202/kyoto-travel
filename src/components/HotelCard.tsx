import { BedDouble, Phone, Check, Footprints } from "lucide-react";
import { hotel } from "../data/places";
import { MapLink } from "./Common";

export function HotelCard() {
  return (
    <article className="hotel-card">
      <div className="card-body">
        <span className="eyebrow">
          <BedDouble size={14} /> OUR LITTLE HOME IN KYOTO
        </span>
        <h3>{hotel.name}</h3>
        <p className="small muted">{hotel.ja}</p>
        <div className="hotel-dates">
          <div>
            <small>CHECK IN</small>
            <strong>
              12.10 <span>Thu</span>
            </strong>
          </div>
          <span className="dotted">···· 4 nights ····</span>
          <div>
            <small>CHECK OUT</small>
            <strong>
              12.14 <span>Mon</span>
            </strong>
          </div>
        </div>
        <span className="paid">
          <Check size={13} />
          訂房已確認・房費已支付
        </span>
        <p className="small">
          京都府京都市下京区夷之町730
          <br />
          <a href="tel:+81753535700">
            <Phone size={12} /> +81 75-353-5700
          </a>
          <br />
          入住15:00／退房10:00 · 適用住宿稅現場另付
        </p>
        <div className="button-row">
          <MapLink query={hotel.query}>飯店導航</MapLink>
          <MapLink query={hotel.query} origin="京都駅 中央口">
            <Footprints size={13} />
            京都站步行路線
          </MapLink>
        </div>
        <a
          className="text-link small"
          href={hotel.official}
          target="_blank"
          rel="noreferrer"
        >
          飯店官方資訊 ↗
        </a>
      </div>
    </article>
  );
}
