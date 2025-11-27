"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
import { forumApi } from "@/lib/api/forums";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type CreateForumModalProps = {
  children: React.ReactNode;
};

export default function CreateForumModal({ children }: CreateForumModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleCreate() {
    if (!title.trim()) {
      toast.error("O fórum precisa ter um título!");
      return;
    }

    try {
      setLoading(true);

      const response = await forumApi.create({ title, description });
    console.log(response)
      toast.success("Fórum criado com sucesso!");
      router.push(`forum/${response.data.id}`);

      setTitle("");
      setDescription("");
    } catch (err: any) {
      console.error(err);
      toast.error("Erro ao criar fórum.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-[#1772B2]">Criar novo fórum</DialogTitle>
          <DialogDescription className="text-gray-600">
            Dê um título e uma breve descrição.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          <div>
            <label className="text-sm font-medium">Título</label>
            <Input
              placeholder="Nome do fórum"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Descrição</label>
            <Textarea
              placeholder="Descrição breve..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </div>

          <DialogClose asChild>
            <Button
              onClick={handleCreate}
              style={{ backgroundColor: "#1772B2" }}
              className="text-white hover:opacity-90 flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Criando...
                </>
              ) : (
                "Criar Fórum"
              )}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
