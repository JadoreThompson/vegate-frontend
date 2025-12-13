import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FC } from "react";
import { Button } from "./ui/button";

const PaginationControls: FC<{
  page: number;
  setPage: (arg: number) => void;
  data: any[];
  pageSize: number;
}> = (props) => {
  const totalPages = Math.floor(props.data.length / props.pageSize);

  return (
    <div className="flex items-center justify-end">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="hover:!bg-transparent"
          onClick={() => props.setPage(props.page - 1)}
          disabled={props.page === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex w-15 items-center justify-center text-sm">
          Page {props.page}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="hover:!bg-transparent"
          onClick={() => props.setPage(props.page + 1)}
          disabled={props.page === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;
