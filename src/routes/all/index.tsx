import { SnippetsPanel } from "@/components/snippets-panel";
import { db } from "@/lib/db";

export const AllSnippets = () => {
  const fetcher = async () => {
    const snippets = db.snippets;
    return await snippets.filter((snippet) => !snippet.inTrash).toArray();
  };
  return (
    <SnippetsPanel folderName="inbox" fetcher={{ fn: fetcher, deps: [] }} />
  );
};
