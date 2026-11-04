import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Heart,
  TrainFront,
  Navigation,
  BookOpen,
  Sun,
  MapPin,
  CheckCheck,
  Plane,
  ArrowUpRight,
} from "lucide-react";
import { days } from "../data/itinerary";
import { findPlace } from "../data/places";
import type { Event } from "../types";
import { activeDay, tokyoNow } from "../utils/time";
import { useLocal } from "../utils/store";
import { Illustration } from "../components/Illustration";
import { HotelCard } from "../components/HotelCard";
import { MapLink, SectionHeading, TransportBadge } from "../components/Common";
export function Home() {
  const current = activeDay();
  const day = days[current - 1];
  const [local] = useLocal<Record<string, Event[]>>("itinerary-edits", {});
  const events = local[day.id] || day.events;
  const now = tokyoNow();
  const isTrip = now.slice(0, 10) === day.date;
  const inProgress = isTrip
    ? events.find(
        (e) =>
          !e.done && e.start <= now.slice(11, 16) && e.end > now.slice(11, 16),
      )
    : undefined;
  const next = events
    .filter((e) => !e.done && (!isTrip || e.start > now.slice(11, 16)))
    .sort((a, b) => a.start.localeCompare(b.start))[0];
  const countdown = Math.max(
    0,
    Math.ceil(
      (new Date("2026-12-10T00:00:00+09:00").getTime() - Date.now()) / 86400000,
    ),
  );
  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <span className="hero-label">
            <span />
            ふたりだけの、冬の旅。
          </span>
          <h1>
            ふたりの
            <br />
            <span>京都旅日記</span>
            <i>Kyoto, with you.</i>
          </h1>
          <p className="hero-subtitle">兩個人的京都旅行</p>
          <p className="hero-description">
            把日子放慢，把風景收藏。
            <br />
            和你一起，走進京都的冬天。
          </p>
          <div className="hero-date">
            <CalendarDays size={16} />
            <strong>
              2026.12.10 <span>—</span> 12.14
            </strong>
            <span className="hero-people">2位旅人 · 5天4夜</span>
          </div>
          <Link className="primary hero-cta" to={`/itinerary?day=${current}`}>
            翻開我們的旅程 <ArrowRight size={16} />
          </Link>
        </div>
        <div className="hero-art">
          <img
            src={`${import.meta.env.BASE_URL}illustrations/kyoto.svg`}
            alt="原創京都繪本：抹茶綠電車、千本鳥居、寺廟與戴圍巾的小動物"
          />
          <div className="art-stamp">
            京都
            <br />
            <small>WINTER 2026</small>
          </div>
          <span className="art-caption">
            a little journey, a lot of memories.
          </span>
        </div>
        <span className="hero-flower">✳</span>
      </section>
      <div className="trip-strip">
        <div>
          <span className="strip-icon">
            <Plane size={20} />
          </span>
          <span>
            期待已久的京都旅行
            <strong>
              {countdown > 0 ? (
                <>
                  還有 <b>{countdown}</b> 天，就要出發
                </>
              ) : now.slice(0, 10) <= "2026-12-14" ? (
                "我們正在京都旅行"
              ) : (
                "把京都的回憶好好收藏"
              )}
            </strong>
          </span>
        </div>
        <div>
          <span className="strip-icon">
            <Sun size={20} />
          </span>
          <span>
            KYOTO LOCAL TIME
            <strong>
              {now.slice(11, 16)} <small>日本時間 UTC+9</small>
            </strong>
          </span>
        </div>
        <p>
          <Heart size={15} />
          一人一半的行李，兩人份的回憶。
        </p>
      </div>
      <div className="home-columns">
        <div className="main-column">
          <SectionHeading
            eyebrow="OUR FIVE LITTLE CHAPTERS"
            title="五天，一起慢慢走"
          >
            <Link className="text-link" to="/itinerary">
              完整行程 <ArrowRight size={14} />
            </Link>
          </SectionHeading>
          <div className="days-grid">
            {days.map((d) => (
              <Link
                className={`day-card ${d.color}`}
                to={`/itinerary?day=${d.id}`}
                key={d.id}
              >
                <div className="day-card-visual">
                  <Illustration kind={d.art} />
                  <span className="day-number">
                    DAY <b>0{d.id}</b>
                  </span>
                  <span className="day-date">
                    12.{d.id + 9} <small>週{d.weekday}</small>
                  </span>
                </div>
                <div className="day-card-copy">
                  <span className="day-ja">{d.ja}</span>
                  <h3>{d.title}</h3>
                  <p>{d.subtitle}</p>
                  <span className="day-bottom">
                    <span>
                      <MapPin size={12} />
                      {
                        d.events.filter(
                          (e) => e.mode === "visit" || e.mode === "walk",
                        ).length
                      }{" "}
                      段散策
                    </span>
                    <ArrowUpRight size={17} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <section className="quick-guide">
            <div>
              <span className="eyebrow">A LITTLE HELP ON THE WAY</span>
              <h2>旅途中，需要的都在這裡。</h2>
              <p>少一點手忙腳亂，多一點好好看風景。</p>
            </div>
            <div className="quick-grid">
              <Link to="/transport">
                <TrainFront />
                <strong>電車交通</strong>
                <span>方向・站數・轉乘</span>
                <ArrowUpRight size={15} />
              </Link>
              <Link to="/map">
                <Navigation />
                <strong>旅行地圖</strong>
                <span>一鍵開始導航</span>
                <ArrowUpRight size={15} />
              </Link>
              <Link to="/journal?tab=checklist">
                <CheckCheck />
                <strong>行前清單</strong>
                <span>重要的小事，別忘記</span>
                <ArrowUpRight size={15} />
              </Link>
              <Link to="/journal">
                <BookOpen />
                <strong>我們的日誌</strong>
                <span>收藏今天的回憶</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </section>
        </div>
        <aside className="home-aside">
          <section className="today-card">
            <div className="today-header">
              <span>
                <span className="live-dot" />
                {isTrip ? "今日行程" : "旅程第一頁"}
              </span>
              <span>DAY 0{current}</span>
            </div>
            <h3>{day.title}</h3>
            <p>
              {day.date.replaceAll("-", ".")} · 星期{day.weekday}
            </p>
            {inProgress && (
              <p className="now-event">正在進行 · {inProgress.title}</p>
            )}
            <div className="next-stop">
              <span className="eyebrow">
                {isTrip ? "UP NEXT · 下一站" : "FIRST STOP · 旅程起點"}
              </span>
              <h4>{next?.title || "今天的回憶已收藏"}</h4>
              {next && (
                <>
                  <span className="small">
                    {next.start}–{next.end} · 日本時間
                  </span>
                  <div className="button-row">
                    <TransportBadge mode={next.mode} />
                    <MapLink query={findPlace(next.place)?.query} />
                  </div>
                </>
              )}
            </div>
            <Link className="today-link" to={`/itinerary?day=${current}`}>
              查看這一天 <ArrowRight size={16} />
            </Link>
          </section>
          <HotelCard />
          <div className="aside-note">
            <span className="handwritten">旅の小さなメモ</span>
            <p>
              十二月的京都，記得帶上圍巾，
              <br />
              還有一雙好走的鞋。
            </p>
            <span>✳</span>
          </div>
        </aside>
      </div>
      <section className="closing-note">
        <span>ふたりで歩けば、それだけで特別。</span>
        <p>平凡的路，和你一起走，就成了旅行。</p>
        <Heart size={16} />
      </section>
    </>
  );
}
