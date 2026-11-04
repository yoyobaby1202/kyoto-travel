import fs from "node:fs";
import { createFont, woff2 } from "fonteditor-core";
function files(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory()
        ? files(`${dir}/${e.name}`)
        : /\.(ts|tsx)$/.test(e.name)
          ? [`${dir}/${e.name}`]
          : [],
    );
}
const content = files("src")
  .map((p) => fs.readFileSync(p, "utf8"))
  .join("");
const chars = new Set([
  ...content,
  ...Array.from({ length: 95 }, (_, i) => String.fromCharCode(i + 32)),
]);
const local = "artifacts/huninn-source.ttf";
const buffer = fs.existsSync(local)
  ? fs.readFileSync(local)
  : Buffer.from(
      await (
        await fetch(
          "https://fonts.gstatic.com/s/huninn/v9/OpNNnoINg9bQ4xkpjg.ttf",
        )
      ).arrayBuffer(),
    );
await woff2.init();
const font = createFont(buffer, {
  type: "ttf",
  subset: [...chars].map((c) => c.codePointAt(0)),
  hinting: false,
  compound2simple: true,
});
font.optimize();
fs.mkdirSync("public/fonts", { recursive: true });
fs.writeFileSync(
  "public/fonts/huninn-trip.woff2",
  font.write({ type: "woff2" }),
);
console.log(
  `Huninn本機字型子集：${fs.statSync("public/fonts/huninn-trip.woff2").size} bytes`,
);
