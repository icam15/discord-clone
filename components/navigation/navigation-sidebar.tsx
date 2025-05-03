import React from "react";
import NavigationAction from "./navigation-action";
import { currentProflie } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import NavigationItem from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

const NavigationSidebar = async () => {
  const profile = await currentProflie();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="dark:bg-[#1E1F22] bg-[#E3E5E8] w-full flex flex-col items-center h-full text-primary space-y-4 ">
      <NavigationAction />
      <hr className="bg-zinc-300 dark:bg-zinc-700 border-[2px] w-10 rounded-md mx-auto" />
      <ScrollArea className="flex-1 w-full ">
        {servers.map((server) => (
          <NavigationItem
            key={server.id}
            id={server.id}
            imageUrl={server.imageUrl}
            name={server.name}
          />
        ))}
      </ScrollArea>
      <div className="pb-3 flex flex-col items-center gap-y-4 mt-auto w-full ">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default NavigationSidebar;
