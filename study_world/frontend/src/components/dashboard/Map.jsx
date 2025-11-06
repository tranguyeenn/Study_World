import React from "react";

/**
 * StudyWorld Quick Access Panel
 * ------------------------------
 * Replaces the old grid map.
 * Shows main portal icons for quick navigation.
 */
export default function Map() {
  const links = [
    { label: "Study", icon: "📚", path: "/study" },
    { label: "Games", icon: "🎮", path: "/games" },
    { label: "Garden", icon: "🌸", path: "/inventory" },
    { label: "Community", icon: "💬", path: "/leaderboard" },
    { label: "Profile", icon: "👤", path: "/profile" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4 rounded-lg bg-[#1d2d50]/40 border border-[#233a6e] shadow-md">
      {links.map((item) => (
        <button
          key={item.label}
          onClick={() => (window.location.href = item.path)}
          className="flex flex-col items-center gap-1 text-[#d0e1ff] hover:text-[#9ecbff] transition"
        >
          <span className="text-2xl">{item.icon}</span>
          <span className="text-sm opacity-90">{item.label}</span>
        </button>
      ))}
    </div>
  );
}