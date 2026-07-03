import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout';
import Banner from '../components/banner';
import MovieRow from '../components/movieRow';
import { useTrendingMovies } from '../hooks/useTrendingMovies';
import { useNowPlayingMovies } from '../hooks/useNowPlayingMovies';
import { usePopularMovies } from '../hooks/usePopularMovies';
import { useTopRatedMovies } from '../hooks/useTopRatedMovies';
import { useUpcomingMovies } from '../hooks/useUpcomingMovies';
import { useMovieStore } from '@/domain/store/useMovieStore';

const Home = () => {
  const navigate = useNavigate();

  // Fetch category data
  const { data: trendingData, isLoading: isTrendingLoading } = useTrendingMovies(1);
  const { data: nowPlayingData, isLoading: isNowPlayingLoading } = useNowPlayingMovies(1);
  const { data: popularData, isLoading: isPopularLoading } = usePopularMovies(1);
  const { data: topRatedData, isLoading: isTopRatedLoading } = useTopRatedMovies(1);
  const { data: upcomingData, isLoading: isUpcomingLoading } = useUpcomingMovies(1);

  // Watchlist from Zustand
  const { watchlist } = useMovieStore();

  const handleSelectMovie = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <Layout>
      {/* Cinematic Banner */}
      <Banner onSelectMovie={handleSelectMovie} />

      {/* Main Categories Section */}
      <div className="mx-auto max-w-7xl space-y-6 mt-4">
        {/* Watchlist Row (Only visible if not empty) */}
        {watchlist.length > 0 && (
          <MovieRow
            title="Daftar Tontonan Saya (Watchlist)"
            category="watchlist"
            movies={watchlist}
            isLoading={false}
            onSelectMovie={handleSelectMovie}
          />
        )}

        <MovieRow
          title="Sedang Trending"
          category="trending"
          movies={trendingData?.movies}
          isLoading={isTrendingLoading}
          onSelectMovie={handleSelectMovie}
        />

        <MovieRow
          title="Sedang Tayang di Bioskop"
          category="now_playing"
          movies={nowPlayingData?.movies}
          isLoading={isNowPlayingLoading}
          onSelectMovie={handleSelectMovie}
        />

        <MovieRow
          title="Film Populer"
          category="popular"
          movies={popularData?.movies}
          isLoading={isPopularLoading}
          onSelectMovie={handleSelectMovie}
        />

        <MovieRow
          title="Rating Tertinggi"
          category="top_rated"
          movies={topRatedData?.movies}
          isLoading={isTopRatedLoading}
          onSelectMovie={handleSelectMovie}
        />

        <MovieRow
          title="Akan Datang"
          category="upcoming"
          movies={upcomingData?.movies}
          isLoading={isUpcomingLoading}
          onSelectMovie={handleSelectMovie}
        />
      </div>
    </Layout>
  );
};

export default Home;
