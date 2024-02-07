import { useEffect } from "react";
import SocketApi from "../api/socket-api";

export const useConnectSocket = () => {
  const connectSocket = () => {
    SocketApi.createConnection();
  };

  useEffect(() => {
    connectSocket();
  });
};
