import { test } from "node:test";
import assert from "node:assert/strict";
import { days } from "../data/itinerary";
import { restaurants } from "../data/places";
import { displayTime } from "./displayTime";
import { validMapsUrl, validateMeal } from "./meals";
test("畫面只在桃園起飛與返抵桃園使用台灣時間，內部日本時間保持正確", () => {
  assert.deepEqual(displayTime(days[0].events[0]), {
    start: "07:00",
    end: "10:25",
    startZone: "台灣",
    endZone: "日本",
  });
  assert.deepEqual(displayTime(days[4].events.at(-1)!), {
    start: "18:55",
    end: "21:15",
    startZone: "日本",
    endZone: "台灣",
  });
  assert.equal(days[0].events[0].start, "08:00");
  assert.equal(days[4].events.at(-1)?.end, "22:15");
  for (const day of days)
    for (const event of day.events) {
      if (event.mode !== "flight") {
        assert.equal(displayTime(event).startZone, undefined);
        assert.equal(displayTime(event).endZone, undefined);
      }
    }
});
test("已選餐廳與每日用餐時段保持一致", () => {
  assert.deepEqual(
    restaurants.map((r) => r.id),
    ["lemon", "hiro", "mishima", "karasemitei", "matsugae"],
  );
  for (const day of days)
    for (const event of day.events) {
      if (event.meal) {
        assert.match(event.title, /午餐|晚餐/);
        assert.ok(!event.place || event.place === "airport");
        assert.ok(
          !event.restaurant || ["lemon", "hiro", "mishima", "karasemitei", "matsugae"].includes(event.restaurant),
        );
      }
    }
  assert.equal(
    days[2].events.find((e) => e.id === "3-5")?.restaurant,
    undefined,
  );
});
test("餐廳導航接受官方Maps與分享連結，拒絕任意網址、偽裝網域及程式碼", () => {
  for (const good of [
    "https://www.google.com/maps/search/?api=1&query=京都",
    "https://maps.app.goo.gl/example",
    "https://goo.gl/maps/example",
  ])
    assert.ok(validMapsUrl(good));
  for (const bad of [
    "javascript:alert(1)",
    "https://evil.test/maps",
    "https://www.google.com.evil.test/maps",
    "https://maps.app.goo.gl@evil.test/maps",
    "http://google.com/maps",
    "https://user:secret@google.com/maps",
    "https://google.com/search?q=京都",
  ])
    assert.equal(validMapsUrl(bad), false);
});
test("餐廳設定不捏造分店資訊，允許先記名稱再補導航", () => {
  const meal = {
    name: " 弘燒肉 ",
    address: "",
    mapsUrl: "",
    status: "預計前往" as const,
    note: "",
  };
  assert.equal(validateMeal(meal).name, "弘燒肉");
  assert.equal(validateMeal(meal).mapsUrl, "");
  assert.throws(() => validateMeal({ ...meal, name: "" }));
  assert.throws(() => validateMeal({ ...meal, mapsUrl: "https://evil.test" }));
});
