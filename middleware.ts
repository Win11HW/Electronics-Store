import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // You can keep these route definitions if you plan to use them later
  const protectedRoutes = ["/dashboard", "/profile", "/orders"];
  const authRoutes = ["/login", "/register"];
  
  // Example: Log route access for debugging
  console.log(`Accessing: ${request.nextUrl.pathname}`);
  
  // Add any custom logic here without authentication
  // Example: Add headers, rewrite URLs, etc.
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};