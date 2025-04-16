import React from "react";

interface PageProps {
  params: Promise<{ regimeId: string; userId: string }>;
}

const page = async (props: PageProps) => {
  const { params } = props;
  const { regimeId, userId } = await params;

  return <div>collection</div>;
};

export default page;
