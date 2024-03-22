import Skeleton from './CardSkeleton';
import MovieItem from './MovieItem';

const Movie = ({ isLoading, movies, handleClickDetail }) => {
  return (
    <>
      {isLoading ? (
        <Skeleton length={10} />
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
