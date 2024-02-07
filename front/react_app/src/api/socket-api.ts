import io, { Socket } from "socket.io-client";

export default class SocketApi {
  static socket: null | Socket = null;

  static createConnection() {
    this.socket = io("http://127.0.0.1:3000/");

    this.socket.on("connect", () => {
      console.log("connected");
    });

    this.socket.on("disconnect", () => {
      console.log("disconnected");
    });
  }
}
