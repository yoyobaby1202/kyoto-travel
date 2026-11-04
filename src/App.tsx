import { useEffect, useState } from "react";
import {
  HashRouter,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  Home as HomeIcon,
  CalendarDays,
  TrainFront,
  Map,
  BookOpen,
  Heart,
  WifiOff,
  Leaf,
  Download,
} from "lucide-react";
import { Home } from "./pages/Home";
import { Itinerary } from "./pages/Itinerary";
import { Transport } from "./pages/Transport";
import { MapPage } from "./pages/Map";
import { Journal } from "./pages/Journal";
import { PwaStatus } from "./components/PwaStatus";
import { tokyoNow } from "./utils/time";
const nav = [
  { to: "/", label: "首頁", en: "HOME", icon: HomeIcon },
  { to: "/itinerary", label: "行程", en: "ITINERARY", icon: CalendarDays },
  { to: "/transport", label: "交通", en: "TRANSPORT", icon: TrainFront },
  { to: "/map", label: "地圖", en: "PLACES", icon: Map },
  { to: "/journal", label: "日誌", en: "JOURNAL", icon: BookOpen },
];
function Shell() {
  const location = useLocation();
  const [online, setOnline] = useState(navigator.onLine);
  const [, tick] = useState(0);
  const [install, setInstall] = useState(false);
  useEffect(() => {
    const a = () => setOnline(navigator.onLine);
    window.addEventListener("online", a);
    window.addEventListener("offline", a);
    const id = setInterval(() => tick((n) => n + 1), 30000);
    return () => {
      window.removeEventListener("online", a);
      window.removeEventListener("offline", a);
      clearInterval(id);
    };
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);
  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <NavLink to="/" className="brand">
            <span className="brand-icon">
              <TrainFront size={24} strokeWidth={1.5} />
            </span>
            <div>
              <strong>ふたりの京都旅日記</strong>
              <small>OUR KYOTO WINTER JOURNEY</small>
            </div>
          </NavLink>
          <nav className="desktop-nav" aria-label="主要導覽">
            {nav.map(({ to, label, icon: Icon }) => (
              <NavLink to={to} end={to === "/"} key={to}>
                <Icon size={15} />
                {label}
              </NavLink>
            ))}
          </nav>
          <span className="header-date">
            <Heart size={13} /> 2026.12.10 — 12.14
          </span>
        </div>
      </header>
      <div className={`network-bar ${!online ? "offline" : ""}`}>
        <div>
          <span className="network-dot" />
          {online
            ? "已連線 · 靜態行程，非即時交通"
            : "離線模式 · 顯示已快取行程，Maps導航需網路"}
          {!online && <WifiOff size={12} />}
        </div>
        <span>
          京都 {tokyoNow().slice(11, 16)}{" "}
          <span className="desktop-only">JST</span>
          <button onClick={() => setInstall(!install)}>
            <Download size={12} />
            加入主畫面
          </button>
        </span>
      </div>
      {install && (
        <section className="install-tip">
          <strong>把京都手帳帶著走</strong>
          <p>
            iPhone
            Safari：點「分享」→「加入主畫面」。首次開啟需連網，快取完成後可離線查看行程、交通與景點。外部Maps與官方網站仍需要網路。
          </p>
          <button onClick={() => setInstall(false)}>知道了 ×</button>
        </section>
      )}
      <div className="pwa-status-wrap">
        <PwaStatus />
      </div>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div>
          <Leaf size={16} />
          <strong>ふたりの京都旅日記</strong>
        </div>
        <p>OUR KYOTO WINTER JOURNEY · 2026</p>
        <small>For the two of us, and all the little moments.</small>
        <span>
          行程為規劃資訊 · 交通依官方公告與現場看板 · 私人記錄僅儲存本機
        </span>
      </footer>
      <nav className="bottom-nav" aria-label="手機主要導覽">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink to={to} end={to === "/"} key={to}>
            <Icon size={21} strokeWidth={1.6} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  );
}
