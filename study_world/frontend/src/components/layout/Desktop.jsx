import React, { useState, useEffect } from "react";
import SidePanel from "./SidePanel";
import NotificationManager from "../ui/NotificationManager";

/**
 * StudyWorld Desktop Layout
 * -------------------------
 * Modular OS layout:
 * - Top bar with title, stats, and clock
 * - Center nav tabs (core pages only)
 * - Collapsible side panel
 * - Bottom taskbar with system menu (three dots)
 * - Global notifications
 */
export default function Desktop({ children }) {
  const [time, setTime] = useState("");
  const [showPanel, setShowPanel] = useState(() => {
    const saved = localStorage.getItem("sidePanelCollapsed");
    return saved ? JSON.parse(saved) : true;
  });

  // live clock
  useEffect(() => {
    const clock = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 1000);
    return () => clearInterval(clock);
  }, []);

  // persist side panel visibility
  useEffect(() => {
    localStorage.setItem("sidePanelCollapsed", JSON.stringify(showPanel));
  }, [showPanel]);

  // read user stats
  const { xp = 0, coins = 0 } = JSON.parse(localStorage.getItem("petStats") || "{}");

  // core navigation tabs
  const mainTabs = [
    { name: "Study", path: "study" },
    { name: "Games", path: "games" },
    { name: "Garden", path: "garden" },
    { name: "Shop", path: "shop" },
    { name: "Inv", path: "inventory" },
  ];

  // bottom system menu
  const extraTabs = [
    { name: "Profile", path: "profile" },
    { name: "Leaderboard", path: "leaderboard" },
    { name: "About", path: "about" },
    { name: "Updates", path: "updates" }, // 🆕 added updates page
  ];

  const go = (path) => (window.location.href = `/${path}`);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-[#0a1128] text-[#d0e1ff] font-mono relative">
      {/* === Top bar === */}
      <header className="flex justify-between items-center px-4 py-2 border-b border-[#1d2d50] bg-[#1d2d50]/70 shadow-md select-none">
        <span className="font-bold text-lg tracking-tight">StudyWorld OS</span>

        <div className="flex gap-4 text-sm items-center">
          <span className="flex items-center gap-1">
            <span className="text-emerald-400">💰</span>
            <strong>{coins}</strong>
          </span>
          <span className="flex items-center gap-1">
            <span className="text-indigo-400">⭐</span>
            <strong>{xp}</strong>
          </span>
        </div>

        <span className="text-sm opacity-80">🕒 {time}</span>
      </header>

      {/* === Navigation === */}
      <nav className="flex justify-center gap-6 border-b border-[#1d2d50] py-2 text-sm">
        {mainTabs.map(({ name, path }) => (
          <button
            key={name}
            className="hover:text-[#9ecbff] transition"
            onClick={() => go(path)}
          >
            [{name}]
          </button>
        ))}
      </nav>

      {/* === Main Area === */}
      <main className="flex flex-1 overflow-hidden">
        <section className="flex-1 p-6 overflow-y-auto border-r border-[#1d2d50]">
          {children || (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-70">
              <p className="text-lg italic">system idle. awaiting chaos...</p>
              <p className="text-xs mt-2">choose a tab or start a new mission.</p>
            </div>
          )}
        </section>

        {/* === Right Side Panel === */}
        <div className="relative">
          {showPanel ? (
            <div className="flex">
              <SidePanel onCollapse={() => setShowPanel(false)} />
            </div>
          ) : (
            <button
              onClick={() => setShowPanel(true)}
              className="absolute top-2 right-0 text-xs text-[#9ecbff] hover:text-white px-2 py-1 border-l border-[#1d2d50] bg-[#0f1a3d]/50 rounded-l-md"
            >
              ◀
            </button>
          )}
        </div>
      </main>

      {/* === Bottom Taskbar === */}
      <footer className="flex justify-between items-center text-xs text-[#9ecbff]/70 bg-[#0f1a3d]/80 border-t border-[#1d2d50] px-4 py-1 relative select-none">
        <span className="font-semibold text-[#9ecbff]">
          StudyWorld <span className="opacity-60">OS</span>
        </span>
        <span className="italic text-[#b8cfff]/60">system stable...</span>

        {/* Three-dot system menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#9ecbff]/70 hover:text-[#9ecbff] text-lg px-2"
          >
            ⋮
          </button>

          {menuOpen && (
            <div
              className="absolute bottom-8 right-0 bg-[#1d2d50]/90 border border-[#233a6e] rounded-md shadow-lg w-40 backdrop-blur-sm animate-slideUp"
              onMouseLeave={() => setMenuOpen(false)}
            >
              {extraTabs.map(({ name, path }) => (
                <button
                  key={name}
                  onClick={() => go(path)}
                  className="block w-full text-left px-4 py-2 text-[#d0e1ff] hover:bg-[#233a6e]/70 transition text-sm"
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>
      </footer>

      {/* === Global Notifications === */}
      <NotificationManager />
    </div>
  );
}

/* === Animation for bottom popup === */
const style = document.createElement("style");
style.innerHTML = `
@keyframes slideUp {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slideUp {
  animation: slideUp 0.2s ease-out forwards;
}
`;
document.head.appendChild(style);
