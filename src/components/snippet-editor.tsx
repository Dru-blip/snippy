import { db } from "@/lib/db";
import { useDebounce } from "@/lib/hooks";
import { darkTheme } from "@/lib/themes";
import { selectedSnippetAtom } from "@/stores";
import { LanguageName, loadLanguage } from "@uiw/codemirror-extensions-langs";
import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { SnippetEditorFooter } from "./snippet-editor-footer";
import { SnippetEditorHeader } from "./snippet-editor-header";

// interface CursorPosition {
//   line: number;
//   column: number;
// }

export const SnippetEditor = () => {
  const selectedSnippet = useAtomValue(selectedSnippetAtom);
  const [value, setValue] = useState(selectedSnippet?.content);
  const [language, setLanguage] = useState<LanguageName>("javascript");


  const editorRef = useRef<ReactCodeMirrorRef>(null);

  useEffect(() => {
    setValue(selectedSnippet?.content);
    setLanguage(
      (selectedSnippet?.language as LanguageName) ??
        ("javascript " as LanguageName)
    );
  }, [selectedSnippet]);

  const onChange = useDebounce(async (val: any, viewUpdate: any) => {
    setValue(val);
    try {
      await db.snippets.update(selectedSnippet?.id!, { content: val });
    } catch (error) {
      toast.error("error saving snippet");
    }
  });

  return (
    <div className="w-full h-full">
      {selectedSnippet ? (
        <div className="h-full flex flex-col">
          {/* Header */}
          <SnippetEditorHeader snippet={selectedSnippet} />

          {/* Editor */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 overflow-auto">
              <CodeMirror
                ref={editorRef}
                value={value}
                className="h-full"
                height="100%"
                extensions={[loadLanguage(language)!]}
                onChange={onChange}
                theme={darkTheme}
                
              />
            </div>
          </div>

          {/* Footer */}
          <SnippetEditorFooter snippet={selectedSnippet}/>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          No Snippet Selected
        </div>
      )}
    </div>
  );
};
