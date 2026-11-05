/** Approximate landmark anchors checked 2026-11-05. These are for relative orientation, not navigation pins. */
export const geographicAnchors: Record<string, { lat: number; lon: number }> = {
  taoyuan: { lat: 25.0793174, lon: 121.2345977 },
  kix: { lat: 34.4342045, lon: 135.222523 },
  kyoto: { lat: 34.9846076, lon: 135.7584303 },
  hotel: { lat: 34.9890835, lon: 135.757132 },
  inari: { lat: 34.9667, lon: 135.7779 },
  fushimi: { lat: 34.9675192, lon: 135.7797101 },
  sagajr: { lat: 35.0187788, lon: 135.6814128 },
  sagatorokko: { lat: 35.0185888, lon: 135.6807067 },
  kameoka: { lat: 35.0131065, lon: 135.606831 },
  boat: { lat: 35.017431, lon: 135.58664 },
  bridge: { lat: 35.0128713, lon: 135.6777623 },
  nonomiya: { lat: 35.0177646, lon: 135.6741657 },
  ine: { lat: 35.6747, lon: 135.2885 },
  ineboat: { lat: 35.670506, lon: 135.277374 },
  inepark: { lat: 35.6754627, lon: 135.2928739 },
  view: { lat: 35.552395, lon: 135.1815922 },
  chion: { lat: 35.5586839, lon: 135.1840746 },
  kaisen: { lat: 35.5595, lon: 135.1855 },
  kiyomizu: { lat: 34.994303, lon: 135.7844389 },
  sannenzaka: { lat: 34.9964787, lon: 135.7813178 },
  kodaiji: { lat: 35.0003033, lon: 135.7805956 },
  yasaka: { lat: 35.0036027, lon: 135.7782611 },
  gion: { lat: 35.0014095, lon: 135.7749074 },
  kawaramachi: { lat: 35.0037633, lon: 135.769608 },
  lemon: { lat: 35.0034, lon: 135.7687 },
};
export const geographySources = [
  {
    title: "飯店官方交通與位置",
    url: "https://www.hotel-androoms.com/aks/access/",
  },
  {
    title: "嵯峨野觀光鐵道車站位置",
    url: "https://www.sagano-kanko.co.jp/station/",
  },
  { title: "保津川遊船官方交通", url: "https://www.hozugawakudari.jp/access" },
  {
    title: "伊根町觀光協會區域散策圖",
    url: "https://www.ine-kankou.jp/wp/wp-content/uploads/2025/12/ine-front-ja-202512.pdf",
  },
  {
    title: "京都市東山觀光區域圖",
    url: "https://ja.kyoto.travel/doc/pdf/map/areamap_gion_kiyomizu.pdf",
  },
  {
    title: "OpenStreetMap 地標位置補充核對",
    url: "https://www.openstreetmap.org/",
  },
];
