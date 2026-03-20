import { Menu, X } from "lucide-react";
import { useState, type FC, type ReactNode } from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import WebsiteLogo from "../website-logo";

const Header: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-background relative border-b">
      <div className="flex h-12 items-center justify-between px-4 sm:justify-normal sm:px-5">
        <div className="flex h-full w-full">
          <Link to="/" className="mr-6 flex items-center gap-2 sm:mr-12">
            <div className="flex h-8 w-8 items-center justify-center">
              <WebsiteLogo />
            </div>
            <span className="text-lg font-bold tracking-tight sm:text-xl">
              Vegate
            </span>
          </Link>

          <div className="hidden items-center gap-4 text-sm sm:flex sm:gap-8 sm:text-base">
            <a href="#features" className="hover:text-primary cursor-pointer">
              Features
            </a>
            <a href="#faq" className="hover:text-primary cursor-pointer">
              FAQ
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/register">
            <Button className="rounded-full hover:text-white">Register</Button>
          </Link>

          <Button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center !bg-transparent sm:hidden"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="text-muted-foreground h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {open && (
        <div className="bg-background absolute top-full left-0 z-50 w-full border-b p-4 sm:hidden">
          <div className="flex flex-col gap-4">
            <a
              href="#features"
              className="hover:text-primary"
              onClick={() => setOpen(false)}
            >
              Features
            </a>
            <a
              href="#faq"
              className="hover:text-primary"
              onClick={() => setOpen(false)}
            >
              FAQ
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

const FooterSection: FC = () => {
  return (
    <footer className="border-border/40 border-t py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center">
                <WebsiteLogo />
              </div>
              <span className="text-xl font-bold">Vegate</span>
            </div>
            <p className="text-muted-foreground text-sm">
              AI-powered algorithmic trading for everyone. Build, test, and
              deploy strategies without code.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Product</h3>
            <ul className="text-muted-foreground space-y-2.5 text-sm">
              <li>
                <Link
                  to="/features"
                  className="hover:text-foreground transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/docs"
                  className="hover:text-foreground transition-colors"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Company</h3>
            <ul className="text-muted-foreground space-y-2.5 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Legal</h3>
            <ul className="text-muted-foreground space-y-2.5 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border/40 text-muted-foreground mt-12 pt-8 text-center text-sm">
          © {new Date().getFullYear()} vegate. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const Layout: FC<{ children: ReactNode }> = (props) => (
  <main className="bg-background">
    <div className="sticky top-0 z-50">
      <Header />
    </div>
    {props.children}
    <FooterSection />
  </main>
);

export default Layout;
