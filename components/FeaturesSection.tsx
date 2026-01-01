"use client";

import { Truck, Shield, RefreshCw, Headphones, CreditCard, Award } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $100",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure checkout",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day return policy",
    color: "from-orange-500 to-red-600",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated support team",
    color: "from-purple-500 to-pink-600",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-background to-secondary/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group flex flex-col items-center text-center p-6 rounded-2xl bg-card/50 hover:bg-card hover:shadow-card transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
