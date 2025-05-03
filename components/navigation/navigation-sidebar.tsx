import React from "react";
import NavigationAction from "./navigation-action";

const NavigationSidebar = () => {
  return (
    <div className="dark:bg-[#1E1F22] bg-[#E3E5E8] w-full flex flex-col items-center h-full text-primary space-y-4 ">
      <NavigationAction />
    </div>
  );
};

export default NavigationSidebar;
