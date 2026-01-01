"use client";

import { Heart, ShoppingCart, Star, Eye, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Product } from "@/data/products";
import { useState } from "react";

export const ProductCard = ({
  id,
  name,
  category,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  badge,
}: Product) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [addedToCart, setAddedToCart] = useState(false);
  const isWishlisted = isInWishlist(id);
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id,
      name,
      category,
      price,
      originalPrice,
      rating,
      reviews,
      image,
      image2: image, // <-- fixed: required by Product type
      badge,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id,
        name,
        category,
        price,
        originalPrice,
        rating,
        reviews,
        image,
        image2: image, // <-- fixed
        badge,
      });
    }
  };

  return (
    <div className="group bg-card rounded-2xl shadow-card hover:shadow-hover transition-all duration-500 overflow-hidden border border-border/50 hover:border-primary/30 hover-lift">
      <Link
        href={`/product/${id}`}
        className="block relative aspect-square bg-gradient-to-br from-secondary via-secondary/80 to-secondary/50 overflow-hidden"
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {badge && (
            <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-accent text-accent-foreground shadow-lg backdrop-blur-sm">
              {badge}
            </span>
          )}
          {discount > 0 && (
            <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-destructive text-destructive-foreground shadow-lg backdrop-blur-sm">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg backdrop-blur-sm ${
            isWishlisted
              ? "bg-destructive/90 text-white"
              : "bg-card/90 hover:bg-card text-muted-foreground hover:text-destructive"
          }`}
        >
          <Heart
            className={`w-5 h-5 transition-all ${
              isWishlisted ? "fill-white scale-110" : ""
            }`}
          />
        </button>

        {/* Product Image */}
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick View Button */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <Button variant="secondary" size="sm" className="shadow-lg rounded-full px-4">
            <Eye className="w-4 h-4 mr-1.5" />
            Quick View
          </Button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider">
            {category}
          </p>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-accent text-accent" />
            <span className="text-xs font-medium text-foreground">{rating}</span>
            <span className="text-xs text-muted-foreground">({reviews})</span>
          </div>
        </div>

        <Link href={`/product/${id}`}>
          <h3 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 min-h-[48px] leading-snug">
            {name}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-foreground">
              ${price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <Button
            size="icon"
            variant={addedToCart ? "default" : "ghost"}
            className={`rounded-full transition-all ${
              addedToCart
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "hover:bg-primary hover:text-primary-foreground"
            }`}
            onClick={handleAddToCart}
          >
            {addedToCart ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};
