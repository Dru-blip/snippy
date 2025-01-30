import { SnippetsPanel } from "@/components/snippets-panel";
import { db } from "@/lib/db";
import { useParams } from "react-router";

export const FolderPage = () => {
  const params = useParams();
  const fetcher = async () => {
    const snippets = await db.snippets
      .where("folderName")
      .equals(params.name!)
      .filter((snippet) => !snippet.inTrash)
      .toArray();
    return snippets;
  };
  return (
    <SnippetsPanel
      folderName={params.name!}
      fetcher={{ fn: fetcher, deps: [params.name!] }}
    />
  );
};
