import { BarChart3, Filter, Loader2, Search, Trash2 } from "lucide-react";
import { useState, type FC } from "react";
import { Link } from "react-router";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Badge } from "@/components/ui/badge";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useBacktestsQuery,
  useDeleteBacktest,
} from "@/hooks/queries/backtest-hooks";
import type { BacktestResponse } from "@/openapi";

const BacktestsPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    "completed",
    "in_progress",
    "pending",
    "failed",
  ]);
  const [selectedTickers, setSelectedTickers] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [backtestToDelete, setBacktestToDelete] = useState<string | null>(null);

  // Fetch backtests from API
  const { data: response, isLoading, error } = useBacktestsQuery();
  const deleteBacktestMutation = useDeleteBacktest();

  const backtests: BacktestResponse[] = response?.data || [];

  // Remove mock data
  const mockBacktests: never[] = [];

  // Get unique values for filters
  const uniqueTickers = Array.from(
    new Set(backtests.map((b) => b.symbol)),
  ).sort();

  // Initialize selected tickers with all available tickers
  if (selectedTickers.length === 0 && uniqueTickers.length > 0) {
    setSelectedTickers(uniqueTickers);
  }

  const statusOptions = [
    { value: "completed", label: "Completed" },
    { value: "in_progress", label: "In Progress" },
    { value: "pending", label: "Pending" },
    { value: "failed", label: "Failed" },
  ];

  const handleStatusToggle = (status: string) => {
    if (selectedStatuses.includes(status)) {
      if (selectedStatuses.length > 1) {
        setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
      }
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  const handleTickerToggle = (ticker: string) => {
    setSelectedTickers((prev) =>
      prev.includes(ticker)
        ? prev.filter((t) => t !== ticker)
        : [...prev, ticker],
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "in_progress":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
      case "failed":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    }
  };

  const filteredBacktests = backtests.filter((backtest) => {
    const matchesSearch =
      backtest.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      backtest.backtest_id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatuses.includes(backtest.status);
    const matchesTicker =
      selectedTickers.length === 0 || selectedTickers.includes(backtest.symbol);
    return matchesSearch && matchesStatus && matchesTicker;
  });

  const handleDeleteClick = (e: React.MouseEvent, backtestId: string) => {
    e.preventDefault();
    setBacktestToDelete(backtestId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (backtestToDelete) {
      await deleteBacktestMutation.mutateAsync(backtestToDelete);
      setDeleteDialogOpen(false);
      setBacktestToDelete(null);
    }
  };

  const BacktestCard = ({ backtest }: { backtest: BacktestResponse }) => (
    <Link to={`/backtests/${backtest.backtest_id}`}>
      <Card className="group h-[220px] cursor-pointer transition-all hover:border-emerald-500/50 hover:shadow-lg">
        <CardContent className="flex h-full flex-col p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                <BarChart3 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-lg font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    {backtest.symbol}
                  </h3>
                  <Badge
                    className={`flex-shrink-0 ${getStatusColor(backtest.status)}`}
                  >
                    {backtest.status.replace("_", " ")}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1 truncate text-sm">
                  ID: {backtest.backtest_id.substring(0, 8)}...
                </p>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  Created:{" "}
                  {new Date(backtest.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Info & Actions */}
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <span>Balance: ${backtest.starting_balance}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:bg-red-500/10 hover:text-red-700"
                onClick={(e) => handleDeleteClick(e, backtest.backtest_id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  const activeFilterCount =
    selectedTickers.length +
    (selectedStatuses.length < statusOptions.length ? 1 : 0);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Backtests</h2>
              <p className="text-muted-foreground">
                View and analyze all backtest results across your strategies
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="h-[220px]">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Skeleton className="h-12 w-12 rounded-xl" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Backtests</h2>
              <p className="text-muted-foreground">
                View and analyze all backtest results across your strategies
              </p>
            </div>
          </div>

          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <BarChart3 className="text-muted-foreground mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-semibold">
                Error loading backtests
              </h3>
              <p className="text-muted-foreground text-sm">
                {error?.message || "Failed to load backtests"}
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Backtests</h2>
            <p className="text-muted-foreground">
              View and analyze all backtest results across your strategies
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search backtests..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="default">
                <Filter className="mr-2 h-4 w-4" />
                Status
                {selectedStatuses.length < statusOptions.length && (
                  <span className="ml-2 rounded-full bg-emerald-500 px-1.5 py-0.5 text-xs text-white">
                    {selectedStatuses.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-56">
              <div className="space-y-4">
                <div>
                  <h4 className="mb-3 font-semibold">Status</h4>
                  <div className="space-y-2">
                    {statusOptions.map((option) => (
                      <label
                        key={option.value}
                        className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md p-2"
                      >
                        <input
                          type="checkbox"
                          checked={selectedStatuses.includes(option.value)}
                          onChange={() => handleStatusToggle(option.value)}
                          disabled={
                            selectedStatuses.includes(option.value) &&
                            selectedStatuses.length === 1
                          }
                          className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm">{option.label}</span>
                        <span className="text-muted-foreground ml-auto text-xs">
                          {
                            backtests.filter((b) => b.status === option.value)
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

          {/* Ticker Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="default">
                <Filter className="mr-2 h-4 w-4" />
                Ticker
                {selectedTickers.length > 0 && (
                  <span className="ml-2 rounded-full bg-emerald-500 px-1.5 py-0.5 text-xs text-white">
                    {selectedTickers.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-56">
              <div className="space-y-4">
                <div>
                  <h4 className="mb-3 font-semibold">Ticker</h4>
                  <div className="space-y-2">
                    {uniqueTickers.map((ticker) => (
                      <label
                        key={ticker}
                        className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md p-2"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTickers.includes(ticker)}
                          onChange={() => handleTickerToggle(ticker)}
                          className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm">{ticker}</span>
                        <span className="text-muted-foreground ml-auto text-xs">
                          {backtests.filter((b) => b.symbol === ticker).length}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Backtest Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBacktests.length === 0 ? (
            <div className="col-span-full">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <BarChart3 className="text-muted-foreground mb-4 h-12 w-12" />
                  <h3 className="mb-2 text-lg font-semibold">
                    No backtests found
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {searchQuery || activeFilterCount > 0
                      ? "Try adjusting your filters"
                      : "Run your first backtest to see results here"}
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            filteredBacktests.map((backtest) => (
              <BacktestCard key={backtest.backtest_id} backtest={backtest} />
            ))
          )}
        </div>

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

export default BacktestsPage;
