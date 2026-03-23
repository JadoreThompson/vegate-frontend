import {
  ArrowLeft,
  Bot,
  Building2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Loader2,
  NotepadTextIcon,
  Plus,
  Trash2,
} from "lucide-react";
import { useState, type FC } from "react";
import { Link, useNavigate, useParams } from "react-router";

import EquityGraphNew from "@/components/equity-graph-new";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import PerformanceMetricsCard from "@/components/performance-metrics-card";
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
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  useBacktestsQuery,
  useCreateBacktestForStrategyMutation,
} from "@/hooks/queries/backtest-hooks";
import { useBrokerConnectionsQuery } from "@/hooks/queries/broker-hooks";
import {
  useDeployStrategy,
  useStrategyDeployments,
} from "@/hooks/queries/deployment-hooks";
import {
  useDeleteStrategy,
  useStrategyQuery,
  useStrategySummary,
} from "@/hooks/queries/strategy-hooks";
import {
  BacktestStatus,
  DeploymentStatus,
  Timeframe,
  type ApiRoutesStrategiesModelsBacktestResponse,
  type BrokerConnectionResponse,
  type DeploymentResponse,
  type StrategySummaryResponse,
} from "@/openapi";

const USE_MOCK_DATA = true;

const MOCK_STRATEGY_ID = "strat_01hxytradealpha";

const MOCK_STRATEGY_SUMMARY: StrategySummaryResponse = {
  strategy_id: MOCK_STRATEGY_ID,
  name: "Momentum Breakout AI",
  description:
    "Breakout strategy that enters on high-volume momentum and exits on trailing weakness.",
  created_at: "2026-02-10T09:15:00Z",
  updated_at: "2026-03-18T14:42:00Z",
  metrics: {
    realised_pnl: 4287.52,
    unrealised_pnl: 312.18,
    total_return_pct: 0.184,
    sharpe_ratio: 1.73,
    max_drawdown: -0.086,
    total_trades: 47,
    equity_curve: [
      { timestamp: "2026-02-10T00:00:00Z", value: 10000 },
      { timestamp: "2026-02-14T00:00:00Z", value: 10240 },
      { timestamp: "2026-02-18T00:00:00Z", value: 10110 },
      { timestamp: "2026-02-22T00:00:00Z", value: 10590 },
      { timestamp: "2026-02-26T00:00:00Z", value: 10840 },
      { timestamp: "2026-03-02T00:00:00Z", value: 10720 },
      { timestamp: "2026-03-06T00:00:00Z", value: 11080 },
      { timestamp: "2026-03-10T00:00:00Z", value: 11340 },
      { timestamp: "2026-03-14T00:00:00Z", value: 11620 },
      { timestamp: "2026-03-18T00:00:00Z", value: 11840 },
    ],
  },
};

const MOCK_STRATEGY_DETAILS = {
  strategy_id: MOCK_STRATEGY_ID,
  name: "Momentum Breakout AI",
  description:
    "Breakout strategy that enters on high-volume momentum and exits on trailing weakness.",
  created_at: "2026-02-10T09:15:00Z",
  updated_at: "2026-03-18T14:42:00Z",
  code: `def generate_signal(data):
    close = data["close"]
    volume = data["volume"]
    high_20 = close.rolling(20).max()
    avg_volume = volume.rolling(20).mean()

    breakout = close.iloc[-1] >= high_20.iloc[-2]
    strong_volume = volume.iloc[-1] > avg_volume.iloc[-1] * 1.5

    if breakout and strong_volume:
        return "buy"

    if close.iloc[-1] < close.rolling(10).mean().iloc[-1]:
        return "sell"

    return "hold"`,
  prompt: `Build a momentum breakout strategy for large-cap US equities.

Rules:
- Trade liquid stocks only
- Buy when price breaks above the 20-day high
- Confirm with volume at least 1.5x the 20-day average
- Use 1D candles
- Exit when price closes below the 10-day moving average
- Keep risk conservative
- Optimize for steady returns and low drawdown`,
};

const MOCK_BACKTESTS: ApiRoutesStrategiesModelsBacktestResponse[] = [
  {
    backtest_id: "bt_01hxy_aapl_001",
    strategy_id: MOCK_STRATEGY_ID,
    symbol: "AAPL",
    broker: "alpaca",
    timeframe: Timeframe["1d"],
    starting_balance: 10000,
    start_date: "2025-01-01",
    end_date: "2025-12-31",
    status: BacktestStatus.completed,
    created_at: "2026-03-01T10:00:00Z",
  },
  {
    backtest_id: "bt_01hxy_tsla_002",
    strategy_id: MOCK_STRATEGY_ID,
    symbol: "TSLA",
    broker: "alpaca",
    timeframe: Timeframe["1d"],
    starting_balance: 15000,
    start_date: "2025-01-01",
    end_date: "2025-12-31",
    status: BacktestStatus.completed,
    created_at: "2026-03-03T12:30:00Z",
  },
  {
    backtest_id: "bt_01hxy_nvda_003",
    strategy_id: MOCK_STRATEGY_ID,
    symbol: "NVDA",
    broker: "alpaca",
    timeframe: Timeframe["1h"],
    starting_balance: 20000,
    start_date: "2025-06-01",
    end_date: "2025-12-31",
    status: BacktestStatus.running,
    created_at: "2026-03-05T08:45:00Z",
  },
  {
    backtest_id: "bt_01hxy_msft_004",
    strategy_id: MOCK_STRATEGY_ID,
    symbol: "MSFT",
    broker: "alpaca",
    timeframe: Timeframe["1d"],
    starting_balance: 12000,
    start_date: "2024-01-01",
    end_date: "2024-12-31",
    status: BacktestStatus.failed,
    created_at: "2026-03-07T16:20:00Z",
  },
  {
    backtest_id: "bt_01hxy_meta_005",
    strategy_id: MOCK_STRATEGY_ID,
    symbol: "META",
    broker: "alpaca",
    timeframe: Timeframe["4h"],
    starting_balance: 18000,
    start_date: "2025-03-01",
    end_date: "2025-11-30",
    status: BacktestStatus.pending,
    created_at: "2026-03-09T09:10:00Z",
  },
];

const MOCK_DEPLOYMENTS: DeploymentResponse[] = [
  {
    deployment_id: "dep_01hxy_live_001",
    strategy_id: MOCK_STRATEGY_ID,
    broker_connection_id: "conn_01hxy_alpaca_001",
    symbol: "AAPL",
    timeframe: Timeframe["1d"],
    starting_balance: 10000,
    status: DeploymentStatus.running,
    error_message: null,
    created_at: "2026-03-10T13:00:00Z",
    updated_at: "2026-03-20T10:15:00Z",
    stopped_at: null,
  },
  {
    deployment_id: "dep_01hxy_live_002",
    strategy_id: MOCK_STRATEGY_ID,
    broker_connection_id: "conn_01hxy_alpaca_001",
    symbol: "NVDA",
    timeframe: Timeframe["1h"],
    starting_balance: 15000,
    status: DeploymentStatus.pending,
    error_message: null,
    created_at: "2026-03-16T09:20:00Z",
    updated_at: "2026-03-16T09:20:00Z",
    stopped_at: null,
  },
  {
    deployment_id: "dep_01hxy_live_003",
    strategy_id: MOCK_STRATEGY_ID,
    broker_connection_id: "conn_01hxy_alpaca_002",
    symbol: "TSLA",
    timeframe: Timeframe["15m"],
    starting_balance: 8000,
    status: DeploymentStatus.error,
    error_message: "Market data stream disconnected",
    created_at: "2026-03-08T11:40:00Z",
    updated_at: "2026-03-08T12:05:00Z",
    stopped_at: null,
  },
  {
    deployment_id: "dep_01hxy_live_004",
    strategy_id: MOCK_STRATEGY_ID,
    broker_connection_id: "conn_01hxy_alpaca_002",
    symbol: "MSFT",
    timeframe: Timeframe["1d"],
    starting_balance: 11000,
    status: DeploymentStatus.stopped,
    error_message: null,
    created_at: "2026-02-25T07:30:00Z",
    updated_at: "2026-03-02T18:00:00Z",
    stopped_at: "2026-03-02T18:00:00Z",
  },
];

const MOCK_BROKER_CONNECTIONS: BrokerConnectionResponse[] = [
  {
    connection_id: "conn_01hxy_alpaca_001",
    broker: "alpaca",
    broker_account_id: "PA-38291",
  },
  {
    connection_id: "conn_01hxy_alpaca_002",
    broker: "alpaca",
    broker_account_id: "PA-77420",
  },
];

const DeploymentsTable: FC<{
  deployments: DeploymentResponse[];
  onCreateClick: () => void;
}> = (props) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handleRowClick = (deploymentId: string) => {
    navigate(`/deployments/${deploymentId}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const getStatusColor = (status: DeploymentStatus) => {
    switch (status) {
      case DeploymentStatus.running:
        return "bg-primary/10 text-primary dark:text-primary border-primary/20";
      case DeploymentStatus.pending:
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
      case DeploymentStatus.error:
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
      case DeploymentStatus.stopped:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(props.deployments.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDeployments = props.deployments.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <h3 className="w-full text-left text-xl font-semibold sm:w-auto">
          Live Deployments
        </h3>
        <div className="flex w-full justify-end sm:w-auto sm:flex-none">
          <Button
            size="sm"
            onClick={props.onCreateClick}
            className="!bg-primary hover:bg-primary"
          >
            <Plus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:block">Create Deployment</span>
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-gray-500">ID</TableHead>
            <TableHead className="text-gray-500">Symbol</TableHead>
            <TableHead className="text-gray-500">Timeframe</TableHead>
            <TableHead className="text-gray-500">Started</TableHead>
            <TableHead className="text-gray-500">Starting Balance</TableHead>
            <TableHead className="text-gray-500">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.deployments.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-muted-foreground text-center"
              >
                No live deployments
              </TableCell>
            </TableRow>
          ) : (
            paginatedDeployments.map((deployment) => (
              <TableRow
                key={deployment.deployment_id}
                className="cursor-pointer"
                onClick={() => handleRowClick(deployment.deployment_id)}
              >
                <TableCell className="font-mono text-xs">
                  {deployment.deployment_id.substring(0, 8)}...
                </TableCell>
                <TableCell className="font-medium">
                  {deployment.symbol}
                </TableCell>
                <TableCell>{deployment.timeframe}</TableCell>
                <TableCell>
                  {new Date(deployment.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>${deployment.starting_balance}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(deployment.status)}>
                    {deployment.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {props.deployments.length > itemsPerPage && (
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
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const BacktestsTable: FC<{
  strategyId: string;
  backtests: ApiRoutesStrategiesModelsBacktestResponse[];
  selectedTickers: string[];
  symbolOptions: string[];
  onTickerToggle: (symbol: string) => void;
  onCreateClick: () => void;
}> = (props) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const filteredBacktests = props.backtests.filter((b) =>
    props.selectedTickers.includes(b.symbol),
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredBacktests.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBacktests = filteredBacktests.slice(startIndex, endIndex);

  const handleRowClick = (backtestId: string) => {
    navigate(`/backtests/${backtestId}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const getStatusColor = (status: BacktestStatus) => {
    switch (status) {
      case BacktestStatus.completed:
        return "bg-primary/10 text-primary dark:text-primary border-primary/20";
      case BacktestStatus.running:
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case BacktestStatus.pending:
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
      case BacktestStatus.failed:
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <h3 className="w-full text-left text-xl font-semibold sm:w-fit">
          Backtests
        </h3>
        <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-normal">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="!bg-secondary-foreground"
              >
                <Filter className="mr-2 h-4 w-4" />
                Ticker
                {props.selectedTickers.length < props.symbolOptions.length && (
                  <span className="bg-primary ml-2 rounded-full px-1.5 py-0.5 text-xs text-white">
                    {props.selectedTickers.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="bg-card w-48 p-1">
              <div className="space-y-4">
                <div>
                  {/* <h4 className="mb-3 font-semibold">Ticker</h4> */}
                  <div className="space-y-2">
                    {props.symbolOptions.map((ticker) => (
                      <label
                        key={ticker}
                        className="hover:bg-input/30 flex cursor-pointer items-center gap-2 rounded-md p-2"
                      >
                        <Input
                          type="checkbox"
                          checked={props.selectedTickers.includes(ticker)}
                          onChange={() => props.onTickerToggle(ticker)}
                          disabled={
                            props.selectedTickers.includes(ticker) &&
                            props.selectedTickers.length === 1
                          }
                          className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
                        />
                        <span className="text-sm">{ticker}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button
            size="sm"
            onClick={props.onCreateClick}
            className="!bg-primary hover:bg-primary"
          >
            <Plus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:block">Create Backtest</span>
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-gray-500">Symbol</TableHead>
            <TableHead className="text-gray-500">Starting Balance</TableHead>
            <TableHead className="text-gray-500">Status</TableHead>
            <TableHead className="text-gray-500">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBacktests.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-muted-foreground text-center"
              >
                No backtests found. Create one to get started!
              </TableCell>
            </TableRow>
          ) : (
            paginatedBacktests.map((backtest) => (
              <TableRow
                key={backtest.backtest_id}
                className="cursor-pointer"
                onClick={() => handleRowClick(backtest.backtest_id)}
              >
                <TableCell className="font-medium">{backtest.symbol}</TableCell>
                <TableCell>${backtest.starting_balance}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(backtest.status)}>
                    {backtest.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(backtest.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {filteredBacktests.length > itemsPerPage && (
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
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// Custom hook for managing prompt modal
const useViewPrompt = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleViewPrompt = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    handleViewPrompt,
    handleClose,
  };
};

// Main Page Component
const StrategyDetailPageNew: FC = () => {
  const { strategyId } = useParams<{ strategyId: string }>();
  const navigate = useNavigate();

  const [selectedTickers, setSelectedTickers] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const {
    isOpen: isPromptModalOpen,
    handleViewPrompt,
    handleClose: handleClosePromptModal,
  } = useViewPrompt();
  const [createBacktestDialogOpen, setCreateBacktestDialogOpen] =
    useState(false);
  const [newBacktestTicker, setNewBacktestTicker] = useState("");
  const [newBacktestBalance, setNewBacktestBalance] = useState("10000");
  const [newBacktestTimeframe, setNewBacktestTimeframe] = useState<Timeframe>(
    Timeframe["1d"],
  );
  const [newBacktestStartDate, setNewBacktestStartDate] = useState("");
  const [newBacktestEndDate, setNewBacktestEndDate] = useState("");

  // Create Deployment Dialog State
  const [createDeploymentDialogOpen, setCreateDeploymentDialogOpen] =
    useState(false);
  const [newDeploymentBrokerConnectionId, setNewDeploymentBrokerConnectionId] =
    useState("");
  const [newDeploymentSymbol, setNewDeploymentTicker] = useState("");
  const [newDeploymentTimeframe, setNewDeploymentTimeframe] =
    useState<Timeframe>(Timeframe["1d"]);
  const [newDeploymentBalance, setNewDeploymentBalance] = useState("10000");

  // Fetch strategy summary with metrics
  const strategySummaryQuery = useStrategySummary(strategyId || "");
  const strategyDetailsQuery = useStrategyQuery(strategyId || "");
  const deleteStrategyMutation = useDeleteStrategy();

  // Fetch backtests for this strategy
  const backtestsQuery = useBacktestsQuery();
  const createBacktestMutation = useCreateBacktestForStrategyMutation();

  // Fetch deployments for this strategy
  const deploymentsQuery = useStrategyDeployments(strategyId || "");

  // Fetch broker connections
  const brokerConnectionsQuery = useBrokerConnectionsQuery();
  const deployStrategyMutation = useDeployStrategy();

  // const strategy = strategySummaryQuery.data as
  //   | StrategySummaryResponse
  //   | undefined;

  const strategy = MOCK_STRATEGY_SUMMARY;

  // Filter backtests by strategy_id
  // const allBacktests =
  //   (backtestsQuery.data as
  //     | ApiRoutesStrategiesModelsBacktestResponse[]
  //     | undefined) || [];
  const allBacktests = MOCK_BACKTESTS;
  // const strategyBacktests = allBacktests.filter(
  //   (b: ApiRoutesStrategiesModelsBacktestResponse) =>
  //     b.strategy_id === strategyId,
  // );
  const strategyBacktests = allBacktests;

  // Get unique tickers from backtests
  const uniqueTickers = Array.from(
    new Set(
      strategyBacktests.map(
        (b: ApiRoutesStrategiesModelsBacktestResponse) => b.symbol,
      ),
    ),
  );
  const tickerOptions = uniqueTickers as string[];

  // Initialize selected tickers with all available tickers
  if (selectedTickers.length === 0 && uniqueTickers.length > 0) {
    setSelectedTickers(uniqueTickers as string[]);
  }

  // Get deployments from API
  // const deployments =
  //   (deploymentsQuery.data as DeploymentResponse[] | undefined) || [];
  const deployments = MOCK_DEPLOYMENTS;

  const handleTickerToggle = (ticker: string) => {
    if (selectedTickers.includes(ticker)) {
      if (selectedTickers.length > 1) {
        setSelectedTickers(selectedTickers.filter((t) => t !== ticker));
      }
    } else {
      setSelectedTickers([...selectedTickers, ticker]);
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (strategyId) {
      await deleteStrategyMutation.mutateAsync(strategyId);
      setDeleteDialogOpen(false);
      navigate("/strategies");
    }
  };

  const handleCreateBacktestClick = () => {
    setCreateBacktestDialogOpen(true);
  };

  const handleCreateDeploymentClick = () => {
    setCreateDeploymentDialogOpen(true);
  };

  const handleCreateDeployment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !strategyId ||
      !newDeploymentBrokerConnectionId ||
      !newDeploymentSymbol ||
      !newDeploymentBalance
    )
      return;

    try {
      await deployStrategyMutation.mutateAsync({
        strategyId: strategyId,
        payload: {
          broker_connection_id: newDeploymentBrokerConnectionId,
          symbol: newDeploymentSymbol.toUpperCase(),
          timeframe: newDeploymentTimeframe,
        },
      });
      setCreateDeploymentDialogOpen(false);
      setNewDeploymentBrokerConnectionId("");
      setNewDeploymentTicker("");
      setNewDeploymentTimeframe(Timeframe["1d"]);
      setNewDeploymentBalance("10000");
    } catch (error) {
      // Error handling is done by the mutation
      console.error("Failed to create deployment:", error);
    }
  };

  const handleCreateBacktest = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedBacktestBalance = Number.parseFloat(newBacktestBalance);

    if (
      !strategyId ||
      !newBacktestTicker ||
      !newBacktestBalance ||
      !newBacktestStartDate ||
      !newBacktestEndDate ||
      Number.isNaN(parsedBacktestBalance)
    )
      return;

    try {
      await createBacktestMutation.mutateAsync({
        strategyId: strategyId,
        payload: {
          symbol: newBacktestTicker.toUpperCase(),
          broker: "alpaca",
          starting_balance: parsedBacktestBalance,
          timeframe: newBacktestTimeframe,
          start_date: newBacktestStartDate,
          end_date: newBacktestEndDate,
        },
      });
      setCreateBacktestDialogOpen(false);
      setNewBacktestTicker("");
      setNewBacktestBalance("10000");
      setNewBacktestTimeframe(Timeframe["1d"]);
      setNewBacktestStartDate("");
      setNewBacktestEndDate("");
    } catch (error) {
      console.error("Failed to create backtest:", error);
    }
  };

  if (!USE_MOCK_DATA && strategySummaryQuery.isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Link to="/strategies">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Strategies
            </Button>
          </Link>

          <div className="flex items-start gap-4">
            <Skeleton className="h-16 w-16 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-96" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>

          <div className="flex gap-4">
            <Skeleton className="h-64 w-1/5" />
            <Skeleton className="h-64 flex-1" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if ((!USE_MOCK_DATA && strategySummaryQuery.error) || !strategy) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Link to="/strategies">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Strategies
            </Button>
          </Link>

          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Bot className="text-muted-foreground mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-semibold">
                Error loading strategy
              </h3>
              <p className="text-muted-foreground text-sm">
                Strategy not found
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Link
                to="/strategies"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Strategies
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm">Strategy Details</span>
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight">
                {strategy.name}
              </h2>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              {strategy.description || "No description"}
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              variant="outline"
              size="icon"
              className="!bg-secondary flex w-auto items-center justify-start border p-2"
              onClick={handleViewPrompt}
            >
              <NotepadTextIcon className="h-6 w-6" />
              <span>View Prompt</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="!bg-transparent text-red-600 hover:!bg-red-600/10 hover:text-red-700"
              onClick={handleDeleteClick}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <PerformanceMetricsCard
            realisedPnl={strategy.metrics.realised_pnl}
            unrealisedPnl={strategy.metrics.unrealised_pnl}
            totalReturnPct={strategy.metrics.total_return_pct}
            sharpeRatio={strategy.metrics.sharpe_ratio}
            maxDrawdown={strategy.metrics.max_drawdown}
          />
          <EquityGraphNew equityData={strategy.metrics.equity_curve} />
        </div>

        <BacktestsTable
          strategyId={strategyId || ""}
          backtests={strategyBacktests}
          selectedTickers={selectedTickers}
          symbolOptions={tickerOptions}
          onTickerToggle={handleTickerToggle}
          onCreateClick={handleCreateBacktestClick}
        />

        <DeploymentsTable
          deployments={deployments}
          onCreateClick={handleCreateDeploymentClick}
        />

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

        {/* Create Backtest Dialog */}
        <Dialog
          open={createBacktestDialogOpen}
          onOpenChange={setCreateBacktestDialogOpen}
        >
          <DialogContent
            className="h-[80vh] w-100 overflow-y-auto sm:h-auto"
            showCloseButton={false}
          >
            <DialogHeader>
              <DialogTitle className="text-left">
                Create New Backtest
              </DialogTitle>
              <DialogDescription className="text-left">
                Configure and run a backtest for this strategy
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateBacktest} className="w-full">
              <div className="w-full space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="ticker">Symbol</Label>
                  <Input
                    id="ticker"
                    className="w-full"
                    placeholder="AAPL"
                    value={newBacktestTicker}
                    onChange={(e) => setNewBacktestTicker(e.target.value)}
                    required
                    maxLength={10}
                  />
                  <p className="text-muted-foreground text-xs">
                    Enter the stock symbol (e.g., AAPL, TSLA, GOOGL)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="balance">Starting Balance ($)</Label>
                  <Input
                    id="balance"
                    className="w-full"
                    type="number"
                    placeholder="10000"
                    value={newBacktestBalance}
                    onChange={(e) => setNewBacktestBalance(e.target.value)}
                    required
                    min="100"
                    step="0.01"
                  />
                  <p className="text-muted-foreground text-xs">
                    The initial capital for the backtest
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeframe">Timeframe</Label>
                  <Select
                    value={newBacktestTimeframe}
                    onValueChange={(value) =>
                      setNewBacktestTimeframe(value as Timeframe)
                    }
                  >
                    <SelectTrigger
                      id="timeframe"
                      className="!bg-card !border-input w-full border"
                    >
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Timeframe["1m"]}>1 minute</SelectItem>
                      <SelectItem value={Timeframe["5m"]}>5 minutes</SelectItem>
                      <SelectItem value={Timeframe["15m"]}>
                        15 minutes
                      </SelectItem>
                      <SelectItem value={Timeframe["30m"]}>
                        30 minutes
                      </SelectItem>
                      <SelectItem value={Timeframe["1h"]}>1 hour</SelectItem>
                      <SelectItem value={Timeframe["1d"]}>1 day</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-muted-foreground text-xs">
                    The time interval for the backtest data
                  </p>
                </div>

                <div className="relative flex h-20 w-full flex-col space-y-2">
                  <div className="absolute inset-0 flex h-full w-full flex-col space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={newBacktestStartDate}
                      onChange={(e) => setNewBacktestStartDate(e.target.value)}
                      required
                    />
                    <p className="text-muted-foreground text-xs">
                      The start date for the backtest period
                    </p>
                  </div>
                </div>
                <div className="relative flex h-20 w-full flex-col space-y-2">
                  <div className="absolute inset-0 flex h-full w-full flex-col space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={newBacktestEndDate}
                      onChange={(e) => setNewBacktestEndDate(e.target.value)}
                      required
                    />
                    <p className="text-muted-foreground text-xs">
                      The end date for the backtest period
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCreateBacktestDialogOpen(false)}
                  disabled={createBacktestMutation.isPending}
                  className="!bg-card"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="!bg-primary hover:bg-primary"
                  disabled={createBacktestMutation.isPending}
                >
                  {createBacktestMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Backtest"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Create Deployment Dialog */}
        <Dialog
          open={createDeploymentDialogOpen}
          onOpenChange={setCreateDeploymentDialogOpen}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Deployment</DialogTitle>
              <DialogDescription>
                Deploy this strategy to a live broker connection
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateDeployment}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="broker-connection">Broker Connection</Label>
                  {brokerConnectionsQuery.isLoading ? (
                    <Skeleton className="h-10 w-full" />
                  ) : brokerConnectionsQuery.data &&
                    Array.isArray(brokerConnectionsQuery.data) &&
                    brokerConnectionsQuery.data.length > 0 ? (
                    <Select
                      value={newDeploymentBrokerConnectionId}
                      onValueChange={setNewDeploymentBrokerConnectionId}
                      required
                    >
                      <SelectTrigger id="broker-connection">
                        <SelectValue placeholder="Select broker connection" />
                      </SelectTrigger>
                      <SelectContent>
                        {(
                          brokerConnectionsQuery.data as BrokerConnectionResponse[]
                        ).map((connection) => (
                          <SelectItem
                            key={connection.connection_id}
                            value={connection.connection_id}
                          >
                            <div className="flex items-center gap-2">
                              <Building2 className="text-muted-foreground h-4 w-4" />
                              <span className="font-medium">
                                {connection.broker}
                              </span>
                              <span className="text-muted-foreground">
                                • {connection.broker_account_id}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="rounded-md border border-dashed p-4 text-center">
                      <p className="text-muted-foreground text-sm">
                        No broker connections available. Please connect a broker
                        first.
                      </p>
                    </div>
                  )}
                  <p className="text-muted-foreground text-xs">
                    Select the broker account to deploy to
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deployment-ticker">Ticker Symbol</Label>
                  <Input
                    id="deployment-ticker"
                    placeholder="AAPL"
                    value={newDeploymentSymbol}
                    onChange={(e) => setNewDeploymentTicker(e.target.value)}
                    required
                    maxLength={10}
                  />
                  <p className="text-muted-foreground text-xs">
                    Enter the stock symbol to trade (e.g., AAPL, TSLA, GOOGL)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deployment-timeframe">Timeframe</Label>
                  <Select
                    value={newDeploymentTimeframe}
                    onValueChange={(value) =>
                      setNewDeploymentTimeframe(value as Timeframe)
                    }
                  >
                    <SelectTrigger id="deployment-timeframe">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Timeframe["1m"]}>1 minute</SelectItem>
                      <SelectItem value={Timeframe["5m"]}>5 minutes</SelectItem>
                      <SelectItem value={Timeframe["15m"]}>
                        15 minutes
                      </SelectItem>
                      <SelectItem value={Timeframe["30m"]}>
                        30 minutes
                      </SelectItem>
                      <SelectItem value={Timeframe["1h"]}>1 hour</SelectItem>
                      <SelectItem value={Timeframe["1d"]}>1 day</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-muted-foreground text-xs">
                    The time interval for trading decisions
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCreateDeploymentDialogOpen(false)}
                  disabled={deployStrategyMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary"
                  disabled={
                    deployStrategyMutation.isPending ||
                    !brokerConnectionsQuery.data ||
                    !Array.isArray(brokerConnectionsQuery.data) ||
                    brokerConnectionsQuery.data.length === 0
                  }
                >
                  {deployStrategyMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Deployment"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* View Prompt Dialog */}
        <Dialog open={isPromptModalOpen} onOpenChange={handleClosePromptModal}>
          <DialogContent className="max-h-[80vh] max-w-3xl">
            <DialogHeader>
              <DialogTitle>Strategy Prompt</DialogTitle>
              <DialogDescription>
                The prompt used to generate this strategy
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[60vh] w-full rounded-md border border-none p-4">
              <pre className="font-mono text-sm whitespace-pre-wrap">
                {new Array(5).fill(MOCK_STRATEGY_DETAILS.prompt)}
              </pre>
              {/* {strategyDetailsQuery.isLoading ? (
                <div className="flex h-full items-center justify-center">
                  <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
                </div>
              ) : strategyDetailsQuery.data ? (
                <pre className="font-mono text-sm whitespace-pre-wrap">
                  {strategyDetailsQuery.data.prompt}
                </pre>
              ) : (
                <p className="text-muted-foreground text-center">
                  No code available
                </p>
              )} */}
            </ScrollArea>
            <DialogFooter>
              <Button variant="outline" onClick={handleClosePromptModal}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default StrategyDetailPageNew;
