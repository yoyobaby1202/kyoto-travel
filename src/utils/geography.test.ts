import { test } from "node:test";
import assert from "node:assert/strict";
import { geographicAnchors } from "../data/geography";
import { journeyMaps } from "../data/journeyMaps";
import { selectedTripDay } from "./selectedTripDay";
test("首次與無效日期預設12/10，日期參數可雙向共用", () => {
  for (const input of ["", "?day=0", "?day=6", "?day=abc", "?day=2.5"])
    assert.equal(selectedTripDay(input), 1);
  for (let day = 1; day <= 5; day++)
    assert.equal(selectedTripDay("?day=" + day), day);
});
test("五天景點錨點北朝上：每一對地標的東西南北關係皆符合核對座標", () => {
  for (const [day, map] of Object.entries(journeyMaps))
    for (const a of map.stops)
      for (const b of map.stops) {
        assert.ok(a.geo && geographicAnchors[a.geo]);
        assert.ok(b.geo && geographicAnchors[b.geo]);
        const ga = geographicAnchors[a.geo!],
          gb = geographicAnchors[b.geo!];
        if (Math.abs(ga.lon - gb.lon) > 0.00001)
          assert.equal(
            Math.sign(a.x - b.x),
            Math.sign(ga.lon - gb.lon),
            `Day${day}東西方位：${a.name}/${b.name}`,
          );
        if (Math.abs(ga.lat - gb.lat) > 0.00001)
          assert.equal(
            Math.sign(a.y - b.y),
            -Math.sign(ga.lat - gb.lat),
            `Day${day}南北方位：${a.name}/${b.name}`,
          );
      }
});
