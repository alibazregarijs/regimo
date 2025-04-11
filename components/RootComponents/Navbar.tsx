"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Notification } from "iconsax-react";
import axios from "axios";
import { getCurrentMealIndex, getHours } from "@/lib/utils";
import { AddModal } from "@/components/RootComponents/AddModal";

const Navbar = ({ userId }: { userId: string }) => {
  const [isNotification, setIsNotification] = useState(false);
  const [mealTimes, setMealTimes] = useState<string>("");
  const [indexOfMeal, setIndexOfMeal] = useState<number[]>([]);
  const mealTimeRef = useRef(0);
  const [meal, setMeal] = useState({
    title: "Eat This Meal",
    content: "Pay Attention To Eat Due Time",
    body: "Loading ...",
  });
  const [isNotifIconClicked, setIsNotifIconClicked] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchMealTimes = async () => {
      try {
        const res = await axios.get(`/api/ai/regime/meal-time/${userId}`);
        setMealTimes(res.data);
      } catch (err) {
        console.error("Failed to fetch meal times:", err);
      }
    };

    if (userId) {
      // Initial fetch
      fetchMealTimes();

      // Set interval for every 5 minutes
      intervalId = setInterval(() => {
        fetchMealTimes();
      }, 5 * 60 * 1000); // 5 minutes in milliseconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId); // Clean up on unmount or userId change
      }
    };
  }, [userId]);

  useEffect(() => {
    if (mealTimes) {
      const valuesArray = Object.values(mealTimes);
      const indexOfmealConverted = getCurrentMealIndex(valuesArray);
      const localIndexMeal = localStorage.getItem("mealIndex")

      if (indexOfmealConverted === -1 || localIndexMeal === indexOfmealConverted.toString()) {
        localStorage.setItem("mealIndex", indexOfmealConverted.toString());
        setIsNotification(false)
      }
      else{
        localStorage.setItem("mealIndex", indexOfmealConverted.toString());
        setIsNotification(true)
      }

      mealTimeRef.current = indexOfmealConverted
      
      const fetchMeal = async () => {
        if (mealTimeRef.current === -1) {
          setMeal((meal) => ({ ...meal, body: "No Meal In This Time" }));
        } else {
          try {
            const res = await axios.get(
              `/api/ai/regime/meal/${indexOfmealConverted + 1}/${userId}`
            );
            const convertedMeal = Object.values(res.data);
            let mealString = convertedMeal[0] as string;
            mealString = mealString.replace(/\*/g, "");
            setMeal((meal) => ({ ...meal, body: mealString as string }));
          } catch (e) {
            console.log(e);
          }
        }
      };
      fetchMeal();
    }
  }, [mealTimes, isNotifIconClicked]); // Add isNotifClicked to dependencies

  return (
    <div className="flex justify-between items-center">
      <Image src="/logo.png" alt="logo" width={100} height={100} />
      <div
        className="relative cursor-pointer"
        onClick={() => setIsNotifIconClicked((prev) => !prev)}
      >
        <Notification size="32" color="#fff" />
        {/* Show notification dot only when isNotification is true AND modal is not open */}
        {isNotification && !isNotifIconClicked && (
          <div className="absolute top-0 right-0 rounded-full bg-red-500 px-1.5 py-1.5"></div>
        )}
      </div>
      {isNotifIconClicked && (
        <AddModal
          post={meal}
          setOpenModal={setIsNotifIconClicked}
          isOpenModal={isNotifIconClicked}
        >
          <AddModal.Title />
          <AddModal.Content />
          <AddModal.Body />
        </AddModal>
      )}
    </div>
  );
};

export default Navbar;
