import React from "react";
import Hero from "@/components/RootComponents/Hero";
import Navbar from "@/components/RootComponents/Navbar";
import { getCurrentUser } from "@/lib/actions/auth.action";
const page = async () => {
  const user = await getCurrentUser();
  return (
    <div className="text-light-100">
      <Navbar userId={user?.id || ""} />
      <Hero userId={user?.id || ""} />
    </div>
  );
};

export default page;
