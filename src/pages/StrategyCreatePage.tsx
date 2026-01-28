import { Lightbulb, Loader2, Sparkles, Zap } from "lucide-react";
import { useState, type FC } from "react";
import { Link, useNavigate } from "react-router";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateStrategy } from "@/hooks/queries/strategy-hooks";

const StrategyCreatePage: FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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
        description: description.trim() || undefined,
        prompt: prompt.trim(),
      });

      navigate(`/strategies/${result.strategy_id}`);
    } catch (err: any) {
      setError(err.message || "An error occurred while creating the strategy.");
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Create New Strategy
          </h2>
          <p className="text-muted-foreground">
            Describe your trading strategy in plain English, and we'll convert
            it into executable code.
          </p>
        </div>

        {/* Main Input Card */}
        <Card className="border-0 bg-transparent">
          <CardContent className="space-y-4 p-0">
            <div className="space-y-2">
              <Label htmlFor="strategy-name">Strategy Name</Label>
              <Input
                id="strategy-name"
                placeholder="e.g., RSI Mean Reversion"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
              />
              <p className="text-muted-foreground text-sm">
                Give your strategy a descriptive name (max 20 characters).
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="strategy-description">
                Description (Optional)
              </Label>
              <Input
                id="strategy-description"
                placeholder="Brief description of your strategy"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="strategy-prompt">Strategy Prompt</Label>
              <Textarea
                id="strategy-prompt"
                placeholder="Example: Buy when RSI drops below 30 and MACD crosses above signal line. Sell when price reaches 3% profit or 1.5% loss. Trade only between 9:30 AM and 3:30 PM EST on SPY..."
                className="min-h-[200px] resize-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <p className="text-muted-foreground text-sm">
                Be as detailed as possible. Include entry conditions, exit
                rules, position sizing, and any time or market filters.
              </p>
            </div>

            {error && (
              <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}

            <div className="flex items-center gap-4">
              <Button
                onClick={handleGenerate}
                disabled={
                  !name.trim() ||
                  !prompt.trim() ||
                  createStrategyMutation.isPending
                }
                className="bg-emerald-600 hover:bg-emerald-700"
                size="lg"
              >
                {createStrategyMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Strategy
                  </>
                )}
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/strategies">Cancel</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="border-emerald-500/20 bg-emerald-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Lightbulb className="h-5 w-5 text-emerald-500" />
              Tips for Better Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Zap className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                <span>
                  <strong>Be specific:</strong> Include exact indicator
                  parameters (e.g., "RSI(14)" not just "RSI")
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                <span>
                  <strong>Define clear rules:</strong> State exact entry and
                  exit conditions with numbers
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                <span>
                  <strong>Include risk management:</strong> Specify position
                  size, stop loss, and take profit levels
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                <span>
                  <strong>Add filters:</strong> Mention timeframes, trading
                  hours, or market conditions if relevant
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StrategyCreatePage;
