import { Mail, Send } from "lucide-react";
import { useState, type FC } from "react";

import MarketingNavbar from "@/components/layouts/marketing-navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useContactForm } from "@/hooks/queries/public-hooks";
import type { ContactForm } from "@/openapi";

const ContactPage: FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate: submitContactForm, isPending, error } = useContactForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    submitContactForm(formData, {
      onSuccess: () => {
        setShowSuccess(true);
        // Clear form
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
      },
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-background min-h-screen">
      <MarketingNavbar />

      <section className="border-border/40 relative overflow-hidden border-b pt-24 pb-16 sm:pt-32 sm:pb-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="from-background absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              <Mail className="h-4 w-4" />
              Get in Touch
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Contact Us
            </h1>
            <p className="text-muted-foreground text-lg">
              Have questions about vegate? We'd love to hear from you.
            </p>
          </div>

          {/* Contact Form */}
          <Card className="border-border/40 mx-auto mt-12 max-w-2xl">
            <CardContent className="p-8">
              {showSuccess && (
                <div className="mb-6 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                        Message Sent Successfully!
                      </p>
                      <p className="mt-1 text-sm text-emerald-600/80 dark:text-emerald-400/80">
                        Thank you for contacting us. We'll get back to you as
                        soon as possible.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
                    <div>
                      <p className="font-semibold text-red-600 dark:text-red-400">
                        Error Sending Message
                      </p>
                      <p className="mt-1 text-sm text-red-600/80 dark:text-red-400/80">
                        {error.message || "Please try again later."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isPending}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Send className="mr-2 h-4 w-4 animate-pulse" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Additional Contact Info */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground text-sm">
              You can also reach us at{" "}
              <a
                href="mailto:support@vegate.com"
                className="font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
              >
                support@vegate.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
