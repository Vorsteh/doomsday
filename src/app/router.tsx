import { createBrowserRouter } from "react-router-dom"
import Layout from "../components/Layout"
import PracticePage from "../pages/Practice/PracticePage"
import LearnPage from "../pages/Learn/LearnPage"
import AboutPage from "../pages/About/AboutPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <PracticePage /> },
      { path: "learn", element: <LearnPage /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
])
