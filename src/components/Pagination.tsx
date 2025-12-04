import { ChevronLeft, ChevronRight } from "lucide-react";
import { type FC } from "react";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  showPageNumbers?: boolean;
}

const Pagination: FC<PaginationProps> = (props) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (props.totalPages <= maxVisible) {
      for (let i = 1; i <= props.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (props.currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(props.totalPages);
      } else if (props.currentPage >= props.totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = props.totalPages - 3; i <= props.totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = props.currentPage - 1; i <= props.currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(props.totalPages);
      }
    }

    return pages;
  };

  if (props.totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => props.onPageChange(props.currentPage - 1)}
        disabled={!props.canGoPrev}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      {props.showPageNumbers && (
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="text-muted-foreground px-2"
                >
                  ...
                </span>
              );
            }

            return (
              <Button
                key={page}
                variant={props.currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => props.onPageChange(page as number)}
                className="min-w-[40px]"
              >
                {page}
              </Button>
            );
          })}
        </div>
      )}

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm">
          Page {props.currentPage} of {props.totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => props.onPageChange(props.currentPage + 1)}
          disabled={!props.canGoNext}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
