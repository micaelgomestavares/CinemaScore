import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha precisa ter no mínimo 6 caracteres" }),
  username: z.string().min(6, { message: "O nome de usuário precisa ter no mínimo 6 caracteres" })
});

export type SignUpFormInputs = z.infer<typeof signUpSchema>;
