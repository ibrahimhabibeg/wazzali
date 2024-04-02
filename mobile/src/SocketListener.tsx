import type { JSX } from "react";
import { createContext, useEffect } from "react";
import { io } from "socket.io-client";
import socket from "./socket";
import { Team, User } from "./types";
import useStore from "./useStore";

export const SocketContext = createContext({
  socket: io()
});

export const SocketListener = ({ children }: { children: JSX.Element }) => {
  const setTeam = useStore(state => state.setTeam);
  const setMe = useStore(state => state.setMe);

  useEffect(() => {
    socket.on("data", (team: Team) => setTeam(team));
    socket.on("me", (me: User) => setMe(me));
    return () => {
      socket.off("data", (team: Team) => setTeam(team));
      socket.off("me", (me: User) => setMe(me));
    };
  }, []);

  return children;
};
