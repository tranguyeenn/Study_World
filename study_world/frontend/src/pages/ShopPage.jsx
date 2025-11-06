import { useState, useEffect } from "react";
import { usePetStats } from "../utils/stats";
import Dashboard from "../components/dashboard/Dashboard";
import { Link } from "react-router-dom";
import avatarImg from "../assets/avatar.png";

export default function ShopPage() {
  const [stats, setStats] = usePetStats();
  const [message, setMessage] = useState("");
  const [petMood, setPetMood] = useState("happy");

  const itemsForSale = [
    { id: 1, name: "paper", price: 30 },
    { id: 2, name: "pen", price: 20 },
    { id: 3, name: "notebook", price: 25 },
    { id: 4, name: "calculator", price: 50 },
  ];

  // Pet mood logic
  useEffect(() => {
    const interval = setInterval(() => {
      const updated = JSON.parse(localStorage.getItem("petStats") || "{}");
      if (updated.energy > 70 && updated.happiness > 70) setPetMood("happy");
      else if (updated.energy > 40) setPetMood("tired");
      else if (updated.energy > 15) setPetMood("sleepy");
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

  const handleBuy = (item) => {
    if (stats.coins >= item.price) {
      // Deduct coins & boost happiness a bit
      const updated = {
        ...stats,
        coins: stats.coins - item.price,
        happiness: Math.min(100, (stats.happiness ?? 50) + 5),
      };
      setStats(updated);
      localStorage.setItem("petStats", JSON.stringify(updated));

      // Add item to inventory
      const inv = JSON.parse(localStorage.getItem("inventory") || "[]");
      inv.push(item);
      localStorage.setItem("inventory", JSON.stringify(inv));

      // Feedback message
      setMessage(`🛍️ bought ${item.name}! (+5 happiness)`);
    } else {
      setMessage("❌ not enough coins...");
    }
    setTimeout(() => setMessage(""), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#0a1128] via-[#0d1b3a] to-[#0a1128] text-[#d0e1ff] relative overflow-hidden">
      {/* blue glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.08),_transparent_70%)] pointer-events-none" />

      {/* top bar */}
      <div className="w-full z-20">
        <Dashboard />
      </div>

      {/* title */}
      <h1 className="text-4xl font-semibold mt-8 mb-2 text-indigo-300 tracking-tight drop-shadow-[0_0_10px_rgba(129,140,248,0.3)]">
        shop
      </h1>
      <p className="text-slate-400 mb-8 italic text-sm">
        trade your focus for new tools
      </p>

      {/* layout */}
      <div className="flex flex-row items-start justify-center gap-10 w-full max-w-5xl px-6">
        {/* pet */}
        <div className="flex flex-col items-center gap-2 sticky top-32">
          <div className="rounded-full border-[2px] border-indigo-300/70 shadow-[0_0_25px_rgba(129,140,248,0.5)] overflow-hidden w-24 h-24 transition-all">
            <img
              src={avatarImg}
              alt="pet avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-3xl">{moodEmoji}</span>
          <p className="text-xs text-slate-400 text-center w-28">
            {petMood === "happy" && "excited to shop!"}
            {petMood === "tired" && "browsing on low energy"}
            {petMood === "sleepy" && "half-asleep at checkout"}
            {petMood === "burntout" && "should probably rest..."}
          </p>
        </div>

        {/* shop items */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-5 z-10">
          {itemsForSale.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-br from-slate-800/80 to-slate-700/60 border border-white/10 rounded-2xl px-4 py-5 text-center font-medium text-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_0_15px_rgba(129,140,248,0.3)] hover:border-indigo-400/30 hover:scale-[1.03] transition-all"
            >
              <strong className="block text-lg capitalize mb-1">
                {item.name}
              </strong>
              <p className="text-slate-400 mb-3 text-sm">
                price: {item.price} coins
              </p>
              <button
                onClick={() => handleBuy(item)}
                className="bg-indigo-400/90 hover:bg-indigo-300 text-slate-900 px-3 py-1.5 rounded-md font-semibold text-sm transition-all active:scale-[0.97]"
              >
                buy
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* feedback message */}
      {message && (
        <div className="mt-8 bg-white/10 border border-white/10 text-indigo-200 rounded-xl py-3 px-6 font-medium backdrop-blur-sm shadow-[0_0_10px_rgba(129,140,248,0.2)] animate-slideIn">
          {message}
        </div>
      )}

      {/* back to world */}
      <Link
        to="/home"
        className="z-50 mt-12 mb-8 flex items-center gap-2 text-emerald-300/90 font-medium hover:text-emerald-300 transition-all"
      >
        ← back to map
      </Link>
    </div>
  );
}