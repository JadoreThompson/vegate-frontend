import { Filter, PlayCircle } from "lucide-react";
import { type FC, useMemo, useState } from "react";

import PaginationControls from "@/components/pagination-controls";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { usePagination } from "@/hooks/pagination";

export interface Trade {
  id: number;
  date: string;
  symbol: string;
  side: string;
  entry: string;
  exit: string;
  pnl: string;
  pnlPercent: string;
  duration: string;
}

interface TradesTableProps {
  trades: Trade[];
  onReplayClick?: (tradeId: number) => void;
  itemsPerPage?: number;
}

const TradesTable: FC<TradesTableProps> = ({
  trades,
  onReplayClick,
  itemsPerPage = 10,
}) => {
  const [showBuy, setShowBuy] = useState(true);
  const [showSell, setShowSell] = useState(true);

  // Filter trades based on side selection
  const filteredTrades = useMemo(() => {
    return trades.filter((trade) => {
      const isBuy = trade.side === "LONG";
      const isSell = trade.side === "SHORT";

      if (showBuy && isBuy) return true;
      if (showSell && isSell) return true;
      return false;
    });
  }, [trades, showBuy, showSell]);

  // Pagination setup
  const pagination = usePagination<Trade>({
    totalItems: filteredTrades.length,
    itemsPerPage,
  });

  const paginatedTrades = pagination.paginateData(filteredTrades);

  // Handle filter changes - ensure at least one is always enabled
  const handleBuyChange = (checked: boolean) => {
    if (!checked && !showSell) return; // Prevent disabling both
    setShowBuy(checked);
  };

  const handleSellChange = (checked: boolean) => {
    if (!checked && !showBuy) return; // Prevent disabling both
    setShowSell(checked);
  };

  const selectedSidesCount = [showBuy, showSell].filter(Boolean).length;
  const totalSides = 2;

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="mb-3">Recent Trades</CardTitle>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Side
                {selectedSidesCount < totalSides && (
                  <span className="ml-2 rounded-full bg-emerald-500 px-1.5 py-0.5 text-xs text-white">
                    {selectedSidesCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-48">
              <div className="space-y-4">
                <div>
                  <h4 className="mb-3 font-semibold">Side</h4>
                  <div className="space-y-2">
                    <label className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md p-2">
                      <input
                        type="checkbox"
                        checked={showBuy}
                        onChange={(e) => handleBuyChange(e.target.checked)}
                        disabled={showBuy && selectedSidesCount === 1}
                        className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm">LONG</span>
                    </label>
                    <label className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md p-2">
                      <input
                        type="checkbox"
                        checked={showSell}
                        onChange={(e) => handleSellChange(e.target.checked)}
                        disabled={showSell && selectedSidesCount === 1}
                        className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm">SHORT</span>
                    </label>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Side</TableHead>
                <TableHead>Entry</TableHead>
                <TableHead>Exit</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">P&L</TableHead>
                <TableHead className="text-right">P&L %</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTrades.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    No trades found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTrades.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell>{trade.date}</TableCell>
                    <TableCell className="font-semibold">
                      {trade.symbol}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          trade.side === "LONG" ? "default" : "destructive"
                        }
                        className={
                          trade.side === "LONG"
                            ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400"
                            : "bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:text-red-400"
                        }
                      >
                        {trade.side}
                      </Badge>
                    </TableCell>
                    <TableCell>{trade.entry}</TableCell>
                    <TableCell>{trade.exit}</TableCell>
                    <TableCell>{trade.duration}</TableCell>
                    <TableCell
                      className={`text-right font-semibold ${
                        trade.pnl.startsWith("+")
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {trade.pnl}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-right">
                      {trade.pnlPercent}
                    </TableCell>
                    <TableCell className="text-center">
                      {onReplayClick && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onReplayClick(trade.id)}
                          className="h-8 w-8"
                        >
                          <PlayCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {filteredTrades.length > itemsPerPage && (
          <PaginationControls
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.goToPage}
            canGoNext={pagination.canGoNext}
            canGoPrev={pagination.canGoPrev}
            showPageNumbers
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TradesTable;
