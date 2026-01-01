import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  // Registration is not supported in demo mode (no database)
  return NextResponse.json(
    { error: "Registration not supported in demo mode" },
    { status: 501 }
  );
}
