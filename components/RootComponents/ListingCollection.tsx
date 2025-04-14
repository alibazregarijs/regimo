"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Plus, Star, User, Eye } from "lucide-react";
import Image from "next/image";
import { randomImage , formatDate } from "@/lib/utils";


// Using the provided schema
export type CollectionItem = {
  id: string;
  user: {
    id: string;
    name: string;
  };
  regime: {
    id: string;
    regime: string;
    type: "loss" | "gain";
    userId: string;
    createdAt: string;
  };
  seen: number;
  createdAt: string;
  updatedAt: string;
  liked: {
    userId: string;
    like: number;
  };
};

// Sample data based on the schema
const sampleData: CollectionItem[] = [
  {
    id: "1",
    user: {
      id: "user1",
      name: "John Doe",
    },
    regime: {
      id: "regime1",
      regime: "I sleep 5 hours in a day please make my regime better",
      type: "loss",
      userId: "user1",
      createdAt: "2025-04-10T10:00:00Z",
    },
    seen: 42,
    createdAt: "2025-04-10T10:00:00Z",
    updatedAt: "2025-04-10T10:00:00Z",
    liked: {
      userId: "user1",
      like: 7,
    },
  },
  {
    id: "2",
    user: {
      id: "user2",
      name: "Jane Smith",
    },
    regime: {
      id: "regime2",
      regime: "Need a high protein diet plan for muscle building",
      type: "gain",
      userId: "user2",
      createdAt: "2025-04-10T09:00:00Z",
    },
    seen: 28,
    createdAt: "2025-04-10T09:00:00Z",
    updatedAt: "2025-04-10T09:00:00Z",
    liked: {
      userId: "user2",
      like: 9,
    },
  },
  {
    id: "3",
    user: {
      id: "user3",
      name: "Alex Johnson",
    },
    regime: {
      id: "regime3",
      regime: "Looking for a cardio routine to improve stamina",
      type: "loss",
      userId: "user3",
      createdAt: "2025-04-11T14:00:00Z",
    },
    seen: 35,
    createdAt: "2025-04-11T14:00:00Z",
    updatedAt: "2025-04-11T14:00:00Z",
    liked: {
      userId: "user3",
      like: 5,
    },
  },
  {
    id: "4",
    user: {
      id: "user4",
      name: "Sam Wilson",
    },
    regime: {
      id: "regime4",
      regime: "Need a balanced diet for weight maintenance",
      type: "gain",
      userId: "user4",
      createdAt: "2025-04-12T11:00:00Z",
    },
    seen: 19,
    createdAt: "2025-04-12T11:00:00Z",
    updatedAt: "2025-04-12T11:00:00Z",
    liked: {
      userId: "user4",
      like: 8,
    },
  },
];

// Collection item illustrations
const collectionIcons = {
  loss: [
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
  ],
  gain: [
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
  ],
};

export default function CollectionListing() {
  const [collections, setCollections] = useState<CollectionItem[]>(sampleData);

  // Format date to display only the date part


  return (
    <>
    <div className="mt-28"><hr /></div>
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
          <Tabs defaultValue="all" className="mb-8">
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
                {collections.map((item, index) => (
                  <Card
                    key={item.id}
                    className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl overflow-hidden hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300"
                  >
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
                        <span className="text-xs font-medium">
                          {item.liked.like}/10
                        </span>
                      </div>
                      <div className="h-[140px] bg-gradient-to-r from-purple-900/30 to-pink-900/30 flex items-center justify-center">
                        <Image
                          src={
                            randomImage()
                          }
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
                      <Button
                        variant="outline"
                        className="w-full bg-transparent text-white border-gray-700 hover:bg-gray-800 text-sm"
                      >
                        See Details
                      </Button>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-sm">
                        Remove
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Other tab contents would be similar but filtered */}
            <TabsContent value="loss" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections
                  .filter((item) => item.regime.type === "loss")
                  .map((item, index) => (
                    /* Same card component as above, but only for loss items */
                    <Card
                      key={item.id}
                      className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl overflow-hidden hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300"
                    >
                      {/* Card content same as above */}
                      <div className="relative">
                        <div className="absolute top-3 left-3 z-10">
                          <Badge className="bg-pink-600 hover:bg-pink-700 text-white border-0 px-3 py-1">
                            LOSS
                          </Badge>
                        </div>
                        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-black/60 rounded-full px-2 py-1">
                          <Star size={14} className="text-yellow-400" />
                          <span className="text-xs font-medium">
                            {item.liked.like}/10
                          </span>
                        </div>
                        <div className="h-[140px] bg-gradient-to-r from-purple-900/30 to-pink-900/30 flex items-center justify-center">
                          <Image
                            src={
                              collectionIcons.loss[
                                index % collectionIcons.loss.length
                              ] || "/placeholder.svg"
                            }
                            alt="Loss collection icon"
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
                        <Button
                          variant="outline"
                          className="w-full bg-transparent text-white border-gray-700 hover:bg-gray-800 text-sm"
                        >
                          See Details
                        </Button>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-sm">
                          Remove
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
