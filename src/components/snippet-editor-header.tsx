import { db } from "@/lib/db";
import { Snippet } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AddToFavorite } from "./add-to-favorites";
import { Input, InputBlock } from "./ui/input-block";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";

interface Props {
  snippet: Snippet;
}

export const SnippetEditorHeader = ({ snippet }: Props) => {
  const [name, setName] = useState<string>();

  const changeName = async () => {
    try {
      await db.snippets.update(snippet.id, { name });
    } catch (error) {
      toast.error("Error occurred changing name");
    }
  };

  useEffect(() => {
    setName(snippet.name);
  }, [snippet]);
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b flex-none">
      <InputBlock className="w-[300px]" variant={"ghost"}>
        <Input
          className="w-[300px]"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === "Escape") {
              changeName();
              event.preventDefault();
              event.stopPropagation();
            }
          }}
        />
      </InputBlock>
      <div className="flex items-center">
        <AddToFavorite />
      </div>
    </div>
  );
};
