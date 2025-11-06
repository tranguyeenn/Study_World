import React, { useState, useEffect } from "react";
import SidePanel from "./SidePanel";
import Taskbar from "./Taskbar";
import NotificationManager from "../ui/NotificationManager";

/**
 * StudyWorld Desktop Layout
 * -------------------------
 * The main operating system UI.
 * Includes:
 *  • Top bar with title, coins/xp, and clock
 *  • Navigation tabs
 *  • Main content area
 *  • Collapsible side panel (on the right)
 *  • Bottom taskbar
 *  • Global Notification Manager
 */
export default function Desktop({ children }) {
  const [time, setTime] = useState("");
  const [showPanel, setShowPanel] = useState(true);

  // live clock
  useEffect(() => {
    const clock = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 1000);
    return () => clearInterval(clock);
  }, []);

  // read saved xp & coins
  const stats = JSON.parse(localStorage.getItem("petStats") || "{}");
  const xp = stats.xp ?? 0;
  const coins = stats.coins ?? 0;

  return (
    <div className="flex flex-col h-screen bg-[#0a1128] text-[#d0e1ff] font-mono relative">
      {/* === Top bar === */}
      <header className="flex justify-between items-center px-4 py-2 border-b border-[#1d2d50] bg-[#1d2d50]/70 shadow-md">
        {/* left: app name */}
        <span className="font-bold text-lg">StudyWorld OS</span>

        {/* center: coins + xp */}
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

        {/* right: clock */}
        <span className="text-sm opacity-80">🕒 {time}</span>
      </header>

      {/* === Navigation tabs === */}
      <nav className="flex justify-center gap-6 border-b border-[#1d2d50] py-2 text-sm">
        {["Study", "Games", "Garden", "Shop", "Inv", "Comm", "Profile"].map((tab) => {
          const path = tab === "Inv" ? "inventory" : tab.toLowerCase();
          return (
            <button
              key={tab}
              className="hover:text-[#9ecbff] transition"
              onClick={() => (window.location.href = `/${path}`)}
            >
              [{tab}]
            </button>
          );
        })}
      </nav>

      {/* === Main area === */}
      <main className="flex flex-1 overflow-hidden">
        {/* === Left: Main content === */}
        <section className="flex-1 p-6 overflow-y-auto border-r border-[#1d2d50]">
          {children || (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-70">
              <p className="text-lg italic">system idle. awaiting chaos...</p>
              <p className="text-xs mt-2">choose a tab or start a new mission.</p>
            </div>
          )}
        </section>

        {/* === Right: Collapsible Side Panel === */}
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

      {/* === Bottom taskbar (keep it) === */}
      <Taskbar />

      {/* === Global Notifications === */}
      <NotificationManager />
    </div>
  );
}

