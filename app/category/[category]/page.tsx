"use client";

import { ProductCard } from "@/components/ProductCard";
import { getProductsByCategory } from "@/data/products";
import {
  ArrowLeft,
  ChevronRight,
  SlidersHorizontal,
  Grid3X3,
  LayoutList,
  X,
  ChevronDown,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { use, useMemo, useState } from "react";

/* =======================
   Types
======================= */

type PriceRange = {
  min: number;
  max: number;
  label: string;
};

/* =======================
   Constants
======================= */

const categoryDescriptions: Record<string, string> = {
  Computers: "Powerful laptops and desktops for work, gaming, and creativity",
  Smartphones: "Latest smartphones with cutting-edge features and performance",
  Headphones: "Premium audio experiences with noise cancellation and superior sound",
  Cameras: "Professional cameras for stunning photos and videos",
  Smartwatches: "Smart wearables for fitness tracking and connectivity",
};

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

const priceRanges: PriceRange[] = [
  { min: 0, max: 500, label: "Under $500" },
  { min: 500, max: 1000, label: "$500 - $1,000" },
  { min: 1000, max: 2000, label: "$1,000 - $2,000" },
  { min: 2000, max: Infinity, label: "Over $2,000" },
];

const ratingFilters = [4, 3, 2, 1];

/* =======================
   Page
======================= */

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  // Next.js 16: params must be unwrapped in Client Components
  const resolvedParams = use(params);
  const categoryName = decodeURIComponent(resolvedParams.category);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<PriceRange | null>(null);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const allCategoryProducts = getProductsByCategory(categoryName);
  const description =
    categoryDescriptions[categoryName] ??
    `Browse our ${categoryName} collection`;

  const filteredProducts = useMemo(() => {
    let products = [...allCategoryProducts];

    // Search filter
    if (searchQuery) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price filter
    if (priceRange) {
      products = products.filter(
        (p) => p.price >= priceRange.min && p.price < priceRange.max
      );
    }

    // Rating filter
    if (minRating) {
      products = products.filter((p) => p.rating >= minRating);
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        products.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        products.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        products.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
    }

    return products;
  }, [allCategoryProducts, searchQuery, priceRange, minRating, sortBy]);

  const activeFiltersCount = [priceRange, minRating, searchQuery].filter(
    Boolean
  ).length;

  const clearFilters = () => {
    setPriceRange(null);
    setMinRating(null);
    setSearchQuery("");
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{categoryName}</span>
          </nav>

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <span>{allCategoryProducts.length} Products</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground tracking-tight">
                {categoryName}
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                {description}
              </p>
            </div>
            <Link href="/" className="hidden lg:block">
              <Button variant="outline" size="lg" className="rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Filters Bar */}
          <div className="bg-card rounded-2xl shadow-card border border-border/50 p-4 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder={`Search in ${categoryName}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-12 px-4 pr-10 rounded-xl bg-secondary/50"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {showFilters && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Price */}
                  <div>
                    <h3 className="font-semibold mb-3">Price Range</h3>
                    {priceRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() =>
                          setPriceRange(
                            priceRange?.label === range.label
                              ? null
                              : range
                          )
                        }
                        className="block w-full text-left px-4 py-2 rounded-lg"
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>

                  {/* Rating */}
                  <div>
                    <h3 className="font-semibold mb-3">Minimum Rating</h3>
                    {ratingFilters.map((rating) => (
                      <button
                        key={rating}
                        onClick={() =>
                          setMinRating(minRating === rating ? null : rating)
                        }
                        className="block w-full text-left px-4 py-2 rounded-lg"
                      >
                        {rating}+ Stars
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
