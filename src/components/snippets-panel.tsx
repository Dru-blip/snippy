import { selectedSnippetAtom } from "@/stores";
import { Snippet } from "@/types";
import { useLiveQuery } from "dexie-react-hooks";
import { useSetAtom } from "jotai";
import { PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { CreateSnippetDialog } from "./create-snippet-dialog";
import { SnippetEditor } from "./snippet-editor";
import { SnippetListItem } from "./snippet-list-item"
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Props {
  folderName: string;
  fetcher: {
    fn: () => Promise<Snippet[]>;
    deps: string[];
  };
}

export const SnippetsPanel = ({ folderName, fetcher }: Props) => {
  const snippets = useLiveQuery(fetcher?.fn!, fetcher?.deps);
  const setSnippet = useSetAtom(selectedSnippetAtom);
  const params = useParams();

  useEffect(() => {
    setSnippet(null);
  }, []);

  useEffect(() => {
    setSnippet(null);
  }, [params.name]);
  return (
    <div className="flex w-full h-full">
      <div className="w-[320px] p-2 flex flex-col border-r border-r-[#232222]">
        <div className="flex items-center space-x-2">
          <Input placeholder="search" />
          <CreateSnippetDialog folderName={folderName}>
            <Button size={"icon"} variant={"ghost"}>
              <PlusIcon />
            </Button>
          </CreateSnippetDialog>
        </div>
        <div className="flex flex-col p-1 gap-3">
          {snippets?.map((snippet) => (
            <SnippetListItem key={snippet.id} snippet={snippet} />
          ))}
        </div>
      </div>
      <div className="relative h-full w-full">
        <SnippetEditor />
      </div>
    </div>
  );
};
