import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { sidebarData } from "./sidebarData";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LogOutIcon } from "lucide-react";
import { useAuth } from "@/hooks";

const DesktopSidebar = () => {
  const isActiveLink = (routePath: string) => {
    const location = useLocation();
    return location.pathname === routePath;
  };

  const navigate = useNavigate();
  const { userLogout } = useAuth();

  const logoutHandler = () => {
    userLogout();
    navigate("/auth/login");
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="py-6 text-xl">
            Retail Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData.map((item) => (
                <SidebarMenuItem
                  key={item.name}
                  className={
                    isActiveLink(item.routeName)
                      ? "flex items-center space-x-2 bg-gray-200 text-black font-bold rounded-md px-2 py-1"
                      : "flex items-center space-x-2 text-gray-600"
                  }
                >
                  <SidebarMenuButton asChild>
                    <NavLink to={item.routeName}>
                      <item.icon />
                      {item.name}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem
                className={
                  "flex items-center space-x-2 text-gray-600 hover:bg-gray-100 hover:text-black rounded-md px-2 py-1 cursor-pointer"
                }
              >
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <SidebarMenuButton>
                      <LogOutIcon />
                      Logout
                    </SidebarMenuButton>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action will log you out of your account.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => logoutHandler()}>
                        Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DesktopSidebar;
