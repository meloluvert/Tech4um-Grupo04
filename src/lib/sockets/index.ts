import { Client } from "@stomp/stompjs";

export function createSocketClient(token: string) {
  return new Client({
    webSocketFactory: () => new WebSocket("ws://localhost:8080/ws"),

    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },

    debug: (msg) => console.log("[STOMP] " + msg),
    reconnectDelay: 5000,
  });
}
