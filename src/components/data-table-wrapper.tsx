import { type FC, type ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DataTableWrapperProps {
  title: string;
  children: ReactNode;
  transparent?: boolean;
}

export const DataTableWrapper: FC<DataTableWrapperProps> = ({
  title,
  children,
  transparent = true,
}) => {
  return (
    <Card className={transparent ? "border-0 bg-transparent" : ""}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
