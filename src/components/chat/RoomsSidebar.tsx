"use client";

import { useChat } from "@/contexts/ChatContext";
import Link from "next/link"

type RoomsSidebarProps = {
  className?: string;
  rooms?: any
} & React.HTMLAttributes<HTMLDivElement>;
export function RoomsSidebar({ rooms, className }: RoomsSidebarProps) {
  const { currentRoom, setRoomById } = useChat();

  return (
    <div className={`bg-white rounded-2xl p-4 w-full md:w-64 shadow ${className}`}>
      <h2 className="font-semibold text-[#1772B2] ">Salas</h2>
      {!currentRoom && <p className="text-left text-gray-500 text-sm">Selecione um chat</p>}

      <div className="flex flex-col gap-2 mt-4">
        {rooms.map((r: any) => (
          <Link
            key={r.id}
            href={`/forum/${r.id}`}
            onClick={() => setRoomById(r.id)}
            className={`p-3 rounded-xl text-left transition ${
              currentRoom?.id === r.id
                ? "bg-[#145a8a] text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
             <p className={`font-semibold ${
              currentRoom?.id === r.id ? "text-white" : "text-blue-600"
             }`}>{r.title}</p>
            <span className={`text-xs  ${
              currentRoom?.id === r.id ? "text-white" : "text-gray-500"
            }`}>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
