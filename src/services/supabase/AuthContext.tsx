import { createContext, useContext, useState } from 'react';
import { LoginFormInputs } from '@/components/auth/login/LoginSchema';
import { SignUpFormInputs } from '@/components/auth/signup/SignUpSchema';
import { Profile } from '@/types/user-profile';
import { redirect } from 'react-router-dom';
import { getProfileById } from './Profile/get-profile-by-id';
import supabase from './client';
import { useToast } from "@/components/ui/use-toast";

export interface AuthContext {
  user: Profile | null;
  signInWithCredentials: (credentials: LoginFormInputs) => Promise<void>;
  signUpWithCredentials: (credentials: SignUpFormInputs) => Promise<void>;
  logout: () => Promise<void>;
}

export const authContext = createContext<AuthContext | undefined>(undefined);

interface AuthContextProviderProps {
  initialUser: Profile | null;
  children: React.ReactNode;
}

export const AuthContextProvider = ({
  children,
  initialUser,
}: AuthContextProviderProps) => {
  const [user, setUser] = useState<Profile | null>(initialUser);
  const { toast } = useToast()

  const signInWithCredentials = async (credentials: LoginFormInputs) => {
    try {
      const { email, password } = credentials;
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            variant: "destructive",
            title: "Senha incorreta.",
            description: "Não foi possível realizar o login",
          });
        }

        throw error;
      };

      if (data) {
        const profile = await getProfileById(data.user.id)
        setUser(profile);
        toast({
          title: "Seja bem vindo(a).",
          description: "Você se logou com sucesso.",
        });
      }
    } catch (error: any) {
      console.error('Error signing in:', error.message);
    }
  };

  const signUpWithCredentials = async ({
    username,
    avatar_url,
    ...credentials
  }: SignUpFormInputs) => {
    const { email, password } = credentials;

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        ...credentials,
        options: {
          data: {
            username,
            avatar_url,
          },
        },
      });

      if (signUpError) {
        if (signUpError.message.includes('User already registered')) {
          toast({
            variant: "destructive",
            title: "Algo deu errado.",
            description: "Este email já está em uso.",
          });
        } else {
          console.error('Error signing up:', signUpError.message);
        }
        return;
      }

      await signInWithCredentials({ email, password });
      toast({
        title: "Cadastro realizado com sucesso.",
        description: "O seu cadastro foi realizado com sucesso. Seja bem vindo(a).",
      });
      redirect("/");
    } catch (error: any) {
      console.error('Error signing up:', error.message);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error: any) {
      console.error('Error signing out:', error.message);
    }
  };

  const authContextValue: AuthContext = {
    user,
    signInWithCredentials,
    signUpWithCredentials,
    logout,
  };

  return <authContext.Provider value={authContextValue}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

