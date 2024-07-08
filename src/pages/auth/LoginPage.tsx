
import LoginForm from "@/components/auth/login/LoginForm";
import SignUpForm from "@/components/auth/signup/SignUpForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginPage: React.FC<{}> = () => {
  return (
    <main className="w-full">
      <section className="flex justify-center mx-auto my-4 w-full max-w-4xl mt-8 max-lg:p-6">
        <Tabs className="w-[500px]" defaultValue="login">
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Cadastro</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Entrar</CardTitle>
                <CardDescription>Realize login na plataforma.</CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm></LoginForm>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Cadastro</CardTitle>
                <CardDescription>Cadastre-se e tenha acesso a todos as funcionalidades da plataforma.</CardDescription>
              </CardHeader>
              <CardContent>
                <SignUpForm></SignUpForm>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}

export default LoginPage;
