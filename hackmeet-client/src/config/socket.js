import { io } from "socket.io-client";
const socket = io("http://localhost:3000")

// io('https://hackmeet.kresnativ8.site')
// io('http://localhost:3000')
export default socket