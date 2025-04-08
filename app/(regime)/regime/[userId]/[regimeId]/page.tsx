import React from "react";

interface PageProps {
  params: Promise<{ userId: string; regimeId: string }>;
}

const page = async (props: PageProps) => {
  const { params } = props;
  const { userId, regimeId } = await params;
  console.log(userId, regimeId);
  return <div>salam</div>;
};

export default page;
