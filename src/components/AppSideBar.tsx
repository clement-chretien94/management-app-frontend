import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AuthContext } from "@/hooks/auth/authContext";
import { House, Layers, Focus } from "lucide-react";
import { useContext } from "react";
import { NavLink } from "react-router";

export function AppSideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const authContext = useContext(AuthContext);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <NavLink to="/">
                <Focus className="size-5!" />
                FocusFlow
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              <SidebarMenuItem key="Home">
                <NavLink to="/">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive}>
                      <House />
                      <span>Home</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem key="Categories">
                <NavLink to="/categories">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive}>
                      <Layers />
                      <span>Categories</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => authContext?.logOut?.()}>
              Log Out
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
