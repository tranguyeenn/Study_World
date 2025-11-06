import React, { useState, useEffect } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import LeaderboardTable from "../components/ui/LeaderboardTable";
import { sortUsersByScore, calculateScore } from "../utils/leaderboard";
import { Link } from "react-router-dom";
import supabase from "/src/utils/supabaseClient.js";

export default function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = "Trang"; // replace later with Supabase auth user

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("users")
          .select("id, name, xp, coins, level, created_at");

        if (error) throw error;

        const scoredUsers = data.map((u) => ({
          username: u.name || "Unknown",
          avatar: "/avatar.png",
          level: u.level || 1,
          xp: u.xp || 0,
          coins: u.coins || 0,
          studyTime: 0, // add tracking later
          musicHours: 0,
          gamesPlayed: 0,
          score: calculateScore(u),
        }));

        const sorted = sortUsersByScore(scoredUsers);
        setUsers(sorted);
      } catch (err) {
        console.error("Error fetching leaderboard:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center text-[#d0e1ff] bg-[#0a1128] relative overflow-hidden">
      {/* background soft glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(62,125,255,0.08),_transparent_70%)] pointer-events-none" />

      {/* dashboard */}
      <div className="w-full z-20 mb-6">
        <Dashboard />
      </div>

      <h1 className="text-4xl font-semibold text-[#9ecbff] mb-2 text-glow tracking-tight">
        leaderboard
      </h1>
      <p className="text-[#b8cfff]/70 text-sm mb-8 italic">
        monthly reset • gold, silver, and bronze tiers
      </p>

      {loading ? (
        <div className="flex flex-col items-center mt-10 text-[#9ecbff]/70">
          <div className="w-48 h-4 bg-[#1d2d50]/60 rounded animate-pulse mb-2"></div>
          <div className="w-32 h-4 bg-[#1d2d50]/60 rounded animate-pulse"></div>
          <p className="text-sm mt-4 italic">loading leaderboard...</p>
        </div>
      ) : users.length === 0 ? (
        <p className="text-[#b8cfff]/60 italic mt-10">
          no users yet — be the first to start earning XP 🌱
        </p>
      ) : (
        <LeaderboardTable users={users} currentUser={currentUser} />
      )}

      <Link
        to="/home"
        className="z-50 mt-12 mb-8 flex items-center gap-2 text-[#9ecbff]/80 font-medium hover:text-[#9ecbff] transition-all"
      >
        ← back to world
      </Link>
    </div>
  );
}