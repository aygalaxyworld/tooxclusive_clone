import { NextRequest, NextResponse } from "next/server";
import { addMusicPost, getMusicPosts, MusicCategory } from "@/app/lib/music-store";

const ADMIN_TOKEN = process.env.ADMIN_UPLOAD_TOKEN ?? "admin123";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase().trim();
  const category = searchParams.get("category");

  const posts = await getMusicPosts();
  const filtered = posts.filter((post) => {
    const matchesSearch = search
      ? post.title.toLowerCase().includes(search) || post.artist.toLowerCase().includes(search)
      : true;

    const matchesCategory = category
      ? post.category.toLowerCase() === category.toLowerCase()
      : true;

    return matchesSearch && matchesCategory;
  });

  return NextResponse.json({ data: filtered });
}

export async function POST(request: NextRequest) {
  const token = request.headers.get("x-admin-token");
  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized admin upload" }, { status: 401 });
  }

  const body = (await request.json()) as {
    title?: string;
    artist?: string;
    category?: MusicCategory;
    summary?: string;
    spotifyUrl?: string;
  };

  if (!body.title || !body.artist || !body.summary || !body.category) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const allowedCategories: MusicCategory[] = ["Afrobeats", "Hip-hop"];
  if (!allowedCategories.includes(body.category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  const post = await addMusicPost({
    title: body.title,
    artist: body.artist,
    category: body.category,
    summary: body.summary,
    spotifyUrl: body.spotifyUrl,
  });

  return NextResponse.json({ data: post }, { status: 201 });
}
