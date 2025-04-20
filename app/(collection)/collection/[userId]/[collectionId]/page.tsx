import React from "react";
import ListingRegime from "@/components/RootComponents/ListingRegime";

interface PageProps {
  params: Promise<{ collectionId: string; userId: string }>;
  searchParams: Promise<{ username: string }>;
}

const page = async (props: PageProps) => {
  const { params } = props;
  const { collectionId, userId } = await params;
  const { username } = await props.searchParams;

  return (
    <div>
      <h3 className="text-center capitalize">
        {username} <span className="text-myPink-100">Collection</span>
      </h3>
      <ListingRegime userId={userId} collectionId={collectionId} />
    </div>
  );
};

export default page;
