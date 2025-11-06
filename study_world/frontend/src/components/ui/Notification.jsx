import React, { useEffect } from "react";

/**
 * StudyWorld Notification
 * -----------------------
 * Small pop-up alert for events like XP gains or completed tasks.
 * Automatically disappears after a few seconds.
 */
export default function Notification({ message, type = "info", onClose, duration = 3000 }) {
  // auto-dismiss after given duration
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // color styles by type
  const colors = {
    info: "border-sky-400 bg-[#1d2d50]/80 text-[#d0e1ff]",
    success: "border-emerald-400 bg-emerald-700/30 text-emerald-200",
    warning: "border-amber-400 bg-amber-700/30 text-amber-100",
    error: "border-red-400 bg-red-700/30 text-red-200",
  };

  return (
    <div
      className={`fixed bottom-6 right-6 border ${colors[type]} 
      rounded-lg shadow-lg px-4 py-3 text-sm font-medium 
      backdrop-blur-sm animate-slide-up`}
    >
      <div className="flex items-center justify-between gap-4">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="text-[#9ecbff]/70 hover:text-[#d0e1ff] text-xs transition"
        >
          ×
        </button>
      </div>
    </div>
  );
}
