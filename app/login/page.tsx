"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { Github } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-lg border border-border/50 p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in with your GitHub account</p>
          </div>
          <Button
            onClick={() => signIn("github")}
            className="w-full rounded-lg flex items-center gap-2"
          >
            <Github className="w-5 h-5" />
            Sign in with GitHub
          </Button>
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
