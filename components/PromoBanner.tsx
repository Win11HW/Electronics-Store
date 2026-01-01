"use client";

import { ArrowRight, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const PromoBanner = () => {
  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl gradient-hero p-8 lg:p-16">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_50%)]" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.3),transparent_50%)]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm">
                <Zap className="w-4 h-4" />
                <span>Limited Time Offer</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              </div>
              <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground mb-4 leading-tight">
                Flash Sale
                <span className="block text-accent">Up to 40% Off</span>
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-md leading-relaxed">
                Don&apos;t miss out on incredible deals on premium electronics. Sale ends in 24 hours!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/category/Computers">
                  <Button variant="accent" size="xl" className="group">
                    Shop Flash Sale
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="grid grid-cols-4 gap-3 lg:gap-4">
                {[
                  { value: "12", label: "Hours" },
                  { value: "45", label: "Mins" },
                  { value: "32", label: "Secs" },
                  { value: "18", label: "Ms" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="w-16 lg:w-20 h-20 lg:h-24 bg-primary-foreground/20 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center border border-white/10"
                  >
                    <Clock className="w-3 h-3 text-primary-foreground/60 mb-1 lg:hidden" />
                    <span className="text-2xl lg:text-3xl font-bold text-primary-foreground">
                      {item.value}
                    </span>
                    <span className="text-xs text-primary-foreground/80">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
