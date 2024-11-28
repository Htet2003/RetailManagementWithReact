import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks";
import { useState } from "react";
import { loginMutation } from "@/api/auth";

const FormSchema = z.object({
  userName: z.string().min(3, {
    message: "User name must contain at least 3 characters.",
  }),
  password: z.string().min(4, {
    message: "Password must contain at least 4 characters.",
  }),
});

const LoginView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { toast } = useToast();
  const { userLogin } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
    shouldUnregister: true,
  });

  const { mutate: loginUser } = loginMutation.useMutation({
    onMutate: () => setIsLoading(true),
    onSuccess: (data) => {
      userLogin(data.data.result);
      const routeToRedirect = location.state?.from
        ? location.state.from.pathname
        : "/";
      navigate(routeToRedirect, { replace: true });

      toast({
        title: `You logged in with the following User Name: ${
          form.getValues().userName
        }`,
        description: "Successful login",
      });
    },
    onError: (error) => {
      console.error("Error during login:", error);

      toast({
        title: `Login fail!`,
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    loginUser(data);
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Retail Management Login</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="User Name"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginView;
