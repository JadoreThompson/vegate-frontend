import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type FC } from "react";

interface PerformanceMetricsCardProps {
  realisedPnl: number;
  unrealisedPnl: number;
  totalReturnPct: number;
  sharpeRatio: number;
  maxDrawdown: number;
}

const PerformanceMetricsCard: FC<PerformanceMetricsCardProps> = ({
  realisedPnl,
  unrealisedPnl,
  totalReturnPct,
  sharpeRatio,
  maxDrawdown,
}) => {
  const formatPnL = (pnl: number) => {
    const formatted = `$${Math.abs(pnl).toFixed(2)}`;
    return pnl >= 0 ? `+${formatted}` : `-${formatted}`;
  };

  const formatPercentage = (value: number) => {
    const formatted = `${Math.abs(value * 100).toFixed(1)}%`;
    return value >= 0 ? `+${formatted}` : `-${formatted}`;
  };

  return (
    <Card className="bg-secondary gap-0 overflow-hidden border p-1 lg:w-1/5 lg:flex-shrink-0">
      <CardHeader className="p-3">
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent className="bg-secondary-foreground flex-1 rounded-lg border p-3">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Realized P&L</span>
            <span
              className={`text-lg font-bold ${
                realisedPnl >= 0
                  ? "text-emerald-600 dark:text-emerald-600"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {formatPnL(realisedPnl)}
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">
              Unrealized P&L
            </span>
            <span
              className={`font-semibold ${
                unrealisedPnl >= 0
                  ? "text-emerald-600 dark:text-emerald-600"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {formatPnL(unrealisedPnl)}
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Total Return</span>
            <span
              className={`font-semibold ${
                totalReturnPct >= 0
                  ? "text-emerald-600 dark:text-emerald-600"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {formatPercentage(totalReturnPct)}
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Sharpe Ratio</span>
            <span className="font-semibold">{sharpeRatio.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Max Drawdown</span>
            <span className="font-semibold text-red-600 dark:text-red-400">
              {formatPercentage(maxDrawdown)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetricsCard;
