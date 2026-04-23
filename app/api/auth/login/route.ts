import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/app/lib/music-store";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    email?: string;
    password?: string;
  };

  if (!body.email || !body.password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const user = await loginUser(body.email, body.password);

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = Buffer.from(`${user.id}:${user.email}`).toString("base64");

  return NextResponse.json({
    data: {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
  });
}
