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
    loader: () => {
      if(localStorage.access_token) {
        return null
      }
      return redirect('/login')
    },
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
      {
        path: "/create-profile",
        element: <CreateProfile />,
      },
    ]
  },
  {
    path: "/register",
    element: <Register />,
    loader: () => {
      if(localStorage.access_token) {
        return redirect('/')
      }
      return null
    }
  },
  {
    path: "/login",
    element: <Login/>,
    loader: () => {
      if(localStorage.access_token) {
        return redirect('/')
      }
      return null
    }
  }
]);

export default router;
