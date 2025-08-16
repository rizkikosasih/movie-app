import CardSkeleton from '../loading/CardSkeleton.jsx';
import MovieItem from './MovieItem.jsx';

const Movie = ({ isLoading, movies, handleClickDetail }) => {
  return (
    <>
      {isLoading ? (
        <CardSkeleton length={10} />
      ) : movies.length ? (
        movies.map((movie) => {
          return (
            <MovieItem
              key={movie.imdbID}
              imdbID={movie.imdbID}
              Title={movie.Title}
              Poster={movie.Poster}
              handleClickDetail={handleClickDetail}
            />
          );
        })
      ) : (
        <div className="font-semibold text-red-400 text-2xl">Not Found</div>
      )}
    </>
  );
};

export default Movie;
