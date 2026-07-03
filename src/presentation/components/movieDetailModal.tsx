import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { useSimilarMovies } from '../hooks/useSimilarMovies';
import { Spinner } from './ui/spinner';
import { useMovieStore } from '@/domain/store/useMovieStore';
import { Button } from './ui/button';
import { Star, Plus, Check, Calendar, Clock, DollarSign } from 'lucide-react';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';

interface MovieDetailModalProps {
  movieId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectSimilar: (movieId: number) => void;
}

export const MovieDetailModal = ({
  movieId,
  isOpen,
  onClose,
  onSelectSimilar
}: MovieDetailModalProps) => {
  const { data: movie, isLoading: isDetailsLoading } = useMovieDetails(
    movieId || 0,
    isOpen
  );
  const { data: similarMovies = [], isLoading: isSimilarLoading } = useSimilarMovies(
    movieId || 0,
    isOpen
  );

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useMovieStore();
  const active = movie ? isInWatchlist(movie.id) : false;

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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-950 text-zinc-100 border-zinc-800 p-6 scrollbar-none">
        {isDetailsLoading ? (
          <div className="flex h-[400px] w-full items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : movie ? (
          <div className="space-y-6">
            {/* Modal Header & Hero */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-800 shadow-2xl">
              {movie.backdropUrl ? (
                <img
                  src={movie.backdropUrl}
                  alt={movie.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-zinc-500">
                  No Backdrop Image
                </div>
              )}
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

              {/* Title & Badge */}
              <div className="absolute bottom-4 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <DialogTitle className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-white">
                    {movie.title}
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    {movie.title} details
                  </DialogDescription>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {movie.genres.map((g) => (
                      <Badge
                        key={g}
                        variant="outline"
                        className="text-zinc-300 border-zinc-700 bg-zinc-900/50"
                      >
                        {g}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 rounded-md bg-amber-500 dark:bg-amber-400 text-black px-3 py-1 text-sm font-bold shadow-md">
                    <Star className="h-4 w-4 fill-black text-black" />
                    <span>{movie.voteAverage.toFixed(1)}</span>
                  </div>

                  <Button
                    onClick={handleWatchlistClick}
                    className="bg-zinc-800 text-zinc-100 hover:bg-amber-500 hover:text-black dark:hover:bg-amber-400 dark:hover:text-black border border-zinc-700 font-semibold gap-1.5 transition-all"
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

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column: Plot & Details */}
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-lg font-bold text-amber-500 dark:text-amber-400">
                  Sinopsis
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {movie.overview || 'Sinopsis tidak tersedia.'}
                </p>
              </div>

              {/* Right Column: Statistics */}
              <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" /> Rilis
                  </span>
                  <span className="font-semibold">
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
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Clock className="h-4 w-4" /> Durasi
                  </span>
                  <span className="font-semibold">
                    {movie.runtime ? `${movie.runtime} menit` : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4" /> Anggaran
                  </span>
                  <span className="font-semibold">{formatCurrency(movie.budget)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4" /> Pendapatan
                  </span>
                  <span className="font-semibold">{formatCurrency(movie.revenue)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Status</span>
                  <span className="font-semibold capitalize">
                    {movie.status || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Similar Movies */}
            <div className="space-y-4 pt-4 border-t border-zinc-900">
              <h3 className="text-lg font-bold text-amber-500 dark:text-amber-400">
                Film Serupa
              </h3>
              {isSimilarLoading ? (
                <div className="flex h-24 items-center justify-center">
                  <Spinner size="sm" />
                </div>
              ) : similarMovies.length > 0 ? (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                  {similarMovies.slice(0, 10).map((sm) => (
                    <motion.div
                      key={sm.id}
                      onClick={() => onSelectSimilar(sm.id)}
                      whileHover={{ scale: 1.02 }}
                      className="w-[110px] shrink-0 cursor-pointer space-y-1.5 group"
                    >
                      <div className="aspect-2/3 rounded-lg overflow-hidden bg-zinc-800 relative">
                        {sm.posterUrl ? (
                          <img
                            src={sm.posterUrl}
                            alt={sm.title}
                            className="h-full w-full object-cover group-hover:opacity-80 transition-opacity"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px] text-zinc-500">
                            No Poster
                          </div>
                        )}
                      </div>
                      <p className="text-xs line-clamp-1 font-semibold text-zinc-300 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                        {sm.title}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-zinc-500">Tidak ada film serupa ditemukan.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex h-[400px] w-full items-center justify-center text-zinc-500">
            Gagal memuat detail film.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetailModal;
