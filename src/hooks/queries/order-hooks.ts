import { queryClient } from "@/lib/query/query-client";
import { queryKeys } from "@/lib/query/query-keys";
import type { ApiError } from "@/lib/types/apiError";
import { useMutation, useQuery } from "@tanstack/react-query";

// NOTE: Order-related endpoints are not yet available in the OpenAPI spec
// The types and functions below are commented out until they are generated

// import {
//   cancelOrderOrdersOrderIdDelete,
//   createOcoOrderOrdersOcoPost,
//   createOrderOrdersPost,
//   createOtoOrderOrdersOtoPost,
//   createOtocoOrderOrdersOtocoPost,
//   getOrderOrdersOrderIdGet,
//   getOrdersOrdersGet,
//   modifyOrderOrdersOrderIdPatch,
//   type GetOrdersOrdersGetParams,
//   type OCOOrderCreate,
//   type OTOCOOrderCreate,
//   type OTOOrderCreate,
//   type OrderModify,
//   type SingleOrderCreate,
//   type createOrderOrdersPostResponse,
// } from "@/openapi";

// Placeholder types until OpenAPI generates them
type GetOrdersOrdersGetParams = { skip?: number; limit?: number };
type SingleOrderCreate = any;
type OCOOrderCreate = any;
type OTOOrderCreate = any;
type OTOCOOrderCreate = any;
type OrderModify = any;

export function useOrdersQuery(params?: GetOrdersOrdersGetParams) {
  return useQuery({
    queryKey: queryKeys.orders.list(params),
    queryFn: async () => {
      // Placeholder - replace with actual API call when available
      throw new Error("Orders API endpoint not yet implemented");
    },
    enabled: false, // Disabled until API is available
  });
}

export function useOrderQuery(orderId: string) {
  return useQuery({
    queryKey: queryKeys.orders.detail(orderId),
    queryFn: async () => {
      throw new Error("Orders API endpoint not yet implemented");
    },
    enabled: false, // Disabled until API is available
  });
}

export function useCreateOrderMutation() {
  return useMutation<unknown, ApiError, SingleOrderCreate>({
    mutationFn: async (payload: SingleOrderCreate) => {
      throw new Error("Orders API endpoint not yet implemented");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
    },
  });
}

export function useCreateOcoOrderMutation() {
  return useMutation<unknown, ApiError, OCOOrderCreate>({
    mutationFn: async (payload: OCOOrderCreate) => {
      throw new Error("Orders API endpoint not yet implemented");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
    },
  });
}

export function useCreateOtoOrderMutation() {
  return useMutation<unknown, ApiError, OTOOrderCreate>({
    mutationFn: async (payload: OTOOrderCreate) => {
      throw new Error("Orders API endpoint not yet implemented");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
    },
  });
}

export function useCreateOtocoOrderMutation() {
  return useMutation<unknown, ApiError, OTOCOOrderCreate>({
    mutationFn: async (payload: OTOCOOrderCreate) => {
      throw new Error("Orders API endpoint not yet implemented");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
    },
  });
}

export function useModifyOrderMutation(orderId: string) {
  return useMutation<unknown, ApiError, OrderModify>({
    mutationFn: async (payload: OrderModify) => {
      throw new Error("Orders API endpoint not yet implemented");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
    },
  });
}

export function useCancelOrderMutation(orderId: string) {
  return useMutation<unknown, ApiError, void>({
    mutationFn: async () => {
      throw new Error("Orders API endpoint not yet implemented");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
    },
  });
}

export function useCancelAllOrdersMutation() {
  return useMutation<unknown, ApiError, void>({
    mutationFn: async () =>
      await new Promise((resolve) => setTimeout(resolve, 1000)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
    },
  });
}
