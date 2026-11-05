import { useEffect, useState } from "react";
import {
  HashRouter,
  NavLink,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import {
  CalendarDays,
  TrainFront,
  NotebookTabs,
  Leaf,
  WifiOff,
  Download,
} from "lucide-react";
import { Itinerary } from "./pages/Itinerary";
import { Transport } from "./pages/Transport";
import { Tips } from "./pages/Tips";
import { JourneyHero } from "./components/JourneyHero";
import { PwaStatus } from "./components/PwaStatus";
import { selectedTripDay } from "./utils/selectedTripDay";
import { tokyoNow } from "./utils/time";
const nav = [
  { to: "/", label: "行程", icon: CalendarDays },
  { to: "/transport", label: "交通", icon: TrainFront },
  { to: "/tips", label: "小叮嚀", icon: NotebookTabs },
];
function Shell() {
  const { pathname, search } = useLocation();
  const selectedDay = selectedTripDay(search);
  const trip = pathname === "/" || pathname === "/itinerary";
  const [online, setOnline] = useState(navigator.onLine);
  const [now, setNow] = useState(tokyoNow());
  const [install, setInstall] = useState(false);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    const timer = window.setInterval(() => setNow(tokyoNow()), 30000);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
      clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return (
    <div id="maple-app">
      <div className="md-shell">
        <header className="md-top">
          <NavLink to={`/?day=${selectedDay}`}>
            <Leaf size={14} />
            ふたりの京都旅日記
          </NavLink>
          <span>2026.12.10–12.14</span>
        </header>
        {trip && <JourneyHero />}
        <nav className="md-nav" aria-label="主要頁籤">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              to={`${to}?day=${selectedDay}`}
              key={to}
              end={to === "/"}
              className={({ isActive }) =>
                isActive || (to === "/" && pathname === "/itinerary")
                  ? "selected"
                  : ""
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className={`network-bar ${online ? "" : "offline"}`}>
          <span>
            {online ? <span className="network-dot" /> : <WifiOff size={12} />}{" "}
            {online ? "已連線" : "離線快取"} · 京都 {now.slice(11, 16)}
          </span>
          <button onClick={() => setInstall(!install)}>
            <Download size={12} />
            加入主畫面
          </button>
        </div>
        {install && (
          <section className="install-tip">
            <strong>把旅日記帶著走</strong>
            <p>
              iPhone
              Safari點「分享」→「加入主畫面」。首次連網完成快取後可離線閱讀行程與交通；Google
              Maps及官網仍需網路。
            </p>
            <button onClick={() => setInstall(false)}>知道了 ×</button>
          </section>
        )}
        <div className="pwa-status-wrap">
          <PwaStatus />
        </div>
        <main className="md-body">
          <Routes>
            <Route path="/" element={<Itinerary />} />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="md-bottom">
          把京都的風景，一起收藏。
          <small>靜態旅行規劃 · 班次依官方公告與現場看板</small>
        </footer>
      </div>
    </div>
  );
}
export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  );
}
