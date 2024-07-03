'use client'

import React, { useState } from "react";
import { SignUpFormInputs, signUpSchema } from "./SignUpSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/services/supabase/AuthContext";
import { useNavigate } from "react-router-dom";

const SignUpForm: React.FC = () => {
  const { signUpWithCredentials } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (values: SignUpFormInputs) => {
    await signUpWithCredentials(values);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="username">Nome de usuário</Label>
        <Input
          id="username"
          type="text"
          {...register("username")}
        />
        {errors.username && <p className="text-xs text-muted-foreground mt-2">{errors.username.message}</p>}
      </div>
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
      <Button type="submit" disabled={isSubmitting}>Realizar Cadastro</Button>
    </form>
  );
};

export default SignUpForm;
