import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import sharp from "sharp";
import { paintedJourneyFlights } from "../data/paintedJourneyFlights";
test("四天插畫與飛機素材完整、透明且適合離線快取", async () => {
  for (const day of [1, 3, 4, 5]) {
    const path = `public/illustrations/journey/day-${day}.webp`;
    assert.ok(fs.statSync(path).size < 2 * 1024 * 1024);
    const m = await sharp(path).metadata();
    assert.equal(m.width, 1200);
    assert.equal(m.height, 1550);
  }
  const m = await sharp("public/illustrations/journey/plane.webp").metadata();
  assert.ok(m.hasAlpha);
  for (const [day, path] of Object.entries(paintedJourneyFlights)) {
    const n = path.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
    assert.equal(Math.sign(n.at(-2)! - n[0]), day === "1" ? 1 : -1);
    assert.equal(Math.sign(n.at(-1)! - n[1]), day === "1" ? -1 : 1);
  }
});
