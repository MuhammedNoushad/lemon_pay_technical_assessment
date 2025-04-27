import { useState } from "react";
import BackIcon from "../../icons/BackIcon";
import ForwardIcon from "../../icons/ForwardIcon";

const Pagination = ({ totalPages }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      {/* Left Arrow */}
      <BackIcon onClick={handlePrev} />

      {/* Page Numbers */}
      <div className="flex items-center gap-3 mx-16">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            className={`text-lg ${
              currentPage === index + 1
                ? "font-bold text-black"
                : "text-gray-400"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Right Arrow */}
      <ForwardIcon onClick={handleNext} />
    </div>
  );
};

export default Pagination;
