import { ArrowRight, Loader2 } from "lucide-react";
import React, { type FC } from "react";

import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  fields: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel: string;
  loading?: boolean;
  footer: React.ReactNode;
  error?: string | null;
}

const AuthLayout: FC<AuthLayoutProps> = (props) => {
  return (
    <div className="h-screen w-full">
      <div className="bg-background relative flex h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
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
                {props.fields}

                <Button
                  type="submit"
                  disabled={props.loading}
                  className="mt-2 h-10 w-full !bg-emerald-600 font-bold text-white hover:!bg-emerald-700 md:h-9"
                >
                  {props.loading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {props.submitLabel}
                  {!props.loading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </form>

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
