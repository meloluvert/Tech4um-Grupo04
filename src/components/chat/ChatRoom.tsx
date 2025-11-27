"use client";

import { useState } from "react";
import { InputChat } from "./InputChat";
import { useChat } from "@/contexts/ChatContext";
import { useAuth } from "@/contexts/AuthContext";

export function ChatRoom({ className }: { className?: string }) {
  const { currentRoom, sendMessage } = useChat();
  const { user } = useAuth();

  const [input, setInput] = useState("");

  if (!currentRoom) return null;

  function handleSend() {
    if (!input.trim()) return;
    
    sendMessage(input);

    setInput("");
  }

  return (
    <div
      className={`flex flex-col justify-between flex-1 rounded-2xl shadow ${className}`}
    >
      {/* HEADER */}
      <header className="flex justify-between items-center mb-4 p-5">
        <p className="text-xl font-bold text-[#1772B2]">
          {currentRoom.name}
        </p>
        <div>

        <span className="text-sm text-gray-500">
          Criado por: {currentRoom.creator}
        </span>
        <span className="text-sm text-gray-500">
          desde por: {currentRoom.createdAt as String}
        </span>
        </div>
      </header>

      <div className="flex flex-col gap-4 overflow-auto h-[60vh] p-5">
        {currentRoom.messages.map((msg) => (
          <div className="flex gap-3 items-start">

            <div className="grow">
              <p className="font-semibold text-sm">{msg.senderUsername}</p>
              <p className="text-gray-700">{msg.content}</p>
              <span className="text-[10px] text-gray-400">
                {/*new Date(msg.createdAt).toLocaleTimeString()*/}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <InputChat
        input={input}
        setInput={setInput}
        handleSend={handleSend}
      />
    </div>
  );
}
