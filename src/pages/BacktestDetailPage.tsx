import { ArrowLeft, Loader2, Trash2, TrendingUp } from "lucide-react";
import { useState, type FC } from "react";
import { Link, useNavigate, useParams } from "react-router";

import PerformanceMetrics from "@/components/PerformanceMetrics";
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
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useBacktestQuery,
  useDeleteBacktest,
} from "@/hooks/queries/backtest-hooks";
import { BacktestStatus } from "@/openapi";

const BacktestDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch backtest details with metrics
  const { data: response, isLoading, error } = useBacktestQuery(id || "");
  const deleteBacktestMutation = useDeleteBacktest();

  const backtest = response?.data;
  const metrics = backtest?.metrics;

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

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (id) {
      await deleteBacktestMutation.mutateAsync(id);
      setDeleteDialogOpen(false);
      navigate("/backtests");
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Link to="/backtests">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Backtests
            </Button>
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row">
            <Skeleton className="h-80 w-full lg:w-1/4" />
            <Skeleton className="h-80 flex-1" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !backtest) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Link to="/backtests">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Backtests
            </Button>
          </Link>

          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <TrendingUp className="text-muted-foreground mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-semibold">
                Error loading backtest
              </h3>
              <p className="text-muted-foreground text-sm">
                {error?.message || "Backtest not found"}
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
            <Link to="/backtests">
              <Button variant="ghost" size="sm" className="mb-2 gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Backtests
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight">
                Backtest Details
              </h2>
              <Badge className={getStatusColor(backtest.status)}>
                {backtest.status.replace("_", " ")}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-2">
              Symbol: {backtest.symbol} • Starting Balance: $
              {backtest.starting_balance}
            </p>
            <p className="text-muted-foreground text-sm">
              Created:{" "}
              {new Date(backtest.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="flex gap-2">
            <Link to={`/backtests/${id}/results`}>
              <Button variant="outline">View Results</Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-600 hover:bg-red-500/10 hover:text-red-700"
              onClick={handleDeleteClick}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Performance Metrics */}
        {metrics ? (
          <div className="flex flex-col gap-4 lg:flex-row">
            <PerformanceMetrics
              totalPnl={metrics.realised_pnl}
              returnPercentage={metrics.total_return_pct}
              totalTrades={metrics.total_trades}
              sharpeRatio={metrics.sharpe_ratio}
              maxDrawdown={metrics.max_drawdown * 100}
            />

            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Backtest Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Backtest ID
                    </span>
                    <span className="font-mono text-sm">
                      {backtest.backtest_id.substring(0, 8)}...
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Strategy ID
                    </span>
                    <span className="font-mono text-sm">
                      {backtest.strategy_id.substring(0, 8)}...
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Ticker
                    </span>
                    <span className="font-semibold">{backtest.symbol}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Starting Balance
                    </span>
                    <span className="font-semibold">
                      ${backtest.starting_balance}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Status
                    </span>
                    <Badge className={getStatusColor(backtest.status)}>
                      {backtest.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <TrendingUp className="text-muted-foreground mb-4 h-12 w-12 opacity-20" />
              <h3 className="mb-2 text-lg font-semibold">
                {backtest.status === "pending"
                  ? "Backtest Pending"
                  : backtest.status === "in_progress"
                    ? "Backtest In Progress"
                    : "No Metrics Available"}
              </h3>
              <p className="text-muted-foreground text-sm">
                {backtest.status === "pending"
                  ? "This backtest is queued and will start soon"
                  : backtest.status === "in_progress"
                    ? "This backtest is currently running"
                    : "Metrics will appear here once the backtest completes"}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Backtest</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this backtest? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
                disabled={deleteBacktestMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteConfirm}
                disabled={deleteBacktestMutation.isPending}
              >
                {deleteBacktestMutation.isPending ? (
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
      </div>
    </DashboardLayout>
  );
};

export default BacktestDetailPage;
