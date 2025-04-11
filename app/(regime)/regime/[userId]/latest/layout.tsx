import React from "react";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import Navbar from "@/components/RootComponents/Navbar";
import { getCurrentUser } from "@/lib/actions/auth.action";

const RegimLayout = async ({ children }: { children: React.ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col mx-4 mr-4 md:mx-8 lg:mx-16 xl:mx-36">
      <Navbar userId={user?.id || ""} />
      {children}
    </div>
  );
};

export default RegimLayout;
