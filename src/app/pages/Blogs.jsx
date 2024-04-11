import { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import BlogCard from '../components/BlogCard';
import Pagination from '../components/Pagination';
import NewsSourceSection from '../components/NewsSourceSection';
import Sidebar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGuardianData,
  fetchNYTData,
  fetchPosts,
  fetchTrendingPosts,
} from '../../redux/features/postSlice';
import FilterModal from '../components/FilterModal';

const Blogs = () => {
  const dispatch = useDispatch();
  const {
    blogs: data,
    trendingPosts,
    isLoading,
  } = useSelector((state) => state.posts);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNewsSource, setSelectedNewsSource] = useState('news');
  const [activeNewsSource, setActiveNewsSource] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [keyword, setKeyword] = useState('');

  const pageSize = 12;

  useEffect(() => {
    dispatch(fetchTrendingPosts());
  }, [dispatch]);

  console.log('Trending Posts: ', trendingPosts);
  useEffect(() => {
    if (selectedNewsSource == 'nyt') {
      dispatch(fetchNYTData({ page: currentPage }));
    } else if (selectedNewsSource == 'guardian') {
      dispatch(fetchGuardianData({ page: currentPage }));
    } else {
      dispatch(fetchPosts({ pageSize: pageSize, page: currentPage }));
    }
  }, [dispatch, currentPage, selectedNewsSource]);

  const handleFilterSubmit = (startDate, endDate) => {
    const fromDate = startDate ? startDate.toISOString().split('T')[0] : '';
    const toDate = endDate ? endDate.toISOString().split('T')[0] : '';
    console.log(fromDate, toDate);

    dispatch(
      fetchPosts({
        query: keyword,
        pageSize: pageSize,
        page: currentPage,
        fromDate,
        toDate,
        selectedCategory,
      })
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setActiveNewsSource('a');
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleKeywordChange = (value) => {
    setKeyword(value);
  };

  const handleSourceChange = (sourceId) => {
    setCurrentPage(1);
    setSelectedNewsSource(sourceId);
  };
  return (
    <>
      {isFilterModalOpen && (
        <FilterModal
          setIsFilterModalOpen={setIsFilterModalOpen}
          handleFilterSubmit={handleFilterSubmit}
          startDate={startDate}
          endDate={endDate}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
          keyword={keyword}
          handleKeywordChange={handleKeywordChange}
        />
      )}
      <Banner heading='Blogs' />

      <div>
        <NewsSourceSection
          selectedNewsSource={selectedNewsSource}
          handleSourceChange={handleSourceChange}
          activeNewsSource={activeNewsSource}
          setIsFilterModalOpen={setIsFilterModalOpen}
        />
      </div>
      <div className='px-12'>
        {isLoading}
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 py-6'>
          <div className='col-span-3 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>
            {isLoading ? (
              <div role='status'>
                <svg
                  aria-hidden='true'
                  className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
                <span className='sr-only'>Loading...</span>
              </div>
            ) : (
              data &&
              data.articles &&
              data.articles.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))
            )}
          </div>
          {trendingPosts && trendingPosts.articles && (
            <div>
              <Sidebar trendingPosts={trendingPosts} />
            </div>
          )}
        </div>
        <div className='flex justify-center py-10'>
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={data?.totalResults}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Blogs;
