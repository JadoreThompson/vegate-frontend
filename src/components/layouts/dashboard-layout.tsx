import { type FC, type ReactNode } from "react";
import { useLocation } from "react-router";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useThemeStore } from "@/stores/theme-store";
import DashboardSidebar from "./DashboardSidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useThemeStore();

  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Strategies", href: "/strategies" },
    { name: "Backtests", href: "/backtests" },
    { name: "Live Trading", href: "/live-trading" },
    { name: "Performance", href: "/performance" },
    { name: "Trade History", href: "/trade-history" },
  ];

  const getCurrentPageName = () => {
    const currentPage = navigation.find(
      (item) => item.href === location.pathname,
    );
    return currentPage?.name || "Dashboard";
  };

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
