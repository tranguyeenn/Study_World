import React from "react";

/**
 * StudyWorld Dashboard
 * --------------------
 * Minimal home hub for quick navigation.
 * Shows XP and coins, plus links to main sections.
 */
export default function Dashboard() {
  // Safely read stored XP/coins
  const stats = JSON.parse(localStorage.getItem("petStats") || "{}");
  const xp = stats.xp ?? 0;
  const coins = stats.coins ?? 0;

  // main section shortcuts
  const quickLinks = [
    { name: "Study", icon: "📚", path: "/study" },
    { name: "Games", icon: "🎮", path: "/games" },
    { name: "Garden", icon: "🌸", path: "/inventory" },
    { name: "Community", icon: "💬", path: "/leaderboard" },
    { name: "Profile", icon: "👤", path: "/profile" },
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full bg-[#0a1128] text-[#d0e1ff] py-6 border-b border-[#1d2d50]">
      {/* === Progress Bar (XP + Coins) === */}
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

      {/* === Quick Access Panel === */}
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
    </div>
  );
}