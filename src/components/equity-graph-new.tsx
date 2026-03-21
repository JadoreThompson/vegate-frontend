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

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || payload.length === 0) return null;

  const value = payload[0].value;

  return (
    <div className="rounded-md border bg-white px-3 py-2 text-white shadow-md">
      <div className="text-background text-sm font-bold">
        {formatter.format(value)}
      </div>
      <div className="text-xs text-gray-400">
        {payload[0].payload.displayDate}
      </div>
    </div>
  );
};

const EquityGraphNew: FC<{
  equityData?: EquityCurvePoint[];
  title?: string;
}> = (props) => {
  const equityData = props.equityData ?? [];
  const title = props.title ?? "Equity Curve";
  const hasData = equityData.length > 0;

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
    <Card className="bg-secondary gap-0 overflow-hidden p-1 lg:flex-1">
      <CardHeader className="p-3">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="bg-secondary-foreground flex-1 rounded-lg border p-3">
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="displayDate"
              tick={{ fill: "white", fontSize: 12 }}
              tickSize={10}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              orientation="right"
              //   tick={{ fill: "white" }}
              tick={{ fill: "white", fontSize: 12 }}
              tickSize={10}
              axisLine={false}
              tickLine={false}
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
              //   labelClassName="text-red-500"
              //   formatter={(value: number) => [formatter.format(value)]}
              content={CustomTooltip}
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

export default EquityGraphNew;
