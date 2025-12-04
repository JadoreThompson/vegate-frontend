import { ArrowRight, Check, TrendingUp } from "lucide-react";
import { type FC } from "react";
import { Link } from "react-router";

import MarketingNavbar from "@/components/layouts/marketing-navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const PricingPage: FC = () => {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "per month",
      description: "Perfect for individual traders getting started",
      features: [
        "Up to 5 active strategies",
        "Historical data: 1 year",
        "Backtesting with basic metrics",
        "1 broker connection",
        "Email support",
        "Community access",
      ],
      cta: "Start Free Trial",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$99",
      period: "per month",
      description: "For serious traders who need advanced features",
      features: [
        "Unlimited strategies",
        "Historical data: 10+ years",
        "Advanced backtesting & analytics",
        "Up to 5 broker connections",
        "Priority support",
        "API access",
        "Real-time execution logs",
        "Replay mode",
        "Custom indicators",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For teams and institutions with specialized needs",
      features: [
        "Everything in Pro",
        "Unlimited broker connections",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantees",
        "White-label options",
        "On-premise deployment",
        "Team collaboration tools",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      <MarketingNavbar />

      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="text-muted-foreground text-lg">
              Choose the plan that's right for you. All plans include a 14-day
              free trial.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative flex flex-col ${
                  plan.highlighted
                    ? "border-emerald-500 shadow-lg shadow-emerald-500/20 dark:shadow-emerald-500/10"
                    : "border-border/40"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 right-0 left-0 flex justify-center">
                    <span className="rounded-full bg-emerald-500 px-4 py-1 text-sm font-medium text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <CardHeader className="pt-6 pb-8">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground mt-3 text-sm">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col">
                  <ul className="mb-8 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/register" className="w-full">
                    <Button
                      className={`w-full ${
                        plan.highlighted
                          ? "bg-emerald-600 hover:bg-emerald-700"
                          : ""
                      }`}
                      variant={plan.highlighted ? "default" : "outline"}
                      size="lg"
                    >
                      {plan.cta}
                      {plan.name !== "Enterprise" && (
                        <ArrowRight className="ml-2 h-4 w-4" />
                      )}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mx-auto mt-24 max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Frequently asked questions
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  Can I switch plans later?
                </h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time.
                  Changes take effect immediately, and we'll prorate any
                  differences.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  What payment methods do you accept?
                </h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards (Visa, Mastercard, American
                  Express) and PayPal. Enterprise customers can also pay via
                  invoice.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  Is there a long-term contract?
                </h3>
                <p className="text-muted-foreground">
                  No, all plans are month-to-month. You can cancel anytime with
                  no penalties or fees.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  What happens after my free trial?
                </h3>
                <p className="text-muted-foreground">
                  After your 14-day free trial, you'll be charged for your
                  selected plan. You can cancel anytime during the trial at no
                  cost.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  Do you offer discounts for annual plans?
                </h3>
                <p className="text-muted-foreground">
                  Yes! Save 20% when you pay annually. Contact our sales team
                  for annual pricing details.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  What brokers do you support?
                </h3>
                <p className="text-muted-foreground">
                  We currently support Alpaca and IG Markets, with additional
                  brokers being added regularly. Check our documentation for the
                  latest list.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 text-center">
            <h2 className="mb-4 text-3xl font-bold">Still have questions?</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Our team is here to help you find the right plan.
            </p>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-border/40 border-t py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">vegate</span>
              </div>
              <p className="text-muted-foreground text-sm">
                AI-powered algorithmic trading for everyone.
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Product</h3>
              <ul className="text-muted-foreground space-y-2 text-sm">
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
              <ul className="text-muted-foreground space-y-2 text-sm">
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
              <ul className="text-muted-foreground space-y-2 text-sm">
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

          <div className="border-border/40 text-muted-foreground mt-12 border-t pt-8 text-center text-sm">
            © 2024 vegate. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;
