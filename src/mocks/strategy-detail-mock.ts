import {
  BacktestStatus,
  BrokerType,
  DeploymentStatus,
  Timeframe,
  type ApiRoutesStrategiesModelsBacktestResponse,
  type BrokerConnectionResponse,
  type DeploymentResponse,
  type StrategyDetailResponse,
  type StrategySummaryResponse,
} from "@/openapi";

export const mockStrategyId = "strat_01hxy8vegatemeanrev123";

export const mockStrategySummary: StrategySummaryResponse = {
  strategy_id: mockStrategyId,
  name: "RSI Mean Reversion",
  description:
    "Buys oversold pullbacks and exits into short-term strength with strict risk controls.",
  created_at: "2026-02-11T10:14:22.000Z",
  updated_at: "2026-03-18T14:05:10.000Z",
  metrics: {
    realised_pnl: 4281.54,
    unrealised_pnl: 312.18,
    total_return_pct: 0.184,
    sharpe_ratio: 1.72,
    max_drawdown: -0.083,
    total_trades: 146,
    equity_curve: [
      { timestamp: "2026-01-02T00:00:00.000Z", value: 10000 },
      { timestamp: "2026-01-10T00:00:00.000Z", value: 10180 },
      { timestamp: "2026-01-18T00:00:00.000Z", value: 10095 },
      { timestamp: "2026-01-26T00:00:00.000Z", value: 10340 },
      { timestamp: "2026-02-03T00:00:00.000Z", value: 10485 },
      { timestamp: "2026-02-11T00:00:00.000Z", value: 10390 },
      { timestamp: "2026-02-19T00:00:00.000Z", value: 10620 },
      { timestamp: "2026-02-27T00:00:00.000Z", value: 10810 },
      { timestamp: "2026-03-07T00:00:00.000Z", value: 11045 },
      { timestamp: "2026-03-15T00:00:00.000Z", value: 11296 },
      { timestamp: "2026-03-20T00:00:00.000Z", value: 11840 },
    ],
  },
};

export const mockStrategyDetails: StrategyDetailResponse = {
  strategy_id: mockStrategyId,
  name: "RSI Mean Reversion",
  description:
    "Buys oversold pullbacks and exits into short-term strength with strict risk controls.",
  created_at: "2026-02-11T10:14:22.000Z",
  updated_at: "2026-03-18T14:05:10.000Z",
  code: `def initialize(context):
    context.symbol = symbol("AAPL")
    context.rsi_period = 14
    context.oversold = 30
    context.overbought = 65

def on_data(context, data):
    rsi = data.rsi(context.symbol, context.rsi_period)

    if not context.portfolio.has_position(context.symbol) and rsi < context.oversold:
        order_percent(context.symbol, 0.25)

    elif context.portfolio.has_position(context.symbol) and rsi > context.overbought:
        close_position(context.symbol)`,
  prompt: `Create a mean reversion strategy for large cap equities.

Rules:
- Primary symbol universe: AAPL, MSFT, NVDA, SPY, TSLA
- Buy when RSI(14) closes below 30
- Only enter if price is above the 200 EMA on the daily trend filter
- Risk 25% of available capital per position
- Exit when RSI(14) rises above 65
- Use a 3% stop loss and 6% take profit
- Ignore signals during the first 15 minutes after market open
- Prefer liquid names only
- Daily timeframe for signal generation`,
};

export const mockBacktests: ApiRoutesStrategiesModelsBacktestResponse[] = [
  {
    backtest_id: "bt_01hxy8bt001",
    strategy_id: mockStrategyId,
    symbol: "AAPL",
    broker: BrokerType.alpaca,
    timeframe: Timeframe["1d"],
    starting_balance: 10000,
    start_date: "2025-01-01",
    end_date: "2025-12-31",
    status: BacktestStatus.completed,
    created_at: "2026-03-10T09:22:00.000Z",
  },
  {
    backtest_id: "bt_01hxy8bt002",
    strategy_id: mockStrategyId,
    symbol: "MSFT",
    broker: BrokerType.alpaca,
    timeframe: Timeframe["1d"],
    starting_balance: 10000,
    start_date: "2025-01-01",
    end_date: "2025-12-31",
    status: BacktestStatus.completed,
    created_at: "2026-03-09T11:48:00.000Z",
  },
  {
    backtest_id: "bt_01hxy8bt003",
    strategy_id: mockStrategyId,
    symbol: "NVDA",
    broker: BrokerType.alpaca,
    timeframe: Timeframe["1h"],
    starting_balance: 15000,
    start_date: "2025-06-01",
    end_date: "2025-12-31",
    status: BacktestStatus.running,
    created_at: "2026-03-14T16:10:00.000Z",
  },
  {
    backtest_id: "bt_01hxy8bt004",
    strategy_id: mockStrategyId,
    symbol: "SPY",
    broker: BrokerType.alpaca,
    timeframe: Timeframe["1d"],
    starting_balance: 25000,
    start_date: "2024-01-01",
    end_date: "2025-12-31",
    status: BacktestStatus.completed,
    created_at: "2026-03-08T08:05:00.000Z",
  },
  {
    backtest_id: "bt_01hxy8bt005",
    strategy_id: mockStrategyId,
    symbol: "TSLA",
    broker: BrokerType.alpaca,
    timeframe: Timeframe["4h"],
    starting_balance: 12000,
    start_date: "2025-01-01",
    end_date: "2025-11-30",
    status: BacktestStatus.failed,
    created_at: "2026-03-06T13:40:00.000Z",
  },

  // Extra rows so pagination can be seen
  {
    backtest_id: "bt_01hxy8bt006",
    strategy_id: mockStrategyId,
    symbol: "AAPL",
    broker: BrokerType.alpaca,
    timeframe: Timeframe["1h"],
    starting_balance: 8000,
    start_date: "2025-03-01",
    end_date: "2025-06-30",
    status: BacktestStatus.completed,
    created_at: "2026-03-05T13:40:00.000Z",
  },
  {
    backtest_id: "bt_01hxy8bt007",
    strategy_id: mockStrategyId,
    symbol: "MSFT",
    broker: BrokerType.alpaca,
    timeframe: Timeframe["4h"],
    starting_balance: 18000,
    start_date: "2025-02-01",
    end_date: "2025-10-31",
    status: BacktestStatus.completed,
    created_at: "2026-03-04T13:40:00.000Z",
  },
  {
    backtest_id: "bt_01hxy8bt008",
    strategy_id: mockStrategyId,
    symbol: "SPY",
    broker: BrokerType.alpaca,
    timeframe: Timeframe["1h"],
    starting_balance: 15000,
    start_date: "2025-04-01",
    end_date: "2025-09-30",
    status: BacktestStatus.pending,
    created_at: "2026-03-03T13:40:00.000Z",
  },
  {
    backtest_id: "bt_01hxy8bt009",
    strategy_id: mockStrategyId,
    symbol: "NVDA",
    broker: BrokerType.alpaca,
    timeframe: Timeframe["1d"],
    starting_balance: 22000,
    start_date: "2024-06-01",
    end_date: "2025-06-01",
    status: BacktestStatus.completed,
    created_at: "2026-03-02T13:40:00.000Z",
  },
  {
    backtest_id: "bt_01hxy8bt010",
    strategy_id: mockStrategyId,
    symbol: "TSLA",
    broker: BrokerType.alpaca,
    timeframe: Timeframe["1d"],
    starting_balance: 9000,
    start_date: "2025-01-15",
    end_date: "2025-08-15",
    status: BacktestStatus.completed,
    created_at: "2026-03-01T13:40:00.000Z",
  },
  {
    backtest_id: "bt_01hxy8bt011",
    strategy_id: mockStrategyId,
    symbol: "AAPL",
    broker: BrokerType.alpaca,
    timeframe: Timeframe["5m"],
    starting_balance: 7000,
    start_date: "2025-07-01",
    end_date: "2025-07-31",
    status: BacktestStatus.failed,
    created_at: "2026-02-28T13:40:00.000Z",
  },
];

export const mockDeployments: DeploymentResponse[] = [
  {
    deployment_id: "dep_01hxy8dep001",
    strategy_id: mockStrategyId,
    broker_connection_id: "conn_01hxy8conn001",
    symbol: "AAPL",
    timeframe: Timeframe["1d"],
    starting_balance: 10000,
    status: DeploymentStatus.running,
    error_message: null,
    created_at: "2026-03-17T14:10:00.000Z",
    updated_at: "2026-03-20T10:20:00.000Z",
    stopped_at: null,
  },
  {
    deployment_id: "dep_01hxy8dep002",
    strategy_id: mockStrategyId,
    broker_connection_id: "conn_01hxy8conn002",
    symbol: "SPY",
    timeframe: Timeframe["1h"],
    starting_balance: 25000,
    status: DeploymentStatus.pending,
    error_message: null,
    created_at: "2026-03-19T08:00:00.000Z",
    updated_at: "2026-03-19T08:00:00.000Z",
    stopped_at: null,
  },
  {
    deployment_id: "dep_01hxy8dep003",
    strategy_id: mockStrategyId,
    broker_connection_id: "conn_01hxy8conn001",
    symbol: "TSLA",
    timeframe: Timeframe["4h"],
    starting_balance: 12000,
    status: DeploymentStatus.error,
    error_message: "Insufficient buying power",
    created_at: "2026-03-12T12:30:00.000Z",
    updated_at: "2026-03-12T12:35:00.000Z",
    stopped_at: null,
  },
  {
    deployment_id: "dep_01hxy8dep004",
    strategy_id: mockStrategyId,
    broker_connection_id: "conn_01hxy8conn003",
    symbol: "MSFT",
    timeframe: Timeframe["1d"],
    starting_balance: 15000,
    status: DeploymentStatus.stopped,
    error_message: null,
    created_at: "2026-03-01T09:00:00.000Z",
    updated_at: "2026-03-08T17:30:00.000Z",
    stopped_at: "2026-03-08T17:30:00.000Z",
  },

  // Extra rows for pagination
  ...Array.from({ length: 8 }).map((_, index) => ({
    deployment_id: `dep_01hxy8dep01${index + 5}`,
    strategy_id: mockStrategyId,
    broker_connection_id: "conn_01hxy8conn001",
    symbol: ["AAPL", "MSFT", "NVDA", "SPY", "TSLA"][index % 5],
    timeframe: [Timeframe["1d"], Timeframe["1h"], Timeframe["4h"]][index % 3],
    starting_balance: 10000 + index * 1000,
    status: [
      DeploymentStatus.running,
      DeploymentStatus.pending,
      DeploymentStatus.stopped,
    ][index % 3],
    error_message: null,
    created_at: `2026-02-${String(20 - index).padStart(2, "0")}T09:00:00.000Z`,
    updated_at: `2026-02-${String(20 - index).padStart(2, "0")}T11:00:00.000Z`,
    stopped_at:
      index % 3 === 2
        ? `2026-02-${String(20 - index).padStart(2, "0")}T11:00:00.000Z`
        : null,
  })),
];

export const mockBrokerConnections: BrokerConnectionResponse[] = [
  {
    connection_id: "conn_01hxy8conn001",
    broker: BrokerType.alpaca,
    broker_account_id: "PA-39481201",
  },
  {
    connection_id: "conn_01hxy8conn002",
    broker: BrokerType.alpaca,
    broker_account_id: "PA-39481202",
  },
  {
    connection_id: "conn_01hxy8conn003",
    broker: BrokerType.alpaca,
    broker_account_id: "PA-39481203",
  },
];
////////////////////////////////////////////////////////////////////////







// import {
//   BacktestStatus,
//   BrokerType,
//   DeploymentStatus,
//   Timeframe,
//   type ApiRoutesStrategiesModelsBacktestResponse,
//   type BrokerConnectionResponse,
//   type DeploymentResponse,
//   type StrategyDetailResponse,
//   type StrategySummaryResponse,
// } from "@/openapi";

// type DeepPartial<T> = {
//   [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
// };

// const merge = <T>(base: T, overrides?: DeepPartial<T>): T => {
//   if (!overrides) return base;

//   return {
//     ...base,
//     ...overrides,
//     ...(base &&
//     typeof base === "object" &&
//     "metrics" in (base as object) &&
//     overrides &&
//     typeof overrides === "object" &&
//     "metrics" in overrides
//       ? {
//           metrics: {
//             ...(base as any).metrics,
//             ...(overrides as any).metrics,
//           },
//         }
//       : {}),
//   };
// };

// export const makeStrategySummary = (
//   overrides?: DeepPartial<StrategySummaryResponse>,
// ): StrategySummaryResponse =>
//   merge(
//     {
//       strategy_id: "strat_default_001",
//       name: "RSI Mean Reversion",
//       description:
//         "Buys oversold pullbacks and exits into short-term strength with strict risk controls.",
//       created_at: "2026-02-11T10:14:22.000Z",
//       updated_at: "2026-03-18T14:05:10.000Z",
//       metrics: {
//         realised_pnl: 4281.54,
//         unrealised_pnl: 312.18,
//         total_return_pct: 0.184,
//         sharpe_ratio: 1.72,
//         max_drawdown: -0.083,
//         total_trades: 146,
//         equity_curve: [
//           { timestamp: "2026-01-02T00:00:00.000Z", value: 10000 },
//           { timestamp: "2026-01-10T00:00:00.000Z", value: 10180 },
//           { timestamp: "2026-01-18T00:00:00.000Z", value: 10095 },
//           { timestamp: "2026-01-26T00:00:00.000Z", value: 10340 },
//           { timestamp: "2026-02-03T00:00:00.000Z", value: 10485 },
//           { timestamp: "2026-02-11T00:00:00.000Z", value: 10390 },
//           { timestamp: "2026-02-19T00:00:00.000Z", value: 10620 },
//           { timestamp: "2026-02-27T00:00:00.000Z", value: 10810 },
//           { timestamp: "2026-03-07T00:00:00.000Z", value: 11045 },
//           { timestamp: "2026-03-15T00:00:00.000Z", value: 11296 },
//           { timestamp: "2026-03-20T00:00:00.000Z", value: 11840 },
//         ],
//       },
//     },
//     overrides,
//   );

// export const makeStrategyDetail = (
//   overrides?: DeepPartial<StrategyDetailResponse>,
// ): StrategyDetailResponse =>
//   merge(
//     {
//       strategy_id: "strat_default_001",
//       name: "RSI Mean Reversion",
//       description:
//         "Buys oversold pullbacks and exits into short-term strength with strict risk controls.",
//       created_at: "2026-02-11T10:14:22.000Z",
//       updated_at: "2026-03-18T14:05:10.000Z",
//       code: `def initialize(context):
//     context.symbol = symbol("AAPL")
//     context.rsi_period = 14
//     context.oversold = 30
//     context.overbought = 65

// def on_data(context, data):
//     rsi = data.rsi(context.symbol, context.rsi_period)

//     if not context.portfolio.has_position(context.symbol) and rsi < context.oversold:
//         order_percent(context.symbol, 0.25)

//     elif context.portfolio.has_position(context.symbol) and rsi > context.overbought:
//         close_position(context.symbol)`,
//       prompt: `Create a mean reversion strategy for large cap equities.

// Rules:
// - Primary symbol universe: AAPL, MSFT, NVDA, SPY, TSLA
// - Buy when RSI(14) closes below 30
// - Only enter if price is above the 200 EMA on the daily trend filter
// - Risk 25% of available capital per position
// - Exit when RSI(14) rises above 65
// - Use a 3% stop loss and 6% take profit
// - Ignore signals during the first 15 minutes after market open
// - Prefer liquid names only
// - Daily timeframe for signal generation`,
//     },
//     overrides,
//   );

// export const makeBacktest = (
//   overrides?: DeepPartial<ApiRoutesStrategiesModelsBacktestResponse>,
// ): ApiRoutesStrategiesModelsBacktestResponse =>
//   merge(
//     {
//       backtest_id: "bt_default_001",
//       strategy_id: "strat_default_001",
//       symbol: "AAPL",
//       broker: BrokerType.alpaca,
//       timeframe: Timeframe["1d"],
//       starting_balance: 10000,
//       start_date: "2025-01-01",
//       end_date: "2025-12-31",
//       status: BacktestStatus.completed,
//       created_at: "2026-03-10T09:22:00.000Z",
//     },
//     overrides,
//   );

// export const makeDeployment = (
//   overrides?: DeepPartial<DeploymentResponse>,
// ): DeploymentResponse =>
//   merge(
//     {
//       deployment_id: "dep_default_001",
//       strategy_id: "strat_default_001",
//       broker_connection_id: "conn_default_001",
//       symbol: "AAPL",
//       timeframe: Timeframe["1d"],
//       starting_balance: 10000,
//       status: DeploymentStatus.running,
//       error_message: null,
//       created_at: "2026-03-17T14:10:00.000Z",
//       updated_at: "2026-03-20T10:20:00.000Z",
//       stopped_at: null,
//     },
//     overrides,
//   );

// export const makeBrokerConnection = (
//   overrides?: DeepPartial<BrokerConnectionResponse>,
// ): BrokerConnectionResponse =>
//   merge(
//     {
//       connection_id: "conn_default_001",
//       broker: BrokerType.alpaca,
//       broker_account_id: "PA-39481201",
//     },
//     overrides,
//   );