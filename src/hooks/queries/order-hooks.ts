import { queryKeys } from "@/lib/query/query-keys";
import type { ApiError } from "@/lib/types/apiError";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  cancelOrderOrdersOrderIdDelete,
  createOcoOrderOrdersOcoPost,
  createOrderOrdersPost,
  createOtoOrderOrdersOtoPost,
  createOtocoOrderOrdersOtocoPost,
  getOrderOrdersOrderIdGet,
  getOrdersOrdersGet,
  modifyOrderOrdersOrderIdPatch,
  type GetOrdersOrdersGetParams,
  type OCOOrderCreate,
  type OTOCOOrderCreate,
  type OTOOrderCreate,
  type OrderModify,
  type SingleOrderCreate,
  type createOrderOrdersPostResponse,
} from "@/openapi";

export function useOrdersQuery(params?: GetOrdersOrdersGetParams) {
  return useQuery({
    queryKey: [queryKeys.orders.list, params],
    queryFn: async () => await getOrdersOrdersGet(params),
  });
}

export function useOrderQuery(orderId: string) {
  return useQuery({
    queryKey: [queryKeys.orders.detail, orderId],
    queryFn: async () => await getOrderOrdersOrderIdGet(orderId),
    enabled: !!orderId,
  });
}

export function useCreateOrderMutation() {
  return useMutation<
    createOrderOrdersPostResponse,
    ApiError,
    SingleOrderCreate
  >({
    mutationFn: async (payload) => await createOrderOrdersPost(payload),
  });
}

export function useCreateOcoOrderMutation() {
  return useMutation<unknown, ApiError, OCOOrderCreate>({
    mutationFn: async (payload) => await createOcoOrderOrdersOcoPost(payload),
  });
}

export function useCreateOtoOrderMutation() {
  return useMutation<unknown, ApiError, OTOOrderCreate>({
    mutationFn: async (payload) => await createOtoOrderOrdersOtoPost(payload),
  });
}

export function useCreateOtocoOrderMutation() {
  return useMutation<unknown, ApiError, OTOCOOrderCreate>({
    mutationFn: async (payload) =>
      await createOtocoOrderOrdersOtocoPost(payload),
  });
}

export function useModifyOrderMutation(orderId: string) {
  return useMutation<unknown, ApiError, OrderModify>({
    mutationFn: async (payload) =>
      await modifyOrderOrdersOrderIdPatch(orderId, payload),
  });
}

export function useCancelOrderMutation(orderId: string) {
  return useMutation<unknown, ApiError, void>({
    mutationFn: async () => await cancelOrderOrdersOrderIdDelete(orderId),
  });
}

export function useCancelAllOrdersMutation() {
  return useMutation<unknown, ApiError, void>({
    // mutationFn: async () => await cancelAllOrdersOrdersDelete(),
    mutationFn: async () => await new Promise(resolve => setTimeout(resolve, 1000)),
  });
}
