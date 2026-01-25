import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type EquityCurvePoint } from "@/openapi";
import { BarChart3 } from "lucide-react";
import { type FC } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const EquityGraph: FC<{
  equityData?: EquityCurvePoint[];
  title?: string;
}> = (props) => {
  const equityData = props.equityData ?? [];
  const title = props.title ?? "Equity Curve";
  const hasData = equityData.length > 0;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // Transform data for Recharts
  const chartData = equityData
    .map((point) => ({
      date: new Date(point.timestamp).getTime(),
      value: point.value,
      displayDate: new Date(point.timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    }))
    .sort((a, b) => a.date - b.date);

  if (!hasData) {
    return (
      <Card className="lg:flex-1">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground flex h-[400px] items-center justify-center">
            <div className="text-center">
              <BarChart3 className="mx-auto mb-4 h-12 w-12 opacity-20" />
              <p>No data available</p>
              <p className="text-sm">Equity curve data will appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="lg:flex-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="90%" height={400}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="displayDate"
              className="text-xs text-white"
              tick={{ fill: "white" }}
            />
            <YAxis
              className="!text-primary text-xs"
              tick={{ fill: "white" }}
              tickFormatter={(value: number) => {
                const roundedValue = Math.round(value);
                let res: string;

                if (roundedValue >= 1_000_000) {
                  res = `${Math.floor(roundedValue / 1_000_000)}M`;
                } else if (roundedValue >= 1000 && roundedValue < 1_000_000) {
                  res = `${Math.floor(roundedValue / 1000)}k`;
                } else {
                  res = roundedValue.toString();
                }

                return res;
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--background)",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: number) => [formatter.format(value), "Equity"]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default EquityGraph;
