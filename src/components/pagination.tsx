import { ChevronLeft, ChevronRight } from "lucide-react";
import { type FC } from "react";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  hasNextPage,
  hasPreviousPage,
}) => {
  return (
    <div className="mt-4 flex justify-end">
      <Button
        variant="ghost"
        size="sm"
        className="!bg-transparent hover:!bg-transparent"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPreviousPage}
      >
        <ChevronLeft />
      </Button>
      <span className="text-muted-foreground flex w-15 items-center justify-center text-sm">
        Page {currentPage}
      </span>
      <Button
        variant="ghost"
        size="sm"
        className="!bg-transparent hover:!bg-transparent"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};
