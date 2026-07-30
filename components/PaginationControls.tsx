"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  className?: string;
  itemLabel?: string;
}

function getPageNumbers(currentPage: number, totalPages: number): (number | string)[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "...", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
}

export default function PaginationControls({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  className,
  itemLabel = "articles",
}: PaginationControlsProps) {
  if (totalPages <= 1 && totalItems <= itemsPerPage) {
    return null;
  }

  const pageNumbers = getPageNumbers(currentPage, totalPages);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between gap-4 select-none sm:flex-row",
        className
      )}
    >
      <div className="text-[14px] font-medium text-[#0D1A14]/70 order-2 sm:order-1">
        Showing <span className="font-semibold text-[#0D1A14]">{totalItems > 0 ? startIndex + 1 : 0}</span> to{" "}
        <span className="font-semibold text-[#0D1A14]">{endIndex}</span> of{" "}
        <span className="font-semibold text-[#0D1A14]">{totalItems}</span> {itemLabel}
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 order-1 sm:order-2">
        {/* Previous page button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#E4E7EC] bg-white text-[#0D1A14] hover:bg-[#F2F7F1] disabled:opacity-40 disabled:hover:bg-white transition-colors cursor-pointer disabled:cursor-not-allowed shadow-xs"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Page numbers */}
        {pageNumbers.map((page, i) => {
          if (typeof page === "string") {
            return (
              <span
                key={`ellipsis-${i}`}
                className="flex h-9 w-8 items-center justify-center text-sm font-medium text-[#0D1A14]/40 select-none"
              >
                •••
              </span>
            );
          }

          const isSelected = currentPage === page;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-[10px] text-sm font-medium transition-colors cursor-pointer shadow-xs",
                isSelected
                  ? "bg-[#0F3221] text-white font-semibold"
                  : "border border-[#E4E7EC] bg-white text-[#0D1A14] hover:bg-[#F2F7F1]"
              )}
            >
              {page}
            </button>
          );
        })}

        {/* Next page button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#E4E7EC] bg-white text-[#0D1A14] hover:bg-[#F2F7F1] disabled:opacity-40 disabled:hover:bg-white transition-colors cursor-pointer disabled:cursor-not-allowed shadow-xs"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
