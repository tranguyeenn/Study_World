import React, { useState } from "react";
import { useNotification } from "../context/NotificationContext";

/**
 * Community Page
 * --------------
 * A quiet little board where users post updates or thoughts.
 * Automatically saves posts in localStorage.
 */
export default function CommPage() {
  const [posts, setPosts] = useState(() =>
    JSON.parse(localStorage.getItem("communityPosts") || "[]")
  );
  const [text, setText] = useState("");
  const notify = useNotification();

  const handlePost = () => {
    if (!text.trim()) return;
    const newPost = {
      id: Date.now(),
      content: text,
      date: new Date().toLocaleString(),
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem("communityPosts", JSON.stringify(updated));
    setText("");
    notify("🪴 your post has been shared.", "success");
  };

  const handleDelete = (id) => {
    const updated = posts.filter((p) => p.id !== id);
    setPosts(updated);
    localStorage.setItem("communityPosts", JSON.stringify(updated));
    notify("🗑️ post removed.", "info");
  };

  return (
    <div className="flex flex-col items-center w-full h-full text-[#d0e1ff] px-6 py-10">
      {/* header */}
      <h1 className="text-3xl font-semibold text-[#9ecbff] mb-3 text-glow">
        community board
      </h1>
      <p className="text-sm text-[#b8cfff]/80 mb-8 italic">
        a quiet space to share progress, thoughts, or small wins.
      </p>

      {/* post input */}
      <div className="w-full max-w-2xl mb-10 bg-[#1d2d50]/40 border border-[#233a6e] rounded-xl p-5 backdrop-blur-md shadow-md">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="what are you learning or building today?"
          className="w-full bg-[#0a1128]/50 border border-[#233a6e] rounded-lg p-3 text-sm text-[#d0e1ff] focus:outline-none focus:border-[#9ecbff] resize-none h-24 placeholder:text-[#9ecbff]/40"
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handlePost}
            className="bg-[#1d2d50] text-[#d0e1ff] px-5 py-2 rounded-md border border-[#233a6e] hover:bg-[#233a6e]/70 transition-all active:scale-[0.97]"
          >
            post
          </button>
        </div>
      </div>

      {/* post feed */}
      <div className="w-full max-w-2xl space-y-4">
        {posts.length === 0 ? (
          <p className="text-sm opacity-60 text-center mt-6">
            no posts yet — start the first one 🌱
          </p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-[#1d2d50]/40 border border-[#233a6e] rounded-xl p-4 backdrop-blur-sm hover:bg-[#1d2d50]/60 transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-[#9ecbff]/70">{post.date}</span>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-xs text-[#9ecbff]/60 hover:text-[#d0e1ff]"
                >
                  delete
                </button>
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
