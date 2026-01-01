"use client";

import Link from "next/link";
import { Monitor, Smartphone, Headphones, Camera, Watch, ArrowRight } from "lucide-react";
import { getProductsByCategory } from "@/data/products";

const categories = [
  { name: "Computers", icon: Monitor, color: "from-blue-500 to-indigo-600" },
  { name: "Smartphones", icon: Smartphone, color: "from-purple-500 to-pink-600" },
  { name: "Headphones", icon: Headphones, color: "from-orange-500 to-red-600" },
  { name: "Cameras", icon: Camera, color: "from-green-500 to-teal-600" },
  { name: "Smartwatches", icon: Watch, color: "from-cyan-500 to-blue-600" },
];

export const CategorySection = () => {
  return (
    <section className="py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
            Categories
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Browse our extensive collection of premium tech products across all major categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {categories.map((category, index) => {
            const productCount = getProductsByCategory(category.name).length;
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={`/category/${category.name}`}
                className="group p-6 lg:p-8 bg-card rounded-2xl shadow-card hover:shadow-hover transition-all duration-500 hover:-translate-y-2 animate-fade-in border border-border/50 hover:border-primary/20 relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-base lg:text-lg font-semibold text-foreground text-center mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  {productCount} {productCount === 1 ? "item" : "items"}
                </p>
                <div className="flex items-center justify-center mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span className="text-xs font-medium text-primary flex items-center gap-1">
                    Browse <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
