import AuthLayout from "@/components/layouts/auth-layout";
import React, { useState, type FC } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useLoginMutation } from "@/hooks/queries/auth-hooks";
import type { UserLogin } from "@/openapi";
import { useNavigate } from "react-router";

const LoginPage: FC = () => {
  const loginMutation = useLoginMutation();
  const navigate = useNavigate();

  const [form, setForm] = useState<UserLogin>({
    username: null,
    email: null,
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      loginMutation.mutate(
        {
          username: form.username,
          email: form.email,
          password: form.password,
        },
      );
      navigate("/strategies")
    } catch(error) {
      console.error(error)
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your credentials to access your strategies."
      submitLabel="Sign In"
      loading={loginMutation.isPending}
      error={(loginMutation.error as any)?.error || null}
      onSubmit={handleSubmit}
      footer={
        <>
          Don't have an account?{" "}
          <a href="/register" className="text-emerald-500 underline">
            Sign up
          </a>
        </>
      }
      fields={
        <>
          <div className="grid gap-2">
            <Label htmlFor="username" className="text-xs text-zinc-400">
              Username
            </Label>
            <Input
              id="username"
              type="username"
              value={form.username ?? ""}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="name@example.com"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email" className="text-xs text-zinc-400">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={form.email ?? ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="name@example.com"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password" className="text-xs text-zinc-400">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              value={form.password ?? ""}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-xs text-zinc-400">
              Remember this device
            </Label>
          </div>
        </>
      }
    />
  );
};

export default LoginPage;
