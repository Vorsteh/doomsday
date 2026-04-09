import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="flex gap-6 p-4 bg-gray-800">
      <Link to="/" className="hover:text-blue-400">Practice</Link>
      <Link to="/learn" className="hover:text-blue-400">Learn</Link>
      <Link to="/about" className="hover:text-blue-400">About</Link>
    </nav>
  )
}
