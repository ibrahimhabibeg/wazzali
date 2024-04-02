import { createContext } from "react";
import type { JSX } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext({
  socket: io(),
});

export const SocketProvider = ({ children }: { children: JSX.Element }) => {
  const url = process.env.EXPO_PUBLIC_BACKEND_WEBSOCKET_URL || "";
  const socket = io(url);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
