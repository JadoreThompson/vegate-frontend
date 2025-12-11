import { queryClient } from "@/lib/query/query-client";
import { queryKeys } from "@/lib/query/query-keys";
import type { ApiError } from "@/lib/types/apiError";
import { handleApi } from "@/lib/utils/base";
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
  ListBacktestsEndpointBacktestsGetParams,
  listBacktestsEndpointBacktestsGetResponse,
  updateBacktestEndpointBacktestsBacktestIdPatchResponse
} from "@/openapi";

/**
 * Query hook to fetch a paginated list of backtests
 */
export function useBacktestsQuery(
  params?: ListBacktestsEndpointBacktestsGetParams,
) {
  return useQuery<listBacktestsEndpointBacktestsGetResponse, ApiError>({
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
 * Mutation hook to create a new backtest
 */
export function useCreateBacktestMutation() {
  return useMutation<
    createBacktestEndpointBacktestsPostResponse,
    ApiError,
    BacktestCreate
  >({
    mutationFn: async (payload: BacktestCreate) =>
      handleApi(await createBacktestEndpointBacktestsPost(payload)),
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
    mutationFn: async (variables: {
      backtestId: string;
      payload: BacktestUpdate;
    }) =>
      handleApi(
        await updateBacktestEndpointBacktestsBacktestIdPatch(
          variables.backtestId,
          variables.payload,
        ),
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
    mutationFn: async (backtestId: string) =>
      handleApi(
        await deleteBacktestEndpointBacktestsBacktestIdDelete(backtestId),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.backtests.all() });
    },
  });
}
