import { createBrowserRouter, redirect } from "react-router-dom";
import App from "../App";
import Lobby from "../views/Lobby";
import Leaderboard from '../views/Leaderboard'
import Battle from '../views/Battle'

const router = createBrowserRouter([
    {
        element: <App/>,
        children: [
            {
                path: '/',
                loader: () => {
                   return redirect('/lobby')
                }
            },
            {
                path: '/lobby',
                element: <Lobby/>
            },
            {
                path: '/leaderboard',
                element: <Leaderboard/>
            },
            {
                path: '/battle',
                element: <Battle/>
            },
        ]
    }
])

export default router