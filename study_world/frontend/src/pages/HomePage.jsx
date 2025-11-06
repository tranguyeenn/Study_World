import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-[#0a1128] via-[#1d2d50] to-[#0f1a3d] text-[#d0e1ff]">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(62,125,255,0.15),_transparent_70%)]" />

      {/* animated title */}
      <motion.h1
        className="text-6xl font-bold text-[#9ecbff] tracking-tight drop-shadow-[0_0_20px_rgba(62,125,255,0.4)] mb-4 text-glow"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        StudyWorld
      </motion.h1>

      {/* subtle tagline */}
      <motion.p
        className="text-lg text-[#b8cfff]/90 italic mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        booting a slower, quieter internet.
      </motion.p>

      {/* login / signup buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 rounded-xl bg-[#1d2d50]/60 border border-[#233a6e] text-[#d0e1ff]
            font-medium hover:bg-[#233a6e]/70 hover:text-[#9ecbff] transition-all backdrop-blur-sm
            shadow-[0_0_20px_rgba(62,125,255,0.2)] active:scale-[0.97]"
        >
          sign in
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-2 rounded-xl bg-[#1d2d50]/60 border border-[#233a6e] text-[#d0e1ff]
            font-medium hover:bg-[#233a6e]/70 hover:text-[#9ecbff] transition-all backdrop-blur-sm
            shadow-[0_0_20px_rgba(62,125,255,0.2)] active:scale-[0.97]"
        >
          create account
        </button>
      </motion.div>

      {/* floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-[#9ecbff]/30 rounded-full"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: ["0%", "-30%", "0%"],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* footer */}
      <motion.p
        className="absolute bottom-6 text-xs text-[#9ecbff]/60 tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        © {new Date().getFullYear()} studyworld. built by tired students.
      </motion.p>
    </div>
  );
}