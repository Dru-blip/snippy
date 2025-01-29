import createTheme from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";

export const darkTheme = createTheme({
  theme: "dark",
  settings: {
    background: "#121212",
    foreground: "#DBD7CA",
    caret: "#ffffff",
    selection: "#2C313A",
    selectionMatch: "#2C313A55",
    lineHighlight: "#2C313A20",
    gutterBackground: "#121212",
    gutterForeground: "#4B5263",
  },
  styles: [
    { tag: t.comment, color: "#758575" },
    { tag: t.variableName, color: "#DBD7CA" },
    { tag: [t.string, t.special(t.brace)], color: "#C3E88D" },
    { tag: t.number, color: "#FF9CAC" },
    { tag: t.bool, color: "#FF9CAC" },
    { tag: t.null, color: "#FF9CAC" },
    { tag: t.keyword, color: "#BB9AF7" },
    { tag: t.operator, color: "#89DDFF" },
    { tag: t.className, color: "#82AAFF" },
    { tag: t.definition(t.typeName), color: "#82AAFF" },
    { tag: t.typeName, color: "#82AAFF" },
    { tag: t.angleBracket, color: "#89DDFF" },
    { tag: t.tagName, color: "#FF757F" },
    { tag: t.attributeName, color: "#FFB454" },
  ],
});