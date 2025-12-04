import { Calendar, ChevronDown, Download, Filter, Search } from "lucide-react";
import { useState, type FC } from "react";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

const TradeHistoryPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const trades = [
    {
      id: 1,
      date: "2024-01-26 14:32:15",
      strategy: "RSI Mean Reversion",
      symbol: "AAPL",
      side: "LONG",
      entryPrice: 175.23,
      exitPrice: 178.45,
      quantity: 100,
      pnl: 322.0,
      pnlPercent: 1.84,
      commission: 2.0,
      duration: "2d 5h",
    },
    {
      id: 2,
      date: "2024-01-24 10:15:42",
      strategy: "Momentum Breakout",
      symbol: "TSLA",
      side: "SHORT",
      entryPrice: 242.5,
      exitPrice: 238.2,
      quantity: 100,
      pnl: 430.0,
      pnlPercent: 1.77,
      commission: 2.0,
      duration: "1d 4h",
    },
    {
      id: 3,
      date: "2024-01-22 09:45:30",
      strategy: "Trend Following MA Cross",
      symbol: "SPY",
      side: "LONG",
      entryPrice: 445.67,
      exitPrice: 443.12,
      quantity: 100,
      pnl: -255.0,
      pnlPercent: -0.57,
      commission: 2.0,
      duration: "3d 2h",
    },
    {
      id: 4,
      date: "2024-01-20 13:20:18",
      strategy: "RSI Mean Reversion",
      symbol: "NVDA",
      side: "LONG",
      entryPrice: 520.3,
      exitPrice: 532.45,
      quantity: 100,
      pnl: 1215.0,
      pnlPercent: 2.34,
      commission: 2.0,
      duration: "4d 6h",
    },
    {
      id: 5,
      date: "2024-01-18 11:55:22",
      strategy: "Volatility Squeeze",
      symbol: "MSFT",
      side: "LONG",
      entryPrice: 402.15,
      exitPrice: 398.9,
      quantity: 100,
      pnl: -325.0,
      pnlPercent: -0.81,
      commission: 2.0,
      duration: "2d 8h",
    },
    {
      id: 6,
      date: "2024-01-16 15:40:55",
      strategy: "Momentum Breakout",
      symbol: "GOOGL",
      side: "LONG",
      entryPrice: 142.8,
      exitPrice: 146.2,
      quantity: 150,
      pnl: 510.0,
      pnlPercent: 2.38,
      commission: 2.5,
      duration: "3d 1h",
    },
    {
      id: 7,
      date: "2024-01-14 08:30:12",
      strategy: "RSI Mean Reversion",
      symbol: "META",
      side: "SHORT",
      entryPrice: 385.6,
      exitPrice: 380.4,
      quantity: 80,
      pnl: 416.0,
      pnlPercent: 1.35,
      commission: 1.8,
      duration: "1d 9h",
    },
    {
      id: 8,
      date: "2024-01-12 12:18:45",
      strategy: "Trend Following MA Cross",
      symbol: "AMD",
      side: "LONG",
      entryPrice: 158.9,
      exitPrice: 163.2,
      quantity: 120,
      pnl: 516.0,
      pnlPercent: 2.71,
      commission: 2.2,
      duration: "5d 3h",
    },
  ];

  const summary = {
    totalTrades: trades.length,
    winningTrades: trades.filter((t) => t.pnl > 0).length,
    losingTrades: trades.filter((t) => t.pnl < 0).length,
    totalPnL: trades.reduce((sum, t) => sum + t.pnl, 0),
    totalCommissions: trades.reduce((sum, t) => sum + t.commission, 0),
    avgWin:
      trades.filter((t) => t.pnl > 0).reduce((sum, t) => sum + t.pnl, 0) /
      trades.filter((t) => t.pnl > 0).length,
    avgLoss:
      trades.filter((t) => t.pnl < 0).reduce((sum, t) => sum + t.pnl, 0) /
      trades.filter((t) => t.pnl < 0).length,
  };

  const winRate = (summary.winningTrades / summary.totalTrades) * 100;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Trade History</h2>
            <p className="text-muted-foreground">
              Complete record of all executed trades
            </p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  summary.totalPnL > 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {summary.totalPnL > 0 ? "+" : ""}${summary.totalPnL.toFixed(2)}
              </div>
              <p className="text-muted-foreground text-xs">
                ${summary.totalCommissions.toFixed(2)} in commissions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{winRate.toFixed(1)}%</div>
              <p className="text-muted-foreground text-xs">
                {summary.winningTrades} wins / {summary.losingTrades} losses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Win</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                +${summary.avgWin.toFixed(2)}
              </div>
              <p className="text-muted-foreground text-xs">Per winning trade</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                ${summary.avgLoss.toFixed(2)}
              </div>
              <p className="text-muted-foreground text-xs">Per losing trade</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Search by symbol or strategy..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-64">
                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-2 font-semibold">Strategy</h4>
                        <div className="space-y-2 text-sm">
                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            <span>RSI Mean Reversion</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            <span>Momentum Breakout</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            <span>Trend Following</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold">Side</h4>
                        <div className="space-y-2 text-sm">
                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            <span>Long</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            <span>Short</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Date Range
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end">
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        Last 7 days
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        Last 30 days
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        Last 90 days
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        This year
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        All time
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trade Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Trades ({trades.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Strategy</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Side</TableHead>
                    <TableHead className="text-right">Entry</TableHead>
                    <TableHead className="text-right">Exit</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">P&L</TableHead>
                    <TableHead className="text-right">%</TableHead>
                    <TableHead>Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trades.map((trade) => (
                    <TableRow
                      key={trade.id}
                      className="hover:bg-accent cursor-pointer"
                    >
                      <TableCell className="font-mono text-xs">
                        {trade.date}
                      </TableCell>
                      <TableCell className="text-sm">
                        {trade.strategy}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {trade.symbol}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${
                            trade.side === "LONG"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "bg-red-500/10 text-red-600 dark:text-red-400"
                          }`}
                        >
                          {trade.side}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        ${trade.entryPrice.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        ${trade.exitPrice.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {trade.quantity}
                      </TableCell>
                      <TableCell
                        className={`text-right font-mono font-semibold ${
                          trade.pnl > 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {trade.pnl > 0 ? "+" : ""}${trade.pnl.toFixed(2)}
                      </TableCell>
                      <TableCell
                        className={`text-right font-mono text-sm ${
                          trade.pnlPercent > 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {trade.pnlPercent > 0 ? "+" : ""}
                        {trade.pnlPercent.toFixed(2)}%
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {trade.duration}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TradeHistoryPage;
