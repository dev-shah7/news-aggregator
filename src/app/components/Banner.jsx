import PropTypes from 'prop-types';

const Banner = ({ heading, content }) => {
  return (
    <div className='px-4 py-32 bg-black mx-auto'>
      <div className='text-white text-center'>
        <h1 className='text-3xl lg:text-5xl leading-snug font-bold mb-5'>
          {heading}
        </h1>
        {content && (
          <p className='text-grey-100 lg:w-3/5 mx-auto mb-5 font-primary'>
            {content}
          </p>
        )}
      </div>
    </div>
  );
};

Banner.propTypes = {
  heading: PropTypes.string.isRequired,
  content: PropTypes.string,
};

export default Banner;
