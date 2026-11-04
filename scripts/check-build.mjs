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
assert.ok(sw.includes("illustrations/kyoto.svg"));
assert.ok(sw.includes("index-"));
assert.ok(!html.includes("https://fonts.googleapis.com"));
console.log("建置資源、manifest子路徑、SW離線入口與原創插畫快取檢查成功。");
