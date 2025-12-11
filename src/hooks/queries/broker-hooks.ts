import { queryKeys } from "@/lib/query/query-keys";
import type { ApiError } from "@/lib/types/apiError";
import { handleApi } from "@/lib/utils/base";
import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "@/lib/query/query-client";
import {
  deleteBrokerConnectionEndpointBrokersConnectionsConnectionIdDelete,
  getBrokerConnectionEndpointBrokersConnectionsConnectionIdGet,
  getOauthUrlBrokersAlpacaOauthGet,
  listBrokerConnectionsEndpointBrokersConnectionsGet,
  type deleteBrokerConnectionEndpointBrokersConnectionsConnectionIdDeleteResponse,
  type getBrokerConnectionEndpointBrokersConnectionsConnectionIdGetResponse,
  type getOauthUrlBrokersAlpacaOauthGetResponse,
  type listBrokerConnectionsEndpointBrokersConnectionsGetResponse,
} from "@/openapi";

/**
 * Query hook to fetch the Alpaca OAuth URL
 */
export function useAlpacaOAuthUrlQuery() {
  return useQuery<getOauthUrlBrokersAlpacaOauthGetResponse, ApiError>({
    queryKey: queryKeys.brokers.alpacaOAuth(),
    queryFn: async () => handleApi(await getOauthUrlBrokersAlpacaOauthGet()),
  });
}

/**
 * Query hook to fetch all broker connections
 */
export function useBrokerConnectionsQuery() {
  return useQuery<
    listBrokerConnectionsEndpointBrokersConnectionsGetResponse,
    ApiError
  >({
    queryKey: queryKeys.brokers.connections(),
    queryFn: async () =>
      handleApi(await listBrokerConnectionsEndpointBrokersConnectionsGet()),
  });
}

/**
 * Query hook to fetch a specific broker connection by ID
 */
export function useBrokerConnectionQuery(connectionId: string) {
  return useQuery<
    getBrokerConnectionEndpointBrokersConnectionsConnectionIdGetResponse,
    ApiError
  >({
    queryKey: queryKeys.brokers.connection(connectionId),
    queryFn: async () =>
      handleApi(
        await getBrokerConnectionEndpointBrokersConnectionsConnectionIdGet(
          connectionId,
        ),
      ),
    select: (response) => response.data,
    enabled: !!connectionId,
  });
}

/**
 * Mutation hook to delete a broker connection
 */
export function useDeleteBrokerConnectionQuery() {
  return useMutation<
    deleteBrokerConnectionEndpointBrokersConnectionsConnectionIdDeleteResponse,
    ApiError,
    string
  >({
    mutationFn: async (connectionId: string) =>
      handleApi(
        await deleteBrokerConnectionEndpointBrokersConnectionsConnectionIdDelete(
          connectionId,
        ),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.brokers.connections(),
      });
    },
  });
}
