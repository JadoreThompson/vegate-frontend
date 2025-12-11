import {
  Calendar,
  Loader2,
  MoreVertical,
  PlayCircle,
  StopCircle,
} from "lucide-react";
import { type FC, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import EquityGraph from "@/components/EquityGraph";
import LiveLogs, { type LogEntry } from "@/components/LiveLogs";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import TradesTable, { type Trade } from "@/components/TradesTable";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useBrokerConnectionQuery } from "@/hooks/queries/broker-hooks";
import {
  useDeployment,
  useStopDeployment,
} from "@/hooks/queries/deployment-hooks";
import { queryKeys } from "@/lib/query/query-keys";
import { handleApi } from "@/lib/utils/base";
import {
  getDeploymentOrdersEndpointDeploymentsDeploymentIdOrdersGet,
  type OrderResponseOutput,
  StrategyDeploymentStatus,
} from "@/openapi";
import { useQuery } from "@tanstack/react-query";

// Internal Components
interface SummaryMetricCardProps {
  title: string;
  value: string | number;
  subtitle: React.ReactNode;
  icon: React.ReactNode;
  valueColor?: string;
}

const SummaryMetricCard: FC<SummaryMetricCardProps> = (props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{props.title}</CardTitle>
        {props.icon}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${props.valueColor || ""}`}>
          {props.value}
        </div>
        <p className="text-muted-foreground text-xs">{props.subtitle}</p>
      </CardContent>
    </Card>
  );
};

interface DetailedMetricsCardProps {
  metrics: {
    totalReturn: number;
    sharpeRatio: number;
    maxDrawdown: number;
    profitFactor: number;
    expectancy: number;
    avgWin: number;
    avgLoss: number;
    largestWin: number;
    largestLoss: number;
    totalTrades: number;
    winRate: number;
    avgTradeDuration: string;
  };
}

const DetailedMetricsCard: FC<DetailedMetricsCardProps> = (props) => {
  return (
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
                <span className="text-muted-foreground text-sm">
                  Total Return
                </span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  +{props.metrics.totalReturn}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">
                  Sharpe Ratio
                </span>
                <span className="font-medium">{props.metrics.sharpeRatio}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">
                  Profit Factor
                </span>
                <span className="font-medium">
                  {props.metrics.profitFactor}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">
                  Expectancy
                </span>
                <span className="font-medium">{props.metrics.expectancy}%</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Risk</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">
                  Max Drawdown
                </span>
                <span className="font-medium text-red-600 dark:text-red-400">
                  {props.metrics.maxDrawdown}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Avg Win</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  +{props.metrics.avgWin}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Avg Loss</span>
                <span className="font-medium text-red-600 dark:text-red-400">
                  {props.metrics.avgLoss}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">
                  Largest Win
                </span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  +{props.metrics.largestWin}%
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Trading</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">
                  Total Trades
                </span>
                <span className="font-medium">{props.metrics.totalTrades}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Win Rate</span>
                <span className="font-medium">{props.metrics.winRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">
                  Avg Duration
                </span>
                <span className="font-medium">
                  {props.metrics.avgTradeDuration}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">
                  Largest Loss
                </span>
                <span className="font-medium text-red-600 dark:text-red-400">
                  {props.metrics.largestLoss}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface MonthlyReturnsGridProps {
  monthlyReturns: Array<{ month: string; return: number }>;
}

const MonthlyReturnsGrid: FC<MonthlyReturnsGridProps> = (props) => {
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
          {props.monthlyReturns.map((item) => (
            <div
              key={item.month}
              className="border-border rounded-lg border p-3 text-center"
            >
              <p className="text-muted-foreground mb-1 text-xs">{item.month}</p>
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
};

const LiveDeploymentPage: FC = () => {
  const navigate = useNavigate();
  const { deploymentId } = useParams<{ deploymentId: string }>();

  // Fetch deployment data
  const {
    data: deploymentResponse,
    isLoading: isLoadingDeployment,
    error: deploymentError,
  } = useDeployment(deploymentId || "");
  const stopDeploymentMutation = useStopDeployment();

  const deployment = (deploymentResponse as any)?.data;

  // Fetch broker connection details
  const { data: brokerConnection, isLoading: isLoadingBroker } =
    useBrokerConnectionQuery(deployment?.broker_connection_id || "");

  // Fetch orders for this deployment
  const { data: ordersData, isLoading: isLoadingOrders } = useQuery({
    queryKey: queryKeys.deployments.orders(deploymentId || ""),
    queryFn: async () =>
      handleApi(
        await getDeploymentOrdersEndpointDeploymentsDeploymentIdOrdersGet(
          deploymentId || "",
        ),
      ),
    enabled: !!deploymentId,
  });

  const orders = ((ordersData as any)?.data || []) as OrderResponseOutput[];

  // Transform orders to trades format
  const trades: Trade[] = useMemo(() => {
    return orders.map((order: OrderResponseOutput, index: number) => {
      const isLong = order.side.toUpperCase() === "BUY";
      const filledQty = parseFloat(order.filled_quantity);
      const avgPrice = order.average_fill_price
        ? parseFloat(order.average_fill_price)
        : 0;

      // Calculate P&L (simplified - would need matching orders in real scenario)
      const pnl = 0; // Placeholder
      const pnlPercent = 0; // Placeholder

      return {
        id: index + 1,
        date: new Date(order.submitted_at).toLocaleDateString(),
        symbol: order.symbol,
        side: isLong ? "LONG" : "SHORT",
        entry: `$${avgPrice.toFixed(2)}`,
        exit: order.filled_at ? `$${avgPrice.toFixed(2)}` : "-",
        pnl: pnl >= 0 ? `+$${pnl.toFixed(2)}` : `-$${Math.abs(pnl).toFixed(2)}`,
        pnlPercent:
          pnlPercent >= 0
            ? `+${pnlPercent.toFixed(2)}%`
            : `${pnlPercent.toFixed(2)}%`,
        duration: order.filled_at
          ? `${(
              Math.abs(
                new Date(order.filled_at).getTime() -
                  new Date(order.submitted_at).getTime(),
              ) /
              (1000 * 60 * 60 * 24)
            ).toFixed(1)} days`
          : "Open",
      };
    });
  }, [orders]);

  const getStatusBadgeVariant = (status: StrategyDeploymentStatus) => {
    switch (status) {
      case "running":
        return "default";
      case "stopped":
        return "secondary";
      case "error":
        return "destructive";
      case "pending":
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

  const handleReplayClick = (tradeId: number) => {
    // Navigate to replay session for this deployment
    navigate(`/replay/deployment/${deploymentId}`);
  };

  if (isLoadingDeployment) {
    return (
      <DashboardLayout>
        <div className="flex h-96 items-center justify-center">
          <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (deploymentError || !deployment) {
    return (
      <DashboardLayout>
        <div className="flex h-96 flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground">
            {deploymentError
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

  const metrics = {
    totalReturn: 45.6,
    sharpeRatio: 1.87,
    maxDrawdown: -12.3,
    winRate: 64.2,
    profitFactor: 2.34,
    totalTrades: trades.length || 127,
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

  // Mock log data
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
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight">
                Live Deployment
              </h2>
              <Badge variant={getStatusBadgeVariant(deployment.status)}>
                {deployment.status.toUpperCase()}
              </Badge>
              {/* Broker Connection Badge */}
              {brokerConnection && (
                <Badge variant="outline" className="gap-1">
                  {(brokerConnection as any).broker?.toUpperCase() || "BROKER"}
                  {(brokerConnection as any).broker_account_id && (
                    <span className="text-muted-foreground">
                      •{" "}
                      {(brokerConnection as any).broker_account_id.slice(0, 8)}
                    </span>
                  )}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-1">
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
            <PopoverContent align="end" className="w-48">
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
                  className="w-full justify-start"
                  onClick={() => navigate(`/replay/deployment/${deploymentId}`)}
                >
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Replay Mode
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Equity Curve with Statistics */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Statistics Card */}
          <PerformanceMetrics
            totalPnl={10000 * (metrics.totalReturn / 100)}
            returnPercentage={metrics.totalReturn}
            totalTrades={metrics.totalTrades}
            sharpeRatio={metrics.sharpeRatio}
            maxDrawdown={metrics.maxDrawdown}
          />

          {/* Equity Graph */}
          <EquityGraph equityData={undefined} title="Equity Curve" />
        </div>

        {/* Detailed Metrics */}
        <DetailedMetricsCard metrics={metrics} />

        {/* Monthly Returns */}
        <MonthlyReturnsGrid monthlyReturns={monthlyReturns} />

        {/* Trades Table */}
        {isLoadingOrders ? (
          <Card>
            <CardContent className="flex h-48 items-center justify-center">
              <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
            </CardContent>
          </Card>
        ) : (
          <TradesTable trades={trades} onReplayClick={handleReplayClick} />
        )}

        {/* Live Logs */}
        <LiveLogs logs={logs} onClearLogs={handleClearLogs} />
      </div>
    </DashboardLayout>
  );
};

export default LiveDeploymentPage;
