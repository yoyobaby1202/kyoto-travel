# ふたりの京都旅日記

兩個人的京都旅行 · Our Kyoto Winter Journey · 2026/12/10–12/14

React + TypeScript + Vite + Tailwind CSS + HashRouter + Lucide + IndexedDB + PWA。沒有後端、帳號或付費API。插畫由本專案原創SVG繪製，沒有使用未授權照片。

## 本機使用

需要 Node.js 22.12以上（建議22或24）。

```sh
npm ci
npm run dev
```

開啟終端機顯示的 `/kyoto-travel/` 網址。正式離線功能需使用建置預覽或HTTPS網站：

```sh
npm run typecheck
npm test
npm run build
npm run preview
```

手機連同一Wi-Fi，可用終端顯示的區網IP查看版面；普通HTTP區網通常不能註冊Service Worker，PWA請在HTTPS部署後實機驗證。

## 目前版本：嵐山楓葉旅日記

- 以楓葉橘、朱紅、和紙白與3px墨灰線條呈現；「俊佑 & 采玲」只在開頭出現，頁尾不重複名字。
- 導覽只有「行程／交通／小叮嚀」。地圖、日誌與「走自己的步調」編輯／排序／延誤重算介面已移除。
- 首頁有去回程航班兩張方框卡。除了桃園起飛07:00、返抵桃園21:15顯示台灣時間，其餘時間均為日本時間。內部時間資料仍採Asia/Tokyo，用於正確計算目前行程與時間區間。
- 日期列是五站軌道。點日期後，小火車用0.8秒滑至對應站點，同時車輪旋轉與車身短暫晃動；支援快速連續切換、瀏覽器返回與prefers-reduced-motion。
- 所有嵐山小火車插畫共用 `TrainArt`：首頁、日期動畫、Day2主題圖、App圖示與啟動畫面使用同一圖稿。
- 每日配色：伏見稻荷朱紅／嵐山楓橘／伊根海灣水色／東山寺院暖灰／回程稻穗金。
- 時間軸使用左側時間、圓點虛線、圓角景點卡與簡潔交通列。保留完成勾選、目前行程標示與每日匯出。
- 保留檸檬牛舌與弘燒肉候選名稱；弘燒肉分店及日期待確認，並非已訂位。其餘餐廳改為「午餐／晚餐」。
- 用餐卡提供「設定餐廳」，可填名稱、精確分店地址、Google Maps連結、訂位狀態及備註；提供修改與清除。沒有精確地址或有效Maps網址時不提供導航。設定儲存於IndexedDB。
- 保留SVG普通列車站序／方向／站數、Google Maps導航、Day2接駁／停航備案、Day3集合提醒與彈性團體時段。
- 小叮嚀有行前／每日清單、飯店資訊、PWA說明與備份匯入匯出。
- PWA的scope與base維持 /kyoto-travel/。Huninn以SIL OFL授權本機字型子集提供，離線可用；未收錄的新輸入字元由系統字型補上。

## 資料與維護

- `src/data/itinerary.ts`：固定五日行程，日本時間內部資料。餐廳用 `meal` 標記。
- `src/data/transport.ts`：普通列車方向、站序、規劃班次、官方連結。
- `src/data/places.ts`：飯店、景點、車站與保留候選餐廳。
- `src/components/TrainArt.tsx`：唯一的嵐山小火車圖稿。修改後以 `npx tsx scripts/generate-icons.ts` 更新App圖示與啟動畫面。
- `node scripts/subset-font.mjs`：內容變動增加字元時重建本機Huninn字型子集；授權見public/fonts/OFL.txt。
- `src/utils/displayTime.ts`：只有去程起飛、回程抵達換成台灣時間。
- `src/components/MealCard.tsx`：餐廳表單與導航；分享網址白名單驗證在 `src/utils/meals.ts`。

## 本機資料

IndexedDB仍為 `kyoto-diary-v1`。新版使用 `completed-stops`、`meal-settings`、`private-data` 等key。移除舊日誌介面不會刪除已存在的私人紀錄；備份會保留這些資料。清單與餐廳設定不自動跨裝置同步。

新版備份version2包含餐廳、完成紀錄及既有私人資料，可匯入舊version1備份。新版匯入經驗證後以單一IndexedDB交易寫入，避免部分更新。舊行程時間覆寫不再套用，改用Repository的固定行程。

## 交通與時間查核

查核日期：2026/11/05。這不是即時交通服務。公開官網資料不代表旅行日營運、餘位或預約已確認。

- IT210提供的台灣07:00 = 日本08:00；關西10:25。IT213關西18:55 → 台灣21:15 = 日本22:15。仍請核對航空公司正式通知。
- HARUKA去程22號12:14–13:34、備選24號12:44–14:04、回程33號14:00–15:20都是使用者目標，尚未官方核定、未訂票，不以未查證中途站計算站數。[JR西日本官方](https://www.westjr.co.jp/global/tc/ticket/haruka/)
- JR京都→東福寺→稲荷為普通列車2個站間區間、1個中途停靠站。[奈良線官方區間時刻表](https://timetable.jr-odekake.net/line-timetable/2300)
- JR嵯峨野普通列車京都→梅小路京都西→丹波口→二条→円町→花園→太秦→嵯峨嵐山。[官方近畿路線圖](https://www.jr-odekake.net/route/files/route_kinki.pdf)
- 2026小火車官方表列嵯峨野3號10:02出發；12/11營運、餘位與票券須再確認。[官方2026時刻表](https://www.sagano-kanko.co.jp/cms/wp-content/uploads/2026/03/2026年列車運転時刻表日-3.pdf)
- 現行巴士39系統從トロッコ亀岡列10:35開車；旅行日適用性、車程、票價及報到期限待查。規劃到達11:00含緩衝，非官方到站時刻。小火車／遊船停運時巴士也可能停駛。[官方接駁時刻](https://www.keihankyotokotsu.jp/bustimetable/timetable.php?no=1&stop_cd=2050)
- 冬季保津川遊船12:00只是保守目標，未預約；依冬季船班、河況、天氣與官方報到時間調整。[保津川官方](https://www.hozugawakudari.jp/)
- Klook未提供商品頁與憑證，無法證實精確停車格與景點保證。集合Maps只指向八條口參考區域。伊根與天橋立共用彈性區間，包含午餐、遊船及兩區巴士移動。船谷部展望台、Ine Cafe boat dock精確地點未確認，暫不建立導航。
- Day 2 小火車轉巴士10分鐘較緊；冬季船班與午餐可能受延誤影響，優先保留渡月橋、竹林。
- Day 3 11:30–15:30內容較多，以旅行社實際安排為準。Day 4 午餐候位與東山步行會影響後續。
- Day 5 機場用餐需配合登機時間，保留國際線報到與安檢緩衝。

## 飯店與餐廳

飯店基本資料依[飯店官方](https://www.hotel-androoms.com/aks/information/)。付款資訊依使用者提供，未公開訂單號碼；現場另付適用住宿稅。

檸檬牛舌與弘燒肉均為分店待確認的候選，未自行訂位。弘燒肉日期亦待確認。其他餐廳名稱已移除，旅人選定店家後可在該餐卡填入精確地址或Google Maps連結。自行輸入的資訊不代表經本站查證。

## GitHub Pages部署（已上線）

正式網站：https://yoyobaby1202.github.io/kyoto-travel/

Repository：https://github.com/yoyobaby1202/kyoto-travel

首次GitHub Actions建置、測試與Pages部署均成功，正式網址已開啟驗證。公開內容為固定行程及網站原始碼；IndexedDB私人資料、備份與本機測試截圖不會上傳。

後續部署與維護：

1. 以GitHub正常登入或Git Credential Manager完成授權，不要把密碼或Token寫進程式碼。
2. 將此目錄的原始碼（不含node_modules／dist／私人備份）推送到該Repository的 `main` 分支。
3. Repository → Settings → Pages → Source選擇 **GitHub Actions**。
4. `.github/workflows/deploy.yml` 自動執行 `npm ci`、TypeScript、測試、Vite build，再部署Pages。
5. 等待Actions成功後，以實際回傳網址驗證。到iPhone Safari檢查主畫面啟動、離線、Maps跳轉、照片與匯入匯出。

HashRouter避免深層連結重新整理404，manifest／Service Worker scope都是 `/kyoto-travel/`。外部Maps與官網不能保證離線可用。

## 驗證範圍

自動測試覆蓋日期星期、時間重疊、資料引用、跨時區顯示、保留餐廳與通用午晚餐、普通列車站序、Maps參數與分享網址驗證、備份驗證。GitHub Pages部署與正式HTTPS網站已驗證；實際iPhone Safari仍須取得裝置後驗證，瀏覽器390px預覽不等同Safari實機測試。


### 2026-11-05 餐廳與交通圖更新
- 12/10 晚餐待定；12/11 19:00–20:30 弘燒肉 京都駅前店；12/13 18:30–19:30 牛たんの檸檬 京都店。兩家均未確認訂位，本機自訂餐廳仍優先保留。
- 交通頁五天切換單張 SVG，可放大，所有地圖及內嵌字型納入 PWA 離線快取。
- 修改地圖後執行 `node scripts/subset-font.mjs`、`npx tsx scripts/generate-transport-maps.tsx` 再建置。
- 原創行程小插畫使用 EventArtwork；嵐山小火車繼續共用 TrainArt。
- 河原町回程站序來源：[阪急京都線](https://www.hankyu.co.jp/station/kyoto/index.html)、[京都市地下鐵烏丸線](https://www2.city.kyoto.lg.jp/kotsu/tikadia/hyperdia/line02.htm)。


### 日期與方位修正
行程與交通共用 URL 的 day 參數，未指定或無效時預設 Day 1；跨頁保留選取日期。地標方向依官方位置頁及 OpenStreetMap 位置核對，約略座標與來源記錄於 src/data/geography.ts。交通圖北朝上並採分區縮尺，圖示錨點符合東西南北排序，文字避讓時以細線連回；不代表等比例道路或實際海岸。台灣在關西西南方，關西機場在京都西南方，飯店在京都站西北側。
