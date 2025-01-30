import { Route, Routes } from "react-router";
import { Inbox } from "./inbox";
import { AppLayout } from "./layout";
import { AllSnippets } from "./all";
import { Favorites } from "./favorites";
import { FolderPage } from "./folders/folder";
import { Trash } from "./trash";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Inbox />} />
        <Route path="all" element={<AllSnippets/>}/>
        <Route path="favorites" element={<Favorites/>}/>
        <Route path="trash" element={<Trash/>}/>
        <Route path="folders">
          <Route path=":name" element={<FolderPage/>}/>
        </Route>
      </Route>
    </Routes>
  );
};
