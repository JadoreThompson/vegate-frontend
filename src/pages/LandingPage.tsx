import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  ChevronRight,
  Code2,
  LineChart,
  Play,
  RefreshCw,
  Rocket,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { type FC } from "react";
import { Link } from "react-router";

import MarketingNavbar from "@/components/layouts/marketing-navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import WebsiteLogo from "@/components/website-logo";

const LandingPage: FC = () => {
  return (
    <div className="bg-background min-h-screen">
      <MarketingNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-28">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-500/20 via-teal-500/10 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-purple-500/10 to-transparent blur-3xl" />
          <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-blue-500/10 to-transparent blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Social Proof Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-600 backdrop-blur-sm dark:text-emerald-400">
              <Users className="h-4 w-4" />
              Used by 2,500+ Traders Worldwide
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
              Turn Your Strategy Ideas Into
              <br />
              <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Trading Algorithms
              </span>
            </h1>

            <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg sm:text-xl">
              Describe your trading strategy in plain English. Our AI converts
              it to code, backtests it against historical data, and deploys it
              to your broker—all in minutes.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/register">
                <Button
                  size="lg"
                  className="h-14 bg-emerald-600 px-8 text-base font-semibold shadow-lg shadow-emerald-500/25 hover:bg-emerald-700"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="#how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border/60 hover:bg-accent h-14 px-8 text-base font-semibold"
                >
                  See How It Works
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="text-muted-foreground mt-12 flex flex-wrap items-center justify-center gap-6 text-sm sm:gap-10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                Free 14-day trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                Cancel anytime
              </div>
            </div>
          </div>

          {/* Hero Visual - Strategy Builder Mockup */}
          <div className="relative mx-auto mt-20 max-w-5xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 blur-xl" />
            <div className="border-border/50 bg-card/80 relative overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-sm">
              {/* Mock Window Header */}
              <div className="border-border/50 bg-muted/50 flex items-center gap-2 border-b px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <div className="h-3 w-3 rounded-full bg-green-400/80" />
                </div>
                <span className="text-muted-foreground ml-4 text-xs">
                  vegate — Strategy Builder
                </span>
              </div>

              {/* Mock Content */}
              <div className="grid gap-0 md:grid-cols-2">
                {/* Left: Natural Language Input */}
                <div className="border-border/30 border-r p-6">
                  <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm font-medium">
                    <Sparkles className="h-4 w-4 text-emerald-500" />
                    Natural Language Input
                  </div>
                  <div className="bg-background/60 border-border/40 rounded-lg border p-4">
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      "Buy when the 20-day moving average crosses above the
                      50-day moving average on SPY. Set a stop loss at 2% and
                      take profit at 5%. Only trade during market hours."
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    <span className="text-muted-foreground text-xs">
                      AI Processing...
                    </span>
                  </div>
                </div>

                {/* Right: Generated Code */}
                <div className="bg-[#0d1117] p-6">
                  <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm font-medium">
                    <Code2 className="h-4 w-4 text-cyan-400" />
                    Generated Algorithm
                  </div>
                  <pre className="overflow-hidden font-mono text-xs leading-relaxed text-green-400">
                    {`def strategy(data):
    sma_20 = data.close.rolling(20).mean()
    sma_50 = data.close.rolling(50).mean()
    
    if sma_20[-1] > sma_50[-1]:
        if sma_20[-2] <= sma_50[-2]:
            return Order(
                symbol="SPY",
                side="BUY",
                stop_loss=0.02,
                take_profit=0.05
            )`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="border-border/40 border-t py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="border-border/60 bg-muted/50 text-muted-foreground mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium">
              How It Works
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              From Idea to Live Trading in{" "}
              <span className="text-emerald-500">4 Simple Steps</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Transform your trading strategies into automated algorithms
              without writing a single line of code.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {/* Step 1 */}
            <Card className="border-border/40 bg-card/50 group relative overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50">
              <CardContent className="p-6">
                <div className="text-muted-foreground/10 absolute top-4 right-4 text-6xl font-bold">
                  1
                </div>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
                  <Bot className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  Describe Your Strategy
                </h3>
                <p className="text-muted-foreground text-sm">
                  Write your trading strategy in natural language. No coding
                  knowledge required.
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border-border/40 bg-card/50 group relative overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50">
              <CardContent className="p-6">
                <div className="text-muted-foreground/10 absolute top-4 right-4 text-6xl font-bold">
                  2
                </div>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 ring-1 ring-cyan-500/20">
                  <Code2 className="h-6 w-6 text-cyan-500" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  AI Generates Code
                </h3>
                <p className="text-muted-foreground text-sm">
                  Our AI converts your description into production-ready trading
                  algorithms.
                </p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border-border/40 bg-card/50 group relative overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50">
              <CardContent className="p-6">
                <div className="text-muted-foreground/10 absolute top-4 right-4 text-6xl font-bold">
                  3
                </div>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 ring-1 ring-purple-500/20">
                  <BarChart3 className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  Backtest & Optimize
                </h3>
                <p className="text-muted-foreground text-sm">
                  Test against years of historical data. Optimize parameters for
                  maximum performance.
                </p>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="border-border/40 bg-card/50 group relative overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50">
              <CardContent className="p-6">
                <div className="text-muted-foreground/10 absolute top-4 right-4 text-6xl font-bold">
                  4
                </div>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 ring-1 ring-orange-500/20">
                  <Rocket className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Deploy or Replay</h3>
                <p className="text-muted-foreground text-sm">
                  Go live with your broker or use Replay Mode to visualize
                  historical trades.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      <section className="border-border/40 bg-muted/20 border-t py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="border-border/60 bg-muted/50 text-muted-foreground mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium">
              Features
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Powerful Tools for{" "}
              <span className="text-emerald-500">Smarter Trading</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to build, test, and deploy algorithmic trading
              strategies.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 - Large Card */}
            <Card className="border-border/40 bg-card/50 group overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 md:col-span-2">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  <div className="p-8">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
                      <Sparkles className="h-6 w-6 text-emerald-500" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">
                      Natural Language Strategies
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Describe your trading strategy in plain English. Our AI
                      understands complex conditions, indicators, and risk
                      management rules.
                    </p>
                    <ul className="text-muted-foreground space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        Support for 50+ technical indicators
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        Multi-asset strategies
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        Complex entry/exit conditions
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-center bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-6">
                    <div className="bg-background/80 border-border/40 w-full max-w-xs rounded-lg border p-4 shadow-lg">
                      <p className="text-foreground/80 text-sm italic">
                        "Enter long when RSI drops below 30 and MACD crosses
                        bullish. Exit at 3% profit or 1.5% loss."
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Bot className="h-4 w-4 text-emerald-500" />
                        <span className="text-muted-foreground text-xs">
                          Parsed successfully
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-border/40 bg-card/50 group backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 ring-1 ring-purple-500/20">
                  <RefreshCw className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Replay Mode</h3>
                <p className="text-muted-foreground mb-4">
                  Visualize your strategy's trades on historical candlestick
                  charts. See exactly when and where orders were placed.
                </p>
                <div className="bg-muted/50 border-border/30 rounded-lg border p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Play className="h-4 w-4 text-purple-500" />
                    <span className="text-muted-foreground">
                      Step through trades frame-by-frame
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-border/40 bg-card/50 group backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 ring-1 ring-blue-500/20">
                  <BarChart3 className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Advanced Backtesting
                </h3>
                <p className="text-muted-foreground mb-4">
                  Test your strategies against years of historical market data
                  with realistic slippage and commission modeling.
                </p>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-muted/50 border-border/30 rounded-lg border p-2">
                    <p className="text-lg font-bold text-emerald-500">+156%</p>
                    <p className="text-muted-foreground text-xs">Returns</p>
                  </div>
                  <div className="bg-muted/50 border-border/30 rounded-lg border p-2">
                    <p className="text-lg font-bold text-blue-500">1.85</p>
                    <p className="text-muted-foreground text-xs">Sharpe</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-border/40 bg-card/50 group backdrop-blur-sm transition-all duration-300 hover:border-orange-500/30">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 ring-1 ring-orange-500/20">
                  <Rocket className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Live Deployment</h3>
                <p className="text-muted-foreground mb-4">
                  Deploy directly to Alpaca, IG, and other major brokers.
                  Real-time monitoring and instant control.
                </p>
                <div className="flex gap-2">
                  <div className="bg-muted/50 border-border/30 flex-1 rounded-lg border p-2 text-center">
                    <p className="text-xs font-medium">Alpaca</p>
                  </div>
                  <div className="bg-muted/50 border-border/30 flex-1 rounded-lg border p-2 text-center">
                    <p className="text-xs font-medium">IG</p>
                  </div>
                  <div className="bg-muted/50 border-border/30 flex-1 rounded-lg border p-2 text-center">
                    <p className="text-xs font-medium">+ More</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="border-border/40 bg-card/50 group backdrop-blur-sm transition-all duration-300 hover:border-teal-500/30">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 ring-1 ring-teal-500/20">
                  <LineChart className="h-6 w-6 text-teal-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Performance Analytics
                </h3>
                <p className="text-muted-foreground mb-4">
                  Track every metric that matters. Sharpe ratio, max drawdown,
                  win rate, profit factor, and more.
                </p>
                <div className="flex h-16 items-end justify-around rounded-lg bg-gradient-to-r from-teal-500/20 to-emerald-500/20 p-2">
                  {[40, 65, 35, 80, 55, 90, 70].map((h, i) => (
                    <div
                      key={i}
                      className="w-4 rounded-t bg-teal-500/60"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="border-border/40 bg-card/50 group backdrop-blur-sm transition-all duration-300 hover:border-pink-500/30">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 ring-1 ring-pink-500/20">
                  <Zap className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Real-Time Logs</h3>
                <p className="text-muted-foreground mb-4">
                  Complete transparency with live execution logs. Every trade,
                  every decision, fully visible.
                </p>
                <div className="border-border/30 rounded-lg border bg-[#0d1117] p-2 font-mono text-xs">
                  <p className="text-green-400">✓ Order filled: BUY SPY</p>
                  <p className="text-blue-400">→ Stop loss set: $445.20</p>
                  <p className="text-muted-foreground">Watching...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="border-border/40 border-t py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by Traders{" "}
              <span className="text-emerald-500">Worldwide</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of traders who've transformed their strategies with
              vegate.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "vegate transformed how I trade. I went from spending hours coding to describing strategies in plain English. Game changer.",
                name: "Sarah Chen",
                role: "Quantitative Trader",
                color: "emerald",
              },
              {
                quote:
                  "The backtesting features are incredible. I can test years of data in seconds and optimize my strategies with confidence.",
                name: "Marcus Rodriguez",
                role: "Independent Trader",
                color: "blue",
              },
              {
                quote:
                  "Finally, a platform that makes algorithmic trading accessible. The replay feature alone is worth the subscription.",
                name: "Alex Thompson",
                role: "Hedge Fund Analyst",
                color: "purple",
              },
            ].map((testimonial, i) => (
              <Card
                key={i}
                className="border-border/40 bg-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, j) => (
                      <span key={j}>★</span>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full bg-${testimonial.color}-500/20`}
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-muted-foreground text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-border/40 bg-muted/20 border-t py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="border-border/60 bg-muted/50 text-muted-foreground mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium">
              FAQ
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              We've Got the Answers
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about vegate
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            <AccordionItem
              value="item-1"
              className="border-border/40 bg-card/50 rounded-lg border px-4"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                How does natural language strategy building work?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Simply describe your trading strategy in plain English—including
                entry conditions, exit rules, and risk management. Our AI
                analyzes your description, identifies technical indicators and
                logic, and generates production-ready trading code that you can
                backtest or deploy immediately.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border-border/40 bg-card/50 rounded-lg border px-4"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                What brokers are supported for live trading?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We currently support Alpaca for US equity trading and IG for
                forex and CFDs. We're actively working on integrating more
                brokers including Interactive Brokers and TD Ameritrade. Paper
                trading is available on all supported brokers for testing.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border-border/40 bg-card/50 rounded-lg border px-4"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                How accurate is the backtesting?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Our backtesting engine uses tick-level historical data when
                available and models realistic slippage, commissions, and market
                impact. We provide detailed performance metrics including Sharpe
                ratio, maximum drawdown, win rate, and profit factor.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="border-border/40 bg-card/50 rounded-lg border px-4"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                What is Replay Mode?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Replay Mode lets you visualize your strategy's historical trades
                on candlestick charts. You can step through time
                candle-by-candle to see exactly when and where your strategy
                would have placed orders, helping you understand and refine your
                approach.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="border-border/40 bg-card/50 rounded-lg border px-4"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                Can I use my own code?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! While our natural language interface is the easiest way to
                get started, you can also write custom Python code for full
                control. You can even use the AI-generated code as a starting
                point and customize it to your needs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-6"
              className="border-border/40 bg-card/50 rounded-lg border px-4"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                Is there a free trial?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! We offer a free 14-day trial with full access to all
                features—no credit card required. You can create strategies,
                backtest them, and even paper trade to experience the full
                platform before committing.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-border/40 border-t py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="relative px-8 py-20 text-center sm:px-16">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Ready to Trade Smarter?
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-lg text-white/80">
                Join traders worldwide who trust vegate to transform their
                strategy ideas into profitable algorithms.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/register">
                  <Button
                    size="lg"
                    className="h-14 bg-white px-10 text-base font-semibold text-emerald-600 shadow-lg hover:bg-gray-100"
                  >
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 border-white/40 px-10 text-base font-semibold text-white hover:bg-white/10"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-border/40 border-t py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
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

          <div className="border-border/40 text-muted-foreground mt-12 border-t pt-8 text-center text-sm">
            © {new Date().getFullYear()} vegate. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
