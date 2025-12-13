import { Activity } from "lucide-react";
import { type FC, useEffect, useRef } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface LogEntry {
  id: number;
  timestamp: string;
  level: "INFO" | "WARNING" | "ERROR";
  message: string;
}

const LiveLogs: FC<{
  logs: LogEntry[];
  onClearLogs?: () => void;
  maxHeight?: string;
}> = (props) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [props.logs]);

  const getLevelColor = (level: LogEntry["level"]) => {
    switch (level) {
      case "INFO":
        return "text-blue-600 dark:text-blue-400";
      case "WARNING":
        return "text-yellow-600 dark:text-yellow-400";
      case "ERROR":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-muted-foreground";
    }
  };

  const getLevelBadgeColor = (level: LogEntry["level"]) => {
    switch (level) {
      case "INFO":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
      case "WARNING":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
      case "ERROR":
        return "bg-red-500/10 text-red-600 dark:text-red-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Live Execution Logs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea
          ref={scrollAreaRef}
          className="rounded-md border"
          style={{ height: props.maxHeight }}
        >
          {props.logs.length === 0 ? (
            <div className="flex h-full items-center justify-center p-8">
              <p className="text-muted-foreground text-sm">
                No logs available. Logs will appear here when the strategy
                starts executing.
              </p>
            </div>
          ) : (
            <div className="space-y-1 p-4 font-mono text-sm">
              {props.logs.map((log) => (
                <div
                  key={log.id}
                  className="hover:bg-muted/50 flex items-start gap-3 rounded-sm p-2"
                >
                  <span className="text-muted-foreground shrink-0 text-xs">
                    {log.timestamp}
                  </span>
                  <span
                    className={`shrink-0 rounded px-1.5 py-0.5 text-xs font-semibold ${getLevelBadgeColor(log.level)}`}
                  >
                    {log.level}
                  </span>
                  <span className={`break-all ${getLevelColor(log.level)}`}>
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default LiveLogs;
