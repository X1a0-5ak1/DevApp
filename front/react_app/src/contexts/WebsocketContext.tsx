import { createContext } from "react";
import { io, Socket } from "socket.io-client";

export const socket = io("http://127.0.0.1:3000");
export const WebsocketContext = createContext<Socket>(socket);
export const WebsocketProvider = WebsocketContext.Provider;
