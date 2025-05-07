import { currentProflie } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { membersId: string } }
) {
  try {
    const profile = await currentProflie();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Server id missing", { status: 400 });
    }

    if (!params.membersId) {
      return new NextResponse("Memeber id missing", { status: 400 });
    }

    const updateServer = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        member: {
          deleteMany: {
            id: params.membersId,
            profileId: {
              not: profile.id,
            },
          },
        },
      },
      include: {
        member: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    return NextResponse.json(updateServer);
  } catch (error) {
    console.log("[MEMBER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
