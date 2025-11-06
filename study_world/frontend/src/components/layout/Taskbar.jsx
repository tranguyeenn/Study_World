import React from "react";

export default function Taskbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-8 bg-[#0f1a30]/90 border-t border-[#1d2d50] backdrop-blur-sm flex items-center px-4 text-[#9ecbff] text-sm font-mono z-50">
      <span className="font-semibold text-[#d0e1ff]">
        StudyWorld OS
      </span>
      <span className="italic text-xs text-[#9ecbff]/70 ml-2">
        system stable...
      </span>
    </div>
  );
}
