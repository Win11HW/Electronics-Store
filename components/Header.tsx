"use client";

import { Search, ShoppingCart, User, Menu, Heart, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useSession, signIn, signOut } from "next-auth/react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Computers", href: "/category/Computers" },
  { name: "Smartphones", href: "/category/Smartphones" },
  { name: "Headphones", href: "/category/Headphones" },
  { name: "Cameras", href: "/category/Cameras" },
  { name: "Smartwatches", href: "/category/Smartwatches" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { getTotalItems } = useCart();
  const { getTotalItems: getWishlistItems } = useWishlist();
  const pathname = usePathname();
  const cartItemCount = getTotalItems();
  const wishlistItemCount = getWishlistItems();
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
            <div className="w-10 h-10 lg:w-11 lg:h-11 gradient-hero rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-hover transition-shadow">
              <span className="text-primary-foreground font-bold text-lg lg:text-xl">T</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-foreground">TechZone</span>
              <span className="block text-[10px] text-muted-foreground -mt-0.5 tracking-wider uppercase">Premium Electronics</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className={`hidden md:flex flex-1 max-w-xl mx-8 transition-all ${isSearchFocused ? "scale-[1.02]" : ""}`}>
            <div className="relative w-full">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isSearchFocused ? "text-primary" : "text-muted-foreground"}`} />
              <Input
                type="search"
                placeholder="Search products, brands, categories..."
                className="w-full pl-12 pr-4 h-12 rounded-full border-border/50 bg-secondary/50 focus:bg-card focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 lg:gap-2">
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-pink-50 dark:hover:bg-pink-950/30 group">
                <Heart className="w-5 h-5 group-hover:text-pink-500 transition-colors" />
                {wishlistItemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                    {wishlistItemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-primary/10 group">
                <ShoppingCart className="w-5 h-5 group-hover:text-primary transition-colors" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            <div className="hidden sm:flex items-center gap-2">
              {session ? (
                <>
                  <Link href="/profile">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary">
                      <User className="w-5 h-5" />
                    </Button>
                  </Link>
                  <div className="w-px h-6 bg-border mx-1 hidden lg:block" />
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <div className="w-px h-6 bg-border mx-1 hidden lg:block" />
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => signIn("github")}
                  >
                    Sign In
                  </Button>
                </>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-1 pb-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium transition-all rounded-full ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 animate-fade-in border-t border-border/50 pt-4">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 h-12 rounded-full bg-secondary/50"
              />
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 text-sm font-medium transition-colors rounded-xl ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="border-t border-border/50 mt-2 pt-2">
                {session ? (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl w-full justify-start"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      signIn("github");
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl w-full justify-start"
                  >
                    <User className="w-4 h-4" />
                    Sign In
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
