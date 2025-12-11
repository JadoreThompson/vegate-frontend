import { Bot, Loader2, Plus, Search, Trash2 } from "lucide-react";
import { useState, type FC } from "react";
import { Link } from "react-router";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDeleteStrategy,
  useStrategySummariesQuery,
} from "@/hooks/queries/strategy-hooks";

const StrategiesPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [strategyToDelete, setStrategyToDelete] = useState<string | null>(null);

  // Fetch strategies with metrics
  // const { data: response, isLoading, error } = useStrategySummariesQuery();
  const strategySummariesQuery = useStrategySummariesQuery();
  const deleteStrategyMutation = useDeleteStrategy();

  const strategies = strategySummariesQuery?.data || [];

  type Strategy = (typeof strategies)[number];

  const handleDeleteClick = (strategyId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setStrategyToDelete(strategyId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (strategyToDelete) {
      await deleteStrategyMutation.mutateAsync(strategyToDelete);
      setDeleteDialogOpen(false);
      setStrategyToDelete(null);
    }
  };

  const filteredStrategies = strategies.filter((s: Strategy) => {
    const matchesSearch = s.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const formatPnL = (pnl: number) => {
    const formatted = `$${Math.abs(pnl).toFixed(2)}`;
    return pnl >= 0 ? `+${formatted}` : `-${formatted}`;
  };

  const formatPercentage = (value: number) => {
    const formatted = `${Math.abs(value * 100).toFixed(1)}%`;
    return value >= 0 ? `+${formatted}` : `-${formatted}`;
  };

  const StrategyCard = ({ strategy }: { strategy: (typeof strategies)[0] }) => (
    <Link to={`/strategies/${strategy.strategy_id}`}>
      <Card className="group h-[200px] cursor-pointer transition-all hover:border-emerald-500/50 hover:shadow-lg">
        <CardContent className="flex h-full flex-col p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                <Bot className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-lg font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    {strategy.name}
                  </h3>
                </div>
                <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                  {strategy.description || "No description"}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0 text-red-600 hover:bg-red-500/10 hover:text-red-700"
                onClick={(e) => handleDeleteClick(strategy.strategy_id, e)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Stats - Horizontal row layout */}
            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-muted-foreground text-xs">P&L</p>
                <p
                  className={`mt-1 font-semibold ${
                    strategy.metrics.realised_pnl >= 0
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {formatPnL(strategy.metrics.realised_pnl)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Return</p>
                <p
                  className={`mt-1 font-semibold ${
                    strategy.metrics.total_return >= 0
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {formatPercentage(strategy.metrics.total_return)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Sharpe</p>
                <p className="mt-1 font-semibold">
                  {strategy.metrics.sharpe_ratio.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Max DD</p>
                <p className="mt-1 font-semibold text-red-600 dark:text-red-400">
                  {formatPercentage(strategy.metrics.max_drawdown)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Strategies</h2>
            <p className="text-muted-foreground">
              Manage and monitor your trading strategies
            </p>
          </div>
          <Link to="/strategies/new">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              New Strategy
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search strategies..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Strategy Grid - 3 per row */}
        {strategySummariesQuery.isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-[200px]">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Skeleton className="h-12 w-12 rounded-xl" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j}>
                          <Skeleton className="mb-2 h-3 w-12" />
                          <Skeleton className="h-5 w-16" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : strategySummariesQuery.error ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Bot className="text-muted-foreground mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-semibold">
                Error loading strategies
              </h3>
              <p className="text-muted-foreground text-sm">
                {strategySummariesQuery.error.message || "Failed to load strategies"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredStrategies.length === 0 ? (
              <div className="col-span-full">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <Bot className="text-muted-foreground mb-4 h-12 w-12" />
                    <h3 className="mb-2 text-lg font-semibold">
                      No strategies found
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {searchQuery
                        ? "Try adjusting your search"
                        : "Get started by creating your first strategy"}
                    </p>
                    <Link to="/strategies/new">
                      <Button className="bg-emerald-600 hover:bg-emerald-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Strategy
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ) : (
              filteredStrategies.map((strategy: Strategy) => (
                <StrategyCard key={strategy.strategy_id} strategy={strategy} />
              ))
            )}
          </div>
        )}

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
      </div>
    </DashboardLayout>
  );
};

export default StrategiesPage;
