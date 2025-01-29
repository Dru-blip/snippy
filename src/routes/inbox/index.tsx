import { SnippetsPanel } from "@/components/snippets-panel";
import { db } from "@/lib/db";

export const Inbox = () => {
  const fetcher = async () => {
    const snippets = await db.snippets
      .where("folderName")
      .equals("inbox")
      .toArray();
    return snippets;
  };
  return (
    <SnippetsPanel folderName="inbox" fetcher={{ fn: fetcher, deps: [] }} />
  );
};
