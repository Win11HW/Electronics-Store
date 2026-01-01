"use client";

import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RefreshCw,
  Minus,
  Plus,
  Check,
  Share2,
  ChevronRight,
  Package,
  Award,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getProductById, allProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { use } from "react";

// Consistent product type with required id
interface Product {
  id: string;
  _id?: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  image2: string;
  badge?: string;
  description?: string;
  specs?: string[];
  inStock?: boolean;
}

// Helper to normalize product data
const normalizeProduct = (data: any): Product | null => {
  if (!data) return null;
  
  return {
    id: data.id || data._id || '',
    _id: data._id,
    name: data.name || '',
    category: data.category || '',
    price: typeof data.price === 'number' ? data.price : parseFloat(data.price) || 0,
    originalPrice: data.originalPrice,
    rating: typeof data.rating === 'number' ? data.rating : parseFloat(data.rating) || 0,
    reviews: typeof data.reviews === 'number' ? data.reviews : parseInt(data.reviews) || 0,
    image: data.image || '/placeholder.svg',
    image2: data.image2 || data.image || '/placeholder.svg',
    badge: data.badge,
    description: data.description || '',
    specs: Array.isArray(data.specs) ? data.specs : [],
    inStock: data.inStock !== false,
  };
};

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Try to fetch from MongoDB first
        const response = await fetch(`/api/products/${resolvedParams.id}`);
        if (response.ok) {
          const data = await response.json();
          const normalized = normalizeProduct(data);
          setProduct(normalized);
          return;
        }
      } catch (error) {
        console.log("MongoDB fetch failed, trying static data");
      }

      // Fallback to static data
      const staticProduct = getProductById(resolvedParams.id);
      if (staticProduct) {
        const normalized = normalizeProduct(staticProduct);
        setProduct(normalized);
      } else {
        setProduct(null);
      }
    };

    fetchProduct();
  }, [resolvedParams.id]);

  useEffect(() => {
    if (product) {
      // Fetch related products - transform static data to normalized products
      const related = allProducts
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
        .map(normalizeProduct)
        .filter((p): p is Product => p !== null);
      
      setRelatedProducts(related);
      setLoading(false);
    }
  }, [product]);

  const isWishlisted = product ? isInWishlist(product.id) : false;

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center page-transition">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center page-transition">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
              <Package className="w-16 h-16 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Product Not Found
            </h1>
            <p className="text-muted-foreground mb-8 text-lg">
              The product you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
            <Link href="/">
              <Button variant="hero" size="lg" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const images = product.image
    ? [product.image, product.image2 || product.image, product.image]
    : ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"];

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background page-transition">
      <div className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8 flex-wrap">
            <Link
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link
              href={`/category/${product.category}`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gradient-to-br from-secondary via-secondary/80 to-secondary/50 rounded-3xl overflow-hidden shadow-card">
                {/* Badges */}
                <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
                  {product.badge && (
                    <span className="px-4 py-2 text-sm font-semibold rounded-full bg-accent text-accent-foreground shadow-lg">
                      {product.badge}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="px-4 py-2 text-sm font-semibold rounded-full bg-destructive text-destructive-foreground shadow-lg">
                      -{discount}% OFF
                    </span>
                  )}
                </div>

                {/* Share Button */}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-5 right-5 z-10 rounded-full shadow-lg"
                >
                  <Share2 className="w-4 h-4" />
                </Button>

                <Image
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all relative ${
                      selectedImageIndex === index
                        ? "border-primary shadow-soft ring-4 ring-primary/20"
                        : "border-border/50 opacity-60 hover:opacity-100 hover:border-border"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category & Title */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full uppercase tracking-wider">
                    {product.category}
                  </span>
                  {product.inStock && (
                    <span className="px-3 py-1 text-xs font-semibold text-green-600 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      In Stock
                    </span>
                  )}
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-accent text-accent"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-foreground font-semibold">
                    {product.rating}
                  </span>
                  <span className="text-muted-foreground">
                    ({product.reviews.toLocaleString()} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="p-5 bg-card rounded-2xl border border-border/50">
                <div className="flex items-baseline gap-4 flex-wrap">
                  <span className="text-4xl font-bold text-foreground">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                      <span className="px-3 py-1.5 text-sm font-semibold rounded-full bg-destructive/10 text-destructive">
                        Save ${(product.originalPrice - product.price).toLocaleString()}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  or 4 interest-free payments of ${(product.price / 4).toFixed(2)}{" "}
                  with Klarna
                </p>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description}
              </p>

              {/* Quantity & Actions */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 p-2 bg-secondary rounded-xl">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-lg hover:bg-background"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold text-foreground text-lg">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="rounded-lg hover:bg-background"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  variant={addedToCart ? "default" : "hero"}
                  size="xl"
                  className={`flex-1 min-w-[200px] rounded-xl transition-all ${
                    addedToCart ? "bg-green-500 hover:bg-green-600" : ""
                  }`}
                  onClick={handleAddToCart}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart — ${(product.price * quantity).toLocaleString()}
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="xl"
                  onClick={handleWishlistToggle}
                  className={`rounded-xl ${
                    isWishlisted
                      ? "text-destructive border-destructive hover:bg-destructive/10"
                      : ""
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? "fill-destructive" : ""}`}
                  />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center text-center p-4 rounded-xl bg-card border border-border/50 hover:border-primary/20 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
                    <Truck className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Free Shipping
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Orders $100+
                  </span>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-xl bg-card border border-border/50 hover:border-primary/20 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-2">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    2 Year Warranty
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Full coverage
                  </span>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-xl bg-card border border-border/50 hover:border-primary/20 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-2">
                    <RefreshCw className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    30-Day Returns
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Hassle-free
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          {product.specs && product.specs.length > 0 && (
            <div className="mt-16 lg:mt-24">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                    Specifications
                  </h2>
                  <p className="text-muted-foreground">
                    Technical details and features
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.specs.map((spec, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border/50 hover:border-primary/20 hover:shadow-card transition-all animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 lg:mt-24">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                      Related Products
                    </h2>
                    <p className="text-muted-foreground">You might also like</p>
                  </div>
                </div>
                <Link href={`/category/${product.category}`}>
                  <Button variant="outline" className="rounded-full">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p, index) => (
                  <div
                    key={p.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* FIXED: Spread the product props instead of passing a product object */}
                    <ProductCard {...p} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}