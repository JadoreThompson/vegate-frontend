import { Plus } from "lucide-react";
import type { FC } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQItem = {
  value: string;
  question: string;
  answer: string;
};

interface FAQProps {
  items: FAQItem[];
  badge?: string;
  title: string;
  description?: string;
  className?: string;
}

const FAQ: FC<FAQProps> = ({
  items,
  badge = "FAQ",
  title,
  description,
  className = "",
}) => {
  return (
    <section className={`px-4 py-20 sm:px-6 sm:py-24 lg:px-20 ${className}`}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col items-center text-center sm:mb-12">
          <div className="mb-5 rounded-full border px-4 py-1.5 text-sm tracking-wide uppercase">
            {badge}
          </div>

          <h2 className="heading-2 mb-4 max-w-3xl text-balance">{title}</h2>

          {description && (
            <p className="text-muted-foreground max-w-2xl text-base sm:text-lg">
              {description}
            </p>
          )}
        </div>

        <div className="from-primary/8 via-primary/4 to-primary/8 rounded-[2rem] border bg-gradient-to-br p-2 sm:p-3">
          <div className="bg-background rounded-[1.5rem] border p-2 sm:p-3">
            <Accordion type="single" collapsible className="w-full">
              {items.map((faq) => (
                <AccordionItem
                  key={faq.value}
                  value={faq.value}
                  className="border-border/70 mb-2 overflow-hidden rounded-3xl border px-4 last:mb-0 sm:px-5"
                >
                  <AccordionTrigger className="group w-full !bg-transparent py-4 text-left text-base font-medium hover:no-underline sm:py-5 sm:text-lg [&>svg]:hidden">
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

export default FAQ;
