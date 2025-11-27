import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ForumCard({
  id,
  title,
  description,
  author,
  createdAt,
  size = "lg",       
  highlight = false, 
  people = 0,       
}: any) {
  const baseStyle =
    "rounded-2xl border border-gray-200 p-5 flex flex-col justify-between bg-white shadow-sm transition hover:scale-101";

  const sizeStyle =
    size === "lg"
      ? "md:col-span-2 row-span-2"
      : size === "md"
      ? "md:col-span-2"
      : "md:col-span-1";

  const date = createdAt ? new Date(createdAt) : null;

  const creator = author?.username ?? "Desconhecido";

  return (
    <div className={`${baseStyle} ${sizeStyle}`}>
      <Link href={`/forum/${id}`}>
        <div className="flex flex-col gap-1">
          {highlight && (
            <span className="text-[#EB520E] text-sm font-semibold">
              Tópico em destaque!
            </span>
          )}

          <h2 className="text-[#1772B2] text-xl font-bold">{title}</h2>

          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        </div>

        <div className="flex justify-between mt-3">
          <span className="text-xs text-gray-500">
            Criado por: {creator}
          </span>

          <Button className="bg-[#1772B2] hover:bg-[#145a8a] text-white rounded-full px-4 py-1 text-sm">
            +{people}
          </Button>
        </div>

        {date && (
          <span className="text-xs text-gray-400 mt-1 block">
            {date.toLocaleDateString("pt-BR")}
          </span>
        )}
      </Link>
    </div>
  );
}
