import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { days } from "../data/itinerary";
import { restaurants } from "../data/places";
test("晚餐日期分店、時間與原有固定轉乘正確", () => {
  const dinner = (day: number) =>
    days[day - 1].events.find((e) => e.meal && e.title.includes("晚餐"))!;
  assert.equal(dinner(1).restaurant, undefined);
  assert.equal(dinner(2).restaurant, "hiro");
  assert.equal(dinner(2).start, "19:15");
  assert.equal(dinner(2).end, "21:15");
  assert.equal(dinner(2).status, "已確認");
  assert.match(dinner(2).note!, /2位成人/);
  assert.equal(days[1].events.find(e => e.id === "2-hiro-walk")!.end, "19:15");
  assert.equal(days[1].events.find(e => e.id === "2-15")!.start, "21:15");
  const hiro = restaurants.find(r => r.id === "hiro")!;
  assert.equal(hiro.phone, "075-662-1129");
  assert.match(hiro.official!, /hachijoguchi\.php$/);
  assert.match(new URL(hiro.mapsUrl!).searchParams.get("query")!, /八条口店.*南山王町25/);
  assert.equal(dinner(3).restaurant, "lemon");
  assert.equal(dinner(3).start, "18:30");
  assert.match(restaurants.find((r) => r.id === "hiro")!.ja, /八条口店/);
  for (const r of restaurants) {
    assert.ok(r.mapsUrl);
    assert.ok(r.address);
    assert.ok(r.phone);
    assert.ok(r.official);
  }
  const train = days[1].events.find((e) => e.id === "2-4")!;
  assert.equal(train.start, "09:02");
  assert.equal(train.end, "09:25");
  assert.equal(days[1].events.find((e) => e.id === "2-6")!.start, "09:25");
});
test("五張交通圖具有離線字型且小火車位於軌道上", () => {
  for (let day = 1; day <= 5; day++) {
    const svg = fs.readFileSync(`public/maps/day-${day}.svg`, "utf8");
    assert.match(svg, /data:font\/woff2;base64/);
    assert.match(svg, /非比例地圖/);
  }
  const svg = fs.readFileSync("public/maps/day-2.svg", "utf8");
  assert.match(svg, /x="638" y="354"/);
  assert.match(svg, /M770 415H620V660H400/);
});
