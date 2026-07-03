import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/layout';
import MovieCard from '../components/movieCard';
import { useInfiniteCategoryMovies } from '../hooks/useInfiniteCategoryMovies';
import { Spinner } from '../components/ui/spinner';

const categoryTitleMap: Record<string, string> = {
  trending: 'Sedang Trending',
  now_playing: 'Sedang Tayang',
  popular: 'Film Populer',
  top_rated: 'Rating Tertinggi',
  upcoming: 'Akan Datang'
};

export const Explore = () => {
  const { category = 'trending' } = useParams<{ category: string }>();
  const navigate = useNavigate();

  // Setup intersection observer
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '200px'
  });

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, isError } =
    useInfiniteCategoryMovies(category);

  // Trigger loading next page when scrolling to bottom
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSelectMovie = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  // Extract all movies from paginated data
  const movies = data?.pages.flatMap((page) => page.movies) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200/20 dark:border-zinc-800/40 pb-6">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-250 dark:bg-zinc-900 border border-zinc-200/20 text-zinc-900 dark:text-zinc-100 hover:bg-amber-500 hover:text-black dark:hover:bg-amber-400 dark:hover:text-black transition-all"
              aria-label="Back to Home"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
                Jelajahi {categoryTitleMap[category] || 'Film'}
              </h1>
              <p className="text-zinc-500 text-sm mt-1">
                Menampilkan seluruh koleksi film terpetakan TMDB
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="flex h-[40vh] w-full items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : isError ? (
          <div className="text-center py-12 text-zinc-500">
            Gagal memuat film. Silakan periksa koneksi atau token TMDB Anda.
          </div>
        ) : movies.length > 0 ? (
          <div className="space-y-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
            >
              {movies.map((movie, idx) => (
                <motion.div key={`${movie.id}-${idx}`} variants={itemVariants}>
                  <MovieCard movie={movie} onSelect={handleSelectMovie} />
                </motion.div>
              ))}
            </motion.div>

            {/* Load More/Infinite Scroll node */}
            <div ref={ref} className="flex justify-center py-8">
              {isFetchingNextPage ? (
                <Spinner size="md" />
              ) : hasNextPage ? (
                <div className="text-zinc-500 text-sm">
                  Scroll untuk memuat lebih banyak...
                </div>
              ) : (
                <div className="text-zinc-500 text-sm">Semua film telah dimuat.</div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-zinc-500">
            Tidak ada film ditemukan dalam kategori ini.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Explore;
