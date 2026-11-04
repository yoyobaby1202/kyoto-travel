import fs from "node:fs";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Resvg } from "@resvg/resvg-js";
import { TrainArt } from "../src/components/TrainArt";
const train = renderToStaticMarkup(
  React.createElement(TrainArt, { x: 90, y: 135, width: 332, height: 180 }),
);
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="100" fill="#fffcf6"/><circle cx="256" cy="256" r="195" fill="#f2ddbb"/>${train}<path d="M93 325h326" stroke="#493c35" stroke-width="7" stroke-linecap="round"/><path d="m365 111-24-15 14-4-8-21 21 11 7-27 8 22 20-13-6 22 23-2-16 16 14 8-26 7" fill="#bd624d" stroke="#493c35" stroke-width="4" stroke-linejoin="round"/></svg>`;
fs.writeFileSync("public/icons/icon.svg", icon);
for (const width of [180, 192, 512])
  fs.writeFileSync(
    `public/icons/icon-${width}.png`,
    new Resvg(icon, { fitTo: { mode: "width", value: width } })
      .render()
      .asPng(),
  );
for (const [width, height] of [
  [1170, 2532],
  [1179, 2556],
  [1290, 2796],
  [750, 1334],
  [1125, 2436],
]) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#fffcf6"/><svg x="${width * 0.3}" y="${height * 0.37}" width="${width * 0.4}" height="${width * 0.4}" viewBox="0 0 512 512">${icon.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "")}</svg></svg>`;
  fs.writeFileSync(
    `public/icons/splash-${width}.png`,
    new Resvg(svg).render().asPng(),
  );
}
console.log("Canonical train reused in app icons and splash assets.");
