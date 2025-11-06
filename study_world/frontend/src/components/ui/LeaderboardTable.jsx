import React from "react";
import TierBadge from "./TierBadge";
import LeaderboardProfileCard from "./LeaderboardProfileCard";
import { calculateTier } from "../../utils/leaderboard";

/**
 * StudyWorld Leaderboard Table
 * ----------------------------
 * Displays ranked users with XP, coins, and other activity stats.
 */
export default function LeaderboardTable({ users, currentUser }) {
  return (
    <div className="relative bg-[#0a1128]/70 border border-[#1d2d50] rounded-2xl 
      w-[90%] max-w-4xl backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.4)] overflow-visible z-10">
      <table className="w-full border-collapse text-sm md:text-base text-[#d0e1ff]">
        <thead className="bg-[#1d2d50]/80 text-[#9ecbff] uppercase tracking-wide text-xs">
          <tr>
            <th className="py-3 px-4 text-left">Rank</th>
            <th className="py-3 px-4 text-left">User</th>
            <th className="py-3 px-4 text-left">Tier</th>
            <th className="py-3 px-4 text-left">XP</th>
            <th className="py-3 px-4 text-left">Coins</th>
            <th className="py-3 px-4 text-left">Study Time</th>
            <th className="py-3 px-4 text-left">Music / Games</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, i) => {
            const isCurrent = user.username === currentUser;
            const tier = calculateTier(user);

            return (
              <tr
                key={user.username}
                className={`transition ${
                  isCurrent
                    ? "bg-emerald-400/20 font-semibold"
                    : "hover:bg-[#1d2d50]/40"
                }`}
              >
                {/* Rank */}
                <td className="py-3 px-4">{i + 1}</td>

                {/* User */}
                <td className="py-3 px-4 flex items-center gap-3">
                  <div className="relative group">
                    <img
                      src={
                        user.avatar ||
                        "https://api.dicebear.com/9.x/thumbs/svg?seed=studyworld"
                      }
                      alt="avatar"
                      className="w-8 h-8 rounded-full border border-emerald-300/40"
                    />
                    <LeaderboardProfileCard user={user} rank={i + 1} />
                  </div>
                  <span>{user.username}</span>
                </td>

                {/* Tier */}
                <td className="py-3 px-4">
                  <TierBadge tier={tier} />
                </td>

                {/* XP */}
                <td className="py-3 px-4">{user.xp ?? 0}</td>

                {/* Coins */}
                <td className="py-3 px-4">{user.coins ?? 0}</td>

                {/* Study time */}
                <td className="py-3 px-4">
                  {(user.studyTime / 60 || 0).toFixed(1)}h
                </td>

                {/* Music / Games */}
                <td className="py-3 px-4">
                  🎧 {user.musicHours ?? 0}h / 🎮 {user.gamesPlayed ?? 0}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}