import { NextRequest, NextResponse } from "next/server";
import { allProducts } from "@/data/products";

export const runtime = "nodejs";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = allProducts.find((p) => p.id === id);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT() {
  return NextResponse.json({ error: "Product update not supported in demo mode" }, { status: 501 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Product delete not supported in demo mode" }, { status: 501 });
}