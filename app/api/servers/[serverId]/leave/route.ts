import { currentProflie } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProflie();
    console.log(params.serverId, profile);

    if (!profile) {
      return new NextResponse("Unauthorization", { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse("missing SERVER ID", { status: 400 });
    }

    const leaveServer = await db.server.update({
      where: {
        id: await params?.serverId,
        member: {
          some: {
            profileId: profile.id,
          },
        },
      },
      data: {
        member: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });
    return NextResponse.json(leaveServer);
  } catch (error) {
    console.log("[LEAVE_SERVER_ERROR]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
