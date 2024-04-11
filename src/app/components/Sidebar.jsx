import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Sidebar = ({ trendingPosts }) => {
  return (
    <div>
      <div>
        <h3 className='text-2xl font-semibold px-4'>Latest Blogs</h3>
        <div>
          {trendingPosts.articles.slice(0, 5).map((blog) => (
            <div
              key={blog.title}
              className='my-5 border-b-2 border-spacing-2 px-4'
            >
              <h4>{blog.title}</h4>
              <Link
                to='/'
                className='font-medium hover:text-orange-500 inline-flex items-center text-base pb-2'
              >
                Read more <FaArrowRight className='mt-1 ml-2' />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className='text-2xl font-semibold px-4 mt-20'>Popular Blogs</h3>
        <div>
          {trendingPosts.articles.slice(5, 10).map((blog) => (
            <div
              key={blog.title}
              className='my-5 border-b-2 border-spacing-2 px-4 mb-2'
            >
              <h4>{blog.title}</h4>
              <Link
                to='/'
                className='font-medium hover:text-orange-500 inline-flex items-center text-base pb-2'
              >
                Read more <FaArrowRight className='mt-1 ml-2' />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  trendingPosts: PropTypes.shape({
    articles: PropTypes.array.isRequired, // Validate the articles array
  }).isRequired,
};

export default Sidebar;
