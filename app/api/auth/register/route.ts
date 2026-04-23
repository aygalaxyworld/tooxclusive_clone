import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/app/lib/music-store";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!body.name || !body.email || !body.password) {
    return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
  }

  try {
    const user = await registerUser({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    return NextResponse.json({ data: { id: user.id, name: user.name, email: user.email } }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Registration failed" },
      { status: 400 },
    );
  }
}
