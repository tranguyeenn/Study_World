import React from "react";
import { calculateTier } from "../../utils/leaderboard";

/**
 * StudyWorld Leaderboard Profile Card
 * -----------------------------------
 * Appears when hovering over a user’s name or avatar.
 * Shows their XP, coins, level, and tier.
 */

export default function LeaderboardProfileCard({ user, rank }) {
  const tier = calculateTier(user);

  return (
    <div
      className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 
      bg-[#0a1128]/95 border border-[#1d2d50] rounded-xl p-4 text-xs 
      shadow-[0_8px_25px_rgba(0,0,0,0.4)] w-52 z-50 left-12 top-[-10px]
      backdrop-blur-md pointer-events-none"
    >
      {/* === Header Section === */}
      <div className="flex items-center gap-2 mb-2">
        <img
          src={user.avatar || 'https://api.dicebear.com/9.x/thumbs/svg?seed=studyworld'}
          alt="avatar"
          className="w-7 h-7 rounded-full border border-[#233a6e]"
        />
        <div>
          <p className="font-semibold text-[#9ecbff] leading-tight">{user.username}</p>
          <p className="text-[10px] text-[#9ecbff]/60 capitalize">{tier} tier</p>
        </div>
      </div>

      {/* === Stats Section === */}
      <div className="space-y-1 text-[#d0e1ff]/90">
        <p>Rank: #{rank}</p>
        <p>Level: {user.level ?? 1}</p>
        <p>XP: {user.xp ?? 0}</p>
        <p>Coins: {user.coins ?? 0}</p>
        <p>Study: {(user.studyTime / 60 || 0).toFixed(1)}h</p>
        <p>Music: {user.musicHours ?? 0}h</p>
        <p>Games: {user.gamesPlayed ?? 0}</p>
      </div>
    </div>
  );
}