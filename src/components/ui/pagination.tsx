import { cn } from "../../lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const getPages = (): (number | string)[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    if (currentPage <= 3) return [1, 2, 3, 4, "...", totalPages]
    if (currentPage >= totalPages - 2)
      return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
  }

  const PageButton = ({
    page,
    isActive,
    onClick,
  }: {
    page: number
    isActive: boolean
    onClick: () => void
  }) => (
    <button
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "px-3 py-1 rounded-md border text-sm transition-colors",
        isActive
          ? "bg-primary text-white border-primary"
          : "hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {page}
    </button>
  )

  return (
    <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Pagination">
      {/* Prev */}
      <button
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={cn(
          "px-3 py-1 rounded-md border text-sm transition-colors",
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-accent hover:text-accent-foreground"
        )}
      >
        Prev
      </button>

      {/* Numbered Pages */}
      {getPages().map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-3 py-1 text-sm select-none">
            ...
          </span>
        ) : (
          <PageButton
            key={idx}
            page={page as number}
            isActive={currentPage === page}
            onClick={() => onPageChange(page as number)}
          />
        )
      )}

      {/* Next */}
      <button
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={cn(
          "px-3 py-1 rounded-md border text-sm transition-colors",
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-accent hover:text-accent-foreground"
        )}
      >
        Next
      </button>
    </nav>
  )
}
