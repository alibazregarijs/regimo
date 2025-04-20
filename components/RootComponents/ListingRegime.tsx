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
import { useRegimeDispatch, useCollectionDispatch } from "@/store/hook";
import { useRegimeSelector, useCollectionSelector } from "@/store/hook";
import { FetchRegimeFromCollection } from "@/store/CollectionSlice";
import { FetchRegimeItems } from "@/store/RegimeSlice";
import { AddToCollection } from "@/store/CollectionSlice";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";

interface ListingRegimeProps {
  regimeId?: string;
  userId: string;
  singleRegime?: boolean;
  imageUrl?: string;
  collectionId?: string;
}

const ListingRegime: React.FC<ListingRegimeProps> = ({
  regimeId,
  userId,
  singleRegime = false,
  imageUrl = "",
  collectionId = "",
}) => {
  const [regimes, setRegimes] = useState<RegimItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useRegimeDispatch();
  const collectionDispatch = useCollectionDispatch();
  const { regimes: regimesCollection, loading: collectionLoading } =
    useCollectionSelector((state) => state.collection);
  const { items: allRegimes, loading } = useRegimeSelector(
    (state) => state.regime
  );

  useEffect(() => {
    if (userId && !collectionId) dispatch(FetchRegimeItems(userId));
    else {
      collectionDispatch(FetchRegimeFromCollection({ userId, collectionId }));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (regimesCollection.length > 0) {
      setRegimes(regimesCollection);
    }
  }, [regimesCollection]);

  const addToCallection = ({
    regimeId,
    userId,
  }: {
    regimeId: string;
    userId: string;
  }) => {
    dispatch(AddToCollection({ regimeId, userId }));
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

  if (loading || collectionLoading) {
    return <Spinner loading={loading || collectionLoading} />;
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
            } border space-y-4 blue-gradient-dark p-4 rounded-[20px] flex flex-col h-full`}
          >
            <div className="w-[100px] h-[100px] relative flex-shrink-0">
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

            <p className="text-sm break-words whitespace-normal flex-grow">
              {singleRegime
                ? regime.regime?.replace(/\*/g, "")
                : `${regime.regime?.slice(0, 100)}...`}
            </p>

            <div className="mt-4 flex-shrink-0">
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
                <div className="flex flex-col space-y-4">
                  <Button className="w-full">See Details</Button>
                  {!collectionId && (
                    <Button
                      variant="outline"
                      className="w-full bg-transparent text-white border-gray-700 hover:bg-gray-800 text-sm"
                      onClick={() =>
                        addToCallection({ regimeId: regime.id!, userId })
                      }
                    >
                      Add To Collection
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListingRegime;