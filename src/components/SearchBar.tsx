"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateForumModal from "@/components/CreateForumModal";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export function SearchBar({ onSearch }: { onSearch: (value: string) => void }) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
    onSearch(query);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex gap-3 items-center mt-6"
    >
      <div className="relative flex-1 items-center flex flex-row rounded-xl border border-gray-300 ">
        <input
          type="text"
          placeholder="Em busca de uma sala? Encontre-a aqui!"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value); // busca em tempo real
          }}
          className="grow block px-3 focus:outline-0 focus:border-0 focus:bg-blue-300 transition h-10 rounded-xl rounded-r-none"
        />
        <Button
          type="submit"
          className="bg-[#1772B2] hover:bg-[#145a8a] text-white rounded-r-xl rounded-l-none px-4 py-2 hidden md:flex"
        >
          <ArrowRight />
        </Button>
      </div>

      {/* Mobile + Desktop */}
      <CreateForumModal>
        <Button className="bg-[#1772B2] hover:bg-[#145a8a] text-white rounded-xl px-4 py-2 sm:hidden">
          +
        </Button>
      </CreateForumModal>

      <CreateForumModal>
        <Button className="bg-[#1772B2] hover:bg-[#145a8a] text-white rounded-xl px-4 py-2 hidden sm:flex">
          Crie seu fórum
        </Button>
      </CreateForumModal>
    </form>
  );
}
