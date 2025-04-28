import BackIcon from "../../icons/BackIcon";
import ForwardIcon from "../../icons/ForwardIcon";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      {/* Left Arrow */}
      <BackIcon onClick={handlePrev} className="cursor-pointer" />

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
      <ForwardIcon onClick={handleNext} className="cursor-pointer" />
    </div>
  );
};

export default Pagination;
