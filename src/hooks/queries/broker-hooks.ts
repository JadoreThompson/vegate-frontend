import { queryKeys } from "@/lib/query/query-keys";
import type { ApiError } from "@/lib/types/apiError";
import { useQuery } from "@tanstack/react-query";

import {
  getOauthUrlBrokersAlpacaOauthGet,
  type getOauthUrlBrokersAlpacaOauthGetResponse,
} from "@/openapi";

/**
 * Query hook to fetch the Alpaca OAuth URL
 */
export function useAlpacaOAuthUrl() {
  return useQuery<getOauthUrlBrokersAlpacaOauthGetResponse, ApiError>({
    queryKey: queryKeys.brokers.alpacaOAuth(),
    queryFn: () => getOauthUrlBrokersAlpacaOauthGet(),
  });
}
