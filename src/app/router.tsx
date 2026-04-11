import { createBrowserRouter } from "react-router-dom"
import Layout from "../components/Layout"
import PracticePage from "../pages/Practice/PracticePage"
import LearnPage from "../pages/Learn/LearnPage"
import AboutPage from "../pages/About/AboutPage"
import HomePage from "../pages/HomePage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "practice", element: <PracticePage /> },
      { path: "learn", element: <LearnPage /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
])
