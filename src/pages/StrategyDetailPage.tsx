import {
  ArrowLeft,
  Bot,
  Filter,
  Loader2,
  MoreVertical,
  NotepadText,
  OctagonXIcon,
  Plus,
  RadioTowerIcon,
  Trash2,
} from "lucide-react";
import { useState, type FC } from "react";
import { Link, useNavigate, useParams } from "react-router";

import EquityGraph from "@/components/EquityGraph";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
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
  useBacktestsQuery,
  useCreateBacktestMutation,
} from "@/hooks/queries/backtest-hooks";
import { useStrategyDeployments } from "@/hooks/queries/deployment-hooks";
import {
  useDeleteStrategy,
  useStrategySummary,
} from "@/hooks/queries/strategy-hooks";
import {
  BacktestStatus,
  StrategyDeploymentStatus,
  type BacktestResponse,
  type DeploymentResponse,
  type StrategyMetrics,
  type StrategyResponse,
} from "@/openapi";

// Internal Components
const StrategyHeader: FC<{
  strategy: Omit<StrategyResponse, "strategy_id">;
  onManageClick: () => void;
  onDeleteClick: () => void;
}> = (props) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-emerald-500/10">
          <Bot className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight">
              {props.strategy.name}
            </h2>
          </div>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            {props.strategy.description || "No description"}
          </p>
          <div className="text-muted-foreground mt-2 flex gap-4 text-sm">
            <span>Created {formatDate(props.strategy.created_at)}</span>
            <span>•</span>
            <span>Last updated {formatDate(props.strategy.updated_at)}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-48">
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <NotepadText className="mr-2 h-4 w-4" />
                System Prompt
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
                onClick={props.onManageClick}
              >
                <RadioTowerIcon className="mr-2 h-4 w-4" />
                Manage
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <OctagonXIcon className="mr-2 h-4 w-4" />
                Stop
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:bg-red-500/10 hover:text-red-600 dark:text-red-400"
                size="sm"
                onClick={props.onDeleteClick}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

const PerformanceMetrics: FC<{
  metrics: Omit<StrategyMetrics, "equity_curve">;
}> = (props) => {
  const formatPnL = (pnl: number) => {
    const formatted = `$${Math.abs(pnl).toFixed(2)}`;
    return pnl >= 0 ? `+${formatted}` : `-${formatted}`;
  };

  const formatPercentage = (value: number) => {
    const formatted = `${Math.abs(value * 100).toFixed(1)}%`;
    return value >= 0 ? `+${formatted}` : `-${formatted}`;
  };

  return (
    <Card className="lg:w-1/5 lg:flex-shrink-0">
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Realized P&L</span>
            <span
              className={`text-lg font-bold ${
                props.metrics.realised_pnl >= 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {formatPnL(props.metrics.realised_pnl)}
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">
              Unrealized P&L
            </span>
            <span
              className={`font-semibold ${
                props.metrics.unrealised_pnl >= 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {formatPnL(props.metrics.unrealised_pnl)}
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Total Return</span>
            <span
              className={`font-semibold ${
                props.metrics.total_return >= 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {formatPercentage(props.metrics.total_return)}
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Sharpe Ratio</span>
            <span className="font-semibold">
              {props.metrics.sharpe_ratio.toFixed(2)}
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Max Drawdown</span>
            <span className="font-semibold text-red-600 dark:text-red-400">
              {formatPercentage(props.metrics.max_drawdown)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DeploymentsTable: FC<{
  deployments: DeploymentResponse[];
}> = (props) => {
  const navigate = useNavigate();

  const handleRowClick = (deploymentId: string) => {
    navigate(`/deployments/${deploymentId}`);
  };

  const getStatusColor = (status: StrategyDeploymentStatus) => {
    switch (status) {
      case StrategyDeploymentStatus.running:
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case StrategyDeploymentStatus.pending:
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
      case StrategyDeploymentStatus.error:
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
      case StrategyDeploymentStatus.stopped:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Deployments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Ticker</TableHead>
              <TableHead>Timeframe</TableHead>
              <TableHead>Started</TableHead>
              <TableHead>Starting Balance</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.deployments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-muted-foreground text-center"
                >
                  No live deployments
                </TableCell>
              </TableRow>
            ) : (
              props.deployments.map((deployment) => (
                <TableRow
                  key={deployment.deployment_id}
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleRowClick(deployment.deployment_id)}
                >
                  <TableCell className="font-mono text-xs">
                    {deployment.deployment_id.substring(0, 8)}...
                  </TableCell>
                  <TableCell className="font-medium">
                    {deployment.ticker}
                  </TableCell>
                  <TableCell className="text-sm">
                    {deployment.timeframe}
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(deployment.created_at).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </TableCell>
                  <TableCell>${deployment.starting_balance}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(deployment.status)}>
                      {deployment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const BacktestsTable: FC<{
  strategyId: string;
  backtests: BacktestResponse[];
  selectedTickers: string[];
  symbolOptions: string[];
  onTickerToggle: (symbol: string) => void;
  onCreateClick: () => void;
}> = (props) => {
  const navigate = useNavigate();

  const filteredBacktests = props.backtests.filter((b) =>
    props.selectedTickers.includes(b.symbol),
  );

  const handleRowClick = (backtestId: string) => {
    navigate(`/backtests/${backtestId}`);
  };

  const getStatusColor = (status: BacktestStatus) => {
    switch (status) {
      case BacktestStatus.completed:
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case BacktestStatus.in_progress:
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case BacktestStatus.pending:
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
      case BacktestStatus.failed:
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Backtests</CardTitle>
          <Button
            size="sm"
            onClick={props.onCreateClick}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Backtest
          </Button>
        </div>
        <div className="mt-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Ticker
                {props.selectedTickers.length < props.symbolOptions.length && (
                  <span className="ml-2 rounded-full bg-emerald-500 px-1.5 py-0.5 text-xs text-white">
                    {props.selectedTickers.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-48">
              <div className="space-y-4">
                <div>
                  <h4 className="mb-3 font-semibold">Ticker</h4>
                  <div className="space-y-2">
                    {props.symbolOptions.map((ticker) => (
                      <label
                        key={ticker}
                        className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md p-2"
                      >
                        <input
                          type="checkbox"
                          checked={props.selectedTickers.includes(ticker)}
                          onChange={() => props.onTickerToggle(ticker)}
                          disabled={
                            props.selectedTickers.includes(ticker) &&
                            props.selectedTickers.length === 1
                          }
                          className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm">{ticker}</span>
                        <span className="text-muted-foreground ml-auto text-xs">
                          {
                            props.backtests.filter((b) => b.symbol === ticker)
                              .length
                          }
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Starting Balance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBacktests.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-muted-foreground text-center"
                >
                  No backtests found. Create one to get started!
                </TableCell>
              </TableRow>
            ) : (
              filteredBacktests.map((backtest) => (
                <TableRow
                  key={backtest.backtest_id}
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleRowClick(backtest.backtest_id)}
                >
                  <TableCell className="font-medium">
                    {backtest.symbol}
                  </TableCell>
                  <TableCell className="text-sm">
                    ${backtest.starting_balance}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(backtest.status)}>
                      {backtest.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(backtest.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Main Page Component
const StrategyDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [selectedTickers, setSelectedTickers] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createBacktestDialogOpen, setCreateBacktestDialogOpen] =
    useState(false);
  const [newBacktestTicker, setNewBacktestTicker] = useState("");
  const [newBacktestBalance, setNewBacktestBalance] = useState("10000");

  // Fetch strategy summary with metrics
  const strategySummaryQuery = useStrategySummary(id || "");
  const deleteStrategyMutation = useDeleteStrategy();

  // Fetch backtests for this strategy
  const backtestsQuery = useBacktestsQuery();
  const createBacktestMutation = useCreateBacktestMutation();

  // Fetch deployments for this strategy
  const deploymentsQuery = useStrategyDeployments(id || "");

  const strategy = strategySummaryQuery.data?.data;

  // Filter backtests by strategy_id
  const allBacktests = backtestsQuery.data?.data || [];
  const strategyBacktests = allBacktests.filter(
    (b: BacktestResponse) => b.strategy_id === id,
  );

  // Get unique tickers from backtests
  const uniqueTickers = Array.from(
    new Set(strategyBacktests.map((b: BacktestResponse) => b.symbol)),
  );
  const tickerOptions = uniqueTickers as string[];

  // Initialize selected tickers with all available tickers
  if (selectedTickers.length === 0 && uniqueTickers.length > 0) {
    setSelectedTickers(uniqueTickers as string[]);
  }

  // Get deployments from API
  const deployments = deploymentsQuery.data?.data || [];

  const handleTickerToggle = (ticker: string) => {
    if (selectedTickers.includes(ticker)) {
      if (selectedTickers.length > 1) {
        setSelectedTickers(selectedTickers.filter((t) => t !== ticker));
      }
    } else {
      setSelectedTickers([...selectedTickers, ticker]);
    }
  };

  const handleManageClick = () => {
    navigate(`/strategies/${id}/live`);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (id) {
      await deleteStrategyMutation.mutateAsync(id);
      setDeleteDialogOpen(false);
      navigate("/strategies");
    }
  };

  const handleCreateBacktestClick = () => {
    setCreateBacktestDialogOpen(true);
  };

  const handleCreateBacktest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !newBacktestTicker || !newBacktestBalance) return;

    try {
      await createBacktestMutation.mutateAsync({
        strategy_id: id,
        symbol: newBacktestTicker.toUpperCase(),
        starting_balance: newBacktestBalance,
      });
      setCreateBacktestDialogOpen(false);
      setNewBacktestTicker("");
      setNewBacktestBalance("10000");
    } catch (error) {
      // Error handling is done by the mutation
      console.error("Failed to create backtest:", error);
    }
  };

  if (strategySummaryQuery.isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Link to="/strategies">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Strategies
            </Button>
          </Link>

          <div className="flex items-start gap-4">
            <Skeleton className="h-16 w-16 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-96" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>

          <div className="flex gap-4">
            <Skeleton className="h-64 w-1/5" />
            <Skeleton className="h-64 flex-1" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (strategySummaryQuery.error || !strategy) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Link to="/strategies">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Strategies
            </Button>
          </Link>

          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Bot className="text-muted-foreground mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-semibold">
                Error loading strategy
              </h3>
              <p className="text-muted-foreground text-sm">
                {strategySummaryQuery.error?.message || "Strategy not found"}
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
        <Link to="/strategies">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Strategies
          </Button>
        </Link>

        <StrategyHeader
          strategy={strategy}
          onManageClick={handleManageClick}
          onDeleteClick={handleDeleteClick}
        />

        <div className="flex flex-col gap-4 lg:flex-row">
          <PerformanceMetrics metrics={strategy.metrics} />
          <EquityGraph />
        </div>

        <BacktestsTable
          strategyId={id || ""}
          backtests={strategyBacktests}
          selectedTickers={selectedTickers}
          symbolOptions={tickerOptions}
          onTickerToggle={handleTickerToggle}
          onCreateClick={handleCreateBacktestClick}
        />

        <DeploymentsTable deployments={deployments} />

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Strategy</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this strategy? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
                disabled={deleteStrategyMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteConfirm}
                disabled={deleteStrategyMutation.isPending}
              >
                {deleteStrategyMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Backtest Dialog */}
        <Dialog
          open={createBacktestDialogOpen}
          onOpenChange={setCreateBacktestDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Backtest</DialogTitle>
              <DialogDescription>
                Configure and run a backtest for this strategy
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateBacktest}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="ticker">Symbol</Label>
                  <Input
                    id="ticker"
                    placeholder="AAPL"
                    value={newBacktestTicker}
                    onChange={(e) => setNewBacktestTicker(e.target.value)}
                    required
                    maxLength={10}
                  />
                  <p className="text-muted-foreground text-xs">
                    Enter the stock symbol (e.g., AAPL, TSLA, GOOGL)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="balance">Starting Balance ($)</Label>
                  <Input
                    id="balance"
                    type="number"
                    placeholder="10000"
                    value={newBacktestBalance}
                    onChange={(e) => setNewBacktestBalance(e.target.value)}
                    required
                    min="100"
                    step="0.01"
                  />
                  <p className="text-muted-foreground text-xs">
                    The initial capital for the backtest
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCreateBacktestDialogOpen(false)}
                  disabled={createBacktestMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700"
                  disabled={createBacktestMutation.isPending}
                >
                  {createBacktestMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Backtest"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default StrategyDetailPage;
