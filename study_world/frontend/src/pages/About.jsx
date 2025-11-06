import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0a1128] via-[#1d2d50] to-[#0f1a3d] text-[#d0e1ff] text-center px-6 py-20 relative overflow-hidden">
      {/* faint background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,_rgba(96,165,250,0.08),_transparent_70%)]" />

      {/* title */}
      <motion.h1
        className="text-5xl font-bold mb-6 text-[#9ecbff] tracking-tight text-glow"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        StudyWorld
      </motion.h1>

      {/* tagline */}
      <motion.p
        className="text-lg text-[#c5d9ff]/90 max-w-2xl mb-12 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        built by sleep-deprived students who wanted learning to feel gentle again.
      </motion.p>

      {/* content */}
      <motion.div
        className="max-w-2xl text-[#d0e1ff]/90 leading-relaxed text-base space-y-10 text-left md:text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <section>
          <h2 className="text-xl font-medium text-[#9ecbff] mb-2">what it is</h2>
          <p>
            StudyWorld is a tiny corner of the internet that treats focus like
            a game instead of a punishment. you start a session, get coins for
            actually showing up, and feed your digital plant-thing or pet so it
            doesn’t hate you. over time your space grows — slow, quiet, yours.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-[#9ecbff] mb-2">how it works</h2>
          <p>
            press start. breathe. do your thing. StudyWorld tracks the time and
            drops coins when you finish. you can spend them on small upgrades,
            tiny decorations, or just to pretend you have your life together.
            between study streaks, you can play short word games that reset your
            brain without feeding your doomscroll habit.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-[#9ecbff] mb-2">why we made it</h2>
          <p>
            the internet turned learning into a leaderboard. we missed the part
            where curiosity was allowed to be slow. StudyWorld isn’t about
            grinding — it’s about showing up, even if all you did was stare at
            a paragraph for twenty minutes and finally get it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-[#9ecbff] mb-2">who built it</h2>
          <p>
            a few students with questionable sleep schedules, too much coffee,
            and a need to build something soft in a loud world. we’re not a
            startup. just people who wanted a place to log off without leaving.
          </p>
        </section>
      </motion.div>

      {/* back button */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Link
          to="/home"
          className="flex items-center gap-2 bg-[#1d2d50]/60 border border-[#233a6e] text-[#d0e1ff] font-medium px-6 py-2 rounded-xl hover:bg-[#233a6e]/70 transition-all backdrop-blur-sm"
        >
          <span className="text-[#9ecbff]">←</span> back to the world
        </Link>
      </motion.div>
    </div>
  );
}