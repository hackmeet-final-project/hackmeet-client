import { createBrowserRouter, redirect } from "react-router-dom";
import App from "../App";
import Lobby from "../views/Lobby";
import Leaderboard from "../views/Leaderboard";
import Battle from "../views/Battle";
import BattleSandpack from "../views/BattleSandpack";

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
        path: "/battle",
        element: <Battle />,
      },
      // {
      //   path: "/battleSand",
      //   element: <BattleSandpack />,
      // },
    ],
  },
]);

export default router;
