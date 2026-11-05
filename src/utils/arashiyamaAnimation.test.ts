import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  arashiyamaArtwork as art,
  arashiyamaProgress,
} from "../data/arashiyamaArtwork";
test("嵐山動畫火車先行、停住後遊船接續，結束不循環", () => {
  assert.deepEqual(arashiyamaProgress(0), { train: 0, boat: 0 });
  assert.deepEqual(arashiyamaProgress(5000), { train: 1, boat: 0 });
  assert.deepEqual(arashiyamaProgress(5700), { train: 1, boat: 0 });
  assert.ok(arashiyamaProgress(8000).boat > 0);
  assert.deepEqual(arashiyamaProgress(12200), { train: 1, boat: 1 });
  assert.deepEqual(arashiyamaProgress(60000), { train: 1, boat: 1 });
  for (const file of art.files)
    assert.ok(
      fs.statSync(`public/illustrations/arashiyama/${file}`).size <
        2 * 1024 * 1024,
    );
  const metadata = JSON.parse(
    fs.readFileSync("public/illustrations/arashiyama/art.json", "utf8"),
  );
  assert.ok(metadata.train.hasAlpha && metadata.boat.hasAlpha);
});
