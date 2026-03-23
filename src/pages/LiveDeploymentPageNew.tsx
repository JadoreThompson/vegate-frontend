import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  MoreVertical,
  PlayCircle,
  StopCircle,
} from "lucide-react";
import { useEffect, useState, type FC } from "react";
import { Link, useNavigate, useParams } from "react-router";

import EquityGraphNew from "@/components/equity-graph-new";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import LiveLogs from "@/components/live-logs";
import PerformanceMetricsCard from "@/components/performance-metrics-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBrokerConnectionQuery } from "@/hooks/queries/broker-hooks";
import {
  useDeploymentDetailsQuery,
  useDeploymentOrders,
  useDeploymentQuery,
  useStopDeploymentMutation,
} from "@/hooks/queries/deployment-hooks";
import { DeploymentStatus, type OrderResponse } from "@/openapi";

const MOCKS_ENABLED = true;

const MOCK_DEPLOYMENT = {
  deployment_id: "dep_live_01",
  strategy_id: "strat_momentum_01",
  broker_connection_id: "conn_alpaca_01",
  symbol: "AAPL",
  timeframe: "15m",
  starting_balance: 25000,
  status: DeploymentStatus.running,
  error_message: null,
  created_at: "2026-03-18T13:45:00Z",
  updated_at: "2026-03-23T14:12:00Z",
  stopped_at: null,
};

const MOCK_EQUITY_CURVE = [
  { timestamp: "2026-03-18T14:00:00Z", value: 25000 },
  { timestamp: "2026-03-18T16:00:00Z", value: 25080 },
  { timestamp: "2026-03-19T10:00:00Z", value: 25140 },
  { timestamp: "2026-03-19T12:00:00Z", value: 25095 },
  { timestamp: "2026-03-19T15:30:00Z", value: 25220 },
  { timestamp: "2026-03-20T10:30:00Z", value: 25290 },
  { timestamp: "2026-03-20T13:00:00Z", value: 25210 },
  { timestamp: "2026-03-20T16:00:00Z", value: 25385 },
  { timestamp: "2026-03-21T11:00:00Z", value: 25410 },
  { timestamp: "2026-03-21T14:30:00Z", value: 25340 },
  { timestamp: "2026-03-21T16:00:00Z", value: 25495 },
  { timestamp: "2026-03-22T10:00:00Z", value: 25580 },
  { timestamp: "2026-03-22T12:30:00Z", value: 25510 },
  { timestamp: "2026-03-22T15:45:00Z", value: 25660 },
  { timestamp: "2026-03-23T09:45:00Z", value: 25720 },
  { timestamp: "2026-03-23T11:15:00Z", value: 25835 },
  { timestamp: "2026-03-23T12:45:00Z", value: 25790 },
  { timestamp: "2026-03-23T14:00:00Z", value: 25910 },
];

const MOCK_DEPLOYMENT_DETAILS = {
  deployment_id: "dep_live_01",
  strategy_id: "strat_momentum_01",
  broker_connection_id: "conn_alpaca_01",
  symbol: "AAPL",
  timeframe: "15m",
  starting_balance: 25000,
  status: DeploymentStatus.running,
  error_message: null,
  created_at: "2026-03-18T13:45:00Z",
  updated_at: "2026-03-23T14:12:00Z",
  stopped_at: null,
  metrics: {
    realised_pnl: 684.5,
    unrealised_pnl: 225.75,
    total_return_pct: 3.64,
    sharpe_ratio: 1.87,
    max_drawdown: 1.92,
    total_trades: 24,
    equity_curve: MOCK_EQUITY_CURVE,
  },
};

const MOCK_BROKER_CONNECTION = {
  connection_id: "conn_alpaca_01",
  broker: "alpaca",
  broker_account_id: "PA83K2Q9LMN4X7T1",
};

const MOCK_ORDERS: OrderResponse[] = [
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
    average_fill_price: 171.24,
    status: "filled",
    submitted_at: "2026-03-18T14:05:00Z",
    filled_at: "2026-03-18T14:05:02Z",
    broker_order_id: "alp_001",
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
    average_fill_price: 172.01,
    status: "filled",
    submitted_at: "2026-03-18T15:40:00Z",
    filled_at: "2026-03-18T15:40:01Z",
    broker_order_id: "alp_002",
  },
  {
    order_id: "ord_003",
    symbol: "AAPL",
    side: "buy",
    order_type: "limit",
    quantity: 12,
    notional: null,
    filled_quantity: 12,
    limit_price: 171.8,
    stop_price: null,
    average_fill_price: 171.8,
    status: "filled",
    submitted_at: "2026-03-19T10:12:00Z",
    filled_at: "2026-03-19T10:13:10Z",
    broker_order_id: "alp_003",
  },
  {
    order_id: "ord_024",
    symbol: "AAPL",
    side: "buy",
    order_type: "limit",
    quantity: 12,
    notional: null,
    filled_quantity: 0,
    limit_price: 174.6,
    stop_price: null,
    average_fill_price: null,
    status: "new",
    submitted_at: "2026-03-23T14:05:00Z",
    filled_at: null,
    broker_order_id: "alp_024",
  },
];

const MOCK_LOGS: LogEntry[] = [
  {
    id: 1,
    timestamp: "2026-03-23T09:30:01Z",
    level: "INFO",
    message: "Strategy started successfully for AAPL 15m deployment",
  },
  {
    id: 2,
    timestamp: "2026-03-23T09:30:04Z",
    level: "INFO",
    message: "Broker connection authenticated with Alpaca paper account",
  },
  {
    id: 3,
    timestamp: "2026-03-23T09:45:18Z",
    level: "INFO",
    message: "Momentum breakout signal detected above intraday VWAP",
  },
  {
    id: 4,
    timestamp: "2026-03-23T11:40:00Z",
    level: "WARNING",
    message: "Spread widened during entry, slippage tolerance increased",
  },
  {
    id: 5,
    timestamp: "2026-03-23T14:05:00Z",
    level: "ERROR",
    message: "Open limit order remains unfilled after timeout window",
  },
];

type LogEntry = {
  id: number;
  timestamp: string;
  level: "INFO" | "WARNING" | "ERROR";
  message: string;
};

const DeploymentTradesTable: FC<{
  deploymentId: string;
}> = (props) => {
  const [page, setPage] = useState(1);
  // const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [orders, setOrders] = useState<OrderResponse[]>(MOCK_ORDERS);

  const ordersQuery = useDeploymentOrders(props.deploymentId, {
    skip: (page - 1) * 90,
    limit: 91,
  });

  const itemsPerPage = 10;

  useEffect(() => {
    const data = ordersQuery.data as OrderResponse[] | undefined;
    if (data?.length) {
      setOrders((prev) => {
        const ids = new Set(prev.map((o) => o.order_id));
        const newOnes = data.filter((o: OrderResponse) => !ids.has(o.order_id));
        return [...prev, ...newOnes];
      });
    }
  }, [ordersQuery.data]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (orders.length === 0 && !ordersQuery.isLoading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <h3 className="mb-2 text-lg font-semibold">No Trades Found</h3>
          <p className="text-muted-foreground text-sm">
            This deployment has no recorded trades
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
                    {new Date(order.submitted_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="!bg-transparent hover:!bg-transparent"
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
            className="!bg-transparent hover:!bg-transparent"
            onClick={() => handlePageChange(page + 1)}
            disabled={orders.length <= page * itemsPerPage}
          >
            <ChevronRight />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const LiveDeploymentPageNew: FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ deploymentId: string }>();
  const deploymentId = params.deploymentId!;

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 1,
      timestamp: "2024-12-05T10:30:15Z",
      level: "INFO",
      message: "Strategy started successfully",
    },
    {
      id: 2,
      timestamp: "2024-12-05T10:30:20Z",
      level: "INFO",
      message: "Market data connection established",
    },
    {
      id: 3,
      timestamp: "2024-12-05T10:31:45Z",
      level: "INFO",
      message: "Entry signal detected for AAPL at $175.23",
    },
    {
      id: 4,
      timestamp: "2024-12-05T10:32:10Z",
      level: "WARNING",
      message: "High volatility detected, adjusting position size",
    },
    {
      id: 5,
      timestamp: "2024-12-05T10:35:30Z",
      level: "ERROR",
      message: "Order execution failed: Insufficient margin",
    },
  ]);

  // Fetch deployment data
  const deploymentQuery = useDeploymentQuery(deploymentId);
  const deploymentDetailsQuery = useDeploymentDetailsQuery(deploymentId);
  const stopDeploymentMutation = useStopDeploymentMutation();

  // const deployment = deploymentQuery.data;
  const deployment = MOCK_DEPLOYMENT;
  // const deploymentDetails = deploymentDetailsQuery.data;
  const deploymentDetails = MOCK_DEPLOYMENT_DETAILS;

  // Fetch broker connection details
  const brokerConnectionQuery = useBrokerConnectionQuery(
    deployment?.broker_connection_id || "",
  );
  // const brokerConnection = brokerConnectionQuery.data;
  const brokerConnection = MOCK_BROKER_CONNECTION;

  const getStatusBadgeVariant = (status: DeploymentStatus) => {
    switch (status) {
      case DeploymentStatus.running:
        return "default";
      case DeploymentStatus.stopped:
        return "secondary";
      case DeploymentStatus.error:
        return "destructive";
      case DeploymentStatus.pending:
        return "outline";
      default:
        return "secondary";
    }
  };

  const handleStopDeployment = async () => {
    if (!deploymentId) return;

    try {
      await stopDeploymentMutation.mutateAsync(deploymentId);
    } catch (err) {
      console.error("Failed to stop deployment:", err);
    }
  };

  if (
    !MOCKS_ENABLED &&
    (deploymentQuery.isLoading || deploymentDetailsQuery.isLoading)
  ) {
    return (
      <DashboardLayout>
        <div className="flex h-96 items-center justify-center">
          <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (!MOCKS_ENABLED && (deploymentQuery.error || !deployment)) {
    return (
      <DashboardLayout>
        <div className="flex h-96 flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground">
            {deploymentQuery.error
              ? "Failed to load deployment"
              : "Deployment not found"}
          </p>
          <Button onClick={() => navigate("/strategies")}>
            Back to Strategies
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const metrics = deploymentDetails?.metrics;
  const equityCurve = metrics?.equity_curve || [];

  const handleClearLogs = () => {
    setLogs([]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Link
                to="/strategies"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Strategies
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link
                to={`/strategies/${deployment.strategy_id}`}
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Strategy Details
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm">Live Deployment</span>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <h2 className="text-3xl font-bold tracking-tight">
                Live Deployment
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={getStatusBadgeVariant(deployment.status)}>
                  {deployment.status.toUpperCase()}
                </Badge>
                {/* Broker Connection Badge */}
                {brokerConnection && (
                  <Badge variant="outline" className="gap-1">
                    {brokerConnection.broker.toUpperCase()}
                    <span className="text-muted-foreground">
                      • {brokerConnection.broker_account_id.slice(0, 8)}
                    </span>
                  </Badge>
                )}
              </div>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              {deployment.symbol} • {deployment.timeframe} • Started{" "}
              {new Date(deployment.created_at).toLocaleDateString()}
            </p>
            {deployment.error_message && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                Error: {deployment.error_message}
              </p>
            )}
          </div>
          {/* Popover Menu */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="bg-card w-48 p-1">
              <div className="space-y-2">
                {(deployment.status === "running" ||
                  deployment.status === "pending") && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={handleStopDeployment}
                    disabled={stopDeploymentMutation.isPending}
                  >
                    {stopDeploymentMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <StopCircle className="mr-2 h-4 w-4" />
                    )}
                    Stop Deployment
                  </Button>
                )}
                <Button
                  variant="ghost"
                  disabled
                  className="hover:!bg-input/30 w-full justify-start"
                >
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Replay Mode
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Equity Curve with Statistics */}
        {typeof metrics?.total_return_pct === "number" ? (
          <div className="flex flex-col gap-4 lg:flex-row">
            <PerformanceMetricsCard
              realisedPnl={metrics?.realised_pnl ?? 0}
              unrealisedPnl={metrics?.unrealised_pnl ?? 0}
              totalReturnPct={metrics?.total_return_pct / 100}
              sharpeRatio={metrics?.sharpe_ratio}
              maxDrawdown={metrics?.max_drawdown / 100}
            />

            <EquityGraphNew equityData={equityCurve} title="Equity Curve" />
          </div>
        ) : (
          <div className="flex flex-col gap-4 lg:flex-row">
            <Skeleton className="bg-card h-100 w-full"></Skeleton>
          </div>
        )}

        {/* Detailed Metrics */}
        {/* <DetailedMetricsCard metrics={metrics} /> */}

        {/* Monthly Returns */}
        {/* <MonthlyReturnsGrid monthlyReturns={monthlyReturns} /> */}

        {/* Trades and Logs Tabs */}
        <Tabs defaultValue="trades" className="space-y-4">
          <TabsList className="!bg-card">
            <TabsTrigger value="trades">Trade History</TabsTrigger>
            <TabsTrigger value="logs" disabled>
              Live Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="trades"
            className="m-0 border-0 bg-transparent p-0"
          >
            <DeploymentTradesTable deploymentId={deploymentId || ""} />
          </TabsContent>

          <TabsContent value="logs" className="m-0 border-0 bg-transparent p-0">
            <LiveLogs logs={logs} onClearLogs={handleClearLogs} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default LiveDeploymentPageNew;
