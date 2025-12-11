import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useEffect, useMemo, useState, type FC } from "react";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  useBacktestsQuery,
} from "@/hooks/queries/backtest-hooks";
import type { BacktestResponse, OrderResponseOutput } from "@/openapi";

const TradeHistoryPage: FC = () => {
  const [selectedBacktestId, setSelectedBacktestId] = useState<string>("");
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<OrderResponseOutput[]>([]);

  const itemsPerPage = 10;

  // Fetch list of backtests to populate selector
  const backtestsQuery = useBacktestsQuery({
    limit: 100,
  });

  // Fetch orders for selected backtest with over-fetching (fetch 9 pages worth + 1 extra)
  const ordersQuery = useBacktestOrdersQuery(selectedBacktestId, {
    skip: (page - 1) * 90,
    limit: 91,
  });

  const backtestsData = backtestsQuery.data as
    | { data: BacktestResponse[] }
    | undefined;
  const ordersData = ordersQuery.data;

  // Set first backtest as selected when data loads
  useEffect(() => {
    if (
      backtestsData?.data &&
      backtestsData.data.length > 0 &&
      !selectedBacktestId
    ) {
      setSelectedBacktestId(backtestsData.data[0].backtest_id);
    }
  }, [backtestsData, selectedBacktestId]);

  // Accumulate orders as they're fetched
  useEffect(() => {
    if (ordersData?.length) {
      setOrders((prev) => {
        const ids = new Set(prev.map((o) => o.order_id));
        const newOnes = ordersData.filter(
          (o: OrderResponseOutput) => !ids.has(o.order_id),
        );
        return [...prev, ...newOnes];
      });
    }
  }, [ordersData]);

  // Reset orders when backtest changes
  useEffect(() => {
    setOrders([]);
    setPage(1);
  }, [selectedBacktestId]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Calculate summary from orders
  const summary = useMemo(() => {
    if (!orders || orders.length === 0) {
      return {
        totalOrders: 0,
        filledOrders: 0,
        pendingOrders: 0,
      };
    }

    const filledOrders = orders.filter(
      (o: OrderResponseOutput) =>
        o.status === "filled" || o.status === "closed",
    );
    const pendingOrders = orders.filter(
      (o: OrderResponseOutput) => o.status === "pending",
    );

    return {
      totalOrders: orders.length,
      filledOrders: filledOrders.length,
      pendingOrders: pendingOrders.length,
    };
  }, [orders]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Trade History</h2>
            <p className="text-muted-foreground">
              View orders from backtest simulations
            </p>
          </div>
          <Button variant="outline" disabled>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Info Alert */}
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/20">
          <CardContent className="pt-6">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>📊 Note:</strong> Live trading is not yet implemented.
              This page shows orders from backtest simulations. Select a
              backtest below to view its orders. Once live trading is enabled,
              this page will display your actual trade history.
            </p>
          </CardContent>
        </Card>

        {/* Backtest Selector */}
        <Card>
          <CardHeader>
            <CardTitle>Select Backtest</CardTitle>
          </CardHeader>
          <CardContent>
            {backtestsQuery.isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : backtestsData?.data && backtestsData.data.length > 0 ? (
              <Select
                value={selectedBacktestId}
                onValueChange={setSelectedBacktestId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a backtest..." />
                </SelectTrigger>
                <SelectContent>
                  {backtestsData.data.map((backtest: BacktestResponse) => (
                    <SelectItem
                      key={backtest.backtest_id}
                      value={backtest.backtest_id}
                    >
                      {backtest.symbol} - {backtest.status} (
                      {new Date(backtest.created_at).toLocaleDateString()})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="text-muted-foreground text-center text-sm">
                No backtests available. Run a backtest first to view orders.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary Stats */}
        {selectedBacktestId && (
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                {ordersQuery.isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <div className="text-2xl font-bold">
                    {summary.totalOrders}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Filled Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                {ordersQuery.isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {summary.filledOrders}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                {ordersQuery.isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {summary.pendingOrders}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Orders Table */}
        {selectedBacktestId && (
          <Card>
            <CardHeader>
              <CardTitle>
                Orders ({ordersQuery.isLoading ? "..." : orders.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {ordersQuery.isLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Side</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Filled Qty</TableHead>
                        <TableHead className="text-right">
                          Avg Fill Price
                        </TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders
                        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                        .map((order: OrderResponseOutput) => (
                          <TableRow
                            key={order.order_id}
                            className="hover:bg-accent"
                          >
                            <TableCell className="font-mono text-xs">
                              {new Date(order.submitted_at).toLocaleString()}
                            </TableCell>
                            <TableCell className="font-semibold">
                              {order.symbol}
                            </TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${
                                  order.side.toUpperCase() === "BUY"
                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                    : "bg-red-500/10 text-red-600 dark:text-red-400"
                                }`}
                              >
                                {order.side}
                              </span>
                            </TableCell>
                            <TableCell className="text-sm">
                              {order.order_type}
                            </TableCell>
                            <TableCell className="text-right font-mono text-sm">
                              {order.quantity}
                            </TableCell>
                            <TableCell className="text-right font-mono text-sm">
                              {order.filled_quantity}
                            </TableCell>
                            <TableCell className="text-right font-mono text-sm">
                              {order.average_fill_price
                                ? `$${order.average_fill_price}`
                                : "-"}
                            </TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${
                                  order.status === "filled"
                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                    : order.status === "pending"
                                      ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                                      : "bg-gray-500/10 text-gray-600 dark:text-gray-400"
                                }`}
                              >
                                {order.status}
                              </span>
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
                </div>
              ) : (
                <div className="border-border flex h-32 items-center justify-center rounded-lg border border-dashed">
                  <p className="text-muted-foreground text-sm">
                    No orders found for this backtest.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TradeHistoryPage;
