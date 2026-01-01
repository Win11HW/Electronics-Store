import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center page-transition">
      <div className="text-center px-4">
        <div className="relative mb-8">
          <h1 className="text-[120px] lg:text-[180px] font-bold text-gradient leading-none opacity-20">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center backdrop-blur-sm">
              <Search className="w-14 h-14 text-primary" />
            </div>
          </div>
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Page Not Found</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved to a new location.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="hero" size="xl" className="rounded-full w-full sm:w-auto">
              <Home className="w-5 h-5" />
              Return to Home
            </Button>
          </Link>
          <Button variant="outline" size="xl" className="rounded-full" onClick={() => window.history.back()}>
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
