import fs from "node:fs";
import assert from "node:assert/strict";
const html = fs.readFileSync("dist/index.html", "utf8");
for (const path of [
  ...html.matchAll(/(?:src|href)="(\/kyoto-travel\/[^"#]+)"/g),
].map((x) => x[1])) {
  assert.ok(
    fs.existsSync(`dist/${path.replace("/kyoto-travel/", "")}`),
    `缺少資源：${path}`,
  );
}
const manifest = JSON.parse(
  fs.readFileSync("dist/manifest.webmanifest", "utf8"),
);
assert.equal(manifest.scope, "/kyoto-travel/");
assert.equal(manifest.start_url, "/kyoto-travel/");
const sw = fs.readFileSync("dist/sw.js", "utf8");
assert.ok(sw.includes("/kyoto-travel/index.html"));
assert.ok(sw.includes("icons/icon.svg"));
assert.ok(sw.includes("fonts/huninn-trip.woff2"));
assert.ok(sw.includes("index-"));
assert.ok(!html.includes("https://fonts.googleapis.com"));
console.log("建置資源、manifest子路徑、SW離線入口與原創插畫快取檢查成功。");
for (let day = 1; day <= 5; day++) {
  assert.ok(fs.existsSync(`dist/maps/day-${day}.svg`));
  assert.ok(sw.includes(`maps/day-${day}.svg`), `Day ${day}交通圖未快取`);
}
for (const name of ["background", "train", "boat"]) {
  assert.ok(sw.includes(`illustrations/arashiyama/${name}.webp`), `嵐山${name}圖層未離線快取`);
}
for(const day of [1,3,4,5])assert.ok(sw.includes(`illustrations/journey/day-${day}.webp`),`Day${day}插畫未快取`);
assert.ok(sw.includes('illustrations/journey/plane.webp'));
