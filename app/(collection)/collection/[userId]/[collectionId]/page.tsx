import React from "react";

interface PageProps {
  params: Promise<{ collectionId: string; userId: string }>;
}

const page = async (props: PageProps) => {
  const { params } = props;
  const { collectionId, userId } = await params;

  console.log(collectionId, "collectionId");
  console.log(userId, "userid");
  
  return <div>collection</div>;
};

export default page;
