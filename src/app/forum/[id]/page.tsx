"use client";

import { ParticipantsList } from "@/components/chat/ParticipantsList";
import { ChatRoom } from "@/components/chat/ChatRoom";
import { ArrowLeft } from "lucide-react";
import { RoomsSidebar } from "@/components/chat/RoomsSidebar";
import Link from "next/link";

import { useParams } from "next/navigation";
import { useChat } from "@/contexts/ChatContext";
import { useEffect, useState } from "react";
import { forumApi } from "@/lib/api/forums";

export default function ChatPage() {
  const { id } = useParams();
  const { setRoomFromAPI, currentRoom } = useChat();

  const [rooms, setRooms] = useState([]);

  // Carregar a lista de fóruns só para exibir no sidebar
  useEffect(() => {
    async function loadRooms() {
      const res = await forumApi.getForums();
      setRooms(res.data);
    }
    loadRooms();
  }, []);

  // Carregar dados do fórum específico e mensagens
  useEffect(() => {
    if (id) setRoomFromAPI(id as string);
  }, [id]);


  // Enquanto carrega
  if (!currentRoom) {
    return (
      <div className="flex flex-col items-start mt-5 w-full">
        <Link className="text-gray-500 w-full flex" href="/">
          <ArrowLeft color="#6a7282" />
          <span>Voltar ao dashboard</span>
        </Link>

        <p className="mt-10 text-gray-500">Carregando fórum...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start mt-5 w-full">
      <Link className="text-gray-500 w-full flex" href="/">
        <ArrowLeft color="#6a7282" />
        <span>Voltar ao dashboard</span>
      </Link>

      <main className="flex flex-col gap-4 w-full md:flex-row">

        {/* Lista de participantes do fórum atual */}
        {/* <ParticipantsList className="order-1" /> */}

        {/* Chat / mensagens / input */}
        <ChatRoom className="order-3 md:order-2" />

        {/* Sidebar com todos os fóruns */}
        <RoomsSidebar rooms={rooms} className="order-2 md:order-3" />

      </main>
    </div>
  );
}
