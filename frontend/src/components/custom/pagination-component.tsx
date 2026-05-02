"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PaginationComponentProps = {
  pageCount: number;
  currentPage: number;
};

export function PaginationComponent({
  pageCount,
  currentPage,
}: PaginationComponentProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  function createPageUrl(pageNumber: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(pageNumber));

    return `${pathname}?${params.toString()}`;
  }

  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => router.push(createPageUrl(currentPage - 1))}
        className="flex items-center gap-1 rounded-md border px-3 py-2 text-sm disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>

      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {pageCount}
      </span>

      <button
        type="button"
        disabled={currentPage >= pageCount}
        onClick={() => router.push(createPageUrl(currentPage + 1))}
        className="flex items-center gap-1 rounded-md border px-3 py-2 text-sm disabled:opacity-50"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}