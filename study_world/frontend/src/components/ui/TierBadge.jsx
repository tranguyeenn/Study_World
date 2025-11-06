import React from "react";

/**
 * StudyWorld Tier Badge
 * ---------------------
 * Displays a small, color-coded badge for a user's tier.
 * Supports: Gold, Silver, Bronze (defaults to neutral).
 */

export default function TierBadge({ tier }) {
  const styles = {
    Gold: "text-yellow-300 border-yellow-400/40 bg-yellow-300/10",
    Silver: "text-slate-300 border-slate-400/40 bg-slate-300/10",
    Bronze: "text-amber-500 border-amber-400/40 bg-amber-400/10",
  };

  const style = styles[tier] || "text-[#d0e1ff] border-[#233a6e] bg-[#1d2d50]/30";

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full border shadow-sm ${style}`}
    >
      {tier || "Unranked"}
    </span>
  );
}