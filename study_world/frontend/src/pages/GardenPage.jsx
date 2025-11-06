import React, { useState, useEffect } from "react";
import { useNotification } from "../context/NotificationContext";
import { Link } from "react-router-dom";

/**
 * GardenPage (cleaned)
 * --------------------
 * No extra Desktop wrapper, no ghost white slots.
 * Dark glowing grid that matches StudyWorld's retro theme.
 */

export default function GardenPage() {
  const notify = useNotification();

  const [garden, setGarden] = useState(() =>
    JSON.parse(localStorage.getItem("studyworld_garden") || "[]")
  );

  const [inventory, setInventory] = useState(() =>
    JSON.parse(localStorage.getItem("studyworld_inventory") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("studyworld_garden", JSON.stringify(garden));
  }, [garden]);

  useEffect(() => {
    const timer = setInterval(() => {
      setGarden((plots) =>
        plots.map((p) => {
          if (!p) return null;
          const age = (Date.now() - p.plantedAt) / 1000;
          if (age > 30 && p.stage < 2) return { ...p, stage: 2 };
          if (age > 60 && p.stage < 3) return { ...p, stage: 3 };
          return p;
        })
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleDrop = (e, index) => {
    e.preventDefault();
    const plantName = e.dataTransfer.getData("plant");
    if (!plantName) return;

    if (garden[index]) {
      notify("that plot already has something.", "info");
      return;
    }

    const updated = [...garden];
    updated[index] = {
      id: Date.now(),
      type: plantName,
      stage: 1,
      plantedAt: Date.now(),
    };
    setGarden(updated);

    const newInv = inventory
      .map((i) =>
        i.name === plantName ? { ...i, qty: i.qty - 1 } : i
      )
      .filter((i) => i.qty > 0);
    setInventory(newInv);
    localStorage.setItem("studyworld_inventory", JSON.stringify(newInv));

    notify(`🌱 planted ${plantName}`);
  };

  const handleHarvest = (index) => {
    const plant = garden[index];
    if (!plant || plant.stage < 3) {
      notify("🌿 not ready yet", "info");
      return;
    }

    const reward = Math.floor(Math.random() * 30) + 20;
    notify(`🌸 harvested ${plant.type}! +${reward} coins`);
    const updated = [...garden];
    updated[index] = null;
    setGarden(updated);

    const stats = JSON.parse(localStorage.getItem("petStats") || "{}");
    const newStats = { ...stats, coins: (stats.coins ?? 0) + reward };
    localStorage.setItem("petStats", JSON.stringify(newStats));
  };

  const allowDrop = (e) => e.preventDefault();
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("plant", item.name);
  };

  const getIcon = (plant) => {
    if (!plant) return "";
    if (plant.stage === 1) return "🌱";
    if (plant.stage === 2) return "🌿";
    return plant.type === "flower"
      ? "🌸"
      : plant.type === "bamboo"
      ? "🎋"
      : "🌳";
  };

  return (
    <div className="flex flex-col items-center text-[#d0e1ff] w-full px-6 py-8">
      <h1 className="text-3xl font-semibold text-[#9ecbff] mb-2 text-glow">
        your garden
      </h1>
      <p className="text-sm text-[#b8cfff]/80 mb-6 italic">
        drag from mini-inventory or visit full inventory page.
      </p>

      {/* main layout: garden + side inventory */}
      <div className="flex flex-col md:flex-row gap-8 items-start w-full max-w-5xl">
        {/* garden grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 flex-1">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              onClick={() => garden[i] && handleHarvest(i)}
              onDrop={(e) => handleDrop(e, i)}
              onDragOver={allowDrop}
              className={`w-20 h-20 flex items-center justify-center rounded-xl cursor-pointer transition text-3xl border border-[#233a6e] ${
                garden[i]
                  ? "bg-[#1d2d50]/60 hover:bg-[#233a6e]/80"
                  : "bg-[#1d2d50]/30 hover:bg-[#233a6e]/50"
              }`}
            >
              {getIcon(garden[i])}
            </div>
          ))}
        </div>

        {/* mini inventory */}
        <div className="md:w-56 w-full bg-[#1d2d50]/40 border border-[#233a6e] rounded-xl p-4">
          <h2 className="font-semibold text-[#9ecbff] text-center mb-3">
            mini inventory
          </h2>

          {inventory.length === 0 ? (
            <p className="text-xs text-center text-[#b8cfff]/70">
              nothing to plant yet.
            </p>
          ) : (
            <div className="flex flex-wrap justify-center gap-3">
              {inventory.map((item) => (
                <div
                  key={item.name}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="w-16 h-16 bg-[#1d2d50]/60 border border-[#233a6e] rounded-lg 
                    flex flex-col items-center justify-center cursor-grab hover:bg-[#233a6e]/70 
                    text-xs text-center text-[#d0e1ff] select-none"
                >
                  <span className="text-xl">
                    {item.name === "flower"
                      ? "🌸"
                      : item.name === "bamboo"
                      ? "🎋"
                      : "🌳"}
                  </span>
                  <span>{item.name}</span>
                  <span className="text-[10px] text-[#9ecbff]/80">
                    x{item.qty}
                  </span>
                </div>
              ))}
            </div>
          )}

          <Link
            to="/inventory"
            className="block text-center text-[#9ecbff]/80 hover:text-[#9ecbff] text-sm mt-4 underline"
          >
            open full inventory →
          </Link>
        </div>
      </div>

      {garden.every((p) => !p) && (
        <p className="opacity-60 text-sm mt-8">
          your garden’s empty — drag something in!
        </p>
      )}
    </div>
  );
}