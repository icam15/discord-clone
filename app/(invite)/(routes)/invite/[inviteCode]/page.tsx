import { currentProflie } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProflie();

  if (!profile) {
    return redirectToSignIn();
  }

  const inviteCode = await params.inviteCode;

  if (!inviteCode) {
    return redirect("/");
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  // add new member to server
  const server = await db.server.update({
    where: {
      inviteCode: inviteCode,
    },
    data: {
      member: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  if (server) {
    redirect(`/servers/${server.id}`);
  }

  return null;
};

export default InviteCodePage;
