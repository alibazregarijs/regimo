import ListingRegime from "@/components/RootComponents/ListingRegime";

interface PageProps {
  params: Promise<{ regimeId: string }>;
  searchParams: Promise<{ img?: string; userId: string }>;
}

const page = async (props: PageProps) => {
  const { params } = props;
  const { regimeId } = await params;
  const { img: imageUrl, userId } = await props.searchParams;

  return (
    <div className="flex flex-col mt-10 space-y-6">
      <ListingRegime
        regimeId={regimeId}
        userId={userId}
        singleRegime={true}
        imageUrl={imageUrl}
      />
    </div>
  );
};

export default page;
