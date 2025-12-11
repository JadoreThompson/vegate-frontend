import { queryClient } from "@/lib/query/query-client";
import { queryKeys } from "@/lib/query/query-keys";
import type { ApiError } from "@/lib/types/apiError";
import { handleApi } from "@/lib/utils/base";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  changeEmailAuthChangeEmailPost,
  changePasswordAuthChangePasswordPost,
  changeUsernameAuthChangeUsernamePost,
  getMeAuthMeGet,
  loginAuthLoginPost,
  logoutAuthLogoutPost,
  registerAuthRegisterPost,
  requestEmailVerificationAuthRequestEmailVerificationPost,
  verifyActionAuthVerifyActionPost,
  verifyEmailAuthVerifyEmailPost,
  type changeEmailAuthChangeEmailPostResponse,
  type changePasswordAuthChangePasswordPostResponse,
  type loginAuthLoginPostResponse,
  type logoutAuthLogoutPostResponse,
  type registerAuthRegisterPostResponse,
  type requestEmailVerificationAuthRequestEmailVerificationPostResponse,
  type UpdateEmail,
  type UpdatePassword,
  type UpdateUsername,
  type UserCreate,
  type UserLogin,
  type VerifyAction,
  type verifyActionAuthVerifyActionPostResponse,
  type VerifyCode,
  type verifyEmailAuthVerifyEmailPostResponse
} from "@/openapi";

export function useLoginMutation() {
  return useMutation<loginAuthLoginPostResponse, ApiError, UserLogin, unknown>({
    mutationFn: async (payload: UserLogin) =>
      handleApi(await loginAuthLoginPost(payload)),
  });
}

export function useRegisterMutation() {
  return useMutation<
    registerAuthRegisterPostResponse,
    ApiError,
    UserCreate,
    unknown
  >({
    mutationFn: async (payload: UserCreate) =>
      handleApi(await registerAuthRegisterPost(payload)),
  });
}

export function useRequestEmailVerificationMutation() {
  return useMutation<
    requestEmailVerificationAuthRequestEmailVerificationPostResponse,
    ApiError,
    void,
    unknown
  >({
    mutationFn: async () =>
      handleApi(
        await requestEmailVerificationAuthRequestEmailVerificationPost(),
      ),
  });
}

export function useVerifyEmailMutation() {
  return useMutation<
    verifyEmailAuthVerifyEmailPostResponse,
    ApiError,
    VerifyCode,
    unknown
  >({
    mutationFn: async (payload: VerifyCode) =>
      handleApi(await verifyEmailAuthVerifyEmailPost(payload)),
  });
}

export function useLogoutMutation() {
  return useMutation<logoutAuthLogoutPostResponse, ApiError, void, unknown>({
    mutationFn: async () => handleApi(await logoutAuthLogoutPost()),
  });
}

export function useMeQuery() {
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: async () => handleApi(await getMeAuthMeGet()),
  });
}

export function useChangeUsernameMutation() {
  return useMutation({
    mutationFn: async (payload: UpdateUsername) =>
      handleApi(await changeUsernameAuthChangeUsernamePost(payload)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
    },
  });
}

export function useChangePasswordMutation() {
  return useMutation<
    changePasswordAuthChangePasswordPostResponse,
    ApiError,
    UpdatePassword,
    unknown
  >({
    mutationFn: async (payload: UpdatePassword) =>
      handleApi(await changePasswordAuthChangePasswordPost(payload)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
    },
  });
}

export function useChangeEmailMutation() {
  return useMutation<
    changeEmailAuthChangeEmailPostResponse,
    ApiError,
    UpdateEmail,
    unknown
  >({
    mutationFn: async (payload: UpdateEmail) =>
      handleApi(await changeEmailAuthChangeEmailPost(payload)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
    },
  });
}

export function useVerifyActionMutation() {
  return useMutation<
    verifyActionAuthVerifyActionPostResponse,
    ApiError,
    VerifyAction,
    unknown
  >({
    mutationFn: async (payload: VerifyAction) =>
      handleApi(await verifyActionAuthVerifyActionPost(payload)),
  });
}

/**
 * Alias for useMeQuery to match the naming convention
 */
export function useCurrentUser() {
  return useMeQuery();
}
