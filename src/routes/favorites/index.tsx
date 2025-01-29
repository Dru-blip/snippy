import { SnippetsPanel } from "@/components/snippets-panel";
import { db } from "@/lib/db";

export const Favorites = () => {
  const fetcher = async () => {
    const snippets = await db.snippets
      .where("favorite")
      .equals(1)
      .toArray();
    return snippets;
  };
  return (
    <SnippetsPanel folderName="inbox" fetcher={{ fn: fetcher, deps: [] }} />
  );
};
