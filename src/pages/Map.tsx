import { useState } from "react";
import { Search, Navigation } from "lucide-react";
import { places, restaurants } from "../data/places";
import { AttractionCard } from "../components/AttractionCard";
import { RestaurantCard } from "../components/RestaurantCard";
export function MapPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("景點");
  const selected = places.filter(
    (p) => p.id !== "taoyuan" && (p.name + p.ja).includes(search),
  );
  return (
    <>
      <div className="page-title">
        <span className="eyebrow">PLACES WE WILL REMEMBER</span>
        <h1>把喜歡的地方，連成旅程。</h1>
        <p>京都散策地圖。原創插畫為示意，精確路線請開啟Google Maps。</p>
      </div>
      <section className="map-overview">
        <img
          src={`${import.meta.env.BASE_URL}illustrations/kyoto.svg`}
          alt="京都旅行區域原創風景示意"
        />
        <div className="map-pins">
          <span>DAY 02 · 嵐山</span>
          <span>京都站・我們的飯店</span>
          <span>DAY 01 · 伏見稻荷</span>
          <span>DAY 04 · 東山</span>
        </div>
        <p>
          <Navigation size={14} />
          示意圖非比例地圖 · Day 3 天橋立與伊根位於京都府北部
        </p>
      </section>
      <div className="map-toolbar">
        <div className="segmented">
          {["景點", "餐廳"].map((f) => (
            <button
              key={f}
              className={filter === f ? "selected" : ""}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <label className="search">
          <Search size={16} />
          <input
            aria-label="搜尋景點或餐廳"
            placeholder="找一個想去的地方…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>
      <div className="attraction-grid">
        {filter === "景點"
          ? selected.map((p) => <AttractionCard place={p} key={p.id} />)
          : restaurants
              .filter((r) => (r.name + r.ja).includes(search))
              .map((r) => <RestaurantCard restaurant={r} key={r.id} />)}
      </div>
      {!(
        filter === "景點"
          ? selected
          : restaurants.filter((r) => (r.name + r.ja).includes(search))
      ).length && <p className="empty">還沒有找到，試試其他關鍵字。</p>}
    </>
  );
}
