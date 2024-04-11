import PropTypes from 'prop-types';

const Pagination = ({ currentPage, pageSize, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    const maxPageButtons = maxVisiblePages * 2 + 1;

    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageButton(i));
      }
    } else {
      let startPage = Math.max(1, currentPage - maxVisiblePages);
      let endPage = Math.min(currentPage + maxVisiblePages, totalPages);

      if (currentPage <= maxVisiblePages) {
        endPage = maxPageButtons;
      } else if (currentPage >= totalPages - maxVisiblePages) {
        startPage = totalPages - maxPageButtons + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(renderPageButton(i));
      }

      if (startPage > 1) {
        pageNumbers.unshift(renderPageButton(1, true));
      }
      if (endPage < totalPages) {
        pageNumbers.push(renderPageButton(totalPages, true));
      }
    }

    return pageNumbers;
  };

  const renderPageButton = (pageNumber, isEllipsis = false) => (
    <li key={pageNumber}>
      <button
        onClick={() => handlePageClick(pageNumber)}
        disabled={isEllipsis}
        className={`flex items-center justify-center px-3 h-8 leading-tight ${
          currentPage === pageNumber
            ? 'text-blue-600 bg-blue-50'
            : 'text-gray-500 bg-white'
        } border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
      >
        {isEllipsis ? '...' : pageNumber}
      </button>
    </li>
  );

  return (
    <nav aria-label='blogs navigation'>
      <ul className='inline-flex -space-x-px text-base h-14'>
        <li>
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700'
          >
            Previous
          </button>
        </li>
        {renderPageNumbers()}
        <li>
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700'
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.string.isRequired,
  pageSize: PropTypes.string.isRequired,
  totalItems: PropTypes.string.isRequired,
  onPageChange: PropTypes.string.isRequired,
};

export default Pagination;
