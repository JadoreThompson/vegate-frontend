import Bitcoin from "@/assets/images/noir-bitcoin.png";
import Dogecoin from "@/assets/images/noir-dogecoin.png";
import Ethereum from "@/assets/images/noir-ethereum.png";
import EURUSD from "@/assets/images/noir-eurusd.png";
import GBPUSD from "@/assets/images/noir-gbpusd.png";
import USDJPY from "@/assets/images/noir-usdjpy.png";
import XAUUSD from "@/assets/images/noir-xauusd.png";

import WebsiteLogo from "@/components/website-logo";
import type { FC } from "react";
import { Link } from "react-router";

const Header: FC = () => {
  return (
    <header className="bg-background flex h-12 border-b-1 p-1">
      {/* Logo */}
      <Link to="/" className="mr-12 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center">
          <WebsiteLogo className="" />
        </div>
        <span className="text-xl font-bold tracking-tight">Vegate</span>
      </Link>

      <div className="flex items-center gap-8">
        <div className="hover:text-primary">Features</div>
        <div className="hover:text-primary">Pricing</div>
        <div className="hover:text-primary">Docs</div>
        <div className="hover:text-primary">Support</div>
      </div>
    </header>
  );
};

const HeroSection: FC = () => {
  return (
    <div className="flex h-full w-full">
      <div className="relative flex h-full w-1/2 overflow-hidden px-4">
        <div className="flex h-full items-center overflow-hidden pb-36">
          <div className="flex flex-col overflow-hidden">
            <h1 className="mb-10 text-6xl">
              Turn your <span className="text-primary">thoughts</span> into{" "}
              <span className="text-primary"> strategy</span>
            </h1>
            <p className="text-lg text-gray-400">
              Transform your intents, beliefs and ideas into live strategies.
              <br />
              Manage and generate strategies all in one platform.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full px-4 pb-8">
          <section className="relative h-fit w-full">
            <div className="marquee">
              <div className="marquee-track">
                {/* Original */}
                <div className="marquee-item flex h-32 w-32 items-center justify-center">
                  <img src={EURUSD} alt="" />
                </div>
                <div className="marquee-item flex h-32 w-32 items-center justify-center">
                  <img src={GBPUSD} alt="" />
                </div>
                <div className="marquee-item flex h-32 w-32 items-center justify-center">
                  <img src={USDJPY} alt="" />
                </div>
                <div className="marquee-item flex h-32 w-32 items-center justify-center">
                  <img src={XAUUSD} alt="" />
                </div>
                <div className="marquee-item flex h-32 w-32 items-center justify-center">
                  <img src={Bitcoin} alt="" />
                </div>
                <div className="marquee-item flex h-32 w-32 items-center justify-center">
                  <img src={Ethereum} alt="" />
                </div>
                <div className="marquee-item flex h-32 w-32 items-center justify-center">
                  <img src={Dogecoin} alt="" />
                </div>

                {/* Duplicates */}
                <div className="marquee-item flex h-32 w-32 items-center justify-center">
                  <img src={EURUSD} alt="" />
                </div>
                <div className="marquee-item flex h-32 w-32 items-center justify-center">
                  <img src={GBPUSD} alt="" />
                </div>
                <div className="marquee-item flex h-32 w-32 items-center justify-center">
                  <img src={USDJPY} alt="" />
                </div>
                <div className="marquee-item flex h-32 w-32 items-center justify-center">
                  <img src={XAUUSD} alt="" />
                </div>
                <div className="marquee-item flex h-32 w-32 items-center justify-center">
                  <img src={Bitcoin} alt="" />
                </div>
                <div className="marquee-item flex h-32 w-32 items-center justify-center">
                  <img src={Ethereum} alt="" />
                </div>
                <div className="marquee-item flex h-32 w-32 items-center justify-center">
                  <img src={Dogecoin} alt="" />
                </div>
              </div>
            </div>

            <div className="from-background pointer-events-none absolute top-0 left-0 z-10 h-full w-10 bg-gradient-to-r to-transparent lg:w-40" />
            <div className="from-background pointer-events-none absolute top-0 right-0 z-10 h-full w-10 bg-gradient-to-l to-transparent lg:w-40" />
          </section>
        </div>
      </div>

      <div className="flex h-full w-1/2 flex-col p-8">
        <div className="mb-3 w-full flex-1 overflow-hidden rounded-md">
          <img
            src="https://i.giphy.com/JtBZm3Getg3dqxK0zP.webp"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const LandingPageNew: FC = () => {
  return (
    <>
      <div className="sticky">
        <Header />
      </div>

      <section className="mb-20" style={{ height: "calc(100vh - 3rem)" }}>
        <HeroSection />
      </section>
    </>
  );
};

export default LandingPageNew;
