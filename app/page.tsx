import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { ProductsSection } from "@/components/ProductsSection";
import { BestSellersSection } from "@/components/BestSellersSection";
import { PromoBanner } from "@/components/PromoBanner";
import { NewsSection } from "@/components/NewsSection";
import { FeaturesSection } from "@/components/FeaturesSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <ProductsSection />
      <PromoBanner />
      <BestSellersSection />
      <NewsSection />
      <FeaturesSection />
    </>
  );
}
