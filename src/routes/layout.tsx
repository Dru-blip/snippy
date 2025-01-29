import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { AppSidebar } from "./sidebar";

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full min-h-screen">
        {/* <SidebarTrigger /> */}
        <Outlet/>
      </main>
    </SidebarProvider>
  );
};
