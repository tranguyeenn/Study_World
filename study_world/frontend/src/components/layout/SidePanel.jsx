import React from "react";

export default function SidePanel({ onCollapse }) {
  const games = [
    { name: "Typing", path: "/games/typing" },
    { name: "Wordle", path: "/games/wordle" },
    { name: "Math", path: "/games/math" },
  ];

  return (
    <aside className="w-64 border-l border-[#1d2d50] bg-[#1d2d50]/30 p-4 flex flex-col justify-between text-sm">
      <div className="space-y-4">
        {/* Chat */}
        <div>
          <h3 className="font-semibold text-[#9ecbff] mb-1">Chat</h3>
          <p className="opacity-70">No messages yet.</p>
        </div>

        {/* Community (moved below Chat) */}
        <div>
          <h3 className="font-semibold text-[#9ecbff] mb-1">Community</h3>
          <p className="opacity-70">
            <a
              href="/comm"
              className="text-[#d0e1ff] hover:text-[#9ecbff] underline-offset-2 hover:underline transition-colors"
            >
              Visit the board →
            </a>
          </p>
        </div>

        {/* Notes */}
        <div>
          <h3 className="font-semibold text-[#9ecbff] mb-1">Notes</h3>
          <p className="opacity-70">Empty.</p>
        </div>

        {/* Mini Games */}
        <div>
          <h3 className="font-semibold text-[#9ecbff] mb-1">Mini Games</h3>
          <ul className="space-y-1">
            {games.map((game) => (
              <li key={game.name}>
                <a
                  href={game.path}
                  className="text-[#d0e1ff] hover:text-[#9ecbff] transition-colors underline-offset-2 hover:underline"
                >
                  {game.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={onCollapse}
        className="self-end text-xs text-[#9ecbff] hover:text-white mt-4"
      >
        Collapse ◀
      </button>
    </aside>
  );
}
