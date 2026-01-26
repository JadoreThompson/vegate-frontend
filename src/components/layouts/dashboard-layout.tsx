import { type FC, type ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";

import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useMeQuery } from "@/hooks/queries/auth-hooks";

import { BarChart3, Bot, LogOutIcon, SettingsIcon, Wallet } from "lucide-react";
import { Link, useLocation } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useLogoutMutation } from "@/hooks/queries/auth-hooks";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import WebsiteLogo from "../website-logo";

const DashboardSidebar: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logoutMutation = useLogoutMutation();

  const navigation = [
    // { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Strategies", href: "/strategies", icon: Bot },
    { name: "Backtests", href: "/backtests", icon: BarChart3 },
  ];

  const secondaryNavigation = [
    { name: "Brokers", href: "/brokers", icon: Wallet },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="offcanvas" className="">
      <SidebarHeader className="border-border border-b p-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg">
            <WebsiteLogo />
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    className={isActive(item.href) ? "!bg-muted" : ""}
                  >
                    <Link to={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="w-full px-2">
          <SidebarSeparator className="m-0" />
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.href)}
                      className={isActive(item.href) ? "!bg-muted" : ""}
                    >
                      <Link to={item.href}>
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="settings">
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/settings")}
                  className={isActive("/settings") ? "!bg-muted" : ""}
                >
                  <Link to={"/settings"}>
                    <SettingsIcon className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem key="logout">
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/")}
                  className={cn(
                    "hover:text-red-500",
                    isActive("/") ? "!bg-muted" : "",
                  )}
                >
                  <Button
                    onClick={() => {
                      logoutMutation.mutateAsync();
                      navigate("/login");
                    }}
                    className="justify-start bg-transparent !p-2 text-white"
                  >
                    <LogOutIcon className="m-0 h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};

const DashboardLayout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const navigate = useNavigate();
  const meQuery = useMeQuery();

  useEffect(() => {
    if (!meQuery.isLoading && (meQuery.isError || !meQuery.data)) {
      navigate("/login", { replace: true });
    }
  }, [meQuery.data, meQuery.isError, meQuery.isLoading, navigate]);

  if (meQuery.isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!meQuery.data) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="bg-background flex h-screen w-full overflow-hidden">
        <DashboardSidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="border-border bg-card flex h-16 items-center justify-between border-b px-4 sm:hidden lg:px-6">
            <div className="flex items-center gap-4">
              <div className="flex sm:hidden">
                <SidebarTrigger />
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
