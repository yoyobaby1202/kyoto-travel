import { useEffect, useRef } from "react";
import { paintedJourneyFlights } from "../data/paintedJourneyFlights";
import { journeyMaps } from "../data/journeyMaps";
export function IllustratedJourneyMap({
  day,
  animate = true,
}: {
  day: number;
  animate?: boolean;
}) {
  const root = useRef<SVGSVGElement>(null),
    path = useRef<SVGPathElement>(null),
    plane = useRef<SVGGElement>(null);
  const base = import.meta.env.BASE_URL + "illustrations/journey/";
  const flight = paintedJourneyFlights[day];
  useEffect(() => {
    if (!flight || !path.current || !plane.current) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0,
      disposed = false,
      started = false;
    let observer: IntersectionObserver | undefined;
    const length = path.current.getTotalLength();
    const move = (fraction: number) => {
      if (!path.current || !plane.current) return;
      const distance = length * fraction,
        p = path.current.getPointAtLength(distance),
        a = path.current.getPointAtLength(Math.max(0, distance - 1)),
        b = path.current.getPointAtLength(Math.min(length, distance + 1));
      const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      plane.current.setAttribute(
        "transform",
        `translate(${p.x} ${p.y}) rotate(${angle})`,
      );
    };
    const finish = () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      move(1);
    };
    if (!animate || media.matches) {
      finish();
      return;
    }
    move(0);
    const start = () => {
      if (started || disposed) return;
      started = true;
      observer?.disconnect();
      const begin = performance.now();
      const tick = (now: number) => {
        if (disposed) return;
        const p = Math.min(1, (now - begin) / 5500);
        move(p);
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    void Promise.all(
      [`day-${day}.webp`, "plane.webp"].map(
        (file) =>
          new Promise<void>((resolve) => {
            const image = new Image();
            image.onload = () => resolve();
            image.onerror = () => resolve();
            image.src = base + file;
          }),
      ),
    ).then(() => {
      if (disposed) return;
      if (media.matches) {
        finish();
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) start();
        },
        { threshold: 0.12 },
      );
      if (root.current) observer.observe(root.current);
    });
    const reduce = () => {
      if (media.matches) finish();
    };
    media.addEventListener("change", reduce);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      media.removeEventListener("change", reduce);
    };
  }, [day, animate, flight, base]);
  return (
    <svg
      ref={root}
      className="arashiyama-map painted-journey-map"
      viewBox="0 0 1200 1550"
      role="img"
      aria-label={`${journeyMaps[day].region}繪本交通圖`}
    >
      <desc>
        {journeyMaps[day].stops.map((p) => p.name).join("、")}
        。圖示北朝上，分區縮尺，交通與步行資訊可展開下方站序卡。
      </desc>
      <image href={`${base}day-${day}.webp`} width="1200" height="1550" />
      {day === 1 && (
        <g aria-label="18:30檸檬牛舌，2人已訂位，餐後祇園散步再回飯店">
          <rect x="175" y="1457" width="620" height="48" rx="8" fill="#f9ebde" />
          <text x="190" y="1492" fill="#493c35" fontSize="29" fontWeight="600">
            18:30 檸檬牛舌・已訂位 → 祇園 → 飯店
          </text>
        </g>
      )}
      {day === 1 && (
        <g transform="translate(1130 70)">
          <text x="0" y="0" textAnchor="middle" fill="#493c35" fontSize="26">
            北
          </text>
          <path d="m0 12-12 30L0 34l12 8Z" fill="#493c35" />
        </g>
      )}
      {flight && (
        <>
          <path ref={path} d={flight} fill="none" stroke="none" />
          <g
            ref={plane}
            data-vehicle="plane"
            transform={
              day === 1
                ? "translate(122 1070) rotate(-60)"
                : "translate(380 995) rotate(155)"
            }
          >
            <image
              href={base + "plane.webp"}
              x="-52.5"
              y="-41"
              width="105"
              height="82"
            />
          </g>
        </>
      )}
    </svg>
  );
}
