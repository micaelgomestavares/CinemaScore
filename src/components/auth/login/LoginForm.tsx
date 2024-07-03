"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormInputs, loginSchema } from "./LoginSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/services/supabase/AuthContext";
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";

const LoginForm: React.FC = () => {
  const { signInWithCredentials } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormInputs) => {
    await signInWithCredentials(values);
    navigate("/");
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
        <div className="flex space-x-2">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register("password")}
          />
          <Button
            size="icon"
            variant="outline"
            onClick={() => setShowPassword((prev) => !prev)}
            type="button"
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </Button>
        </div>
        {errors.password && <p className="text-xs text-muted-foreground mt-2">{errors.password.message}</p>}
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
