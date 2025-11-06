import React from "react";

/**
 * StudyWorld OS Window
 * --------------------
 * A small floating window component with a title bar and content area.
 * You can use this for pop-ups, panels, or app sections.
 */

export default function Window({ title, onClose, children }) {
  return (
    <div className="border border-[#1d2d50] bg-[#1d2d50]/40 rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.4)] p-4 mb-4 backdrop-blur-sm">
      {/* === Window Header === */}
      <div className="flex justify-between items-center border-b border-[#233a6e] pb-1 mb-2">
        <span className="font-semibold text-[#9ecbff]">{title}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="text-xs text-[#9ecbff]/70 hover:text-[#d0e1ff] transition"
          >
            ×
          </button>
        )}
      </div>

      {/* === Window Content === */}
      <div className="text-sm text-[#d0e1ff]">
        {children || <p className="opacity-60">Empty window.</p>}
      </div>
    </div>
  );
}