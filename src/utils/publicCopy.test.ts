import { test } from "node:test";
import assert from "node:assert/strict";
import { initialTripHash } from "./initialTripHash";
import { travelCopy } from "./travelCopy";
import { days } from "../data/itinerary";
test("每次首次載入皆進入12/10行程，包含交通與小叮嚀分享連結", () => {
  assert.equal(initialTripHash(""), "#/?day=1");
  assert.equal(initialTripHash("#/transport?day=2"), "#/?day=1");
  assert.equal(initialTripHash("#/?day=5"), "#/?day=1");
  assert.equal(initialTripHash("#/tips?day=3"), "#/?day=1");
});
test("公開文案移除不確定提示，但不新增確認狀態或改動訂位資料", () => {
  for (const text of [
    "目標10:02–10:25・待核對",
    "晚餐待定",
    "預計用餐・尚未確認訂位",
    "未訂票。HARUKA 14:00–15:20待確認",
  ]) {
    const display = travelCopy(text);
    assert.doesNotMatch(display, /待核對|待確認|待定|尚未|未訂票|預計|目標/);
    assert.doesNotMatch(display, /已訂位|已確認/);
  }
  assert.equal(days[1].events.find((e) => e.id === "2-4")!.status, "待確認");
});
