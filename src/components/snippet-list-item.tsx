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
import { TrashIcon, Undo2Icon } from "lucide-react";
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
              : "bg-secondary text-primary"
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
            <p className="text-xs text-gray-100">{snippet.folderName}</p>
            <p className="text-xs text-gray-100">{format(snippet.createdAt, "Pp")}</p>
          </div>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-32">
        {snippet.inTrash ? (
          <ContextMenuItem
            className="w-full flex items-center justify-between"
            onClick={async () => {
              try {
                await db.snippets.update(snippet.id, { inTrash: 0 });
              } catch (error) {
                // toast.error("error deleting snippet");
              }
            }}
          >
            <Undo2Icon size={16} />
            Restore
          </ContextMenuItem>
        ) : (
          <ContextMenuItem
            className="w-full flex items-center justify-between"
            onClick={async () => {
              try {
                await db.snippets.update(snippet.id, { inTrash: 1 });
              } catch (error) {
                toast.error("error deleting snippet");
              }
            }}
          >
            <TrashIcon size={16} />
            Delete
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};
