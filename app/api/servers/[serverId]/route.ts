import { currentProflie } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProflie();

    if (!profile) {
      redirect("/");
    }

    const { name, imageUrl } = await req.json();

    const updateServer = await db.server.update({
      where: {
        profileId: profile?.id,
        id: params.serverId,
      },
      data: {
        name: name,
        imageUrl: imageUrl,
      },
    });

    return NextResponse.json(updateServer);
  } catch (error) {
    console.log("[SERVER_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProflie();

    if (!profile) {
      return new NextResponse("Unauthorization", { status: 401 });
    }

    if (!params?.serverId) {
      return new NextResponse("missing SERVER ID", { status: 400 });
    }

    const deleteServer = await db.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
    });

    return NextResponse.json(deleteServer);
  } catch (error) {
    console.log("[DELETE_SERVER_ERROR]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
