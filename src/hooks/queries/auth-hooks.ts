import { queryClient } from "@/lib/query/query-client";
import { queryKeys } from "@/lib/query/query-keys";
import type { ApiError } from "@/lib/types/apiError";
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
  type changeUsernameAuthChangeUsernamePostResponse,
  type getMeAuthMeGetResponse,
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
  type verifyEmailAuthVerifyEmailPostResponse,
} from "@/openapi";

export function useLoginMutation() {
  return useMutation<loginAuthLoginPostResponse, ApiError, UserLogin, unknown>({
    mutationFn: (payload: UserLogin) => loginAuthLoginPost(payload),
  });
}

export function useRegisterMutation() {
  return useMutation<
    registerAuthRegisterPostResponse,
    ApiError,
    UserCreate,
    unknown
  >({
    mutationFn: (payload: UserCreate) => registerAuthRegisterPost(payload),
  });
}

export function useRequestEmailVerificationMutation() {
  return useMutation<
    requestEmailVerificationAuthRequestEmailVerificationPostResponse,
    ApiError,
    void,
    unknown
  >({
    mutationFn: () =>
      requestEmailVerificationAuthRequestEmailVerificationPost(),
  });
}

export function useVerifyEmailMutation() {
  return useMutation<
    verifyEmailAuthVerifyEmailPostResponse,
    ApiError,
    VerifyCode,
    unknown
  >({
    mutationFn: (payload: VerifyCode) =>
      verifyEmailAuthVerifyEmailPost(payload),
  });
}

export function useLogoutMutation() {
  return useMutation<logoutAuthLogoutPostResponse, ApiError, void, unknown>({
    mutationFn: () => logoutAuthLogoutPost(),
  });
}

export function useMeQuery() {
  return useQuery<getMeAuthMeGetResponse, ApiError>({
    queryKey: queryKeys.auth.me(),
    queryFn: () => getMeAuthMeGet(),
  });
}

export function useChangeUsernameMutation() {
  return useMutation<
    changeUsernameAuthChangeUsernamePostResponse,
    ApiError,
    UpdateUsername,
    unknown
  >({
    mutationFn: (payload: UpdateUsername) =>
      changeUsernameAuthChangeUsernamePost(payload),
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
    mutationFn: (payload: UpdatePassword) =>
      changePasswordAuthChangePasswordPost(payload),
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
    mutationFn: (payload: UpdateEmail) =>
      changeEmailAuthChangeEmailPost(payload),
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
    mutationFn: (payload: VerifyAction) =>
      verifyActionAuthVerifyActionPost(payload),
  });
}

/**
 * Alias for useMeQuery to match the naming convention
 */
export function useCurrentUser() {
  return useMeQuery();
}
