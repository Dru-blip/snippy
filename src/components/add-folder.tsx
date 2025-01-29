import { db } from "@/lib/db";
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
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  children: React.ReactNode;
}

export const AddFolderDialog = ({ children }: Props) => {
  const [name, setName] = useState<string>("");

  const addFolder = async () => {
    try {
      await db.folders.add({ name });
      toast.success("successfully created new folder");
    } catch (error) {
      toast.error("Unable to create folder");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Folder</DialogTitle>
        </DialogHeader>
        <div>
          <Input
            placeholder="name"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              onClick={() => {
                addFolder();
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
