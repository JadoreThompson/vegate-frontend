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

const StrategiesPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [strategyToDelete, setStrategyToDelete] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [strategies, setStrategies] = useState<StrategySummaryResponse[]>([]);

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
    // Ensure strategiesData is an array before processing
    console.log("Fetched strategies data:", strategiesData);
    console.log("Is strategiesData an array?", Array.isArray(strategiesData));
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
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Strategies Table */}
        {strategySummariesQuery.isLoading ? (
          <Card>
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
          <Card>
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
                <Button className="bg-emerald-600 hover:bg-emerald-700">
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
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {formatPnL(strategy.metrics.realised_pnl)}
                      </TableCell>
                      <TableCell
                        className={`text-right font-semibold ${
                          strategy.metrics.total_return_pct >= 0
                            ? "text-emerald-600 dark:text-emerald-400"
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
