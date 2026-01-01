import { NextRequest, NextResponse } from "next/server";
import { allProducts } from "@/data/products";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    // Return all static products
    return NextResponse.json(allProducts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // This demo does not support creating products (no database)
  return NextResponse.json(
    { error: "Product creation not supported in demo mode" },
    { status: 501 }
  );
}
