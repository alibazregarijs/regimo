import axios from "axios";
import Image from "next/image";
import { randomImage } from "@/lib/utils";

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
  const pureRegimeText = regime.data.replace(/\*/g, "");

  return (
    <div className="flex flex-col mt-10 space-y-6">
      <div className="flex justify-center items-center">
        <div className="w-[100px] h-[100px] relative">
          <a>
            <Image
              src={imageUrl || ""}
              alt="nutrition-logo1"
              className="object-contain"
              width={100}
              height={100}
            />
          </a>
        </div>
      </div>
      <div>
        <h2 className="text-center">We've Got You Covered</h2>
      </div>
      <span className="leading-9 text-center">{pureRegimeText}</span>
    </div>
  );
};

export default page;
