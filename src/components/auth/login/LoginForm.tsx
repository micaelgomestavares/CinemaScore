"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormInputs, loginSchema } from "./LoginSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/services/supabase/AuthContext";
import { redirect } from "react-router-dom";

const LoginForm: React.FC = () => {
  const { signInWithCredentials } = useAuth();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormInputs) => {
    await signInWithCredentials(values);
    redirect("/");
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
        />
        {errors.email && <p className="text-xs text-muted-foreground mt-2">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
        />
        {errors.password && <p className="text-xs text-muted-foreground mt-2">{errors.password.message}</p>}
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
