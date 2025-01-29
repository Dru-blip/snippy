import { SnippetsPanel } from "@/components/snippets-panel";
import { db } from "@/lib/db";

export const AllSnippets = () => {
  const fetcher = async () => {
    const snippets = await db.snippets.toArray();
    return snippets;
  };
  return <SnippetsPanel folderName="inbox" fetcher={{ fn: fetcher, deps: [] }} />;
};
