import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSideBar } from "@/components/AppSideBar";
import { Outlet } from "react-router";
import { SiteHeader } from "@/components/SiteHeader";

export default function Layout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSideBar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <main className="flex flex-1 flex-col min-w-0 overflow-auto">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
