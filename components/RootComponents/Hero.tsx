import Image from "next/image";
import { Button } from "@/components/ui/button";
import ListingRegime from "@/components/RootComponents/ListingRegime";
import { AddModal } from "@/components/RootComponents/AddModal";

const Hero = () => {
  return (
    <div className="flex flex-col">
      <div className="grid mt-10 grid-cols-12 mx-4 gap-4 w-full">
        <div className="md:col-span-6 col-span-12 space-y-4">
          <h3>
            We Provide You the Best Nutrition Regim You Can Ever Have ,We Are
            Here To Help You.
          </h3>
          <span className="">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
            provident.
          </span>
          <div className="mt-4">
            <AddModal>
              <Button>Get Started</Button>
            </AddModal>
          </div>
        </div>
        <div className="md:col-span-6 col-span-12">
          <Image
            src="/hero.png"
            alt="hero"
            className="object-cover"
            width={1000}
            height={1000}
          />
        </div>
      </div>

      <ListingRegime />
    </div>
  );
};

export default Hero;
