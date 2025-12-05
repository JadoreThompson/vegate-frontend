import { BarChart3, Filter, Search } from "lucide-react";
import { useState, type FC } from "react";
import { Link } from "react-router";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface Backtest {
  id: string;
  name: string;
  strategy_id: string;
  strategy_name: string;
  ticker: string;
  start_date: string;
  end_date: string;
  status: "completed" | "running" | "failed";
  total_return: number;
  sharpe_ratio: number;
  max_drawdown: number;
  total_trades: number;
  win_rate: number;
  created_at: string;
}

const BacktestsPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    "completed",
    "running",
    "failed",
  ]);
  const [selectedTickers, setSelectedTickers] = useState<string[]>([]);

  // Mock data - 10 sample backtests
  const backtests: Backtest[] = [
    {
      id: "1",
      name: "AAPL Q4 2023",
      strategy_id: "1",
      strategy_name: "RSI Mean Reversion",
      ticker: "AAPL",
      start_date: "2023-10-01",
      end_date: "2023-12-31",
      status: "completed",
      total_return: 15.7,
      sharpe_ratio: 1.85,
      max_drawdown: -8.2,
      total_trades: 42,
      win_rate: 68,
      created_at: "2024-01-15",
    },
    {
      id: "2",
      name: "TSLA Full Year",
      strategy_id: "2",
      strategy_name: "Momentum Breakout",
      ticker: "TSLA",
      start_date: "2023-01-01",
      end_date: "2023-12-31",
      status: "completed",
      total_return: 32.4,
      sharpe_ratio: 2.15,
      max_drawdown: -12.5,
      total_trades: 89,
      win_rate: 72,
      created_at: "2024-01-20",
    },
    {
      id: "3",
      name: "SPY H1 2023",
      strategy_id: "3",
      strategy_name: "Trend Following MA Cross",
      ticker: "SPY",
      start_date: "2023-01-01",
      end_date: "2023-06-30",
      status: "completed",
      total_return: -5.3,
      sharpe_ratio: 0.45,
      max_drawdown: -18.7,
      total_trades: 28,
      win_rate: 42,
      created_at: "2024-01-10",
    },
    {
      id: "4",
      name: "GOOGL Q3 2023",
      strategy_id: "4",
      strategy_name: "Volatility Squeeze",
      ticker: "GOOGL",
      start_date: "2023-07-01",
      end_date: "2023-09-30",
      status: "running",
      total_return: 0,
      sharpe_ratio: 0,
      max_drawdown: 0,
      total_trades: 0,
      win_rate: 0,
      created_at: "2024-01-25",
    },
    {
      id: "5",
      name: "MSFT Full Year",
      strategy_id: "5",
      strategy_name: "Support & Resistance",
      ticker: "MSFT",
      start_date: "2023-01-01",
      end_date: "2023-12-31",
      status: "completed",
      total_return: 22.8,
      sharpe_ratio: 1.92,
      max_drawdown: -9.4,
      total_trades: 65,
      win_rate: 70,
      created_at: "2024-01-18",
    },
    {
      id: "6",
      name: "NVDA Q2 2023",
      strategy_id: "6",
      strategy_name: "MACD Divergence",
      ticker: "NVDA",
      start_date: "2023-04-01",
      end_date: "2023-06-30",
      status: "failed",
      total_return: 0,
      sharpe_ratio: 0,
      max_drawdown: 0,
      total_trades: 0,
      win_rate: 0,
      created_at: "2024-01-22",
    },
    {
      id: "7",
      name: "AMZN H2 2023",
      strategy_id: "1",
      strategy_name: "RSI Mean Reversion",
      ticker: "AMZN",
      start_date: "2023-07-01",
      end_date: "2023-12-31",
      status: "completed",
      total_return: 18.3,
      sharpe_ratio: 1.78,
      max_drawdown: -10.1,
      total_trades: 53,
      win_rate: 66,
      created_at: "2024-01-12",
    },
    {
      id: "8",
      name: "META Q4 2023",
      strategy_id: "2",
      strategy_name: "Momentum Breakout",
      ticker: "META",
      start_date: "2023-10-01",
      end_date: "2023-12-31",
      status: "completed",
      total_return: -8.5,
      sharpe_ratio: -0.32,
      max_drawdown: -22.3,
      total_trades: 31,
      win_rate: 38,
      created_at: "2024-01-08",
    },
    {
      id: "9",
      name: "SPY Q1 2024",
      strategy_id: "3",
      strategy_name: "Trend Following MA Cross",
      ticker: "SPY",
      start_date: "2024-01-01",
      end_date: "2024-03-31",
      status: "running",
      total_return: 0,
      sharpe_ratio: 0,
      max_drawdown: 0,
      total_trades: 0,
      win_rate: 0,
      created_at: "2024-01-26",
    },
    {
      id: "10",
      name: "AAPL Full Year",
      strategy_id: "4",
      strategy_name: "Volatility Squeeze",
      ticker: "AAPL",
      start_date: "2023-01-01",
      end_date: "2023-12-31",
      status: "completed",
      total_return: 45.2,
      sharpe_ratio: 2.45,
      max_drawdown: -7.8,
      total_trades: 78,
      win_rate: 75,
      created_at: "2024-01-05",
    },
  ];

  // Get unique values for filters
  const uniqueStrategies = Array.from(
    new Set(backtests.map((b) => b.strategy_name)),
  ).sort();
  const uniqueTickers = Array.from(
    new Set(backtests.map((b) => b.ticker)),
  ).sort();

  const statusOptions = [
    { value: "completed", label: "Completed" },
    { value: "running", label: "Running" },
    { value: "failed", label: "Failed" },
  ];

  const handleStrategyToggle = (strategy: string) => {
    setSelectedStrategies((prev) =>
      prev.includes(strategy)
        ? prev.filter((s) => s !== strategy)
        : [...prev, strategy],
    );
  };

  const handleStatusToggle = (status: string) => {
    if (selectedStatuses.includes(status)) {
      if (selectedStatuses.length > 1) {
        setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
      }
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  const handleTickerToggle = (ticker: string) => {
    setSelectedTickers((prev) =>
      prev.includes(ticker)
        ? prev.filter((t) => t !== ticker)
        : [...prev, ticker],
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "running":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "failed":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    }
  };

  const filteredBacktests = backtests.filter((backtest) => {
    const matchesSearch =
      backtest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      backtest.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      backtest.strategy_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatuses.includes(backtest.status);
    const matchesStrategy =
      selectedStrategies.length === 0 ||
      selectedStrategies.includes(backtest.strategy_name);
    const matchesTicker =
      selectedTickers.length === 0 || selectedTickers.includes(backtest.ticker);
    return matchesSearch && matchesStatus && matchesStrategy && matchesTicker;
  });

  const BacktestCard = ({ backtest }: { backtest: Backtest }) => (
    <Link to={`/backtests/${backtest.id}`}>
      <Card className="group h-[220px] cursor-pointer transition-all hover:border-emerald-500/50 hover:shadow-lg">
        <CardContent className="flex h-full flex-col p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                <BarChart3 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-lg font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    {backtest.ticker}
                  </h3>
                  <Badge
                    className={`flex-shrink-0 ${getStatusColor(backtest.status)}`}
                  >
                    {backtest.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1 truncate text-sm">
                  {backtest.strategy_name}
                </p>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  {new Date(backtest.start_date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(backtest.end_date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-muted-foreground text-xs">Return</p>
                <p
                  className={`mt-1 font-semibold ${
                    backtest.total_return > 0
                      ? "text-emerald-600 dark:text-emerald-400"
                      : backtest.total_return < 0
                        ? "text-red-600 dark:text-red-400"
                        : ""
                  }`}
                >
                  {backtest.total_return > 0 ? "+" : ""}
                  {backtest.total_return.toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Sharpe</p>
                <p className="mt-1 font-semibold">
                  {backtest.sharpe_ratio.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Trades</p>
                <p className="mt-1 font-semibold">{backtest.total_trades}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Win Rate</p>
                <p className="mt-1 font-semibold">{backtest.win_rate}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  const activeFilterCount =
    selectedStrategies.length +
    selectedTickers.length +
    (selectedStatuses.length < statusOptions.length ? 1 : 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Backtests</h2>
            <p className="text-muted-foreground">
              View and analyze all backtest results across your strategies
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search backtests..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Strategy Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="default">
                <Filter className="mr-2 h-4 w-4" />
                Strategy
                {selectedStrategies.length > 0 && (
                  <span className="ml-2 rounded-full bg-emerald-500 px-1.5 py-0.5 text-xs text-white">
                    {selectedStrategies.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-56">
              <div className="space-y-4">
                <div>
                  <h4 className="mb-3 font-semibold">Strategy</h4>
                  <div className="space-y-2">
                    {uniqueStrategies.map((strategy) => (
                      <label
                        key={strategy}
                        className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md p-2"
                      >
                        <input
                          type="checkbox"
                          checked={selectedStrategies.includes(strategy)}
                          onChange={() => handleStrategyToggle(strategy)}
                          className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm">{strategy}</span>
                        <span className="text-muted-foreground ml-auto text-xs">
                          {
                            backtests.filter(
                              (b) => b.strategy_name === strategy,
                            ).length
                          }
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Status Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="default">
                <Filter className="mr-2 h-4 w-4" />
                Status
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
                            backtests.filter((b) => b.status === option.value)
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

          {/* Ticker Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="default">
                <Filter className="mr-2 h-4 w-4" />
                Ticker
                {selectedTickers.length > 0 && (
                  <span className="ml-2 rounded-full bg-emerald-500 px-1.5 py-0.5 text-xs text-white">
                    {selectedTickers.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-56">
              <div className="space-y-4">
                <div>
                  <h4 className="mb-3 font-semibold">Ticker</h4>
                  <div className="space-y-2">
                    {uniqueTickers.map((ticker) => (
                      <label
                        key={ticker}
                        className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md p-2"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTickers.includes(ticker)}
                          onChange={() => handleTickerToggle(ticker)}
                          className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm">{ticker}</span>
                        <span className="text-muted-foreground ml-auto text-xs">
                          {backtests.filter((b) => b.ticker === ticker).length}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Backtest Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBacktests.length === 0 ? (
            <div className="col-span-full">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <BarChart3 className="text-muted-foreground mb-4 h-12 w-12" />
                  <h3 className="mb-2 text-lg font-semibold">
                    No backtests found
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {searchQuery || activeFilterCount > 0
                      ? "Try adjusting your filters"
                      : "Run your first backtest to see results here"}
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            filteredBacktests.map((backtest) => (
              <BacktestCard key={backtest.id} backtest={backtest} />
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BacktestsPage;
