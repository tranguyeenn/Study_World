import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import avatarImg from "../assets/avatar.png";
import React from "react";

/**
 * Inventory Hub
 * --------------
 * Central collection for all user items (garden + rewards).
 * Syncs with GardenPage (mini-inventory) via localStorage.
 */

export default function InventoryPage() {
  const [inventory, setInventory] = useState(
    JSON.parse(localStorage.getItem("studyworld_inventory") || "[]")
  );
  const [stats, setStats] = useState(
    JSON.parse(localStorage.getItem("petStats") || "{}")
  );
  const [petMood, setPetMood] = useState("happy");

  // Update pet mood based on stats
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedStats = JSON.parse(localStorage.getItem("petStats") || "{}");
      setStats(updatedStats);

      if (updatedStats.energy > 70 && updatedStats.happiness > 70) setPetMood("happy");
      else if (updatedStats.energy > 40) setPetMood("tired");
      else if (updatedStats.energy > 15) setPetMood("sleepy");
      else setPetMood("burntout");
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const moodEmoji = {
    happy: "😸",
    tired: "😐",
    sleepy: "😴",
    burntout: "🥲",
  }[petMood];

  // Drag item (for garden planting)
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("plant", item.name);
  };

  // Clear all inventory
  const handleClear = () => {
    if (window.confirm("Clear all inventory items?")) {
      setInventory([]);
      localStorage.setItem("studyworld_inventory", JSON.stringify([]));
    }
  };

  // Refresh inventory
  const handleRefresh = () => {
    const inv = JSON.parse(localStorage.getItem("studyworld_inventory") || "[]");
    setInventory(inv);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#0a1128] via-[#0d1b3a] to-[#0a1128] text-[#d0e1ff] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.06),_transparent_70%)] pointer-events-none" />

      {/* page header */}
      <h1 className="text-4xl font-semibold mt-10 mb-2 text-[#9ecbff] tracking-tight">
        inventory hub
      </h1>
      <p className="text-sm text-[#b8cfff]/70 mb-8 italic">
        manage your seeds, plants, and collectibles 🌿
      </p>

      {/* layout */}
      <div className="flex flex-row items-start justify-center gap-10 w-full max-w-5xl px-6">
        {/* avatar & mood */}
        <div className="flex flex-col items-center gap-2 sticky top-32">
          <div className="rounded-full border-[2px] border-[#9ecbff]/60 shadow-[0_0_20px_rgba(62,125,255,0.5)] overflow-hidden w-24 h-24">
            <img
              src={avatarImg}
              alt="pet avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-3xl">{moodEmoji}</span>
          <p className="text-xs text-[#b8cfff]/80 text-center w-32">
            {petMood === "happy" && "in good spirits!"}
            {petMood === "tired" && "needs a short break"}
            {petMood === "sleepy" && "running low on energy"}
            {petMood === "burntout" && "totally exhausted..."}
          </p>

          {/* quick actions */}
          <div className="flex flex-col items-center gap-2 mt-6 text-xs text-[#9ecbff]/70">
            <button onClick={handleRefresh} className="hover:text-[#9ecbff] transition">
              🔄 refresh
            </button>
            <button onClick={handleClear} className="hover:text-red-400 transition">
              🗑 clear all
            </button>
          </div>
        </div>

        {/* item grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-5">
          {inventory.length === 0 ? (
            <p className="col-span-full text-center text-[#9ecbff]/70 font-medium py-10 bg-[#1d2d50]/40 border border-[#233a6e] rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.3)]">
              no items owned yet.
            </p>
          ) : (
            inventory.map((item, i) => (
              <div
                key={i}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                className="bg-[#1d2d50]/60 border border-[#233a6e] rounded-2xl p-5 text-center 
                  font-medium text-[#d0e1ff] shadow-[0_4px_20px_rgba(0,0,0,0.25)] 
                  hover:bg-[#233a6e]/70 hover:border-[#9ecbff]/40 hover:scale-[1.03] 
                  transition cursor-grab active:cursor-grabbing"
              >
                <span className="text-3xl block mb-1">
                  {item.name === "flower"
                    ? "🌸"
                    : item.name === "bamboo"
                    ? "🎋"
                    : item.name === "tree"
                    ? "🌳"
                    : "🪴"}
                </span>
                <span className="block capitalize">{item.name}</span>
                <span className="text-sm text-[#9ecbff]/80">x{item.qty}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* nav links */}
      <div className="flex flex-col items-center mt-10 mb-8">
        <Link
          to="/garden"
          className="z-50 flex items-center gap-2 text-[#9ecbff]/80 font-medium hover:text-[#9ecbff] transition-all"
        >
          🌿 go to garden →
        </Link>
        <Link
          to="/home"
          className="mt-3 text-[#9ecbff]/60 text-sm hover:text-[#9ecbff] transition"
        >
          ← back to world
        </Link>
      </div>
    </div>
  );
}
