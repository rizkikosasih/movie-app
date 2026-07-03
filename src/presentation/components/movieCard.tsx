import { motion } from 'framer-motion';
import { Star, Plus, Check } from 'lucide-react';
import type { Movie } from '@/domain/entities';
import { useMovieStore } from '@/domain/store/useMovieStore';
import { Button } from './ui/button';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movieId: number) => void;
}

export const MovieCard = ({ movie, onSelect }: MovieCardProps) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useMovieStore();
  const active = isInWatchlist(movie.id);

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (active) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <motion.div
      onClick={() => onSelect(movie.id)}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-zinc-900/50 dark:bg-zinc-900/30 border border-zinc-200/20 dark:border-zinc-800/50 shadow-md hover:shadow-2xl transition-all duration-300 w-[150px] sm:w-[180px] md:w-[200px] shrink-0"
    >
      {/* Poster Image */}
      <div className="relative aspect-2/3 w-full overflow-hidden bg-zinc-800">
        {movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-500 text-sm">
            No Image
          </div>
        )}

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3" />

        {/* Watchlist Toggle Button (Top Right) */}
        <Button
          onClick={handleWatchlistClick}
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/60 backdrop-blur-md border border-zinc-200/20 hover:bg-amber-500 hover:text-black dark:hover:bg-amber-400 dark:hover:text-black hover:scale-105 active:scale-95 transition-all text-zinc-100"
          aria-label={active ? 'Remove from Watchlist' : 'Add to Watchlist'}
        >
          {active ? (
            <Check className="h-4 w-4 text-black dark:text-black" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </Button>

        {/* Rating Badge (Top Left) */}
        <div className="absolute top-2 left-2 flex items-center gap-1 rounded-md bg-black/60 backdrop-blur-md px-1.5 py-0.5 text-xs font-semibold text-amber-500 dark:text-amber-400 border border-zinc-200/20">
          <Star className="h-3 w-3 fill-amber-500 dark:fill-amber-400 text-amber-500 dark:text-amber-400" />
          <span>{movie.voteAverage.toFixed(1)}</span>
        </div>
      </div>

      {/* Info Body */}
      <div className="p-3 bg-zinc-900/80 backdrop-blur-sm">
        <h3 className="line-clamp-1 font-serif text-sm font-semibold text-zinc-100 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-300">
          {movie.title}
        </h3>
        <p className="mt-1 text-xs text-zinc-400">
          {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A'}
        </p>
      </div>
    </motion.div>
  );
};

export default MovieCard;
