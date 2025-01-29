import { FolderClosedIcon, Inbox, Plus, ShoppingBasketIcon, StarIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { AddFolderDialog } from "@/components/add-folder";

const items = [
  {
    title: "Inbox",
    url: "/",
    icon: Inbox,
  },
  {
    title: "All Snippets",
    url: "/all",
    icon: ShoppingBasketIcon,
  },
  {
    title: "Favorites",
    url: "/favorites",
    icon: StarIcon,
  },
];

export function AppSidebar() {
  const folders = useLiveQuery(async () => {
    const folders = await db.folders.toArray();
    return folders;
  }, []);
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <AddFolderDialog>
            <SidebarGroupAction title="Add Project">
              <Plus /> <span className="sr-only">Add Project</span>
            </SidebarGroupAction>
          </AddFolderDialog>
          <SidebarGroupContent>
            <SidebarMenu>
              {folders?.map((folder) => (
                <SidebarMenuItem key={folder.name}>
                  <SidebarMenuButton asChild>
                    <NavLink to={`/folders/${folder.name}`}>
                      <FolderClosedIcon/>
                      <span>{folder.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
