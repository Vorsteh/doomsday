
import { Link } from "react-router-dom"

import { FaGithub } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-5xl sm:text-6xl font-serif text-violet-100 tracking-wide mb-6">
        Doomsday
      </h1>

      <p className="max-w-xl text-gray-400 text-sm sm:text-base mb-10 leading-relaxed">
        An open-source tool to learn and practice{" "}
        <span className="text-violet-300">
          Conway's Doomsday Algorithm
        </span>.
        Improve your mental math and calculate weekdays instantly.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/learn"
          className="px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm tracking-wide transition"
        >
          Start Learning
        </Link>

        <Link
          to="/practice"
          className="px-6 py-3 rounded-lg border border-violet-500/40 text-violet-300 hover:bg-violet-500/10 text-sm tracking-wide transition"
        >
          Start Practicing
        </Link>

        <a
          href="https://github.com/vorsteh/doomsday"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 text-sm tracking-wide transition"
        >
          <FaGithub className="text-lg" />
          <span>GitHub</span>
        </a>

      </div>

    </div>
  )
}

