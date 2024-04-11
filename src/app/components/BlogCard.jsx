import PropTypes from 'prop-types';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <Link
      to={blog.url}
      target='_blank'
      rel='noopener noreferrer'
      className='p-5 shadow-lg rounded cursor-pointer overflow-hidden'
    >
      <div>
        <img src={blog.urlToImage} alt={blog.title} className='w-full' />
      </div>
      <h3 className='mt-4 mb-2 font-bold hover:text-blue-600 cursor-pointer'>
        {blog.title}
      </h3>
      <p className='mb-2 text-grey-600'>
        <FaUser className='inline-flex items-center mr-2' /> {blog.author}
      </p>
      <p className='text-sm text-grey-500'>{blog.publishedAt}</p>
    </Link>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.shape({
    urlToImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogCard;
