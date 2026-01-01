"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

// NextAuth.js and real authentication have been removed. This is a static demo login page.
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-lg border border-border/50 p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in is disabled in demo mode.</p>
          </div>
          <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-border/50 text-center">
            <p className="text-xs font-medium text-foreground mb-2">Demo Credentials:</p>
            <p className="text-xs text-muted-foreground">Email: demo@example.com</p>
            <p className="text-xs text-muted-foreground">Password: demo123456</p>
            <p className="text-xs text-muted-foreground mt-4">Authentication is disabled. This is a static demo page.</p>
          </div>
          <div className="text-center mt-8">
            <Link href="/">
              <Button variant="outline" className="w-full rounded-lg">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
