import ServerSidebar from "@/components/server/server-sidebar";
import { currentProflie } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ServerIdLayoutProps {
  children: React.ReactNode;
  params: { serversId: string };
}

const ServerIdLayout = async ({ children, params }: ServerIdLayoutProps) => {
  const profile = await currentProflie();

  if (!profile) {
    redirect("/");
  }

  const { serversId } = await params;

  const server = await db.server.findUnique({
    where: {
      id: serversId,
      member: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div>
      <div className="w-60 h-full fixed z-20 md:flex inset-y-0 flex-col">
        <ServerSidebar serverId={serversId} />
      </div>
      <main className="h-full pl-60">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
