"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import ActionTooltip from "../action-tooltip";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip label={name} align="center" side="right">
      <button
        onClick={() => onClick()}
        className="group relative flex items-center justify-center place-self-center mb-4"
      >
        <div
          className={cn(
            "absolute left-0 rounded-r-md w-[4px] h-full transition-all bg-primary",
            params?.serversId === id ? "h-[80%]" : "h-[20%]",
            params?.serversId !== id && "group-hover:h-[40%]"
          )}
        />
        <div
          className={cn(
            "relative h-[48] w-[48] rounded-[24px] overflow-hidden group-hover:rounded-[16px] transition-all mx-3",
            params?.serversId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image src={imageUrl} fill className="object-cover" alt="channel" />
        </div>
      </button>
    </ActionTooltip>
  );
};

export default NavigationItem;
