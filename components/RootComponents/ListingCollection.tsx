"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Star, User, Eye } from "lucide-react";
import Image from "next/image";
import { randomImage, formatDate } from "@/lib/utils";
import { useCollectionDispatch } from "@/store/hook";
import { useCollectionSelector } from "@/store/hook";
import Spinner from "@/components/Spinner";
import { FetchCollectionItems } from "@/store/CollectionSlice";
import Link from "next/link";

export default function CollectionListing({
  collection,
  userId,
}: {
  collection: boolean;
  userId: string;
}) {
  const dispatch = useCollectionDispatch();
  const { items: collections, loading } = useCollectionSelector(
    (state) => state.collection
  );
  const [filteredCollections, setFilteredCollections] = useState(collections);

  useEffect(() => {
    dispatch(FetchCollectionItems());
  }, []);

  useEffect(() => {
    setFilteredCollections(collections);
  }, [collections]);

  const filterCollections = (value: string) => {
    let filtered = [...collections];

    switch (value) {
      case "loss":
        filtered = filtered.filter((item) => item.regime.type === "loss");
        break;
      case "gain":
        filtered = filtered.filter((item) => item.regime.type === "gain");
        break;
      case "recent":
        filtered = [...filtered].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        // "all" - no filtering needed
        break;
    }

    setFilteredCollections(filtered);
  };

  if (loading || collections.length === 0) return <Spinner loading={loading} />;

  return (
    <>
      <div className="mt-28">
        <hr />
      </div>
      <div className="min-h-screen mt-10 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-bold mb-2">Others Collections</h1>
              <p className="text-gray-400">
                You Might Like These Regimes and Workout Plans.
              </p>
            </div>
          </div>

          {/* Tabs for filtering */}
          <Tabs
            defaultValue="all"
            className="mb-8"
            onValueChange={(value) => filterCollections(value)}
          >
            <TabsList className="bg-gray-900 border border-gray-800">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-purple-900"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="loss"
                className="data-[state=active]:bg-purple-900"
              >
                Loss
              </TabsTrigger>
              <TabsTrigger
                value="gain"
                className="data-[state=active]:bg-purple-900"
              >
                Gain
              </TabsTrigger>
              <TabsTrigger
                value="recent"
                className="data-[state=active]:bg-purple-900"
              >
                Recent
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCollections.map((item) => (
                  <CollectionCard
                    key={item.id}
                    item={item}
                    userId={userId}
                    collection={collection}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="loss" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCollections.map((item) => (
                  <CollectionCard
                    key={item.id}
                    item={item}
                    userId={userId}
                    collection={collection}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="gain" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCollections.map((item) => (
                  <CollectionCard
                    key={item.id}
                    item={item}
                    userId={userId}
                    collection={collection}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recent" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCollections.map((item) => (
                  <CollectionCard
                    key={item.id}
                    item={item}
                    userId={userId}
                    collection={collection}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

// Extracted card component for better readability and reusability
function CollectionCard({
  item,
  userId,
  collection,
}: {
  item: any;
  userId: string;
  collection: boolean;
}) {
  return (
    <Card className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl overflow-hidden hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300">
      <div className="relative">
        <div className="absolute top-3 left-3 z-10">
          <Badge
            className={`${
              item.regime.type === "loss"
                ? "bg-pink-600 hover:bg-pink-700"
                : "bg-green-600 hover:bg-green-700"
            } text-white border-0 px-3 py-1`}
          >
            {item.regime.type.toUpperCase()}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-black/60 rounded-full px-2 py-1">
          <Star size={14} className="text-yellow-400" />
          <span className="text-xs font-medium">{item.liked.like}/10</span>
        </div>
        <div className="h-[140px] bg-gradient-to-r from-purple-900/30 to-pink-900/30 flex items-center justify-center">
          <Image
            src={randomImage()}
            alt={`${item.regime.type} collection icon`}
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <Calendar size={12} />
            <span>{formatDate(item.regime.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Eye size={12} />
            <span>{item.seen}</span>
          </div>
        </div>

        <p className="text-white font-medium line-clamp-2 min-h-[48px] mb-3">
          {item.regime.regime}
        </p>

        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <User size={12} />
          <span>{item.user.name}</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-2">
        <Link href={`/collection/${userId}/${item.id}`}>
          <Button
            variant="outline"
            className="w-full bg-transparent text-white border-gray-700 hover:bg-gray-800 text-sm"
          >
            See Details
          </Button>
        </Link>
        {collection && (
          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-sm">
            Remove
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
