import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/landingPages/index.jsx";
import Browse from "@brows/index";
import Watch from "@mods/browsePage/watch";
import Register from "./pages/register";
import Login from "./pages/login";
import Favorite from "./pages/favorite";

const router = createBrowserRouter([
  {
    element: <Landing />,
    path: "/",
  },
  {
    element: <Browse />,
    path: "/browse",
  },
  {
    element: <Watch />,
    path: "/watch/:id",
  },
  {
    element: <Register />,
    path: "/register",
  },
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <Favorite />,
    path: "/favorite",
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
