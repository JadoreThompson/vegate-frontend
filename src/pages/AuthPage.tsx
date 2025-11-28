import {
    ArrowRight,
    Chrome,
    Eye,
    EyeOff,
    Github,
    Loader2,
    ShieldCheck,
    TrendingUp,
} from "lucide-react";
import React, { useState } from "react";

// Assuming you have these components in your Shadcn setup
// If not, standard HTML elements with the same Tailwind classes will work
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
    <div className="bg-background h-screen w-full overflow-hidden lg:grid lg:grid-cols-2">
      {/* LEFT SIDE - VISUAL & BRANDING */}
      <div className="relative hidden flex-col bg-zinc-900 text-white lg:flex dark:border-r">
        {/* Background Pattern/Overlay */}
        <div className="absolute inset-0 bg-zinc-900">
          {/* Abstract Chart Pattern */}
          <svg
            className="absolute inset-0 h-full w-full opacity-10"
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
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-[500px] bg-gradient-to-t from-emerald-900/20 to-transparent" />
        </div>

        {/* Brand Logo Area */}
        <div className="relative z-20 flex items-center p-10 text-lg font-bold tracking-tight">
          <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
            <TrendingUp className="h-5 w-5 text-zinc-950" />
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
            <p className="text-lg leading-relaxed font-medium text-zinc-200">
              "TradePulse gives us the execution speed and security we need to
              handle high-frequency institutional trading. It is the gold
              standard for modern finance."
            </p>
            <footer className="mt-4 text-sm text-zinc-400">
              <span className="font-semibold text-zinc-100">Elena Rostova</span>
              <br />
              Senior Portfolio Manager, Zenith Capital
            </footer>
          </blockquote>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="bg-background relative flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        {/* Mobile Logo (Visible only on small screens) */}
        <div className="absolute top-4 left-4 flex items-center font-bold lg:hidden">
          <TrendingUp className="mr-2 h-5 w-5 text-emerald-600" />
          TradePulse
        </div>

        <div className="mx-auto grid w-full max-w-[400px] gap-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">
              {mode === "login" ? "Welcome back" : "Create an account"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {mode === "login"
                ? "Enter your credentials to access your portfolio."
                : "Enter your details below to start trading today."}
            </p>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                {mode === "register" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input
                        id="first-name"
                        placeholder="John"
                        required
                        className="bg-muted/30"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input
                        id="last-name"
                        placeholder="Doe"
                        required
                        className="bg-muted/30"
                      />
                    </div>
                  </div>
                )}

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    required
                    className="bg-muted/30"
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    {mode === "login" && (
                      <a
                        href="#"
                        className="text-xs font-medium text-emerald-600 hover:text-emerald-500"
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
                      className="bg-muted/30 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-muted-foreground hover:text-foreground absolute top-2.5 right-3 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {mode === "register" && (
                    <p className="text-muted-foreground text-[0.8rem]">
                      Must be at least 8 characters long.
                    </p>
                  )}
                </div>

                {mode === "login" && (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label
                      htmlFor="remember"
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember this device
                    </Label>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {mode === "login" ? "Sign In" : "Create Account"}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background text-muted-foreground px-2">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                disabled={isLoading}
                className="bg-background"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button
                variant="outline"
                disabled={isLoading}
                className="bg-background"
              >
                <Chrome className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
          </div>

          <div className="text-center text-sm">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={toggleMode}
                  className="font-medium underline underline-offset-4 transition-colors hover:text-emerald-600"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={toggleMode}
                  className="font-medium underline underline-offset-4 transition-colors hover:text-emerald-600"
                >
                  Sign in
                </button>
              </>
            )}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 opacity-60">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <p className="text-muted-foreground text-center text-xs">
              Bank-level encryption. Your data is secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
