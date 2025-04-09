"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Notification } from "iconsax-react";
import axios from "axios";
import { getCurrentMealIndex, getHours } from "@/lib/utils";

const Navbar = ({ userId }: { userId: string }) => {
  const [isNotification, setIsNotification] = useState(false);
  const [mealTimes, setMealTimes] = useState<string>("");
  const [meal, setMeal] = useState<string>("");

  useEffect(() => {
    const fetchMealTimes = async () => {
      try {
        const res = await axios.get(`/api/ai/regime/meal-time/${userId}`);
        setMealTimes(res.data); // Assuming this returns a string containing meal times
      } catch (err) {
        console.error("Failed to fetch meal times:", err);
      }
    };

    if (userId) {
      fetchMealTimes();
    }
  }, [userId]);

  // If mealTimes has data, convert it
  useEffect(() => {
    if (mealTimes) {
      const valuesArray = Object.values(mealTimes);
      const indexOfmeal = getCurrentMealIndex(valuesArray);
      console.log(valuesArray, "times");
      console.log(indexOfmeal);
      indexOfmeal === -1 ? setIsNotification(false) : setIsNotification(true);

      const fetchMeal = async () => {
        try {
          const res = await axios.get(
            `/api/ai/regime/meal/${indexOfmeal + 1}/${userId}`
          );
          setMeal(res.data); // Assuming this returns a string containing meal times
        } catch (e) {
          console.log(e);
        }
      };
      fetchMeal();
    }
  }, [mealTimes]);

  console.log(meal,"meal")

  return (
    <div className="flex justify-between items-center">
      <Image src="/logo.png" alt="logo" width={100} height={100} />
      <div className="relative cursor-pointer">
        <Notification size="32" color="#fff" />
        {isNotification && (
          <div className="absolute top-0 right-0 rounded-full bg-red-500 px-1.5 py-1.5"></div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
