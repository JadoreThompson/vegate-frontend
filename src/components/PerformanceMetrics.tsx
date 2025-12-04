import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type FC } from "react";

interface PerformanceMetricsProps {
  totalPnl: number;
  returnPercentage: number;
  totalTrades: number;
  winRate: number;
  avgWin: number;
  avgLoss: number;
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
            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              +${props.totalPnl.toFixed(0)}
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Return</span>
            <span className="font-semibold">+{props.returnPercentage}%</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Total Trades</span>
            <span className="font-semibold">{props.totalTrades}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Win Rate</span>
            <span className="font-semibold">{props.winRate}%</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Avg Win</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              +{props.avgWin}%
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Avg Loss</span>
            <span className="font-semibold text-red-600 dark:text-red-400">
              {props.avgLoss}%
            </span>
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
