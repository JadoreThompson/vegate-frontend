import { Menu, X } from "lucide-react";
import { useState, type FC } from "react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import WebsiteLogo from "../website-logo";

const MarketingNavbar: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center">
              {/* <TrendingUp className="h-5 w-5 text-white" /> */}
              <WebsiteLogo className="" />
            </div>
            <span className="text-xl font-bold tracking-tight">Vegate</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              to="/features"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/docs"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Docs
            </Link>
            <Link
              to="/blog"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Blog
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-border/40 border-t md:hidden">
          <div className="space-y-1 px-4 pt-2 pb-3">
            <Link
              to="/features"
              className="text-muted-foreground hover:bg-accent hover:text-foreground block rounded-md px-3 py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="text-muted-foreground hover:bg-accent hover:text-foreground block rounded-md px-3 py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/docs"
              className="text-muted-foreground hover:bg-accent hover:text-foreground block rounded-md px-3 py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </Link>
            <Link
              to="/blog"
              className="text-muted-foreground hover:bg-accent hover:text-foreground block rounded-md px-3 py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <div className="flex items-center gap-2 px-3 py-2">
              <Link to="/login" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  Log in
                </Button>
              </Link>
              <Link to="/register" className="flex-1">
                <Button
                  size="sm"
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MarketingNavbar;
