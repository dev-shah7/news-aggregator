import { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import BlogCard from '../components/BlogCard';
import Pagination from '../components/Pagination';
import NewsSourceSection from '../components/NewsSourceSection';
import Sidebar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import FilterModal from '../components/FilterModal';
import Spinner from '../components/Spinner';
import {
  fetchGuardianData,
  fetchNYTData,
  fetchPosts,
  fetchTrendingPosts,
} from '../../redux/actions/postAction';

const Blogs = () => {
  const dispatch = useDispatch();
  const {
    blogs: data,
    trendingPosts,
    isLoading,
  } = useSelector((state) => state.posts);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNewsSource, setSelectedNewsSource] = useState('nyt');
  const [activeNewsSource, setActiveNewsSource] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const pageSize = 12;

  useEffect(() => {
    dispatch(fetchTrendingPosts());
  }, [dispatch]);

  useEffect(() => {
    if (selectedNewsSource == 'nyt') {
      dispatch(fetchNYTData({ page: currentPage }));
    } else if (selectedNewsSource == 'guardian') {
      dispatch(fetchGuardianData({ page: currentPage }));
    } else {
      dispatch(fetchPosts({ pageSize: pageSize, page: currentPage }));
    }
  }, [dispatch, currentPage, selectedNewsSource]);

  const handleFilterSubmit = () => {
    const fromDate = startDate ? startDate.toISOString().split('T')[0] : '';
    const toDate = endDate ? endDate.toISOString().split('T')[0] : '';

    if (selectedNewsSource == 'nyt') {
      dispatch(
        fetchNYTData({
          page: currentPage,
          category: selectedCategory,
          fromDate,
          toDate,
          selectedSources,
        })
      );
    } else if (selectedNewsSource == 'guardian') {
      dispatch(
        fetchGuardianData({
          page: currentPage,
          category: selectedCategory,
          fromDate,
          toDate,
          selectedSources,
        })
      );
    } else {
      dispatch(
        fetchPosts({
          query: keyword,
          pageSize: pageSize,
          page: currentPage,
          fromDate,
          toDate,
          category: selectedCategory,
          selectedSources,
        })
      );
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setActiveNewsSource('a');
  };

  const handleCategoryChange = (selectedCategories) => {
    setSelectedCategory(selectedCategories);
  };

  const handleSourceFilterChange = (selectedSources) => {
    setSelectedSources(selectedSources);
  };

  const handleKeywordChange = (value) => {
    setKeyword(value);
  };

  const handleSourceChange = (sourceId) => {
    setSearchQuery('');
    setCurrentPage(1);
    setSelectedNewsSource(sourceId);
  };

  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchQuery) {
      if (selectedNewsSource === 'nyt') {
        dispatch(fetchNYTData({ query: searchQuery, page: currentPage }));
      } else if (selectedNewsSource === 'guardian') {
        dispatch(fetchGuardianData({ query: searchQuery, page: currentPage }));
      } else {
        dispatch(
          fetchPosts({
            query: searchQuery,
            pageSize: pageSize,
            page: currentPage,
          })
        );
      }
      setCurrentPage(1);
    }
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
          selectedSources={selectedSources}
          handleKeywordChange={handleKeywordChange}
          handleSourceFilterChange={handleSourceFilterChange}
        />
      )}
      <Banner heading='News Feed' />

      <div>
        <NewsSourceSection
          selectedNewsSource={selectedNewsSource}
          handleSourceChange={handleSourceChange}
          activeNewsSource={activeNewsSource}
          setIsFilterModalOpen={setIsFilterModalOpen}
          handleSubmit={handleSearchSubmit}
          searchQuery={searchQuery}
          handleSearchQueryChange={handleSearchQueryChange}
        />
      </div>
      <div className='px-12'>
        {isLoading}
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 py-6'>
          <div className='col-span-3 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>
            {isLoading ? (
              <Spinner />
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
