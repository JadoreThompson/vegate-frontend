import { type LucideIcon } from "lucide-react";
import { type FC, type ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState: FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
}) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16">
        {Icon && (
          <Icon className="text-muted-foreground mb-4 h-12 w-12 opacity-20" />
        )}
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        {description && (
          <p className="text-muted-foreground mb-4 text-center text-sm">
            {description}
          </p>
        )}
        {action}
      </CardContent>
    </Card>
  );
};
