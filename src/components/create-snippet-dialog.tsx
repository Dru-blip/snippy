import { db } from "@/lib/db";
import { langNames } from "@uiw/codemirror-extensions-langs";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import SearchableSelect from "./searchable-select";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

interface Props {
  children: React.ReactNode;
  folderName: string;
}

export const CreateSnippetDialog = ({ children, folderName }: Props) => {
  const [name, setName] = useState<string>("Untitled Snippet");
  const [language, setLanguage] = useState("");
  const [open, setOpen] = useState(false);

  const createSnippet = async () => {
    try {
      await db.snippets.add({
        name,
        folderName,
        content: "",
        createdAt: new Date(),
        language,
        favorite:0,
        inTrash:0
      });
      toast.success("snippet created");
    } catch (error) {
      toast.error("error creating snippet");
    }
  };

  const langCollection = useMemo(
    () =>
      langNames
        .map((lang: string) => ({
          label: lang,
          value: lang.toLowerCase(),
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [langNames]
  );
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Snippet</DialogTitle>
        </DialogHeader>
        <div>
          <Input
            placeholder="snippet name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <SearchableSelect
            options={langCollection}
            value={language}
            onChange={setLanguage}
            open={open}
            onOpenChange={setOpen}
            label="Select language"
            placeholder="Choose a language"
            searchPlaceholder="Search language..."
          />
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              onClick={() => {
                createSnippet();
              }}
            >
              Create
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button type="button" variant={"secondary"}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
