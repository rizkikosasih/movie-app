import { motion } from 'motion/react';
import noImage from '../../assets/svg/noImage.svg';

const MovieDetail = ({ movie }) => {
  return (
    <>
      <div className="movie-detail">
        {/* Poster */}
        <div className="mb-4 md:mb-0 md:w-1/2 w-full flex items-center justify-center">
          <motion.img
            src={movie.Poster !== 'N/A' ? movie.Poster : noImage}
            className="poster-image"
            loading="lazy"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            onError={(e) => {
              e.currentTarget.src = noImage;
              e.currentTarget.classList.add('dark:invert');
            }}
          />
        </div>

        {/* Info */}
        <div className="flex flex-col md:w-1/2 w-full">
          <h4 className="text-2xl font-bold mb-4">{movie.Title}</h4>

          <table className="table-auto text-sm">
            <tbody>
              <tr>
                <td>Released</td>
                <td>:</td>
                <td>{movie.Released}</td>
              </tr>
              <tr>
                <td>Language</td>
                <td>:</td>
                <td>{movie.Language}</td>
              </tr>
              <tr>
                <td>Country</td>
                <td>:</td>
                <td>{movie.Country}</td>
              </tr>
              <tr>
                <td>Runtime</td>
                <td>:</td>
                <td>{movie.Runtime}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>:</td>
                <td>{movie.Type}</td>
              </tr>
              <tr>
                <td>Genre</td>
                <td>:</td>
                <td>{movie.Genre}</td>
              </tr>
              <tr>
                <td>Director</td>
                <td>:</td>
                <td>{movie.Director}</td>
              </tr>
              <tr>
                <td>Actors</td>
                <td>:</td>
                <td>{movie.Actors}</td>
              </tr>
              <tr>
                <td>Writer</td>
                <td>:</td>
                <td>{movie.Writer}</td>
              </tr>
              <tr>
                <td>Awards</td>
                <td>:</td>
                <td>{movie.Awards}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full mt-4">
        <p className="font-semibold">Plot :</p>
        <p className="text-sm">{movie.Plot}</p>
      </div>
    </>
  );
};

export default MovieDetail;
