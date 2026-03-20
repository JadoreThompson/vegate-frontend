import { ArrowRight, Check } from "lucide-react";
import { type FC } from "react";
import { Link } from "react-router";

import FAQ from "@/components/faq";
import Layout from "@/components/layouts/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const PricingPageNew: FC = () => {
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

  const faqs = [
    {
      value: "item-1",
      question: "Can I switch plans later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences.",
    },
    {
      value: "item-2",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards and PayPal. Enterprise customers can also pay via invoice.",
    },
    {
      value: "item-3",
      question: "Is there a long-term contract?",
      answer:
        "No, all plans are month-to-month. You can cancel anytime with no penalties or fees.",
    },
    {
      value: "item-4",
      question: "What happens after my free trial?",
      answer:
        "After your 14-day free trial, you'll be charged for your selected plan. You can cancel anytime during the trial at no cost.",
    },
    {
      value: "item-5",
      question: "Do you offer discounts for annual plans?",
      answer:
        "Yes. Save 20% when you pay annually. Contact our sales team for annual pricing details.",
    },
    {
      value: "item-6",
      question: "What brokers do you support?",
      answer:
        "We currently support Alpaca and IG Markets, with additional brokers being added regularly. Check our documentation for the latest list.",
    },
  ];
  return (
    <Layout>
      <section className="border-border/40 relative overflow-hidden border-b pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="text-muted-foreground text-lg">
              Choose the plan that&apos;s right for you. All plans include a
              14-day free trial.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={
                  plan.highlighted
                    ? "border-primary/30 bg-primary/5 relative"
                    : "border-border/40"
                }
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 right-0 left-0 flex justify-center">
                    <span className="bg-primary text-primary-foreground rounded-full px-4 py-1 text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <CardHeader className="pb-6">
                  <h2 className="text-2xl font-bold">{plan.name}</h2>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground mt-3 text-sm">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="flex flex-col">
                  <ul className="mb-8 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={plan.name === "Enterprise" ? "/contact" : "/register"}
                    className="w-full"
                  >
                    <Button
                      className={
                        plan.highlighted
                          ? "bg-primary hover:bg-primary/90 w-full"
                          : "w-full"
                      }
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

          <div className="mx-auto mt-24 max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Frequently asked questions
            </h2>

            <FAQ
              items={faqs}
              title="Frequently asked questions"
              description="Everything you need to know about pricing, billing, and plan changes."
            />
          </div>

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
    </Layout>
  );
};

export default PricingPageNew;
