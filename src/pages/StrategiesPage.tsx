import {
  Bot,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Plus,
  Search,
  Tally4,
  Trash2,
} from "lucide-react";
import { useEffect, useState, type FC } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteStrategy,
  useStrategySummariesQuery,
} from "@/hooks/queries/strategy-hooks";
import type { StrategySummaryResponse } from "@/openapi";

const formatPnL = (pnl: number) => {
  const formatted = `$${Math.abs(pnl).toFixed(2)}`;
  return pnl >= 0 ? `+${formatted}` : `-${formatted}`;
};

const formatPercentage = (value: number) => {
  const formatted = `${Math.abs(value * 100).toFixed(1)}%`;
  return value >= 0 ? `+${formatted}` : `-${formatted}`;
};

const DeleteConfirmationDialog: FC<{
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending: boolean;
}> = (props) => {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Strategy</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this strategy? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => props.onOpenChange(false)}
            disabled={props.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={props.onConfirm}
            disabled={props.isPending}
          >
            {props.isPending ? (
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
  );
};

const DUMMY_STRATEGIES: StrategySummaryResponse[] = [
  {
    strategy_id: "strat-001",
    name: "London Breakout",
    description:
      "Captures volatility expansion during the London session open.",
    created_at: "2026-02-01T08:15:00Z",
    updated_at: "2026-03-18T11:42:00Z",
    metrics: {
      realised_pnl: 4820.34,
      unrealised_pnl: 210.12,
      total_return_pct: 0.184,
      sharpe_ratio: 1.92,
      max_drawdown: -0.062,
      total_trades: 184,
      equity_curve: [],
    },
  },
  {
    strategy_id: "strat-002",
    name: "BTC Momentum Pulse",
    description: "Short-term crypto momentum strategy with trend confirmation.",
    created_at: "2026-01-20T10:00:00Z",
    updated_at: "2026-03-17T14:20:00Z",
    metrics: {
      realised_pnl: 9132.88,
      unrealised_pnl: -120.5,
      total_return_pct: 0.271,
      sharpe_ratio: 2.31,
      max_drawdown: -0.089,
      total_trades: 126,
      equity_curve: [],
    },
  },
  {
    strategy_id: "strat-003",
    name: "Mean Reversion FX",
    description:
      "Looks for stretched intraday EUR/USD moves and fades extremes.",
    created_at: "2025-12-11T09:30:00Z",
    updated_at: "2026-03-12T16:00:00Z",
    metrics: {
      realised_pnl: -1240.9,
      unrealised_pnl: 0,
      total_return_pct: -0.038,
      sharpe_ratio: 0.74,
      max_drawdown: -0.114,
      total_trades: 241,
      equity_curve: [],
    },
  },
  {
    strategy_id: "strat-004",
    name: "Gold Trend Rider",
    description: "Follows higher-timeframe momentum on XAU/USD with ATR exits.",
    created_at: "2026-02-07T07:10:00Z",
    updated_at: "2026-03-19T09:05:00Z",
    metrics: {
      realised_pnl: 6321.45,
      unrealised_pnl: 412.88,
      total_return_pct: 0.193,
      sharpe_ratio: 1.67,
      max_drawdown: -0.071,
      total_trades: 97,
      equity_curve: [],
    },
  },
  {
    strategy_id: "strat-005",
    name: "Opening Range Nasdaq",
    description: "Trades breakout confirmation during the first 30 minutes.",
    created_at: "2026-01-04T13:00:00Z",
    updated_at: "2026-03-16T18:30:00Z",
    metrics: {
      realised_pnl: 2245.22,
      unrealised_pnl: -54.1,
      total_return_pct: 0.081,
      sharpe_ratio: 1.18,
      max_drawdown: -0.095,
      total_trades: 143,
      equity_curve: [],
    },
  },
  {
    strategy_id: "strat-006",
    name: "ETH Swing Engine",
    description: "Multi-day Ethereum swing strategy using structure and RSI.",
    created_at: "2026-02-12T12:45:00Z",
    updated_at: "2026-03-18T20:10:00Z",
    metrics: {
      realised_pnl: 11882.04,
      unrealised_pnl: 980.22,
      total_return_pct: 0.352,
      sharpe_ratio: 2.64,
      max_drawdown: -0.102,
      total_trades: 62,
      equity_curve: [],
    },
  },
  {
    strategy_id: "strat-007",
    name: "Scalp Grid Alpha",
    description: "High-frequency micro-scalping model for liquid pairs.",
    created_at: "2025-11-21T06:50:00Z",
    updated_at: "2026-03-10T10:15:00Z",
    metrics: {
      realised_pnl: -842.11,
      unrealised_pnl: 33.47,
      total_return_pct: -0.021,
      sharpe_ratio: 0.58,
      max_drawdown: -0.131,
      total_trades: 418,
      equity_curve: [],
    },
  },
  {
    strategy_id: "strat-008",
    name: "Daily Pullback Pro",
    description: "Enters strong daily trends on measured pullbacks.",
    created_at: "2026-01-28T15:40:00Z",
    updated_at: "2026-03-19T07:25:00Z",
    metrics: {
      realised_pnl: 5310.67,
      unrealised_pnl: 120.8,
      total_return_pct: 0.149,
      sharpe_ratio: 1.54,
      max_drawdown: -0.057,
      total_trades: 88,
      equity_curve: [],
    },
  },
  {
    strategy_id: "strat-009",
    name: "Volatility Snapback",
    description: "Trades sharp dislocations after volatility spikes.",
    created_at: "2026-02-03T11:12:00Z",
    updated_at: "2026-03-15T13:48:00Z",
    metrics: {
      realised_pnl: 1740.5,
      unrealised_pnl: 0,
      total_return_pct: 0.061,
      sharpe_ratio: 1.03,
      max_drawdown: -0.083,
      total_trades: 154,
      equity_curve: [],
    },
  },
  {
    strategy_id: "strat-010",
    name: "Session Bias Trader",
    description: "Builds directional bias from prior session structure.",
    created_at: "2025-12-30T05:25:00Z",
    updated_at: "2026-03-11T17:35:00Z",
    metrics: {
      realised_pnl: 3898.93,
      unrealised_pnl: -18.2,
      total_return_pct: 0.124,
      sharpe_ratio: 1.41,
      max_drawdown: -0.069,
      total_trades: 132,
      equity_curve: [],
    },
  },
  {
    strategy_id: "strat-011",
    name: "Macro Drift",
    description:
      "Slow trend-following portfolio strategy across major markets.",
    created_at: "2025-10-14T09:00:00Z",
    updated_at: "2026-03-18T12:00:00Z",
    metrics: {
      realised_pnl: 15442.77,
      unrealised_pnl: 1204.56,
      total_return_pct: 0.427,
      sharpe_ratio: 2.12,
      max_drawdown: -0.076,
      total_trades: 49,
      equity_curve: [],
    },
  },
  {
    strategy_id: "strat-012",
    name: "Reversal Hunter",
    description: "Countertrend model tuned for exhausted intraday moves.",
    created_at: "2026-01-09T14:05:00Z",
    updated_at: "2026-03-14T08:55:00Z",
    metrics: {
      realised_pnl: -2310.4,
      unrealised_pnl: -140.25,
      total_return_pct: -0.072,
      sharpe_ratio: 0.43,
      max_drawdown: -0.156,
      total_trades: 206,
      equity_curve: [],
    },
  },
];

const StrategiesPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [strategyToDelete, setStrategyToDelete] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  // const [strategies, setStrategies] = useState<StrategySummaryResponse[]>([]);
  const [strategies, setStrategies] =
    useState<StrategySummaryResponse[]>(DUMMY_STRATEGIES);

  const itemsPerPage = 10;

  const deleteStrategyMutation = useDeleteStrategy();

  // Fetch strategies with over-fetching (fetch 9 pages worth + 1 extra)
  const strategySummariesQuery = useStrategySummariesQuery({
    skip: (page - 1) * 90,
    limit: 91,
  });

  const strategiesData = strategySummariesQuery.data;

  // Accumulate strategies as they're fetched
  useEffect(() => {
    if (Array.isArray(strategiesData) && strategiesData.length > 0) {
      setStrategies((prev) => {
        const ids = new Set(prev.map((s) => s.strategy_id));
        const newOnes = strategiesData.filter(
          (s: StrategySummaryResponse) => !ids.has(s.strategy_id),
        );
        return [...prev, ...newOnes];
      });
    }
  }, [strategiesData]);

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
      setPage(1);
    }
  };

  // Ensure strategies is always an array
  const safeStrategies = Array.isArray(strategies) ? strategies : [];

  const filteredStrategies = safeStrategies.filter(
    (s: StrategySummaryResponse) => {
      const matchesSearch = s.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesSearch;
    },
  );

  // Reset strategies and page when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setStrategies([]);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Get current page of strategies
  const paginatedStrategies = filteredStrategies.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
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
          <Link to="/strategies/create">
            <Button className="bg-primary hover:bg-primary">
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
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Strategies Table */}
        {strategySummariesQuery.isLoading ? (
          <Card className="border-none bg-transparent">
            <CardContent className="p-6">
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-12 flex-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : strategySummariesQuery.error ? (
          <Card className="border-none bg-transparent">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Bot className="text-muted-foreground mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-semibold">
                Error loading strategies
              </h3>
              <p className="text-muted-foreground text-sm">
                {strategySummariesQuery.error.message ||
                  "Failed to load strategies"}
              </p>
            </CardContent>
          </Card>
        ) : filteredStrategies.length === 0 ? (
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
              <Link to="/strategies/create">
                <Button className="bg-primary hover:bg-primary">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Strategy
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-500">Name</TableHead>
                  <TableHead className="text-gray-500">Description</TableHead>
                  <TableHead className="text-right text-gray-500">
                    P&L
                  </TableHead>
                  <TableHead className="text-right text-gray-500">
                    Return
                  </TableHead>
                  <TableHead className="text-right text-gray-500">
                    Sharpe
                  </TableHead>
                  <TableHead className="text-right text-gray-500">
                    Max DD
                  </TableHead>
                  <TableHead className="w-[50px]">
                    <Tally4 className="h-4 w-4 text-gray-500" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStrategies.map(
                  (strategy: StrategySummaryResponse) => (
                    <TableRow
                      key={strategy.strategy_id}
                      className="cursor-pointer"
                      onClick={() =>
                        (window.location.href = `/strategies/${strategy.strategy_id}`)
                      }
                    >
                      <TableCell className="font-medium">
                        {strategy.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground max-w-md truncate">
                        {strategy.description || "No description"}
                      </TableCell>
                      <TableCell
                        className={`text-right font-semibold ${
                          strategy.metrics.realised_pnl >= 0
                            ? "text-primary dark:text-primary"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {formatPnL(strategy.metrics.realised_pnl)}
                      </TableCell>
                      <TableCell
                        className={`text-right font-semibold ${
                          strategy.metrics.total_return_pct >= 0
                            ? "text-primary dark:text-primary"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {formatPercentage(strategy.metrics.total_return_pct)}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {strategy.metrics.sharpe_ratio.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-red-600 dark:text-red-400">
                        {formatPercentage(strategy.metrics.max_drawdown)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:bg-red-500/10 hover:text-red-700"
                          onClick={(e) =>
                            handleDeleteClick(strategy.strategy_id, e)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            {filteredStrategies.length > itemsPerPage && (
              <div className="flex items-center justify-end">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:!bg-transparent"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex w-15 items-center justify-center text-sm">
                    Page {page}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:!bg-transparent"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={filteredStrategies.length <= page * itemsPerPage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmationDialog
          isOpen={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteConfirm}
          isPending={deleteStrategyMutation.isPending}
        />
      </div>
    </DashboardLayout>
  );
};

export default StrategiesPage;
