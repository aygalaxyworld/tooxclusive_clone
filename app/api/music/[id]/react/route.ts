import { NextRequest, NextResponse } from "next/server";
import { toggleReaction } from "@/app/lib/music-store";

type Params = {
  params: Promise<{ id: string }>;
};

export async function POST(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = (await request.json()) as { reaction?: "like" | "save" };

  if (!body.reaction || !["like", "save"].includes(body.reaction)) {
    return NextResponse.json({ error: "Invalid reaction" }, { status: 400 });
  }

  const updated = await toggleReaction(id, body.reaction);

  if (!updated) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ data: updated });
}
