import React from "react";

/**
 * StudyWorld OS Window
 * --------------------
 * Simple retro-style window component.
 * Can wrap any content or pop-up inside your OS layout.
 */

export default function Window({ title, onClose, children }) {
  return (
    <div className="border border-[#1d2d50] bg-[#1d2d50]/40 rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.4)] p-4 mb-4 backdrop-blur-sm">
      {/* === Header Bar === */}
      <div className="flex justify-between items-center border-b border-[#233a6e] pb-1 mb-2">
        <span className="font-semibold text-[#9ecbff]">{title}</span>
        <button
          onClick={onClose}
          className="text-xs text-[#9ecbff]/70 hover:text-[#d0e1ff] transition cursor-pointer"
        >
          ×
        </button>
      </div>

      {/* === Window Body === */}
      <div className="text-sm text-[#d0e1ff]">
        {children || <p className="opacity-60">Nothing to display.</p>}
      </div>
    </div>
  );
}
