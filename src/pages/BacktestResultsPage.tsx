import {
  Calendar,
  Download
} from "lucide-react";
import { type FC } from "react";
import { Link } from "react-router";

import EquityGraph from "@/components/EquityGraph";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Internal Components
interface SummaryMetricCardProps {
  title: string;
  value: string | number;
  subtitle: React.ReactNode;
  icon: React.ReactNode;
  valueColor?: string;
}

const SummaryMetricCard: FC<SummaryMetricCardProps> = (props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{props.title}</CardTitle>
        {props.icon}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${props.valueColor || ""}`}>
          {props.value}
        </div>
        <p className="text-muted-foreground text-xs">{props.subtitle}</p>
      </CardContent>
    </Card>
  );
};

interface DetailedMetricsCardProps {
  metrics: {
    totalReturn: number;
    sharpeRatio: number;
    maxDrawdown: number;
    profitFactor: number;
    expectancy: number;
    avgWin: number;
    avgLoss: number;
    largestWin: number;
    largestLoss: number;
    totalTrades: number;
    winRate: number;
    avgTradeDuration: string;
  };
}

const DetailedMetricsCard: FC<DetailedMetricsCardProps> = (props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <h4 className="font-semibold">Returns</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">
                  Total Return
                </span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  +{props.metrics.totalReturn}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">
                  Sharpe Ratio
                </span>
                <span className="font-medium">{props.metrics.sharpeRatio}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">
                  Profit Factor
                </span>
                <span className="font-medium">
                  {props.metrics.profitFactor}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">
                  Expectancy
                </span>
                <span className="font-medium">{props.metrics.expectancy}%</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Risk</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">
                  Max Drawdown
                </span>
                <span className="font-medium text-red-600 dark:text-red-400">
                  {props.metrics.maxDrawdown}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Avg Win</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  +{props.metrics.avgWin}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Avg Loss</span>
                <span className="font-medium text-red-600 dark:text-red-400">
                  {props.metrics.avgLoss}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">
                  Largest Win
                </span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  +{props.metrics.largestWin}%
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Trading</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">
                  Total Trades
                </span>
                <span className="font-medium">{props.metrics.totalTrades}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Win Rate</span>
                <span className="font-medium">{props.metrics.winRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">
                  Avg Duration
                </span>
                <span className="font-medium">
                  {props.metrics.avgTradeDuration}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">
                  Largest Loss
                </span>
                <span className="font-medium text-red-600 dark:text-red-400">
                  {props.metrics.largestLoss}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface MonthlyReturnsGridProps {
  monthlyReturns: Array<{ month: string; return: number }>;
}

const MonthlyReturnsGrid: FC<MonthlyReturnsGridProps> = (props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Monthly Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {props.monthlyReturns.map((item) => (
            <div
              key={item.month}
              className="border-border rounded-lg border p-3 text-center"
            >
              <p className="text-muted-foreground mb-1 text-xs">{item.month}</p>
              <p
                className={`font-semibold ${
                  item.return > 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {item.return > 0 ? "+" : ""}
                {item.return}%
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface Trade {
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
}

const TradesTable: FC<TradesTableProps> = (props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Trades</CardTitle>
      </CardHeader>
      <CardContent>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.trades.map((trade) => (
              <TableRow key={trade.id}>
                <TableCell>{trade.date}</TableCell>
                <TableCell className="font-semibold">{trade.symbol}</TableCell>
                <TableCell>
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-medium ${
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const BacktestResultsPage: FC = () => {
  const metrics = {
    totalReturn: 45.6,
    sharpeRatio: 1.87,
    maxDrawdown: -12.3,
    winRate: 64.2,
    profitFactor: 2.34,
    totalTrades: 127,
    avgWin: 2.8,
    avgLoss: -1.9,
    largestWin: 8.4,
    largestLoss: -5.2,
    avgTradeDuration: "2.3 days",
    expectancy: 1.2,
  };

  const monthlyReturns = [
    { month: "Jan", return: 5.2 },
    { month: "Feb", return: 3.8 },
    { month: "Mar", return: -2.1 },
    { month: "Apr", return: 6.4 },
    { month: "May", return: 4.1 },
    { month: "Jun", return: 7.2 },
    { month: "Jul", return: 2.9 },
    { month: "Aug", return: -3.5 },
    { month: "Sep", return: 8.1 },
    { month: "Oct", return: 5.6 },
    { month: "Nov", return: 4.3 },
    { month: "Dec", return: 3.6 },
  ];

  const recentTrades = [
    {
      id: 1,
      date: "2024-01-26",
      symbol: "AAPL",
      side: "LONG",
      entry: "$175.23",
      exit: "$178.45",
      pnl: "+$322.00",
      pnlPercent: "+1.84%",
      duration: "2.5 days",
    },
    {
      id: 2,
      date: "2024-01-24",
      symbol: "TSLA",
      side: "SHORT",
      entry: "$242.50",
      exit: "$238.20",
      pnl: "+$430.00",
      pnlPercent: "+1.77%",
      duration: "1.2 days",
    },
    {
      id: 3,
      date: "2024-01-22",
      symbol: "SPY",
      side: "LONG",
      entry: "$445.67",
      exit: "$443.12",
      pnl: "-$255.00",
      pnlPercent: "-0.57%",
      duration: "3.1 days",
    },
    {
      id: 4,
      date: "2024-01-20",
      symbol: "NVDA",
      side: "LONG",
      entry: "$520.30",
      exit: "$532.45",
      pnl: "+$1,215.00",
      pnlPercent: "+2.34%",
      duration: "4.3 days",
    },
    {
      id: 5,
      date: "2024-01-18",
      symbol: "MSFT",
      side: "LONG",
      entry: "$402.15",
      exit: "$398.90",
      pnl: "-$325.00",
      pnlPercent: "-0.81%",
      duration: "2.8 days",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Link
                to="/backtests"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Backtests
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm">RSI Mean Reversion</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Backtest Results
            </h2>
            <p className="text-muted-foreground">
              Testing period: Jan 1, 2023 - Dec 31, 2023 (1 year)
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Link to="/strategies/1/deploy">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Deploy Strategy
              </Button>
            </Link>
          </div>
        </div>

        {/* Key Metrics */}
        {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SummaryMetricCard
            title="Total Return"
            value={`+${metrics.totalReturn}%`}
            subtitle={
              <>
                <ArrowUp className="mr-1 h-3 w-3 text-emerald-500" />$
                {(10000 * (metrics.totalReturn / 100)).toFixed(0)} on $10k
              </>
            }
            icon={<TrendingUp className="text-muted-foreground h-4 w-4" />}
            valueColor="text-emerald-600 dark:text-emerald-400"
          />

          <SummaryMetricCard
            title="Sharpe Ratio"
            value={metrics.sharpeRatio}
            subtitle="Risk-adjusted return"
            icon={<BarChart3 className="text-muted-foreground h-4 w-4" />}
          />

          <SummaryMetricCard
            title="Max Drawdown"
            value={`${metrics.maxDrawdown}%`}
            subtitle={
              <>
                <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                Largest peak-to-trough
              </>
            }
            icon={<TrendingDown className="text-muted-foreground h-4 w-4" />}
            valueColor="text-red-600 dark:text-red-400"
          />

          <SummaryMetricCard
            title="Win Rate"
            value={`${metrics.winRate}%`}
            subtitle={`${Math.round((metrics.totalTrades * metrics.winRate) / 100)} of ${metrics.totalTrades} trades`}
            icon={<Percent className="text-muted-foreground h-4 w-4" />}
          />
        </div> */}

        {/* Equity Curve with Statistics */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Statistics Card */}
          <PerformanceMetrics
            totalPnl={10000 * (metrics.totalReturn / 100)}
            returnPercentage={metrics.totalReturn}
            totalTrades={metrics.totalTrades}
            winRate={metrics.winRate}
            avgWin={metrics.avgWin}
            avgLoss={metrics.avgLoss}
            sharpeRatio={metrics.sharpeRatio}
            maxDrawdown={metrics.maxDrawdown}
          />

          {/* Equity Graph */}
          <EquityGraph
            equityData={undefined}
            drawdownData={undefined}
            title="Equity Curve"
          />
        </div>

        {/* Detailed Metrics */}
        <DetailedMetricsCard metrics={metrics} />

        {/* Monthly Returns & Trade List */}
        {/* <Tabs defaultValue="monthly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="monthly">Monthly Returns</TabsTrigger>
            <TabsTrigger value="trades">Trade List</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly">
            <MonthlyReturnsGrid monthlyReturns={monthlyReturns} />
          </TabsContent>

          <TabsContent value="trades">
            <TradesTable trades={recentTrades} />
          </TabsContent>
        </Tabs> */}

        <MonthlyReturnsGrid monthlyReturns={monthlyReturns} />
        <TradesTable trades={recentTrades} />
      </div>
    </DashboardLayout>
  );
};

export default BacktestResultsPage;
