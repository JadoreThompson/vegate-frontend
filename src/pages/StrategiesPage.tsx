import { Bot, Filter, Plus, Search } from "lucide-react";
import { useState, type FC } from "react";
import { Link } from "react-router";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const StrategiesPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    "active",
    "paused",
    "backtesting",
    "draft",
  ]);

  const strategies = [
    {
      id: 1,
      name: "RSI Mean Reversion",
      description: "Buy oversold, sell overbought using RSI indicator",
      status: "active",
      pnl: "+$2,450.00",
      pnlPercent: "+12.3%",
      trades: 45,
      winRate: 68,
      createdAt: "2024-01-15",
      lastTrade: "2 hours ago",
    },
    {
      id: 2,
      name: "Momentum Breakout",
      description: "Trade breakouts with high volume confirmation",
      status: "active",
      pnl: "+$1,820.00",
      pnlPercent: "+9.1%",
      trades: 32,
      winRate: 62,
      createdAt: "2024-01-12",
      lastTrade: "5 hours ago",
    },
    {
      id: 3,
      name: "Trend Following MA Cross",
      description: "Simple moving average crossover system",
      status: "active",
      pnl: "-$340.00",
      pnlPercent: "-1.7%",
      trades: 18,
      winRate: 44,
      createdAt: "2024-01-20",
      lastTrade: "1 day ago",
    },
    {
      id: 4,
      name: "Volatility Squeeze",
      description: "Bollinger Bands squeeze breakout strategy",
      status: "paused",
      pnl: "+$5,120.00",
      pnlPercent: "+25.6%",
      trades: 67,
      winRate: 71,
      createdAt: "2023-12-10",
      lastTrade: "3 days ago",
    },
    {
      id: 5,
      name: "Support & Resistance Levels",
      description: "Trade bounces off key support/resistance",
      status: "backtesting",
      pnl: "+$0.00",
      pnlPercent: "+0.0%",
      trades: 0,
      winRate: 0,
      createdAt: "2024-01-25",
      lastTrade: "Never",
    },
    {
      id: 6,
      name: "MACD Divergence",
      description: "Trade divergences between price and MACD",
      status: "draft",
      pnl: "+$0.00",
      trades: 0,
      winRate: 0,
      createdAt: "2024-01-26",
      lastTrade: "Never",
    },
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "paused", label: "Paused" },
    { value: "backtesting", label: "Backtesting" },
    { value: "draft", label: "Draft" },
  ];

  const handleStatusToggle = (status: string) => {
    if (selectedStatuses.includes(status)) {
      // Don't allow unchecking if it's the last one selected
      if (selectedStatuses.length > 1) {
        setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
      }
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "paused":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
      case "backtesting":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "draft":
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    }
  };

  const filteredStrategies = strategies.filter((s) => {
    const matchesSearch = s.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatuses.includes(s.status);
    return matchesSearch && matchesStatus;
  });

  const StrategyCard = ({ strategy }: { strategy: (typeof strategies)[0] }) => (
    <Link to={`/strategies/${strategy.id}`}>
      <Card className="group h-[200px] cursor-pointer transition-all hover:border-emerald-500/50 hover:shadow-lg">
        <CardContent className="flex h-full flex-col p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                <Bot className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-lg font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    {strategy.name}
                  </h3>
                  <span
                    className={`inline-flex flex-shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(strategy.status)}`}
                  >
                    {strategy.status}
                  </span>
                </div>
                <p className="text-muted-foreground mt-1 line-clamp-2 whitespace-nowrap text-sm text-ellipsis">
                  {strategy.description}
                </p>
              </div>
            </div>

            {/* Stats - Horizontal row layout */}
            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-muted-foreground text-xs">P&L</p>
                <p
                  className={`mt-1 font-semibold ${
                    strategy.pnl.startsWith("+")
                      ? "text-emerald-600 dark:text-emerald-400"
                      : strategy.pnl.startsWith("-")
                        ? "text-red-600 dark:text-red-400"
                        : ""
                  }`}
                >
                  {strategy.pnl}
                </p>
                {/* <p className="text-muted-foreground text-xs">
                  {strategy.pnlPercent}
                </p> */}
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Trades</p>
                <p className="mt-1 font-semibold">{strategy.trades}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Win Rate</p>
                <p className="mt-1 font-semibold">{strategy.winRate}%</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Last Trade</p>
                <p className="mt-1 text-sm">{strategy.lastTrade}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Strategies</h2>
            <p className="text-muted-foreground">
              Manage and monitor your trading strategies
            </p>
          </div>
          <Link to="/strategies/new">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              New Strategy
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search strategies..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Button with Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="default">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                {selectedStatuses.length < statusOptions.length && (
                  <span className="ml-2 rounded-full bg-emerald-500 px-1.5 py-0.5 text-xs text-white">
                    {selectedStatuses.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-56">
              <div className="space-y-4">
                <div>
                  <h4 className="mb-3 font-semibold">Status</h4>
                  <div className="space-y-2">
                    {statusOptions.map((option) => (
                      <label
                        key={option.value}
                        className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md p-2"
                      >
                        <input
                          type="checkbox"
                          checked={selectedStatuses.includes(option.value)}
                          onChange={() => handleStatusToggle(option.value)}
                          disabled={
                            selectedStatuses.includes(option.value) &&
                            selectedStatuses.length === 1
                          }
                          className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm">{option.label}</span>
                        <span className="text-muted-foreground ml-auto text-xs">
                          {
                            strategies.filter((s) => s.status === option.value)
                              .length
                          }
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Strategy Grid - 3 per row */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStrategies.length === 0 ? (
            <div className="col-span-full">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Bot className="text-muted-foreground mb-4 h-12 w-12" />
                  <h3 className="mb-2 text-lg font-semibold">
                    No strategies found
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {searchQuery ||
                    selectedStatuses.length < statusOptions.length
                      ? "Try adjusting your filters"
                      : "Get started by creating your first strategy"}
                  </p>
                  <Link to="/strategies/new">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Strategy
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          ) : (
            filteredStrategies.map((strategy) => (
              <StrategyCard key={strategy.id} strategy={strategy} />
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StrategiesPage;
