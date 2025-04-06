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

export const randomImage = (index: number) => {
  const images = [
    "/regime-food-vector1-removebg-preview.png",
    "/regime-food-vector2-removebg-preview.png",
    "/regime-food-vector3-removebg-preview.png",
    "/regime-food-vector4-removebg-preview.png",
    "/regime-food-vector5-removebg-preview.png",
    "/regime-food-vector6-removebg-preview.png",
    "/regime-food-vector7-removebg-preview.png",
    "/regime-food-vector8-removebg-preview.png",
  ];

  if (index > images.length) {
    return images[Math.floor(Math.random() * 9) + 1];
  }

  const randomIndex = Math.floor(1 * index);

  return images[randomIndex];
};
