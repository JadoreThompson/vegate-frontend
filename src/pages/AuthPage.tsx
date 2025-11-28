import {
    ArrowRight,
    Eye,
    EyeOff,
    Loader2,
    ShieldCheck,
    TrendingUp,
} from "lucide-react";
import React, { useState } from "react";

// Shadcn UI Components (assumed available)
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthMode = "login" | "register";

export default function TradingAuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Mock submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setIsLoading(false);
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-[#0b0e11] text-zinc-100 lg:grid lg:grid-cols-2">
      {/* LEFT SIDE - VISUAL & BRANDING */}
      <div className="relative hidden flex-col border-r border-zinc-800/60 bg-[#0E0E10] text-white lg:flex">
        {/* Background Pattern/Overlay */}
        <div className="absolute inset-0">
          {/* Abstract Chart Pattern */}
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
          {/* Gradient Mesh */}
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-[500px] bg-gradient-to-t from-emerald-900/10 to-transparent" />
        </div>

        {/* Brand Logo Area */}
        <div className="relative z-20 flex items-center p-10 text-lg font-bold tracking-tight">
          <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-sm bg-emerald-500">
            <TrendingUp className="h-5 w-5 text-[#0b0e11]" />
          </div>
          TradePulse
        </div>

        {/* Content Area */}
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
              "TradePulse gives us the execution speed and security we need to
              handle high-frequency institutional trading. It is the gold
              standard for modern finance."
            </p>
            <footer className="mt-4 text-sm text-zinc-500">
              <span className="font-semibold text-zinc-200">Elena Rostova</span>
              <br />
              Senior Portfolio Manager, Zenith Capital
            </footer>
          </blockquote>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="relative flex h-full items-center justify-center bg-[#0b0e11] px-4 py-12 sm:px-6 lg:px-8">
        {/* Mobile Logo */}
        <div className="absolute top-6 left-6 flex items-center font-bold text-white lg:hidden">
          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-sm bg-emerald-500">
            <ArrowRight className="h-3 w-3 text-[#0b0e11]" />
          </div>
          TradePulse
        </div>

        <div className="mx-auto grid w-full max-w-[350px] gap-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              {mode === "login" ? "Welcome back" : "Create an account"}
            </h1>
            <p className="text-xs text-zinc-400">
              {mode === "login"
                ? "Enter your credentials to access your portfolio."
                : "Enter your details below to start trading today."}
            </p>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                
                {/* Re-added Register Name Fields */}
                {mode === "register" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="first-name" className="text-xs text-zinc-400">
                        First name
                      </Label>
                      <Input
                        id="first-name"
                        placeholder="John"
                        required
                        className="h-10 border-transparent bg-zinc-900/50 text-white transition-colors placeholder:text-zinc-600 hover:border-zinc-700 focus:border-emerald-600 md:h-9"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="last-name" className="text-xs text-zinc-400">
                        Last name
                      </Label>
                      <Input
                        id="last-name"
                        placeholder="Doe"
                        required
                        className="h-10 border-transparent bg-zinc-900/50 text-white transition-colors placeholder:text-zinc-600 hover:border-zinc-700 focus:border-emerald-600 md:h-9"
                      />
                    </div>
                  </div>
                )}

                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-xs text-zinc-400">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    required
                    className="h-10 border-transparent bg-zinc-900/50 text-white transition-colors placeholder:text-zinc-600 hover:border-zinc-700 focus:border-emerald-600 md:h-9"
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-xs text-zinc-400">
                      Password
                    </Label>
                    {mode === "login" && (
                      <a
                        href="#"
                        className="text-xs font-medium text-emerald-500 hover:text-emerald-400"
                      >
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      autoComplete={
                        mode === "login" ? "current-password" : "new-password"
                      }
                      required
                      className="h-10 border-transparent bg-zinc-900/50 pr-10 text-white transition-colors placeholder:text-zinc-600 hover:border-zinc-700 focus:border-emerald-600 md:h-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-2.5 right-3 text-zinc-500 transition-colors hover:text-zinc-300 md:top-2.5"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {mode === "register" && (
                    <p className="text-[10px] text-zinc-500">
                      Must be at least 8 characters long.
                    </p>
                  )}
                </div>

                {mode === "login" && (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" className="border-zinc-700 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600" />
                    <Label
                      htmlFor="remember"
                      className="text-xs font-medium leading-none text-zinc-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember this device
                    </Label>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 w-full bg-emerald-600 font-bold text-white hover:bg-emerald-700 h-10 md:h-9"
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {mode === "login" ? "Sign In" : "Create Account"}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </form>

            <div className="text-center text-xs text-zinc-500">
              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={toggleMode}
                    className="font-medium text-emerald-500 underline underline-offset-4 transition-colors hover:text-emerald-400"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={toggleMode}
                    className="font-medium text-emerald-500 underline underline-offset-4 transition-colors hover:text-emerald-400"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 opacity-60">
              <ShieldCheck className="h-3 w-3 text-emerald-600" />
              <p className="text-center text-[10px] text-zinc-500">
                Bank-level encryption. Your data is secure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}