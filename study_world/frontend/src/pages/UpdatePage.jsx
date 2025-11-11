import React from "react";

export default function UpdatesPage() {
  const updates = [
    {
      version: "v0.1.0-pre",
      date: "Nov 10, 2025",
      notes: [
        "Initial pre-release build of StudyWorld OS.",
        "Base UI shell implemented: desktop layout, side panel, taskbar, and nav tabs.",
        "All pages structured (Study, Games, Garden, Shop, Inventory, Comm, Profile).",
        "No backend data sync yet — mock state and localStorage only.",
        "Socket & Supabase integration planned for v0.2.0.",
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center w-full text-[#d0e1ff] h-full px-6 py-10">
      <h1 className="text-4xl font-semibold text-[#9ecbff] mb-4 text-glow tracking-tight">
        Updates & Patch Notes
      </h1>
      <p className="text-sm text-[#b8cfff]/70 italic mb-8">
        development build • internal pre-release
      </p>

      <div className="max-w-2xl w-full space-y-6">
        {updates.map((update, i) => (
          <div
            key={i}
            className="bg-[#1d2d50]/50 border border-[#233a6e] rounded-xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          >
            <h2 className="text-xl font-semibold text-[#9ecbff]">
              {update.version}{" "}
              <span className="text-xs opacity-60 ml-1">{update.date}</span>
            </h2>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm text-[#b8cfff]/90">
              {update.notes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-xs mt-10 text-[#9ecbff]/50 italic">
        this is a pre-release build for internal testing only
      </p>
    </div>
  );
}
