import {
  ArrowLeft,
  FastForward,
  Maximize,
  Pause,
  Play,
  Rewind,
  TrendingUp,
  X,
} from "lucide-react";
import { useState, type FC } from "react";
import { Link, useParams } from "react-router";

import Pagination from "@/components/Pagination";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePagination } from "@/hooks/use-pagination";

// Internal Components
const ConfigurationForm: FC<{
  onRunBacktest: (config: any) => void;
}> = (props) => {
  const [ticker, setTicker] = useState("AAPL");
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2023-12-31");
  const [balance, setBalance] = useState("10000");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onRunBacktest({ ticker, startDate, endDate, balance });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Backtest Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ticker">Ticker Symbol</Label>
              <Input
                id="ticker"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                placeholder="AAPL"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="balance">Starting Balance ($)</Label>
              <Input
                id="balance"
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder="10000"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            Run Backtest
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const StatsPanel: FC<{
  stats: {
    sharpeRatio: number;
    winRate: number;
    finalBalance: string;
    totalReturn: string;
    maxDrawdown: string;
    totalTrades: number;
    avgWin: string;
    avgLoss: string;
  };
}> = (props) => (
  <Card className="lg:w-1/5 lg:flex-shrink-0">
    <CardHeader>
      <CardTitle>Statistics</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Final Balance</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">
            {props.stats.finalBalance}
          </span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Total Return</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            {props.stats.totalReturn}
          </span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Sharpe Ratio</span>
          <span className="font-semibold">{props.stats.sharpeRatio}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Win Rate</span>
          <span className="font-semibold">{props.stats.winRate}%</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Max Drawdown</span>
          <span className="font-semibold text-red-600 dark:text-red-400">
            {props.stats.maxDrawdown}
          </span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Total Trades</span>
          <span className="font-semibold">{props.stats.totalTrades}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Avg Win</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            {props.stats.avgWin}
          </span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Avg Loss</span>
          <span className="font-semibold text-red-600 dark:text-red-400">
            {props.stats.avgLoss}
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const EquityChart: FC = () => (
  <Card className="lg:flex-1">
    <CardHeader>
      <CardTitle>Account Balance Over Time</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-muted-foreground flex h-[400px] items-center justify-center">
        <div className="text-center">
          <TrendingUp className="mx-auto mb-4 h-12 w-12 opacity-20" />
          <p>Equity curve visualization</p>
          <p className="text-sm">Chart will display balance fluctuations</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const TradesTable: FC<{
  trades: Array<{
    id: number;
    date: string;
    ticker: string;
    side: string;
    entry: string;
    exit: string;
    quantity: number;
    pnl: string;
    pnlPercent: string;
  }>;
}> = (props) => {
  const pagination = usePagination({
    totalItems: props.trades.length,
    itemsPerPage: 10,
  });

  const paginatedTrades = pagination.paginateData(props.trades);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Trades</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Ticker</TableHead>
              <TableHead>Side</TableHead>
              <TableHead>Entry</TableHead>
              <TableHead>Exit</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>P&L</TableHead>
              <TableHead>P&L %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTrades.map((trade) => (
              <TableRow key={trade.id}>
                <TableCell>{trade.date}</TableCell>
                <TableCell className="font-medium">{trade.ticker}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      trade.side === "LONG"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-red-500/10 text-red-600 dark:text-red-400"
                    }`}
                  >
                    {trade.side}
                  </span>
                </TableCell>
                <TableCell>{trade.entry}</TableCell>
                <TableCell>{trade.exit}</TableCell>
                <TableCell>{trade.quantity}</TableCell>
                <TableCell>
                  <span
                    className={
                      trade.pnl.startsWith("+")
                        ? "font-semibold text-emerald-600 dark:text-emerald-400"
                        : "font-semibold text-red-600 dark:text-red-400"
                    }
                  >
                    {trade.pnl}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={
                      trade.pnlPercent.startsWith("+")
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    }
                  >
                    {trade.pnlPercent}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.goToPage}
            canGoNext={pagination.canGoNext}
            canGoPrev={pagination.canGoPrev}
            showPageNumbers={true}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const DetailedStats: FC<{
  stats: {
    longsWon: number;
    longsLost: number;
    shortsWon: number;
    shortsLost: number;
    avgHoldTime: string;
    largestWin: string;
    largestLoss: string;
    consecutiveWins: number;
    consecutiveLosses: number;
  };
}> = (props) => (
  <Card>
    <CardHeader>
      <CardTitle>Detailed Statistics</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-3">
          <h4 className="font-semibold">Long Positions</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Wins</span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                {props.stats.longsWon}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Losses</span>
              <span className="font-medium text-red-600 dark:text-red-400">
                {props.stats.longsLost}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">Short Positions</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Wins</span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                {props.stats.shortsWon}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Losses</span>
              <span className="font-medium text-red-600 dark:text-red-400">
                {props.stats.shortsLost}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">Trade Metrics</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">
                Avg Hold Time
              </span>
              <span className="font-medium">{props.stats.avgHoldTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Largest Win</span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                {props.stats.largestWin}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">
                Largest Loss
              </span>
              <span className="font-medium text-red-600 dark:text-red-400">
                {props.stats.largestLoss}
              </span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ReplayMode: FC<{
  onClose: () => void;
}> = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const speeds = [0.5, 1, 2, 5, 10];

  const cycleSpeed = () => {
    const currentIndex = speeds.indexOf(speed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setSpeed(speeds[nextIndex]);
  };

  return (
    <div className="bg-background fixed inset-0 z-50">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="border-border flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-bold">Replay Mode</h2>
          <Button variant="ghost" size="icon" onClick={props.onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Chart Area */}
        <div className="flex-1 p-4">
          <div className="border-border bg-muted/20 flex h-full items-center justify-center rounded-lg border">
            <div className="text-center">
              <TrendingUp className="mx-auto mb-4 h-16 w-16 opacity-20" />
              <p className="text-muted-foreground text-lg">
                OHLC Candlestick Chart
              </p>
              <p className="text-muted-foreground text-sm">
                Chart visualization will appear here
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="border-border bg-card border-t p-4">
          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" size="icon">
              <Rewind className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <Button variant="outline" size="icon">
              <FastForward className="h-5 w-5" />
            </Button>
            <Separator orientation="vertical" className="h-8" />
            <Button
              variant="ghost"
              size="sm"
              onClick={cycleSpeed}
              className="min-w-[80px] bg-transparent"
            >
              {speed}x Speed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Page Component
const BacktestDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hasResults, setHasResults] = useState(true);
  const [showReplay, setShowReplay] = useState(false);

  // Mock data
  const stats = {
    sharpeRatio: 1.87,
    winRate: 64.2,
    finalBalance: "$14,560",
    totalReturn: "+45.6%",
    maxDrawdown: "-12.3%",
    totalTrades: 127,
    avgWin: "+$85.20",
    avgLoss: "-$42.30",
  };

  const detailedStats = {
    longsWon: 45,
    longsLost: 23,
    shortsWon: 37,
    shortsLost: 22,
    avgHoldTime: "2.3 days",
    largestWin: "+$542.00",
    largestLoss: "-$287.00",
    consecutiveWins: 7,
    consecutiveLosses: 4,
  };

  const trades = Array.from({ length: 127 }, (_, i) => ({
    id: i + 1,
    date: `2023-${String(Math.floor(i / 10) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
    ticker: "AAPL",
    side: i % 3 === 0 ? "SHORT" : "LONG",
    entry: `$${(170 + Math.random() * 20).toFixed(2)}`,
    exit: `$${(170 + Math.random() * 20).toFixed(2)}`,
    quantity: Math.floor(Math.random() * 100) + 10,
    pnl:
      i % 3 === 0
        ? `-$${(Math.random() * 100).toFixed(2)}`
        : `+$${(Math.random() * 200).toFixed(2)}`,
    pnlPercent:
      i % 3 === 0
        ? `-${(Math.random() * 3).toFixed(2)}%`
        : `+${(Math.random() * 5).toFixed(2)}%`,
  }));

  const handleRunBacktest = (config: any) => {
    console.log("Running backtest with config:", config);
    setHasResults(true);
  };

  if (showReplay) {
    return <ReplayMode onClose={() => setShowReplay(false)} />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link to="/strategies/1">
              <Button variant="ghost" size="sm" className="mb-2 gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Strategy
              </Button>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight">
              Backtest #{id}
            </h2>
            <p className="text-muted-foreground">RSI Mean Reversion Strategy</p>
          </div>
          {hasResults && (
            <Button
              onClick={() => setShowReplay(true)}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Maximize className="mr-2 h-4 w-4" />
              Replay Session
            </Button>
          )}
        </div>

        {/* Configuration Form */}
        {!hasResults && <ConfigurationForm onRunBacktest={handleRunBacktest} />}

        {/* Results */}
        {hasResults && (
          <>
            {/* Stats Panel and Chart */}
            <div className="flex flex-col gap-4 lg:flex-row">
              <StatsPanel stats={stats} />
              <EquityChart />
            </div>

            {/* Trades Table */}
            <TradesTable trades={trades} />

            {/* Detailed Statistics */}
            <DetailedStats stats={detailedStats} />
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BacktestDetailPage;
