import { Snippet } from "@/types";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { db } from "@/lib/db";
import { AddToFavorite } from "./add-to-favorites";

interface Props {
  snippet: Snippet;
}

export const SnippetEditorHeader = ({ snippet }: Props) => {
  const [toggle, setToggle] = useState<boolean>(false);
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
      {toggle ? (
        <Input
          className="w-[300px]"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === "Escape") {
              changeName();
              setToggle(false);
              event.preventDefault();
              event.stopPropagation();
            }
          }}
        />
      ) : (
        <p
          className="underline"
          onClick={() => {
            setToggle(true);
          }}
        >
          {name}
        </p>
      )}
      <div className="flex items-center">
        <AddToFavorite />
        <p>{format(snippet.createdAt, "Pp")}</p>
      </div>
    </div>
  );
};
