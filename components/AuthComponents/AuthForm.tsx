"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormField from "./FormField";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { formFieldsMaker } from "@/lib/utils";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AuthForm = ({ type }: { type: "sign-up" | "sign-in" }) => {
  const isSignIn = type === "sign-in";
  const formFields = formFieldsMaker({ type });
  const router = useRouter();

  // ✅ Fix: Use isSignIn correctly in schema selection
  const AuthFormMaker = (isSignIn: boolean) => {
    return (
      z
        .object(
          isSignIn
            ? {
                email: z.string().email("Email is required"),
                password: z
                  .string()
                  .min(3, "Password must be at least 3 characters"),
              }
            : {
                name: z
                  .string()
                  .min(2, "Name is required and must be at least 2 characters"),
                email: z.string().email("Email is required"),
                password: z
                  .string()
                  .min(3, "Password must be at least 3 characters"),
                confirmPassword: z
                  .string()
                  .min(3, "Confirm Password is required"),
              }
        )
        // ✅ Fix: Apply refine only when confirmPassword exists
        .refine((data) => isSignIn || data.password === data.confirmPassword, {
          message: "Passwords do not match",
          path: ["confirmPassword"],
        })
    );
  };

  const formSchema = AuthFormMaker(isSignIn);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isSignIn
      ? { email: "", password: "" }
      : { name: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password, confirmPassword, name } = values;

    try {
      if (!isSignIn) {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        console.log(userCredentials, "creds");

        const result = await signUp({
          uid: userCredentials.user.uid,
          name,
          email,
          password,
          confirmPassword,
        });
        if (!result?.success) {
          toast.error(result?.message);
          return;
        }
        toast.success("Account created successfully , Please sign in.");
        router.push("/sign-in");
      } else {
        const { email, password } = values;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();

        if (!idToken) {
          toast.error("Sign in failed");
          return;
        }

        await signIn({
          email,
          idToken,
        });

        toast.success("Sign in successfully.");
        router.push("/");
      }
    } catch (e: any) {
      console.log(e)
      if (e.code === "auth/email-already-in-use") {
        toast.error("Email already in use.");
      }
      else if (e.code === "auth/invalid-credential") {
        toast.error("Credentials are invalid.");
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <h4 className="my-8 text-center">{isSignIn ? "Sign in" : "Sign up"}</h4>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-[90%] md:max-w-1/2 space-y-6"
        >
          {Object.entries(formFields).map(([key, field]) => (
            <FormField
              key={key}
              control={form.control}
              name={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.label}
            />
          ))}

          <div className="flex justify-center">
            <Button type="submit">Submit</Button>
          </div>
          <div className="flex justify-center items-center text-sm">
            <p className="mr-2">
              {!isSignIn
                ? "Already have an account?"
                : "Don't have an account?"}
            </p>
            <Link
              href={isSignIn ? "/sign-up" : "/sign-in"}
              className="text-blue-500"
            >
              {!isSignIn ? "Sign in" : "Sign Up"}
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
