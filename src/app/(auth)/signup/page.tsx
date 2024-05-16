"use client";

import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
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

const schema = z
  .object({
    firstName: z
      .string()
      .min(3, "First name should have min 3 characters.")
      .max(20, "First name should have max 20 characters."),
    lastName: z
      .string()
      .min(3, "Last name should have min 3 characters.")
      .max(20, "Last name should have max 20 characters."),
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Page() {
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
      <Card className="mx-auto max-w-2xl p-0 sm:px-8 sm:py-4 max-[768px]:border-none max-[768px]:shadow-none">
        <CardHeader>
          <CardTitle className="text-3xl">Sign Up</CardTitle>
          <CardDescription className="text-xl">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit((data) =>
              signupUser(data, setError, router)
            )}
            className="grid gap-4"
          >
            {errors.root && (
              <FormErrorMessage
                message={errors.root.message as string}
                isRoot={true}
              />
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name" className="text-base">
                  First name
                </Label>
                <Input
                  id="first-name"
                  placeholder="John"
                  className="text-base"
                  {...register("firstName")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name" className="text-base">
                  Last name
                </Label>
                <Input
                  id="last-name"
                  placeholder="Doe"
                  className="text-base"
                  {...register("lastName")}
                />
              </div>
              {(errors.lastName || errors.lastName) && (
                <div className="col-span-2">
                  <FormErrorMessage
                    message={
                      errors.firstName
                        ? (errors.firstName.message as string)
                        : (errors.lastName.message as string)
                    }
                  />
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email" className="text-base">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="m@example.com"
                className="text-base"
              />
              {errors.email && (
                <FormErrorMessage message={errors.email.message as string} />
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-base">
                Password
              </Label>
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
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword" className="text-base">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                className="text-base"
              />
              {errors.confirmPassword && (
                <FormErrorMessage
                  message={errors.confirmPassword.message as string}
                />
              )}
            </div>
            <Button
              type="submit"
              className="w-full text-base font-semibold"
              disabled={isSubmitting}
            >
              Create an account
            </Button>
            <Button
              variant="outline"
              className="w-full  text-base font-semibold"
              disabled={true}
            >
              Sign up with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-base">
            Already have an account?{" "}
            <Link href="/login" className="underline text-base">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

async function signupUser(
  data: FieldValues,
  setError: any,
  router: AppRouterInstance
) {
  // convert FieldValues object into an array of key-value pairs
  const dataArray = Object.entries(data);

  // extract form data
  const { firstName, lastName, email, password } = Object.fromEntries(
    dataArray
  ) as z.infer<typeof schema>;

  console.log(firstName, lastName, email, password);

  // signup user
  try {
    const res = await apiClient.post("/signup", {
      firstName,
      lastName,
      email,
      password,
    });

    const data: SuccessResponse = await res.data;
    const { message, token, userInfo } = data;

    // set token and userInfo as cookies.
    cookie.set("token", token);
    cookie.set("userInfo", JSON.stringify(userInfo));

    console.log(message);

    router.push("/chat");
    console.log(data);
  } catch (error: any) {
    console.log("Could not sign up: ", error);
    setError("root", { message: "Sign up failed. Please try again later." });
  }
}
