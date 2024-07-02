
import LoginForm from "@/components/auth/login/LoginForm";
import SignUpForm from "@/components/auth/signup/SignUpForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginPage: React.FC<{}> = () => {
  return (
    <main className="w-full">
      <section className="mx-auto my-4 w-full max-w-4xl mt-8 max-lg:p-6">
        <Tabs defaultValue="login">
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Cadastro</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm></LoginForm>
          </TabsContent>
          <TabsContent value="signup">
            <SignUpForm></SignUpForm>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}

export default LoginPage;
