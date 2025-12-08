// src\pages\EmailVerificationPage.tsx
import AuthLayout from "@/components/layouts/auth-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useRequestEmailVerificationMutation,
  useVerifyEmailMutation,
} from "@/hooks/queries/auth-hooks";
import React, { useState, type FC } from "react";
import { useNavigate } from "react-router";

const EmailVerificationPage: FC = () => {
  const navigate = useNavigate();
  const verifyEmailMutation = useVerifyEmailMutation();
  const requestVerificationMutation = useRequestEmailVerificationMutation();

  const [code, setCode] = useState("");

  const handleResendCode = (e: React.MouseEvent) => {
    e.preventDefault();
    requestVerificationMutation.mutate();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    verifyEmailMutation.mutate(
      { code },
      {
        onSuccess: () => {
          // Verification successful, redirect to the main application or dashboard
          navigate("/trade");
        },
        // Error handling is managed by AuthLayout via the `error` prop
      },
    );
  };

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle={
        "Please enter the verification token sent to your registered email address.\nThe token expires in 60 seconds. You have a maximum of 5 verification attempts."
      }
      submitLabel="Verify Email"
      loading={verifyEmailMutation.isPending}
      // Display error message returned from the API (e.g., token invalid, expired, or max attempts reached)
      error={verifyEmailMutation.error?.error || null}
      onSubmit={handleSubmit}
      footer={
        <>
          Didn't receive the token?{" "}
          <button
            onClick={handleResendCode}
            disabled={requestVerificationMutation.isPending}
            className="text-emerald-500 underline disabled:opacity-50"
          >
            {requestVerificationMutation.isPending
              ? "Sending..."
              : "Resend Code"}
          </button>
          {requestVerificationMutation.isSuccess && (
            <span className="ml-2 text-xs text-emerald-600">Code sent!</span>
          )}
        </>
      }
      fields={
        <>
          <div className="grid gap-2">
            <Label htmlFor="token" className="text-xs text-zinc-400">
              Verification Token
            </Label>
            <Input
              id="token"
              type="text"
              required
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </>
      }
    />
  );
};

export default EmailVerificationPage;
