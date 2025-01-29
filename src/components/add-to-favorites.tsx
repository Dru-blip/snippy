import { db } from "@/lib/db";
import { selectedSnippetAtom } from "@/stores";
import { useAtomValue } from "jotai";
import { StarIcon, StarOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const AddToFavorite = () => {
  const selectedSnippet = useAtomValue(selectedSnippetAtom);
  const [favorite, setFavorite] = useState<0 | 1>(selectedSnippet?.favorite!);
  useEffect(() => {
    setFavorite(selectedSnippet?.favorite!);
  }, [selectedSnippet]);
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={async () => {
        try {
          await db.snippets.update(selectedSnippet?.id!, {
            favorite: favorite === 1 ? 0 : 1,
          });
          setFavorite(favorite === 1 ? 0 : 1);
        } catch (error) {}
      }}
    >
      {favorite === 1 ? <StarOffIcon /> : <StarIcon />}
    </Button>
  );
};
