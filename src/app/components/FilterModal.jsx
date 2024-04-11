import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FilterModal = ({
  setIsFilterModalOpen,
  handleFilterSubmit,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  selectedCategory,
  handleCategoryChange,
  keyword,
  handleKeywordChange,
}) => {
  const filterCategories = [
    {
      id: 'business',
      text: 'Business',
    },
    {
      id: 'entertainment',
      text: 'Entertainment',
    },
    {
      id: 'general',
      text: 'General',
    },
    {
      id: 'health',
      text: 'Health',
    },
    {
      id: 'science',
      text: 'Science',
    },
    {
      id: 'sports',
      text: 'Sports',
    },
    {
      id: 'technology',
      text: 'Technology',
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();

    handleFilterSubmit();
  };
  return (
    <div
      id='crud-modal'
      tabIndex='-1'
      aria-hidden='true'
      className='overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center'
    >
      <div className='relative p-4 w-full max-w-md max-h-full'>
        <div className='relative bg-white rounded-lg shadow-lg dark:bg-gray-700'>
          <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
              Filter News
            </h3>
            <button
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
              data-modal-toggle='crud-modal'
              onClick={() => setIsFilterModalOpen(false)}
            >
              <svg
                className='w-3 h-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                />
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
          </div>
          <form onSubmit={(e) => handleSubmit(e)} className='p-4 md:p-5'>
            <div className='grid gap-4 mb-4 grid-cols-2'>
              <div className='col-span-2'>
                <label
                  htmlFor='keyword'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Keyword
                </label>
                <input
                  type='text'
                  name='keyword'
                  id='keyword'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  placeholder='Type keyword'
                  required=''
                  value={keyword}
                  onChange={(e) => handleKeywordChange(e.target.value)}
                />
              </div>

              <div className='col-span-2'>
                <label
                  htmlFor='category'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Category
                </label>
                <select
                  id='category'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  <option value='' disabled selected>
                    Select category
                  </option>

                  {filterCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.text}
                    </option>
                  ))}
                </select>
              </div>
              <div className='col-span-2'>
                <label
                  htmlFor='dateRange'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Date Range
                </label>
                <div className='flex gap-4'>
                  <DatePicker
                    selected={startDate}
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText='From'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  />
                  <DatePicker
                    selected={endDate}
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    placeholderText='To'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  />
                </div>
              </div>
            </div>
            <button
              type='submit'
              className='text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Filter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

FilterModal.propTypes = {
  setIsFilterModalOpen: PropTypes.func.isRequired,
  handleFilterSubmit: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  setStartDate: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
  handleKeywordChange: PropTypes.func.isRequired,
};

export default FilterModal;
