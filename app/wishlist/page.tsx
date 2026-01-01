"use client";

import Link from "next/link";
import { useWishlist } from "@/contexts/WishlistContext";
import { Button } from "@/components/ui/button";
import { Heart, Trash2, ArrowLeft, ShoppingCart, ChevronRight, Share2, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";

export default function WishlistPage() {
  const { wishlistItems, clearWishlist, getTotalItems } = useWishlist();
  const { addToCart } = useCart();

  const addAllToCart = () => {
    wishlistItems.forEach(product => addToCart(product));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center page-transition">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-pink-100 to-red-100 dark:from-pink-950/30 dark:to-red-950/30 flex items-center justify-center">
              <Heart className="w-16 h-16 text-pink-400" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Start adding products you love to your wishlist to save them for later.
            </p>
            <Link href="/">
              <Button variant="hero" size="xl" className="rounded-full">
                <Sparkles className="w-5 h-5" />
                Discover Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background page-transition">
      <div className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">Wishlist</span>
          </nav>

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-100 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400 text-sm font-medium">
                <Heart className="w-4 h-4 fill-current" />
                <span>{getTotalItems()} Saved Items</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground">My Wishlist</h1>
              <p className="text-lg text-muted-foreground">
                Items you&apos;ve saved for later
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="rounded-full">
                <Share2 className="w-4 h-4 mr-2" />
                Share Wishlist
              </Button>
              <Button 
                variant="hero" 
                onClick={addAllToCart}
                className="rounded-full"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add All to Cart
              </Button>
              <Button 
                variant="outline" 
                onClick={clearWishlist} 
                className="text-destructive hover:bg-destructive/10 hover:border-destructive rounded-full"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>

          {/* Wishlist Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          {/* Continue Shopping */}
          <div className="mt-12 text-center">
            <Link href="/">
              <Button variant="outline" size="lg" className="rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
