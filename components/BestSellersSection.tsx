"use client";

import { ArrowRight, ChevronLeft, ChevronRight, Flame, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";
import { useRef } from "react";
import { allProducts } from "@/data/products";

export const BestSellersSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bestSellers = allProducts.filter(p => p.badge === "Best Seller" || p.reviews > 500).slice(0, 8);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-destructive to-orange-500 flex items-center justify-center shadow-lg">
              <Flame className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-destructive" />
                <span className="text-sm font-medium text-destructive">Hot Right Now</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Best Sellers
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hidden sm:flex hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hidden sm:flex hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
            <Button variant="ghost" className="hidden md:flex items-center gap-2 text-destructive hover:bg-destructive/10">
              View all
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
        >
          {bestSellers.map((product, index) => (
            <div
              key={product.id + "-bestseller"}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
