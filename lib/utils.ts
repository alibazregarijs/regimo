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

export const randomImage = () => {
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

  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

export function formatDate(isoString:string) {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" }); // e.g., "April"
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}
