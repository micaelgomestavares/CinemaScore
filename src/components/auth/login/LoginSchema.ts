import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha precisa ter no mínimo 6 caracteres" }),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;