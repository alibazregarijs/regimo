import React from "react";
import Image from "next/image";
import { Notification } from "iconsax-react";

const Navbar = () => {
  const isNotification = true;
  return (
    <div className="flex justify-between items-center">
      <Image src="/logo.png" alt="logo" width={100} height={100} />
      <div className="relative cursor-pointer">
        <Notification size="32" color="#fff" />
        {isNotification && (
          <div className="absolute top-0 right-0 rounded-full bg-red-500 px-1.5 py-1.5"></div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
