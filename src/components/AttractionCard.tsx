import type { Place } from "../types";
import { Illustration } from "./Illustration";
import { MapLink } from "./Common";
export function AttractionCard({ place }: { place: Place }) {
  return (
    <article className="attraction-card">
      <Illustration kind={place.art} zoom />
      <div className="card-body">
        <span className="eyebrow">{place.ja}</span>
        <h3>{place.name}</h3>
        <p>{place.description}</p>
        <p className="small muted">
          建議停留 {place.duration} · 步行或依當日交通卡
        </p>
        {place.note && <p className="note">{place.note}</p>}
        <div className="button-row">
          <MapLink query={place.query} />
          {place.official && (
            <a
              className="text-link"
              href={place.official}
              target="_blank"
              rel="noreferrer"
            >
              官方網站 ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
