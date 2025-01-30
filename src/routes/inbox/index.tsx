import { SnippetsPanel } from "@/components/snippets-panel";
import { db } from "@/lib/db";

export const Inbox = () => {
  const fetcher = async () => {
    const snippets = db.snippets
      .where("folderName")
      .equals("inbox")
      .and((snippet) => !snippet.inTrash);
    return await snippets.toArray();
  };
  return (
    <SnippetsPanel folderName="inbox" fetcher={{ fn: fetcher, deps: [] }} />
  );
};
