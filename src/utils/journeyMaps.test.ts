import { test } from "node:test";
import assert from "node:assert/strict";
import { journeyMaps } from "../data/journeyMaps";
test("五天交通圖具有景點與路線，只有來回飛機設定動畫路徑", () => {
  assert.deepEqual(Object.keys(journeyMaps), ["1", "2", "3", "4", "5"]);
  for (const [day, map] of Object.entries(journeyMaps)) {
    assert.ok(map.stops.length >= 4);
    assert.ok(map.notes.length >= 3);
    for (const stop of map.stops) {
      assert.ok(stop.x >= 100 && stop.x <= 1100);
      assert.ok(stop.y + 116 < 1320);
      assert.ok(stop.art);
    }
    assert.equal(Boolean(map.flight), day === "1" || day === "5");
    if (map.flight)
      assert.ok(
        map.legs.some(
          (leg) => leg.kind === "flight" && leg.path === map.flight,
        ),
      );
  }
  assert.match(journeyMaps[1].notes.join(""), /2區間・中途1站/);
  assert.match(journeyMaps[3].notes.join(""), /伊根→天橋立車程/);
  assert.match(journeyMaps[4].notes.join(""), /四条→五条→京都/);
});
