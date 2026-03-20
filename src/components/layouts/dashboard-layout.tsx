import { type FC, type ReactNode } from "react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLogoutMutation } from "@/hooks/queries/auth-hooks";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import WebsiteLogo from "../website-logo";


const DashboardSidebar: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logoutMutation = useLogoutMutation();

  const navigation = [
    { name: "Strategies", href: "/strategies", icon: Bot },
    { name: "Backtests", href: "/backtests", icon: BarChart3 },
  ];

  const secondaryNavigation = [
    { name: "Brokers", href: "/brokers", icon: Wallet },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <TooltipProvider delayDuration={100}>
      <Sidebar
        collapsible="offcanvas"
        className="w-20 min-w-16"
        variant="floating"
      >
        <SidebarHeader className="border-border border-b p-4">
          <Link to="/dashboard" className="flex items-center justify-center">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg">
              <WebsiteLogo />
            </div>
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive(item.href)}
                          className={cn(
                            "justify-center",
                            isActive(item.href) && "!bg-muted",
                          )}
                        >
                          <Link to={item.href}>
                            <item.icon size={1} />
                          </Link>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right">{item.name}</TooltipContent>
                    </Tooltip>
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
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton
                            asChild
                            isActive={isActive(item.href)}
                            className={cn(
                              "justify-center px-2",
                              isActive(item.href) && "!bg-muted",
                            )}
                          >
                            <Link to={item.href}>
                              <Icon className="h-4 w-4" />
                            </Link>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          {item.name}
                        </TooltipContent>
                      </Tooltip>
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
                <SidebarMenuItem>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive("/settings")}
                        className={cn(
                          "justify-center px-2",
                          isActive("/settings") && "!bg-muted",
                        )}
                      >
                        <Link to="/settings">
                          <SettingsIcon className="h-4 w-4" />
                        </Link>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right">Settings</TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton className="justify-center px-2 hover:text-red-500">
                        <Button
                          onClick={() => {
                            logoutMutation.mutateAsync();
                            navigate("/login");
                          }}
                          className="h-auto justify-center bg-transparent p-0 text-white hover:bg-transparent"
                        >
                          <LogOutIcon className="h-4 w-4" />
                        </Button>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right">Logout</TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
};

const DashboardLayout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const navigate = useNavigate();
  const meQuery = useMeQuery();

  // useEffect(() => {
  //   if (!meQuery.isLoading && (meQuery.isError || !meQuery.data)) {
  //     navigate("/login", { replace: true });
  //   }
  // }, [meQuery.data, meQuery.isError, meQuery.isLoading, navigate]);

  // if (meQuery.isLoading) {
  //   return (
  //     <div className="flex h-screen w-full items-center justify-center">
  //       <div className="text-center">
  //         <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
  //         <p className="text-muted-foreground">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (!meQuery.data) {
  //   return null;
  // }

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
          <main className="l flex-1 overflow-auto p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
