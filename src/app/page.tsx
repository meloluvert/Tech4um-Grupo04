"use client";

import { ForumCard } from "@/components/ForumCard";
import { SearchBar } from "@/components/SearchBar";
import { forumApi } from "@/lib/api/forums";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [forums, setForums] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Carrega fóruns
  useEffect(() => {
    async function load() {
      const res = await forumApi.getForums();
      setForums(res.data);
      setFiltered(res.data);
    }
    load();
  }, []);

  // Função chamada pela SearchBar
  function handleSearch(query: string) {
    const q = query.toLowerCase();

    const result = forums.filter((f: any) =>
      f.title.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q)
    );

    setFiltered(result);
  }

  return (
    <main className="w-6xl">
      <h1 className="text-3xl font-bold mt-10">Opa!</h1>
      <p className="text-gray-600 mt-1">Sobre o que gostaria de falar hoje?</p>

      <SearchBar onSearch={handleSearch} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10 auto-rows-min">
        {filtered.map((forum: any) => (
          <ForumCard
            key={forum.id}
            {...forum}
            size="md"         // padrão
            highlight={false} 
            people={0}
          />
        ))}
      </div>
    </main>
  );
}
