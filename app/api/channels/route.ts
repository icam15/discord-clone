import { currentProflie } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@/lib/generated/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProflie();

    const { name, type } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("missing server id", { status: 400 });
    }

    if (name === "general") {
      return new NextResponse("Name cannot be 'general'");
    }

    const createNewChannel = await db.server.update({
      where: {
        id: serverId,
        member: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            name,
            type,
            profileId: profile.id,
          },
        },
      },
    });
    return NextResponse.json(createNewChannel);
  } catch (error) {
    console.log("[CREATE_CHANNEL_ERROR", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}
