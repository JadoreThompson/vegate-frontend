import { queryClient } from "@/lib/query/query-client";
import { queryKeys } from "@/lib/query/query-keys";
import type { ApiError } from "@/lib/types/apiError";
import { handleApi } from "@/lib/utils/base";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  deployStrategyEndpointDeploymentsStrategiesStrategyIdDeployPost,
  getDeploymentEndpointDeploymentsDeploymentIdGet,
  getDeploymentOrdersEndpointDeploymentsDeploymentIdOrdersGet,
  listAllDeploymentsEndpointDeploymentsGet,
  listStrategyDeploymentsEndpointDeploymentsStrategiesStrategyIdDeploymentsGet,
  stopDeploymentEndpointDeploymentsDeploymentIdStopPost,
} from "@/openapi";

import type {
  DeploymentResponse,
  DeployStrategyRequest,
  GetDeploymentOrdersEndpointDeploymentsDeploymentIdOrdersGetParams,
  getDeploymentOrdersEndpointDeploymentsDeploymentIdOrdersGetResponse,
  ListAllDeploymentsEndpointDeploymentsGetParams,
  listAllDeploymentsEndpointDeploymentsGetResponse,
  ListStrategyDeploymentsEndpointDeploymentsStrategiesStrategyIdDeploymentsGetParams,
  listStrategyDeploymentsEndpointDeploymentsStrategiesStrategyIdDeploymentsGetResponse,
} from "@/openapi";

/**
 * Query hook to fetch all deployments with optional status filter
 */
export function useDeployments(
  params?: ListAllDeploymentsEndpointDeploymentsGetParams,
) {
  return useQuery({
    queryKey: queryKeys.deployments.list(params),
    queryFn: async () =>
      handleApi(await listAllDeploymentsEndpointDeploymentsGet(params)),
  });
}

/**
 * Query hook to fetch deployments for a specific strategy
 */
export function useStrategyDeployments(
  strategyId: string,
  params?: ListStrategyDeploymentsEndpointDeploymentsStrategiesStrategyIdDeploymentsGetParams,
) {
  return useQuery({
    queryKey: queryKeys.deployments.strategy(strategyId, params),
    queryFn: async () =>
      handleApi(
        await listStrategyDeploymentsEndpointDeploymentsStrategiesStrategyIdDeploymentsGet(
          strategyId,
          params,
        ),
      ),
    enabled: !!strategyId,
  });
}

/**
 * Query hook to fetch a single deployment by ID
 */
export function useDeploymentQuery(deploymentId: string) {
  return useQuery({
    queryKey: queryKeys.deployments.detail(deploymentId),
    queryFn: async () =>
      handleApi(
        await getDeploymentEndpointDeploymentsDeploymentIdGet(deploymentId),
      ),
    enabled: !!deploymentId,
  });
}

/**
 * Mutation hook to deploy a strategy
 */
export function useDeployStrategy() {
  return useMutation({
    mutationFn: async (variables: {
      strategyId: string;
      payload: DeployStrategyRequest;
    }) =>
      handleApi(
        await deployStrategyEndpointDeploymentsStrategiesStrategyIdDeployPost(
          variables.strategyId,
          variables.payload,
        ),
      ),
    onSuccess: (
      _data: DeploymentResponse,
      variables: { strategyId: string; payload: DeployStrategyRequest },
    ) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.deployments.strategy(variables.strategyId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.deployments.all() });
    },
  });
}

/**
 * Mutation hook to stop a deployment
 */
export function useStopDeploymentMutation() {
  return useMutation({
    mutationFn: async (deploymentId: string) =>
      handleApi(
        await stopDeploymentEndpointDeploymentsDeploymentIdStopPost(
          deploymentId,
        ),
      ),
    onSuccess: (_data: DeploymentResponse, deploymentId: string) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.deployments.detail(deploymentId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.deployments.all() });
    },
  });
}

/**
 * Query hook to fetch orders for a deployment
 */
export function useDeploymentOrders(
  deploymentId: string,
  params?: GetDeploymentOrdersEndpointDeploymentsDeploymentIdOrdersGetParams,
) {
  return useQuery({
    queryKey: queryKeys.deployments.orders(deploymentId, params),
    queryFn: async () =>
      handleApi(
        await getDeploymentOrdersEndpointDeploymentsDeploymentIdOrdersGet(
          deploymentId,
          params,
        ),
      ),
    enabled: !!deploymentId,
  });
}
