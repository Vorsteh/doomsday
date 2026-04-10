import { Link, useLocation } from "react-router-dom"

export default function Navbar() {
  const { pathname } = useLocation()

  const links = [
    { to: "/", label: "Practice" },
    { to: "/learn", label: "Learn" },
    { to: "/about", label: "About" },
  ]

  return (
    <nav className="flex items-center justify-between px-8 h-16 bg-gray-950 border-b border-white/10 sticky top-0 z-50">
      {/* Brand */}
      <div className="flex items-center gap-3">
        
<div className="w-10 h-10 rounded-full border border-violet-400 flex items-center justify-center text-violet-400 text-sm font-semibold shrink-0">
          % 7
        </div>
        <span className="font-serif text-base text-violet-100 tracking-wide">
          Doomsday
        </span>
        <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">
          by Vorsteh
        </span>
      </div>

      {/* Links */}
      <div className="flex gap-1">
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
    </nav>
  )
}
