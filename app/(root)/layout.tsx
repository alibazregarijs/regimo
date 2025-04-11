import React from "react";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="flex flex-col mx-4 mr-4 md:mx-8 lg:mx-16 xl:mx-36">
      {children}
    </div>
  );
};

export default HomeLayout;
