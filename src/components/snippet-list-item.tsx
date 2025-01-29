import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { db } from "@/lib/db";
import { selectedSnippetAtom } from "@/stores";
import { Snippet } from "@/types";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { Card } from "./ui/card";

interface Props {
  snippet: Snippet;
}

export const SnippetListItem = ({ snippet }: Props) => {
  const [selectedSnippet, setSnippet] = useAtom(selectedSnippetAtom);
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Card
          className={`flex flex-col p-2 gap-4  rounded transform transition-transform duration-300 active:scale-90 ${
            selectedSnippet?.id !== snippet.id
              ? "hover:bg-secondary"
              : "bg-secondary"
          }`}
          onClick={() => {
            setSnippet(snippet);
          }}
        >
          <div className="flex items-center justify-between">
            <p className="font-semibold">{snippet.name}</p>
            {/* <AddToFavorite /> */}
          </div>
          <div className="flex justify-between">
            <p className="text-xs">{snippet.folderName}</p>
            <p className="text-xs">{format(snippet.createdAt, "Pp")}</p>
          </div>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          className="w-full flex items-center justify-between"
          onClick={async () => {
            try {
              await db.snippets.delete(snippet.id);
            } catch (error) {
              toast.error("error deleting snippet");
            }
          }}
        >
          <TrashIcon size={16} />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
