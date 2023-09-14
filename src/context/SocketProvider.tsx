"use client";
import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "@/redux/hooks";

interface SocketContextProps {
  socket: Socket;
  isOnline: boolean;
  EmitCustomEvent: (event: string, data: any) => void;
  ListenCustomEvent: (event: string, callback: any) => void;
}

const SocketContext = createContext<SocketContextProps>(
  {} as SocketContextProps
);

let socket: Socket;

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state) => state.auth);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    console.log(socket);
    if (!user.isUserAuthenticated) return;

    socket = io("https://cinemaaapi-dev.fl0.io");

    function onConnect() {
      setIsOnline(true);
      console.log(socket);
      console.log("Socket connected");
    }

    function onDisconnect() {
      setIsOnline(false);
      console.log("Socket disconnected");
    }

    socket.emit("setup", user);

    socket.on("connect", onConnect);

    socket.on("disconnect", onDisconnect);

    socket.on("connect_error", (err) => {
      console.log(err.message); // not authorized
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isUserAuthenticated]);

  const EmitCustomEvent = (event: string, data: any) => {
    socket.emit(event, data);
  };

  const ListenCustomEvent = (event: string, callback: any) => {
    socket.on(event, callback);
  };

  return (
    <SocketContext.Provider
      value={{ socket, isOnline, EmitCustomEvent, ListenCustomEvent }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return React.useContext(SocketContext);
};
