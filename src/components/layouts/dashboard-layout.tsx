import {
  type FC,
  type ForwardRefExoticComponent,
  type ReactNode,
  type RefAttributes,
} from "react";
import { useNavigate } from "react-router";

import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  BarChart3,
  Bot,
  LogOutIcon,
  SettingsIcon,
  Wallet,
  type LucideProps,
} from "lucide-react";
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

type SidebarItem = {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

const SidebarRow: FC<{ item: SidebarItem }> = (props) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <SidebarMenuItem key={props.item.name}>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarMenuButton
              asChild
              isActive={isActive(props.item.href)}
              className={cn(
                "hidden justify-center sm:flex",
                isActive(props.item.href) && "!bg-muted",
              )}
            >
              <Link to={props.item.href}>
                <props.item.icon size={1} />
              </Link>
            </SidebarMenuButton>
          </TooltipTrigger>
          <TooltipContent side="right">{props.item.name}</TooltipContent>
        </Tooltip>
        <Link
          to={props.item.href}
          className={cn(
            "flex items-center gap-2 rounded-md p-2 sm:hidden",
            isActive(props.item.href) && "bg-muted",
          )}
        >
          <props.item.icon size={15} />
          {props.item.name}
        </Link>
      </SidebarMenuItem>
    </>
  );
};

const DashboardSidebar: FC = () => {
  const navigate = useNavigate();

  const logoutMutation = useLogoutMutation();

  const navigation: SidebarItem[] = [
    { name: "Strategies", href: "/strategies", icon: Bot },
    { name: "Backtests", href: "/backtests", icon: BarChart3 },
  ];

  const secondaryNavigation: SidebarItem[] = [
    { name: "Brokers", href: "/brokers", icon: Wallet },
  ];

  return (
    <TooltipProvider delayDuration={100}>
      <Sidebar
        collapsible="offcanvas"
        className="w-20 min-w-16"
        variant="floating"
      >
        <SidebarHeader className="border-border border- justify-start p-4">
          <Link
            to="/dashboard"
            className="flex items-center justify-start sm:justify-center"
          >
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
                  <SidebarRow item={item} />
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
                {secondaryNavigation.map((item) => (
                  <SidebarRow item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarRow
                    item={{
                      name: "Settings",
                      href: "/settings",
                      icon: SettingsIcon,
                    }}
                  />
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton className="hidden justify-center px-2 hover:text-red-500 sm:flex">
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
                  <Button
                    onClick={() => {
                      logoutMutation.mutateAsync();
                      navigate("/login");
                    }}
                    className="h-8 w-full justify-start !bg-red-500 p-0 text-white sm:hidden"
                  >
                    <LogOutIcon className="h-4 w-4" />
                    Logout
                  </Button>
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
  // const navigate = useNavigate();
  // const meQuery = useMeQuery();

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
