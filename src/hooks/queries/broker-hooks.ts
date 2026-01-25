import { queryKeys } from "@/lib/query/query-keys";
import { handleApi } from "@/lib/utils/base";
import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "@/lib/query/query-client";
import {
  deleteBrokerConnectionEndpointBrokersConnectionsConnectionIdDelete,
  getBrokerConnectionEndpointBrokersConnectionsConnectionIdGet,
  getOauthUrlBrokersAlpacaOauthGet,
  listBrokerConnectionsEndpointBrokersConnectionsGet,
  connectAlpacaBrokersAlpacaConnectPost,
  type AlpacaConnectRequest,
} from "@/openapi";

/**
 * Query hook to fetch the Alpaca OAuth URL
 */
export function useAlpacaOAuthUrlQuery() {
  return useQuery({
    queryKey: queryKeys.brokers.alpacaOAuth(),
    queryFn: async () => handleApi(await getOauthUrlBrokersAlpacaOauthGet()),
  });
}

/**
 * Query hook to fetch all broker connections
 */
export function useBrokerConnectionsQuery() {
  return useQuery({
    queryKey: queryKeys.brokers.connections(),
    queryFn: async () =>
      handleApi(await listBrokerConnectionsEndpointBrokersConnectionsGet()),
  });
}

/**
 * Query hook to fetch a specific broker connection by ID
 */
export function useBrokerConnectionQuery(connectionId: string) {
  return useQuery({
    queryKey: queryKeys.brokers.connection(connectionId),
    queryFn: async () =>
      handleApi(
        await getBrokerConnectionEndpointBrokersConnectionsConnectionIdGet(
          connectionId,
        ),
      ),
    enabled: !!connectionId,
  });
}

/**
 * Mutation hook to delete a broker connection
 */
export function useDeleteBrokerConnectionQuery() {
  return useMutation({
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

/**
 * Mutation hook to connect Alpaca broker with API key and secret
 */
export function useConnectAlpacaMutation() {
  return useMutation({
    mutationFn: async (credentials: AlpacaConnectRequest) =>
      handleApi(await connectAlpacaBrokersAlpacaConnectPost(credentials)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.brokers.connections(),
      });
    },
  });
}
