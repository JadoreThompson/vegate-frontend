import { BarChart3 } from "lucide-react";
import { type FC } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DataPoint {
  timestamp: string | number;
  value: number;
}

interface EquityGraphProps {
  equityData?: DataPoint[];
  drawdownData?: DataPoint[];
  title?: string;
}

const EquityGraph: FC<EquityGraphProps> = (props) => {
  const equityData = props.equityData ?? [];
  const drawdownData = props.drawdownData ?? [];
  const title = props.title ?? "Equity Curve";
  // Combine equity and drawdown data by timestamp
  const combinedData = () => {
    const dataMap = new Map<
      string | number,
      { timestamp: string | number; equity?: number; drawdown?: number }
    >();

    equityData.forEach((point) => {
      dataMap.set(point.timestamp, {
        timestamp: point.timestamp,
        equity: point.value,
      });
    });

    drawdownData.forEach((point) => {
      const existing = dataMap.get(point.timestamp);
      if (existing) {
        existing.drawdown = point.value;
      } else {
        dataMap.set(point.timestamp, {
          timestamp: point.timestamp,
          drawdown: point.value,
        });
      }
    });

    return Array.from(dataMap.values()).sort((a, b) => {
      if (typeof a.timestamp === "string" && typeof b.timestamp === "string") {
        return a.timestamp.localeCompare(b.timestamp);
      }
      return Number(a.timestamp) - Number(b.timestamp);
    });
  };

  const chartData = combinedData();
  const hasData = chartData.length > 0;

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
              <p className="text-sm">
                Equity and drawdown data will appear here
              </p>
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
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="timestamp"
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              label={{
                value: "Time",
                position: "insideBottom",
                offset: -5,
                className: "fill-muted-foreground",
              }}
            />
            <YAxis
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              label={{
                value: "Value",
                angle: -90,
                position: "insideLeft",
                className: "fill-muted-foreground",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
              }}
            />
            {equityData.length > 0 && (
              <Line
                type="monotone"
                dataKey="equity"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
                name="Equity"
                connectNulls
              />
            )}
            {drawdownData.length > 0 && (
              <Line
                type="monotone"
                dataKey="drawdown"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                name="Drawdown"
                connectNulls
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default EquityGraph;
