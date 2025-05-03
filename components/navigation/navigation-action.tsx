"use client";

import { Plus } from "lucide-react";
import ActionTooltip from "../action-tooltip";

const NavigationAction = () => {
  return (
    <div className="mt-3">
      <ActionTooltip side="right" label="Add a server" align="center">
        <button className="group flex items-center">
          <div
            className="
          flex
        items-center
        justify-center
        h-[48px]
        w-[48px]
        bg-background
        dark:bg-neutral-700
        rounded-[24px]
        group-hover:rounded-[16px]
        transition-all
        overflow-hidden
        group-hover:bg-emerald-500
        text-emerald-500
        mx-3
        "
          >
            <Plus className="group-hover:text-white transition" size={25} />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
