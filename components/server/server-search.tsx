"use client";

import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data: {
      icon: React.ReactNode;
      name: string;
      id: string;
    }[];
  }[];
}

const ServerSearch = ({ data }: ServerSearchProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const onClick = ({
    id,
    type,
  }: {
    id: string;
    type: "channel" | "member";
  }) => {
    setOpen(false);

    if (type === "member") {
      return router.push(`/servers/${params?.serverId}/conversations/${id}`);
    }

    if (type === "channel") {
      return router.push(`/servers/${params?.serverId}/channels/${id}`);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-x-2 text-zinc-400 w-full
        hover:bg-zinc-700/10 py-2 px-2 rounded-md dark:hover:bg-zinc-700/50
      "
      >
        <Search className="h-4 w-4" />
        <p className="text-sm font-semibold">Search</p>
        <kbd
          className="pointer-events-none inline-flex items-center ml-auto gap-1 
          px-1.5 select-none rounded border bg-muted 
        "
        >
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members"></CommandInput>
        <CommandEmpty>No result found</CommandEmpty>
        {data.map(({ label, data, type }) => {
          if (!data?.length) return null;

          return (
            <CommandGroup key={label} heading={label}>
              {data?.map(({ icon, id, name }) => {
                return (
                  <CommandItem key={id} onSelect={() => onClick({ id, type })}>
                    {icon}
                    <span>{name}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          );
        })}
      </CommandDialog>
    </>
  );
};

export default ServerSearch;
