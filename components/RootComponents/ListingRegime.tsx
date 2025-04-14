"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { randomImage, formatDate } from "@/lib/utils";
import { Calendar2, Star1 } from "iconsax-react";
import { RegimItem } from "@/types/root";
import { EditFields } from "@/constants";
import Link from "next/link";
import { AddModal } from "./AddModal";
import { EditRegimeItem } from "@/store/RegimeSlice";
import { useRegimeDispatch } from "@/store/hook";
import { useRegimeSelector } from "@/store/hook";
import { FetchRegimeItems } from "@/store/RegimeSlice";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";

interface ListingRegimeProps {
  regimeId?: string;
  userId: string;
  singleRegime?: boolean;
  imageUrl?: string;
}

const ListingRegime: React.FC<ListingRegimeProps> = ({
  regimeId,
  userId,
  singleRegime = false,
  imageUrl = "",
}) => {
  const [regimes, setRegimes] = useState<RegimItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useRegimeDispatch();
  const { items: allRegimes, loading } = useRegimeSelector(
    (state) => state.regime
  );

  useEffect(() => {
    dispatch(FetchRegimeItems(userId));
  }, [userId, dispatch]);

  const addToCallection = ({
    regimeId,
    userId,
  }: {
    regimeId: string;
    userId: string;
  }) => {
    console.log(regimeId, "regimeid");
    console.log(userId, "userid");
  };

  useEffect(() => {
    if (singleRegime) {
      const regime = allRegimes.find((item) => item.id === regimeId);
      if (regime) {
        setRegimes([regime]);
      }
    } else {
      setRegimes(allRegimes);
    }
  }, [allRegimes, singleRegime]);

  const post = {
    title: "Make Change To Your Regime",
    content: "Fill the form below to Edit regime",
    buttonText: "Save",
    fields: EditFields,
  };

  const images = React.useMemo(
    () =>
      regimes.map(() => (singleRegime && imageUrl ? imageUrl : randomImage())),
    [regimes, singleRegime, imageUrl]
  );

  const handleEdit = async (formData: Record<string, string>) => {
    if (!regimes[0]?.id) return;

    try {
      const res = await dispatch(
        EditRegimeItem({
          regime: formData.edit,
          userId,
          regimeId: regimes[0].id,
        })
      ).unwrap();

      if (res.success && singleRegime) {
        setIsOpen(false);
        dispatch(FetchRegimeItems(userId));
      }
    } catch (error) {
      toast.error("Failed to edit regime");
      console.error("Failed to edit regime:", error);
    }
  };

  if (loading) {
    return <Spinner loading={loading} />;
  }
  return (
    <>
      {singleRegime && <h2 className="text-center">We've Got You Covered</h2>}
      <div className="grid grid-cols-12 mt-20 gap-4 w-full">
        {regimes.map((regime, index) => (
          <div
            key={`${regime.id}-${index}`}
            className={`${
              singleRegime ? "col-span-12" : "md:col-span-4 col-span-12"
            } border space-y-4 blue-gradient-dark p-4 rounded-[20px]`}
          >
            <div className="w-[100px] h-[100px] relative">
              <Link
                href={{
                  pathname: `/regime/${regime.id}`,
                  query: { img: images[index], userId },
                }}
                passHref
              >
                <Image
                  src={images[index]}
                  alt={`${regime.type} regime`}
                  className="object-contain"
                  width={100}
                  height={100}
                  priority={index === 0}
                />
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

            <p className="text-sm break-words whitespace-normal">
              {singleRegime
                ? regime.regime?.replace(/\*/g, "")
                : `${regime.regime?.slice(0, 100)}...`}
            </p>

            <div className="mt-4">
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
                <Link
                  href={{
                    pathname: `/regime/${regime.id}`,
                    query: { img: images[index], userId },
                  }}
                  passHref
                >
                  <div className="flex flex-col space-y-4">
                    <Button>See Details</Button>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent text-white border-gray-700 hover:bg-gray-800 text-sm"
                      onClick={() =>
                        addToCallection({ regimeId: regime.id!, userId })
                      }
                    >
                      Add To Collection
                    </Button>
                  </div>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListingRegime;
