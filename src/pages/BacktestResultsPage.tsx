import { Calendar, ChevronLeft, ChevronRight, CirclePlay, Loader2 } from "lucide-react";
import { memo, useEffect, useMemo, useState, type FC } from "react";
import { Link, useNavigate, useParams } from "react-router";

import EquityGraph from "@/components/equity-graph";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import PerformanceMetrics from "@/components/performance-metrics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useBacktestOrdersQuery,
  useBacktestQuery,
} from "@/hooks/queries/backtest-hooks";
import type { OrderResponseOutput } from "@/openapi";

// Internal Components

interface BacktestResultsHeaderProps {
  backtestId: string;
  symbol: string;
  startingBalance: number;
}

const BacktestResultsHeader: FC<BacktestResultsHeaderProps> = memo(
  ({ backtestId, symbol, startingBalance }) => {
    const navigate = useNavigate();

    return (
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Link
              to="/backtests"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Backtests
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm">{symbol}</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            Backtest Results
          </h2>
          <p className="text-muted-foreground text-sm">
            Starting Balance: ${startingBalance}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/replay/backtest/${backtestId}`)}
          >
            <CirclePlay className="mr-2 h-4 w-4" />
            Replay
          </Button>
        </div>
      </div>
    );
  },
);

BacktestResultsHeader.displayName = "BacktestResultsHeader";

interface BacktestStatisticsSectionProps {
  totalPnl: number;
  returnPercentage: number;
  totalTrades: number;
  sharpeRatio: number;
  maxDrawdown: number;
  equityCurve?: [string, number | string][];
}

const BacktestStatisticsSection: FC<BacktestStatisticsSectionProps> = memo(
  ({
    totalPnl,
    returnPercentage,
    totalTrades,
    sharpeRatio,
    maxDrawdown,
    equityCurve,
  }) => {
    return (
      <div className="flex flex-col gap-4 lg:flex-row">
        <PerformanceMetrics
          totalPnl={totalPnl}
          returnPercentage={returnPercentage}
          totalTrades={totalTrades}
          sharpeRatio={sharpeRatio}
          maxDrawdown={maxDrawdown}
        />
        <EquityGraph equityData={equityCurve} title="Equity Curve" />
      </div>
    );
  },
);

BacktestStatisticsSection.displayName = "BacktestStatisticsSection";

interface MonthlyReturn {
  month: string;
  return: number;
}

interface BacktestMonthlyReturnsProps {
  monthlyReturns: MonthlyReturn[];
}

const BacktestMonthlyReturns: FC<BacktestMonthlyReturnsProps> = memo(
  ({ monthlyReturns }) => {
    return (
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
                className="border-border rounded-lg border p-3 text-center"
              >
                <p className="text-muted-foreground mb-1 text-xs">
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
    );
  },
);

BacktestMonthlyReturns.displayName = "BacktestMonthlyReturns";

interface BacktestTradesTableProps {
  backtestId: string;
}

const BacktestTradesTable: FC<BacktestTradesTableProps> = memo(
  ({ backtestId }) => {
    const [page, setPage] = useState(1);
    const [orders, setOrders] = useState<OrderResponseOutput[]>([]);

    const backtestOrdersQuery = useBacktestOrdersQuery(backtestId, {
      skip: (page - 1) * 90,
      limit: 91,
    });

    const itemsPerPage = 10;

    useEffect(() => {
      if (backtestOrdersQuery.data?.length) {
        setOrders((prev) => {
          const ids = new Set(prev.map((o) => o.order_id));
          const newOnes = backtestOrdersQuery.data.filter(
            (o) => !ids.has(o.order_id),
          );
          return [...prev, ...newOnes];
        });
      }
    }, [backtestOrdersQuery.data]);

    const handlePageChange = (newPage: number) => {
      setPage(newPage);
    };

    if (orders.length === 0 && !backtestOrdersQuery.isLoading) {
      return (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <h3 className="mb-2 text-lg font-semibold">No Trades Found</h3>
            <p className="text-muted-foreground text-sm">
              This backtest has no recorded trades
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="bg-transparent border-0">
        <CardHeader>
          <CardTitle>Trade History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-500">Symbol</TableHead>
                <TableHead className="text-gray-500">Side</TableHead>
                <TableHead className="text-gray-500">Type</TableHead>
                <TableHead className="text-gray-500">Quantity</TableHead>
                <TableHead className="text-gray-500">Filled</TableHead>
                <TableHead className="text-gray-500">Avg Price</TableHead>
                <TableHead className="text-gray-500">Status</TableHead>
                <TableHead className="text-gray-500">Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders
                .slice((page - 1) * 10, page * 10)
                .map((order: OrderResponseOutput) => (
                  <TableRow key={order.order_id}>
                    <TableCell className="font-semibold">
                      {order.symbol}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`rounded px-2 py-0.5 text-xs font-medium ${
                          order.side.toLowerCase() === "buy"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-red-500/10 text-red-600 dark:text-red-400"
                        }`}
                      >
                        {order.side}
                      </span>
                    </TableCell>
                    <TableCell>{order.order_type}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.filled_quantity}</TableCell>
                    <TableCell>
                      {order.average_fill_price
                        ? `$${order.average_fill_price}`
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <span className="text-xs">{order.status}</span>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(order.submitted_at).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="hover:!bg-transparent"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              {/* Previous */}
              <ChevronLeft />
            </Button>
            <span className="w-15  text-muted-foreground flex items-center justify-center text-sm">
              Page {page}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="hover:!bg-transparent"
              onClick={() => handlePageChange(page + 1)}
              disabled={orders.length <= page * itemsPerPage}
            >
              <ChevronRight />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  },
);

BacktestTradesTable.displayName = "BacktestTradesTable";

// Main Component

const BacktestResultsPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch backtest details with metrics
  // const {
  //   data: backtestResponse,
  //   isLoading: isLoadingBacktest,
  //   error: backtestError,
  // } = useBacktestQuery(id || "");
  const backtestQuery = useBacktestQuery(id || "");

  const backtest = backtestQuery?.data;
  const metrics = backtest?.metrics;
  console.log(metrics);

  // Mock monthly returns (this would come from the API in a real implementation)
  // Memoize to prevent recreation on every render
  const monthlyReturns = useMemo(
    () => [
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
      { month: "Dec", return: 3.9 },
    ],
    [],
  );

  if (backtestQuery.isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-96" />
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row">
            <Skeleton className="h-80 w-full lg:w-1/4" />
            <Skeleton className="h-80 flex-1" />
          </div>

          <Skeleton className="h-64 w-full" />
        </div>
      </DashboardLayout>
    );
  }

  if (backtestQuery.error || !backtest) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Link
            to="/backtests"
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            ← Back to Backtests
          </Link>

          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <h3 className="mb-2 text-lg font-semibold">
                Error loading backtest
              </h3>
              <p className="text-muted-foreground text-sm">
                {backtestQuery.error?.message || "Backtest not found"}
              </p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // Check if backtest has metrics
  if (!metrics) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Link
                  to="/backtests"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Backtests
                </Link>
                <span className="text-muted-foreground">/</span>
                <span className="text-sm">{backtest.symbol}</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Backtest Results
              </h2>
              <p className="text-muted-foreground">
                Status: {backtest.status.replace("_", " ")}
              </p>
            </div>
          </div>

          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Loader2 className="text-muted-foreground mb-4 h-12 w-12 animate-spin" />
              <h3 className="mb-2 text-lg font-semibold">
                {backtest.status === "pending"
                  ? "Backtest Pending"
                  : backtest.status === "in_progress"
                    ? "Backtest In Progress"
                    : "No Results Available"}
              </h3>
              <p className="text-muted-foreground text-sm">
                {backtest.status === "pending"
                  ? "This backtest is queued and will start soon"
                  : backtest.status === "in_progress"
                    ? "This backtest is currently running. Results will appear here when complete."
                    : "This backtest has not completed successfully"}
              </p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <BacktestResultsHeader
          backtestId={id || ""}
          symbol={backtest.symbol}
          startingBalance={Number.parseFloat(backtest.starting_balance)}
        />

        {/* Equity Curve with Statistics */}
        <BacktestStatisticsSection
          totalPnl={metrics.realised_pnl}
          returnPercentage={metrics.total_return_pct}
          totalTrades={metrics.total_trades}
          sharpeRatio={metrics.sharpe_ratio}
          maxDrawdown={metrics.max_drawdown}
          // equityCurve={(metrics as any).equity_curve}
          equityCurve={metrics.equity_curve}
        />

        {/* Monthly Returns */}
        {/* <BacktestMonthlyReturns monthlyReturns={monthlyReturns} /> */}

        {/* Trades Table with its own pagination */}
        <BacktestTradesTable backtestId={id || ""} />
      </div>
    </DashboardLayout>
  );
};

export default BacktestResultsPage;
