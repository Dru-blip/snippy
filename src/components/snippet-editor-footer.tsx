import { Snippet } from "@/types";
import SearchableSelect from "./searchable-select";
import { langNames, LanguageName } from "@uiw/codemirror-extensions-langs";
import { useEffect, useMemo, useState } from "react";
import { db } from "@/lib/db";

interface Props {
  snippet: Snippet;
}

export const SnippetEditorFooter = ({ snippet }: Props) => {
  const [language, setLanguage] = useState(snippet.language as LanguageName);
  const [open, setOpen] = useState(false);
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
  useEffect(() => {
    setLanguage(snippet.language as LanguageName);
  }, [snippet]);
  return (
    <div className="px-4 py-2 border-t flex-none">
      <SearchableSelect
        className="w-[200px]"
        options={langCollection}
        value={language}
        onChange={async (val) => {
          console.log(val);
          setLanguage(val as LanguageName);
          try {
            await db.snippets.update(snippet.id, { language: val });
          } catch (error) {}
        }}
        open={open}
        onOpenChange={setOpen}
        // label="Select language"
        placeholder="Choose a language"
        searchPlaceholder="Search language..."
      />
    </div>
  );
};
