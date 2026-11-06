import { useEffect, useRef } from "react";
import {
  arashiyamaArtwork as art,
  arashiyamaProgress,
} from "../data/arashiyamaArtwork";
/** Approved raster artwork, separated into a registered backdrop and two alpha sprites. */
export function ArashiyamaMap({ animate = true }: { animate?: boolean }) {
  const svg = useRef<SVGSVGElement>(null);
  const trainPath = useRef<SVGPathElement>(null);
  const boatPath = useRef<SVGPathElement>(null);
  const train = useRef<SVGGElement>(null);
  const boat = useRef<SVGGElement>(null);
  const base = import.meta.env.BASE_URL + "illustrations/arashiyama/";
  useEffect(() => {
    let disposed = false,
      frame = 0,
      started = false;
    let observer: IntersectionObserver | undefined;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const move = (progress: { train: number; boat: number }) => {
      if (!trainPath.current || !boatPath.current) return;
      const t = trainPath.current.getPointAtLength(
        trainPath.current.getTotalLength() * progress.train,
      );
      const b = boatPath.current.getPointAtLength(
        boatPath.current.getTotalLength() * progress.boat,
      );
      train.current?.setAttribute(
        "transform",
        `translate(${t.x} ${t.y}) rotate(-15)`,
      );
      boat.current?.setAttribute("transform", `translate(${b.x} ${b.y})`);
    };
    const finish = () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      move({ train: 1, boat: 1 });
    };
    if (!animate || media.matches) {
      finish();
      return;
    }
    move({ train: 0, boat: 0 });
    const start = () => {
      if (started || disposed) return;
      started = true;
      observer?.disconnect();
      const begin = performance.now();
      const tick = (time: number) => {
        if (disposed) return;
        const elapsed = time - begin;
        move(arashiyamaProgress(elapsed));
        if (elapsed < art.boatStart + art.boatDuration)
          frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const ready = Promise.all(
      art.files.map(
        (file) =>
          new Promise<void>((resolve) => {
            const image = new Image();
            image.onload = () => resolve();
            image.onerror = () => resolve();
            image.src = base + file;
          }),
      ),
    );
    void ready.then(() => {
      if (disposed) return;
      if (media.matches) {
        finish();
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) start();
        },
        { threshold: 0.12 },
      );
      if (svg.current) observer.observe(svg.current);
    });
    const reduce = () => {
      if (media.matches) finish();
    };
    media.addEventListener("change", reduce);
    return () => {
      disposed = true;
      observer?.disconnect();
      cancelAnimationFrame(frame);
      media.removeEventListener("change", reduce);
    };
  }, [animate, base]);
  const finalTrain = "translate(210 800) rotate(-15)",
    finalBoat = "translate(540 895)";
  return (
    <svg
      ref={svg}
      className="arashiyama-map illustrated-arashiyama"
      viewBox={`0 ${art.cropTop} ${art.width} ${art.height - art.cropTop}`}
      role="img"
      aria-label="嵐山小火車・保津川遊船插畫交通圖，小火車由嵯峨前往龜岡後，遊船由乘船場順流抵達嵐山。"
    >
      <desc>
        北朝上、非比例區域圖。JR嵯峨野線往園部方向，回程往京都，7個站間區間，中途6站。小火車09:02–09:25往龜岡，3區間、中途2站；39系統接駁安排09:25–10:00；遊船11:00–13:00。下船後經渡月橋、天龍寺、竹林與野宮神社步行回JR。京都飯店位於京都站西北側，弘燒肉晚餐19:00–20:30。
      </desc>
      <image
        href={base + "background.webp"}
        width={art.width}
        height={art.height}
      />
      <path ref={trainPath} d={art.trainPath} fill="none" stroke="none" />
      <path ref={boatPath} d={art.boatPath} fill="none" stroke="none" />
      <g ref={train} data-vehicle="train" transform={finalTrain}>
        <image
          href={base + "train.webp"}
          x="-120"
          y="-60"
          width="240"
          height="60"
        />
      </g>
      <g ref={boat} data-vehicle="boat" transform={finalBoat}>
        <image
          href={base + "boat.webp"}
          x="-95"
          y="-78"
          width="190"
          height="78"
        />
      </g>
    </svg>
  );
}
