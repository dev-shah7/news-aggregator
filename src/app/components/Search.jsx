import PropTypes from 'prop-types';

const Search = ({ handleSubmit, searchQuery, handleSearchQueryChange }) => {
  return (
    <form className='flex min-w-lg' onSubmit={handleSubmit}>
      <label htmlFor='simple-search' className='sr-only'>
        Search
      </label>
      <div className='relative w-full'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
          <svg
            className='w-4 h-4 text-slate-800'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 18 20'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2'
            />
          </svg>
        </div>
        <input
          type='text'
          id='simple-search'
          className='bg-[#DDDBCB] border border-gray-300 text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[350px] ps-10 p-2.5'
          placeholder='Search branch name...'
          value={searchQuery}
          onChange={(e) => handleSearchQueryChange(e.target.value)}
        />
      </div>
      <button
        type='submit'
        className='p-2.5 ms-2 text-sm font-medium text-slate-800 bg-[#DDDBCB] rounded-lg border'
      >
        <svg
          className='w-4 h-4'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 20 20'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
          />
        </svg>
        <span className='sr-only'>Search</span>
      </button>
    </form>
  );
};

Search.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleSearchQueryChange: PropTypes.func.isRequired,
};

export default Search;
