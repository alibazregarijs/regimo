"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { randomImage, formatDate } from "@/lib/utils";
import { Calendar2, Star1 } from "iconsax-react";
import { RegimItem } from "@/types/root";
import { EditFields, modalFields } from "@/constants";
import Link from "next/link";
import { AddModal } from "./AddModal";

const ListingRegime = ({
  regimes,
  userId,
  singleRegime = false,
  imageUrl = "",
}: {
  regimes: RegimItem[];
  userId: string;
  singleRegime?: boolean;
  imageUrl?: string;
}) => {
  const post = {
    title: "Make Change To Your Regime",
    content: "Fill the form below to Edit regime",
    buttonText: "Save",
    fields: EditFields,
  };

  // Generate all images upfront to ensure consistency between server and client
  const [isEditedButtonClicked, setIsEditedButtonClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const images = React.useMemo(
    () =>
      regimes.map(() => (singleRegime && imageUrl ? imageUrl : randomImage())),
    [regimes, singleRegime, imageUrl]
  );

  const handleEdit = async (formData: Record<string, string>) => {
    console.log(formData, "formdata");
    setIsOpen(false);
  };

  return (
    <>
      {singleRegime && <h2 className="text-center">We've Got You Covered</h2>}
      <div className="grid grid-cols-12 mt-20 gap-4 w-full">
        {regimes.map((regime, index) => (
          <div
            key={`${regime.type}-${regime.createdAt}-${index}`}
            className={`${
              singleRegime ? "col-span-12" : "md:col-span-4 col-span-12"
            } border space-y-4 blue-gradient-dark p-4 rounded-[20px]`}
          >
            <div className="w-[100px] h-[100px] relative">
              <Link
                href={{
                  pathname: `/regime/${userId}/latest`,
                  query: { img: images[index] },
                }}
                legacyBehavior
              >
                <a>
                  <Image
                    src={images[index]}
                    alt={`${regime.type} regime`}
                    className="object-contain"
                    width={100}
                    height={100}
                    priority={index === 0} // Prioritize first image
                  />
                </a>
              </Link>
            </div>

            <h4 className="capitalize">{regime.type}</h4>

            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar2 size="20" variant="Bold" color="#fff" />
                <span>{formatDate(regime.createdAt || "")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star1
                  size="20"
                  color="#fff"
                  variant={regime.userLiked ? "Bold" : "Outline"}
                />
                <span>{regime.averageRating}/10</span>
              </div>
            </div>

            <p className="text-sm">
              {singleRegime
                ? regime.regime?.replace(/\*/g, "")
                : `${regime.regime?.slice(0, 100)}...`}
            </p>

            <div className="mt-4">
              <Link
                href={{
                  pathname: `/regime/${userId}/latest`,
                  query: { img: images[index] },
                }}
                legacyBehavior
              >
                {singleRegime ? (
                  <AddModal
                    post={post}
                    onSubmit={handleEdit}
                    setOpenModal={setIsOpen}
                    isOpenModal={isOpen}
                  >
                    <AddModal.Title />
                    <AddModal.Body />
                    <AddModal.Footer />
                  </AddModal>
                ) : (
                  <Button className="w-full">See Details</Button>
                )}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListingRegime;
