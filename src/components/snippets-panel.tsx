import { searchQueryAtom, selectedSnippetAtom } from "@/stores";
import { Snippet } from "@/types";
import { useLiveQuery } from "dexie-react-hooks";
import { useSetAtom } from "jotai";
import { PlusIcon, SearchIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { CreateSnippetDialog } from "./create-snippet-dialog";
import { SnippetEditor } from "./snippet-editor";
import { SnippetListItem } from "./snippet-list-item";
import { Button } from "./ui/button";
import { InputBlock, Input } from "./ui/input-block";
import { Separator } from "./ui/separator";
import React from "react";

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
  const setQuery=useSetAtom(searchQueryAtom)

  useEffect(() => {
    setSnippet(null);
  }, []);

  useEffect(() => {
    setSnippet(null);
  }, [params.name]);
  return (
    <div className="flex w-full h-full">
      <div className="w-[320px]  flex flex-col border-r border-r-[#232222]">
        <div className="flex flex-col w-full">
          <InputBlock
            variant={"ghost"}
            leftSection={<SearchIcon size={18} className="mr-1" />}
            rightSection={
              <CreateSnippetDialog folderName={folderName}>
                <Button size={"icon"} variant={"ghost"}>
                  <PlusIcon />
                </Button>
              </CreateSnippetDialog>
            }
          >
            <Input
              placeholder="search"
              onChange={(e) => {
                setQuery(e.target.value)
              }}
            />
          </InputBlock>
          <Separator className="w-full" />
        </div>
        <div className="flex flex-col p-2 gap-3">
          {snippets?.map((snippet) => (
            <React.Fragment key={snippet.id}>
              <SnippetListItem key={snippet.id} snippet={snippet} />
              <Separator />
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="relative h-full w-full">
        <SnippetEditor />
      </div>
    </div>
  );
};
