"use client";

// SocketContext.tsx
import { createContext, useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("SocketContext is not set.");
  }
  return socket;
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const socket = io(process.env.NEXT_PUBLIC_BASE_API_URL!, {
    withCredentials: true,
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
