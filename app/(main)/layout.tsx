import NavigationSidebar from "@/components/navigation/navigation-sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex w-[72px] z-30 fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <main className="pl-[72px] h-full">{children}</main>
    </div>
  );
};

export default MainLayout;
