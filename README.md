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

## 功能

- 原創繪本風插畫、五日入口、出發倒數、日本時間、旅行當日切換、目前／接續行程、飯店資訊。
- 五天完整起訖時間軸、已確認／預計／待確認標籤。航班全部換算日本時間，保留台灣原始時刻說明。
- 可編輯彈性時間、卡片上下排序、時間重疊偵測、延誤重算、完成勾選、單日JSON匯出與還原。固定班次不自動調整。
- SVG電車站序、方向、站間區間與中途停靠數、反向回程、步行虛線、官方資訊、Maps上車站與大眾運輸入口。
- 餐廳卡、營業及最後點餐資訊、候選／訂位狀態、備選方案；不明確地點不提供導航。
- Day 2 紫色39系統巴士提醒與遊船取消替代路線；Day 3 團體彈性時段、集合提醒與景點排序。
- 景點搜尋、原創插畫放大、Google Maps官方URLs（transit／walking）。
- 本機旅行清單、日誌／心情／照片、JPEG壓縮（1400px，品質0.75）、容量估計與失敗處理。
- JPY／TWD記帳、自訂參考匯率、每日及全程統計；JSON匯出／匯入含驗證。
- PWA圖示、iPhone主畫面設定、常見尺寸直式啟動畫面、離線快取與新版更新提示、安全區底部導覽、reduced motion。

## 資料維護

| 檔案                             | 用途                                             |
| -------------------------------- | ------------------------------------------------ |
| `src/data/itinerary.ts`          | 五日行程、時間、狀態、固定班次與團體景點順序     |
| `src/data/places.ts`             | 飯店、景點、車站、餐廳、精確名稱／地址及官方連結 |
| `src/data/transport.ts`          | 普通列車站序、方向、交通規劃與來源               |
| `src/components/`                | 時間軸、電車、餐廳、飯店、景點卡與PWA狀態        |
| `public/illustrations/kyoto.svg` | 原創京都風景插畫                                 |
| `vite.config.ts`                 | `/kyoto-travel/` base、manifest、Service Worker  |

修改公開資料後須重新部署。使用者本機時間軸覆寫不會因部署自動清除，可按「還原」回到最新公開版本。

## 本機私人資料

資料庫 `kyoto-diary-v1` 的 `local` object store 使用 `itinerary-edits`、`tour-order`、`restaurant-status`、`private-data` 等key。沒有上傳請求，不會同步GitHub或另一支手機。Safari清除資料／系統回收空間可能刪除記錄，請定期匯出JSON。日誌與記帳備份會取代本機私人資料；單日行程另外匯出。沒有包含個人訂房號碼、憑證、付款資料或Token。

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

## 飯店與餐廳來源

飯店名稱、地址、電話、15:00入住／10:00退房依[飯店官方](https://www.hotel-androoms.com/aks/information/)。已付款資訊依使用者提供，現場另付適用住宿稅，未公開個人訂單。

全部餐廳預設「預計前往」，沒有擅自標記已訂位。價格缺乏可靠最新資料時不顯示。

- 檸檬牛舌分店未確認，不提供導航。
- [嵐山よしむら官方](https://www.yoshimura-gr.com/arashiyama/shop/)：平日11:00–16:00，旺季可能調整；最後點餐未明列，14:00抵達須確認候位。
- [京都拉麵小路官方](https://www.kyoto-ramen-koji.com/)：實際店家與營業依各店公告。
- [奥丹清水官方](https://tofuokutan.info/guide.html)：週日營業起始時間有明顯誤植，網站不自行改寫；請致電075-525-2051確認營業、最後點餐與候位。
- [モリタ屋 木屋町店官方](https://moritaya-kyoto.co.jp/restaurant/kiyamachi/)：晚餐17:00–22:00，最終入店20:45，料理L.O.21:00；另收10%服務費，建議訂位。
- 丹後海鮮、京都站日式料理皆為未選定店家的候選，無精確店址時不提供導航。

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

自動測試覆蓋日期星期、時間重疊、資料引用、跨時區航班、普通列車站序、Maps參數、固定班次延誤重算、備份驗證。GitHub Pages部署與正式HTTPS網站已驗證；實際iPhone Safari仍須取得裝置後驗證，瀏覽器390px預覽不等同Safari實機測試。
