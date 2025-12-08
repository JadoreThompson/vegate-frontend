import { queryClient } from "@/lib/query/query-client";
import { queryKeys } from "@/lib/query/query-keys";
import type { ApiError } from "@/lib/types/apiError";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
    createStrategyEndpointStrategiesPost,
    deleteStrategyEndpointStrategiesStrategyIdDelete,
    getStrategyEndpointStrategiesStrategyIdGet,
    getStrategySummaryEndpointStrategiesStrategyIdSummaryGet,
    listStrategiesEndpointStrategiesGet,
    listStrategySummariesEndpointStrategiesSummariesGet,
    updateStrategyEndpointStrategiesStrategyIdPatch,
    type createStrategyEndpointStrategiesPostResponse,
    type deleteStrategyEndpointStrategiesStrategyIdDeleteResponse,
    type getStrategyEndpointStrategiesStrategyIdGetResponse,
    type getStrategySummaryEndpointStrategiesStrategyIdSummaryGetResponse,
    type ListStrategiesEndpointStrategiesGetParams,
    type listStrategiesEndpointStrategiesGetResponse,
    type ListStrategySummariesEndpointStrategiesSummariesGetParams,
    type listStrategySummariesEndpointStrategiesSummariesGetResponse,
    type StrategyCreate,
    type StrategyUpdate,
    type updateStrategyEndpointStrategiesStrategyIdPatchResponse,
} from "@/openapi";

/**
 * Query hook to fetch a paginated list of strategies (without code field)
 */
export function useStrategies(
  params?: ListStrategiesEndpointStrategiesGetParams,
) {
  return useQuery<listStrategiesEndpointStrategiesGetResponse, ApiError>({
    queryKey: queryKeys.strategies.list(params),
    queryFn: () => listStrategiesEndpointStrategiesGet(params),
  });
}

/**
 * Query hook to fetch a single strategy with full details including code
 */
export function useStrategy(strategyId: string) {
  return useQuery<getStrategyEndpointStrategiesStrategyIdGetResponse, ApiError>(
    {
      queryKey: queryKeys.strategies.detail(strategyId),
      queryFn: () => getStrategyEndpointStrategiesStrategyIdGet(strategyId),
      enabled: !!strategyId,
    },
  );
}

/**
 * Query hook to fetch a strategy summary with pre-calculated metrics
 */
export function useStrategySummary(strategyId: string) {
  return useQuery<
    getStrategySummaryEndpointStrategiesStrategyIdSummaryGetResponse,
    ApiError
  >({
    queryKey: queryKeys.strategies.summary(strategyId),
    queryFn: () =>
      getStrategySummaryEndpointStrategiesStrategyIdSummaryGet(strategyId),
    enabled: !!strategyId,
  });
}

/**
 * Query hook to fetch a paginated list of strategy summaries with metrics
 */
export function useStrategySummaries(
  params?: ListStrategySummariesEndpointStrategiesSummariesGetParams,
) {
  return useQuery<
    listStrategySummariesEndpointStrategiesSummariesGetResponse,
    ApiError
  >({
    queryKey: queryKeys.strategies.summaries(params),
    queryFn: () => listStrategySummariesEndpointStrategiesSummariesGet(params),
  });
}

/**
 * Mutation hook to create a new strategy
 */
export function useCreateStrategy() {
  return useMutation<
    createStrategyEndpointStrategiesPostResponse,
    ApiError,
    StrategyCreate
  >({
    mutationFn: (payload: StrategyCreate) =>
      createStrategyEndpointStrategiesPost(payload),
    onSuccess: () => {
      // Invalidate strategies list queries
      queryClient.invalidateQueries({ queryKey: queryKeys.strategies.all() });
    },
  });
}

/**
 * Mutation hook to update a strategy (name and/or description)
 */
export function useUpdateStrategy() {
  return useMutation<
    updateStrategyEndpointStrategiesStrategyIdPatchResponse,
    ApiError,
    { strategyId: string; payload: StrategyUpdate }
  >({
    mutationFn: ({ strategyId, payload }) =>
      updateStrategyEndpointStrategiesStrategyIdPatch(strategyId, payload),
    onSuccess: (_, variables) => {
      // Invalidate the specific strategy and related queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.strategies.detail(variables.strategyId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.strategies.summary(variables.strategyId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.strategies.all() });
    },
  });
}

/**
 * Mutation hook to delete a strategy
 */
export function useDeleteStrategy() {
  return useMutation<
    deleteStrategyEndpointStrategiesStrategyIdDeleteResponse,
    ApiError,
    string
  >({
    mutationFn: (strategyId: string) =>
      deleteStrategyEndpointStrategiesStrategyIdDelete(strategyId),
    onSuccess: () => {
      // Invalidate all strategy queries
      queryClient.invalidateQueries({ queryKey: queryKeys.strategies.all() });
    },
  });
}
