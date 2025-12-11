import {
  AreaSeries,
  ColorType,
  createChart,
  type IChartApi,
  type Time,
} from "lightweight-charts";
import { BarChart3 } from "lucide-react";
import { useEffect, useRef, type FC } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EquityGraphProps {
  equityData?: [string, number | string][];
  title?: string;
}

const EquityGraph: FC<EquityGraphProps> = (props) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  const equityData = props.equityData ?? [];
  const title = props.title ?? "Equity Curve";
  const hasData = equityData.length > 0;

  useEffect(() => {
    if (!chartContainerRef.current || !hasData) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
      },
      grid: {
        vertLines: {
          color: "rgba(0,0,0,0)", // transparent vertical grid lines
        },
        horzLines: {
          color: "rgba(0,0,0,0)", // transparent horizontal grid lines
        },
      },
    });

    const areaSeries = chart.addSeries(AreaSeries, {
      lineColor: "#22c55e",
      bottomColor: "rgba(34, 197, 94, 0.0)",
    });

    const chartData = equityData
      .map(([timestamp, value]) => ({
        time: (new Date(timestamp).getTime() / 1000) as Time,
        value: typeof value === "string" ? parseFloat(value) : value,
      }))
      .sort((a, b) => (a.time as number) - (b.time as number));

    areaSeries.setData(chartData);

    chart.timeScale().fitContent();

    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [equityData, hasData]);

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
      <CardContent className="h-full">
        <div ref={chartContainerRef} className="flex h-full w-full" />
      </CardContent>
    </Card>
  );
};

export default EquityGraph;
