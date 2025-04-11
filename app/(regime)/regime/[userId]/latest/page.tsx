import ListingRegime from "@/components/RootComponents/ListingRegime";
import axios from "axios";
import Image from "next/image";

interface PageProps {
  params: Promise<{ userId: string }>;
  searchParams: Promise<{ img?: string }>;
}

const page = async (props: PageProps) => {
  const { params } = props;
  const { userId } = await params;
  const { img: imageUrl } = await props.searchParams;

  const regime = await axios.get(
    `http://localhost:3000/api/ai/regime/${userId}/latest`
  );
  // const pureRegimeText = regime.data.replace(/\*/g, "");

  return <div className="flex flex-col mt-10 space-y-6">
    <ListingRegime regimes={regime.data} userId={userId} singleRegime={true} imageUrl={imageUrl} />
  </div>;
};

export default page;
