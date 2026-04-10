
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

export default function Layout() {
  
/*
<div
  className="min-h-screen text-gray-100"
  style={{
    background: "#0a0a0f",
    backgroundImage: `
      radial-gradient(ellipse 80% 50% at 50% -10%, rgba(109,40,217,0.12) 0%, transparent 60%),
      linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
    `,
    backgroundSize: "100% 100%, 40px 40px, 40px 40px",
  }}
>
*/

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 bg-[radial-gradient(ellipse_80%_40%_at_50%_-5%,rgba(109,40,217,0.15),transparent)]">
      <Navbar />
      <main className="max-w-3xl mx-auto px-8 py-12">
        <Outlet />
      </main>
    </div>
  )

}

