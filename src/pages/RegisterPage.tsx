import AuthLayout from "@/components/layouts/auth-layout";
import React, { useState, type FC } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterMutation } from "@/hooks/queries/auth-hooks";
import { useNavigate } from "react-router";

const RegisterPage: FC = () => {
  const registerMutation = useRegisterMutation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    registerMutation.mutate({
      username: form.username,
      email: form.email,
      password: form.password,
    }, {onSuccess: () => navigate("/trade")});
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Enter your details below to start trading today."
      submitLabel="Create Account"
      loading={registerMutation.isPending}
      error={registerMutation.error?.message || null}
      onSubmit={handleSubmit}
      footer={
        <>
          Already have an account?{" "}
          <a href="/login" className="text-emerald-500 underline">
            Sign in
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
              type="text"
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="username"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-xs text-zinc-400">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={form.email}
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
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </>
      }
    />
  );
};

export default RegisterPage;
