import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formFieldsMaker = ({ type }: { type: string }) => {
  if (type === "sign-up") {
    return {
      name: {
        name: "name",
        type: "text",
        label: "Your Name",
      },
      email: {
        name: "email",
        type: "email",
        label: "Your Email",
      },
      password: {
        name: "password",
        type: "password",
        label: "Your Password",
      },
      confirmPassword: {
        name: "confirmPassword",
        type: "password",
        label: "Confirm Password",
      },
    };
  } else {
    return {
      email: {
        name: "email",
        type: "email",
        label: "Your Email",
      },
      password: {
        name: "password",
        type: "password",
        label: "Your Password",
      },
    };
  }
};
