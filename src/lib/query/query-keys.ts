import type {
  GetBacktestOrdersEndpointBacktestsBacktestIdOrdersGetParams,
  GetDeploymentOrdersEndpointDeploymentsDeploymentIdOrdersGetParams,
  ListAllDeploymentsEndpointDeploymentsGetParams,
  ListBacktestsEndpointBacktestsGetParams,
  ListStrategiesEndpointStrategiesGetParams,
  ListStrategyDeploymentsEndpointDeploymentsStrategiesStrategyIdDeploymentsGetParams,
  ListStrategySummariesEndpointStrategiesSummariesGetParams,
} from "@/openapi";

export const queryKeys = {
  auth: {
    all: () => ["auth"] as const,
    me: () => [...queryKeys.auth.all(), "me"] as const,
  },
  orders: {
    all: () => ["orders"] as const,
    list: (params?: any) =>
      [...queryKeys.orders.all(), "list", params] as const,
    detail: (orderId: string) =>
      [...queryKeys.orders.all(), "detail", orderId] as const,
  },
  strategies: {
    all: () => ["strategies"] as const,
    list: (params?: ListStrategiesEndpointStrategiesGetParams) =>
      [...queryKeys.strategies.all(), "list", params] as const,
    detail: (strategyId: string) =>
      [...queryKeys.strategies.all(), "detail", strategyId] as const,
    summary: (strategyId: string) =>
      [...queryKeys.strategies.all(), "summary", strategyId] as const,
    summaries: (
      params?: ListStrategySummariesEndpointStrategiesSummariesGetParams,
    ) => [...queryKeys.strategies.all(), "summaries", params] as const,
  },
  backtests: {
    all: () => ["backtests"] as const,
    list: (params?: ListBacktestsEndpointBacktestsGetParams) =>
      [...queryKeys.backtests.all(), "list", params] as const,
    detail: (backtestId: string) =>
      [...queryKeys.backtests.all(), "detail", backtestId] as const,
    orders: (
      backtestId: string,
      params?: GetBacktestOrdersEndpointBacktestsBacktestIdOrdersGetParams,
    ) => [...queryKeys.backtests.all(), "orders", backtestId, params] as const,
  },
  brokers: {
    all: () => ["brokers"] as const,
    alpacaOAuth: () => [...queryKeys.brokers.all(), "alpaca", "oauth"] as const,
    connections: () => [...queryKeys.brokers.all(), "connections"] as const,
    connection: (connectionId: string) =>
      [...queryKeys.brokers.all(), "connection", connectionId] as const,
  },
  deployments: {
    all: () => ["deployments"] as const,
    list: (params?: ListAllDeploymentsEndpointDeploymentsGetParams) =>
      [...queryKeys.deployments.all(), "list", params] as const,
    detail: (deploymentId: string) =>
      [...queryKeys.deployments.all(), "detail", deploymentId] as const,
    strategy: (
      strategyId: string,
      params?: ListStrategyDeploymentsEndpointDeploymentsStrategiesStrategyIdDeploymentsGetParams,
    ) =>
      [...queryKeys.deployments.all(), "strategy", strategyId, params] as const,
    orders: (
      deploymentId: string,
      params?: GetDeploymentOrdersEndpointDeploymentsDeploymentIdOrdersGetParams,
    ) =>
      [...queryKeys.deployments.all(), "orders", deploymentId, params] as const,
  },
};
