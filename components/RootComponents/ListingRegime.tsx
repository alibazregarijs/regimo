"use client";
import React from "react";
import { regimes } from "@/constants";
import Image from "next/image";
import { Button } from "../ui/button";
import { randomImage } from "@/lib/utils";
import { Calendar2, Star1 } from "iconsax-react";

const ListingRegime = () => {
  return (
  
          <div className="grid grid-cols-12 mt-20 gap-4 w-full">
      {regimes.map((regime, index) => (
        <div key={regime.id} className="md:col-span-4 border col-span-12 space-y-4 blue-gradient-dark p-4 rounded-[20px]">
          <div className="w-[100px] h-[100px] relative">
            <Image
              src={randomImage(regime.id)}
              alt="nutrition-logo1"
              className="object-contain"
              width={100}
              height={100}
            />
          </div>
          <h4>{regime.title}</h4>
          <div className="flex space-x-4">
            <Calendar2 size="20" variant="Bold" color="#fff" />
            <span>{regime.createDate}</span>
            <Star1 size="20" color="#fff" variant={regime.liked ? "Bold" : "Outline"} />
            <span>{regime.averageRating}/10</span>
          </div>
          <span>
            {regime.description}
          </span>
          <div className="mt-4">
            <Button>See the Details</Button>
          </div>
        </div>
      ))}
      </div>
    
  );
};

export default ListingRegime;
