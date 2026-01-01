"use client";

import { ArrowRight, Sparkles, Play, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.05),transparent_50%)]" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-16 lg:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-in">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                <Sparkles className="w-4 h-4" />
                <span>New Arrivals 2024</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
                <TrendingUp className="w-4 h-4" />
                <span>Trending</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1]">
              Discover Premium
              <span className="block text-gradient mt-2">Tech Essentials</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground max-w-lg leading-relaxed">
              Explore our curated collection of cutting-edge gadgets and electronics. 
              Premium quality meets unbeatable prices.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/category/Computers">
                <Button variant="hero" size="xl" className="rounded-full group">
                  Shop Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="xl" className="rounded-full group">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background flex items-center justify-center text-white text-xs font-bold"
                    style={{ zIndex: 5 - i }}
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                  <span className="text-sm font-semibold text-foreground ml-1">4.9</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">50K+</span> Happy Customers
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[450px] lg:h-[550px]">
            {/* Main Card */}
            <div className="absolute top-0 left-0 right-0 lg:right-16 h-full rounded-3xl overflow-hidden shadow-hover animate-scale-in">
              <Image 
                src="/hero-tech.png" 
                alt="Premium Tech Setup"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent text-accent-foreground">Featured</span>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/20 text-white backdrop-blur-sm">Best Seller</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">MacBook Pro M3</h3>
                <p className="text-white/80 mb-4">Ultimate performance for professionals</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">$1,999</p>
                    <p className="text-sm text-white/60 line-through">$2,499</p>
                  </div>
                  <Link href="/product/1">
                    <Button variant="accent" size="lg" className="rounded-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="hidden lg:block absolute top-8 right-0 w-52 space-y-4">
              <Link href="/category/Headphones" className="block bg-card rounded-2xl shadow-card p-4 hover:shadow-hover transition-all duration-300 animate-fade-in border border-border/50 hover:border-primary/20 group" style={{ animationDelay: "0.2s" }}>
                <div className="aspect-square bg-gradient-to-br from-secondary to-secondary/50 rounded-xl mb-3 overflow-hidden relative">
                  <Image src="/headphones.png" alt="Headphones" fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">Best Headphones</p>
                <p className="text-xs text-muted-foreground">From $199</p>
              </Link>
              <Link href="/category/Smartphones" className="block bg-card rounded-2xl shadow-card p-4 hover:shadow-hover transition-all duration-300 animate-fade-in border border-border/50 hover:border-primary/20 group" style={{ animationDelay: "0.4s" }}>
                <div className="aspect-square bg-gradient-to-br from-secondary to-secondary/50 rounded-xl mb-3 overflow-hidden relative">
                  <Image src="/iphone.png" alt="Smartphone" fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">Top Smartphones</p>
                <p className="text-xs text-muted-foreground">From $699</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
