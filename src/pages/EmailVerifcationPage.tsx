// src\pages\EmailVerificationPage.tsx
import AuthLayout from "@/components/layouts/auth-layout";
import React, { useState, type FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useVerifyEmailMutation } from "@/hooks/queries/auth-hooks";
import { useNavigate } from "react-router";

const EmailVerificationPage: FC = () => {
  const navigate = useNavigate();
  const verifyEmailMutation = useVerifyEmailMutation();

  const [code, setCode] = useState("");

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
      subtitle={"Please enter the verification token sent to your registered email address.\nThe token expires in 60 seconds. You have a maximum of 5 verification attempts."}
      submitLabel="Verify Email"
      loading={verifyEmailMutation.isPending}
      // Display error message returned from the API (e.g., token invalid, expired, or max attempts reached)
      error={verifyEmailMutation.error?.error || null}
      onSubmit={handleSubmit}
      footer={
        <>
          Didn't receive the token?{" "}
          {/* Note: In a real application, this link would trigger useRequestEmailVerificationMutation */}
          <a href="#" className="text-emerald-500 underline">
            Resend Code
          </a>
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