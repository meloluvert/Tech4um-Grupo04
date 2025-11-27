"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { ChatRoomData, Message } from "@/types/chat";
import { forumApi } from "@/lib/api/forums";
import { createSocketClient } from "@/lib/sockets";
import { useAuth } from "@/contexts/AuthContext";

type ChatContextType = {
  currentRoom: ChatRoomData | null;
  setRoomFromAPI: (id: string) => Promise<void>;
  sendMessage: (content: string) => void;
  addMessage: (msg: Message) => void;
  selectedUser: { email: string; name: string } | null;
  setSelectedUser: (u: { email: string; name: string } | null) => void;
};

const ChatContext = createContext<ChatContextType>(null!);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<any>(null);
  const [currentRoom, setCurrentRoom] = useState<ChatRoomData | null>(null);
  const [selectedUser, setSelectedUser] = useState<{ email: string; name: string } | null>(null);
  const { token, user } = useAuth();
  useEffect(() => {
    console.log("🔍 CLIENT ATUALIZADO:", client);
  }, [client]);
  
  useEffect(() => {
    console.log("o token", token)
    if (!token) return;

    const stomp = createSocketClient(token);

    stomp.onConnect = () => {
      console.log("🔥 STOMP CONNECTED");
      setClient(stomp);
      console.log("o clinnet é:", client)
    };

    stomp.onStompError = (err) => {
      console.log("❌ STOMP ERROR:", err);
    };

    stomp.activate();

    return () => {
      console.log("🧹 limpando stomp");
      stomp.deactivate(); // ⚠️ NÃO É ASYNC
    };
  }, [token]);
  async function setRoomFromAPI(forumId: string) {
    const forumRes = await forumApi.getById(forumId);
    const msgRes = await forumApi.getMessages(forumId);

    setCurrentRoom({
      id: forumRes.data.id,
      name: forumRes.data.title,
      description: forumRes.data.description,
      creator: forumRes.data.author.username,
      createdAt:  forumRes.data.createdAt,
      messages: msgRes.data.map((m: any) => ({
        forumId,
        content: m.content,
        senderUsername: m.senderUsername,
        createdAt: m.createdAt,
      })),
      participants: [],
      peopleCount: 0,
    });

    if (!client) {
      console.log("⌛ cliente ainda não conectado, esperando...", token);
      return;
    }

    try {
      client.unsubscribe("PUBLIC");
      client.unsubscribe("PRIVATE");
    } catch {}

    console.log("🔔 SUB >> /topic/forum." + forumId);

    client.subscribe(`/topic/forum.${forumId}`, (message) => {
      addMessage(JSON.parse(message.body));
    }, { id: "PUBLIC" });

    client.subscribe(`/user/private`, (message) => {
      addMessage(JSON.parse(message.body));
    }, { id: "PRIVATE" });
  }

  // ============================================================
  // 🔥 ADD MESSAGE
  // ============================================================
  function addMessage(raw: any) {
    const msg: Message = {
      forumId: raw.forumId,
      content: raw.content,
      senderUsername: raw.senderUsername,
      createdAt: raw.createdAt,
      recipientEmail: raw.recipientEmail || null,
    };

    setCurrentRoom(room =>
      room ? { ...room, messages: [...room.messages, msg] } : room
    );
  }

  // ============================================================
  // 🔥 SEND MESSAGE
  // ============================================================
  function sendMessage(content: string) {
    if (!client || !currentRoom) return;
  
    const msg = {
      forumId: currentRoom.id,
      content,
      recipientEmail: selectedUser?.email ?? null
    };
  
    client.publish({
      destination: "/app/chat.send",
      body: JSON.stringify(msg),
    });
  
    addMessage({
      ...msg,
      senderUsername: user?.username ?? "desconhecido",
      createdAt: new Date().toISOString()
    });
  }
  

  return (
    <ChatContext.Provider
      value={{
        currentRoom,
        setRoomFromAPI,
        sendMessage,
        addMessage,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
