import { Calendar, CirclePlay, Loader2 } from "lucide-react";
import { useState, type FC } from "react";
import { Link, useNavigate, useParams } from "react-router";

import EquityGraph from "@/components/EquityGraph";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import DashboardLayout from "@/components/layouts/dashboard-layout";
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
  useBacktestOrders,
  useBacktestQuery,
} from "@/hooks/queries/backtest-hooks";
import type { OrderResponseOutput } from "@/openapi";

const BacktestResultsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  // Fetch backtest details with metrics
  const {
    data: backtestResponse,
    isLoading: isLoadingBacktest,
    error: backtestError,
  } = useBacktestQuery(id || "");

  // Fetch backtest orders/trades with pagination
  const { data: ordersResponse, isLoading: isLoadingOrders } =
    useBacktestOrders(id || "", {
      skip: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
    });

  const backtest = backtestResponse?.data;
  const metrics = backtest?.metrics;
  const orders = ordersResponse?.data || [];

  const isLoading = isLoadingBacktest || isLoadingOrders;

  // Mock monthly returns (this would come from the API in a real implementation)
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) {
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

  if (backtestError || !backtest) {
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
                {backtestError?.message || "Backtest not found"}
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
              Starting Balance: ${backtest.starting_balance}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate(`/replay/backtest/${id}`)}
            >
              <CirclePlay className="mr-2 h-4 w-4" />
              Replay
            </Button>
          </div>
        </div>

        {/* Equity Curve with Statistics */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Statistics Card */}
          <PerformanceMetrics
            totalPnl={metrics.realised_pnl}
            returnPercentage={metrics.total_return * 100}
            totalTrades={metrics.total_trades}
            winRate={metrics.win_rate * 100}
            avgWin={0}
            avgLoss={0}
            sharpeRatio={metrics.sharpe_ratio}
            maxDrawdown={metrics.max_drawdown * 100}
          />

          {/* Equity Graph */}
          <EquityGraph
            equityData={undefined}
            drawdownData={undefined}
            title="Equity Curve"
          />
        </div>

        {/* Monthly Returns */}
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

        {/* Trades Table */}
        {orders.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Trade History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Side</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Filled</TableHead>
                    <TableHead>Avg Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order: OrderResponseOutput) => (
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
              {/* Pagination would go here if we had total count from API */}
              <div className="mt-4 flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="text-muted-foreground mx-4 flex items-center text-sm">
                  Page {page}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={orders.length < itemsPerPage}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <h3 className="mb-2 text-lg font-semibold">No Trades Found</h3>
              <p className="text-muted-foreground text-sm">
                This backtest has no recorded trades
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BacktestResultsPage;
