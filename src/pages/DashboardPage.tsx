import {
  ArrowDown,
  ArrowUp,
  Bot,
  DollarSign,
  LineChart,
  Plus,
  TrendingUp,
} from "lucide-react";
import { type FC } from "react";
import { Link } from "react-router";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardPage: FC = () => {
  const stats = [
    {
      title: "Total Portfolio Value",
      value: "$124,580.32",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Active Strategies",
      value: "8",
      change: "+2 this week",
      trend: "up",
      icon: Bot,
    },
    {
      title: "Total Return",
      value: "+18.7%",
      change: "+2.3% this month",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Win Rate",
      value: "64.2%",
      change: "-1.2% this week",
      trend: "down",
      icon: LineChart,
    },
  ];

  const recentStrategies = [
    {
      id: 1,
      name: "RSI Mean Reversion",
      status: "active",
      pnl: "+$2,450.00",
      pnlPercent: "+12.3%",
      trades: 45,
      winRate: "68%",
    },
    {
      id: 2,
      name: "Momentum Breakout",
      status: "active",
      pnl: "+$1,820.00",
      pnlPercent: "+9.1%",
      trades: 32,
      winRate: "62%",
    },
    {
      id: 3,
      name: "Trend Following MA Cross",
      status: "active",
      pnl: "-$340.00",
      pnlPercent: "-1.7%",
      trades: 18,
      winRate: "44%",
    },
    {
      id: 4,
      name: "Volatility Squeeze",
      status: "paused",
      pnl: "+$5,120.00",
      pnlPercent: "+25.6%",
      trades: 67,
      winRate: "71%",
    },
  ];

  const recentTrades = [
    {
      id: 1,
      strategy: "RSI Mean Reversion",
      symbol: "AAPL",
      side: "BUY",
      entry: "$175.23",
      exit: "$178.45",
      pnl: "+$322.00",
      time: "2 hours ago",
    },
    {
      id: 2,
      strategy: "Momentum Breakout",
      symbol: "TSLA",
      side: "SELL",
      entry: "$242.50",
      exit: "$238.20",
      pnl: "+$430.00",
      time: "4 hours ago",
    },
    {
      id: 3,
      strategy: "Trend Following MA Cross",
      symbol: "SPY",
      side: "BUY",
      entry: "$445.67",
      exit: "$443.12",
      pnl: "-$255.00",
      time: "6 hours ago",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome back, John
            </h2>
            <p className="text-muted-foreground">
              Here's what's happening with your strategies today.
            </p>
          </div>
          <Link to="/strategies/new">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              New Strategy
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p
                    className={`flex items-center text-xs ${
                      stat.trend === "up"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUp className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDown className="mr-1 h-3 w-3" />
                    )}
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Performance Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-border bg-muted/20 flex h-[300px] items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <LineChart className="text-muted-foreground mx-auto mb-2 h-12 w-12" />
                <p className="text-muted-foreground text-sm">
                  Performance chart coming soon
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Active Strategies */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Active Strategies</CardTitle>
              <Link to="/strategies">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentStrategies.map((strategy) => (
                  <div
                    key={strategy.id}
                    className="border-border hover:bg-accent flex items-center justify-between rounded-lg border p-4 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{strategy.name}</h3>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            strategy.status === "active"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                          }`}
                        >
                          {strategy.status}
                        </span>
                      </div>
                      <div className="text-muted-foreground mt-1 flex gap-4 text-sm">
                        <span>{strategy.trades} trades</span>
                        <span>{strategy.winRate} win rate</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          strategy.pnl.startsWith("+")
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {strategy.pnl}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {strategy.pnlPercent}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Trades */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Trades</CardTitle>
              <Link to="/trade-history">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTrades.map((trade) => (
                  <div
                    key={trade.id}
                    className="border-border hover:bg-accent flex items-center justify-between rounded-lg border p-4 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{trade.symbol}</h3>
                        <span
                          className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                            trade.side === "BUY"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "bg-red-500/10 text-red-600 dark:text-red-400"
                          }`}
                        >
                          {trade.side}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {trade.strategy}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {trade.entry} → {trade.exit}
                      </p>
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
                      <p className="text-muted-foreground text-xs">
                        {trade.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
