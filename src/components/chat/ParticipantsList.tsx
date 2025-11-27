"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { useChat } from "@/contexts/ChatContext"
import { Avatar } from "./Avatar";
type ParticipantsListProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function ParticipantsList({ className = "", ...props }:ParticipantsListProps) {
  const {  setSelectedUser, currentRoom } = useChat();

  if (!currentRoom)
    return <></>;

  return (
    <div className={`bg-white roCould not parse module '[project]/src/components/chat/ParticipantsList.tsx'
    unded-2xl p-4 w-full md:w-64 shadow ${className}`}
    {...props}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-[#1772B2]">Participantes</h2>
        <Search size={18} className="text-gray-500" />
      </div>

      <div className="flex flex-col gap-3">
        {participants && participants.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedUser(p)}
            className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg"
          >
            <Avatar
                src={p.avatarUrl}
                alt={p.name}
              size={40}
            />

            <div className="flex flex-col text-left">
              <span className="text-sm font-medium">{p.name}</span>
              <span
                className={`text-xs ${
                  p.online ? "text-green-600" : "text-gray-400"
                }`}
              >
                {p.online ? "online" : "offline"}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
