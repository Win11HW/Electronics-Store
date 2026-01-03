"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { Github, ArrowLeft, Loader } from "lucide-react";
import { FaGoogle } from "react-icons/fa6";

export default function LoginPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleGitHubSignIn = async () => {
    try {
      setLoading("github");
      await signIn("github", { callbackUrl: "/", redirect: true });
    } catch (error) {
      console.error("GitHub sign-in error:", error);
      setLoading(null);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading("google");
      await signIn("google", { callbackUrl: "/", redirect: true });
    } catch (error) {
      console.error("Google sign-in error:", error);
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-border/50 p-8 md:p-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 mb-4">
              <span className="text-2xl font-bold text-primary">T</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Sign in to continue to TechZone
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              onClick={handleGitHubSignIn}
              disabled={loading !== null}
              className="w-full h-12 rounded-xl bg-[#24292e] hover:bg-[#1a1e22] text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-3 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              {loading === "github" ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <Github className="w-5 h-5" />
                  <span>Continue with GitHub</span>
                </>
              )}
            </Button>
            
            <Button
              onClick={handleGoogleSignIn}
              disabled={loading !== null}
              variant="outline"
              className="w-full h-12 rounded-xl border-2 hover:bg-accent/50 transition-all duration-200 flex items-center justify-center gap-3 font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              {loading === "google" ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <FaGoogle className="w-5 h-5 text-[#4285F4]" />
                  <span>Continue with Google</span>
                </>
              )}
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Create one
              </Link>
            </p>
            
            <Link href="/">
              <Button
                variant="ghost"
                className="w-full rounded-xl text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
