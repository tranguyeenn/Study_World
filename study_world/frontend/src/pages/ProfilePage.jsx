import { useEffect, useState } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import avatarImg from "../assets/avatar.png";
import supabase from "/src/utils/supabaseClient.js";
import { Link } from "react-router-dom";
import React from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ xp: 0, coins: 0, level: 1, created_at: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) console.error("Auth fetch error:", error.message);
      setUser(user);

      if (user) {
        const { data, error: userError } = await supabase
          .from("users")
          .select("xp, coins, level, created_at")
          .eq("id", user.id)
          .single();

        if (!userError && data) setStats(data);
      }
      setLoading(false);
    }

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#0a1128] via-[#0d1b3a] to-[#0a1128] text-[#d0e1ff] relative overflow-hidden">
      {/* background aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(62,125,255,0.08),_transparent_70%)] pointer-events-none" />

      {loading ? (
        <p className="mt-20 text-slate-400 italic">loading your profile...</p>
      ) : (
        <>
          {/* avatar + name */}
          <div className="flex flex-col items-center mt-12">
            <div className="relative w-28 h-28 rounded-full border-[2px] border-[#9ecbff]/60 shadow-[0_0_25px_rgba(62,125,255,0.4)] overflow-hidden mb-4">
              <img
                src={avatarImg}
                alt="profile avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-semibold text-[#9ecbff] mb-1">
              {user?.email?.split("@")[0] || "Traveler"}
            </h1>
            <p className="text-xs text-[#b8cfff]/70">
              joined{" "}
              {stats.created_at
                ? new Date(stats.created_at).toLocaleDateString()
                : "sometime ago"}
            </p>
          </div>
          
          {/* ... rest of your stats and sign-out button ... */}
        </>
      )}

      {/* back link */}
      <Link
        to="/home"
        className="z-50 mt-12 mb-8 flex items-center gap-2 text-emerald-300/90 font-medium hover:text-emerald-300 transition-all"
      >
        ← back to world
      </Link>
    </div>
  );
}