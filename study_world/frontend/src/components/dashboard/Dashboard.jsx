import React, { useState, useEffect } from "react";
import SidePanel from "../layout/SidePanel";

export default function Dashboard() {
  // Load saved collapse state, default to false
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidePanelCollapsed");
    return saved ? JSON.parse(saved) : false;
  });

  // ✅ Always save whenever it changes
  useEffect(() => {
    console.log("Saving collapse state:", isCollapsed);
    localStorage.setItem("sidePanelCollapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  // Debug
  console.log("Stored state on render:", localStorage.getItem("sidePanelCollapsed"));

  // Stats and UI below
  const stats = JSON.parse(localStorage.getItem("petStats") || "{}");
  const xp = stats.xp ?? 0;
  const coins = stats.coins ?? 0;

  const quickLinks = [
    { name: "Study", icon: "📚", path: "/study" },
    { name: "Games", icon: "🎮", path: "/games" },
    { name: "Garden", icon: "🌸", path: "/inventory" },
    { name: "Community", icon: "💬", path: "/leaderboard" },
    { name: "Profile", icon: "👤", path: "/profile" },
  ];

  return (
    <div className="flex relative bg-[#0a1128] text-[#d0e1ff] min-h-screen">
      <main className="flex-1 flex flex-col items-center gap-6 py-6 border-b border-[#1d2d50]">
        <div className="flex items-center gap-8 text-sm font-medium bg-[#1d2d50]/70 border border-[#233a6e] rounded-xl px-8 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
          <span className="flex items-center gap-2">
            <span className="text-emerald-400 text-lg">💰</span>
            <strong className="text-emerald-300">{coins}</strong>
            <span className="opacity-80">coins</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="text-indigo-400 text-lg">⭐</span>
            <strong className="text-indigo-300">{xp}</strong>
            <span className="opacity-80">xp</span>
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-8 bg-[#1d2d50]/50 border border-[#233a6e] rounded-xl p-4 w-[90%] shadow-lg">
          {quickLinks.map((item) => (
            <button
              key={item.name}
              onClick={() => (window.location.href = item.path)}
              className="flex flex-col items-center gap-2 text-[#d0e1ff] hover:text-[#9ecbff] transition"
            >
              <span className="text-3xl">{item.icon}</span>
              <span className="text-sm opacity-90">{item.name}</span>
            </button>
          ))}
        </div>
      </main>

      {/* side panel */}
      {!isCollapsed && <SidePanel onCollapse={() => setIsCollapsed(true)} />}

      {/* expand button */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-xs text-[#9ecbff] hover:text-white bg-[#1d2d50]/50 px-2 py-1 rounded-l-md transition-colors"
        >
          ▶ Expand
        </button>
      )}
    </div>
  );
}
