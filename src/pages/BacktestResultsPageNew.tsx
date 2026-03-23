import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Loader2,
} from "lucide-react";
import { memo, useEffect, useState, type FC } from "react";
import { Link, useParams } from "react-router";

import EquityGraphNew from "@/components/equity-graph-new";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import PerformanceMetricsCard from "@/components/performance-metrics-card";
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
import { type EquityCurvePoint, type OrderResponse } from "@/openapi";

const MOCKS_ENABLED = true;

const MOCK_BACKTEST = {
  backtest_id: "bt_01JX9YQ8K7M4N2P6R8S1T3U5V",
  strategy_id: "strat_01JX9Y9C4D6E7F8G9H0J1K2L3",
  symbol: "AAPL",
  starting_balance: 10000,
  status: "completed",
  created_at: "2026-03-01T09:30:00.000Z",
  metrics: {
    realised_pnl: 1842.67,
    unrealised_pnl: 0,
    total_return_pct: 18.43,
    sharpe_ratio: 1.72,
    max_drawdown: -6.81,
    total_orders: 24,
    equity_curve: [
      { timestamp: "2026-03-01T09:30:00.000Z", value: 10000 },
      { timestamp: "2026-03-02T09:30:00.000Z", value: 10085 },
      { timestamp: "2026-03-03T09:30:00.000Z", value: 10140 },
      { timestamp: "2026-03-04T09:30:00.000Z", value: 10090 },
      { timestamp: "2026-03-05T09:30:00.000Z", value: 10235 },
      { timestamp: "2026-03-06T09:30:00.000Z", value: 10310 },
      { timestamp: "2026-03-07T09:30:00.000Z", value: 10260 },
      { timestamp: "2026-03-08T09:30:00.000Z", value: 10420 },
      { timestamp: "2026-03-09T09:30:00.000Z", value: 10510 },
      { timestamp: "2026-03-10T09:30:00.000Z", value: 10470 },
      { timestamp: "2026-03-11T09:30:00.000Z", value: 10640 },
      { timestamp: "2026-03-12T09:30:00.000Z", value: 10720 },
      { timestamp: "2026-03-13T09:30:00.000Z", value: 10810 },
      { timestamp: "2026-03-14T09:30:00.000Z", value: 10755 },
      { timestamp: "2026-03-15T09:30:00.000Z", value: 10920 },
      { timestamp: "2026-03-16T09:30:00.000Z", value: 11035 },
      { timestamp: "2026-03-17T09:30:00.000Z", value: 11110 },
      { timestamp: "2026-03-18T09:30:00.000Z", value: 11040 },
      { timestamp: "2026-03-19T09:30:00.000Z", value: 11225 },
      { timestamp: "2026-03-20T09:30:00.000Z", value: 11310 },
      { timestamp: "2026-03-21T09:30:00.000Z", value: 11455 },
      { timestamp: "2026-03-22T09:30:00.000Z", value: 11842.67 },
    ],
  },
} satisfies {
  backtest_id: string;
  strategy_id: string;
  symbol: string;
  starting_balance: number;
  status: string;
  created_at: string;
  metrics: {
    realised_pnl: number;
    unrealised_pnl: number;
    total_return_pct: number;
    sharpe_ratio: number;
    max_drawdown: number;
    total_orders: number;
    equity_curve: EquityCurvePoint[];
  };
};

const MOCK_BACKTEST_ORDERS: OrderResponse[] = [
  {
    order_id: "ord_001",
    symbol: "AAPL",
    side: "buy",
    order_type: "market",
    quantity: 10,
    notional: null,
    filled_quantity: 10,
    limit_price: null,
    stop_price: null,
    average_fill_price: 182.45,
    status: "filled",
    submitted_at: "2026-03-01T14:35:00.000Z",
    filled_at: "2026-03-01T14:35:02.000Z",
    broker_order_id: null,
  },
  {
    order_id: "ord_002",
    symbol: "AAPL",
    side: "sell",
    order_type: "market",
    quantity: 10,
    notional: null,
    filled_quantity: 10,
    limit_price: null,
    stop_price: null,
    average_fill_price: 186.2,
    status: "filled",
    submitted_at: "2026-03-02T15:10:00.000Z",
    filled_at: "2026-03-02T15:10:01.000Z",
    broker_order_id: null,
  },
  {
    order_id: "ord_003",
    symbol: "AAPL",
    side: "buy",
    order_type: "limit",
    quantity: 12,
    notional: null,
    filled_quantity: 12,
    limit_price: 184.1,
    stop_price: null,
    average_fill_price: 184.1,
    status: "filled",
    submitted_at: "2026-03-04T13:20:00.000Z",
    filled_at: "2026-03-04T13:22:10.000Z",
    broker_order_id: null,
  },
  {
    order_id: "ord_004",
    symbol: "AAPL",
    side: "sell",
    order_type: "market",
    quantity: 12,
    notional: null,
    filled_quantity: 12,
    limit_price: null,
    stop_price: null,
    average_fill_price: 187.95,
    status: "filled",
    submitted_at: "2026-03-05T18:05:00.000Z",
    filled_at: "2026-03-05T18:05:01.000Z",
    broker_order_id: null,
  },
  {
    order_id: "ord_005",
    symbol: "AAPL",
    side: "buy",
    order_type: "market",
    quantity: 8,
    notional: null,
    filled_quantity: 8,
    limit_price: null,
    stop_price: null,
    average_fill_price: 188.55,
    status: "filled",
    submitted_at: "2026-03-07T14:00:00.000Z",
    filled_at: "2026-03-07T14:00:01.000Z",
    broker_order_id: null,
  },
  {
    order_id: "ord_006",
    symbol: "AAPL",
    side: "sell",
    order_type: "stop",
    quantity: 8,
    notional: null,
    filled_quantity: 8,
    limit_price: null,
    stop_price: 186.4,
    average_fill_price: 186.4,
    status: "filled",
    submitted_at: "2026-03-08T16:45:00.000Z",
    filled_at: "2026-03-08T16:45:00.000Z",
    broker_order_id: null,
  },
  {
    order_id: "ord_007",
    symbol: "AAPL",
    side: "buy",
    order_type: "market",
    quantity: 15,
    notional: null,
    filled_quantity: 15,
    limit_price: null,
    stop_price: null,
    average_fill_price: 189.25,
    status: "filled",
    submitted_at: "2026-03-09T14:50:00.000Z",
    filled_at: "2026-03-09T14:50:01.000Z",
    broker_order_id: null,
  },
  {
    order_id: "ord_008",
    symbol: "AAPL",
    side: "sell",
    order_type: "limit",
    quantity: 15,
    notional: null,
    filled_quantity: 15,
    limit_price: 193.8,
    stop_price: null,
    average_fill_price: 193.8,
    status: "filled",
    submitted_at: "2026-03-11T15:25:00.000Z",
    filled_at: "2026-03-11T15:40:20.000Z",
    broker_order_id: null,
  },
  {
    order_id: "ord_009",
    symbol: "AAPL",
    side: "buy",
    order_type: "market",
    quantity: 20,
    notional: null,
    filled_quantity: 20,
    limit_price: null,
    stop_price: null,
    average_fill_price: 191.15,
    status: "filled",
    submitted_at: "2026-03-13T14:10:00.000Z",
    filled_at: "2026-03-13T14:10:01.000Z",
    broker_order_id: null,
  },
  {
    order_id: "ord_010",
    symbol: "AAPL",
    side: "sell",
    order_type: "market",
    quantity: 20,
    notional: null,
    filled_quantity: 20,
    limit_price: null,
    stop_price: null,
    average_fill_price: 195.05,
    status: "filled",
    submitted_at: "2026-03-15T19:00:00.000Z",
    filled_at: "2026-03-15T19:00:01.000Z",
    broker_order_id: null,
  },
  {
    order_id: "ord_011",
    symbol: "AAPL",
    side: "buy",
    order_type: "limit",
    quantity: 14,
    notional: null,
    filled_quantity: 14,
    limit_price: 194.2,
    stop_price: null,
    average_fill_price: 194.2,
    status: "filled",
    submitted_at: "2026-03-16T13:40:00.000Z",
    filled_at: "2026-03-16T13:42:45.000Z",
    broker_order_id: null,
  },
  {
    order_id: "ord_012",
    symbol: "AAPL",
    side: "sell",
    order_type: "market",
    quantity: 14,
    notional: null,
    filled_quantity: 14,
    limit_price: null,
    stop_price: null,
    average_fill_price: 198.65,
    status: "filled",
    submitted_at: "2026-03-18T17:15:00.000Z",
    filled_at: "2026-03-18T17:15:01.000Z",
    broker_order_id: null,
  },
];

const MOCK_MONTHLY_RETURNS = [
  { month: "Jan", return: 4.2 },
  { month: "Feb", return: 6.8 },
  { month: "Mar", return: 7.43 },
];

// Internal Components

interface BacktestResultsHeaderProps {
  backtestId: string;
  symbol: string;
  startingBalance: number;
}

const BacktestResultsHeader: FC<BacktestResultsHeaderProps> = memo(
  ({ symbol, startingBalance }) => {
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
          <Button variant="outline" disabled>
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
  equityCurve?: EquityCurvePoint[];
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
        <PerformanceMetricsCard
          realisedPnl={totalPnl}
          unrealisedPnl={0}
          totalReturnPct={returnPercentage / 100}
          sharpeRatio={sharpeRatio}
          maxDrawdown={maxDrawdown / 100}
        />
        <EquityGraphNew equityData={equityCurve} title="Equity Curve" />
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
    // const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [orders, setOrders] = useState<OrderResponse[]>(MOCK_BACKTEST_ORDERS);

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
      <Card className="border-0 bg-transparent">
        <CardHeader>
          <CardTitle>Trade History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
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
                .map((order: OrderResponse) => (
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
            <span className="text-muted-foreground flex w-15 items-center justify-center text-sm">
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

const BacktestResultsPageNew: FC = () => {
  const { id } = useParams<{ id: string }>();

  const backtestQuery = useBacktestQuery(id || "");

  //   const backtest = backtestQuery?.data;
  const backtest = MOCK_BACKTEST;
  const metrics = backtest?.metrics;

  if (!MOCKS_ENABLED && backtestQuery.isLoading) {
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

  if ((!MOCKS_ENABLED && backtestQuery.error) || !backtest) {
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
          startingBalance={backtest.starting_balance}
        />

        {/* Equity Curve with Statistics */}
        <BacktestStatisticsSection
          totalPnl={metrics.realised_pnl}
          returnPercentage={metrics.total_return_pct}
          totalTrades={metrics.total_orders}
          sharpeRatio={metrics.sharpe_ratio}
          maxDrawdown={metrics.max_drawdown}
          equityCurve={metrics.equity_curve}
        />

        {/* Trades Table with its own pagination */}
        <BacktestTradesTable backtestId={id || ""} />
      </div>
    </DashboardLayout>
  );
};

export default BacktestResultsPageNew;
