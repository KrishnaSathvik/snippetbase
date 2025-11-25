import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 mt-6 md:mt-8 mb-4 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="neo-button bg-white text-black px-2 py-1.5 md:px-4 md:py-2 font-bold text-xs md:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 md:gap-2"
      >
        <ChevronLeft size={16} className="md:w-[18px] md:h-[18px]" />
        <span className="hidden sm:inline">PREV</span>
      </button>

      <div className="flex gap-1 md:gap-2">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`neo-button font-bold px-2.5 py-1.5 md:px-4 md:py-2 text-xs md:text-base ${
              currentPage === page
                ? 'bg-black text-white'
                : 'bg-white text-black'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="neo-button bg-white text-black px-2 py-1.5 md:px-4 md:py-2 font-bold text-xs md:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 md:gap-2"
      >
        <span className="hidden sm:inline">NEXT</span>
        <ChevronRight size={16} className="md:w-[18px] md:h-[18px]" />
      </button>
    </div>
  );
};

export default Pagination;

