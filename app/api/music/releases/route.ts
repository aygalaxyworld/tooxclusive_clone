import { NextResponse } from "next/server";
import { getLatestReleases } from "@/app/lib/music-api";

export async function GET() {
  const data = await getLatestReleases();
  return NextResponse.json({ data, updatedAt: new Date().toISOString() });
}
