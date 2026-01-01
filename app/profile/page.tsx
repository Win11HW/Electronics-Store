"use client";

import { Button } from "@/components/ui/button";
import { LogOut, User, Mail, Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const handleSignOut = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">Profile</span>
        </nav>

        <div className="max-w-2xl mx-auto">
          {/* Profile Card */}
          <div className="bg-card rounded-2xl shadow-lg border border-border/50 p-8">
            {/* Header */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border/50">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  John Doe
                </h1>
                <p className="text-muted-foreground flex items-center gap-2 mt-2">
                  <Mail className="w-4 h-4" />
                  john.doe@example.com
                </p>
              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-6 mb-8">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Full Name
                </label>
                <p className="text-lg text-foreground mt-2">
                  John Doe
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Email Address
                </label>
                <p className="text-lg text-foreground mt-2">
                  john.doe@example.com
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Account Role
                </label>
                <p className="text-lg text-foreground mt-2 capitalize">
                  User
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Member Since
                </label>
                <p className="text-lg text-foreground mt-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-8 border-t border-border/50">
              <Button variant="outline" className="flex-1 rounded-lg">
                Edit Profile
              </Button>
              <Button
                variant="destructive"
                className="flex-1 rounded-lg"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/orders">
              <div className="bg-card rounded-xl border border-border/50 p-6 hover:border-primary/50 transition-colors cursor-pointer">
                <h3 className="font-semibold text-foreground mb-2">Orders</h3>
                <p className="text-sm text-muted-foreground">
                  View your order history
                </p>
              </div>
            </Link>

            <Link href="/wishlist">
              <div className="bg-card rounded-xl border border-border/50 p-6 hover:border-primary/50 transition-colors cursor-pointer">
                <h3 className="font-semibold text-foreground mb-2">Wishlist</h3>
                <p className="text-sm text-muted-foreground">
                  Your saved products
                </p>
              </div>
            </Link>

            <Link href="/settings">
              <div className="bg-card rounded-xl border border-border/50 p-6 hover:border-primary/50 transition-colors cursor-pointer">
                <h3 className="font-semibold text-foreground mb-2">Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your account
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
