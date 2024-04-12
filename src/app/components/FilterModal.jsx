import PropTypes from 'prop-types';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { filterCategories, filterSources } from '../../data/data';

const FilterModal = ({
  setIsFilterModalOpen,
  handleFilterSubmit,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  selectedCategory,
  selectedSources,
  handleCategoryChange,
  keyword,
  handleKeywordChange,
  handleSourceFilterChange,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    handleFilterSubmit();
  };

  const [expanded, setExpanded] = useState(false);
  const [sourceExpanded, setSourceExpanded] = useState(false);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedSelectedCategories = checked
      ? [...selectedCategory, value]
      : selectedCategory.filter((category) => category !== value);
    handleCategoryChange(updatedSelectedCategories);
  };

  const handleSourceCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedSelectedSources = checked
      ? [...selectedSources, value]
      : selectedSources.filter((source) => source !== value);
    handleSourceFilterChange(updatedSelectedSources);
  };

  return (
    <div
      id='crud-modal'
      tabIndex='-1'
      aria-hidden='true'
      className='overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center'
    >
      <div className='relative p-4 w-full max-w-md max-h-full'>
        <div className='relative bg-white rounded-lg shadow-lg'>
          <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t'>
            <h3 className='text-lg font-semibold text-gray-900'>Filter News</h3>
            <button
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center'
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
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Keyword
                </label>
                <input
                  type='text'
                  name='keyword'
                  id='keyword'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='Type keyword'
                  required=''
                  value={keyword}
                  onChange={(e) => handleKeywordChange(e.target.value)}
                />
              </div>

              <div className='col-span-2'>
                <label
                  htmlFor='category'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Category
                </label>
                <div className='relative'>
                  <div
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 cursor-pointer'
                    onClick={() => setExpanded(!expanded)}
                  >
                    {selectedCategory.length > 0
                      ? selectedCategory.join(', ')
                      : 'Select categories'}
                  </div>
                  {expanded && (
                    <div className='absolute bg-white border border-gray-300 mt-1 w-full shadow-lg rounded-lg py-2 max-h-60 overflow-auto z-10'>
                      {filterCategories.map((category) => (
                        <label
                          key={category.id}
                          className='flex items-center p-2 hover:bg-gray-100 cursor-pointer'
                        >
                          <input
                            type='checkbox'
                            value={category.id}
                            checked={selectedCategory.includes(category.id)}
                            onChange={handleCheckboxChange}
                            className='mr-2 cursor-pointer'
                          />
                          <span className='text-gray-900'>{category.text}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className='col-span-2'>
                <label
                  htmlFor='category'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Sources
                </label>
                <div className='relative'>
                  <div
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 cursor-pointer'
                    onClick={() => setSourceExpanded(!sourceExpanded)}
                  >
                    {selectedSources.length > 0
                      ? selectedSources
                          .map((sourceId) => {
                            const selectedSource = filterSources.find(
                              (source) => source.id === sourceId
                            );
                            return selectedSource ? selectedSource.text : null;
                          })
                          .join(', ')
                      : 'Select Sources'}
                  </div>
                  `
                  {sourceExpanded && (
                    <div className='absolute bg-white border border-gray-300 mt-1 w-full shadow-lg rounded-lg py-2 max-h-60 overflow-auto z-10'>
                      {filterSources.map((source) => (
                        <label
                          key={source.id}
                          className='flex items-center p-2 hover:bg-gray-100 cursor-pointer'
                        >
                          <input
                            type='checkbox'
                            value={source.id}
                            checked={selectedSources.includes(source.id)}
                            onChange={handleSourceCheckboxChange}
                            className='mr-2 cursor-pointer'
                          />
                          <span className='text-gray-900'>{source.text}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className='col-span-2'>
                <label
                  htmlFor='dateRange'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Date Range
                </label>
                <div className='flex gap-4'>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText='From'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    placeholderText='To'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  />
                </div>
              </div>
            </div>
            <button
              type='submit'
              className='text-white inline-flex items-center bg-slate-800 hover:bg-[#DDDBCB] hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
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
  selectedSources: PropTypes.string.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
  handleKeywordChange: PropTypes.func.isRequired,
  handleSourceFilterChange: PropTypes.func.isRequired,
};

export default FilterModal;
