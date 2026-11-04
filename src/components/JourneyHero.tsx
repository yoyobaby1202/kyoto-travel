import { useId } from "react";
import { TrainArt } from "./TrainArt";
export function JourneyHero() {
  const leafId = useId();
  const remaining = Math.max(
    0,
    Math.ceil(
      (new Date("2026-12-10T00:00:00+09:00").getTime() - Date.now()) / 86400000,
    ),
  );
  return (
    <>
      <section className="md-hero">
        <div className="md-couple">俊佑 &amp; 采玲</div>
        <div className="md-count">
          <small>{remaining ? "出發倒數" : "京都回憶"}</small>
          <strong>
            {remaining || "5"}
            <small> 天</small>
          </strong>
        </div>
        <span className="md-eyebrow">OUR LITTLE KYOTO JOURNEY</span>
        <h1>
          和你一起，
          <br />
          搭上<span>京都的秋色。</span>
        </h1>
        <p className="md-hero-copy">嵐山小火車 × 楓葉 × 我們的五天四夜</p>
        <svg
          className="md-scenery"
          viewBox="0 0 360 151"
          role="img"
          aria-label="小火車與嵐山楓葉原創插畫"
        >
          <defs>
            <g id={leafId}>
              <path
                d="m0 9-12-10 7-1-6-10 10 4 1-14 5 11 8-8-1 12 10-1-8 9 7 4-15 3"
                stroke="#493c35"
                strokeWidth="1.5"
              />
              <path
                d="m1 7-2 12"
                fill="none"
                stroke="#493c35"
                strokeWidth="1.5"
              />
            </g>
          </defs>
          <g
            stroke="#493c35"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <path
              d="M8 97 54 49l42 27 53-48 57 56 37-33 61 49"
              fill="#efdbb4"
            />
            <path
              d="m95 76 54-48 57 56 37-33 61 49"
              fill="none"
              stroke="#b8a080"
            />
            <path d="M18 105q75-15 142-6t174-5" fill="none" />
            <path
              d="M218 108q29 7 25 17t-25 25h116v-37"
              fill="#c4d5cd"
              stroke="none"
            />
            <path d="M29 113q114 12 259-1" fill="none" strokeWidth="4" />
            <path
              d="M47 114v17m32-15v14m167-15v16m-31-14v14M37 109V69m-1 19-13-11m15-2 13-12M300 110V58m0 28-14-15m14 3 13-17"
              fill="none"
            />
          </g>
          <TrainArt x="88" y="54" width="120" height="65" />
          <g fill="#cb7652">
            <use href={`#${leafId}`} transform="translate(28 59) scale(1.1)" />
            <use href={`#${leafId}`} transform="translate(50 66) scale(.8)" />
            <use href={`#${leafId}`} transform="translate(290 48) scale(1.2)" />
          </g>
          <g fill="#dfa34d">
            <use href={`#${leafId}`} transform="translate(315 57)" />
            <use
              href={`#${leafId}`}
              transform="translate(326 23) rotate(22) scale(.65)"
            />
            <use
              href={`#${leafId}`}
              transform="translate(222 29) rotate(-15) scale(.55)"
            />
          </g>
        </svg>
      </section>
      <div className="md-flights" aria-label="來回航班">
        <section className="md-flight">
          <div className="md-flight-title">
            <span>12/10 去程</span>
            <span>IT210</span>
          </div>
          <div className="md-flight-body">
            <div className="md-flight-leg">
              <span>桃園 TPE</span>
              <div>
                <strong>07:00</strong>
                <small>台灣時間</small>
              </div>
            </div>
            <div className="md-flight-leg">
              <span>關西 KIX</span>
              <div>
                <strong>10:25</strong>
                <small>日本時間</small>
              </div>
            </div>
          </div>
        </section>
        <section className="md-flight">
          <div className="md-flight-title">
            <span>12/14 回程</span>
            <span>IT213</span>
          </div>
          <div className="md-flight-body">
            <div className="md-flight-leg">
              <span>關西 KIX</span>
              <div>
                <strong>18:55</strong>
                <small>日本時間</small>
              </div>
            </div>
            <div className="md-flight-leg">
              <span>桃園 TPE</span>
              <div>
                <strong>21:15</strong>
                <small>台灣時間</small>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
