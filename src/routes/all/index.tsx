import { SnippetsPanel } from "@/components/snippets-panel";
import { db } from "@/lib/db";
import { searchQueryAtom } from "@/stores";
import { useAtomValue } from "jotai";

export const AllSnippets = () => {
  const query = useAtomValue(searchQueryAtom);

  const fetcher = async () => {
    const snippets = db.snippets
      .filter((snippet) => !snippet.inTrash)
      .and((snippet) =>
        snippet.name.toLowerCase().includes(query.toLowerCase())
      );
    return await snippets.toArray();
  };
  return (
    <SnippetsPanel folderName="inbox" fetcher={{ fn: fetcher, deps: [query] }} />
  );
};
