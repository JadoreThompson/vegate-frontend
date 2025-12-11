import { queryClient } from "@/lib/query/query-client";
import { queryKeys } from "@/lib/query/query-keys";
import type { ApiError } from "@/lib/types/apiError";
import { handleApi } from "@/lib/utils/base";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createStrategyEndpointStrategiesPost,
  deleteStrategyEndpointStrategiesStrategyIdDelete,
  getStrategyEndpointStrategiesStrategyIdGet,
  getStrategySummaryEndpointStrategiesStrategyIdSummaryGet,
  listStrategiesEndpointStrategiesGet,
  listStrategySummariesEndpointStrategiesSummariesGet,
  updateStrategyEndpointStrategiesStrategyIdPatch,
  type deleteStrategyEndpointStrategiesStrategyIdDeleteResponse,
  type getStrategySummaryEndpointStrategiesStrategyIdSummaryGetResponse,
  type ListStrategiesEndpointStrategiesGetParams,
  type listStrategiesEndpointStrategiesGetResponse,
  type ListStrategySummariesEndpointStrategiesSummariesGetParams,
  type StrategyCreate,
  type StrategyResponse,
  type StrategyUpdate,
  type updateStrategyEndpointStrategiesStrategyIdPatchResponse
} from "@/openapi";

/**
 * Query hook to fetch a paginated list of strategies (without code field)
 */
export function useStrategies(
  params?: ListStrategiesEndpointStrategiesGetParams,
) {
  return useQuery({
    queryKey: queryKeys.strategies.list(params),
    queryFn: async () =>
      handleApi(await listStrategiesEndpointStrategiesGet(params)),
  });
}

/**
 * Query hook to fetch a single strategy with full details including code
 */
export function useStrategyQuery(strategyId: string) {
  return useQuery(
    {
      queryKey: queryKeys.strategies.detail(strategyId),
      queryFn: async () =>
        handleApi(await getStrategyEndpointStrategiesStrategyIdGet(strategyId)),
      enabled: !!strategyId,
    },
  );
}

/**
 * Query hook to fetch a strategy summary with pre-calculated metrics
 */
export function useStrategySummary(strategyId: string) {
  return useQuery({
    queryKey: queryKeys.strategies.summary(strategyId),
    queryFn: async () =>
      handleApi(
        await getStrategySummaryEndpointStrategiesStrategyIdSummaryGet(
          strategyId,
        ),
      ),
    enabled: !!strategyId,
  });
}

/**
 * Query hook to fetch a paginated list of strategy summaries with metrics
 */
export function useStrategySummariesQuery(
  params?: ListStrategySummariesEndpointStrategiesSummariesGetParams,
) {
  return useQuery({
    queryKey: queryKeys.strategies.summaries(params),
    queryFn: async () =>
      handleApi(
        await listStrategySummariesEndpointStrategiesSummariesGet(params),
      ),
  });
}

/**
 * Mutation hook to create a new strategy
 */
export function useCreateStrategy() {
  return useMutation({
    mutationFn: async (payload: StrategyCreate) =>
      handleApi(await createStrategyEndpointStrategiesPost(payload)),
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
  return useMutation({
    mutationFn: async ({
      strategyId,
      payload,
    }: {
      strategyId: string;
      payload: StrategyUpdate;
    }) =>
      handleApi(
        await updateStrategyEndpointStrategiesStrategyIdPatch(
          strategyId,
          payload,
        ),
      ),
    onSuccess: (
      _: StrategyResponse,
      variables: { strategyId: string; payload: StrategyUpdate },
    ) => {
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
  return useMutation({
    mutationFn: async (strategyId: string) =>
      handleApi(
        await deleteStrategyEndpointStrategiesStrategyIdDelete(strategyId),
      ),
    onSuccess: () => {
      // Invalidate all strategy queries
      queryClient.invalidateQueries({ queryKey: queryKeys.strategies.all() });
    },
  });
}
