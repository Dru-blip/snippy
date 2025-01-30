import Dexie, { type EntityTable } from "dexie";
import type { Folder, Snippet, Tag } from "../types";

export const db = new Dexie("snippy") as Dexie & {
  folders: EntityTable<
    Folder,
    "id" // primary key "id" (for the typings only)
  >;
  snippets: EntityTable<Snippet, "id">;
  tags: EntityTable<Tag, "id">;
};
db.version(1).stores({
  folders: "++id, &name, defaultLanguage",
  snippets: "++id,name,language,folderName,*tags",
});

db.version(2).stores({
  snippets: "++id,name,language,folderName,favorite,inTrash,*tags",
});

db.version(3).stores({
  tags: "++id,&name",
});
