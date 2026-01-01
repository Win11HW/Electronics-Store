"use client";

import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const newsItems = [
  {
    id: 1,
    title: "Apple Vision Pro: The Future of Spatial Computing",
    excerpt: "Apple's revolutionary mixed reality headset is redefining how we interact with digital content.",
    category: "Technology",
    date: "Dec 28, 2024",
    readTime: "5 min read",
    image: "/hero-tech.png",
    featured: true,
  },
  {
    id: 2,
    title: "Best Noise-Canceling Headphones of 2024",
    excerpt: "Our top picks for premium audio experiences.",
    category: "Reviews",
    date: "Dec 26, 2024",
    readTime: "3 min read",
    image: "/headphones.png",
  },
  {
    id: 3,
    title: "Smart Wearables: Health Tracking Revolution",
    excerpt: "How smartwatches are changing personal health.",
    category: "Lifestyle",
    date: "Dec 24, 2024",
    readTime: "4 min read",
    image: "/watch.png",
  },
];

export const NewsSection = () => {
  return (
    <section className="py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
              Blog & News
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Latest News & Updates
            </h2>
            <p className="text-muted-foreground">
              Stay updated with the latest tech trends
            </p>
          </div>
          <Button variant="ghost" className="hidden sm:flex items-center gap-2 text-primary hover:bg-primary/10">
            All Articles
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {newsItems.filter(item => item.featured).map((item) => (
            <a
              key={item.id}
              href="#"
              className="group relative overflow-hidden rounded-3xl bg-card shadow-card hover:shadow-hover transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-block px-3 py-1.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground mb-4 shadow-lg">
                  {item.category}
                </span>
                <h3 className="text-2xl lg:text-3xl font-bold text-background mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-background/80 mb-4 line-clamp-2">{item.excerpt}</p>
                <div className="flex items-center gap-4 text-background/70 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {item.readTime}
                  </span>
                </div>
              </div>
            </a>
          ))}

          <div className="flex flex-col gap-6">
            {newsItems.filter(item => !item.featured).map((item) => (
              <a
                key={item.id}
                href="#"
                className="group flex gap-5 p-5 rounded-2xl bg-card shadow-card hover:shadow-hover transition-all duration-500 border border-border/50 hover:border-primary/20"
              >
                <div className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.readTime}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
