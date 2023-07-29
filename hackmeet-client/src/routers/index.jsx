import { createBrowserRouter, redirect } from "react-router-dom";
import App from "../App";
import Lobby from "../views/Lobby";
import Leaderboard from "../views/Leaderboard";
import Battle from "../views/Battle";
import Register from "../views/Register";
import Login from "../views/Login";
import CreateProfile from "../views/CreateProfile";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        loader: () => {
          return redirect("/lobby");
        },
      },
      {
        path: "/lobby",
        element: <Lobby />,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "/battle/:username",
        element: <Battle />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/create-profile",
        element: <CreateProfile />,
      },
    ],
  },
]);

export default router;
