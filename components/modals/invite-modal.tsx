"use client";

// ui
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useOrigin } from "@/hooks/use-origin";

const InviteModal = () => {
  const { isOpen, type, data, onClose } = useModal();

  const origin = useOrigin();

  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const { server } = data;

  const isModalOpen = isOpen && type === "invite";

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
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
              <Input
                value={inviteUrl}
                className=" border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 font-semibold"
              />
            </div>
            <Button disabled={isLoading} onClick={onCopy}>
              {copied ? <Check /> : <Copy />}
            </Button>
          </div>
          <Button
            disabled={isLoading}
            variant="link"
            size="sm"
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
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
