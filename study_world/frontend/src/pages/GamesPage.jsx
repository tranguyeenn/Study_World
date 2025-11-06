import React from "react";
import { Link } from "react-router-dom";

export default function GamesPage() {
  return (
    <div className="flex flex-col items-center text-[#d0e1ff] w-full h-full px-6 py-10">
      {/* header */}
      <h1 className="text-3xl font-semibold text-[#9ecbff] mb-2 text-glow">
        games room 🎮
      </h1>
      <p className="text-sm text-[#b8cfff]/80 mb-10 italic">
        small distractions that still count as brain work.
      </p>

      {/* game links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-3xl">
        <Link
          to="/games/wordle"
          className="bg-[#1d2d50]/50 border border-[#233a6e] rounded-2xl p-6 text-center font-medium 
          text-[#d0e1ff] hover:text-[#9ecbff] hover:bg-[#1d2d50]/70 shadow-[0_4px_20px_rgba(0,0,0,0.3)] 
          hover:scale-[1.02] transition-all backdrop-blur-sm"
        >
          🧩 wordle challenge
        </Link>

        <Link
          to="/games/typing"
          className="bg-[#1d2d50]/50 border border-[#233a6e] rounded-2xl p-6 text-center font-medium 
          text-[#d0e1ff] hover:text-[#9ecbff] hover:bg-[#1d2d50]/70 shadow-[0_4px_20px_rgba(0,0,0,0.3)] 
          hover:scale-[1.02] transition-all backdrop-blur-sm"
        >
          ⌨️ typing test
        </Link>

        <Link
          to="/games/math"
          className="bg-[#1d2d50]/50 border border-[#233a6e] rounded-2xl p-6 text-center font-medium 
          text-[#d0e1ff] hover:text-[#9ecbff] hover:bg-[#1d2d50]/70 shadow-[0_4px_20px_rgba(0,0,0,0.3)] 
          hover:scale-[1.02] transition-all backdrop-blur-sm"
        >
          🧮 math & logic test
        </Link>
      </div>

      {/* back */}
      <Link
        to="/home"
        className="mt-12 text-sm text-[#9ecbff]/80 hover:text-[#9ecbff] transition"
      >
        ← back to the world
      </Link>
    </div>
  );
}
