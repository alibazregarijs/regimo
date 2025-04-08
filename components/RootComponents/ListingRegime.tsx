"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { randomImage } from "@/lib/utils";
import { Calendar2, Star1 } from "iconsax-react";
import { RegimItem } from "@/types/root";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

const ListingRegime = ({
  regimes,
  userId,
}: {
  regimes: RegimItem[];
  userId: string;
}) => {
  return (
    <div className="grid grid-cols-12 mt-20 gap-4 w-full">
      {regimes.map((regime, index) => (
        <div
          key={regime.createdAt}
          className="md:col-span-4 border col-span-12 space-y-4 blue-gradient-dark p-4 rounded-[20px]"
        >
          <div className="w-[100px] h-[100px] relative">
            <Link href={`/regime/${userId}/${regime.id}`} legacyBehavior>
              <a>
                <Image
                  src={randomImage()}
                  alt="nutrition-logo1"
                  className="object-contain"
                  width={100}
                  height={100}
                />
              </a>
            </Link>
          </div>
          <h4>{regime.type.charAt(0).toUpperCase() + regime.type.slice(1)}</h4>

          <div className="flex space-x-4">
            <Calendar2 size="20" variant="Bold" color="#fff" />
            <span>{formatDate(regime.createdAt || "")}</span>
            <Star1
              size="20"
              color="#fff"
              variant={regime.userLiked !== 0 ? "Bold" : "Outline"}
            />
            <span>{regime.averageRating}/10</span>
          </div>
          <span>{regime.regime?.slice(0, 100) + " ..."}</span>
          <div className="mt-4">
            <Button>See the Details</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListingRegime;
