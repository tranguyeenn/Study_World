import { motion } from "framer-motion";
import React from "react";
import { Sparkles } from "lucide-react"; // optional icon

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#0a1128] via-[#1d2d50] to-[#0f1a3d] text-[#d0e1ff] relative">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(62,125,255,0.15),_transparent_70%)] pointer-events-none" />

      {/* floating sparkles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-[#9ecbff]/20 rounded-full"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: ["0%", "-40%", "0%"],
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

      {/* central avatar */}
      <motion.div
        className="rounded-full bg-[#1d2d50]/70 border border-[#233a6e] w-36 h-36 flex items-center justify-center shadow-[0_0_20px_rgba(62,125,255,0.3)]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Sparkles className="text-[#9ecbff]" size={40} />
      </motion.div>

      {/* status message */}
      <motion.p
        className="mt-8 text-[#b8cfff]/80 italic text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        “system idle. awaiting chaos...”
      </motion.p>

      {/* footer */}
      <motion.p
        className="absolute bottom-6 text-xs text-[#9ecbff]/60 tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        © {new Date().getFullYear()} studyworld os. built by tired students.
      </motion.p>
    </div>
  );
}
