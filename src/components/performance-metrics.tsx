import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { type FC } from "react";

interface PerformanceMetricsProps {
  totalPnl: number;
  returnPercentage: number;
  totalTrades: number;
  sharpeRatio: number;
  maxDrawdown: number;
}

const PerformanceMetrics: FC<PerformanceMetricsProps> = (props) => {
  return (
    <Card className="lg:w-1/5 lg:flex-shrink-0">
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Total P&L</span>
            <span
              className={cn(
                "text-lg font-bold",
                props.totalPnl >= 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400",
              )}
            >
              {props.totalPnl >= 0
                ? `+$${props.totalPnl.toFixed(2)}`
                : `-$${props.totalPnl.toFixed(2).toString().slice(1)}`}
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Return</span>
            <span className="font-semibold">
              {props.returnPercentage >= 0
                ? `+${props.returnPercentage.toFixed(2)}%`
                : `-${props.returnPercentage.toFixed(2).toString().slice(1)}%`}
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Total Trades</span>
            <span className="font-semibold">{props.totalTrades}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Sharpe Ratio</span>
            <span className="font-semibold">{props.sharpeRatio}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Max Drawdown</span>
            <span className="font-semibold text-red-600 dark:text-red-400">
              {props.maxDrawdown}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
