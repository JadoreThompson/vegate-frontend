import { BarChart3 } from "lucide-react";
import { type FC } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EquityGraph: FC = () => {
  return (
    <Card className="lg:flex-1">
      <CardHeader>
        <CardTitle>Equity Curve</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground flex h-[400px] items-center justify-center">
          <div className="text-center">
            <BarChart3 className="mx-auto mb-4 h-12 w-12 opacity-20" />
            <p>Equity graph visualization</p>
            <p className="text-sm">Coming soon</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EquityGraph;
