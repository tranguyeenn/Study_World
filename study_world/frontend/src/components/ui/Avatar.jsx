import React from "react";

/**
 * StudyWorld Avatar
 * -----------------
 * Displays the user's avatar and name.
 * Can be expanded later to show level, XP bar, or click-to-open profile.
 */

export default function Avatar({ user }) {
  // fallback if no user info yet
  const name = user?.name || "Guest";
  const avatarUrl =
    user?.avatar ||
    "https://api.dicebear.com/9.x/thumbs/svg?seed=studyworld"; // placeholder avatar

  return (
    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-[#1d2d50]/40 border border-[#233a6e] shadow-md hover:bg-[#233a6e]/40 transition">
      {/* === Avatar image === */}
      <img
        src={avatarUrl}
        alt="User avatar"
        className="w-16 h-16 rounded-full border border-[#1d2d50] shadow-md mb-2"
      />

      {/* === Username === */}
      <span className="font-semibold text-[#d0e1ff] text-sm">{name}</span>

      {/* === Optional Level or Title === */}
      {user?.level && (
        <span className="text-xs text-[#9ecbff]/80 mt-1">
          Level {user.level}
        </span>
      )}
    </div>
  );
}
