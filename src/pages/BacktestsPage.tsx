import { BarChart3, Filter, Loader2, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState, type FC } from "react";
import { useNavigate } from "react-router";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import PaginationControls from "@/components/pagination-controls";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  useDeleteBacktestMutation,
} from "@/hooks/queries/backtest-hooks";
import {
  BacktestStatus,
  type ApiRoutesBacktestsModelsBacktestResponse,
} from "@/openapi";

const BacktestsPage: FC = () => {
  const navigate = useNavigate();

  const [selectedStatuses, setSelectedStatuses] = useState<BacktestStatus[]>([
    BacktestStatus.completed,
    BacktestStatus.in_progress,
    BacktestStatus.pending,
    BacktestStatus.failed,
  ]);
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [backtestToDelete, setBacktestToDelete] = useState<string | null>(null);

  const [backtests, setBacktests] = useState<
    ApiRoutesBacktestsModelsBacktestResponse[]
  >([]);

  const backtestQueryParams = useMemo(() => {
    let obj = {} as any;

    obj["skip"] = (page - 1) * 90;
    obj["limit"] = 91;

    if (selectedStatuses.length) {
      obj["status"] = selectedStatuses;
    }

    if (selectedSymbols.length) {
      obj["symbols"] = selectedSymbols;
    }

    return obj;
  }, [page, selectedStatuses, selectedSymbols]);

  const backtestsQuery = useBacktestsQuery(backtestQueryParams);
  const deleteBacktestMutation = useDeleteBacktestMutation();

  // TODO: useMemo
  const uniqueSymbols = Array.from(
    new Set(backtests.map((b) => b.symbol)),
  ).sort();

  const PAGE_SIZE = 10;

  if (selectedSymbols.length === 0 && uniqueSymbols.length > 0) {
    setSelectedSymbols(uniqueSymbols);
  }

  useEffect(() => {
    if (backtestsQuery.data?.length) {
      setBacktests((prev) => {
        const ids = new Set(prev.map((b) => b.backtest_id));
        const newBacktests = backtestsQuery.data.filter(
          (b) => !ids.has(b.backtest_id),
        );
        return [...prev, ...newBacktests];
      });
    }
  }, [backtestsQuery.data]);

  const statusOptions = [
    { value: BacktestStatus.completed, label: "Completed" },
    { value: BacktestStatus.in_progress, label: "In Progress" },
    { value: BacktestStatus.pending, label: "Pending" },
    { value: BacktestStatus.failed, label: "Failed" },
  ];

  const handleStatusToggle = (status: BacktestStatus) => {
    if (selectedStatuses.includes(status)) {
      if (selectedStatuses.length <= 1) return;
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }

    setBacktests([]);
    setPage(1);
  };

  const handleSymbolToggle = (symbol: string) => {
    if (selectedSymbols.includes(symbol)) {
      if (selectedSymbols.length <= 1) return;
      setSelectedSymbols(selectedSymbols.filter((s) => s !== symbol));
    } else {
      setSelectedSymbols([...selectedSymbols, symbol]);
    }

    if (selectedSymbols.length <= 1) return;
    setSelectedSymbols((prev) => {
      return prev.includes(symbol)
        ? prev.filter((s) => s != symbol)
        : [...prev, symbol];
    });

    setBacktests([]);
    setPage(1);
  };

  const getStatusColor = (status: string) => {
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

  const handleDeleteClick = (e: React.MouseEvent, backtestId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setBacktestToDelete(backtestId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (backtestToDelete) {
      await deleteBacktestMutation.mutateAsync(backtestToDelete);
      setDeleteDialogOpen(false);
      setBacktestToDelete(null);
      setPage(1);
      setBacktests([]);
    }
  };

  if (backtestsQuery.error) {
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
                {(backtestsQuery.error as any)?.error ||
                  "Failed to load backtests"}
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
          {/* <div className="relative w-full sm:w-80">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search backtests..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div> */}

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
            <PopoverContent align="start" className="bg-card w-56 p-1">
              <div className="space-y-4">
                <div>
                  {/* <h4 className="mb-3 font-semibold">Status</h4> */}
                  <div className="space-y-1">
                    {statusOptions.map((option) => (
                      <label
                        key={option.value}
                        className="hover:bg-input/30 flex cursor-pointer items-center gap-2 rounded-md p-2"
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
                Symbol
                {selectedSymbols.length > 0 && (
                  <span className="ml-2 rounded-full bg-emerald-500 px-1.5 py-0.5 text-xs text-white">
                    {selectedSymbols.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="bg-card w-56 p-1">
              <div className="space-y-1">
                <div>
                  {/* <h4 className="mb-3 font-semibold">Symbols</h4> */}
                  <div className="space-y-2">
                    {uniqueSymbols.map((symbol) => (
                      <label
                        key={symbol}
                        className="hover:bg-input/30 flex cursor-pointer items-center gap-2 rounded-md p-2"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSymbols.includes(symbol)}
                          onChange={() => handleSymbolToggle(symbol)}
                          className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm">{symbol}</span>
                        <span className="text-muted-foreground ml-auto text-xs">
                          {/* {backtests.filter((b) => b.symbol === symbol).length} */}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Backtests Table */}
        <Card className="border-none bg-transparent">
          <CardContent className="p-0">
            {backtests.length === 10000 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <BarChart3 className="text-muted-foreground mb-4 h-12 w-12" />
                <h3 className="mb-2 text-lg font-semibold">
                  No backtests found
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Run your first backtest to see results here
                </p>
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-500">Symbol</TableHead>
                      <TableHead className="text-gray-500">
                        Backtest ID
                      </TableHead>
                      <TableHead className="text-gray-500">Status</TableHead>
                      <TableHead className="text-gray-500">
                        Starting Balance
                      </TableHead>
                      <TableHead className="text-gray-500">Created</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {backtests
                      .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
                      .map((b) => (
                        <TableRow
                          key={b.backtest_id}
                          className="cursor-pointer"
                          onClick={() =>
                            navigate(`/backtests/${b.backtest_id}`)
                          }
                        >
                          <TableCell className="font-semibold">
                            {b.symbol}
                          </TableCell>
                          <TableCell className="text-muted-foreground font-mono text-xs">
                            {b.backtest_id.substring(0, 8)}...
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(b.status)}>
                              {b.status.replace("_", " ")}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono">
                            ${b.starting_balance.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-sm">
                            {new Date(b.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-600 hover:bg-red-500/10 hover:text-red-700"
                              onClick={(e) =>
                                handleDeleteClick(e, b.backtest_id)
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>

                {backtests.length ? (
                  <PaginationControls
                    page={page}
                    setPage={setPage}
                    data={backtests}
                    pageSize={PAGE_SIZE}
                  />
                ) : (
                  <span className="flex h-20 w-full items-center justify-center text-gray-500">
                    No backtests
                  </span>
                )}
              </>
            )}
          </CardContent>
        </Card>

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
