import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      <div>

        {/* Chart Card */}
        <Card className="h-[42rem]">
          <CardContent className="h-full flex flex-col">
            <div className="h-full w-full flex-grow">
            <span>Chart goes here</span>
            </div>

            <div className="w-full h-10 flex items-center justify-center gap-2">
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
