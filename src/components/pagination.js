import React from 'react'
import "../components/pagination.css"
import "../styles/page.css"
function Pagination({setCurrentPage, currentPage, itemsPerPage, totalPages}) {
    const nextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage((prev) => prev + 1);
        }
      };
    
      const prevPage = () => {
        if (currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        }
      };
      const calculateVisiblePages = () => {
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, start + 4);
        const adjustedStart = Math.max(1, end - 4);
        return Array.from({ length: end - adjustedStart + 1 }, (_, i) => adjustedStart + i);
      };
  return (
    <div>
    <span className="paginate-span">
      <button
        aria-label="Previous Page"
        onClick={prevPage} className={`left-arrow ${currentPage === 1 ? "disabled" : ""}`}>&lt;</button>
      {calculateVisiblePages().map((page) => (
        <a
          key={page}
          className={`page-number ${currentPage === page ? "selected-a" : "not-selected-a"
            }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </a>
      ))}
      <button
        aria-label="Next Page"

        onClick={nextPage} className={`right-arrow ${currentPage === totalPages ? "disabled" : ""}`}>&gt;</button>
    </span>
    <div>
    </div>
  </div>
  )
}

export default Pagination