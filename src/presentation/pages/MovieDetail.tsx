import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Star,
  Plus,
  Check,
  Calendar,
  Clock,
  DollarSign
} from 'lucide-react';
import Layout from '../components/layout';
import MovieRow from '../components/movieRow';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { useSimilarMovies } from '../hooks/useSimilarMovies';
import { Spinner } from '../components/ui/spinner';
import { useMovieStore } from '@/domain/store/useMovieStore';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useEffect } from 'react';

export const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = Number(id);

  // Fetch details and similar movies
  const { data: movie, isLoading: isDetailsLoading, isError } = useMovieDetails(movieId);
  const { data: similarMovies = [], isLoading: isSimilarLoading } =
    useSimilarMovies(movieId);

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useMovieStore();
  const active = movie ? isInWatchlist(movie.id) : false;

  // Scroll to top when movie ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleWatchlistClick = () => {
    if (!movie) return;
    if (active) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist({
        id: movie.id,
        title: movie.title,
        posterUrl: movie.posterUrl,
        backdropUrl: movie.backdropUrl,
        releaseDate: movie.releaseDate,
        voteAverage: movie.voteAverage,
        voteCount: 0,
        overview: movie.overview
      });
    }
  };

  const formatCurrency = (val?: number) => {
    if (!val) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleSelectSimilar = (similarId: number) => {
    navigate(`/movie/${similarId}`);
  };

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-6 py-6 space-y-6">
        {/* Back Navigation & Page Header */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-900 border border-zinc-200/20 text-zinc-900 dark:text-zinc-100 hover:bg-amber-500 hover:text-black dark:hover:bg-amber-400 dark:hover:text-black transition-all"
            aria-label="Kembali"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="text-zinc-500 text-sm font-medium">
            Kembali ke halaman sebelumnya
          </span>
        </div>

        {isDetailsLoading ? (
          <div className="flex h-[60vh] w-full items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : isError || !movie ? (
          <div className="text-center py-12 text-zinc-500">
            Gagal memuat detail film. Silakan periksa koneksi internet Anda.
          </div>
        ) : (
          <div className="space-y-8">
            {/* Cinematic Backdrop Hero Banner */}
            <div className="relative h-[200px] sm:h-[350px] md:h-[450px] w-full overflow-hidden rounded-2xl bg-zinc-800 shadow-2xl">
              {movie.backdropUrl ? (
                <img
                  src={movie.backdropUrl}
                  alt={movie.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-zinc-500 text-lg">
                  No Backdrop Image Available
                </div>
              )}
              {/* Cinematic Bottom Dark Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-r from-zinc-950/60 via-transparent to-transparent" />

              {/* Title, Genres, Ratings and Watchlist Button Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md">
                    {movie.title}
                  </h1>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {movie.genres.map((g) => (
                      <Badge
                        key={g}
                        variant="outline"
                        className="text-zinc-200 border-zinc-700 bg-zinc-955/50"
                      >
                        {g}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1.5 rounded-lg bg-amber-500 dark:bg-amber-400 text-black px-4 py-1.5 text-base font-bold shadow-lg">
                    <Star className="h-4.5 w-4.5 fill-black text-black" />
                    <span>{movie.voteAverage.toFixed(1)}</span>
                  </div>

                  <Button
                    onClick={handleWatchlistClick}
                    className="bg-zinc-900/80 backdrop-blur-md text-zinc-100 hover:bg-amber-500 hover:text-black dark:hover:bg-amber-400 dark:hover:text-black border border-zinc-800 font-semibold gap-2 px-5 py-2.5 rounded-lg transition-all shadow-lg"
                  >
                    {active ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Watchlist</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        <span>Watchlist</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Synopsis & Statistics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Side: Plot */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-xl font-bold text-amber-500 dark:text-amber-400 font-serif">
                  Sinopsis
                </h2>
                <p className="text-zinc-750 dark:text-zinc-300 text-base leading-relaxed">
                  {movie.overview || 'Sinopsis tidak tersedia untuk film ini.'}
                </p>
              </div>

              {/* Right Side: Statistics Card */}
              <div className="rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/50 p-6 space-y-4 text-sm shadow-xl">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-200 border-b border-zinc-250 dark:border-zinc-800 pb-2">
                  Detail Informasi
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-zinc-500" /> Tanggal Rilis
                  </span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {movie.releaseDate
                      ? new Date(movie.releaseDate).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-zinc-500" /> Durasi Film
                  </span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {movie.runtime ? `${movie.runtime} menit` : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-zinc-500" /> Anggaran (Budget)
                  </span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {formatCurrency(movie.budget)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-zinc-500" /> Pendapatan (Revenue)
                  </span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {formatCurrency(movie.revenue)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">Status Rilis</span>
                  <span className="font-semibold capitalize text-zinc-800 dark:text-zinc-200">
                    {movie.status || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Similar Movies Row */}
            <div className="pt-6 border-t border-zinc-200/10 dark:border-zinc-800/40">
              <MovieRow
                title="Rekomendasi Film Serupa"
                category="similar"
                movies={similarMovies}
                isLoading={isSimilarLoading}
                onSelectMovie={handleSelectSimilar}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MovieDetail;
