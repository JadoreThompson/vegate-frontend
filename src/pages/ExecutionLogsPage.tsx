import {
    Activity,
    AlertCircle,
    CheckCircle2,
    Clock,
    Filter,
    Pause,
    Play,
    RefreshCw,
    XCircle,
} from "lucide-react";
import { useState, type FC } from "react";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

const ExecutionLogsPage: FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

  const logs = [
    {
      id: 1,
      timestamp: "2024-01-26 14:32:15.234",
      strategy: "RSI Mean Reversion",
      level: "success",
      type: "TRADE",
      message: "BUY order executed: AAPL @ $175.23, Qty: 100",
      details: {
        orderId: "ORD-12345",
        symbol: "AAPL",
        side: "BUY",
        price: 175.23,
        quantity: 100,
      },
    },
    {
      id: 2,
      timestamp: "2024-01-26 14:32:14.156",
      strategy: "RSI Mean Reversion",
      level: "info",
      type: "SIGNAL",
      message: "Entry signal detected: RSI(14) = 28.4, below threshold of 30",
      details: {
        indicator: "RSI",
        period: 14,
        value: 28.4,
        threshold: 30,
      },
    },
    {
      id: 3,
      timestamp: "2024-01-26 14:30:42.891",
      strategy: "Momentum Breakout",
      level: "warning",
      type: "ORDER",
      message: "Order partially filled: TSLA @ $242.50, Filled: 75/100",
      details: {
        orderId: "ORD-12344",
        symbol: "TSLA",
        requested: 100,
        filled: 75,
      },
    },
    {
      id: 4,
      timestamp: "2024-01-26 14:28:18.445",
      strategy: "Trend Following MA Cross",
      level: "info",
      type: "MONITOR",
      message: "Price monitoring: SPY @ $445.67, Distance to stop: 2.3%",
      details: {
        symbol: "SPY",
        currentPrice: 445.67,
        stopLoss: 436.42,
        distance: 2.3,
      },
    },
    {
      id: 5,
      timestamp: "2024-01-26 14:25:03.789",
      strategy: "Volatility Squeeze",
      level: "error",
      type: "ERROR",
      message: "Failed to place order: Insufficient margin",
      details: {
        error: "INSUFFICIENT_MARGIN",
        requiredMargin: 25000,
        availableMargin: 18500,
      },
    },
    {
      id: 6,
      timestamp: "2024-01-26 14:20:55.234",
      strategy: "RSI Mean Reversion",
      level: "success",
      type: "TRADE",
      message: "SELL order executed: NVDA @ $532.45, Qty: 100",
      details: {
        orderId: "ORD-12343",
        symbol: "NVDA",
        side: "SELL",
        price: 532.45,
        quantity: 100,
        pnl: 1215.0,
      },
    },
    {
      id: 7,
      timestamp: "2024-01-26 14:18:22.567",
      strategy: "Momentum Breakout",
      level: "info",
      type: "SIGNAL",
      message: "Exit signal detected: Price hit take profit target",
      details: {
        symbol: "NVDA",
        entryPrice: 520.3,
        currentPrice: 532.45,
        target: 530.0,
        profitPercent: 2.34,
      },
    },
    {
      id: 8,
      timestamp: "2024-01-26 14:15:10.123",
      strategy: "RSI Mean Reversion",
      level: "info",
      type: "MONITOR",
      message: "Position update: AAPL holding, unrealized P&L: +$248.00",
      details: {
        symbol: "AAPL",
        quantity: 100,
        entryPrice: 175.23,
        currentPrice: 177.71,
        unrealizedPnL: 248.0,
      },
    },
  ];

  const strategies = [
    "RSI Mean Reversion",
    "Momentum Breakout",
    "Trend Following MA Cross",
    "Volatility Squeeze",
  ];

  const getLogIcon = (level: string) => {
    switch (level) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  const getLogColor = (level: string) => {
    switch (level) {
      case "success":
        return "border-l-emerald-500";
      case "error":
        return "border-l-red-500";
      case "warning":
        return "border-l-yellow-500";
      default:
        return "border-l-blue-500";
    }
  };

  const filteredLogs = selectedStrategy
    ? logs.filter((log) => log.strategy === selectedStrategy)
    : logs;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Execution Logs
            </h2>
            <p className="text-muted-foreground">
              Real-time strategy execution and monitoring
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </>
              )}
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Active Strategies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-muted-foreground text-xs">Currently running</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Events Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-muted-foreground text-xs">Last event 2s ago</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Orders Executed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-muted-foreground text-xs">
                14 filled, 4 partial
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Errors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                2
              </div>
              <p className="text-muted-foreground text-xs">
                Requires attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium">Filter by:</span>
              <Button
                variant={selectedStrategy === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStrategy(null)}
              >
                All Strategies
              </Button>
              {strategies.map((strategy) => (
                <Button
                  key={strategy}
                  variant={
                    selectedStrategy === strategy ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedStrategy(strategy)}
                >
                  {strategy}
                </Button>
              ))}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    More Filters
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-64">
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 font-semibold">Log Level</h4>
                      <div className="space-y-2 text-sm">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked />
                          <span>Success</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked />
                          <span>Info</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked />
                          <span>Warning</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked />
                          <span>Error</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold">Event Type</h4>
                      <div className="space-y-2 text-sm">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked />
                          <span>Trade</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked />
                          <span>Signal</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked />
                          <span>Monitor</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked />
                          <span>Error</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Log Stream */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Live Log Stream
            </CardTitle>
            {isPaused && (
              <div className="flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400">
                <Clock className="h-4 w-4" />
                Paused
              </div>
            )}
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-2">
                {filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`rounded-lg border-l-4 ${getLogColor(log.level)} border-border bg-card hover:bg-accent border-t border-r border-b p-4 transition-colors`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{getLogIcon(log.level)}</div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground font-mono text-xs">
                            {log.timestamp}
                          </span>
                          <span className="bg-muted rounded px-2 py-0.5 text-xs font-medium">
                            {log.type}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            {log.strategy}
                          </span>
                        </div>
                        <p className="text-sm">{log.message}</p>
                        {log.details && (
                          <details className="mt-2">
                            <summary className="text-muted-foreground hover:text-foreground cursor-pointer text-xs">
                              View details
                            </summary>
                            <pre className="bg-muted mt-2 overflow-x-auto rounded p-2 text-xs">
                              {JSON.stringify(log.details, null, 2)}
                            </pre>
                          </details>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ExecutionLogsPage;
