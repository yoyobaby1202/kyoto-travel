import { test } from "node:test";
import assert from "node:assert/strict";
import { days } from "../data/itinerary";
import { routes } from "../data/transport";
test("12/11至12/13核心時段、旅團日期與轉乘資料同步", () => {
  const find=(day:number,id:string)=>days[day-1].events.find(e=>e.id===id)!;
  for(const [day,id,start,end] of [[2,"2-4","09:02","09:25"],[2,"2-8","11:00","13:00"],[2,"2-hiro-hachijoguchi","19:15","21:15"],[3,"ruri-visit","10:00","11:30"],[3,"ruri-kiyomizu","13:30","15:00"],[3,"3-karasemitei-dinner","19:30","20:30"]] as const){
    const e=find(day,id); assert.equal(e.start,start);assert.equal(e.end,end);assert.equal(e.fixed,true);
  }
  assert.match(days[2].title,/琉璃光院/);
  assert.match(days[3].title,/天橋立.*伊根舟屋/);
  assert.equal(find(4,"3-3").end,"09:00");
  assert.equal(find(4,"3-6").end,"18:00");
  assert.ok(!days[2].events.some(e=>e.place==="meeting"));
  assert.ok(!days[3].events.some(e=>e.restaurant==="lemon"));
  for(const e of days.flatMap(d=>d.events)) for(const id of e.connections || []) assert.ok(routes.some(r=>r.id===id));
  assert.deepEqual(routes.find(r=>r.id==='tofukuji-demachi')!.stations,['東福寺','七条','清水五条','祇園四条','三条','神宮丸太町','出町柳']);
  assert.equal(routes.find(r=>r.id==='eizan')!.stations.length-1,7);
  assert.equal(routes.find(r=>r.id==='demachi-gojo')!.stations.length-1,4);
  assert.deepEqual(routes.find(r=>r.id==='shijo-marutamachi')!.stations,['四条','烏丸御池','丸太町']);
  assert.deepEqual(routes.find(r=>r.id==='marutamachi-kyoto')!.stations,['丸太町','烏丸御池','四条','五条','京都']);
  assert.equal(find(3,'3-karasemitei-checkin').end,'19:30');
  assert.ok(!days[0].events.some(e=>e.restaurant==='mishima'));
  assert.ok(!days[2].events.some(e=>e.restaurant==='lemon'));
  assert.ok(!days[3].events.some(e=>e.place==='gion'));
});
