import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import { HiMenu } from "react-icons/hi";

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  const links = [
    { to: "/practice", label: "Practice" },
    { to: "/learn", label: "Learn" },
    { to: "/about", label: "About" },
  ]

  return (
    <nav className="bg-gray-950 border-b border-white/10 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-8 h-16">
        
        {/* Brand */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-violet-400 flex items-center justify-center text-violet-400 text-sm font-semibold shrink-0">
            % 7
          </div>

          <Link
            to="/"
            className="font-serif text-sm sm:text-base text-violet-100 tracking-wide"
          >
            Doomsday
          </Link>

          <span className="hidden sm:block font-mono text-xs text-gray-500 tracking-widest uppercase">
            by Vorsteh
          </span>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex gap-1">
          {links.map(({ to, label }) => {
            const active = pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`px-4 py-1.5 rounded-md text-sm tracking-wide transition-all duration-150 border ${
                  active
                    ? "text-violet-300 bg-violet-500/10 border-violet-500/30 font-medium"
                    : "text-gray-400 bg-transparent border-transparent hover:text-gray-200 hover:bg-white/5"
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Mobile Menu */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-300 hover:text-white"
        >
          {open ? "✕" : <HiMenu />}
        </button>
      </div>

      {/* Mobile */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2">
          {links.map(({ to, label }) => {
            const active = pathname === to
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 rounded-md text-sm tracking-wide transition-all duration-150 border ${
                  active
                    ? "text-violet-300 bg-violet-500/10 border-violet-500/30 font-medium"
                    : "text-gray-400 bg-transparent border-transparent hover:text-gray-200 hover:bg-white/5"
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}

