"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormField from "./FormField";
import { Form } from "@/components/ui/form";
import Link from "next/link";

const AuthForm = ({ type }: { type: "sign-up" | "sign-in" }) => {
  const isSignIn = type === "sign-in";

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form Submitted:", values);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <h4 className="my-8 text-center">{isSignIn ? "Sign in" : "Sign up"}</h4>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-[90%] md:max-w-1/2 space-y-6"
        >
          {!isSignIn && (
            <FormField
              control={form.control}
              name="name"
              label="Name"
              placeholder="Your Name"
            />
          )}
          <FormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Your Email"
          />
          <FormField
            control={form.control}
            name="password"
            label="Password"
            type="password"
            placeholder="Your Password"
          />
          {!isSignIn && (
            <FormField
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password"
            />
          )}
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
