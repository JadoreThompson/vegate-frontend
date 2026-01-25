import { queryClient } from "@/lib/query/query-client";
import { queryKeys } from "@/lib/query/query-keys";
import { handleApi } from "@/lib/utils/base";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createBacktestEndpointStrategiesStrategyIdBacktestPost,
  deleteBacktestEndpointBacktestsBacktestIdDelete,
  getBacktestEndpointBacktestsBacktestIdGet,
  getBacktestOrdersEndpointBacktestsBacktestIdOrdersGet,
  listBacktestsEndpointBacktestsGet,
} from "@/openapi";

import type {
  ApiRoutesStrategiesModelsBacktestCreate,
  GetBacktestOrdersEndpointBacktestsBacktestIdOrdersGetParams,
  ListBacktestsEndpointBacktestsGetParams,
} from "@/openapi";

/**
 * Query hook to fetch a paginated list of backtests
 */
export function useBacktestsQuery(
  params?: ListBacktestsEndpointBacktestsGetParams,
) {
  return useQuery({
    queryKey: queryKeys.backtests.list(params),
    queryFn: async () =>
      handleApi(await listBacktestsEndpointBacktestsGet(params)),
  });
}

/**
 * Query hook to fetch a single backtest with full details including metrics
 */
export function useBacktestQuery(backtestId: string) {
  return useQuery({
    queryKey: queryKeys.backtests.detail(backtestId),
    queryFn: async () =>
      handleApi(await getBacktestEndpointBacktestsBacktestIdGet(backtestId)),
    enabled: !!backtestId,
  });
}

/**
 * Query hook to fetch orders/trades for a specific backtest with pagination
 */
export function useBacktestOrdersQuery(
  backtestId: string,
  params?: GetBacktestOrdersEndpointBacktestsBacktestIdOrdersGetParams,
) {
  return useQuery({
    queryKey: queryKeys.backtests.orders(backtestId, params),
    queryFn: async () =>
      handleApi(
        await getBacktestOrdersEndpointBacktestsBacktestIdOrdersGet(
          backtestId,
          params,
        ),
      ),
    enabled: !!backtestId,
  });
}

/**
 * Mutation hook to create a new backtest for a specific strategy
 */
export function useCreateBacktestForStrategyMutation() {
  return useMutation({
    mutationFn: async (variables: {
      strategyId: string;
      payload: ApiRoutesStrategiesModelsBacktestCreate;
    }) =>
      handleApi(
        await createBacktestEndpointStrategiesStrategyIdBacktestPost(
          variables.strategyId,
          variables.payload,
        ),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.backtests.all() });
    },
  });
}

/**
 * Mutation hook to delete a backtest
 */
export function useDeleteBacktestMutation() {
  return useMutation({
    mutationFn: async (backtestId: string) =>
      deleteBacktestEndpointBacktestsBacktestIdDelete(backtestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.backtests.all() });
    },
  });
}
