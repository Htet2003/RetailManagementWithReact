import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DesktopSidebar from "@/components/sidebar/DesktopSidebar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks";

const DefaultLayout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return !isAuthenticated ? (
    <Navigate to={"/auth/login"} state={{ from: location }} replace />
  ) : (
    <SidebarProvider>
      <DesktopSidebar />
      <main className="w-full px-6">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default DefaultLayout;
