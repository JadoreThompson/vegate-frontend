import CreateBacktestImg from "@/assets/images/create-backtest.png";
import ManageStrategiesImg from "@/assets/images/manage-strategies.png";
import Bitcoin from "@/assets/images/noir-bitcoin.png";
import Dogecoin from "@/assets/images/noir-dogecoin.png";
import Ethereum from "@/assets/images/noir-ethereum.png";
import EURUSD from "@/assets/images/noir-eurusd.png";
import GBPUSD from "@/assets/images/noir-gbpusd.png";
import USDJPY from "@/assets/images/noir-usdjpy.png";
import XAUUSD from "@/assets/images/noir-xauusd.png";
import DashboardPreviewVideo from "@/assets/videos/preview.mp4";
import { Button } from "@/components/ui/button";

import Layout from "@/components/layouts/layout";

import FAQ from "@/components/faq";
import type { FC } from "react";
import { Link } from "react-router";

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
          className="bg-secondary shadow-primary aspect-video w-full overflow-hidden rounded-lg"
          style={{
            boxShadow: "0 0 64px 2px #6a6a6a",
          }}
        >
          <video
            className="h-full w-full"
            src={DashboardPreviewVideo}
            autoPlay
            muted
          ></video>
        </div>
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
            <h1 className="heading-1">Manage Your Strategies</h1>
            <p className="text-muted-foreground mt-4 text-base sm:text-lg">
              Create, organize, and monitor all your trading strategies in one
              place. Track performance metrics, view equity curves, and manage
              live deployments with a clean, intuitive interface.
            </p>
            <Link to="/register">
              <Button className="mt-6 !rounded-full bg-white text-black hover:bg-white/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:py-3">
          <div className="bg-secondary aspect-[4/3] w-full overflow-hidden rounded-4xl lg:aspect-auto lg:h-full">
            <img
              src={ManageStrategiesImg}
              alt="Manage Strategies Dashboard"
              className="h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-6 lg:h-100 lg:flex-row lg:gap-10">
        <div className="w-full lg:w-1/2 lg:py-3">
          <div className="bg-secondary aspect-[4/3] w-full overflow-hidden rounded-4xl lg:aspect-auto lg:h-full">
            <img
              src={CreateBacktestImg}
              alt="Backtest Your Strategy"
              className="h-full object-cover"
            />
          </div>
        </div>
        <div className="flex w-full flex-col justify-center lg:w-1/2">
          <div>
            <h1 className="heading-1">Backtest Your Strategy</h1>
            <p className="text-muted-foreground mt-4 text-base sm:text-lg">
              Validate your ideas against historical data before risking
              capital. Run comprehensive backtests, analyze performance metrics,
              and refine your approach with confidence.
            </p>
            <Link to="/register">
              <Button className="mt-6 !rounded-full bg-white text-black hover:bg-white/90">
                Start Testing
              </Button>
            </Link>
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
    <FAQ
      items={faqs}
      title="Questions, answered in the same clean way the product works"
      description="Everything you need to know about turning ideas into live trading strategies with Vegate."
    />
  );
};

const LandingPageNew: FC = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default LandingPageNew;
