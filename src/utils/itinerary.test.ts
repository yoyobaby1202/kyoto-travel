import { test } from "node:test";
import assert from "node:assert/strict";
import { days } from "../data/itinerary";
import { places, restaurants } from "../data/places";
import { routes } from "../data/transport";
import { minutes, overlaps, delayEvents } from "./time";
import { maps } from "./maps";
import { validateBackup } from "./backup";
test("五天日期、星期與時間完整且無重疊", () => {
  assert.equal(days.length, 5);
  for (const d of days) {
    assert.equal(
      new Intl.DateTimeFormat("zh-TW", {
        timeZone: "Asia/Tokyo",
        weekday: "long",
      }).format(new Date(`${d.date}T12:00:00+09:00`)),
      `星期${d.weekday}`,
    );
    assert.deepEqual(overlaps(d.events), []);
    for (const e of d.events) {
      assert.ok(minutes(e.end) > minutes(e.start));
      assert.ok(/^\d{2}:\d{2}$/.test(e.start));
      if (e.place)
        assert.ok([...places, ...restaurants].some((p) => p.id === e.place));
      if (e.route) assert.ok(routes.some((r) => r.id === e.route));
    }
  }
});
test("航班跨時區正確、抵達京都不早於HARUKA目標抵達", () => {
  assert.equal(days[0].events[0].start, "08:00");
  assert.equal(days[4].events.at(-1)?.end, "22:15");
  assert.equal(days[0].events[3].start, "13:34");
});
test("稻荷普通列車兩區間一中途站，嵯峨野站序完整", () => {
  assert.deepEqual(routes[0].stations, ["京都", "東福寺", "稲荷"]);
  assert.equal(routes[1].stations.length - 1, 7);
  assert.equal(routes[1].stations[1], "梅小路京都西");
  assert.equal(routes[3].confirmedStops, false);
});
test("所有已知地點Maps URL具有官方api=1與編碼後目的地", () => {
  for (const p of [...places, ...restaurants]) {
    if (!p.query) continue;
    const url = new URL(maps(p.query, "walking"));
    assert.equal(url.origin, "https://www.google.com");
    assert.equal(url.searchParams.get("api"), "1");
    assert.equal(url.searchParams.get("destination"), p.query);
    assert.equal(url.searchParams.get("travelmode"), "walking");
  }
  assert.equal(
    new URL(maps("京都駅", "transit", "稲荷駅")).searchParams.get("origin"),
    "稲荷駅",
  );
  assert.match(restaurants[0].query!, /牛たんの檸檬 京都店/);
});
test("延誤重算保留固定班次並回報產生的衝突", () => {
  const events = days[1].events;
  const shifted = delayEvents(events, 30, 1);
  assert.equal(shifted[1].start, "09:00");
  assert.equal(shifted[3].start, "10:02");
  assert.ok(overlaps(shifted).length > 0);
  assert.throws(() =>
    delayEvents([{ ...events[0], start: "23:00", end: "23:59" }], 30, 0),
  );
});
test("備份拒絕錯誤版本、無效金額、惡意圖片並接受合法資料", () => {
  const b = {
    version: 1,
    entries: [],
    expenses: [],
    checks: { 護照: true },
    rate: 0.22,
  };
  assert.equal(validateBackup(b).rate, 0.22);
  assert.throws(() => validateBackup({ ...b, version: 9 }));
  assert.throws(() =>
    validateBackup({
      ...b,
      expenses: [
        {
          id: "1",
          title: "x",
          amount: -1,
          currency: "JPY",
          day: 1,
          category: "交通",
        },
      ],
    }),
  );
  assert.throws(() =>
    validateBackup({
      ...b,
      entries: [
        {
          id: "x",
          text: "x",
          day: 1,
          mood: "x",
          place: "x",
          photo: "javascript:alert(1)",
        },
      ],
    }),
  );
});
