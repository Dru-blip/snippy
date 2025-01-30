import { SnippetsPanel } from "@/components/snippets-panel";
import { db } from "@/lib/db";

export const Favorites = () => {
  const fetcher = async () => {
    const snippets = db.snippets
      .where("favorite")
      .equals(1)
      .and((snippet) => !snippet.inTrash);
    return await snippets.toArray();
  };
  return (
    <SnippetsPanel folderName="inbox" fetcher={{ fn: fetcher, deps: [] }} />
  );
};
