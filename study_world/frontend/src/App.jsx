import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext";
import Desktop from "./components/layout/Desktop";

// === Pages ===
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage"; // ← add this
import Home from "./pages/Home";
import About from "./pages/About";
import StudyPage from "./pages/StudyPage";
import ShopPage from "./pages/ShopPage";
import CommPage from "./pages/CommPage";
import InventoryPage from "./pages/InventoryPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import GamesPage from "./pages/GamesPage";
import GardenPage from "./pages/GardenPage";
import ProfilePage from "./pages/ProfilePage";
import TypingPage from "./pages/games/TypingPage";
import WordlePage from "./pages/games/WordlePage";
import MathPage from "./pages/games/MathPage";


const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> }, // ← add this route
  { path: "/home", element: <Desktop><Home /></Desktop> },
  { path: "/about", element: <Desktop><About /></Desktop> },
  { path: "/study", element: <Desktop><StudyPage /></Desktop> },
  { path: "/shop", element: <Desktop><ShopPage /></Desktop> },
  { path: "/inventory", element: <Desktop><InventoryPage /></Desktop> },
  { path: "/leaderboard", element: <Desktop><LeaderboardPage /></Desktop> },
  { path: "/comm", element: <Desktop><CommPage/></Desktop> },
  { path: "/garden", element: <Desktop><GardenPage /></Desktop> },
  { path: "/profile", element: <Desktop><ProfilePage /></Desktop> },
  { path: "/games", element: <Desktop><GamesPage /></Desktop> },
  { path: "/games/typing", element: <Desktop><TypingPage /></Desktop> },
  { path: "/games/wordle", element: <Desktop><WordlePage /></Desktop> },
  { path: "/games/math", element: <Desktop><MathPage /></Desktop> },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

export default function App() {
  return (
    <NotificationProvider>
      <RouterProvider router={router} />
    </NotificationProvider>
  );
}
