// src/components/auth/AuthLayout.tsx
import { ArrowRight, Loader2, TrendingUp } from "lucide-react";
import React, { useState, type FC } from "react";

import { Button } from "@/components/ui/button";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  fields: React.ReactNode; // injected form fields
  onSubmit: (e: React.FormEvent) => void;
  submitLabel: string;
  loading?: boolean;
  footer: React.ReactNode; // injection for login/register footer switch
  error?: string | null;
};

const AuthLayout: FC<AuthLayoutProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen w-full overflow-hidden bg-[#0b0e11] text-zinc-100 lg:grid lg:grid-cols-2">
      {/* LEFT SIDE */}
      <div className="relative hidden flex-col border-r border-zinc-800/60 bg-[#0E0E10] text-white lg:flex">
        {/* Background */}
        <div className="absolute inset-0">
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.03]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <pattern
              id="grid-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 40L40 0H20L0 20M40 40V20L20 40"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-[500px] bg-gradient-to-t from-emerald-900/10 to-transparent" />
        </div>

        <div className="relative z-20 flex items-center p-10 text-lg font-bold tracking-tight">
          <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-sm bg-emerald-500">
            <TrendingUp className="h-5 w-5 text-[#0b0e11]" />
          </div>
          Spectuel
        </div>

        <div className="relative z-20 mt-auto max-w-lg p-10">
          <blockquote className="space-y-2">
            <div className="mb-4 flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-1 w-8 rounded-full bg-emerald-500/50"
                />
              ))}
            </div>
            <p className="text-lg leading-relaxed font-medium text-zinc-300">
              "Spectuel's the best exchange we've traded on in a while."
            </p>
            <footer className="mt-4 text-sm text-zinc-500">
              <span className="font-semibold text-zinc-200">Elena Rostova</span>
              <br />
              Senior Portfolio Manager, Zenith Capital
            </footer>
          </blockquote>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex h-full items-center justify-center bg-[#0b0e11] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[350px] gap-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              {props.title}
            </h1>
            <p className="text-xs text-zinc-400">{props.subtitle}</p>
          </div>

          <div className="grid gap-6">
            {props.error && (
              <p className="text-center text-xs text-red-500">{props.error}</p>
            )}

            <form onSubmit={props.onSubmit}>
              <div className="grid gap-4">
                {/* The caller injects INPUT FIELDS */}
                {props.fields}

                <Button
                  type="submit"
                  disabled={props.loading}
                  className="mt-2 h-10 w-full bg-emerald-600 font-bold text-white hover:bg-emerald-700 md:h-9"
                >
                  {props.loading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {props.submitLabel}
                  {!props.loading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </form>

            {/* Injected Login/Register Switch */}
            <div className="text-center text-xs text-zinc-500">
              {props.footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
