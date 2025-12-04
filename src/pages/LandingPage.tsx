import {
    ArrowRight,
    BarChart3,
    Bot,
    CheckCircle2,
    ChevronRight,
    LineChart,
    PlayCircle,
    Sparkles,
    TrendingUp,
    Zap,
} from "lucide-react";
import { type FC } from "react";
import { Link } from "react-router";

import MarketingNavbar from "@/components/layouts/marketing-navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const LandingPage: FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40 pt-24 pb-16 sm:pt-32 sm:pb-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              <Sparkles className="h-4 w-4" />
              AI-Powered Trading Platform
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Describe your strategy.
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-400">
                Start trading.
              </span>
            </h1>
            <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
              Transform natural language into executable trading strategies.
              Backtest, optimize, and deploy to your broker in minutes—no coding
              required.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/register">
                <Button
                  size="lg"
                  className="h-12 bg-emerald-600 px-8 text-base hover:bg-emerald-700"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/features">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base"
                >
                  See How It Works
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
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

          {/* Hero Image/Demo */}
          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-8">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="mx-auto mb-4 h-16 w-16 text-emerald-500" />
                    <p className="text-lg font-medium text-muted-foreground">
                      Platform Demo Preview
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-border/40 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to trade smarter
            </h2>
            <p className="text-lg text-muted-foreground">
              From strategy creation to live deployment, vegate provides all the
              tools professional traders need.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <Card className="border-border/40">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                  <Bot className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Natural Language Strategies
                </h3>
                <p className="text-muted-foreground">
                  Describe your trading strategy in plain English. Our AI
                  converts it into executable code instantly.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-border/40">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Advanced Backtesting
                </h3>
                <p className="text-muted-foreground">
                  Test your strategies against years of historical data.
                  Visualize performance with detailed metrics and charts.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-border/40">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                  <PlayCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Live Deployment</h3>
                <p className="text-muted-foreground">
                  Deploy directly to Alpaca, IG, and other major brokers. Real-time
                  monitoring and instant control.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-border/40">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
                  <LineChart className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Performance Analytics
                </h3>
                <p className="text-muted-foreground">
                  Track every metric that matters. Sharpe ratio, max drawdown,
                  win rate, and more.
                </p>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="border-border/40">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500/10">
                  <Zap className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Replay Mode
                </h3>
                <p className="text-muted-foreground">
                  Step through historical trades candle by candle. See exactly
                  when and why your strategy acted.
                </p>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="border-border/40">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal-500/10">
                  <TrendingUp className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Real-Time Logs
                </h3>
                <p className="text-muted-foreground">
                  Complete transparency with live execution logs. Every trade,
                  every decision, fully visible.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="border-b border-border/40 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by traders worldwide
            </h2>
            <p className="mb-12 text-lg text-muted-foreground">
              Join thousands of traders who've transformed their strategies with
              vegate.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-border/40">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="mb-4 text-muted-foreground">
                  "vegate transformed how I trade. I went from spending hours
                  coding to describing strategies in plain English. Game changer."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/20" />
                  <div>
                    <p className="font-semibold">Sarah Chen</p>
                    <p className="text-sm text-muted-foreground">
                      Quantitative Trader
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="mb-4 text-muted-foreground">
                  "The backtesting features are incredible. I can test years of
                  data in seconds and optimize my strategies with confidence."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-500/20" />
                  <div>
                    <p className="font-semibold">Marcus Rodriguez</p>
                    <p className="text-sm text-muted-foreground">
                      Independent Trader
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="mb-4 text-muted-foreground">
                  "Finally, a platform that makes algorithmic trading accessible.
                  The replay feature alone is worth the subscription."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-500/20" />
                  <div>
                    <p className="font-semibold">Alex Thompson</p>
                    <p className="text-sm text-muted-foreground">
                      Hedge Fund Analyst
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-16 text-center shadow-xl sm:px-16">
            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Ready to start trading smarter?
              </h2>
              <p className="mb-8 text-lg text-emerald-50">
                Join vegate today and transform your trading strategies.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/register">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="h-12 bg-white px-8 text-base text-emerald-600 hover:bg-gray-100"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 border-white px-8 text-base text-white hover:bg-white/10"
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
      <footer className="border-t border-border/40 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">vegate</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered algorithmic trading for everyone.
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/features" className="hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/docs" className="hover:text-foreground">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/about" className="hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/privacy" className="hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-foreground">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            © 2024 vegate. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;