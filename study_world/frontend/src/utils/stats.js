import { useState, useEffect } from "react";

/**
 * Hook: usePetStats
 * -----------------
 * Central place for storing and updating user stats
 * (xp, coins, energy, happiness, level).
 * Values persist in localStorage between sessions.
 */

export function usePetStats() {
  const [stats, setStats] = useState(() => {
    // Load from localStorage or create default
    const saved = localStorage.getItem("petStats");
    return saved
      ? JSON.parse(saved)
      : {
          xp: 0,
          coins: 0,
          energy: 100,
          happiness: 100,
          level: 1,
        };
  });

  // Sync with localStorage whenever stats change
  useEffect(() => {
    localStorage.setItem("petStats", JSON.stringify(stats));
  }, [stats]);

  return [stats, setStats];
}

/**
 * Reset all stats to default values.
 * Useful for testing or debug resets.
 */
export function resetPetStats() {
  const defaults = {
    xp: 0,
    coins: 0,
    energy: 100,
    happiness: 100,
    level: 1,
  };
  localStorage.setItem("petStats", JSON.stringify(defaults));
  return defaults;
}