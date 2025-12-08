import { queryClient } from "@/lib/query/query-client";
import { queryKeys } from "@/lib/query/query-keys";
import type { ApiError } from "@/lib/types/apiError";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createBacktestEndpointBacktestsPost,
  deleteBacktestEndpointBacktestsBacktestIdDelete,
  getBacktestEndpointBacktestsBacktestIdGet,
  getBacktestOrdersEndpointBacktestsBacktestIdOrdersGet,
  listBacktestsEndpointBacktestsGet,
  updateBacktestEndpointBacktestsBacktestIdPatch,
} from "@/openapi";

import type {
  BacktestCreate,
  BacktestUpdate,
  createBacktestEndpointBacktestsPostResponse,
  deleteBacktestEndpointBacktestsBacktestIdDeleteResponse,
  getBacktestEndpointBacktestsBacktestIdGetResponse,
  GetBacktestOrdersEndpointBacktestsBacktestIdOrdersGetParams,
  getBacktestOrdersEndpointBacktestsBacktestIdOrdersGetResponse,
  ListBacktestsEndpointBacktestsGetParams,
  listBacktestsEndpointBacktestsGetResponse,
  updateBacktestEndpointBacktestsBacktestIdPatchResponse,
} from "@/openapi";

/**
 * Query hook to fetch a paginated list of backtests
 */
export function useBacktestsQuery(
  params?: ListBacktestsEndpointBacktestsGetParams,
) {
  return useQuery<listBacktestsEndpointBacktestsGetResponse, ApiError>({
    queryKey: queryKeys.backtests.list(params),
    queryFn: () => listBacktestsEndpointBacktestsGet(params),
  });
}

/**
 * Query hook to fetch a single backtest with full details including metrics
 */
export function useBacktestQuery(backtestId: string) {
  return useQuery<getBacktestEndpointBacktestsBacktestIdGetResponse, ApiError>({
    queryKey: queryKeys.backtests.detail(backtestId),
    queryFn: () => getBacktestEndpointBacktestsBacktestIdGet(backtestId),
    enabled: !!backtestId,
  });
}

/**
 * Query hook to fetch orders/trades for a specific backtest with pagination
 */
export function useBacktestOrders(
  backtestId: string,
  params?: GetBacktestOrdersEndpointBacktestsBacktestIdOrdersGetParams,
) {
  return useQuery<
    getBacktestOrdersEndpointBacktestsBacktestIdOrdersGetResponse,
    ApiError
  >({
    queryKey: queryKeys.backtests.orders(backtestId, params),
    queryFn: () =>
      getBacktestOrdersEndpointBacktestsBacktestIdOrdersGet(backtestId, params),
    enabled: !!backtestId,
  });
}

/**
 * Mutation hook to create a new backtest
 */
export function useCreateBacktestMutation() {
  return useMutation<
    createBacktestEndpointBacktestsPostResponse,
    ApiError,
    BacktestCreate
  >({
    mutationFn: createBacktestEndpointBacktestsPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.backtests.all() });
    },
  });
}

/**
 * Mutation hook to update a backtest (status and/or metrics)
 */
export function useUpdateBacktest() {
  return useMutation<
    updateBacktestEndpointBacktestsBacktestIdPatchResponse,
    ApiError,
    { backtestId: string; payload: BacktestUpdate }
  >({
    mutationFn: (variables: { backtestId: string; payload: BacktestUpdate }) =>
      updateBacktestEndpointBacktestsBacktestIdPatch(
        variables.backtestId,
        variables.payload,
      ),
    onSuccess: (
      _data: updateBacktestEndpointBacktestsBacktestIdPatchResponse,
      variables: { backtestId: string; payload: BacktestUpdate },
    ) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.backtests.detail(variables.backtestId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.backtests.all() });
    },
  });
}

/**
 * Mutation hook to delete a backtest
 */
export function useDeleteBacktest() {
  return useMutation<
    deleteBacktestEndpointBacktestsBacktestIdDeleteResponse,
    ApiError,
    string
  >({
    mutationFn: deleteBacktestEndpointBacktestsBacktestIdDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.backtests.all() });
    },
  });
}
