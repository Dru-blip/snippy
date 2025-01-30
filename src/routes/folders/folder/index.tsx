import { SnippetsPanel } from "@/components/snippets-panel";
import { db } from "@/lib/db";
import { searchQueryAtom } from "@/stores";
import { useAtomValue } from "jotai";
import { useParams } from "react-router";

export const FolderPage = () => {
  const params = useParams();
  const query = useAtomValue(searchQueryAtom);

  const fetcher = async () => {
    const snippets = await db.snippets
      .where("folderName")
      .equals(params.name!)
      .and((snippet) => !snippet.inTrash)
      .and((snippet) =>
        snippet.name.toLowerCase().includes(query.toLowerCase())
      )
      .toArray();
    return snippets;
  };
  return (
    <SnippetsPanel
      folderName={params.name!}
      fetcher={{ fn: fetcher, deps: [params.name!,query] }}
    />
  );
};
