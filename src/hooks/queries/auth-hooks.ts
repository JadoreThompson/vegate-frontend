import type { ApiError } from "@/lib/types/apiError";
import {
  loginUserAuthLoginPost,
  registerUserAuthRegisterPost,
  type registerUserAuthRegisterPostResponse,
  type UserCreate,
  type UserLogin,
} from "@/openapi";
import { useMutation } from "@tanstack/react-query";

export function useLoginMutation() {
  return useMutation<
    registerUserAuthRegisterPostResponse,
    ApiError,
    UserLogin,
    unknown
  >({
    mutationFn: async (payload: UserLogin) =>
      await loginUserAuthLoginPost(payload),
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: async (payload: UserCreate) =>
      await registerUserAuthRegisterPost(payload),
  });
}
