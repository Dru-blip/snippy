import { SnippetsPanel } from "@/components/snippets-panel";
import { db } from "@/lib/db";

export const Trash = () => {
  const fetcher = async () => {
    const snippets = await db.snippets
      .where("inTrash")
      .equals(1)
      .toArray();
    return snippets;
  };
  return (
    <SnippetsPanel folderName="inbox" fetcher={{ fn: fetcher, deps: [] }} />
  );
};
