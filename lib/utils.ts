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

export function formatDate(isoString: string) {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" }); // e.g., "April"
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

const now = new Date();
export const getHours = now.toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

type MealTimesInput = {
  mealsTime: string;
};

type TimeRange = {
  [start: string]: string;
};


export function getCurrentMealIndex(mealsArray: string[]): number {
  // Get the current time and convert it to minutes since midnight
  const currentTime = new Date();
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  // Clean and prepare the string
  const cleanedString = mealsArray[0].replace(/"\n/g, "").replace(/"/g, "");
  const timeRanges = cleanedString.split(", ");

  // Helper: Convert time string (e.g. "7:00 AM") to minutes since midnight
  const timeToMinutes = (time: string): number => {
    const [timePart, period] = time.trim().split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);

    if (period.toUpperCase() === "PM" && hours !== 12) hours += 12;
    if (period.toUpperCase() === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  // Loop through meal times and check if now is in range
  for (let i = 0; i < timeRanges.length; i++) {
    const [start, end] = timeRanges[i].split(" - ");
    const startMinutes = timeToMinutes(start);
    const endMinutes = timeToMinutes(end);

    if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
      return i; // ✅ Return the index of the current meal time
    }
  }

  return -1; // ❌ Not meal time right now
}
