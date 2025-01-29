import Dexie, { type EntityTable } from "dexie";
import type { Folder, Snippet } from "../types";

export const db = new Dexie("snippy") as Dexie & {
  folders: EntityTable<
    Folder,
    "id" // primary key "id" (for the typings only)
  >;
  snippets: EntityTable<Snippet, "id">;
};
db.version(1).stores({
  folders: "++id, &name, defaultLanguage",
  snippets: "++id,name,language,folderName,*tags"
});

db.version(2).stores({
  snippets: "++id,name,language,folderName,favorite,inTrash,*tags"
});