import Bitcoin from "@/assets/images/noir-bitcoin.png";
import Dogecoin from "@/assets/images/noir-dogecoin.png";
import Ethereum from "@/assets/images/noir-ethereum.png";
import EURUSD from "@/assets/images/noir-eurusd.png";
import GBPUSD from "@/assets/images/noir-gbpusd.png";
import USDJPY from "@/assets/images/noir-usdjpy.png";
import XAUUSD from "@/assets/images/noir-xauusd.png";
import { Button } from "@/components/ui/button";

import WebsiteLogo from "@/components/website-logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { Menu, Plus, X } from "lucide-react";
import type { FC } from "react";
import { useState } from "react";
import { Link } from "react-router";

const Header: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-background relative border-b">
      <div className="flex h-12 items-center justify-between px-4 sm:justify-normal sm:px-5">
        <div className="w-full h-full flex">
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
            <Button className="rounded-full">Register</Button>
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

const InstrumentsMarquee: FC = () => (
  <div className="marquee">
    <div className="marquee-track">
      <div className="marquee-item flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
        <img src={EURUSD} alt="" />
      </div>
      <div className="marquee-item flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
        <img src={GBPUSD} alt="" />
      </div>
      <div className="marquee-item flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
        <img src={USDJPY} alt="" />
      </div>
      <div className="marquee-item flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
        <img src={XAUUSD} alt="" />
      </div>
      <div className="marquee-item flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
        <img src={Bitcoin} alt="" />
      </div>
      <div className="marquee-item flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
        <img src={Ethereum} alt="" />
      </div>
      <div className="marquee-item flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
        <img src={Dogecoin} alt="" />
      </div>

      <div className="marquee-item flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
        <img src={EURUSD} alt="" />
      </div>
      <div className="marquee-item flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
        <img src={GBPUSD} alt="" />
      </div>
      <div className="marquee-item flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
        <img src={USDJPY} alt="" />
      </div>
      <div className="marquee-item flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
        <img src={XAUUSD} alt="" />
      </div>
      <div className="marquee-item flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
        <img src={Bitcoin} alt="" />
      </div>
      <div className="marquee-item flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
        <img src={Ethereum} alt="" />
      </div>
      <div className="marquee-item flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
        <img src={Dogecoin} alt="" />
      </div>
    </div>
  </div>
);

const HeroSection: FC = () => {
  return (
    <div className="flex h-full w-full flex-col lg:flex-row">
      <div className="relative flex w-full overflow-hidden px-4 lg:h-full lg:w-1/2">
        <div className="flex items-center overflow-hidden pt-12 sm:pt-16 lg:h-full lg:pb-36">
          <div className="flex flex-col overflow-hidden">
            <h1 className="mb-6 text-4xl sm:mb-8 sm:text-5xl lg:mb-10 lg:text-6xl">
              Turn your <span className="text-primary">thoughts</span> into{" "}
              <span className="text-primary">strategy</span>
            </h1>
            <p className="text-sm text-gray-400 sm:text-base lg:text-lg">
              Transform your intents, beliefs and ideas into live strategies.
              <br />
              Manage and generate strategies all in one platform.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 hidden w-full px-4 pb-8 lg:block">
          <section className="relative h-fit w-full">
            <InstrumentsMarquee />
            <div className="from-background pointer-events-none absolute top-0 left-0 z-10 h-full w-8 bg-gradient-to-r to-transparent sm:w-10 lg:w-40" />
            <div className="from-background pointer-events-none absolute top-0 right-0 z-10 h-full w-8 bg-gradient-to-l to-transparent sm:w-10 lg:w-40" />
          </section>
        </div>
      </div>

      <div className="flex w-full flex-col p-4 sm:p-6 lg:h-full lg:w-1/2 lg:p-8">
        <div className="w-full overflow-hidden rounded-md lg:mb-3 lg:flex-1">
          <img
            src="https://i.giphy.com/JtBZm3Getg3dqxK0zP.webp"
            alt=""
            className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto"
          />
        </div>

        <div className="mt-4 lg:hidden">
          <section className="relative h-fit w-full">
            <InstrumentsMarquee />

            <div className="from-background pointer-events-none absolute top-0 left-0 z-10 h-full w-8 bg-gradient-to-r to-transparent sm:w-10" />
            <div className="from-background pointer-events-none absolute top-0 right-0 z-10 h-full w-8 bg-gradient-to-l to-transparent sm:w-10" />
          </section>
        </div>
      </div>
    </div>
  );
};

const DashboardPreviewSection: FC = () => {
  return (
    <div className="relative flex w-full items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-6xl flex-col">
        <h2 className="heading-2 mb-10 text-center sm:mb-16 lg:mb-24">
          From idea to deployment
        </h2>
        <div
          className="bg-secondary shadow-primary aspect-video w-full rounded-lg"
          style={{
            boxShadow: "0 0 64px 2px #6a6a6a",
          }}
        />
      </div>
    </div>
  );
};

const FeatureSnippetSection: FC = () => {
  return (
    <div className="flex h-full w-full flex-col gap-12 px-4 sm:px-6 lg:gap-4 lg:px-20">
      <div className="flex w-full flex-col-reverse gap-6 md:flex-col lg:h-100 lg:flex-row lg:gap-10">
        <div className="flex w-full flex-col justify-center lg:w-1/2">
          <div>
            <h1 className="heading-1">Lorem Ipsumppp</h1>
            <p>alka hdhd hf jjajaj jf fjdj djdj dj aj a a fjfjf</p>
            <Button className="mt-4 !rounded-full bg-white">Try Now</Button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:py-3">
          <div className="bg-secondary aspect-[4/3] w-full rounded-4xl lg:aspect-auto lg:h-full" />
        </div>
      </div>

      <div className="flex w-full flex-col gap-6 lg:h-100 lg:flex-row lg:gap-10">
        <div className="w-full lg:w-1/2 lg:py-3">
          <div className="bg-secondary aspect-[4/3] w-full rounded-4xl lg:aspect-auto lg:h-full" />
        </div>
        <div className="flex w-full flex-col justify-center lg:w-1/2">
          <div>
            <h1 className="heading-1">Lorem Ipsum</h1>
            <p>alka hdhd hf jjajaj jf fjdj djdj dj aj a a fjfjf</p>
            <Button className="mt-4 !rounded-full bg-white">Try Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQSection: FC = () => {
  const faqs = [
    {
      value: "item-1",
      question: "How does natural language strategy building work?",
      answer:
        "Describe your strategy in plain English, including entries, exits, and risk rules. Vegate interprets the intent behind your prompt, structures the logic, and turns it into a strategy you can refine, test, and deploy from one place.",
    },
    {
      value: "item-2",
      question: "What markets and brokers are supported?",
      answer:
        "Vegate is designed for multi-asset workflows across forex, crypto, metals, and equities. Broker and market support can be expanded over time, while the core experience stays focused on strategy creation, testing, and execution management.",
    },
    {
      value: "item-3",
      question: "Can I backtest before going live?",
      answer:
        "Yes. You can validate ideas against historical data before deploying capital. The platform is built to help you move from concept to evidence, so you can iterate on logic, compare outcomes, and gain confidence before live execution.",
    },
    {
      value: "item-4",
      question: "Do I need to know how to code?",
      answer:
        "No. The product is designed so you can start from intent rather than syntax. You can express ideas naturally, generate a strategy workflow, and manage it visually without needing to write code yourself.",
    },
    {
      value: "item-5",
      question: "Can I edit or refine generated strategies?",
      answer:
        "Yes. Generated strategies are meant to be starting points, not locked outputs. You can tweak assumptions, adjust conditions, refine parameters, and continue iterating until the strategy matches your thesis.",
    },
    {
      value: "item-6",
      question: "Is Vegate only for advanced traders?",
      answer:
        "Not at all. The interface is approachable for newer traders, while still being powerful enough for more experienced users who want a faster way to prototype, test, and manage systematic ideas.",
    },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col items-center text-center sm:mb-12">
          <div className="mb-5 rounded-full border px-4 py-1.5 text-sm tracking-wide uppercase">
            FAQ
          </div>

          <h2 className="heading-2 mb-4 max-w-3xl text-balance">
            Questions, answered in the same clean way the product works
          </h2>

          <p className="text-muted-foreground max-w-2xl text-base sm:text-lg">
            Everything you need to know about turning ideas into live trading
            strategies with Vegate.
          </p>
        </div>

        <div className="from-primary/8 via-primary/4 to-primary/8 rounded-[2rem] border bg-gradient-to-br p-2 sm:p-3">
          <div className="bg-background rounded-[1.5rem] border p-2 sm:p-3">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.value}
                  value={faq.value}
                  className="border-border/70 mb-2 overflow-hidden rounded-3xl border px-4 last:mb-0 sm:px-5"
                >
                  <AccordionTrigger className="group w-full !bg-transparent py-4 text-left text-base font-medium hover:no-underline sm:py-5 sm:text-lg">
                    <div className="flex w-full items-center justify-between gap-4">
                      <span className="pr-2 sm:pr-4">{faq.question}</span>
                      <span className="text-muted-foreground group-data-[state=open]:text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors">
                        <Plus className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-45" />
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="text-muted-foreground max-w-3xl pb-4 text-sm leading-7 sm:pb-5 sm:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
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

const LandingPageNew: FC = () => {
  return (
    <main className="bg-background">
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <section
        className="mb-20 lg:mb-100"
        style={{ minHeight: "calc(100vh - 3rem)" }}
      >
        <HeroSection />
      </section>

      <section className="mb-20 lg:mb-100">
        <DashboardPreviewSection />
      </section>

      <section id="features" className="mb-20 lg:mb-80">
        <FeatureSnippetSection />
      </section>

      <section id="faq" className="mb-20">
        <FAQSection />
      </section>

      <section>
        <FooterSection />
      </section>
    </main>
  );
};

export default LandingPageNew;
