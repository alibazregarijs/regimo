"use client";
import Image from "next/image";
import ListingRegime from "@/components/RootComponents/ListingRegime";
import { AddModal } from "@/components/RootComponents/AddModal";
import { modalFields } from "@/constants";
import { useRegimeDispatch } from "@/store/hook";
import { AddRegimeItem } from "@/store/RegimeSlice";
import { RegimItem } from "@/types/root";
import { useEffect, useState } from "react";
import { useRegimeSelector } from "@/store/hook";
import { FetchRegimeItems } from "@/store/RegimeSlice";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";

const myModalFields = {
  title: "Add New Regime",
  content: "Fill the form below to add a new regime",
  buttonText: "Save",
  fields: modalFields,
};

const Hero = ({ userId }: { userId: string }) => {
  const dispatch = useRegimeDispatch();

  const { items, loading, error } = useRegimeSelector((state) => state.regime);

  useEffect(() => {
    dispatch(FetchRegimeItems(userId));
  }, [userId, dispatch]);

  const handleSubmit = async (formData: Record<string, string>) => {
    // Convert form data to match RegimItem type
    const submissionData: RegimItem = {
      userId: userId.toString(), // Make sure userId is defined
      gender: formData.gender as "male" | "female",
      type: "loss",
      weight: formData.weight,
      height: formData.height,
      age: Number(formData.age), // Convert string to number
      activity_level: formData.activity_level as "low" | "medium" | "high",
      waist_circumference: Number(formData.waist_circumference),
      bicep_circumference: Number(formData.bicep_circumference),
    };

    const resultAction = await dispatch(AddRegimeItem(submissionData));
    if (resultAction.meta?.requestStatus !== "fulfilled") {
      toast.error("Failed to add regime item. Please try again.");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="grid mt-10 grid-cols-12 mx-4 gap-4 w-full">
        <div className="md:col-span-6 col-span-12 space-y-4">
          <h3>
            We Provide You the Best Nutrition Regim You Can Ever Have ,We Are
            Here To Help You.
          </h3>
          <span className="">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
            provident.
          </span>
          <div className="mt-4">
            <AddModal post={myModalFields} onSubmit={handleSubmit}>
              <AddModal.Title />
              <AddModal.Content />
              <AddModal.Body />
              <AddModal.Footer />
            </AddModal>
          </div>
        </div>
        <div className="md:col-span-6 col-span-12">
          <Image
            src="/hero.png"
            alt="hero"
            className="object-cover"
            width={1000}
            height={1000}
          />
        </div>
      </div>

      <div>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <ListingRegime regimes={items} userId={userId} />
        )}
      </div>
    </div>
  );
};

export default Hero;
