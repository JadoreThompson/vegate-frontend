import { queryClient } from "@/lib/query/query-client";
import { queryKeys } from "@/lib/query/query-keys";
import type { ApiError } from "@/lib/types/apiError";
import { handleApi } from "@/lib/utils/base";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  deployStrategyEndpointDeploymentsStrategiesStrategyIdDeployPost,
  getDeploymentEndpointDeploymentsDeploymentIdGet,
  listAllDeploymentsEndpointDeploymentsGet,
  listStrategyDeploymentsEndpointDeploymentsStrategiesStrategyIdDeploymentsGet,
  stopDeploymentEndpointDeploymentsDeploymentIdStopPost,
} from "@/openapi";

import type {
  deployStrategyEndpointDeploymentsStrategiesStrategyIdDeployPostResponse,
  DeployStrategyRequest,
  getDeploymentEndpointDeploymentsDeploymentIdGetResponse,
  ListAllDeploymentsEndpointDeploymentsGetParams,
  listAllDeploymentsEndpointDeploymentsGetResponse,
  ListStrategyDeploymentsEndpointDeploymentsStrategiesStrategyIdDeploymentsGetParams,
  listStrategyDeploymentsEndpointDeploymentsStrategiesStrategyIdDeploymentsGetResponse,
  stopDeploymentEndpointDeploymentsDeploymentIdStopPostResponse,
} from "@/openapi";

/**
 * Query hook to fetch all deployments with optional status filter
 */
export function useDeployments(
  params?: ListAllDeploymentsEndpointDeploymentsGetParams,
) {
  return useQuery<listAllDeploymentsEndpointDeploymentsGetResponse, ApiError>({
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
  return useQuery<
    listStrategyDeploymentsEndpointDeploymentsStrategiesStrategyIdDeploymentsGetResponse,
    ApiError
  >({
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
export function useDeployment(deploymentId: string) {
  return useQuery<
    getDeploymentEndpointDeploymentsDeploymentIdGetResponse,
    ApiError
  >({
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
  return useMutation<
    deployStrategyEndpointDeploymentsStrategiesStrategyIdDeployPostResponse,
    ApiError,
    { strategyId: string; payload: DeployStrategyRequest }
  >({
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
      _data: deployStrategyEndpointDeploymentsStrategiesStrategyIdDeployPostResponse,
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
export function useStopDeployment() {
  return useMutation<
    stopDeploymentEndpointDeploymentsDeploymentIdStopPostResponse,
    ApiError,
    string
  >({
    mutationFn: async (deploymentId: string) =>
      handleApi(
        await stopDeploymentEndpointDeploymentsDeploymentIdStopPost(
          deploymentId,
        ),
      ),
    onSuccess: (
      _data: stopDeploymentEndpointDeploymentsDeploymentIdStopPostResponse,
      deploymentId: string,
    ) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.deployments.detail(deploymentId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.deployments.all() });
    },
  });
}
