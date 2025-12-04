import {
  BarChart3,
  Bot,
  ChevronDown,
  History,
  Home,
  LayoutDashboard,
  LineChart,
  LogOut,
  Menu,
  Moon,
  PlayCircle,
  Settings,
  Sun,
  TrendingUp,
  User,
  Wallet,
  X,
} from "lucide-react";
import { useState, type FC, type ReactNode } from "react";
import { Link, useLocation } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useThemeStore } from "@/stores/theme-store";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useThemeStore();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Strategies", href: "/strategies", icon: Bot },
    { name: "Backtests", href: "/backtests", icon: BarChart3 },
    { name: "Live Trading", href: "/live-trading", icon: PlayCircle },
    { name: "Performance", href: "/performance", icon: LineChart },
    { name: "Trade History", href: "/trade-history", icon: History },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bg-background flex h-screen overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`border-border bg-card fixed inset-y-0 left-0 z-50 w-52 transform border-r transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-border flex h-16 items-center justify-between border-b px-4">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">vegate</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-2 py-4">
            <nav className="space-y-0.5">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <Separator className="my-4" />

            {/* Secondary Navigation */}
            <nav className="space-y-0.5">
              <Link
                to="/settings"
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive("/settings")
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Settings className="h-4 w-4 flex-shrink-0" />
                Settings
              </Link>
              <Link
                to="/brokers"
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive("/brokers")
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Wallet className="h-4 w-4 flex-shrink-0" />
                Brokers
              </Link>
            </nav>
          </ScrollArea>

          {/* User Profile */}
          <div className="border-border border-t p-4">
            <Popover>
              <PopoverTrigger asChild>
                <button className="hover:bg-accent flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium">John Trader</p>
                    <p className="text-muted-foreground text-xs">Pro Plan</p>
                  </div>
                  <ChevronDown className="text-muted-foreground h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-56">
                <div className="space-y-1">
                  <Link to="/settings">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
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
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="border-border bg-card flex h-16 items-center justify-between border-b px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">
                {navigation.find((item) => isActive(item.href))?.name ||
                  "Dashboard"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Link to="/strategies/new">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                New Strategy
              </Button>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="h-full p-4 lg:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
