import { useEffect } from 'react';
import Banner from '../components/Banner';
import { useDispatch, useSelector } from 'react-redux';
import BlogCard from '../components/BlogCard';
import { Link } from 'react-router-dom';
import {
  fetchNYTData,
  fetchTrendingPosts,
} from '../../redux/actions/postAction';

const Home = () => {
  const dispatch = useDispatch();
  const { trendingPosts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchTrendingPosts());
    dispatch(fetchNYTData());
  }, [dispatch]);

  return (
    <>
      <Banner
        heading='Welcome to our NEWS AGGREGATOR'
        content='Find and filter any article of your choice from the top sources.'
      />
      <br />
      <div className='container mx-auto max-w-7xl mt-10'>
        <h2 className='text-4xl text-center my-4'>Top Headlines</h2>
        {trendingPosts && trendingPosts.articles && (
          <>
            <div className='relative'>
              <div className='max-h-[500px]'>
                <img
                  src={
                    trendingPosts.articles[0].urlToImage
                      ? trendingPosts.articles[0].urlToImage
                      : trendingPosts.articles[1].urlToImage
                  }
                  alt='Banner'
                  className='w-full max-h-[500px] object-cover'
                />
              </div>
              <div className='absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50'>
                <h1 className='text-xl md:text-3xl font-bold text-white'>
                  {trendingPosts.articles[0].title
                    ? trendingPosts.articles[0].title
                    : trendingPosts.articles[1].title}
                </h1>
                <p className='text-sm md:text-lg text-white'>
                  {trendingPosts.articles[0].description
                    ? trendingPosts.articles[0].description
                    : trendingPosts.articles[1].description}
                </p>
                <p className='text-sm text-gray-300'>
                  {trendingPosts.articles[0].author
                    ? trendingPosts.articles[0].author
                    : trendingPosts.articles[1].author}
                </p>
              </div>
            </div>
            <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>
              {trendingPosts.articles.slice(1, 7).map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
            <div className='flex justify-center mt-10'>
              <Link
                to='/blogs'
                className='bg-[#DDDBCB] text-slate-800 font-bold py-2 px-8 rounded-full'
              >
                See All Posts
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
