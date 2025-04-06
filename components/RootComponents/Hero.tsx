import Image from "next/image";
import { Button } from "../ui/button";
import ListingRegime from "./ListingRegime";

const Hero = () => {
  return (
    <div className="flex flex-col">
      <div className="grid mt-10 grid-cols-12 mx-4 gap-4 w-full">
        <div className="col-span-6 space-y-4">
          <h3>
            We Provide You the Best Nutrition Regim You Can Ever Have ,We Are
            Here To Help You.
          </h3>
          <span className="">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
            provident.
          </span>
          <div className="mt-4">
            <Button>Get Started</Button>
          </div>
        </div>
        <div className="col-span-6">
          <Image
            src="/hero.png"
            alt="hero"
            className="object-cover"
            width={1000}
            height={1000}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 mt-20 mx-4 gap-4 w-full">
        <ListingRegime />
      </div>
    </div>
  );
};

export default Hero;
