/* eslint-disable @next/next/no-img-element */
import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { addOnlineUser, removeOnlineUser } from "@/redux/slice/chatSlice";
import { OnlineUsersTypese, MessageTypes } from "@/types/chatTypes";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import clsx from "clsx";

interface SocketContextProps {
  socket: Socket | null;
  isOnline: boolean;
  EmitCustomEvent: (event: string, data: any) => void;
  ListenCustomEvent: (event: string, callback: (data: any) => void) => void;
  CloseCustomEvent: (event: string, callback: (data: any) => void) => void;
}

const SocketContext = createContext<SocketContextProps>({
  socket: null,
  isOnline: false,
  EmitCustomEvent: () => {},
  ListenCustomEvent: () => {},
  CloseCustomEvent: () => {},
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state) => state.auth);
  const [socket, setSocket] = useState<Socket | null>(null);
  const pathanme = usePathname();
  const [isOnline, setIsOnline] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user.isUserAuthenticated) return;

    const newSocket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);

    function onConnect() {
      setIsOnline(true);
      console.log("Socket connected");
    }

    function onDisconnect() {
      setIsOnline(false);
      console.log("Socket disconnected");
    }

    function onOnlineUser(data: OnlineUsersTypese) {
      dispatch(addOnlineUser(data));
    }

    function onOfflineUser(data: OnlineUsersTypese) {
      dispatch(removeOnlineUser(data));
    }

    function AllOnlineUsers(data: OnlineUsersTypese[]) {
      console.log(data);
      data.forEach((user) => {
        dispatch(addOnlineUser(user));
      });
    }

    newSocket.on("onlineUser", onOnlineUser);
    newSocket.on("offlineUser", onOfflineUser);
    newSocket.on("AllOnlineUsers", AllOnlineUsers);

    newSocket.emit("login", user);
    newSocket.on("connect", onConnect);
    newSocket.on("disconnect", onDisconnect);

    newSocket.on("connect_error", (err) => {
      console.log(err.message); //
    });

    // Set the socket instance in state
    setSocket(newSocket);

    // Disconnect the socket when the component unmounts
    return () => {
      newSocket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isUserAuthenticated]);

  useEffect(() => {
    if (socket) {
      const handleMessageReceived = (data: MessageTypes) => {
        if (pathanme !== `/chat`) {
          toast(
            (t) => (
              <div
                className={clsx(
                  "max-w-md w-full   rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5"
                )}
              >
                <div className="flex-1 w-0 py-1 px-3">
                  <div className="flex items-start  ">
                    <div className="flex-shrink-0 pt-0.5">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={data.sender.profilePic}
                        alt={data.sender.fullName}
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-lg font-medium text-gray-900">
                        {data.sender.fullName}
                      </p>
                      <p className=" text-sm text-gray-500">{data.content}</p>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => toast.dismiss(t.id)}
                  className="flex  border-l border-gray-600"
                >
                  <button className="w-full border  border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    Close
                  </button>
                </div>
              </div>
            ),
            {
              duration: 5000,
            }
          );
        }
      };

      socket.on("message received", handleMessageReceived);
      return () => {
        socket.off("message received", handleMessageReceived);
      };
    }
  }, [pathanme, socket, user.isUserAuthenticated]);

  const EmitCustomEvent = (event: string, data: any) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  const ListenCustomEvent = (event: string, callback: (data: any) => void) => {
    if (socket) {
      socket.on(event, callback);
    }
  };

  const CloseCustomEvent = (event: string, callback: (data: any) => void) => {
    if (socket) {
      socket.off(event, callback);
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        isOnline,
        EmitCustomEvent,
        ListenCustomEvent,
        CloseCustomEvent,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return React.useContext(SocketContext);
};
