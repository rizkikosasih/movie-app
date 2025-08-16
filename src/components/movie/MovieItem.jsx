import { motion } from 'motion/react';
import noImage from '../../assets/svg/noImage.svg';

const MovieItem = ({ imdbID, Title, Poster, handleClickDetail }) => {
  return (
    <div className="col" key={imdbID}>
      <motion.div
        className="card w-full bg-base-100 shadow-2xl overflow-hidden"
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300 }}>
        <figure className="cursor-pointer" onClick={() => handleClickDetail(imdbID)}>
          <img
            loading="lazy"
            alt={Title}
            src={Poster !== 'N/A' ? Poster : noImage}
            className="movie-image"
            onError={(e) => {
              e.currentTarget.src = noImage;
              e.currentTarget.classList.add('dark:invert');
            }}
          />
        </figure>
        <div className="card-body p-4 movie-body">
          <h2
            className="card-title cursor-pointer"
            onClick={() => handleClickDetail(imdbID)}>
            {Title}
          </h2>
        </div>
      </motion.div>
    </div>
  );
};

export default MovieItem;
