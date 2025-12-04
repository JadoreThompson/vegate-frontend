import {
  ArrowLeft,
  Bot,
  Filter,
  MoreVertical,
  Pause,
  Trash2,
} from "lucide-react";
import { useState, type FC } from "react";
import { Link, useParams } from "react-router";

import EquityGraph from "@/components/EquityGraph";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Internal Components
const StrategyHeader: FC<{
  strategy: {
    name: string;
    description: string;
    status: string;
    createdAt: string;
    lastUpdated: string;
  };
  getStatusColor: (status: string) => string;
}> = (props) => (
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
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${props.getStatusColor(props.strategy.status)}`}
          >
            {props.strategy.status}
          </span>
        </div>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          {props.strategy.description}
        </p>
        <div className="text-muted-foreground mt-2 flex gap-4 text-sm">
          <span>Created {props.strategy.createdAt}</span>
          <span>•</span>
          <span>Last updated {props.strategy.lastUpdated}</span>
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
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Pause className="mr-2 h-4 w-4" />
              System Prompt
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Pause className="mr-2 h-4 w-4" />
              Pause Strategy
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:bg-red-500/10 hover:text-red-600 dark:text-red-400"
              size="sm"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Strategy
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  </div>
);

const PerformanceMetrics: FC<{
  strategy: {
    totalPnL: string;
    totalPnLPercent: string;
    totalTrades: number;
    winRate: number;
    avgWin: string;
    avgLoss: string;
    sharpeRatio: number;
    maxDrawdown: string;
  };
}> = (props) => (
  <Card className="lg:w-1/5 lg:flex-shrink-0">
    <CardHeader>
      <CardTitle>Performance Metrics</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Total P&L</span>
          <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
            {props.strategy.totalPnL}
          </span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Return</span>
          <span className="font-semibold">
            {props.strategy.totalPnLPercent}
          </span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Total Trades</span>
          <span className="font-semibold">{props.strategy.totalTrades}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Win Rate</span>
          <span className="font-semibold">{props.strategy.winRate}%</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Avg Win</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            {props.strategy.avgWin}
          </span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Avg Loss</span>
          <span className="font-semibold text-red-600 dark:text-red-400">
            {props.strategy.avgLoss}
          </span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Sharpe Ratio</span>
          <span className="font-semibold">{props.strategy.sharpeRatio}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Max Drawdown</span>
          <span className="font-semibold text-red-600 dark:text-red-400">
            {props.strategy.maxDrawdown}
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const BacktestsTable: FC<{
  backtests: Array<{
    id: number;
    ticker: string;
    startDate: string;
    endDate: string;
    totalReturn: string;
    sharpeRatio: number;
    maxDrawdown: string;
    totalTrades: number;
    winRate: number;
    status: string;
  }>;
  selectedTickers: string[];
  tickerOptions: string[];
  onTickerToggle: (ticker: string) => void;
}> = (props) => {
  const filteredBacktests = props.backtests.filter((b) =>
    props.selectedTickers.includes(b.ticker),
  );

  return (
    <Card>
      <CardHeader>
        <div className="">
          <CardTitle className="mb-3">Backtests</CardTitle>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Ticker
                {props.selectedTickers.length < props.tickerOptions.length && (
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
                    {props.tickerOptions.map((ticker) => (
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
                            props.backtests.filter((b) => b.ticker === ticker)
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
              <TableHead>Ticker</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Total Return</TableHead>
              <TableHead>Sharpe Ratio</TableHead>
              <TableHead>Max Drawdown</TableHead>
              <TableHead>Trades</TableHead>
              <TableHead>Win Rate</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBacktests.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-muted-foreground text-center"
                >
                  No backtests found for selected tickers
                </TableCell>
              </TableRow>
            ) : (
              filteredBacktests.map((backtest) => (
                <TableRow
                  key={backtest.id}
                  className="hover:bg-muted/50 cursor-pointer"
                >
                  <TableCell className="font-medium">
                    {backtest.ticker}
                  </TableCell>
                  <TableCell className="text-sm">
                    {backtest.startDate} to {backtest.endDate}
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        backtest.totalReturn.startsWith("+")
                          ? "font-semibold text-emerald-600 dark:text-emerald-400"
                          : "font-semibold text-red-600 dark:text-red-400"
                      }
                    >
                      {backtest.totalReturn}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">
                    {backtest.sharpeRatio}
                  </TableCell>
                  <TableCell className="font-medium text-red-600 dark:text-red-400">
                    {backtest.maxDrawdown}
                  </TableCell>
                  <TableCell>{backtest.totalTrades}</TableCell>
                  <TableCell>{backtest.winRate}%</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      {backtest.status}
                    </span>
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
  const [selectedTickers, setSelectedTickers] = useState<string[]>([
    "AAPL",
    "GOOGL",
    "MSFT",
    "TSLA",
  ]);

  // Mock data - in real app, fetch based on ID
  const strategy = {
    id: id || "1",
    name: "RSI Mean Reversion",
    description:
      "Buy oversold, sell overbought using RSI indicator with dynamic position sizing based on market volatility",
    status: "active",
    createdAt: "2024-01-15",
    lastUpdated: "2024-01-26",
    totalPnL: "+$2,450.00",
    totalPnLPercent: "+12.3%",
    totalTrades: 45,
    winRate: 68,
    avgWin: "+$125.50",
    avgLoss: "-$87.20",
    sharpeRatio: 1.87,
    maxDrawdown: "-8.4%",
    lastTrade: "2 hours ago",
    systemPrompt: `You are a trading strategy that implements RSI mean reversion with the following rules:

Entry Conditions:
- Enter LONG when RSI(14) drops below 30
- Enter SHORT when RSI(14) rises above 70
- Confirm with volume > 1.5x average

Exit Conditions:
- Exit when RSI returns to 50 (neutral)
- Stop loss at 2% from entry
- Take profit at 5% from entry

Position Sizing:
- Use 2% of portfolio per trade
- Scale position based on volatility (ATR)

Time Filters:
- Only trade between 9:30 AM - 3:30 PM EST
- Avoid trading 30 minutes before major news events`,
  };

  // Mock backtest data
  const backtests = [
    {
      id: 1,
      ticker: "AAPL",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      totalReturn: "+18.5%",
      sharpeRatio: 1.92,
      maxDrawdown: "-12.3%",
      totalTrades: 156,
      winRate: 64,
      status: "completed",
    },
    {
      id: 2,
      ticker: "GOOGL",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      totalReturn: "+22.1%",
      sharpeRatio: 2.14,
      maxDrawdown: "-9.8%",
      totalTrades: 142,
      winRate: 68,
      status: "completed",
    },
    {
      id: 3,
      ticker: "MSFT",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      totalReturn: "+15.3%",
      sharpeRatio: 1.78,
      maxDrawdown: "-14.2%",
      totalTrades: 134,
      winRate: 61,
      status: "completed",
    },
    {
      id: 4,
      ticker: "TSLA",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      totalReturn: "+8.7%",
      sharpeRatio: 1.45,
      maxDrawdown: "-18.5%",
      totalTrades: 178,
      winRate: 58,
      status: "completed",
    },
    {
      id: 5,
      ticker: "AAPL",
      startDate: "2022-01-01",
      endDate: "2022-12-31",
      totalReturn: "+12.8%",
      sharpeRatio: 1.65,
      maxDrawdown: "-15.1%",
      totalTrades: 145,
      winRate: 62,
      status: "completed",
    },
  ];

  const tickerOptions = ["AAPL", "GOOGL", "MSFT", "TSLA"];

  const handleTickerToggle = (ticker: string) => {
    if (selectedTickers.includes(ticker)) {
      if (selectedTickers.length > 1) {
        setSelectedTickers(selectedTickers.filter((t) => t !== ticker));
      }
    } else {
      setSelectedTickers([...selectedTickers, ticker]);
    }
  };

  const filteredBacktests = backtests.filter((b) =>
    selectedTickers.includes(b.ticker),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "paused":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
      case "backtesting":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "draft":
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Link to="/strategies">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Strategies
          </Button>
        </Link>

        <StrategyHeader strategy={strategy} getStatusColor={getStatusColor} />

        <div className="flex flex-col gap-4 lg:flex-row">
          <PerformanceMetrics strategy={strategy} />
          <EquityGraph />
        </div>

        <BacktestsTable
          backtests={backtests}
          selectedTickers={selectedTickers}
          tickerOptions={tickerOptions}
          onTickerToggle={handleTickerToggle}
        />
      </div>
    </DashboardLayout>
  );
};

export default StrategyDetailPage;
