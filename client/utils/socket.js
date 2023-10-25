import { io } from "socket.io-client";
const socket = io.connect("http://DESKTOP-6H1N0B7:8080");
export default socket;