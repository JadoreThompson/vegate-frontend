import {
  ArrowDown,
  ArrowUp,
  Bot,
  DollarSign,
  LineChart,
  Plus,
  TrendingUp,
} from "lucide-react";
import { type FC, useMemo } from "react";
import { Link } from "react-router";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBacktestsQuery } from "@/hooks/queries/backtest-hooks";
import { useStrategySummariesQuery } from "@/hooks/queries/strategy-hooks";
import type { BacktestResponse } from "@/openapi";

const DashboardPage: FC = () => {
  // Fetch strategy summaries with metrics
  const { data: strategiesData, isLoading: strategiesLoading } =
    useStrategySummariesQuery({ limit: 100 });

  // Fetch recent backtests to show as proxy for trades
  const { data: backtestsData, isLoading: backtestsLoading } =
    useBacktestsQuery({
      limit: 5,
    });

  // Calculate aggregate stats from strategy summaries
  const stats = useMemo(() => {
    if (!strategiesData?.data) {
      return [
        {
          title: "Total Portfolio Value",
          value: "$0.00",
          change: "+0%",
          trend: "up" as const,
          icon: DollarSign,
        },
        {
          title: "Active Strategies",
          value: "0",
          change: "No strategies yet",
          trend: "up" as const,
          icon: Bot,
        },
        {
          title: "Total Return",
          value: "+0%",
          change: "+0% this month",
          trend: "up" as const,
          icon: TrendingUp,
        },
        {
          title: "Win Rate",
          value: "0%",
          change: "No trades yet",
          trend: "up" as const,
          icon: LineChart,
        },
      ];
    }

    const strategies = strategiesData.data;
    const totalStrategies = strategies.length;

    // Calculate average metrics across all strategies
    const avgReturn =
      strategies.reduce(
        (sum: number, s: { metrics: { total_return: number } }) =>
          sum + (s.metrics?.total_return || 0),
        0,
      ) / (totalStrategies || 1);
    const avgWinRate =
      strategies.reduce(
        (sum: number, s: { metrics: { win_rate: number } }) =>
          sum + (s.metrics?.win_rate || 0),
        0,
      ) / (totalStrategies || 1);

    // Note: Without actual portfolio value data, we show aggregated metrics
    return [
      {
        title: "Active Strategies",
        value: totalStrategies.toString(),
        change:
          totalStrategies > 0
            ? `${totalStrategies} total`
            : "Create your first",
        trend: "up",
        icon: Bot,
      },
      {
        title: "Avg Strategy Return",
        value: `${avgReturn > 0 ? "+" : ""}${avgReturn.toFixed(2)}%`,
        change: "Across all strategies",
        trend: avgReturn >= 0 ? "up" : "down",
        icon: TrendingUp,
      },
      {
        title: "Avg Win Rate",
        value: `${avgWinRate.toFixed(1)}%`,
        change: "Across all strategies",
        trend: avgWinRate >= 50 ? "up" : "down",
        icon: LineChart,
      },
      {
        title: "Total Backtests",
        value: (backtestsData?.data?.length || 0).toString(),
        change: "Historical tests",
        trend: "up",
        icon: DollarSign,
      },
    ];
  }, [strategiesData, backtestsData]);

  // Get top strategies by total return
  const topStrategies = useMemo(() => {
    if (!strategiesData?.data) return [];
    return [...strategiesData.data]
      .sort(
        (a, b) =>
          (b.metrics?.total_return || 0) - (a.metrics?.total_return || 0),
      )
      .slice(0, 4);
  }, [strategiesData]);

  // Get recent backtests as proxy for trades
  const recentBacktests = useMemo(() => {
    return backtestsData?.data || [];
  }, [backtestsData]);

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
          {strategiesLoading || backtestsLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-4 rounded" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="mb-2 h-8 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </CardContent>
                </Card>
              ))
            : stats.map((stat) => {
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
              <CardTitle>Top Strategies</CardTitle>
              <Link to="/strategies">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {strategiesLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="border-border rounded-lg border p-4"
                    >
                      <Skeleton className="mb-2 h-5 w-48" />
                      <Skeleton className="mb-2 h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))}
                </div>
              ) : topStrategies.length > 0 ? (
                <div className="space-y-4">
                  {topStrategies.map((strategy) => (
                    <Link
                      key={strategy.id}
                      to={`/strategies/${strategy.id}`}
                      className="border-border hover:bg-accent flex items-center justify-between rounded-lg border p-4 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{strategy.name}</h3>
                        </div>
                        <div className="text-muted-foreground mt-1 flex gap-4 text-sm">
                          <span>
                            {strategy.metrics?.win_rate
                              ? `${strategy.metrics.win_rate.toFixed(1)}% win rate`
                              : "No data"}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            (strategy.metrics?.total_return || 0) >= 0
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {(strategy.metrics?.total_return || 0) >= 0
                            ? "+"
                            : ""}
                          {(strategy.metrics?.total_return || 0).toFixed(2)}%
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Total Return
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="border-border flex h-32 items-center justify-center rounded-lg border border-dashed">
                  <p className="text-muted-foreground text-sm">
                    No strategies yet. Create your first strategy to get
                    started.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Backtests */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Backtests</CardTitle>
              <Link to="/backtests">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {backtestsLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="border-border rounded-lg border p-4"
                    >
                      <Skeleton className="mb-2 h-5 w-48" />
                      <Skeleton className="mb-2 h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))}
                </div>
              ) : recentBacktests.length > 0 ? (
                <div className="space-y-4">
                  {recentBacktests.map((backtest: BacktestResponse) => (
                    <Link
                      key={backtest.backtest_id}
                      to={`/backtests/${backtest.backtest_id}`}
                      className="border-border hover:bg-accent flex items-center justify-between rounded-lg border p-4 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">
                            Backtest {backtest.symbol}
                          </h3>
                          <span
                            className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                              backtest.status === "completed"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : backtest.status === "in_progress"
                                  ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                  : backtest.status === "failed"
                                    ? "bg-red-500/10 text-red-600 dark:text-red-400"
                                    : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                            }`}
                          >
                            {backtest.status}
                          </span>
                        </div>
                        <p className="text-muted-foreground mt-1 text-sm">
                          {new Date(backtest.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground text-xs">
                          View details
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="border-border flex h-32 items-center justify-center rounded-lg border border-dashed">
                  <p className="text-muted-foreground text-sm">
                    No backtests yet. Run a backtest to see results here.
                  </p>
                </div>
              )}
              <div className="border-border mt-4 rounded-lg border bg-blue-50 p-3 dark:bg-blue-950/20">
                <p className="text-muted-foreground text-xs">
                  📊 <strong>Note:</strong> Live trading is not yet available.
                  These are backtest results showing historical performance.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
