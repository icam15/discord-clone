"use client";

// ui
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

const InviteModal = () => {
  const { isOpen, type, data } = useModal();

  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const isModalOpen = isOpen && type === "invite";

  const onCopy = () => {};

  return (
    <Dialog open={isModalOpen}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6 ">
          <Label className="text-xs font-bold text-zinc-500 dark:text-secondary/70 ">
            SERVER INVITE LINK
          </Label>
          <div className="mt-2 flex flex-row items-center gap-x-2">
            <div className="w-full bg-zinc-300/50 rounded-sm ">
              <Input className=" border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" />
            </div>
            <Button>{copied ? <Check /> : <Copy />}</Button>
          </div>
          <button
            className="
            mt-4
            text-xs
            text-zinc-500
            font-semibold
            flex 
            items-center
            gap-2
            "
          >
            Generate a new link
            <RefreshCcw className="h-4 w-4" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
