import { type FC, type ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useMeQuery } from "@/hooks/queries/auth-hooks";

import {
  BarChart3,
  Bot,
  Home,
  LogOut,
  Settings,
  SunIcon,
  TrendingUp,
  User,
  Wallet,
} from "lucide-react";
import { Link, useLocation } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useLogoutMutation } from "@/hooks/queries/auth-hooks";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";


interface DashboardSidebarProps {
  onNavigate?: () => void;
}

const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const meQuery = useMeQuery()
  const logoutMutation = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/login", { replace: true });
    }
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Strategies", href: "/strategies", icon: Bot },
    { name: "Backtests", href: "/backtests", icon: BarChart3 },
  ];

  const secondaryNavigation = [
    { name: "Brokers", href: "/brokers", icon: Wallet },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="border-border border-b p-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">vegate</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.href)}
                      className={
                        isActive(item.href)
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : ""
                      }
                    >
                      <Link to={item.href} onClick={props.onNavigate}>
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

        <SidebarSeparator />

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
                      className={
                        isActive(item.href)
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : ""
                      }
                    >
                      <Link to={item.href} onClick={props.onNavigate}>
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

      <SidebarFooter className="border-border border-t p-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="hover:bg-accent flex h-12 w-full items-center gap-3 rounded-lg p-4 text-sm transition-colors">
              <div className="flex items-center justify-center rounded-full bg-emerald-500/20 p-1 text-emerald-600 dark:text-emerald-400">
                <User size={10} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">{meQuery.data?.username || "User"}</p>
                <p className="text-muted-foreground text-xs">
                  {meQuery.data?.is_verified ? "Verified" : "Unverified"}
                </p>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-56">
            <div className="space-y-1">
              <Link to="/settings">
                <HoverCard>
                  <HoverCardTrigger>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                    >
                      <SunIcon className="mr-2 h-4 w-4" />
                      Theme
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent
                    side="right"
                    sideOffset={20}
                    className="w-36"
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                    >
                      <SunIcon className="mr-2 h-4 w-4" />
                      Light
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                    >
                      <SunIcon className="mr-2 h-4 w-4" />
                      Dark
                    </Button>
                  </HoverCardContent>
                </HoverCard>
                {/* <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  <SunIcon className="mr-2 h-4 w-4" />
                  Theme
                </Button> */}
              </Link>
              <Link to="/settings">
                <Button
                  variant="ghost"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive w-full justify-start"
                  size="sm"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive w-full justify-start"
                size="sm"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {logoutMutation.isPending ? "Logging out..." : "Log out"}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
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

  // Don't render if not authenticated
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
          <main className="flex-1 overflow-auto">
            <div className="h-full p-4 lg:p-6">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
