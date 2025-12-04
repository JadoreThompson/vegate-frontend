import {
    ArrowDown,
    ArrowUp,
    BarChart3,
    Calendar,
    Download,
    LineChart,
    Percent,
    TrendingDown,
    TrendingUp
} from "lucide-react";
import { type FC } from "react";
import { Link } from "react-router";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BacktestResultsPage: FC = () => {
  const metrics = {
    totalReturn: 45.6,
    sharpeRatio: 1.87,
    maxDrawdown: -12.3,
    winRate: 64.2,
    profitFactor: 2.34,
    totalTrades: 127,
    avgWin: 2.8,
    avgLoss: -1.9,
    largestWin: 8.4,
    largestLoss: -5.2,
    avgTradeDuration: "2.3 days",
    expectancy: 1.2,
  };

  const monthlyReturns = [
    { month: "Jan", return: 5.2 },
    { month: "Feb", return: 3.8 },
    { month: "Mar", return: -2.1 },
    { month: "Apr", return: 6.4 },
    { month: "May", return: 4.1 },
    { month: "Jun", return: 7.2 },
    { month: "Jul", return: 2.9 },
    { month: "Aug", return: -3.5 },
    { month: "Sep", return: 8.1 },
    { month: "Oct", return: 5.6 },
    { month: "Nov", return: 4.3 },
    { month: "Dec", return: 3.6 },
  ];

  const recentTrades = [
    {
      id: 1,
      date: "2024-01-26",
      symbol: "AAPL",
      side: "LONG",
      entry: "$175.23",
      exit: "$178.45",
      pnl: "+$322.00",
      pnlPercent: "+1.84%",
      duration: "2.5 days",
    },
    {
      id: 2,
      date: "2024-01-24",
      symbol: "TSLA",
      side: "SHORT",
      entry: "$242.50",
      exit: "$238.20",
      pnl: "+$430.00",
      pnlPercent: "+1.77%",
      duration: "1.2 days",
    },
    {
      id: 3,
      date: "2024-01-22",
      symbol: "SPY",
      side: "LONG",
      entry: "$445.67",
      exit: "$443.12",
      pnl: "-$255.00",
      pnlPercent: "-0.57%",
      duration: "3.1 days",
    },
    {
      id: 4,
      date: "2024-01-20",
      symbol: "NVDA",
      side: "LONG",
      entry: "$520.30",
      exit: "$532.45",
      pnl: "+$1,215.00",
      pnlPercent: "+2.34%",
      duration: "4.3 days",
    },
    {
      id: 5,
      date: "2024-01-18",
      symbol: "MSFT",
      side: "LONG",
      entry: "$402.15",
      exit: "$398.90",
      pnl: "-$325.00",
      pnlPercent: "-0.81%",
      duration: "2.8 days",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Link
                to="/backtests"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Backtests
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm">RSI Mean Reversion</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Backtest Results
            </h2>
            <p className="text-muted-foreground">
              Testing period: Jan 1, 2023 - Dec 31, 2023 (1 year)
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Link to="/strategies/1/deploy">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Deploy Strategy
              </Button>
            </Link>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Return
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                +{metrics.totalReturn}%
              </div>
              <p className="flex items-center text-xs text-muted-foreground">
                <ArrowUp className="mr-1 h-3 w-3 text-emerald-500" />
                ${(10000 * (metrics.totalReturn / 100)).toFixed(0)} on $10k
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sharpe Ratio
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.sharpeRatio}</div>
              <p className="text-xs text-muted-foreground">
                Risk-adjusted return
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Max Drawdown
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {metrics.maxDrawdown}%
              </div>
              <p className="flex items-center text-xs text-muted-foreground">
                <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                Largest peak-to-trough
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.winRate}%</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((metrics.totalTrades * metrics.winRate) / 100)} of{" "}
                {metrics.totalTrades} trades
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Equity Curve */}
          <Card>
            <CardHeader>
              <CardTitle>Equity Curve</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed border-border bg-muted/20">
                <div className="text-center">
                  <LineChart className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Equity curve visualization
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Drawdown Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Drawdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed border-border bg-muted/20">
                <div className="text-center">
                  <TrendingDown className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drawdown visualization
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-4">
                <h4 className="font-semibold">Returns</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total Return
                    </span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      +{metrics.totalReturn}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Sharpe Ratio
                    </span>
                    <span className="font-medium">{metrics.sharpeRatio}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Profit Factor
                    </span>
                    <span className="font-medium">{metrics.profitFactor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Expectancy
                    </span>
                    <span className="font-medium">{metrics.expectancy}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Risk</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Max Drawdown
                    </span>
                    <span className="font-medium text-red-600 dark:text-red-400">
                      {metrics.maxDrawdown}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Avg Win
                    </span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      +{metrics.avgWin}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Avg Loss
                    </span>
                    <span className="font-medium text-red-600 dark:text-red-400">
                      {metrics.avgLoss}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Largest Win
                    </span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      +{metrics.largestWin}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Trading</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total Trades
                    </span>
                    <span className="font-medium">{metrics.totalTrades}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Win Rate
                    </span>
                    <span className="font-medium">{metrics.winRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Avg Duration
                    </span>
                    <span className="font-medium">
                      {metrics.avgTradeDuration}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Largest Loss
                    </span>
                    <span className="font-medium text-red-600 dark:text-red-400">
                      {metrics.largestLoss}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Returns & Trade List */}
        <Tabs defaultValue="monthly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="monthly">Monthly Returns</TabsTrigger>
            <TabsTrigger value="trades">Trade List</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Monthly Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
                  {monthlyReturns.map((item) => (
                    <div
                      key={item.month}
                      className="rounded-lg border border-border p-3 text-center"
                    >
                      <p className="mb-1 text-xs text-muted-foreground">
                        {item.month}
                      </p>
                      <p
                        className={`font-semibold ${
                          item.return > 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {item.return > 0 ? "+" : ""}
                        {item.return}%
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trades">
            <Card>
              <CardHeader>
                <CardTitle>Recent Trades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTrades.map((trade) => (
                    <div key={trade.id}>
                      <div className="flex items-center justify-between rounded-lg border border-border p-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold">{trade.symbol}</span>
                            <span
                              className={`rounded px-2 py-0.5 text-xs font-medium ${
                                trade.side === "LONG"
                                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                  : "bg-red-500/10 text-red-600 dark:text-red-400"
                              }`}
                            >
                              {trade.side}
                            </span>
                          </div>
                          <div className="mt-1 flex gap-4 text-sm text-muted-foreground">
                            <span>{trade.date}</span>
                            <span>
                              {trade.entry} → {trade.exit}
                            </span>
                            <span>{trade.duration}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-semibold ${
                              trade.pnl.startsWith("+")
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {trade.pnl}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {trade.pnlPercent}
                          </p>
                        </div>
                      </div>
                      {trade.id < recentTrades.length && (
                        <Separator className="my-3" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BacktestResultsPage;