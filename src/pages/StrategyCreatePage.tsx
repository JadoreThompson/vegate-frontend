import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import WebsiteLogo from "@/components/website-logo";
import { useCreateStrategy } from "@/hooks/queries/strategy-hooks";
import {
  ArrowUp,
  CircleQuestionMark,
  Lightbulb,
  RotateCw,
  Zap,
} from "lucide-react";
import { useState, type FC } from "react";
import { useNavigate } from "react-router";

const strategyTips = [
  {
    title: "Be specific",
    description:
      'Include exact indicator parameters (e.g., "RSI(14)" not just "RSI").',
  },
  {
    title: "Define clear rules",
    description: "State exact entry and exit conditions with numbers.",
  },
  {
    title: "Include risk management",
    description: "Specify position size, stop loss, and take profit levels.",
  },
  {
    title: "Add filters",
    description:
      "Mention timeframes, trading hours, or market conditions if relevant.",
  },
];

const TipsContent: FC = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Lightbulb className="text-primary h-4 w-4" />
        <div className="text-foreground text-sm font-semibold tracking-tight">
          Tips for Better Results
        </div>
      </div>

      <Separator className="bg-border/60" />

      <div className="space-y-3">
        {strategyTips.map((tip) => (
          <div key={tip.title} className="flex items-start gap-2.5">
            <Zap className="text-primary mt-0.5 h-4 w-4 shrink-0" />
            <p className="text-muted-foreground text-sm leading-6">
              <span className="text-foreground font-medium">{tip.title}:</span>
              {tip.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const StrategyCreatePage: FC = () => {
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const createStrategyMutation = useCreateStrategy();

  const handleGenerate = async () => {
    setError(null);

    if (!name.trim() || !prompt.trim()) {
      setError("Please provide both a strategy name and prompt.");
      return;
    }

    try {
      const result = await createStrategyMutation.mutateAsync({
        name: name.trim(),
        prompt: prompt.trim(),
      });

      navigate(`/strategies/${result.strategy_id}`);
    } catch (err: any) {
      setError(err.message || "An error occurred while creating the strategy.");
    }
  };

  return (
    <>
      <DashboardLayout>
        <TooltipProvider delayDuration={150}>
          <div className="flex h-full w-full items-center justify-center px-4">
            <div className="w-3xl">
              <div className="border-border/60 bg-input/30 relative mb-3 w-full rounded-2xl border p-3 shadow-sm backdrop-blur">
                <div className="">
                  <h4 className="text-muted-foreground pl-3 text-sm">
                    Strategy Name
                  </h4>
                  <Input
                    onChange={(e) => setName(e.target.value)}
                    className="h-fit border-none !bg-transparent text-sm focus:border-none focus:!ring-0"
                  ></Input>
                </div>
                <div className="w-full border-t"></div>
                <Textarea
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your strategy..."
                  className="mb-3 max-h-56 min-h-14 resize-none overflow-y-auto border-none !bg-transparent shadow-none focus-visible:ring-0"
                />

                <div className="flex w-full items-center justify-between gap-3">
                  <div className="flex items-center">
                    {/* Desktop: hover tooltip */}
                    <div className="hidden md:block">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground hover:!bg-transparent"
                            aria-label="Show strategy tips"
                          >
                            <CircleQuestionMark className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          align="start"
                          className="border-border/60 bg-card/95 w-[min(26rem,calc(100vw-2rem))] rounded-xl border p-4 shadow-xl backdrop-blur"
                        >
                          <TipsContent />
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    {/* Mobile: tap popover */}
                    <div className="md:hidden">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground !bg-transparent"
                            aria-label="Show strategy tips"
                          >
                            <CircleQuestionMark className="h-5 w-5" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          side="top"
                          align="start"
                          className="border-border/60 bg-background/95 w-[calc(100vw-2rem)] max-w-sm rounded-xl border p-4 shadow-xl backdrop-blur"
                        >
                          <TipsContent />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {createStrategyMutation.isPending ? (
                    <Button
                      type="submit"
                      onClick={() => handleGenerate()}
                      className="!bg-primary h-8 w-8 rounded-full p-0"
                    >
                      <RotateCw className="animation-rotate-360 h-4 w-4 animate-spin [animation-duration:1s]" />
                    </Button>
                  ) : (
                    <Button
                      disabled={!name.trim() && !prompt.trim()}
                      type="submit"
                      onClick={() => handleGenerate()}
                      className="!bg-primary h-8 w-8 rounded-full p-0"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="absolute top-0 left-1/2 flex w-fit -translate-x-1/2 -translate-y-[calc(100%+1rem)] items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="border-primary/70 bg-background/80 mb-5 w-fit rounded-full border px-4 py-1.5 text-sm tracking-wide uppercase backdrop-blur">
                      Create Strategy
                    </div>

                    <div className="flex items-center">
                      <div className="flex h-16 w-16 items-center justify-center">
                        <WebsiteLogo />
                      </div>
                      <span className="text-xl font-bold tracking-tight sm:text-4xl">
                        Vegate
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {error?.trim() && (
                <div className="w-full overflow-hidden rounded-xl border border-red-800 bg-red-900/10 p-3 text-sm text-red-800">
                  {error}
                </div>
              )}
            </div>
          </div>
        </TooltipProvider>
      </DashboardLayout>
    </>
  );
};

export default StrategyCreatePage;
