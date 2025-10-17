import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  productsPerPage: number;
  totalProducts: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
  setProductsPerPage: (value: number) => void;
}

const Pagination = ({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
  setProductsPerPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pageNumbers.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pageNumbers.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="mt-4 flex justify-between items-center">
      <div>
        <select
          value={productsPerPage}
          onChange={(e) => {
            setProductsPerPage(Number(e.target.value));
            paginate(1);
          }}
          className="px-4 py-2 rounded bg-flash-white text-rich-black"
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>
      <ul className="flex justify-center items-center space-x-2">
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-flash-white disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>
        </li>
        {pageNumbers.map((number, index) => (
          <li key={index}>
            {number === "..." ? (
              <span className="px-4 py-2">...</span>
            ) : (
              <button
                onClick={() => paginate(number as number)}
                className={`px-4 py-2 rounded ${
                  currentPage === number
                    ? "bg-lion-brown text-white"
                    : "bg-flash-white"
                }`}
              >
                {number}
              </button>
            )}
          </li>
        ))}
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-flash-white disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
