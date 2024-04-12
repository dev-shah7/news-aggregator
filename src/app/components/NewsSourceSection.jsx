import PropTypes from 'prop-types';
import Search from './Search';

const NewsSourceSection = ({
  selectedNewsSource,
  handleSourceChange,
  setIsFilterModalOpen,
  handleSubmit,
  searchQuery,
  handleSearchQueryChange,
}) => {
  const sources = [
    { id: 'news', text: 'NEWS API' },
    { id: 'nyt', text: 'New York Times' },
    { id: 'guardian', text: 'The Guardian' },
  ];

  return (
    <div className='flex flex-col lg:flex-row flex-wrap justify-between border-b-2 p-4 gap-6'>
      <div className='flex flex-wrap items-center text-grey-900 text-semibold'>
        {sources.map((source) => (
          <button
            key={source.id}
            className={`space-x-14 px-4 py-2 rounded-lg ${
              selectedNewsSource === source.id
                ? 'bg-[#DDDBCB] text-slate-8800'
                : ''
            }`}
            onClick={() => handleSourceChange(source.id)}
          >
            {source.text}
          </button>
        ))}
      </div>
      <div className='flex justify-between items-start'>
        <Search
          handleSubmit={handleSubmit}
          searchQuery={searchQuery}
          handleSearchQueryChange={handleSearchQueryChange}
        />

        <button
          id='dropdownDefaultButton'
          data-dropdown-toggle='dropdown'
          className='text-slate-800 bg-[#DDDBCB] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-10 px-5 py-2.5 text-center inline-flex items-center'
          type='button'
          onClick={() => setIsFilterModalOpen(true)}
        >
          Filter{' '}
          <svg
            className='w-2.5 h-2.5 ms-3'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 10 6'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m1 1 4 4 4-4'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

NewsSourceSection.propTypes = {
  selectedNewsSource: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  handleSourceChange: PropTypes.func.isRequired,
  setIsFilterModalOpen: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleSearchQueryChange: PropTypes.func.isRequired,
};

export default NewsSourceSection;
