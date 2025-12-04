import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FastForward, Pause, Play, Rewind } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

// Mock OHLC candle data
interface Candle {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const generateMockCandles = (count: number): Candle[] => {
  const candles: Candle[] = [];
  let basePrice = 100;
  const baseTimestamp = Date.now() - count * 60000;

  for (let i = 0; i < count; i++) {
    const volatility = Math.random() * 2 - 1;
    const open = basePrice;
    const close = basePrice + volatility;
    const high = Math.max(open, close) + Math.random() * 0.5;
    const low = Math.min(open, close) - Math.random() * 0.5;

    candles.push({
      timestamp: baseTimestamp + i * 60000,
      open,
      high,
      low,
      close,
      volume: Math.random() * 10000 + 1000,
    });

    basePrice = close;
  }

  return candles;
};

const SPEED_OPTIONS = [0.5, 1, 2, 5, 10] as const;
type SpeedMultiplier = (typeof SPEED_OPTIONS)[number];

export default function ReplaySessionPage() {
  const { sessionType, sessionId } = useParams<{
    sessionType: "backtest" | "deployment";
    sessionId: string;
  }>();

  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<SpeedMultiplier>(1);
  const [currentCandleIndex, setCurrentCandleIndex] = useState(0);
  const [candles] = useState(() => generateMockCandles(200));

  const intervalRef = useRef<number | null>(null);

  // Playback logic
  useEffect(() => {
    if (isPlaying && currentCandleIndex < candles.length - 1) {
      const interval = 1000 / speed; // Base interval is 1 second, adjusted by speed
      intervalRef.current = window.setInterval(() => {
        setCurrentCandleIndex((prev) => {
          if (prev >= candles.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, speed, candles.length, currentCandleIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleFastForward = () => {
    setCurrentCandleIndex((prev) => Math.min(prev + 10, candles.length - 1));
  };

  const handleRewind = () => {
    setCurrentCandleIndex((prev) => Math.max(prev - 10, 0));
  };

  const handleSpeedToggle = () => {
    const currentIndex = SPEED_OPTIONS.indexOf(speed);
    const nextIndex = (currentIndex + 1) % SPEED_OPTIONS.length;
    setSpeed(SPEED_OPTIONS[nextIndex]);
  };

  // Calculate candle dimensions for visualization
  const visibleCandles = candles.slice(
    Math.max(0, currentCandleIndex - 50),
    currentCandleIndex + 1,
  );
  const prices = visibleCandles.flatMap((c) => [c.high, c.low]);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const priceRange = maxPrice - minPrice || 1;

  return (
    <DashboardLayout>
      {/* <div className="space-y-6"> */}
      <div>
        {/* Header with Breadcrumb */}
        {/* <div>
          <div className="mb-2 flex items-center gap-2">
            <Link
              to={sessionType === "backtest" ? "/backtests" : "/live-trading"}
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              {sessionType === "backtest" ? "Backtests" : "Live Trading"}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm">Session {sessionId}</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            {sessionType === "backtest" ? "Backtest" : "Deployment"} Replay
          </h2>
          <p className="text-muted-foreground">
            Candle {currentCandleIndex + 1} of {candles.length}
          </p>
        </div> */}

        {/* Chart Card */}
        <Card className="">
          <CardHeader>
            <CardTitle>Market Replay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-background/50 border-border relative h-[600px] w-full rounded border">
              <svg className="h-full w-full" viewBox="0 0 1000 400">
                {/* Price Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                  const y = 20 + ratio * 360;
                  const price = (maxPrice - ratio * priceRange).toFixed(2);
                  return (
                    <g key={i}>
                      <line
                        x1="50"
                        y1={y}
                        x2="980"
                        y2={y}
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-border"
                        opacity="0.3"
                      />
                      <text
                        x="35"
                        y={y + 4}
                        className="text-muted-foreground text-xs"
                        fontSize="10"
                        textAnchor="end"
                      >
                        {price}
                      </text>
                    </g>
                  );
                })}

                {/* Candles */}
                {visibleCandles.map((candle, i) => {
                  const x =
                    60 + (i / Math.max(visibleCandles.length - 1, 1)) * 920;
                  const isGreen = candle.close >= candle.open;

                  const highY =
                    20 + ((maxPrice - candle.high) / priceRange) * 360;
                  const lowY =
                    20 + ((maxPrice - candle.low) / priceRange) * 360;
                  const openY =
                    20 + ((maxPrice - candle.open) / priceRange) * 360;
                  const closeY =
                    20 + ((maxPrice - candle.close) / priceRange) * 360;

                  const bodyTop = Math.min(openY, closeY);
                  const bodyHeight = Math.abs(closeY - openY) || 1;

                  return (
                    <g key={i}>
                      {/* Wick */}
                      <line
                        x1={x}
                        y1={highY}
                        x2={x}
                        y2={lowY}
                        stroke={isGreen ? "#22c55e" : "#ef4444"}
                        strokeWidth="1"
                      />
                      {/* Body */}
                      <rect
                        x={x - 3}
                        y={bodyTop}
                        width="6"
                        height={bodyHeight}
                        fill={isGreen ? "#22c55e" : "#ef4444"}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Playback Controls */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRewind}
                disabled={currentCandleIndex === 0}
                className="hover:bg-accent"
              >
                <Rewind className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handlePlayPause}
                disabled={currentCandleIndex >= candles.length - 1}
                className="hover:bg-accent"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleFastForward}
                disabled={currentCandleIndex >= candles.length - 1}
                className="hover:bg-accent"
              >
                <FastForward className="h-5 w-5" />
              </Button>

              <div className="bg-border mx-1 h-6 w-px" />

              <Button
                variant="ghost"
                onClick={handleSpeedToggle}
                className="hover:bg-accent min-w-[60px] border-transparent bg-transparent"
              >
                {speed}x
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
