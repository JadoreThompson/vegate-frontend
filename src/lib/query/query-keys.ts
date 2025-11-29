import type { GetOrdersOrdersGetParams } from "@/openapi";

export const queryKeys = {
  auth: {
    all: () => ["all"] as const,
    me: () => [...queryKeys.auth.all(), "me"],
  },
  orders: {
    all: () => ["orders"] as const,
    list: (params?: GetOrdersOrdersGetParams) =>
      [...queryKeys.orders.all(), params] as const,
    detail: (orderId: string) => [...queryKeys.orders.all(), "detail", orderId],
  },
};
