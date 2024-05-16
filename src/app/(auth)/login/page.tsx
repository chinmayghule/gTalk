"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import FormErrorMessage from "@/app/(auth)/_components/FormErrorMessage";
import apiClient from "@/lib/axiosConfig";
import cookie from "cookiejs";

type SuccessResponse = {
  message: string;
  token: string;
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

export default function LoginForm() {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  return (
    <main className="min-h-screen grid place-items-center">
      <Card className="mx-auto max-w-2xl p-0 sm:p-8 max-[768px]:border-none max-[768px]:shadow-none">
        <CardHeader>
          <CardTitle className="text-3xl">Login</CardTitle>
          <CardDescription className="text-xl">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit((data) => loginUser(data, setError, router))}
            className="grid gap-4"
          >
            {errors.root && (
              <FormErrorMessage
                message={errors.root.message as string}
                isRoot={true}
              />
            )}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-base">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
                className="text-base"
              />
              {errors.email && (
                <FormErrorMessage message={errors.email.message as string} />
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-base">
                  Password
                </Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-base underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className="text-base"
              />
              {errors.password && (
                <FormErrorMessage message={errors.password.message as string} />
              )}
            </div>
            <Button
              type="submit"
              className="w-full text-base font-semibold"
              disabled={isSubmitting}
            >
              Login
            </Button>
            <Button
              variant="outline"
              className="w-full text-base font-semibold"
              disabled={true}
            >
              Login with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-base">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline text-base">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

async function loginUser(data: FieldValues, setError: any, router: any) {
  // convert FieldValues object into an array of key-value pairs
  const dataArray = Object.entries(data);

  // extract form data
  const { email, password } = Object.fromEntries(dataArray) as {
    email: string;
    password: string;
  };

  console.log(email, password);

  // signup user
  try {
    const res = await apiClient.post("/login", { email, password });

    const data: SuccessResponse = await res.data;
    const { message, token, userInfo } = data;

    // set token and userInfo as cookies.
    cookie.set("token", token);
    cookie.set("userInfo", JSON.stringify(userInfo));

    console.log(message);

    // redirect user to `/chat`
    router.push("/chat");
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      const errorData = error.response.data;
      setError("root", { message: errorData.message });
    } else if (error.message === "Network Error" || !error.response) {
      setError("root", {
        message: "There's a network problem. Please try again later.",
      });
    }
    console.log(error);
  }
}
