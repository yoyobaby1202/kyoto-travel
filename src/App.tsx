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
  Film,
} from "lucide-react";
import { Itinerary } from "./pages/Itinerary";
import { Transport } from "./pages/Transport";
import { Tips } from "./pages/Tips";
import { Recap } from "./pages/Recap";
import { JourneyHero } from "./components/JourneyHero";
import { PwaStatus } from "./components/PwaStatus";
import { selectedTripDay } from "./utils/selectedTripDay";
import { tokyoNow } from "./utils/time";
const nav = [
  { to: "/", label: "行程", icon: CalendarDays },
  { to: "/transport", label: "交通", icon: TrainFront },
  { to: "/tips", label: "小叮嚀", icon: NotebookTabs },
  { to: "/recap", label: "旅程回顧", icon: Film },
];
function Shell() {
  const { pathname, search } = useLocation();
  const selectedDay = selectedTripDay(search);
  const [online, setOnline] = useState(navigator.onLine);
  const [now, setNow] = useState(tokyoNow());
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
  return (
    <div id="maple-app">
      <div className="md-shell">
        <header className="md-top">
          <NavLink to={`/?day=${selectedDay}`} preventScrollReset>
            <Leaf size={14} />
            ふたりの京都旅日記
          </NavLink>
          <span>2026.12.10–12.14</span>
        </header>
        <JourneyHero />
        <nav className="md-nav" aria-label="主要頁籤">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              to={`${to}?day=${selectedDay}`}
              preventScrollReset
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
        </div>
        <div className="pwa-status-wrap">
          <PwaStatus />
        </div>
        <main className="md-body">
          <Routes>
            <Route path="/" element={<Itinerary />} />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/recap" element={<Recap />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="md-bottom">
          把京都的風景，一起收藏。
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
